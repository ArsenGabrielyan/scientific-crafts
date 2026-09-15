import { Metadata } from "next"
import ExperimentsMainContent from "../../contents/experiments"
import { getAllExperiments } from "@/lib/helpers/experiments";
import { EXPERIMENT_FILTER_NAMES, ExperimentFilterName } from "@/lib/constants/filters";
import { DIFFICULTIES, DURATIONS } from "@/lib/constants";
import { absoluteURL, createMetaAlternates } from "@/lib/utils";

interface PageProps {
     searchParams: Promise<{
          page?: string;
          pageSize?: string;
          query?: string,
          category?: ExperimentFilterName
          difficulty?: keyof typeof DIFFICULTIES
          duration?: keyof typeof DURATIONS
          selfGuided?: string
     }>;
}

export const generateMetadata = async({ searchParams }: PageProps): Promise<Metadata> => {
     const [search, result] = await Promise.all([
          searchParams,
          getAllExperiments()
     ]);
     const allowedPageSizes = [4,8,16,24,32,48];
     const requestedPageSize = Number(search.pageSize);
     const pageSize = allowedPageSizes.includes(requestedPageSize) ? requestedPageSize : 8;
     const query = search.query?.trim().toLowerCase() ?? ""
     const searchResults = result.filter(item =>!query || item.title.includes(query))
     const totalResults = searchResults.length
     const totalPages = Math.max(1, Math.ceil(totalResults / pageSize))
     const currPage = Math.min(Math.max(Number(search.page) || 1, 1),totalPages)
     return {
          title: "Գիտական փորձեր",
          description: "Այստեղ դուք կուսումնասիրեք և կկատարեք լիքը գիտական փորձեր։",
          pagination: {
               previous: currPage > 1 ? absoluteURL(`/experiments?page=${currPage - 1}`) : undefined,
               next: currPage < totalPages ? absoluteURL(`/experiments?page=${currPage + 1}`) : undefined
          },
          alternates: createMetaAlternates("/experiments")
     }
}

export const revalidate = 86400;

export default async function ExperimentsMainPage({ searchParams }: PageProps){
     const [params, result] = await Promise.all([
          searchParams,
          getAllExperiments()
     ]);
     const allowedPageSizes = [4,8,16,24,32,48];
     const requestedPageSize = Number(params.pageSize);
     const pageSize = allowedPageSizes.includes(requestedPageSize) ? requestedPageSize : 8;
     const category = params.category && Object.hasOwn(EXPERIMENT_FILTER_NAMES, params.category) ? params.category as ExperimentFilterName : undefined
     const query = params.query?.trim().toLowerCase() ?? ""
     const searchResults = result.filter(item =>!query || item.title.toLowerCase().includes(query))
     const filteredExperiments = searchResults.filter(item =>
          (!params.category || item.categories.includes(params.category)) &&
          (!params.difficulty || item.difficulty === params.difficulty) &&
          (!params.duration || item.duration === params.duration) &&
          (!params.selfGuided || item.selfGuided)
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
     const currPage = Math.min(Math.max(Number(params.page) || 1, 1),totalPages)
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
               initialQuery={params.query}
               initialDifficulty={params.difficulty}
               initialDuration={params.duration}
               initialSelfGuided={params.selfGuided === "true"}
          />
     )
}