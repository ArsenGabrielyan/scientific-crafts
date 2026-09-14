import { TooltipProvider } from "@/components/ui/tooltip";
import SingleExperimentContent from "@/contents/single-experiment";
import { KEYWORDS } from "@/lib/constants";
import { getAllSlugs, getExperimentBySlug, getRelatedExperiments } from "@/lib/helpers/experiments";
import { createMetaAlternates } from "@/lib/utils";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface SingleExperimentPageProps{
  params: Promise<{slug: string}>
}
export const revalidate = 86400

export const generateStaticParams = async() => {
  const allSlugs = await getAllSlugs(20);
  return allSlugs.map(slug => ({slug}))
}

export const generateMetadata = async({params}:SingleExperimentPageProps): Promise<Metadata> => {
     const {slug} = await params;
     const currExperiment = await getExperimentBySlug(slug);
     if(!currExperiment) return notFound();
     return {
          title: currExperiment.title,
          description: currExperiment.description,
          keywords: [...currExperiment.tags, ...KEYWORDS],
          authors: [
               {
                    name: "Arsen G.",
                    url: "https://arsen-2005.vercel.app/"
               }
          ],
          alternates: createMetaAlternates(`/experiments/${slug}`)
     }
}

export default async function SingleExperimentPage({params}: SingleExperimentPageProps){
     const {slug} = await params
     const currExperiment = await getExperimentBySlug(slug);
     if(!currExperiment) notFound();
     const relatedExperiments = await getRelatedExperiments(slug, currExperiment.tags)
     return (
          <TooltipProvider>
               <SingleExperimentContent
                    experiment={currExperiment}
                    related={relatedExperiments}
                    slug={slug}
               />
          </TooltipProvider>
     )
}