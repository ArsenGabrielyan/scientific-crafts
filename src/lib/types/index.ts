import { LucideIcon } from "lucide-react";
import * as z from "zod"
import { getSearchSchema } from "../schemas"
import { DIFFICULTIES, DURATIONS, EXPERIMENT_FILTER_NAMES, TEMPLATE_FILTER_NAMES } from "../constants";

export type SearchType = z.infer<
     Awaited<ReturnType<typeof getSearchSchema>>
>
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
     date: string;
}
export type BlockquoteVariant = "note" | "tip" | "important" | "warning" | "caution"
export interface IBlockquoteBox{
     boxClass: string,
     lineClass: string,
     Icon: LucideIcon,
     iconClass: string,
}
export type SearchPageMode = "search-template" | "search-page"
export type SortType = "newest" | "oldest"
export enum HeaderLink{
     Main = "main",
     About = "about",
     Templates = "templates",
     Experiments = "experiments"
}
export interface IHeaderLink{
     alias: HeaderLink,
     link: string,
     Icon: LucideIcon
}

export type TemplateFilterName = typeof TEMPLATE_FILTER_NAMES[number];
export type ExperimentFilterName = typeof EXPERIMENT_FILTER_NAMES[number];
export type ExperimentDuration = typeof DURATIONS[number];
export type ExperimentDifficulty = typeof DIFFICULTIES[number]