"use client"
import type { SingleExperimentComponentProps } from "@/lib/types/experiment";
import { PlayCircle } from "lucide-react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function ExperimentSideInfo({experiment}: SingleExperimentComponentProps){
     return (
          <div className="space-y-4 relative md:sticky mb-3 lg:mb-0 top-0 lg:top-21.25 h-fit">
               {experiment.requirements.length !== 0 && (
                    <>
                         <h2 className="text-xl md:text-2xl lg:text-[27px] font-semibold border-b border-primary pb-1 mb-4 w-fit">Ձեզ անհրաժեշտ են</h2>
                         <ul className="list-disc pl-5 space-y-2 marker:text-primary">
                              {experiment.requirements.map((req,i)=>(
                                   <li key={`req-${i+1}`}>{req}</li>
                              ))}
                         </ul>
                    </>
               )}
               {experiment.videoUrl && (
                    <>
                    <Separator/>
                    <Link
                         href={experiment.videoUrl}
                         target="_blank"
                         rel="noopener noreferrer nofollow"
                         aria-label={`Դիտել ${experiment.title} տեսանյութը`}
                         className="block group relative w-full"
                    >
                         <Image
                              src={experiment.thumbnail}
                              alt={experiment.title}
                              width={1280}
                              height={720}
                              className="aspect-video w-full rounded-md border object-cover"
                         />
                         <div className="absolute inset-0 flex items-center justify-center rounded-md bg-background/50 dark:bg-background/75">
                              <PlayCircle className="size-12 text-primary transition-transform group-hover:scale-110" />
                         </div>
                         </Link>
                    </>
               )}
          </div>
     )
}