import type { ExperimentMetadata } from "@/lib/types/experiment";
import ExperimentCard from "../cards/experiment";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "../ui/empty";
import { FlaskConical } from "lucide-react";
import { useTranslations } from "next-intl";

interface ExperimentsListProps{
     experiments: ExperimentMetadata[]
}
export default function ExperimentsList({experiments}: ExperimentsListProps){
     const t = useTranslations("experiments.empty")
     return experiments.length===0 ? (
          <Empty>
               <EmptyHeader>
                    <EmptyMedia variant="icon">
                         <FlaskConical/>
                    </EmptyMedia>
                    <EmptyTitle>{t("title")}</EmptyTitle>
                    <EmptyDescription>{t("desc")}</EmptyDescription>
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