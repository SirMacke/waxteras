import io from 'socket.io-client'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  console.log(config.public.PORT)
  const socket = io(`http://localhost:${config.public.PORT + 1}`)
  console.log(socket)
  //const socket = io('https://waxteras.herokuapp.com')

  return {
    provide: {
      socket: socket
    }
  }
})