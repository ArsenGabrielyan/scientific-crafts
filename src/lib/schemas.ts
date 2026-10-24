import { TFunction } from "@/i18n/types"
import * as z from "zod"

export const getSearchSchema = (t: TFunction<"search.validation">) => z.object({
     query: z.string().min(2,t("too-short")).max(200,t("too-long")).trim()
})