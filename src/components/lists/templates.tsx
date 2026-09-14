import type { Template } from "@/lib/types";
import TemplateCard from "../cards/template";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "../ui/empty";
import { Scissors } from "lucide-react";

interface TemplatesListProps{
     templates: Template[]
}
export default function TemplatesList({templates}: TemplatesListProps){
     return templates.length === 0 ? (
          <Empty>
               <EmptyHeader>
                    <EmptyMedia variant="icon">
                         <Scissors/>
                    </EmptyMedia>
                    <EmptyTitle>Շաբլոններ չկան</EmptyTitle>
                    <EmptyDescription>Այս պահին շաբլոնները դեռ չեն հրապարակվել</EmptyDescription>
               </EmptyHeader>
          </Empty>
     ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
               {templates.map(template=>(
                    <TemplateCard key={template.slug} data={template}/>
               ))}
          </div>
     )
}