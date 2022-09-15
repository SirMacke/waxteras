//import mongoose from 'mongoose';
//import http from 'http';
import { Server } from 'socket.io';

//let dbUrl = '';

export default async () => {
  /*await mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log("Connected to MongoDB");*/

  /*const nuxtApp = useNuxtApp();
  console.log(nuxtApp)

  nuxtApp.hook('listen', (server) => {
    console.log(server)
    console.log('Socket listen', server.address(), server.eventNames())
    const io = new Server(server)

    nuxtApp.hook('close', () => io.close())

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
  })*/

  /*
  let server = http.createServer(function (req, res) {
    //res.send('Socket.io server')
  });

  const config = useRuntimeConfig()
  console.log(config.public.PORT)
  server.listen(config.public.PORT + 1)
  const io = new Server(server, { cors: { origin: '*' }})
      
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
  })*/
};