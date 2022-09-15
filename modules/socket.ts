import { Server } from 'socket.io'
import { defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  setup(options, nuxt) {
    console.log('here')
    nuxt.hook('listen', (server) => {
      console.log(server)
      console.log('Socket listen', server.address(), server.eventNames())
      const io = new Server(server)

      nuxt.hook('close', () => io.close())
      
      io.on('connection', (socket) => {
        console.log('Connection', socket.id)
        //socket.emit('message', `welcome ${socket.id}`)
        //socket.broadcast.emit('message', `${socket.id} joined`)

        socket.on('clientSettings', (data: any) => {
          console.log('clientSettings received: %s', data)
          io.emit('arduinoSettings', data)
        })

        socket.on('arduinoData', (data: any) => {
          console.log('arduinoData received: %s', data)
          io.emit('clientData', data)
        })

        socket.on('disconnecting', () => {
          console.log('disconnected', socket.id)
          socket.broadcast.emit('message', `${socket.id} left`)
        })
      })
    })
  },
})