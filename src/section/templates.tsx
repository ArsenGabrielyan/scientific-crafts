import TemplatesList from "@/components/lists/templates";
import { Button } from "@/components/ui/button";
import type { Template } from "@/lib/types";
import Link from "next/link";

interface TemplatesSectionProps{
     templates: Template[]
}
export default function TemplatesSection({templates}: TemplatesSectionProps){
     return (
          <section id="templates" className="w-full min-h-[90dvh] py-4 px-8 flex justify-center items-center scroll-mt-10">
               <div className="w-full max-w-360 flex justify-center items-center flex-col gap-4">
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold border-b border-primary pb-1 mb-4 w-fit">Շաբլոններ</h2>
                    <TemplatesList templates={templates.slice(0,4)}/>
                    <Button size="lg" variant="outline" asChild>
                         <Link href="/templates">Մանրամասն</Link>
                    </Button>
               </div>
          </section>
     )
}