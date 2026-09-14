import { Button } from "@/components/ui/button";
import { PlayCircle, RssIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection(){
     return (
          <section id="hero" className="w-full min-h-dvh flex items-center justify-center bg-radial-[at_6%_4%] from-[#0069a8] via-background to-background scroll-mt-5 px-4">
               <div className="flex items-center justify-center flex-col gap-6 w-full max-w-360 text-center md:text-left">
                    <Image src="/icon.png" alt="logo-icon" width={100} height={100}/>
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-semibold">Գիտաֆիզիկա</h1>
                    <p className="text-base md:text-lg text-muted-foreground">Ուսումնասիրեք գիտության, ֆիզիկայի, քիմիայի և ԳՏՃՄ-ի մասին ավելի մանրամասն։</p>
                    <div className="flex flex-wrap items-center gap-2">
                         <Button asChild className="flex-1">
                              <Link href="/#about">Իմանալ ավելին</Link>
                         </Button>
                         <Button variant="secondary" asChild className="flex-1">
                              <Link href="https://youtube.com/playlist?list=PLSI6KSDJfq-J6OxBprsyMjWmmLym2o7T3" target="_blank" rel="noopener noreferrer nofollow">
                                   <PlayCircle/>
                                   Դիտել Փլեյլիստը
                              </Link>
                         </Button>
                         <Button variant="outline" size="icon" title="Հետևիր մեզ" asChild>
                              <Link href="/rss.xml" target="_blank" rel="noopener nofollow noreferrer">
                                   <RssIcon/>
                              </Link>
                         </Button>
                    </div>
               </div>
          </section>
     )
}