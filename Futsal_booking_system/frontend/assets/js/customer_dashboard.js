/* =========================
   CUSTOMER DASHBOARD JS
   Backend-ready
========================= */

document.addEventListener("DOMContentLoaded", () => {

  /* LOGOUT */
  document.getElementById("logoutBtn").addEventListener("click", () => {
    // PHP will destroy session later
    window.location.href = "logout.php";
  });

  /* CANCEL BOOKING (UI only) */
  document.querySelectorAll(".btn-cancel").forEach(btn => {
    btn.addEventListener("click", () => {
      const row = btn.closest("tr");
      const bookingId = row.dataset.bookingId;

      if (!bookingId) return;

      if (confirm("Are you sure you want to cancel this booking?")) {
        /*
          Later:
          fetch('cancel_booking.php', { booking_id })
        */
        row.querySelector(".status").innerText = "Cancelled";
        btn.remove();
      }
    });
  });

});
