<template lang="html">
  <div id="app">
    <h1>Hotel</h1>
    <new-guest-form></new-guest-form>
    {{ checkIn }}
    <checked-in-guest-list :guests="guests"></checked-in-guest-list>
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
  computed: {
    checkIn(){
      const checkedIn = this.guests.filter(guest => {
        return guest.checkedIn === true
      })
      this.checkedInGuests = checkedIn
    }
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
</style>
