<template lang="html">
  <div id="form-wrapper">

    <form v-on:submit.prevent="addGuest" method="post">
      <label for="name">Full name:</label>
      <input type="text" id="name" v-model="newGuest.name">

      <label for="email">Email:</label>
      <input type="text" id="email" v-model="newGuest.email">

      <label for="checkedIn">Checked In:</label>
      <input type="checkbox" id="checkedIn" v-model="newGuest.checkedIn">

      <input type="submit" value="submit"/>
    </form>

  </div>

</template>

<script>
import { eventBus } from '../main.js'
import RequestHelper from '../helpers/RequestHelper.js'

export default {
  name: "new-guest-form",
  props: [],
  data(){
    return {
      newGuest: {
        name: "",
        email: "",
        checkedIn: false
      }
    }
  },
  methods: {
    addGuest(){
      if(this.newGuest.name === "" || this.newGuest.email === "") return;
      fetch("http://localhost:3000/api/bookings", {
        method: "POST",
        body: JSON.stringify(this.newGuest),
        headers: { 'Content-Type': 'application/json' }
      })
        .then(response => response.json())
        .then(data => eventBus.$emit('guest-added', data))
        .then(this.resetForm())
    },
    resetForm(){
      this.newGuest.name = this.newGuest.email = "";
      this.newGuest.checkedIn = false;
    }
  }
}
</script>

<style lang="css" scoped>

#form-wrapper {
  font-family: 'Roboto', sans-serif;
}

label {
  margin: 5px;
}

input {
  margin-right: 30px;
}

</style>
