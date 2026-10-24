import ExperimentsList from "@/components/lists/experiments";
import { Button } from "@/components/ui/button";
import type { ExperimentMetadata } from "@/lib/types/experiment";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

interface ExperimentsSectionProps{
     experiments: ExperimentMetadata[]
}
export default function ExperimentsSection({experiments}: ExperimentsSectionProps){
     const t = useTranslations("experiments");
     const btnTxt = useTranslations("buttons");
     return (
          <section id="experiments" className="w-full min-h-[64dvh] bg-secondary py-4 px-8 flex justify-center items-center scroll-mt-10">
               <div className="w-full max-w-360 flex justify-center items-center flex-col gap-4">
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold border-b border-primary pb-1 mb-4 w-fit">{t("title")}</h2>
                    <ExperimentsList experiments={experiments}/>
                    <Button size="lg" variant="outline" asChild>
                         <Link href="/experiments">{btnTxt("details")}</Link>
                    </Button>
               </div>
          </section>
     )
}