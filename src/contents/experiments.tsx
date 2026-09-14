"use client"
import SearchField from "@/components/fields/search";
import SelectorField from "@/components/fields/selector";
import SiteLayout from "@/components/layout";
import ExperimentsList from "@/components/lists/experiments";
import PaginationWithLinks from "@/components/pagination-with-links";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DIFFICULTIES, DURATIONS } from "@/lib/constants";
import { EXPERIMENT_FILTER_NAMES, ExperimentFilterName } from "@/lib/constants/filters";
import { SearchSchema } from "@/lib/schemas";
import { SearchPageMode, SearchType } from "@/lib/types";
import type { ExperimentMetadata } from "@/lib/types/experiment";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search, ShieldCheck } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

interface ExperimentsMainContentProps {
     initialQuery?: string
     initialCategory?: ExperimentFilterName
     initialDifficulty?: keyof typeof DIFFICULTIES
     initialDuration?: keyof typeof DURATIONS
     initialSelfGuided?: boolean
     experiments: ExperimentMetadata[]
     pageSize: number
     currPage: number
     categoryCounts: Record<ExperimentFilterName, number>
     totalResults: number
     allCount: number,
     mode?: SearchPageMode
}
export default function ExperimentsMainContent({
     experiments,
     pageSize,
     currPage,
     categoryCounts,
     totalResults,
     allCount,
     initialQuery,
     initialCategory,
     initialDifficulty,
     initialDuration,
     initialSelfGuided,
     mode="search-page"
}: ExperimentsMainContentProps){
     const router = useRouter()
     const pathname = usePathname()
     const [input, setInput] = useState(initialQuery || "")
     const [currFilter, setCurrFilter] = useState<"all" | ExperimentFilterName>(initialCategory || "all")
     const [difficulty, setDifficulty] = useState(initialDifficulty)
     const [duration, setDuration] = useState(initialDuration)
     const [selfGuided, setSelfGuided] = useState(initialSelfGuided ?? false)
     const form = useForm<SearchType>({
          resolver: zodResolver(SearchSchema),
          defaultValues: {
               query: initialQuery || ""
          },
          mode: "onChange"
     })
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
     function handleFilter(filter: "all" | ExperimentFilterName) {
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

     function handleDifficulty(value: keyof typeof DIFFICULTIES) {
          setDifficulty(value)

          const params = new URLSearchParams(window.location.search)
          params.set("page", "1")
          params.set("difficulty", value)

          router.push(`${pathname}?${params.toString()}`, {
               scroll: false
          })
     }

     function handleDuration(value: keyof typeof DURATIONS) {
          setDuration(value)

          const params = new URLSearchParams(window.location.search)
          params.set("page", "1")
          params.set("duration", value)

          router.push(`${pathname}?${params.toString()}`, {
               scroll: false
          })
     }

     function handleSelfGuided(value: boolean) {
          setSelfGuided(value)

          const params = new URLSearchParams(window.location.search)
          params.set("page", "1")

          if (value) {
               params.set("selfGuided", "true")
          } else {
               params.delete("selfGuided")
          }

          router.push(`${pathname}?${params.toString()}`, {
               scroll: false
          })
     }
     const onSubmit = ({query}: SearchType) => {
          const params = new URLSearchParams({ query });
          router.push(`/experiments?${params.toString()}`);
     }
     return (
          <SiteLayout>
               <section className="w-full min-h-[64dvh] flex items-center justify-center bg-radial-[at_6%_4%] from-[#0069a8] via-background to-background px-4">
                    <div className="flex items-center justify-center flex-col gap-6 w-full max-w-360 text-center md:text-left">
                         <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-semibold">Գիտական փորձեր</h1>
                         <p className="text-base md:text-lg text-muted-foreground">
                              {mode==="search-page" ? "Այստեղ դուք կուսումնասիրեք և կկատարեք լիքը գիտական փորձեր։" : `«${initialQuery}» պիտակով նշված լավագույն ${totalResults} գիտական փորձեր`}
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
                                                       placeholder="Որոնել գիտական փորձեր..."
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
                              {Object.entries(EXPERIMENT_FILTER_NAMES).map(([key, value]) => {
                                   const filter = key as ExperimentFilterName
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
               <section className="w-full py-4 px-8 flex justify-center items-center flex-col gap-4 scroll-mt-10">
                    <div className="w-full max-w-360 space-y-4">
                         <div className="flex items-center gap-2 flex-wrap">
                              <SelectorField
                                   placeholder="Բարդություն"
                                   value={difficulty}
                                   onChange={val=>handleDifficulty(val as keyof typeof DIFFICULTIES)}
                                   items={Object.entries(DIFFICULTIES).map(([key,val])=>({
                                        value: key,
                                        label: val
                                   }))}
                                   className="flex-1"
                              />
                              <SelectorField
                                   placeholder="Տևողություն"
                                   value={duration}
                                   onChange={val=>handleDuration(val as keyof typeof DURATIONS)}
                                   items={Object.entries(DURATIONS).map(([key,val])=>({
                                        value: key,
                                        label: val
                                   }))}
                                   className="flex-1"
                              />
                              <div className="rounded-md shadow-xs border bg-background p-2 flex justify-between items-center flex-1 dark:bg-input/30 dark:hover:bg-input/50 border-input aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50">
                                   <div className="flex items-center gap-2">
                                        <ShieldCheck className="text-emerald-500 dark:text-emerald-400 size-4.5"/> 
                                        <Label htmlFor="self-guided">
                                             Միայն ինքնուրույն կատարվող
                                        </Label>
                                   </div>
                                   <Switch
                                        id="self-guided"
                                        checked={selfGuided}
                                        onCheckedChange={handleSelfGuided}
                                   />
                              </div>
                         </div>
                         <ExperimentsList experiments={experiments}/>
                         <PaginationWithLinks
                              totalCount={totalResults}
                              pageSize={pageSize}
                              page={currPage}
                              navigationMode="router"
                              pageSizeSelectOptions={{
                                   pageSizeOptions: [4,8,16,24,32,48]
                              }}
                         />
                    </div>
               </section>
          </SiteLayout>
     )
}