import {NextResponse} from "next/server";
import crypto from "crypto";
export async function POST(req:Request){
 try{const b=await req.json();if(!b.razorpay_order_id||!b.razorpay_payment_id||!b.razorpay_signature)return NextResponse.json({error:"Missing payment fields"},{status:400});
 const expected=crypto.createHmac("sha256",process.env.RAZORPAY_KEY_SECRET||"").update(b.razorpay_order_id+"|"+b.razorpay_payment_id).digest("hex");
 if(!crypto.timingSafeEqual(Buffer.from(expected),Buffer.from(b.razorpay_signature)))return NextResponse.json({verified:false,error:"Invalid signature"},{status:400});
 return NextResponse.json({verified:true,message:"Payment signature verified. Fulfilment is triggered by the Razorpay captured-payment webhook."});
 }catch(e:any){return NextResponse.json({error:e.message||"Verification failed"},{status:500})}
}