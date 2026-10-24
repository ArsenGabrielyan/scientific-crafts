import { languages } from "@/i18n/config";
import { LangCodeType } from "@/i18n/types";
import { Metadata } from "next";

export { cn } from "cn"

export const absoluteURL = (path?: string) => {
     const url = process.env.NODE_ENV==="production" ? "https://gitafizika.vercel.app" : "http://localhost:3000";
     if(!path) return url;
     if(path.trim()==="") return url;
     return `${url}${path}`
}

export const absoluteLink = (locale: LangCodeType, path?: string) => {
  const redirectPath = !path ? "/" : path
  return absoluteURL(locale==="hy" ? redirectPath : `/${locale}${redirectPath}`)
}

export function createMetaAlternates(locale: LangCodeType, url?: string): Metadata["alternates"] {
     return {
          canonical: absoluteLink(locale,url),
          languages: {
               "x-default": absoluteLink("hy", url),
               ...Object.fromEntries(
                    languages.map(lang => [
                         lang.code,
                         absoluteLink(lang.code, url)
                    ])
               )
          }
     }
}

export const absoluteCDN = (filePath?: string) => `https://arsengabrielyan.github.io/scientific-crafts${filePath}`
export const getErrorMessage = (err: unknown) => err instanceof Error ? err.message : String(err)