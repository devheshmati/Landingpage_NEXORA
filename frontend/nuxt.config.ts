// import tailwindcss
import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    head: {
      title: "NEXORA — Autonomous AI Agent Infrastructure",
      titleTemplate: "%s | NEXORA",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "theme-color", content: "#090d16" },
        {
          hid: "description",
          name: "description",
          content:
            "Enterprise-grade orchestration platform for deterministic AI workflows and distributed autonomous agents.",
        },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "NEXORA" },
        {
          property: "og:title",
          content: "NEXORA — Autonomous AI Agent Infrastructure",
        },
        {
          property: "og:description",
          content:
            "Enterprise-grade orchestration platform for deterministic AI workflows and distributed autonomous agents.",
        },
        { property: "og:image", content: "/og-image.jpg" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
    pageTransition: { name: "page", mode: "out-in" },
  },
  nitro: {
    preset: "cloudflare-pages",
  },
});
