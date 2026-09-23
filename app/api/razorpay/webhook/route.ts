import {NextResponse} from "next/server";
import crypto from "crypto";
import {buildKitZip} from "@/lib/kit";
import {sendMail} from "@/lib/email";
import {PRODUCTS} from "@/lib/catalog";
async function razor(path:string){const a=Buffer.from(process.env.RAZORPAY_KEY_ID+":"+process.env.RAZORPAY_KEY_SECRET).toString("base64");const r=await fetch("https://api.razorpay.com/v1/"+path,{headers:{Authorization:"Basic "+a}});if(!r.ok)throw Error("Razorpay API lookup failed");return r.json()}
export async function POST(req:Request){
 const raw=await req.text(),sig=req.headers.get("x-razorpay-signature")||"",secret=process.env.RAZORPAY_WEBHOOK_SECRET||"";
 if(!secret)return NextResponse.json({error:"Webhook secret not configured"},{status:503});
 const expected=crypto.createHmac("sha256",secret).update(raw).digest("hex");
 if(sig.length!==expected.length||!crypto.timingSafeEqual(Buffer.from(expected),Buffer.from(sig)))return NextResponse.json({error:"Invalid webhook signature"},{status:400});
 try{
  const event=JSON.parse(raw);if(event.event!=="payment.captured")return NextResponse.json({ok:true,ignored:true});
  const payment=event.payload?.payment?.entity;if(!payment?.order_id)return NextResponse.json({ok:true});
  const order=await razor("orders/"+payment.order_id),n=order.notes||{};let customer:any={};try{customer=JSON.parse(n.customer||"{}")}catch{}
  const modules=JSON.parse(n.modules||"[]"),formats=JSON.parse(n.formats||"[]"),productName=n.productName||PRODUCTS[n.productId]?.name||"HRToolKit India Kit";
  const amount=Number(payment.amount||order.amount||0)/100;
  const zip=await buildKitZip({customer,modules,formats,productName,amount});
  const fileName="HRToolKit_"+String(productName).replace(/[^a-z0-9]+/gi,"_").slice(0,60)+"_"+payment.order_id+".zip";
  const summary=`Customer: ${customer.name||"-"}\nEmail: ${customer.email||"-"}\nPhone: ${customer.phone||"-"}\nCompany: ${customer.company||"-"}\nProduct: ${productName}\nAmount received: ₹${amount.toLocaleString("en-IN")}\nRazorpay Order: ${payment.order_id}\nPayment ID: ${payment.id}\nModules: ${modules.join(", ")||"Product kit"}\nCompatibility: ${formats.join(", ")||"Product default"}`;
  const admin=process.env.ADMIN_EMAIL||process.env.ZOHO_SMTP_USER;
  if(admin)await sendMail({to:admin,subject:"HRToolKit — Payment Received ₹"+amount.toLocaleString("en-IN"),text:"Payment received successfully.\n\n"+summary});
  if(customer.email)await sendMail({to:customer.email,subject:"Your HRToolKit kit is ready — "+productName,text:"Payment received. Your selected HR kit and deployment files are attached as a ZIP.\n\n"+summary,attachments:[{filename:fileName,content:zip,contentType:"application/zip"}]});
  return NextResponse.json({ok:true,fulfilled:true});
 }catch(e:any){console.error(e);return NextResponse.json({error:e.message||"Fulfilment failed"},{status:500})}
}