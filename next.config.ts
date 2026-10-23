import type { NextConfig } from "next";
import createMDX from "@next/mdx"
import createNextIntlPlugin from 'next-intl/plugin';
import { locales, messages } from "@/i18n/config";

const messagePaths = locales.flatMap(locale=>messages.map(msg=>
  `./i18n/${locale}/${msg}.json`
))

const nextConfig: NextConfig = {
  /* config options here */
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "arsengabrielyan.github.io",
        pathname: "/scientific-crafts/**",
        port: ""
      }
    ]
  }
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
})

const withNextIntl = createNextIntlPlugin({
  experimental: {
    createMessagesDeclaration: messagePaths
  }
});

export default withNextIntl(withMDX(nextConfig));
