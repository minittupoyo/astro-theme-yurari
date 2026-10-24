// @ts-check
import { defineConfig } from "astro/config";

import icon from "astro-icon";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import keystatic from "@keystatic/astro";
import { satteri } from "@astrojs/markdown-satteri";
import ogp from "./src/plugins/ogp.mjs";
import callout from "./src/plugins/callout.mjs";

// Keystatic (ローカルモード) は開発サーバーでのみ有効にする。
// 管理画面のルートはサーバーレンダリングが必要で、静的ビルドにはアダプターが要るため。
const isDev = process.argv.includes("dev");

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  integrations: [icon(), ...(isDev ? [react(), keystatic()] : [])],

  markdown: {
    processor: satteri({ mdastPlugins: [callout, ogp] }),
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
