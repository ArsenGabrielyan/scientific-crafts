import { LucideIcon } from "lucide-react";
import { TemplateFilterName } from "../constants/filters";
import * as z from "zod"
import { SearchSchema } from "../schemas"

export type SearchType = z.infer<typeof SearchSchema>
export interface SelectType{
     value: string,
     label: string | number,
     Icon?: LucideIcon,
     disabled?: boolean
}
export interface Template {
     slug: string;
     title: string;
     file: string;
     thumbnail: string;
     categories: TemplateFilterName[];
     pages: number;
}
export type BlockquoteVariant = "note" | "tip" | "important" | "warning" | "caution"
export interface IBlockquoteBox{
     boxClass: string,
     lineClass: string,
     Icon: LucideIcon,
     iconClass: string,
     title: string
}
export type SearchPageMode = "search-template" | "search-page"