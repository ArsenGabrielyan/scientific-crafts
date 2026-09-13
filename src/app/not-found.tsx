import NotFoundContent from "@/contents/not-found";
import { Metadata } from "next";

export const metadata: Metadata = {
     title: "Վայ... Էջը չի գտնվել"
}
export default function NotFound(){
     return (
          <NotFoundContent/>
     )
}