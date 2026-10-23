import NotFoundContent from "@/contents/not-found";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async(): Promise<Metadata> => {
     const t = await getTranslations("not-found");
     return {
          title: t("title"),
          description: t("desc")
     }
}
export default function NotFound(){
     return (
          <NotFoundContent/>
     )
}