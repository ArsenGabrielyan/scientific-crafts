import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFoundContent(){
     return (
          <div className="p-5 flex justify-center items-center flex-col min-h-screen space-y-3">
               <h1 className="text-7xl tracking-tight font-extrabold lg:text-9xl text-primary text-center">404</h1>
               <p className="font-heading text-3xl md:text-4xl lg:text-[42px] tracking-tight font-bold text-center">Այս էջը չի գտնվել</p>
               <p className="text-base md:text-lg font-light text-center">Այս էջը, որ դուք փնտրում եք, չի գտնվել: Հնարավոր է սխալ մուտքագրել հասցեն, էջը տեղափոխվել է կամ ընդհանրապես գոյություն չունի:</p>
               <Button asChild>
                    <Link href="/">Վերադառնալ</Link>
               </Button>
          </div>
     )
}