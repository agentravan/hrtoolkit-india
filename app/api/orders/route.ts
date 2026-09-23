import {NextResponse} from "next/server";
import {orderSchema,orderId,supa,requireEnv} from "@/lib/backend";
export async function POST(req:Request){
 try{
  requireEnv("SUPABASE_URL","SUPABASE_SERVICE_ROLE_KEY","UPI_ID","UPI_PAYEE_NAME");
  const input=orderSchema.parse(await req.json()); const id=orderId();
  const price=Number((await supa("templates?slug=eq."+encodeURIComponent(input.templateSlug)+"&select=price&limit=1"))?.[0]?.price);
  if(!Number.isFinite(price)||price<=0)return NextResponse.json({error:"Template not found or price is invalid"},{status:400});
  const now=new Date().toISOString();
  await supa("orders",{method:"POST",body:JSON.stringify({id,name:input.name,contact_number:input.contactNumber,email:input.email,delivery_email:input.deliveryEmail,template_slug:input.templateSlug,platform:input.platform,requirements:input.requirements,amount:price,status:"PENDING_PAYMENT",created_at:now,updated_at:now,revision_count:0})});
  await supa("consents",{method:"POST",body:JSON.stringify({order_id:id,terms_version:input.termsVersion,required_consent:true,offers_consent:Boolean(input.consentOffers),revision_consent:true,created_at:now,ip:null})});
  const upi="upi://pay?pa="+encodeURIComponent(process.env.UPI_ID!)+"&pn="+encodeURIComponent(process.env.UPI_PAYEE_NAME!)+"&am="+encodeURIComponent(String(price))+"&cu=INR&tn="+encodeURIComponent(id);
  return NextResponse.json({orderId:id,amount:price,currency:"INR",upiUri:upi,status:"PENDING_PAYMENT",expiresInHours:24});
 }catch(e:any){return NextResponse.json({error:e?.issues?.[0]?.message||e.message||"Invalid order"},{status:400})}
}
