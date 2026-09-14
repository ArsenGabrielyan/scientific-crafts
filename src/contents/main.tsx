"use client"
import SiteLayout from "@/components/layout";
import AboutSection from "@/section/about";
import ExperimentsSection from "@/section/experiments";
import HeroSection from "@/section/hero";
import TemplatesSection from "@/section/templates";
import type { Template } from "@/lib/types";
import type { ExperimentMetadata } from "@/lib/types/experiment";

interface MainContentProps{
     templates: Template[],
     experiments: ExperimentMetadata[]
}
export default function MainContent({templates, experiments}: MainContentProps){
     return (
          <SiteLayout>
               <HeroSection/>
               <AboutSection/>
               <ExperimentsSection experiments={experiments}/>
               <TemplatesSection templates={templates}/>
          </SiteLayout>
     )
}