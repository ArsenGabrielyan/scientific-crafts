import { LucideIcon } from "lucide-react";
import { ExperimentFilterName, TemplateFilterName } from "../constants/filters";

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
export interface ExperimentMetadata {
     title: string
     description: string
     thumbnail: string
     categories: ExperimentFilterName[]
     tags: string[]
     difficulty: "starter" | "intermediate" | "master"
     duration: "short" | "medium" | "long"
     selfGuided: boolean
     requirements: string[]
     date: string
     editDate?: string
     videoUrl?: string,
     slug: string
}
export interface Experiment extends ExperimentMetadata{
     content: string,
}
export interface SingleExperimentComponentProps{
     experiment: ExperimentMetadata
}