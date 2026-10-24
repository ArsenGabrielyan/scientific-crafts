import { Metadata } from "next"
import ExperimentsMainContent from "../../../contents/experiments"
import { getAllExperiments } from "@/lib/helpers/experiments";
import { EXPERIMENT_FILTER_NAMES } from "@/lib/constants";
import { absoluteURL, createMetaAlternates } from "@/lib/utils";
import type { ExperimentDifficulty, ExperimentDuration, SortType, ExperimentFilterName } from "@/lib/types";
import { getTranslations } from "next-intl/server";
import { validateLocale } from "@/lib/helpers";

interface PageProps {
     params: Promise<{locale: string}>
     searchParams: Promise<{
          page?: string;
          pageSize?: string;
          query?: string,
          category?: ExperimentFilterName
          difficulty?: ExperimentDifficulty
          duration?: ExperimentDuration
          selfGuided?: string,
          sort?: SortType
     }>;
}

export const generateMetadata = async({ searchParams, params}: PageProps): Promise<Metadata> => {
     const {locale: rawLocale} = await params;
     const locale = validateLocale(rawLocale);
     const [search, result] = await Promise.all([
          searchParams,
          getAllExperiments(locale)
     ]);
     const allowedPageSizes = [4,8,16,24,32,48];
     const requestedPageSize = Number(search.pageSize);
     const pageSize = allowedPageSizes.includes(requestedPageSize) ? requestedPageSize : 8;
     const query = search.query?.trim().toLowerCase() ?? ""
     const searchResults = result.filter(item =>!query || item.title.includes(query))
     const totalResults = searchResults.length
     const totalPages = Math.max(1, Math.ceil(totalResults / pageSize))
     const currPage = Math.min(Math.max(Number(search.page) || 1, 1),totalPages)
     const t = await getTranslations("experiments");
     return {
          title: t("title"),
          description: t("desc"),
          pagination: {
               previous: currPage > 1 ? absoluteURL(`/experiments?page=${currPage - 1}`) : undefined,
               next: currPage < totalPages ? absoluteURL(`/experiments?page=${currPage + 1}`) : undefined
          },
          alternates: createMetaAlternates(locale,"/experiments")
     }
}

export const revalidate = 86400;

export default async function ExperimentsMainPage({ searchParams, params }: PageProps){
     const {locale: rawLocale} = await params;
     const locale = validateLocale(rawLocale);
     const [search, result] = await Promise.all([
          searchParams,
          getAllExperiments(locale)
     ]);
     const allowedPageSizes = [4,8,16,24,32,48];
     const requestedPageSize = Number(search.pageSize);
     const pageSize = allowedPageSizes.includes(requestedPageSize) ? requestedPageSize : 8;
     const category = search.category && EXPERIMENT_FILTER_NAMES.includes(search.category) ? search.category as ExperimentFilterName : undefined
     const query = search.query?.trim().toLowerCase() ?? ""
     const searchResults = result.filter(item =>!query || item.title.toLowerCase().includes(query))
     const filteredExperiments = searchResults.filter(item =>
          (!search.category || item.categories.includes(search.category)) &&
          (!search.difficulty || item.difficulty === search.difficulty) &&
          (!search.duration || item.duration === search.duration) &&
          (!search.selfGuided || item.selfGuided)
     )
     const categoryCounts = Object.fromEntries(
          EXPERIMENT_FILTER_NAMES.map(category => [
               category,
               searchResults.filter(item =>item.categories.includes(category)).length
          ])
     ) as Record<ExperimentFilterName, number>
     const sort: SortType = search.sort === "oldest" ? "oldest" : "newest"
     const sortedExperiments = [...filteredExperiments].sort((a, b) =>
          sort === "oldest"
               ? new Date(a.date).getTime() - new Date(b.date).getTime()
               : new Date(b.date).getTime() - new Date(a.date).getTime()
     )
     const totalResults = sortedExperiments.length
     const totalPages = Math.max(1, Math.ceil(totalResults / pageSize))
     const currPage = Math.min(Math.max(Number(search.page) || 1, 1),totalPages)
     const start = (currPage - 1) * pageSize
     const experiments = sortedExperiments.slice(start, start + pageSize)
     return (
          <ExperimentsMainContent
               experiments={experiments}
               pageSize={pageSize}
               currPage={currPage}
               categoryCounts={categoryCounts}
               totalResults={totalResults}
               allCount={searchResults.length}
               initialCategory={category}
               initialQuery={search.query}
               initialDifficulty={search.difficulty}
               initialDuration={search.duration}
               initialSelfGuided={search.selfGuided === "true"}
               initialSort={sort}
          />
     )
}