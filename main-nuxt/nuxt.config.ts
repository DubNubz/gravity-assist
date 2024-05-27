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
      meta: [
        { charset: 'UTF-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        { hid: 'description', name: 'description', content: '' }
      ],
      link: [{ rel: "icon", type: "image/svg+xml", href: "/ui/radiant.svg" }],
      script: [
        { src: 'https://www.googletagmanager.com/gtag/js?id=G-41RFT8ZEZ8', async: true },
        {
          hid: 'gtag',
          innerHTML: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){ dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', 'G-41RFT8ZEZ8');
          `,
          type: 'text/javascript'
        }
      ]
    }
  }
})
