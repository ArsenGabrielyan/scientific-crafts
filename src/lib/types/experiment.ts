
import { ExperimentFilterName } from "../constants/filters";

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