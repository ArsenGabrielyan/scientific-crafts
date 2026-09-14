import { Metadata } from "next";
import TemplatesMainContent from "../../contents/templates";
import { getTemplatesFromCDN } from "@/lib/helpers/templates";
import { TEMPLATE_FILTER_NAMES, TemplateFilterName } from "@/lib/constants/filters";

export const metadata: Metadata = {
     title: "Շաբլոններ"
}

export const revalidate = 3600;

export default async function TemplatesMainPage({ searchParams }: {
     searchParams: Promise<{
          page?: string;
          pageSize?: string;
          query?: string,
          category?: TemplateFilterName
     }>;
}){
     const params = await searchParams;
     const result = await getTemplatesFromCDN();
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