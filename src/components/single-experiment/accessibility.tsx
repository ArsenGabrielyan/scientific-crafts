"use client"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { SingleExperimentComponentProps } from "@/lib/types";
import { absoluteURL, getErrorMessage } from "@/lib/utils";
import { Share2 } from "lucide-react";
import { toast } from "sonner";

export default function ExperimentAccessibility({experiment, slug}: SingleExperimentComponentProps & {
     slug: string
}){
     const shareExperiment = async() => {
          try{
               await navigator.share({
                    title: experiment.title,
                    url: absoluteURL(`/experiments/${slug}`)
               })
               toast.success("Գիտափորձը հաջողությամբ կիսվել է")
          } catch (err: unknown) {
               toast.error("Չհաջողվեց կիսվել գիտական փորձը",{
                    description: getErrorMessage(err)
               });
          }
     }
     return (
          <div className="sticky top-17.5 w-full not-prose bg-background border-b p-2 flex justify-between items-center z-30">
               <Breadcrumb className="w-3/5">
                    <BreadcrumbList className="text-xs sm:text-sm">
                         <BreadcrumbItem>
                              <BreadcrumbLink href={absoluteURL("/")}>Գլխավոր</BreadcrumbLink>
                         </BreadcrumbItem>
                         <BreadcrumbSeparator/>
                         <BreadcrumbItem>
                              <BreadcrumbLink href={absoluteURL("/experiments")}>Գիտական փորձեր</BreadcrumbLink>
                         </BreadcrumbItem>
                         <BreadcrumbSeparator/>
                         <BreadcrumbItem>
                              <BreadcrumbPage>{experiment.title}</BreadcrumbPage>
                         </BreadcrumbItem>
                    </BreadcrumbList>
               </Breadcrumb>
               <Button variant="secondary" title="Կիսվել այս փորձը" size="icon" onClick={shareExperiment}>
                    <Share2/>
               </Button>
          </div>
     )
}