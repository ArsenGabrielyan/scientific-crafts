"use client"
import Image from "next/image";
import { Button } from "../ui/button";
import { useEffect, useMemo, useState } from "react";
import { cn } from "cn";
import ModeToggler from "../themes/toggler";
import SearchPopup from "../search";
import { useCurrentTheme } from "@/hooks/use-current-theme";
import Link from "next/link";
import { FileText, FlaskConical, Home, Menu, Scissors, X } from "lucide-react";

const LINKS = [
     { name: "Գլխավոր", href: "/#hero", Icon: Home },
     { name: "Մեր Մասին", href: "/#about", Icon: FileText },
     { name: "Գիտական Փորձեր", href: "/#experiments", Icon: FlaskConical },
     { name: "Շաբլոններ", href: "/#templates", Icon: Scissors },
]

export default function SiteHeader(){
     const [isScrolled, setIsScrolled] = useState(false);
     const [isHovered, setIsHovered] = useState(false);
     const currTheme = useCurrentTheme()
     const [isOpened, setIsOpened] = useState(false);
     useEffect(() => {
          const handleScroll = () => {
               setIsScrolled(window.scrollY > 20);
          };
          handleScroll();
          window.addEventListener("scroll", handleScroll);
          return () => window.removeEventListener("scroll", handleScroll);
     }, []);
     const logo = useMemo(() => {
          const defaultLogo = currTheme === "dark" ? "/logo-dark.png" : "/logo.png"
          if (isOpened || isScrolled) return isHovered ? "/logo-accent.png" : defaultLogo
          return "/logo-dark.png"
     }, [isOpened, isScrolled, currTheme, isHovered])
     return (
          <header className={cn("transition-[background-color,padding,box-shadow,border-color] duration-300 fixed top-0 left-0 w-full z-40 flex justify-center items-center px-5 gap-4 min-h-17.5",isScrolled ? "bg-card/75 backdrop-blur-md text-card-foreground border-b shadow-md py-3.5" : "py-7", isOpened && "bg-card border-0")}>
               <nav className="max-w-360 flex justify-between items-center w-full gap-4">
                    <Link href="/">
                         <Image src={logo} alt="logo" width={256} height={40} onMouseEnter={()=>setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)} className="w-40 sm:w-56 md:w-64 h-auto"/>
                    </Link>
                    <ul className="hidden md:flex items-center justify-center gap-2">
                         {LINKS.map((link,i)=>(
                              <li key={`link-${i+1}`}>
                                   <Button variant={isScrolled ? "link" : "ghost"} className="text-base" asChild>
                                        <Link href={link.href}>{link.name}</Link>
                                   </Button>
                              </li>
                         ))}
                    </ul>
                    <div className="flex items-center gap-2">
                         <SearchPopup/>
                         <ModeToggler/>
                         <Button className="md:hidden" variant="outline" size="icon" title="Մենյու" onClick={()=>setIsOpened(!isOpened)} aria-expanded={isOpened} aria-controls="mobile-menu">
                              {isOpened ? (
                                   <X className="size-5"/>
                              ) : (
                                   <Menu className="size-5"/>
                              )}
                         </Button>
                    </div>
               </nav>
               {isOpened && (
                    <ul className="md:hidden absolute top-full left-0 bg-card text-card-foreground border-b shadow-md pb-4 px-2 w-full" id="mobile-menu">
                         {LINKS.map((link,i)=>(
                              <li key={`link-${i+1}`} className="flex gap-2 items-center">
                                   <Button variant="ghost" className="text-base gap-3" asChild>
                                        <Link href={link.href} onClick={()=>setIsOpened(false)}>
                                             <link.Icon className="size-5 text-primary"/>
                                             {link.name}
                                        </Link>
                                   </Button>
                              </li>
                         ))}
                    </ul>
               )}
          </header>
     )
}