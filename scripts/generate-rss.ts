import { Feed } from "feed"
import fs from "fs"
import path from "path"
import { getAllExperiments } from "@/lib/helpers/experiments"

const SITE_URL = "https://gitafizika.vercel.app"

const generateRSS = async() => {
     const feed = new Feed({
          id: SITE_URL,
          title: "Գիտաֆիզիկա",
          description: "Իմացեք գիտության, ֆիզիկայի, քիմիայի և ԳՏՃՄ-ի մասին (գիտություն, տեխնոլոգիա, ճարտարագիտություն, մաթեմատիկա) փորձելով լիքը գիտական փորձեր",
          generator: "Feed for Node.js",
          language: "hy",
          link: SITE_URL,
          image: `${SITE_URL}/app-icon.png`,
          favicon: `${SITE_URL}/favicon.ico`,
          copyright: `Բոլոր իրավունքները պաշտպանված են, ${new Date().getFullYear()}, Արսեն Գ․`,
          category: "Science",
          author: {
               link: "https://github.com/ArsenGabrielyan",
               name: "Արսեն Գ․"
          },
          feedLinks: {
               rss2: `${SITE_URL}/rss.xml`,
               json: `${SITE_URL}/rss.json`,
               atom: `${SITE_URL}/atom.xml`,
          },
     })

     const experiments = await getAllExperiments()

     experiments.forEach(post => {
          feed.addItem({
               title: post.title,
               description: post.description,
               id: `${SITE_URL}/posts/${post.slug}`,
               link: `${SITE_URL}/posts/${post.slug}`,
               date: new Date(post.date),
               category: post.categories.map(cat=>({name: cat})),
               image: `${SITE_URL}/${post.thumbnail}`,
               author: [
                    {
                         link: "https://github.com/ArsenGabrielyan",
                         name: "Արսեն Գ․"
                    },
               ]
          })
     })

     const publicDir = path.join(process.cwd(), "public")
     if (!fs.existsSync(publicDir)) {
          fs.mkdirSync(publicDir)
     }

     fs.writeFileSync(path.join(publicDir, "rss.xml"), feed.rss2())
     fs.writeFileSync(path.join(publicDir, "rss.json"), feed.json1())
     fs.writeFileSync(path.join(publicDir, "atom.xml"), feed.atom1())

     console.log("✅ RSS feeds generated.")
}
generateRSS()