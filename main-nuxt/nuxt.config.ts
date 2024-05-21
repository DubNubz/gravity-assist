// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["assets/main.css"],
  modules: [
    "@pinia/nuxt"
  ],
  app: {
    head: {
      title: "Gravity Assist",
      link: [{ rel: "icon", type: "image/svg+xml", href: "/radiant.svg" }]
    }
  }
})
