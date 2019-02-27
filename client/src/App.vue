<template lang="html">
  <div id="app">
    <link href="https://fonts.googleapis.com/css?family=Roboto|Oswald" rel="stylesheet">
    <h1>Hill St. Hotel</h1>

    <div id="nav">
      <new-guest-form></new-guest-form>
    </div>

    <div id="guest-grid">
      <checked-in-guest-list :guests="guests"></checked-in-guest-list>
    </div>
  </div>

</template>

<script>
import NewGuestForm from './components/NewGuestForm.vue'
import CheckedInGuestList from './components/CheckedInGuestList.vue'
import { eventBus } from './main.js'

export default {
  name: "app",
  data(){
    return {
      guests: [],
      deletedGuest: null
    }
  },
  components: {
    "new-guest-form": NewGuestForm,
    "checked-in-guest-list": CheckedInGuestList
  },
  mounted(){
    fetch("http://localhost:3000/api/bookings/")
      .then(res => res.json())
      .then(bookings => this.guests = bookings);

      eventBus.$on('guest-added', (guest) => {
        this.addBooking(guest)
      });

      eventBus.$on("deleted-guest", (id) => {
        this.deleteBooking(id)
      });

      eventBus.$on("guest-checked-in", () => {
        this.fetchData()
      })
  },
  methods: {
    fetchData(){
      fetch("http://localhost:3000/api/bookings/")
        .then(res => res.json())
        .then(bookings => this.guests = bookings);
    },
    addBooking(guest){
      this.guests.push(guest);
    },
    deleteBooking(id){
      const index = this.guests.findIndex(guest => {
        return guest._id === id
      });
      this.guests.splice(index, 1)
    }
  }
}
</script>

<style lang="css" scoped>

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#nav {
  background-color: rgb(226, 211, 124);
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 25px;
}

h1 {
  font-family: 'Oswald', sans-serif;
  font-size: 50px;
  margin: 40px;
  color: rgb(196, 170, 25);
}

#guest-grid {
  width: 80%;
}

</style>
