import MainContent from "@/contents/main";
import { getAllExperiments } from "@/lib/helpers/experiments";
import { getAllTemplates, validateLocale } from "@/lib/helpers";

export const revalidate = 86400;

export default async function Home({params}: LayoutProps<"/[locale]">) {
  const {locale} = await params
  const [templates, experiments] = await Promise.all([
    getAllTemplates(),
    getAllExperiments(validateLocale(locale))
  ])
  return (
    <MainContent
      templates={templates}
      experiments={experiments.slice(0,8)}
    />
  );
}
