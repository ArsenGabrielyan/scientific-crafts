import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFoundContent(){
     const t = useTranslations("not-found");
     return (
          <div className="p-5 flex justify-center items-center flex-col min-h-screen space-y-3">
               <h1 className="text-7xl tracking-tight font-extrabold lg:text-9xl text-primary text-center">404</h1>
               <p className="font-heading text-3xl md:text-4xl lg:text-[42px] tracking-tight font-bold text-center">{t("page-title")}</p>
               <p className="text-base md:text-lg font-light text-center">{t("desc")}</p>
               <Button asChild>
                    <Link href="/">{t("back")}</Link>
               </Button>
          </div>
     )
}