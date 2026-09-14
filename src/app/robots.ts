import { absoluteURL } from "@/lib/utils";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
     return {
          rules: [
               {
                    userAgent: "*",
                    allow: ["/", "/api/og/*"],
               },
          ],
          sitemap: absoluteURL("/sitemap.xml"),
     };
}