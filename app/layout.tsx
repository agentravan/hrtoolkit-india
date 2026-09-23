import "./globals.css";
import type { Metadata } from "next";
export const metadata:Metadata={title:"HRToolKit India | Payroll & HR Templates",description:"Ready-to-use HR, payroll and compliance tools for Indian businesses."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en-IN"><body>{children}</body></html>}