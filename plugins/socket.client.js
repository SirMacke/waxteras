import io from 'socket.io-client'

export default defineNuxtPlugin(() => {
  //const socket = io('http://localhost:3000')
  const socket = io('https://waxteras.herokuapp.com')

  return {
    provide: {
      socket: socket
    }
  }
})