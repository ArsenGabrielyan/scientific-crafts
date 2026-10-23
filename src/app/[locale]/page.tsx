import MainContent from "@/contents/main";
import { getAllExperiments } from "@/lib/helpers/experiments";
import { getAllTemplates } from "@/lib/helpers/templates";

export const revalidate = 86400;

export default async function Home() {
  const [templates, experiments] = await Promise.all([
    getAllTemplates(),
    getAllExperiments()
  ])
  return (
    <MainContent
      templates={templates}
      experiments={experiments.slice(0,8)}
    />
  );
}
