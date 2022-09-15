<template>
  <div>
    <div id="nav">
      <h1>Wexterås</h1>
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
            <button @click="updateSettings('water')">On / Off</button>
            <p>Vattna</p>
          </div>
          <div>
            <button @click="updateSettings('lid')">Open / Close</button>
            <p>Lock</p>
          </div>
          <div>
            <button @click="updateSettings('fan')">On / Off</button>
            <p>Fläkt</p>
          </div>
        </div>
        {{ message }}
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
      fan: false,
      message: '123'
    }
  },
  mounted () {
    const { $socket } = useNuxtApp();
    this.socket = $socket;
    
    this.socket.on('clientData', (data) => {
      console.log(data);
    });
  },
  methods: {
    async updateSettings(toChange) {
      if (toChange == 'water') this.water = !this.water;
      else if (toChange == 'lid') this.lid = !this.lid;
      else if (toChange == 'fan') this.fan = !this.fan;
      
      this.socket.emit("clientSettings", {
        water: this.water,
        lid: this.lid,
        fan: this.fan
      });
    },
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