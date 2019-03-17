<template lang="html">
  <div id="guest-info">
    <h4>{{ guest.name }}</h4>
    <p>{{ guest.email }}</p>
    <div class="check-in">
      <label>Checked in:</label>
      <input v-on:change="checkIn(guest._id)" type="checkbox" v-model="guest.checkedIn"/>
    </div>
    <button v-on:click="deleteGuest(guest._id)" type="button" name="delete">Delete</button>
  </div>

</template>

<script>
import { eventBus } from '../main.js'

export default {
  name: "guest",
  props: ['guest'],
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
      }).then(() => eventBus.$emit("checked-in-guest", id))
    }
  }
}
</script>

<style lang="css" scoped>

#guest-info {
  box-sizing: border-box;
  padding: 15px;
  margin: 15px;
  width: 250px;
  border-radius: 5px;
  background-color: rgb(234, 234, 234);
}

h4, p, label {
  font-family: 'Roboto', sans-serif;
}

h4 {
  font-size: 20px;
  margin-top: 10px;
  margin-bottom: 5px;
}

p {
  font-size: 15px;
}

label {
  font-size: 13px;
}

input[type="checkbox"]:checked {
background-color: White;
color: Black;
white-space: nowrap;
}

.check-in {
  margin-bottom: 10px;
}

</style>
