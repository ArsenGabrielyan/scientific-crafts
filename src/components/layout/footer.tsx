import { Link } from "@/i18n/navigation";
import { Button } from "../ui/button";
import {SiYoutube, SiGithub} from "react-icons/si"
import { useTranslations } from "next-intl";

export default function SiteFooter(){
     const year = new Date().getFullYear();
     const t = useTranslations("footer")
     return (
          <footer className="p-4 bg-primary/10 border-t shadow-md flex items-center justify-center">
               <div className="w-full max-w-360 flex flex-col sm:flex-row items-center justify-between gap-2 text-center md:text-left">
                    <p>&copy; {year} | {t("all-rights-reserved")}</p>
                    <div className="flex items-center gap-2">
                         <Button variant="ghost" size="icon-lg" title={t("youtube")} asChild>
                              <Link href="https://www.youtube.com/playlist?list=PLSI6KSDJfq-J6OxBprsyMjWmmLym2o7T3" target="_blank" rel="noreferrer noopener nofollow">
                                   <SiYoutube className="size-5 text-destructive"/>
                              </Link>
                         </Button>
                         <Button variant="ghost" size="icon-lg" title={t("github")} asChild>
                              <Link href="https://github.com/ArsenGabrielyan/scientific-crafts" target="_blank" rel="noreferrer noopener nofollow">
                                   <SiGithub className="size-5"/>
                              </Link>
                         </Button>
                    </div>
               </div>
          </footer>
     )
}