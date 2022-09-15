import io from 'socket.io-client'

export default defineNuxtPlugin(() => {
  const socket = io(`http://localhost:${process.env.PORT + 1 || 3001}`)
  console.log(socket)
  //const socket = io('https://waxteras.herokuapp.com')

  return {
    provide: {
      socket: socket
    }
  }
})