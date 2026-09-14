import { Toaster } from "../ui/sonner";
import SiteFooter from "./footer";
import SiteHeader from "./header";

interface SiteLayoutProps{
     children: React.ReactNode
}
export default function SiteLayout({children}: SiteLayoutProps){
     return (
          <>
          <SiteHeader/>
          <main className="w-full min-h-dvh">
               {children}
          </main>
          <SiteFooter/>
          <Toaster richColors/>
          </>
     )
}