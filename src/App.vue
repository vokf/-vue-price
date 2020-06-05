<template >
  <div >
    <router-view v-if = "isRouterAlive" ></router-view >
  </div >
</template >

<script >
  
  export default {
    provide() {
      return {
        reload: this.reload
      }
    },
    data() {
      return {
        isRouterAlive: true
      }
    }, methods: {
      reload() {
        this.isRouterAlive = false
        this.$nextTick(function () {
          this.isRouterAlive = true
        })
      }
    }
  }
</script >

<style >
  * {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    color: #2c3e50;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

</style >
