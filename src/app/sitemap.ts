import { defaultLocale, locales } from "@/i18n/config";
import { getAllExperiments,  getAllTags } from "@/lib/helpers/experiments";
import { absoluteLink, absoluteURL } from "@/lib/utils";
import { MetadataRoute } from "next";

export default async function Sitemap(): Promise<MetadataRoute.Sitemap> {
     const [allTags, allExperiments] = await Promise.all([
          getAllTags(defaultLocale),
          getAllExperiments(defaultLocale)
     ]);
     const now = new Date()
     const experiments: MetadataRoute.Sitemap = allExperiments.map(experiment=>({
          url: absoluteURL(`/experiments/${experiment.slug}`),
          lastModified: experiment.editDate ?? experiment.date,
          changeFrequency: "weekly",
          priority: 0.8,
          alternates: {
               languages: {
                    "x-default": absoluteURL(`/experiments/${experiment.slug}`),
                    ...Object.fromEntries(locales.map(lang=>[
                         lang,
                         absoluteLink(lang,`/experiments/${experiment.slug}`)
                    ]))
               }
          }
     }))
     const searchPages = allTags.map(val=>({
          url: absoluteURL(`/search/${encodeURIComponent(val)}`),
          lastModified: now.toISOString().slice(0, 10),
          changeFrequency: "weekly",
          priority: 0.7,
          alternates: {
               languages: {
                    "x-default": absoluteURL(`/search/${encodeURIComponent(val)}`),
                    ...Object.fromEntries(locales.map(lang=>[
                         lang,
                         absoluteLink(lang,`/search/${encodeURIComponent(val)}`)
                    ]))
               }
          }
     })) as MetadataRoute.Sitemap
     return [
          {
               url: absoluteURL(),
               lastModified: "2026-09-14",
               changeFrequency: "yearly",
               priority: 1,
               alternates: {
                    languages: {
                         "x-default": absoluteURL(),
                         ...Object.fromEntries(locales.map(lang=>[
                              lang,
                              absoluteLink(lang)
                         ]))
                    }
               }
          },
          {
               url: absoluteURL("/experiments"),
               lastModified: "2026-09-13",
               changeFrequency: "weekly",
               priority: 0.8,
               alternates: {
                    languages: {
                         "x-default": absoluteURL("/experiments"),
                         ...Object.fromEntries(locales.map(lang=>[
                              lang,
                              absoluteLink(lang,"/experiments")
                         ]))
                    }
               }
          },
          {
               url: absoluteURL("/templates"),
               lastModified: "2026-09-13",
               changeFrequency: "monthly",
               priority: 0.8,
               alternates: {
                    languages: {
                         "x-default": absoluteURL("/templates"),
                         ...Object.fromEntries(locales.map(lang=>[
                              lang,
                              absoluteLink(lang,"/templates")
                         ]))
                    }
               }
          },
          ...experiments,
          ...searchPages
     ]
}