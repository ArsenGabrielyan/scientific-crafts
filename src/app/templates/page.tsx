import { Metadata } from "next";
import TemplatesMainContent from "../../contents/templates";
import { getAllTemplates } from "@/lib/helpers/templates";
import { TEMPLATE_FILTER_NAMES, TemplateFilterName } from "@/lib/constants/filters";
import { absoluteURL, createMetaAlternates } from "@/lib/utils";

interface PageProps {
     searchParams: Promise<{
          page?: string;
          pageSize?: string;
          query?: string,
          category?: TemplateFilterName
     }>;
}

export const generateMetadata = async({searchParams}: PageProps): Promise<Metadata> => {
     const [search, result] = await Promise.all([
          searchParams,
          getAllTemplates()
     ]);
     const allowedPageSizes = [4, 8, 16, 24];
     const requestedPageSize = Number(search.pageSize);
     const pageSize = allowedPageSizes.includes(requestedPageSize) ? requestedPageSize : 8;
     const query = search.query?.trim().toLowerCase() ?? ""
     const searchResults = result.filter(item =>!query || item.title.includes(query))
     const totalResults = searchResults.length
     const totalPages = Math.max(1, Math.ceil(totalResults / pageSize))
     const currPage = Math.min(Math.max(Number(search.page) || 1, 1),totalPages)
     return {
          title: "Շաբլոններ",
          description: "Հատուկ շաբլոններ՝ գիտափորձեր կատարելու համար",
          pagination: {
               previous: currPage > 1 ? absoluteURL(`/templates?page=${currPage - 1}`) : undefined,
               next: currPage < totalPages ? absoluteURL(`/templates?page=${currPage + 1}`) : undefined
          },
          alternates: createMetaAlternates("/templates")
     }
}

export const revalidate = 86400;

export default async function TemplatesMainPage({ searchParams }: PageProps){
     const [params, result] = await Promise.all([
          searchParams,
          getAllTemplates()
     ]);
     const allowedPageSizes = [4, 8, 16, 24];
     const requestedPageSize = Number(params.pageSize);
     const pageSize = allowedPageSizes.includes(requestedPageSize) ? requestedPageSize : 8;
     const category = params.category && Object.hasOwn(TEMPLATE_FILTER_NAMES, params.category) ? params.category as TemplateFilterName : undefined
     const query = params.query?.trim().toLowerCase() ?? ""
     const searchResults = result.filter(item =>!query || item.title.toLowerCase().includes(query))
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
     const currPage = Math.min(Math.max(Number(params.page) || 1, 1),totalPages)
     const start = (currPage - 1) * pageSize
     const templates = filteredTemplates.slice(start, start + pageSize)
     return (
          <TemplatesMainContent
               templates={templates}
               pageSize={pageSize}
               currPage={currPage}
               categoryCounts={categoryCounts}
               totalResults={totalResults}
               allCount={searchResults.length}
               initialCategory={category}
               initialQuery={params.query}
          />
     )
}