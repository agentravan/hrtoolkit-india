import crypto from "crypto";
import { z } from "zod";

export const orderSchema=z.object({
 name:z.string().trim().min(1).max(100),
 contactNumber:z.string().trim().regex(/^[+0-9()\-\s]{7,20}$/),
 email:z.string().trim().email().max(180),
 deliveryEmail:z.string().trim().email().max(180),
 templateSlug:z.string().trim().min(1).max(120),
 platform:z.enum(["excel","powerbi","googlesheets","powerautomate","tableau"]),
 requirements:z.string().trim().min(30).max(10000),
 consentRequired:z.literal(true),
 consentOffers:z.boolean().optional().default(false),
 consentRevisions:z.literal(true),
 termsVersion:z.string().trim().min(1).max(50)
});
export const paymentSchema=z.object({
 orderId:z.string().regex(/^HRTK-[A-Z0-9]{10,24}$/),
 utr:z.string().trim().min(6).max(80),
 screenshotUrl:z.string().url().max(2000).optional().or(z.literal(""))
});
export const revisionSchema=z.object({orderId:z.string().regex(/^HRTK-[A-Z0-9]{10,24}$/),message:z.string().trim().min(10).max(5000)});

export function cleanText(v:unknown,max=500){return String(v??"").replace(/[<>]/g,"").trim().slice(0,max)}
export function orderId(){return "HRTK-"+crypto.randomBytes(8).toString("hex").toUpperCase()}
export function sign(value:string,secret:string){return crypto.createHmac("sha256",secret).update(value).digest("hex")}
export function timingSafe(a:string,b:string){return a.length===b.length&&crypto.timingSafeEqual(Buffer.from(a),Buffer.from(b))}
export function actionToken(order:string,action:string,secret:string,exp:number){return sign(order+"|"+action+"|"+exp,secret)+"."+exp}
export function verifyActionToken(token:string,order:string,action:string,secret:string){const [sig,expRaw]=String(token||"").split(".");const exp=Number(expRaw);if(!sig||!Number.isFinite(exp)||Date.now()>exp)return false;return timingSafe(sig,sign(order+"|"+action+"|"+exp,secret))}
export function siteUrl(){return (process.env.NEXT_PUBLIC_SITE_URL||"").replace(/\/$/,"")}
export function requireEnv(...keys:string[]){const missing=keys.filter(k=>!process.env[k]);if(missing.length)throw new Error("Missing server configuration: "+missing.join(", "))}
export async function supa(path:string,init:RequestInit={}){requireEnv("SUPABASE_URL","SUPABASE_SERVICE_ROLE_KEY");const r=await fetch(process.env.SUPABASE_URL+"/rest/v1/"+path,{...init,headers:{"apikey":process.env.SUPABASE_SERVICE_ROLE_KEY!,"Authorization":"Bearer "+process.env.SUPABASE_SERVICE_ROLE_KEY!,"Content-Type":"application/json","Prefer":"return=representation",...(init.headers||{})}});const text=await r.text();let data:any=null;try{data=JSON.parse(text)}catch{data=text}if(!r.ok)throw new Error(typeof data==="object"&&data?.message?data.message:"Database request failed");return data}
export function adminCookie(value:string){return "hrt_admin="+value+"; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=28800"}
export function parseCookie(req:Request,name:string){return req.headers.get("cookie")?.split(";").map(x=>x.trim()).find(x=>x.startsWith(name+"="))?.slice(name.length+1)||""}
