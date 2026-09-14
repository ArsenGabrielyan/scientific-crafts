import type { ExperimentMetadata } from "@/lib/types/experiment";
import ExperimentCard from "../cards/experiment";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "../ui/empty";
import { FlaskConical } from "lucide-react";

interface ExperimentsListProps{
     experiments: ExperimentMetadata[]
}
export default function ExperimentsList({experiments}: ExperimentsListProps){
     return experiments.length===0 ? (
          <Empty>
               <EmptyHeader>
                    <EmptyMedia variant="icon">
                         <FlaskConical/>
                    </EmptyMedia>
                    <EmptyTitle>Գիտափորձեր չկան</EmptyTitle>
                    <EmptyDescription>Այս պահին գիտական փորձերը դեռ չեն հրապարակվել</EmptyDescription>
               </EmptyHeader>
          </Empty>
     ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
               {experiments.map(exp=>(
                    <ExperimentCard key={exp.slug} data={exp}/>
               ))}
          </div>
     )
}