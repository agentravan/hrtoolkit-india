import {NextResponse} from "next/server";
import {PRODUCTS,customPrice,orderDescription} from "@/lib/catalog";
function clean(v:any,max=500){return String(v??"").trim().slice(0,max)}
export async function POST(req:Request){
 try{
  const body=await req.json(),customer={name:clean(body.customer?.name,100),email:clean(body.customer?.email,180),phone:clean(body.customer?.phone,40),company:clean(body.customer?.company,150)};
  if(!customer.name||!customer.email||!customer.phone)return NextResponse.json({error:"Name, email and mobile are required"}, {status:400});
  let amount=0,productName="",notes:any={kind:body.kind||"product",customer:JSON.stringify(customer)};
  if(body.kind==="custom"){const modules=Array.isArray(body.modules)?body.modules.slice(0,12).map(String):[],formats=Array.isArray(body.formats)?body.formats.slice(0,5).map(String):[];amount=customPrice(modules,formats);productName=orderDescription({kind:"custom",modules});notes={...notes,modules:JSON.stringify(modules),formats:JSON.stringify(formats),productName};}
  else{const p=PRODUCTS[body.productId];if(!p)return NextResponse.json({error:"Invalid product"}, {status:400});amount=p.price;productName=p.name;notes={...notes,productId:String(body.productId),productName};}
  if(!process.env.RAZORPAY_KEY_ID||!process.env.RAZORPAY_KEY_SECRET)return NextResponse.json({error:"Razorpay is not configured yet. Add the server environment variables before accepting payments."},{status:503});
  const auth=Buffer.from(process.env.RAZORPAY_KEY_ID+":"+process.env.RAZORPAY_KEY_SECRET).toString("base64");
  const rr=await fetch("https://api.razorpay.com/v1/orders",{method:"POST",headers:{Authorization:"Basic "+auth,"Content-Type":"application/json"},body:JSON.stringify({amount:amount*100,currency:"INR",receipt:"HRTK_"+Date.now(),notes})});
  const data=await rr.json();if(!rr.ok)throw Error(data?.error?.description||"Razorpay order creation failed");
  return NextResponse.json({orderId:data.id,amount:data.amount,keyId:process.env.RAZORPAY_KEY_ID,description:productName,productName});
 }catch(e:any){return NextResponse.json({error:e.message||"Order creation failed"},{status:500})}
}