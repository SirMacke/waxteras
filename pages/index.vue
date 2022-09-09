<template>
  <div>
    <div id="nav">
      <h1>Wäxterås</h1>
    </div>
    <main>
      <section id="left">
        <div class="content">
        
        </div>
        <!-- Chart -->
      </section>
      <section id="right">
        <div class="content">
          <div>
            <button @click="updateWater()">On / Off</button>
            <p>Vattna</p>
          </div>
          <div>
            <button @click="updateWater()">Open / Close</button>
            <p>Lock</p>
          </div>
          <div>
            <button @click="updateWater()">On / Off</button>
            <p>Fläkt</p>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      water: false,
      lid: false,
      fan: false
    }
  },
  mounted() {
    this.socket = this.$nuxtSocket({
      channel: '/index'
    })
    /* Listen for events: */
    this.socket
    .on('waterData', (msg, cb) => {
      /* Handle event */
    })
  },
  methods: {
    async updateWater() {
      console.log('water fn')
      this.water = !this.water;
      /* Emit events */
      let res = await this.socket.emitP('waterData', {
        water: this.water
      });
      console.log('res', res);
    }
  }
}
</script>

<style lang="sass" scoped>
#nav
  width: 100vw
  height: 100px
  border-bottom: 2px solid black

  h1
    position: relative
    text-align: center
    top: 50%
    transform: translateY(-50%)
    margin: auto 0px

main
  position: relative
  width: 100vw
  height: calc( 100vh - 102px)
  display: grid
  grid-template-columns: 1fr 1fr

  #left

    .content
      position: relative
      width: 700px
      height: 450px
      left: 60%
      top: 50%
      transform: translate(-50%, -50%)
      border: 2px solid black
      border-radius: 5px

  #right

    .content
      position: relative
      width: 250px
      height: auto
      left: 35%
      top: 50%
      transform: translate(-50%, -50%)
      border: 1px solid rgba(0,0,0,0)

      div
        display: grid
        grid-template-columns: 1fr 1fr
        margin: 25px 0px

        button
          padding: 10px 25px
          border: 1px solid black
          border-radius: 5px
          font-size: 1.1em
          transition: 0.25s

        button:hover
          background: black
          color: white
          cursor: pointer

        p
          margin-left: 50px
          font-size: 1.4em
          font-weight: bold

</style>