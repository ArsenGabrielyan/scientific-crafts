import { Metadata } from "next";

export { cn } from "cn"

export const absoluteURL = (path?: string) => {
     const url = process.env.NODE_ENV==="production" ? "https://gitafizika.vercel.app" : "http://localhost:3000";
     if(!path) return url;
     if(path.trim()==="") return url;
     return `${url}${path}`
}

export function createMetaAlternates(url?: string): Metadata["alternates"] {
     return {
          canonical: absoluteURL(url)
     }
}

export const absoluteCDN = (filePath?: string) => `https://arsengabrielyan.github.io/scientific-crafts${filePath}`

export function getErrorMessage(err: unknown){
     const stringErr = String(err);
     const fallback = stringErr.trim()==="" ? "Ինչ-որ բան սխալ գնաց" : stringErr
     return err instanceof Error ? err.message : String(err) ?? fallback
}