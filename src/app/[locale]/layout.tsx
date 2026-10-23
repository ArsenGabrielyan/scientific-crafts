import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "../globals.css";
import "katex/dist/katex.min.css"
import { absoluteURL, cn, createMetaAlternates } from "@/lib/utils";
import { ThemeProvider } from "@/components/themes/provider";
import { KEYWORDS } from "@/lib/constants";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";

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

export const generateMetadata = async(): Promise<Metadata> => {
  const t = await getTranslations("site")
  return {
    metadataBase: new URL(absoluteURL()),
      title: {
        absolute: t("title.absolute"),
        template: t("title.template")
      },
      description: t("desc"),
      alternates: createMetaAlternates(),
      authors: {
        url: "https://github.com/ArsenGabrielyan",
        name: t("author")
      },
      applicationName: t("title.short"),
      icons: {
        icon: [
          { url: "/favicon.ico", type: "image/x-icon", rel: "shortcut icon"},
          { url: "/app-icon.png", sizes: "192x192", type: "image/png" },
        ],
        apple: "/app-icon.png"
      },
      keywords: KEYWORDS,
      openGraph: {
        title: t("title.absolute"),
        description: t("desc"),
        url: absoluteURL(),
        siteName: t("title.short"),
        type: "website",
        images: {
          url: absoluteURL("/og-image.png"),
          width: 1200,
          height: 630
        }
      },
      twitter: {
        title: t("title.absolute"),
        description: t("desc"),
        card: "summary_large_image",
        images: [{
          url: absoluteURL("/og-image.png"),
          width: 1200,
          height: 630
        }]
      }
  }
};

export const viewport: Viewport = {
  themeColor: "#0069a8"
}

export default async function RootLayout({ children, params }: LayoutProps<"/[locale]">) {
  const {locale} = await params
  return (
    <html
      suppressHydrationWarning
      lang={locale}
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable, geistHeading.variable)}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}