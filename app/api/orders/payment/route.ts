import {NextResponse} from "next/server";
import {paymentSchema,supa} from "@/lib/backend";
export async function POST(req:Request){
 try{const b=paymentSchema.parse(await req.json());const rows=await supa("orders?id=eq."+encodeURIComponent(b.orderId)+"&select=id,status,amount,revision_count&limit=1");const o=rows?.[0];if(!o)return NextResponse.json({error:"Order not found"},{status:404});if(!["PENDING_PAYMENT","PAYMENT_NOT_RECEIVED"].includes(o.status))return NextResponse.json({error:"Payment cannot be submitted for this order in its current status"},{status:409});await supa("orders?id=eq."+encodeURIComponent(b.orderId),{method:"PATCH",body:JSON.stringify({status:"PAYMENT_SUBMITTED",utr:b.utr,payment_screenshot_url:b.screenshotUrl||null,updated_at:new Date().toISOString()})});return NextResponse.json({ok:true,status:"PAYMENT_SUBMITTED",orderId:b.orderId})}catch(e:any){return NextResponse.json({error:e?.issues?.[0]?.message||e.message||"Payment submission failed"},{status:400})}
}
