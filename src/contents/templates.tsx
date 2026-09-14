"use client"
import SiteLayout from "@/components/layout"
import PaginationWithLinks from "@/components/pagination-with-links"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import SearchField from "@/components/fields/search"
import type { SearchPageMode, SearchType, Template } from "@/lib/types"
import TemplatesList from "@/components/lists/templates"
import { toast } from "sonner"
import { TEMPLATE_FILTER_NAMES, TemplateFilterName } from "@/lib/constants/filters"
import { usePathname, useRouter } from "next/navigation"
import { SearchSchema } from "@/lib/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { Search } from "lucide-react"
import { ButtonGroup } from "@/components/ui/button-group"

interface TemplatesMainContentProps {
     templates: Template[]
     pageSize: number
     currPage: number
     error?: string
     categoryCounts: Record<TemplateFilterName, number>
     totalResults: number
     allCount: number
     initialQuery?: string
     initialCategory?: TemplateFilterName
     mode?: SearchPageMode
}

export default function TemplatesMainContent({
     templates,
     pageSize,
     currPage,
     error,
     categoryCounts,
     totalResults,
     allCount,
     initialQuery,
     initialCategory,
     mode = "search-page"
}: TemplatesMainContentProps) {
     const router = useRouter()
     const pathname = usePathname()
     const [input, setInput] = useState(initialQuery || "")
     const [currFilter, setCurrFilter] = useState<"all" | TemplateFilterName>(initialCategory || "all")
     const form = useForm<SearchType>({
          resolver: zodResolver(SearchSchema),
          defaultValues: {
               query: initialQuery || ""
          },
          mode: "onChange"
     })
     useEffect(() => {
          if (error) toast.error(error)
     }, [error])
     function handleSearch(value: string) {
          setInput(value)
          const params = new URLSearchParams(window.location.search)
          params.set("page", "1")
          if (value.trim()) {
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
     const onSubmit = ({query}: SearchType) => {
          const params = new URLSearchParams({ query });
          router.push(`/templates?${params.toString()}`);
     }
     return (
          <SiteLayout>
               <section className="w-full min-h-[60dvh] flex items-center justify-center bg-radial-[at_6%_4%] from-[#0069a8] via-background to-background px-4">
                    <div className="flex items-center justify-center flex-col gap-6 w-full max-w-360 text-center md:text-left">
                         <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-semibold">
                              Շաբլոններ
                         </h1>
                         <p className="text-base md:text-lg text-muted-foreground">
                              {mode==="search-template" ? `«${initialQuery}» պիտակով նշված լավագույն ${totalResults} շաբլոններ` : "Հատուկ շաբլոններ՝ փորձեր անելու համար"}
                         </p>
                         {mode==="search-template" ? (
                              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                                   <ButtonGroup className="w-full">
                                        <Controller
                                             control={form.control}
                                             name="query"
                                             render={({field})=>(
                                                  <SearchField
                                                       {...field}
                                                       placeholder="Որոնել շաբլոններ..."
                                                       onClearSearch={()=>form.reset()}
                                                       groupClassName="bg-background/50"
                                                  />
                                             )}
                                        />
                                        <Button type="submit" disabled={!form.formState.isValid || form.formState.isSubmitting}>
                                             <Search />
                                             Որոնել
                                        </Button>
                                   </ButtonGroup>
                              </form>
                         ) : (
                              <SearchField
                                   placeholder="Որոնել"
                                   value={input}
                                   onChange={e => handleSearch(e.target.value)}
                                   onClearSearch={() => handleSearch("")}
                                   groupClassName="bg-background/50"
                              /> 
                         )}
                         <div className="flex items-center gap-2 flex-wrap">
                              <Button
                                   variant={currFilter === "all" ? "default" : "outline"}
                                   onClick={() => handleFilter("all")}
                                   className="flex-1"
                              >
                                   Բոլորը ({allCount})
                              </Button>
                              {Object.entries(TEMPLATE_FILTER_NAMES).map(([key, value]) => {
                                   const filter = key as TemplateFilterName
                                   return (
                                        <Button
                                             key={filter}
                                             variant={currFilter === filter ? "default" : "outline"}
                                             onClick={() => handleFilter(filter)}
                                             className="flex-1"
                                        >
                                             {value} ({categoryCounts[filter]})
                                        </Button>
                                   )
                              })}
                         </div>
                    </div>
               </section>
               <section className="w-full py-4 px-8 flex justify-center items-center scroll-mt-10">
                    <div className="w-full max-w-360 space-y-4">
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