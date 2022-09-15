import io from 'socket.io-client'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  console.log(config.public.PORT)
  //let uri;
  //if (config.public.production) uri = 'waxteras.herokuapp.com'
  const socket = io(`http://localhost:3000`)
  console.log(socket)
  //const socket = io('https://waxteras.herokuapp.com')

  return {
    provide: {
      socket: socket
    }
  }
})