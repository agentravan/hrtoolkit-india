import {NextResponse} from "next/server";
import {put} from "@vercel/blob";
export const runtime="nodejs";
export async function POST(req:Request){
 try{
  if(!process.env.BLOB_READ_WRITE_TOKEN)return NextResponse.json({error:"Private file storage is not configured"},{status:503});
  const form=await req.formData();const f=form.get("file");if(!(f instanceof File))return NextResponse.json({error:"File is required"},{status:400});
  if(f.size>5*1024*1024)return NextResponse.json({error:"Maximum file size is 5 MB"},{status:413});
  if(!["image/png","image/jpeg","image/webp","application/pdf"].includes(f.type))return NextResponse.json({error:"Only PNG, JPEG, WebP or PDF payment screenshots are allowed"},{status:415});
  const safe=f.name.replace(/[^a-zA-Z0-9._-]/g,"_").slice(-100);const key="payment-screenshots/"+crypto.randomUUID()+"-"+safe;
  const result=await put(key,f,{access:"private",addRandomSuffix:false,token:process.env.BLOB_READ_WRITE_TOKEN});
  return NextResponse.json({ok:true,url:result.url});
 }catch(e:any){return NextResponse.json({error:e.message||"Upload failed"},{status:500})}
}
