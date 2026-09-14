import MainContent from "@/contents/main";
import { getAllExperiments } from "@/lib/helpers/experiments";
import { getTemplatesFromCDN } from "@/lib/helpers/templates";

export const revalidate = 86400;

export default async function Home() {
  const templates = await getTemplatesFromCDN()
  const experiments = await getAllExperiments()
  return (
    <MainContent
      templates={templates}
      experiments={experiments.slice(0,8)}
    />
  );
}
