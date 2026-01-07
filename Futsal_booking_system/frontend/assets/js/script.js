document.addEventListener("DOMContentLoaded", () => {

  const dateInput = document.getElementById("booking_date");
  const courtRadios = document.querySelectorAll('input[name="court_id"]');
  const slotRadios = document.querySelectorAll('input[name="time_slot"]');

  function resetSlots() {
    slotRadios.forEach(slot => {
      slot.disabled = false;
      slot.checked = false;
      slot.nextElementSibling.classList.remove("booked");
    });
  }

  function loadBookedSlots() {
    const date = dateInput.value;
    const court = document.querySelector('input[name="court_id"]:checked');

    if (!date || !court) return;

    fetch(`../backend/actions/get_booked_slots.php?court_id=${court.value}&booking_date=${date}`)
      .then(res => res.json())
      .then(bookedSlots => {
        resetSlots();

        bookedSlots.forEach(booked => {
          slotRadios.forEach(slot => {
            if (slot.value === booked) {
              slot.disabled = true;
              slot.nextElementSibling.classList.add("booked");
            }
          });
        });
      });
  }

  dateInput.addEventListener("change", loadBookedSlots);
  courtRadios.forEach(r => r.addEventListener("change", loadBookedSlots));
});
