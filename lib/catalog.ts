export type Customer={name:string;email:string;phone:string;company?:string};
export const PRODUCTS:any={
 salary:{name:"Salary Calculator",price:299,kind:"excel"},
 attendance:{name:"Attendance & Leave Tracker",price:399,kind:"excel"},
 compliance:{name:"PF / ESIC Compliance Tracker",price:499,kind:"compliance"},
 fnf:{name:"Full & Final Calculator",price:499,kind:"fnf"},
 "payroll-mis":{name:"Payroll MIS Dashboard",price:799,kind:"dashboard"},
 bundle:{name:"Complete HR Excel Bundle",price:999,kind:"bundle"}
};
export const MODULES=["Employee Master","Attendance","Leave","Payroll","Recruitment","Onboarding","Attrition","Diversity","Compliance","Full & Final","Performance","Custom KPI"];
export const FORMATS=["excel","powerbi","powerautomate","googlesheets","pdf"];
export function customPrice(modules:string[],formats:string[]){return Math.max(1999,999+modules.length*150+formats.length*250)}
export function orderDescription(x:any){return x.kind==="custom"?"Custom HR Dashboard — "+x.modules.length+" modules":PRODUCTS[x.productId]?.name||"HRToolKit India Kit"}