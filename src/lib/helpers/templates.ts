import type { Template } from "@/lib/types";
import { absoluteCDN } from "../utils"
import { cache } from "react";

export const getTemplatesFromCDN = cache(async (): Promise<Template[]> => {
     try {
          const res = await fetch(absoluteCDN("/templates.json"));
          if(!res.ok) return []
          const data: Template[] = await res.json();
          return data.filter((template): template is Template => template !== null).sort((a, b) => {
               const aDate = new Date(a.date);
               const bDate = new Date(b.date);
               return bDate.getTime() - aDate.getTime()
          });
     } catch {
          return []
     }
})