import Link from "next/link";
import { Button } from "../ui/button";
import {SiYoutube, SiGithub} from "react-icons/si"

export default function SiteFooter(){
     const year = new Date().getFullYear()
     return (
          <footer className="p-4 bg-primary/10 border-t shadow-md flex items-center justify-center">
               <div className="w-full max-w-360 flex flex-col sm:flex-row items-center justify-between gap-2 text-center md:text-left">
                    <p>&copy; {year} | Բոլոր Իրավունքները պաշտպանված են</p>
                    <div className="flex items-center gap-2">
                         <Button variant="ghost" size="icon-lg" title="Դիտել մեզ YouTube-ում" asChild>
                              <Link href="https://www.youtube.com/playlist?list=PLSI6KSDJfq-J6OxBprsyMjWmmLym2o7T3" target="_blank" rel="noreferrer noopener nofollow">
                                   <SiYoutube className="size-5 text-destructive"/>
                              </Link>
                         </Button>
                         <Button variant="ghost" size="icon-lg" title="Դիտել մեզ GitHub-ում" asChild>
                              <Link href="https://github.com/ArsenGabrielyan/scientific-crafts" target="_blank" rel="noreferrer noopener nofollow">
                                   <SiGithub className="size-5"/>
                              </Link>
                         </Button>
                    </div>
               </div>
          </footer>
     )
}