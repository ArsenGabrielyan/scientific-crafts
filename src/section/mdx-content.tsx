import "katex/contrib/mhchem";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { useMDXComponents } from "@/mdx-components";

interface MDXContentProps{
     source: string
}
export default function MDXContent({source}: MDXContentProps){
     const components = useMDXComponents({})
     return (
          <article className="prose prose-slate dark:prose-invert max-w-none">
               <MDXRemote
                    source={source}
                    components={components}
                    options={{
                         mdxOptions: {
                              remarkPlugins: [remarkGfm, remarkMath],
                              rehypePlugins: [
                                   rehypeKatex,
                                   rehypeSlug,
                                   rehypeAutolinkHeadings,
                              ],
                         }
                    }}
               />
          </article>
     )
}