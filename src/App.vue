<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {}
}
</script>

<style lang="sass">
  body, html
    height: 100%
    width: 100%

  body
    display: flex
    align-items: center
    justify-content: center

  #app
    width: 100%
    height: 100%
</style>
