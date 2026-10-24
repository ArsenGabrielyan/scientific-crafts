"use client"
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ButtonGroup } from "./ui/button-group";
import { useRouter } from "@/i18n/navigation";
import SearchField from "./fields/search";
import { getSearchSchema } from "@/lib/schemas";
import type { SearchType } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useTranslations } from "next-intl";

export default function SearchPopup(){
     const router = useRouter();
     const validationTxt = useTranslations("search.validation")
     const form = useForm<SearchType>({
          resolver: zodResolver(getSearchSchema(validationTxt)),
          defaultValues: {
               query: ""
          },
          mode: "onChange"
     })
     const onSubmit = ({query}: SearchType) => {
          const params = new URLSearchParams({ query });
          router.push(`/experiments?${params.toString()}`);
     }
     const t = useTranslations("buttons")
     return (
          <Popover>
               <PopoverTrigger asChild>
                    <Button variant="outline" size="icon" title={t("search")}>
                         <Search/>
                    </Button>
               </PopoverTrigger>
               <PopoverContent>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                         <ButtonGroup>
                              <Controller
                                   control={form.control}
                                   name="query"
                                   render={({field})=>(
                                        <SearchField
                                             {...field}
                                             placeholder={t("search")}
                                             onClearSearch={()=>form.reset()}
                                        />
                                   )}
                              />
                              <Button type="submit" disabled={!form.formState.isValid || form.formState.isSubmitting}>
                                   <Search />
                              </Button>
                         </ButtonGroup>
                    </form>
               </PopoverContent>
          </Popover>
     )
}