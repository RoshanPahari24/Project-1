/* =========================
   ADMIN DASHBOARD JS
   Backend-ready
========================= */

document.addEventListener("DOMContentLoaded", () => {
  // Session check (admin)
fetch("../backend/auth/admin_check.php")
  .then(res => {
    if (!res.ok) {
      window.location.href = "login.html";
    }
    return res.json();
  })
  .then(admin => {
    document.getElementById("adminName").innerText = admin.user_name;
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
