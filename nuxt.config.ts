import { defineNuxtConfig } from 'nuxt'

interface Req {
  url: string;
}

export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: 'Wäxterås',
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1'
        },
        {
          charset: 'utf-8'
        },
        {
          name: 'author',
          content: 'Wäxterås'
        },
        {
          name: 'application-name',
          content: 'Wäxterås'
        },
        {
          'http-equiv': 'X-UA-Compatible',
          content: 'IE=edge'
        },
        {
          name: 'og:type',
          content: 'website'
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: '@import "@/assets/sass/variables.sass"'
        },
      },
    },
  },
  render: {
    // HTTP2: https://nuxtjs.org/api/configuration-render/#http2
    http2: {
      push: true,
      pushAssets: (req: Req) => {
        const assetsToPush = ['</css/bootstrap.min.css>; rel=preload; as=style']
  
        if (req.url === '/') {
          assetsToPush.push(
            '</css/placeholder-loading.min.css>; rel=preload; as=style'
          )
        }
  
        return assetsToPush
      }
    }
  },
  buildModules: [
    ['@nuxt-modules/compression', {
      algorithm: 'brotliCompress'
    }]
  ],
  build: {
    standalone: true
  },
  optimization: {
    splitChunks: {
      maxSize: 300000
    }
  }
});