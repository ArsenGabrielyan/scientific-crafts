import matter from "gray-matter"
import {promises as fs} from "fs";
import path from "path";
import { cache } from "react";
import type { Experiment, ExperimentMetadata } from "@/lib/types/experiment";
import { LangCodeType } from "@/i18n/types";

const MAX_RELATED_EXPERIMENTS = 4
const experimentsFolder = path.join(process.cwd(), "src", "experiments");

export const getAllExperiments = cache(async(locale: LangCodeType): Promise<ExperimentMetadata[]> => {
     const files = await fs.readdir(path.join(experimentsFolder, locale));
     const experiments = await Promise.all(
          files.map(async file =>{
               const blog = await getExperimentBySlug(locale,path.parse(file).name.replace(".mdx", ""))
               if(!blog) return null
               // eslint-disable-next-line @typescript-eslint/no-unused-vars
               const {content, ...rest} = blog;
               return rest
          })
     );
     return experiments.filter((experiment): experiment is ExperimentMetadata => experiment !== null).sort((a, b) => {
          const aDate = new Date(a.date);
          const bDate = new Date(b.date);
          return bDate.getTime() - aDate.getTime()
     });
})
export const getExperimentBySlug = cache(async(locale: LangCodeType, slug: string): Promise<Experiment | null> => {
     try {
          const fullPath = path.join(experimentsFolder, locale, `${slug}.mdx`);
          const contents = await fs.readFile(fullPath, "utf8");
          const { data: frontmatter, content } = matter(contents) as unknown as {data: ExperimentMetadata, content: string}
          return {
               title: frontmatter.title,
               description: frontmatter.description,
               thumbnail: frontmatter.thumbnail,
               categories: frontmatter.categories ?? [],
               tags: frontmatter.tags ?? [],
               difficulty: frontmatter.difficulty,
               duration: frontmatter.duration,
               selfGuided: frontmatter.selfGuided,
               requirements: frontmatter.requirements,
               date: frontmatter.date,
               editDate: frontmatter.editDate,
               videoUrl: frontmatter.videoUrl,
               content,
               slug: frontmatter.slug ?? slug,
          };
     } catch (e) {
          console.error(`Failed to get experiment: ${slug}`);
          console.error(e);
          return null;
     }
})
export const getRelatedExperiments = cache(async(locale: LangCodeType, currentSlug: string, tags: string[]): Promise<ExperimentMetadata[]> => {
     const experiments = await getAllExperiments(locale)
     const related = experiments.filter(experiment => experiment.slug !== currentSlug && experiment.tags.some(tag => tags.includes(tag)));
     const seen = new Set<string>();
     return related.filter(p => {
          if (seen.has(p.slug)) return false;
          seen.add(p.slug);
          return true;
     }).slice(0, MAX_RELATED_EXPERIMENTS);
})
export const getAllTags = cache(async(locale: LangCodeType, limit?: number) => {
     const experiments = await getAllExperiments(locale);
     return [...new Set(experiments.flatMap(experiment => experiment.tags))].slice(0, limit);
});
export const getAllSlugs = cache(async(locale: LangCodeType, limit?: number) => {
     const experiments = await getAllExperiments(locale)
     return experiments.map(experiment=>experiment.slug).slice(0,limit)
})