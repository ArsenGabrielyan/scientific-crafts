"use client"
import { Badge } from "@/components/ui/badge";
import type { SingleExperimentComponentProps } from "@/lib/types/experiment";
import { Calendar, Clock, Edit, FlaskConical, ShieldAlert, ShieldCheck, TestTube, TestTubes } from "lucide-react";
import { DIFFICULTIES, DURATIONS } from "@/lib/constants";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { EXPERIMENT_FILTER_NAMES } from "@/lib/constants/filters";

export default function ExperimentHeader({experiment}: SingleExperimentComponentProps){
     return (
          <section className="w-full min-h-[56dvh] flex items-center justify-center bg-radial-[at_6%_4%] from-[#0069a8] via-background to-background px-4">
               <div className="flex items-center justify-center flex-col gap-6 w-full max-w-360 text-center">
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-semibold">{experiment.title}</h1>
                    <p className="text-base md:text-lg text-muted-foreground">{experiment.description}</p>
                    {experiment.categories.length !== 0 && (
                         <div className="flex items-center gap-2 flex-wrap">
                              {experiment.categories.map(category=>(
                                   <Badge key={category.toLowerCase()}>{EXPERIMENT_FILTER_NAMES[category]}</Badge>
                              ))}
                         </div>
                    )}
                    <ul className="flex flex-wrap items-center justify-center gap-4">
                         <li className="flex items-center flex-col md:flex-row justify-center gap-2 flex-wrap text-sm md:text-base">
                              <Calendar className="size-5 text-muted-foreground"/>
                              {new Date(experiment.date).toLocaleDateString()}
                         </li>
                         {experiment.editDate && (
                              <li className="flex items-center flex-col md:flex-row justify-center gap-2 flex-wrap text-sm md:text-base">
                                   <Edit className="size-5 text-muted-foreground"/>
                                   {new Date(experiment.editDate).toLocaleDateString()}
                              </li>
                         )}
                         <li className="flex items-center flex-col md:flex-row justify-center gap-2 flex-wrap text-sm md:text-base">
                              <Clock className="size-5 text-muted-foreground"/>
                              {DURATIONS[experiment.duration]}
                         </li>
                         <li className="flex items-center flex-col md:flex-row justify-center gap-2 flex-wrap text-sm md:text-base">
                              {experiment.difficulty==="starter" ? (
                                   <TestTube className="size-5 text-muted-foreground"/>
                              ) : experiment.difficulty==="intermediate" ? (
                                   <TestTubes className="size-5 text-muted-foreground"/>
                              ) : (
                                   <FlaskConical className="size-5 text-muted-foreground"/>
                              )}
                              {DIFFICULTIES[experiment.difficulty]}
                         </li>
                         <li className="flex items-center flex-col md:flex-row justify-center gap-2 flex-wrap flex-1 text-sm md:text-base">
                              <Tooltip>
                                   <TooltipTrigger>
                                        {experiment.selfGuided ? (
                                             <ShieldCheck className="text-emerald-500 dark:text-emerald-400 size-4.5"/>
                                        ) : (
                                             <ShieldAlert className="text-destructive size-4.5"/>
                                        )}
                                   </TooltipTrigger>
                                   <TooltipContent>
                                        {experiment.selfGuided ? "Կարելի է կատարել ինքնուրույն" : "Մեծահասակի հսկողությունը պարտադիր է"}
                                   </TooltipContent>
                              </Tooltip>
                         </li>
                    </ul>
               </div>
          </section>
     )
}