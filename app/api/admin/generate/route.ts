import {NextResponse} from "next/server";
import {adminSessionValid,supa} from "@/lib/backend";
import {buildKitZip} from "@/lib/kit";
import {sendMail} from "@/lib/email";
export const runtime="nodejs";
export async function POST(req:Request){
 try{
  if(!adminSessionValid(req))return NextResponse.json({error:"Unauthorized"},{status:401});
  const {orderId}=await req.json();const rows=await supa("orders?id=eq."+encodeURIComponent(orderId)+"&select=*&limit=1");const o=rows?.[0];
  if(!o)return NextResponse.json({error:"Order not found"},{status:404});
  if(!["GENERATING","REVISION_REQUESTED"].includes(o.status))return NextResponse.json({error:"Order is not ready for generation"},{status:409});
  const modules=[o.template_slug],formats=[o.platform],zip=await buildKitZip({customer:{name:o.name,email:o.delivery_email,phone:o.contact_number},modules,formats,productName:o.template_slug,amount:o.amount});
  await sendMail({to:o.delivery_email,subject:"Your HRToolKit India delivery — "+o.template_slug,text:"Your payment has been verified and your HRToolKit delivery is attached.\n\nOrder: "+o.id+"\nTemplate: "+o.template_slug+"\nPlatform: "+o.platform+"\n\nYou have up to 2 change/revision requests as stated at purchase.",attachments:[{filename:"HRToolKit_"+o.id+".zip",content:zip,contentType:"application/zip"}]});
  await supa("deliverables",{method:"POST",body:JSON.stringify({order_id:o.id,file_url:null,created_at:new Date().toISOString()})});
  await supa("orders?id=eq."+encodeURIComponent(o.id),{method:"PATCH",body:JSON.stringify({status:"DELIVERED",updated_at:new Date().toISOString()})});
  return NextResponse.json({ok:true,status:"DELIVERED"});
 }catch(e:any){console.error(e);return NextResponse.json({error:e.message||"Generation/delivery failed"},{status:500})}
}
