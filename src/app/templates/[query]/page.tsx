import TemplatesMainContent from "@/contents/templates";
import { TEMPLATE_FILTER_NAMES, TemplateFilterName } from "@/lib/constants/filters";
import { getTemplatesFromCDN } from "@/lib/helpers/templates";
import { absoluteURL, createMetaAlternates } from "@/lib/utils";
import { Metadata } from "next";

interface TemplateSearchProps{
     params: Promise<{query: string}>
     searchParams: Promise<{
          page?: string;
          pageSize?: string;
          category?: TemplateFilterName
     }>;
}
export async function generateMetadata({params, searchParams}: TemplateSearchProps): Promise<Metadata>{
     const {query} = await params;
     const search = await searchParams
     const result = await getTemplatesFromCDN();
     const pageSize = Number(search.pageSize)
     const queryDecoded = decodeURIComponent(query).trim().toLowerCase() ?? ""
     const searchResults = result.data.filter(item =>!queryDecoded || item.title.toLowerCase().includes(queryDecoded))
     const totalResults = searchResults.length
     const totalPages = Math.max(1, Math.ceil(totalResults / pageSize))
     const currPage = Math.min(Math.max(Number(search.page) || 1, 1),totalPages)
     return {
          title: `«${queryDecoded}» պիտակով նշված լավագույն ${totalResults} շաբլոններ - Թարմացված ${new Date().getFullYear()}թ․`,
          description: `Ուսումնասիրեք «${queryDecoded}» պիտակով նշված ${totalResults} շաբլոնները`,
          pagination: {
               previous: currPage > 1 ? absoluteURL(`/templates/${queryDecoded}?page=${currPage - 1}`) : undefined,
               next: currPage < totalPages ? absoluteURL(`/templates/${queryDecoded}?page=${currPage + 1}`) : undefined
          },
          alternates: createMetaAlternates(`/templates/${queryDecoded}`)
     }
}
export default async function TemplateSearch({params, searchParams}: TemplateSearchProps){
     const {query} = await params;
     const search = await searchParams
     const result = await getTemplatesFromCDN();
     const allowedPageSizes = [4, 8, 16, 24];
     const requestedPageSize = Number(search.pageSize);
     const pageSize = allowedPageSizes.includes(requestedPageSize) ? requestedPageSize : 8;
     const category = search.category && Object.hasOwn(TEMPLATE_FILTER_NAMES, search.category) ? search.category as TemplateFilterName : undefined
     const queryDecoded = decodeURIComponent(query).trim().toLowerCase() ?? ""
     const searchResults = result.data.filter(item =>!queryDecoded || item.title.toLowerCase().includes(queryDecoded))
     const filteredTemplates = searchResults.filter(item =>!category || item.categories.includes(category))
     const categoryCounts = Object.fromEntries(
          Object.keys(TEMPLATE_FILTER_NAMES).map(key => {
               const category = key as TemplateFilterName
               return [
                    category,
                    searchResults.filter(item =>item.categories.includes(category)).length
               ]
          })
     ) as Record<TemplateFilterName, number>
     const totalResults = filteredTemplates.length
     const totalPages = Math.max(1, Math.ceil(totalResults / pageSize))
     const currPage = Math.min(Math.max(Number(search.page) || 1, 1),totalPages)
     const start = (currPage - 1) * pageSize
     const templates = filteredTemplates.slice(start, start + pageSize)
     return (
          <TemplatesMainContent
               templates={templates}
               pageSize={pageSize}
               currPage={currPage}
               error={result.error}
               categoryCounts={categoryCounts}
               totalResults={totalResults}
               allCount={searchResults.length}
               initialCategory={category}
               initialQuery={queryDecoded}
               mode="search-template"
          />
     )
}