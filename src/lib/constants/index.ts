import { ListSortAscending, ListSortDescending } from "lucide-react"
import { SelectType } from "../types"
import { TFunction } from "@/i18n/types";

export const DIFFICULTIES = ["starter","intermediate","master"] as const;
export const DURATIONS = ["short","medium","long"] as const;
export const TEMPLATE_FILTER_NAMES = ["physics","optical-illusion","aerodynamics", "fluid-mechanics", "surface-chemistry"] as const
export const EXPERIMENT_FILTER_NAMES = ["physics","chemistry","optical-illusion","fire","liquid"] as const

export const GET_DEFAULT_VALUE = (t: TFunction<"experiments">): SelectType => ({
    value: "",
    label: t("all.original"),
    disabled: true
})
export const GET_SORT_VALUES = (t: TFunction<"sort">): SelectType[] => [
    {
        value: "newest",
        label: t("newest"),
        Icon: ListSortDescending
    },
    {
        value: "oldest",
        label: t("oldest"),
        Icon: ListSortAscending
    }
]