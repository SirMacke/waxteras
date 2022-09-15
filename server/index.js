//import mongoose from 'mongoose';
import http from 'http';
import { Server } from 'socket.io';

//let dbUrl = '';

export default async () => {
  /*await mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log("Connected to MongoDB");*/

  let server = http.createServer(function (req, res) {
    //res.send('Socket.io server')
  });

  server.listen(3001)
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
  })
};