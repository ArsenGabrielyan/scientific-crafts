import type { Template } from "@/lib/types";
import { absoluteCDN, getErrorMessage } from "../utils"

export const getTemplatesFromCDN = async (): Promise<{
     data: Template[],
     error?: string
}> => {
     try {
          const res = await fetch(absoluteCDN("/templates.json"));
          if(!res.ok) return {error: "Չհաջողվեց բեռնել շաբլոնների ցուցակը", data: []}
          const data: Template[] = await res.json();
          return {data}
     } catch (error) {
          return {error: getErrorMessage(error), data: []}
     }
}