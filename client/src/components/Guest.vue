<template lang="html">
  <div id="guest-info">
    <h3>{{ guest.name }}</h3>
    <p>Email: {{ guest.email }}</p>
    <input v-on:change="checkIn(guest._id)" type="checkbox" v-model="guest.checkedIn">
    <button v-on:click="deleteGuest(guest._id)" type="button" name="delete">Delete</button>
  </div>

</template>

<script>
import { eventBus } from '../main.js'

export default {
  name: "guest",
  props: ['guest', 'index'],
  data(){
    return {
      guestIndex: this.index
    }
  },
  methods: {
    deleteGuest(id){
      fetch("http://localhost:3000/api/bookings/" + id, {
        method: "DELETE"
      }).then(() => eventBus.$emit("deleted-guest", id));
    },
    checkIn(id){
      fetch("http://localhost:3000/api/bookings/" + id, {
        method: "PUT",
        body: JSON.stringify(this.guest),
        headers: { 'Content-Type': 'application/json' }
      }).then(() => eventBus.$emit("checked-in-guest", id));
    }
  }
}
</script>

<style lang="css" scoped>
</style>
