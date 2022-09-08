//import mongoose from 'mongoose';
import http from 'http';

let dbUrl = '';

export default async () => {
  /*await mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log("Connected to MongoDB");*/

  let io = require('socket.io')(http, {
    cors: {
      origin: `http://localhost:3000`,
      methods: ["GET", "POST"]
    }
  });

  io.of("/").on("connection", (socket) => {
    console.log("socket.io: User connected: ", socket.id);

    socket.on("disconnect", () => {
      console.log("socket.io: User disconnected: ", socket.id);
    });

    socket.on("clientData", (e) => {
      console.log(e);
      io.emit('arduinoData', e);
    });
  });
};