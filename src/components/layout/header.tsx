"use client"
import Image from "next/image";
import { Button } from "../ui/button";
import { useEffect, useMemo, useState } from "react";
import { cn } from "cn";
import ModeToggler from "../themes/toggler";
import SearchPopup from "../search";
import { useCurrentTheme } from "@/hooks/use-current-theme";
import { Link } from "@/i18n/navigation";
import { FileText, FlaskConical, Home, Menu, Scissors, X } from "lucide-react";
import LanguageSwitcher from "../lang-switcher";
import { HeaderLink, IHeaderLink } from "@/lib/types";
import { useTranslations } from "next-intl";

const LINKS: IHeaderLink[] = [
     { alias: HeaderLink.Main, link: "/#hero", Icon: Home },
     { alias: HeaderLink.About, link: "/#about", Icon: FileText },
     { alias: HeaderLink.Experiments, link: "/experiments", Icon: FlaskConical },
     { alias: HeaderLink.Templates, link: "/templates", Icon: Scissors },
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
     const t = useTranslations("links")
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
                                        <Link href={link.link} onClick={()=>setIsOpened(false)}>{t(link.alias)}</Link>
                                   </Button>
                              </li>
                         ))}
                    </ul>
                    <div className="flex items-center gap-1">
                         <SearchPopup/>
                         <div className="hidden md:flex items-center gap-1">
                              <ModeToggler/>
                              <LanguageSwitcher />
                         </div>
                         <Button className="md:hidden" variant="ghost" size="icon" title={t("menu")} onClick={()=>setIsOpened(!isOpened)} aria-expanded={isOpened} aria-controls="mobile-menu">
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
                                        <Link href={link.link} onClick={()=>setIsOpened(false)}>
                                             <link.Icon className="size-5 text-primary"/>
                                             {t(link.alias)}
                                        </Link>
                                   </Button>
                              </li>
                         ))}
                         <li className="border-t mt-2 pt-3 px-2 flex items-center gap-2">
                              <LanguageSwitcher />
                              <ModeToggler/>
                         </li>
                    </ul>
               )}
          </header>
     )
}