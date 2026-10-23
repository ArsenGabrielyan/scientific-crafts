import hyMain from "@i18n/hy/main.json"

import { NamespaceKeys, NestedKeyOf, useTranslations } from "next-intl";

export type LangCodeType = 'en' | 'hy' | "ru";
type CountryCodeType = 'us' | 'am' | "ru";
export interface ILanguage{
     code: LangCodeType,
     countryCode: CountryCodeType,
     label: string
}
export type MessageSchema = (
     typeof hyMain
)

type TranslationNS = NamespaceKeys<MessageSchema,NestedKeyOf<MessageSchema>>
export type TFunction<T extends TranslationNS> = ReturnType<typeof useTranslations<T>>