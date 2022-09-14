import { Server } from 'socket.io'
import { defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  setup(options, nuxt) {
    nuxt.hook('listen', (server) => {
      console.log('Socket listen', server.address(), server.eventNames())
      const io = new Server(server)

      nuxt.hook('close', () => io.close())

      /*io.on('connection', (socket) => {
        console.log('Connection', socket.id)
      })*/

      io.on('connection', (socket) => {
        console.log('Connection', socket.id)
        //socket.emit('message', `welcome ${socket.id}`)
        //socket.broadcast.emit('message', `${socket.id} joined`)

        socket.on('clientSettings', function message(data: any) {
          console.log('message received: %s', data)
          socket.emit('arduinoSettings', { data })
        })

        socket.on('arduinoData', function message(data: any) {
          console.log('message received: %s', data)
          socket.emit('clientData', { data })
        })

        socket.on('disconnecting', () => {
          console.log('disconnected', socket.id)
          socket.broadcast.emit('message', `${socket.id} left`)
        })
      })
    })
  },
})