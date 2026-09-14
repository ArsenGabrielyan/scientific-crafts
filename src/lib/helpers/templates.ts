import type { Template } from "@/lib/types";
import { absoluteCDN } from "../utils"
import { cache } from "react";

export const getTemplatesFromCDN = cache(async (): Promise<Template[]> => {
     try {
          const res = await fetch(absoluteCDN("/templates.json"));
          if(!res.ok) return []
          const data: Template[] = await res.json();
          return data
     } catch {
          return []
     }
})