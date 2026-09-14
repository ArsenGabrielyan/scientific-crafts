import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Գիտաֆիզիկա",
    short_name: "Գիտաֆիզիկա",
    description: "Իմացեք գիտության, ֆիզիկայի, քիմիայի և ԳՏՃՄ-ի մասին (գիտություն, տեխնոլոգիա, ճարտարագիտություն, մաթեմատիկա) փորձելով լիքը գիտական փորձեր",
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#0069a8',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: "/app-icon.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable"
      }
    ],
  }
}