import { defineNuxtConfig } from 'nuxt'
import { Server } from 'socket.io'

interface Req {
  url: string;
}

export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: 'Wexterås',
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
          content: 'Wexterås'
        },
        {
          name: 'application-name',
          content: 'Wexterås'
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
  nitro: {
    plugins: [
      "~/server/index.js"
    ]
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
  build: {
    standalone: true
  },
  optimization: {
    splitChunks: {
      maxSize: 300000
    }
  },
  publicRuntimeConfig: {
    PORT: process.env.PORT || 3000,
    production: process.env.production || false
  },
  modules: [
    //'./modules/socket',
    ['@nuxt-modules/compression', {
      algorithm: 'brotliCompress'
    }]
  ],
  hooks: {
    'listen': (server) => {
      console.log('Socket listen', server.address(), server.eventNames())
      const io = new Server(server)

      io.on('connection', (socket) => {
        console.log('Connection', socket.id)
        //socket.emit('message', `welcome ${socket.id}`)
        //socket.broadcast.emit('message', `${socket.id} joined`)

        socket.on('clientSettings', (data) => {
          console.log('clientSettings received: %s', data)
          io.emit('arduinoSettings', data)
        })

        socket.on('arduinoData', (data) => {
          console.log('arduinoData received: %s', data)
          io.emit('clientData', data)
        })

        socket.on('disconnecting', () => {
          console.log('disconnected', socket.id)
          socket.broadcast.emit('message', `${socket.id} left`)
        })
      })
    }
  }
});