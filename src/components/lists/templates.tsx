import type { Template } from "@/lib/types";
import TemplateCard from "../cards/template";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "../ui/empty";
import { Scissors } from "lucide-react";
import { useTranslations } from "next-intl";

interface TemplatesListProps{
     templates: Template[]
}
export default function TemplatesList({templates}: TemplatesListProps){
     const t = useTranslations("templates.empty")
     return templates.length === 0 ? (
          <Empty>
               <EmptyHeader>
                    <EmptyMedia variant="icon">
                         <Scissors/>
                    </EmptyMedia>
                    <EmptyTitle>{t("title")}</EmptyTitle>
                    <EmptyDescription>{t("desc")}</EmptyDescription>
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