"use client"
import SiteLayout from "@/components/layout"
import PaginationWithLinks from "@/components/pagination-with-links"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import SearchField from "@/components/fields/search"
import type { SortType, Template, TemplateFilterName } from "@/lib/types"
import TemplatesList from "@/components/lists/templates"
import { usePathname, useRouter } from "@/i18n/navigation"
import { FilterX } from "lucide-react"
import SelectorField from "@/components/fields/selector"
import { GET_SORT_VALUES, TEMPLATE_FILTER_NAMES } from "@/lib/constants"
import { useTranslations } from "next-intl"

interface TemplatesMainContentProps {
     templates: Template[]
     pageSize: number
     currPage: number
     categoryCounts: Record<TemplateFilterName, number>
     totalResults: number
     allCount: number
     initialQuery?: string
     initialCategory?: TemplateFilterName
     initialSort?: SortType
}

export default function TemplatesMainContent({
     templates,
     pageSize,
     currPage,
     categoryCounts,
     totalResults,
     allCount,
     initialQuery,
     initialCategory,
     initialSort,
}: TemplatesMainContentProps) {
     const router = useRouter()
     const pathname = usePathname()
     const [input, setInput] = useState(initialQuery ?? "")
     const [currFilter, setCurrFilter] = useState<"all" | TemplateFilterName>(initialCategory ?? "all")
     const [sortType, setSortType] = useState<SortType>(initialSort ?? "newest");
     function handleSort(value: SortType) {
          setSortType(value)
          const params = new URLSearchParams(window.location.search)
          params.set("page", "1")
          if (value === "newest") {
               params.delete("sort")
          } else {
               params.set("sort", value)
          }
          router.push(`${pathname}?${params.toString()}`, {
               scroll: false
          })
     }
     function handleSearch(value: string) {
          setInput(value)
          const params = new URLSearchParams(window.location.search)
          params.set("page", "1")
          if (value.trim()!=="") {
               params.set("query", value.trim())
          } else {
               params.delete("query")
          }
          router.replace(`${pathname}?${params.toString()}`, {
               scroll: false
          })
     }
     function handleFilter(filter: "all" | TemplateFilterName) {
          setCurrFilter(filter)
          const params = new URLSearchParams(window.location.search)
          params.set("page", "1")
          if (filter === "all") {
               params.delete("category")
          } else {
               params.set("category", filter)
          }
          router.push(`${pathname}?${params.toString()}`, {
               scroll: false
          })
     }
     function handleClearFilters() {
          setInput("")
          setCurrFilter("all")
          const params = new URLSearchParams(window.location.search)
          params.set("page", "1")
          params.delete("query")
          params.delete("category")
          router.replace(`${pathname}?${params.toString()}`, {
               scroll: false
          })
     }
     const isEmpty = input.trim() === "" && currFilter === "all";
     const sortTxt = useTranslations("sort");
     const t = useTranslations("templates");
     const btnTxt = useTranslations("buttons")
     return (
          <SiteLayout>
               <section className="w-full min-h-[60dvh] flex items-center justify-center bg-radial-[at_6%_4%] from-[#0069a8] via-background to-background px-4">
                    <div className="flex items-center justify-center flex-col gap-6 w-full max-w-360 text-center md:text-left">
                         <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-semibold">{t("title")}</h1>
                         <p className="text-base md:text-lg text-muted-foreground">{t("desc")}</p>
                         <div className="flex items-center gap-2 w-full">
                              <SearchField
                                   placeholder={t("search")}
                                   value={input}
                                   onChange={e => handleSearch(e.target.value)}
                                   groupClassName="bg-background/50"
                                   excludeClearButton
                              />
                              {!isEmpty && (
                                   <Button variant="destructive" size="icon" title={btnTxt("clear-filters")} onClick={handleClearFilters}>
                                        <FilterX/>
                                   </Button>
                              )}
                         </div>
                         <div className="flex items-center gap-2 flex-wrap">
                              <Button
                                   variant={currFilter === "all" ? "default" : "outline"}
                                   onClick={() => handleFilter("all")}
                                   className="flex-1"
                              >
                                   {t("all",{ total: allCount })}
                              </Button>
                              {TEMPLATE_FILTER_NAMES.map(key => {
                                   const filter = key as TemplateFilterName
                                   return (
                                        <Button
                                             key={filter}
                                             variant={currFilter === filter ? "default" : "outline"}
                                             onClick={() => handleFilter(filter)}
                                             className="flex-1"
                                        >
                                             {t(`filters.${key}`)} ({categoryCounts[filter]})
                                        </Button>
                                   )
                              })}
                         </div>
                    </div>
               </section>
               <section className="w-full py-4 px-8 flex justify-center items-center scroll-mt-10">
                    <div className="w-full max-w-360 space-y-4">
                         <SelectorField
                              placeholder={sortTxt("title.templates")}
                              value={sortType}
                              onChange={value => handleSort(value as SortType)}
                              items={GET_SORT_VALUES(sortTxt)}
                         />
                         <TemplatesList templates={templates} />
                         <PaginationWithLinks
                              totalCount={totalResults}
                              pageSize={pageSize}
                              page={currPage}
                              navigationMode="router"
                              pageSizeSelectOptions={{
                                   pageSizeOptions: [4, 8, 16, 24]
                              }}
                         />
                    </div>
               </section>
          </SiteLayout>
     )
}