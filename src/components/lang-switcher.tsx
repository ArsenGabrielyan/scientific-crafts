"use client"
import { CircleFlag } from 'react-circle-flags'
import { usePathname, useRouter } from "@/i18n/navigation"
import { useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { languages } from "@/i18n/config";
import { LangCodeType } from "@/i18n/types";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";

export default function LanguageSwitcher(){
     const t = useTranslations("site");
     const locale = useLocale();
     const currLang = languages.find(val=>val.code===locale)
     const [isOpen, setIsOpen] = useState(false)
     const pathname = usePathname();
     const router = useRouter();
     const [isPending, startTransition] = useTransition();
     const onValueChange = (value: LangCodeType) => startTransition(()=>router.replace(
          {pathname},
          {locale: value}
     ))
     return (
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
               <DropdownMenuTrigger asChild>
                    <Button variant="outline" disabled={isPending} title={t("lang-switcher-label")}>
                         <CircleFlag countryCode={currLang?.countryCode ?? "hy"} className="size-4"/>
                         <span className='md:sr-only'>{currLang?.label ?? "Հայերեն"}</span>
                         <ChevronDown className={cn(isOpen && "rotate-180","transition-all")}/>
                    </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent>
                    {languages.map(lang=>(
                         <DropdownMenuItem key={lang.code} disabled={isPending} onClick={()=>onValueChange(lang.code)}>
                              <CircleFlag countryCode={lang.countryCode} className="size-4"/>
                              {lang.label}
                         </DropdownMenuItem>
                    ))}
               </DropdownMenuContent>
          </DropdownMenu>
     )
}