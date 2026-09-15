import { getAllSlugs, getAllTags } from "@/lib/helpers/experiments";
import { absoluteURL } from "@/lib/utils";
import { MetadataRoute } from "next";

export default async function Sitemap(): Promise<MetadataRoute.Sitemap> {
     const [allTags, allSlugs] = await Promise.all([
          getAllTags(),
          getAllSlugs()
     ]);
     const now = new Date()
     const experiments: MetadataRoute.Sitemap = allSlugs.map(val=>({
          url: absoluteURL(`/experiments/${val}`),
          lastModified: now.toISOString().slice(0, 10),
          changeFrequency: "weekly",
          priority: 0.8,
     }))
     const searchPages = allTags.map(val=>({
          url: absoluteURL(`/search/${encodeURIComponent(val)}`),
          lastModified: now.toISOString().slice(0, 10),
          changeFrequency: "weekly",
          priority: 0.7,
     })) as MetadataRoute.Sitemap
     return [
          {
               url: absoluteURL(),
               lastModified: "2026-09-14",
               changeFrequency: "yearly",
               priority: 1,
          },
          {
               url: absoluteURL("/experiments"),
               lastModified: "2026-09-13",
               changeFrequency: "monthly",
               priority: 0.8,
          },
          {
               url: absoluteURL("/templates"),
               lastModified: "2026-09-13",
               changeFrequency: "monthly",
               priority: 0.8,
          },
          ...experiments,
          ...searchPages
     ]
}