import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import "katex/dist/katex.min.css"
import { absoluteURL, cn, createMetaAlternates } from "@/lib/utils";
import { ThemeProvider } from "@/components/themes/provider";
import { KEYWORDS } from "@/lib/constants";

const geistHeading = Geist({subsets:['latin'],variable:'--font-heading'});

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(absoluteURL()),
  title: {
    absolute: "Գիտաֆիզիկա - Գիտություն, Ֆիզիկա, Քիմիա, և ոչ միայն։",
    template: `%s | Գիտաֆիզիկա`
  },
  description: "Իմացեք գիտության, ֆիզիկայի, քիմիայի և ԳՏՃՄ-ի մասին (գիտություն, տեխնոլոգիա, ճարտարագիտություն, մաթեմատիկա) փորձելով լիքը գիտական փորձեր",
  alternates: createMetaAlternates(),
  authors: {
    url: "https://github.com/ArsenGabrielyan",
    name: "Արսեն Գ․"
  },
  applicationName: "Գիտաֆիզիկա",
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon", rel: "shortcut icon"},
      { url: "/app-icon.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/app-icon.png"
  },
  keywords: KEYWORDS,
  openGraph: {
    title: "Գիտաֆիզիկա - Գիտություն, Ֆիզիկա, Քիմիա, և ոչ միայն։",
    description: "Իմացեք գիտության, ֆիզիկայի, քիմիայի և ԳՏՃՄ-ի մասին (գիտություն, տեխնոլոգիա, ճարտարագիտություն, մաթեմատիկա) փորձելով լիքը գիտական փորձեր",
    url: absoluteURL(),
    siteName: "Գիտաֆիզիկա",
    type: "website",
    images: {
      url: absoluteURL("/og-image.png"),
      width: 1200,
      height: 630
    }
  },
   twitter: {
    title: "Գիտաֆիզիկա - Գիտություն, Ֆիզիկա, Քիմիա, և ոչ միայն։",
    description: "Իմացեք գիտության, ֆիզիկայի, քիմիայի և ԳՏՃՄ-ի մասին (գիտություն, տեխնոլոգիա, ճարտարագիտություն, մաթեմատիկա) փորձելով լիքը գիտական փորձեր",
    card: "summary_large_image",
    images: [{
      url: absoluteURL("/og-image.png"),
      width: 1200,
      height: 630
    }]
  },
};

export const viewport: Viewport = {
  themeColor: "#0069a8"
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      suppressHydrationWarning
      lang="hy"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable, geistHeading.variable)}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}