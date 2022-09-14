export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('vue:error', (..._args) => {
    console.log('vue:error')
    console.log(..._args)
    if (process.client) {
    }
  })
  nuxtApp.hook('app:error', (..._args) => {
    console.log('app:error')
    console.log(..._args)
    if (process.client) {
    }
  })
  nuxtApp.vueApp.config.errorHandler = (..._args) => {
    console.log('global error handler')
    console.log(..._args)
    if (process.client) {
    }
  }
})