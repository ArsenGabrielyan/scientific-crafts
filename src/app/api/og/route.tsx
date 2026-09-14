/* eslint-disable @next/next/no-img-element */
import { absoluteURL } from "@/lib/utils";
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
export const runtime = 'edge'

export async function GET(req: NextRequest){
     try{
          const {searchParams} = new URL(req.url);
          const montserrat = await fetch(new URL("../../fonts/montserrat-arm.ttf",import.meta.url)).then(res => res.arrayBuffer())
          const title = (searchParams.get("title") ?? "Գիտափորձի անունը տեղադրել այստեղ").slice(0,100)
          const thumbnailEndpoint = searchParams.get("thumbnail")
          const dateRaw = searchParams.get("date")
          return new ImageResponse(
               <div tw="w-full h-full flex">
                    <div style={thumbnailEndpoint ? {
                         backgroundImage: `url(${absoluteURL(thumbnailEndpoint)})`,
                         backgroundRepeat: "no-repeat",
                         backgroundPosition: "center",
                         backgroundSize: "cover",
                         width: "60%"
                    } : {
                         width: "60%",
                         backgroundColor: "#090b0c"
                    }}/>
                    <div tw="flex px-6 py-8 justify-between items-center flex-col" style={{
                         background: "linear-gradient(64deg, #090b0c 36%, #0069a8)",
                         rowGap: "15px",
                         color: "#fafafa",
                         width: "40%"
                    }}>
                         <img
                              src={absoluteURL("/icon.png")}
                              alt="logo"
                              width={100}
                              height={100}
                              loading="eager"
                         />
                         <div tw="text-[40px] font-semibold text-center">{title.length>=100 ? `${title}...` : title}</div>
                         <div tw="flex items-center justify-center text-xl" style={{
                              columnGap: "10px"
                         }}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-calendar-icon lucide-calendar" style={{
                                   width: "24px",
                                   height: "24px"
                              }}>
                                   <path d="M8 2v4"/>
                                   <path d="M16 2v4"/>
                                   <rect width="18" height="18" x="3" y="4" rx="2"/>
                                   <path d="M3 10h18"/>
                              </svg>
                              {dateRaw ? new Date(dateRaw).toISOString().slice(0, 10) : "Ամսաթիվը տեղադրել այստեղ"}
                         </div>
                    </div>
               </div>,{
                    width: 1200,
                    height: 630,
                    fonts: [
                         {
                              name: "Montserrat",
                              data: montserrat,
                              style: "normal",
                              weight: 500
                         },
                    ]
               })
     } catch (e: unknown){
          console.error(e instanceof Error ? e.message : String(e))
          return new Response("Failed to Generate OG Image",{status: 500})
     }
}