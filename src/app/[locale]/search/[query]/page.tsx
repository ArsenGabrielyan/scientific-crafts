import ExperimentsMainContent from "@/contents/experiments";
import { EXPERIMENT_FILTER_NAMES } from "@/lib/constants";
import { validateLocale } from "@/lib/helpers";
import { getAllExperiments, getAllTags } from "@/lib/helpers/experiments";
import type { ExperimentDifficulty, ExperimentDuration, ExperimentFilterName } from "@/lib/types";
import { absoluteURL, createMetaAlternates } from "@/lib/utils";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

interface ExperimentSearchProps{
     params: Promise<{query: string, locale: string}>
     searchParams: Promise<{
          page?: string;
          pageSize?: string;
          category?: ExperimentFilterName
          difficulty?: ExperimentDifficulty
          duration?: ExperimentDuration
          selfGuided?: string
     }>;
}
export const generateStaticParams = async ({
     params: { locale: rawLocale }
}: {
     params: { locale: string }
}) => {
     const locale = validateLocale(rawLocale)
     const allTags = await getAllTags(locale, 20)

     return allTags.map(query => ({ query }))
}
export const revalidate = 86400

export async function generateMetadata({params, searchParams}: ExperimentSearchProps): Promise<Metadata>{
     const {query, locale: rawLocale} = await params;
     const locale = validateLocale(rawLocale);
     const [search, result] = await Promise.all([
          searchParams,
          getAllExperiments(locale)
     ]);
     const allowedPageSizes = [4,8,16,24,32,48];
     const requestedPageSize = Number(search.pageSize);
     const pageSize = allowedPageSizes.includes(requestedPageSize) ? requestedPageSize : 8;
     const queryDecoded = decodeURIComponent(query).trim().toLowerCase() ?? ""
     const searchResults = result.filter(item =>!queryDecoded || item.tags.includes(queryDecoded))
     const totalResults = searchResults.length
     const totalPages = Math.max(1, Math.ceil(totalResults / pageSize))
     const currPage = Math.min(Math.max(Number(search.page) || 1, 1),totalPages);
     const t = await getTranslations("search")
     return {
          title: t("title",{
               query: queryDecoded,
               total: totalResults,
               year: new Date().getFullYear()
          }),
          description: t("desc",{
               query: queryDecoded,
               total: totalResults
          }),
          pagination: {
               previous: currPage > 1 ? absoluteURL(`/search/${queryDecoded}?page=${currPage - 1}`) : undefined,
               next: currPage < totalPages ? absoluteURL(`/search/${queryDecoded}?page=${currPage + 1}`) : undefined
          },
          alternates: createMetaAlternates(locale,`/search/${queryDecoded}`)
     }
}
export default async function ExperimentSearch({searchParams, params}: ExperimentSearchProps){
     const {query, locale: rawLocale} = await params;
     const locale = validateLocale(rawLocale);
     const [search, result] = await Promise.all([
          searchParams,
          getAllExperiments(locale)
     ]);
     const allowedPageSizes = [4,8,16,24,32,48];
     const requestedPageSize = Number(search.pageSize);
     const pageSize = allowedPageSizes.includes(requestedPageSize) ? requestedPageSize : 8;
     const category = search.category && Object.hasOwn(EXPERIMENT_FILTER_NAMES, search.category) ? search.category as ExperimentFilterName : undefined
     const queryDecoded = decodeURIComponent(query).trim().toLowerCase() ?? ""
     const searchResults = result.filter(item =>!queryDecoded || item.tags.includes(queryDecoded))
     const filteredExperiments = searchResults.filter(item =>
          (!search.category || item.categories.includes(search.category)) &&
          (!search.difficulty || item.difficulty === search.difficulty) &&
          (!search.duration || item.duration === search.duration) &&
          (!search.selfGuided || item.selfGuided)
     )
     const categoryCounts = Object.fromEntries(
          Object.keys(EXPERIMENT_FILTER_NAMES).map(key => {
               const category = key as ExperimentFilterName
               return [
                    category,
                    searchResults.filter(item =>item.categories.includes(category)).length
               ]
          })
     ) as Record<ExperimentFilterName, number>
     const totalResults = filteredExperiments.length
     const totalPages = Math.max(1, Math.ceil(totalResults / pageSize))
     const currPage = Math.min(Math.max(Number(search.page) || 1, 1),totalPages)
     const start = (currPage - 1) * pageSize
     const experiments = filteredExperiments.slice(start, start + pageSize)
     return (
          <ExperimentsMainContent
               experiments={experiments}
               pageSize={pageSize}
               currPage={currPage}
               categoryCounts={categoryCounts}
               totalResults={totalResults}
               allCount={searchResults.length}
               initialCategory={category}
               initialQuery={queryDecoded}
               initialDifficulty={search.difficulty}
               initialDuration={search.duration}
               initialSelfGuided={search.selfGuided === "true"}
               mode="search-template"
          />
     )
}