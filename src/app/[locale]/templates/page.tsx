import { Metadata } from "next";
import TemplatesMainContent from "../../../contents/templates";
import { getAllTemplates, validateLocale } from "@/lib/helpers";
import { absoluteURL, createMetaAlternates } from "@/lib/utils";
import { SortType, TemplateFilterName } from "@/lib/types";
import { getTranslations } from "next-intl/server";
import { TEMPLATE_FILTER_NAMES } from "@/lib/constants";

interface PageProps {
     params: Promise<{locale: string}>
     searchParams: Promise<{
          page?: string;
          pageSize?: string;
          query?: string,
          category?: TemplateFilterName,
          sort?: SortType
     }>;
}

export const generateMetadata = async({searchParams, params}: PageProps): Promise<Metadata> => {
     const {locale: rawLocale} = await params;
     const [search, result] = await Promise.all([
          searchParams,
          getAllTemplates()
     ]);
     const locale = validateLocale(rawLocale);
     const allowedPageSizes = [4, 8, 16, 24];
     const requestedPageSize = Number(search.pageSize);
     const pageSize = allowedPageSizes.includes(requestedPageSize) ? requestedPageSize : 8;
     const query = search.query?.trim().toLowerCase() ?? ""
     const searchResults = result.filter(item =>!query || item.title[locale].includes(query))
     const totalResults = searchResults.length
     const totalPages = Math.max(1, Math.ceil(totalResults / pageSize))
     const currPage = Math.min(Math.max(Number(search.page) || 1, 1),totalPages)
     const t = await getTranslations("templates")
     return {
          title: t("title"),
          description: t("desc"),
          pagination: {
               previous: currPage > 1 ? absoluteURL(`/templates?page=${currPage - 1}`) : undefined,
               next: currPage < totalPages ? absoluteURL(`/templates?page=${currPage + 1}`) : undefined
          },
          alternates: createMetaAlternates(locale,"/templates")
     }
}

export const revalidate = 86400;

export default async function TemplatesMainPage({ searchParams, params }: PageProps){
     const {locale: rawLocale} = await params;
     const [search, result] = await Promise.all([
          searchParams,
          getAllTemplates()
     ]);
     const locale = validateLocale(rawLocale);
     const allowedPageSizes = [4, 8, 16, 24];
     const requestedPageSize = Number(search.pageSize);
     const pageSize = allowedPageSizes.includes(requestedPageSize) ? requestedPageSize : 8;
     const category = search.category && TEMPLATE_FILTER_NAMES.includes(search.category) ? search.category as TemplateFilterName : undefined
     const query = search.query?.trim().toLowerCase() ?? ""
     const searchResults = result.filter(item =>!query || item.title[locale].toLowerCase().includes(query))
     const filteredTemplates = searchResults.filter(item =>!category || item.categories.includes(category))
     const categoryCounts = Object.fromEntries(
          TEMPLATE_FILTER_NAMES.map(category => [
               category,
               searchResults.filter(item =>item.categories.includes(category)).length
          ])
     ) as Record<TemplateFilterName, number>
     const sort: SortType = search.sort === "oldest" ? "oldest" : "newest"
     const sortedTemplates = [...filteredTemplates].sort((a, b) =>
          sort === "oldest"
               ? new Date(a.date).getTime() - new Date(b.date).getTime()
               : new Date(b.date).getTime() - new Date(a.date).getTime()
     )
     const totalResults = sortedTemplates.length
     const totalPages = Math.max(1, Math.ceil(totalResults / pageSize))
     const currPage = Math.min(Math.max(Number(search.page) || 1, 1),totalPages)
     const start = (currPage - 1) * pageSize
     const templates = sortedTemplates.slice(start, start + pageSize)
     return (
          <TemplatesMainContent
               templates={templates}
               pageSize={pageSize}
               currPage={currPage}
               categoryCounts={categoryCounts}
               totalResults={totalResults}
               allCount={searchResults.length}
               initialCategory={category}
               initialQuery={search.query}
               initialSort={sort}
          />
     )
}