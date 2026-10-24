import { Feed } from "feed"
import fs from "fs"
import path from "path"
import { getAllExperiments } from "@/lib/helpers/experiments"
import { defaultLocale, locales } from "@/i18n/config"
import type { LangCodeType } from "@/i18n/types"
import { localePath } from "@/lib/helpers"

const SITE_URL = "https://gitafizika.vercel.app"

const FEED_META = {
     hy: {
          title: "Գիտաֆիզիկա",
          description: "Իմացեք գիտության, ֆիզիկայի, քիմիայի և ԳՏՃՄ-ի մասին՝ կատարելով գիտական փորձեր։",
          author: "Արսեն Գ․",
          copyright: "Բոլոր իրավունքները պաշտպանված են"
     },
     en: {
          title: "Scientific Crafts",
          description: "Learn about science, physics, chemistry and STEM through science experiments.",
          author: "Arsen G.",
          copyright: "All rights reserved"
     },
     ru: {
          title: "Научная Физика",
          description: "Изучайте науку, физику, химию и STEM с помощью научных экспериментов.",
          author: "Арсен Г.",
          copyright: "Все права защищены"
     }
} satisfies Record<LangCodeType, {
     title: string
     description: string
     author: string
     copyright: string
}>

async function generateRSS(locale: LangCodeType) {
     const meta = FEED_META[locale]
     const prefix = localePath(locale)
     const feed = new Feed({
          id: `${SITE_URL}${prefix || "/"}`,
          title: meta.title,
          description: meta.description,
          generator: "Feed for Node.js",
          language: locale,
          link: `${SITE_URL}${prefix || "/"}`,
          image: `${SITE_URL}/app-icon.png`,
          favicon: `${SITE_URL}/favicon.ico`,
          copyright: `${meta.copyright}, ${new Date().getFullYear()}, ${meta.author}`,
          category: "Science",
          author: {
               link: "https://github.com/ArsenGabrielyan",
               name: meta.author
          },
          feedLinks: {
               rss2: `${SITE_URL}${prefix}/rss.xml`,
               json: `${SITE_URL}${prefix}/rss.json`,
               atom: `${SITE_URL}${prefix}/atom.xml`
          }
     })
     const experiments = await getAllExperiments(locale)
     experiments.forEach(post => {
          const url = `${SITE_URL}${localePath(locale,`/experiments/${post.slug}`)}`
          feed.addItem({
               title: post.title,
               description: post.description,
               id: url,
               link: url,
               date: new Date(post.date),
               category: post.categories.map(name => ({ name })),
               image: `${SITE_URL}${post.thumbnail}`,
               author: [{
                    link: "https://github.com/ArsenGabrielyan",
                    name: meta.author
               }]
          })
     })

     const outputDir = locale === defaultLocale ? path.join(process.cwd(), "public") : path.join(process.cwd(), "public", locale)
     fs.mkdirSync(outputDir, { recursive: true })
     fs.writeFileSync(path.join(outputDir, "rss.xml"), feed.rss2())
     fs.writeFileSync(path.join(outputDir, "rss.json"), feed.json1())
     fs.writeFileSync(path.join(outputDir, "atom.xml"), feed.atom1())
}

Promise.all(locales.map(generateRSS)).then(() => {
     console.log("✅ Localized RSS feeds generated.")
})