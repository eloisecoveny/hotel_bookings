<template lang="html">
  <div id="guest-list">
    <Guest v-for="(guest, index) in guests" :key="index" :guest="guest"></Guest>
  </div>
</template>

<script>
import Guest from './Guest.vue'

export default {
  name: "checked-in-guest-list",
  props: ['guests'],
  components: {
    Guest
  }
}
</script>

<style lang="css" scoped>
</style>
