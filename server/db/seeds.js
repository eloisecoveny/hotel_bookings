use hotelBookings;
db.dropDatabase();

db.bookings.insertMany([
  {
    name: "Eloise Coveny",
    email: "eloisecoveny@gmail.com",
    checkedIn: true
  },
  {
    name: "Alice Tait",
    email: "alice.tait@gmail.com",
    checkedIn: false
  },
  {
    name: "Pernille Ravn",
    email: "pernille@gmail.com",
    checkedIn: true
  }
]);
