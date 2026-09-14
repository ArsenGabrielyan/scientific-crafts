export const TEMPLATE_FILTER_NAMES = {
     physics: "Ֆիզիկա",
     "optical-illusion": "Տեսողական պատրանք",
     aerodynamics: "Աերոդինամիկա",
     "fluid-mechanics": "Հեղուկների մեխանիկա",
     "surface-chemistry": "Մակերևութային քիմիա",
} as const

export const EXPERIMENT_FILTER_NAMES = {
     physics: "Ֆիզիկա",
     chemistry: "Քիմիա"
} as const

export type TemplateFilterName = keyof typeof TEMPLATE_FILTER_NAMES
export type ExperimentFilterName = keyof typeof EXPERIMENT_FILTER_NAMES