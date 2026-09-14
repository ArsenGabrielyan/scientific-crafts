import ExperimentsMainContent from "@/contents/experiments";
import { DIFFICULTIES, DURATIONS } from "@/lib/constants";
import { EXPERIMENT_FILTER_NAMES, ExperimentFilterName } from "@/lib/constants/filters";
import { getAllExperiments } from "@/lib/helpers/experiments";
import { absoluteURL, createMetaAlternates } from "@/lib/utils";
import { Metadata } from "next";

interface ExperimentSearchProps{
     params: Promise<{query: string}>
     searchParams: Promise<{
          page?: string;
          pageSize?: string;
          category?: ExperimentFilterName
          difficulty?: keyof typeof DIFFICULTIES
          duration?: keyof typeof DURATIONS
          selfGuided?: string
     }>;
}
export async function generateMetadata({params, searchParams}: ExperimentSearchProps): Promise<Metadata>{
     const {query} = await params;
     const search = await searchParams
     const result = await getAllExperiments();
     const pageSize = Number(search.pageSize)
     const queryDecoded = decodeURIComponent(query).trim().toLowerCase() ?? ""
     const searchResults = result.filter(item =>!queryDecoded || item.title.toLowerCase().includes(queryDecoded))
     const totalResults = searchResults.length
     const totalPages = Math.max(1, Math.ceil(totalResults / pageSize))
     const currPage = Math.min(Math.max(Number(search.page) || 1, 1),totalPages)
     return {
          title: `«${queryDecoded}» պիտակով նշված լավագույն ${totalResults} գիտական փորձեր - Թարմացված ${new Date().getFullYear()}թ․`,
          description: `Ուսումնասիրեք «${queryDecoded}» պիտակով նշված ${totalResults} գիտական փորձերը`,
          pagination: {
               previous: currPage > 1 ? absoluteURL(`/templates/${queryDecoded}?page=${currPage - 1}`) : undefined,
               next: currPage < totalPages ? absoluteURL(`/templates/${queryDecoded}?page=${currPage + 1}`) : undefined
          },
          alternates: createMetaAlternates(`/search/${queryDecoded}`)
     }
}
export default async function ExperimentSearch({searchParams, params}: ExperimentSearchProps){
     const {query} = await params
     const search = await searchParams;
     const result = await getAllExperiments();
     const allowedPageSizes = [4,8,16,24,32,48];
     const requestedPageSize = Number(search.pageSize);
     const pageSize = allowedPageSizes.includes(requestedPageSize) ? requestedPageSize : 8;
     const category = search.category && Object.hasOwn(EXPERIMENT_FILTER_NAMES, search.category) ? search.category as ExperimentFilterName : undefined
     const queryDecoded = decodeURIComponent(query).trim().toLowerCase() ?? ""
     const searchResults = result.filter(item =>!queryDecoded || item.title.toLowerCase().includes(queryDecoded))
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