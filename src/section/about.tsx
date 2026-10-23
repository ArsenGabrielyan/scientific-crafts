import { useTranslations } from "next-intl";
import Image from "next/image";

export default function AboutSection(){
     const t = useTranslations("about")
     return (
          <section className="w-full min-h-[50dvh] pb-4 pt-0 md:pt-4 px-8 flex justify-center items-center scroll-mt-5" id="about">
               <div className="w-full max-w-360 flex flex-col md:flex-row gap-8 justify-between items-center">
                    <div className="flex-1">
                         <Image src="/app-icon.png" alt="Scientific Crafts" width={256} height={256} className="object-contain rounded-lg"/>
                    </div>
                    <div className="space-y-4 flex-2">
                         <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold border-b border-primary pb-1 mb-4">{t("title")}</h2>
                         <p>{t.rich("line1",{
                              bold: chunks => <span className="font-semibold">{chunks}</span>
                         })}</p>
                         <p>{t("line2")}</p>
                    </div>
               </div>
          </section>
     )
}