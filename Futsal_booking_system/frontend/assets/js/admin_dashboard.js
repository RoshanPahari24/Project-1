/* =========================
   ADMIN DASHBOARD JS
   Backend-ready
========================= */

document.addEventListener("DOMContentLoaded", () => {

  /* LOGOUT */
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      window.location.href = "../backend/auth/logout.php";
    });
  }

  /* APPROVE BOOKING */
  document.querySelectorAll(".btn-approve").forEach(btn => {
    btn.addEventListener("click", () => {
      const row = btn.closest("tr");
      const bookingId = row?.dataset.bookingId;

      if (!bookingId) return;

      

      row.querySelector(".status").innerText = "Approved";
      btn.remove(); 
    });
  });

  /* CANCEL BOOKING (ADMIN) */
  document.querySelectorAll(".btn-cancel").forEach(btn => {
    btn.addEventListener("click", () => {
      const row = btn.closest("tr");
      const bookingId = row?.dataset.bookingId;

      if (!bookingId) return;

      if (!confirm("Cancel this booking?")) return;


      row.querySelector(".status").innerText = "Cancelled by Admin";
      row.querySelectorAll("button").forEach(b => b.remove());
    });
  });

});
