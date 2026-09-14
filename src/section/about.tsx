import Image from "next/image";

export default function AboutSection(){
     return (
          <section className="w-full min-h-[50dvh] pb-4 pt-0 md:pt-4 px-8 flex justify-center items-center scroll-mt-5" id="about">
               <div className="w-full max-w-360 flex flex-col md:flex-row gap-8 justify-between items-center">
                    <div className="flex-1">
                         <Image src="/app-icon.png" alt="Scientific Crafts" width={256} height={256} className="object-contain rounded-lg"/>
                    </div>
                    <div className="space-y-4 flex-2">
                         <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold border-b border-primary pb-1 mb-4">Մեր Մասին</h2>
                         <p><span className="font-semibold">Գիտաֆիզիկա</span>ն ինքնուրույն գիտական ​​նախագիծ է, որը ստեղծվել է գիտությունը լայն լսարանի համար գրավիչ և հասանելի դարձնելու համար՝ գործնական փորձերի միջոցով: Այն ներառում է փորձերի տեսանյութեր, մանրամասն ուղեցույցներ և ներբեռնվող ձևանմուշներ, որոնք ընդգրկում են ֆիզիկան, քիմիան, STEM-ը և դրանց հետ կապված թեմաները:</p>
                         <p>Նախագիծը սկիզբ է առել 2018 թվականին՝ որպես գիտական փորձերի տեսաշար, իսկ այժմ ընդլայնվում է նաև որպես ինտերակտիվ վեբ նախագիծ՝ փորձերը, բացատրությունները և ձևանմուշները մեկ վայրում հասանելի դարձնելու համար:</p>
                    </div>
               </div>
          </section>
     )
}