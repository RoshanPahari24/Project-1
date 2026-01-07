/* =========================
   CUSTOMER DASHBOARD JS
   Backend-ready
========================= */

document.addEventListener("DOMContentLoaded", () => {
  // Session check (customer)
fetch("../backend/auth/session_check.php")
  .then(res => {
    if (!res.ok) {
      window.location.href = "login.html";
    }
    return res.json();
  })
  .then(user => {
    document.getElementById("username").innerText = user.user_name;
  })
  .catch(() => {
    window.location.href = "login.html";
  });


  /* LOGOUT */
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      window.location.href = "../backend/auth/logout.php";
    });
  }

  /* CANCEL BOOKING (CUSTOMER) */
  document.querySelectorAll(".btn-cancel").forEach(btn => {
    btn.addEventListener("click", async () => {
      const row = btn.closest("tr");
      const bookingId = row?.dataset.bookingId;

      if (!bookingId) return;

      if (!confirm("Are you sure you want to cancel this booking?")) return;

      const formData = new FormData();
      formData.append("booking_id", bookingId);

      try {
        await fetch("../backend/actions/cancel_booking.php", {
          method: "POST",
          body: formData
        });

        row.querySelector(".status").innerText = "Cancelled by You";
        btn.remove();

      } catch (error) {
        console.error("Cancel failed:", error);
        alert("Something went wrong. Try again.");
      }
    });
  });

});
