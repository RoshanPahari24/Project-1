/* =========================
   ADMIN DASHBOARD JS
   Backend-ready
========================= */

document.addEventListener("DOMContentLoaded", () => {

  /* LOGOUT */
  document.getElementById("logoutBtn").addEventListener("click", () => {
    window.location.href = "logout.php";
  });

  /* APPROVE / CANCEL */
  document.querySelectorAll(".btn-approve").forEach(btn => {
    btn.addEventListener("click", () => {
      const row = btn.closest("tr");
      row.querySelector(".status").innerText = "Approved";
    });
  });

  document.querySelectorAll(".btn-cancel").forEach(btn => {
    btn.addEventListener("click", () => {
      const row = btn.closest("tr");
      if (confirm("Cancel this booking?")) {
        row.querySelector(".status").innerText = "Cancelled by Admin";
      }
    });
  });

});
