import SiteLayout from "@/components/layout";
import ExperimentsList from "@/components/lists/experiments";
import { Badge } from "@/components/ui/badge";
import type { Experiment, ExperimentMetadata } from "@/lib/types/experiment";
import MDXContent from "@/section/mdx-content";
import ExperimentHeader from "@/components/single-experiment/header";
import ExperimentSideInfo from "@/components/single-experiment/side-info";
import ExperimentAccessibility from "@/components/single-experiment/accessibility";

interface SingleExperimentContentProps{
     experiment: Experiment,
     related: ExperimentMetadata[],
     slug: string
}
export default function SingleExperimentContent({experiment, related, slug}: SingleExperimentContentProps){
     return (
          <SiteLayout>
               <ExperimentHeader experiment={experiment}/>
               <section className="w-full flex justify-center items-center py-4 px-4 md:px-8 scroll-mt-10">
                    <div className="w-full max-w-360 space-y-8 relative">
                         <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 relative">
                              <ExperimentSideInfo experiment={experiment}/>
                              <div className="space-y-4 relative">
                                   <ExperimentAccessibility experiment={experiment} slug={slug}/>
                                   <MDXContent source={experiment.content}/>
                              </div>
                         </div>
                         {experiment.tags.length!==0 && (
                              <>
                                   <h2 className="text-xl md:text-2xl lg:text-[27px] font-semibold border-b border-primary pb-1 mb-4 w-fit">Բանալի բառեր</h2>
                                   <div className="flex items-center gap-2 flex-wrap">
                                        {experiment.tags.map((tag,i)=>(
                                             <Badge key={`${tag.toLowerCase()}-${i+1}`}>{tag}</Badge>
                                        ))}
                                   </div>
                              </>
                         )}
                         {related && related.length!==0 && (
                              <>
                                   <h2 className="text-xl md:text-2xl lg:text-[27px] font-semibold border-b border-primary pb-1 mb-4 w-fit">Առնչվող փորձեր</h2>
                                   <ExperimentsList experiments={related}/>
                              </>
                         )}
                    </div>
               </section>
          </SiteLayout>
     )
}