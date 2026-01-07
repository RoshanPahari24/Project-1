document.addEventListener("DOMContentLoaded", () => {

  /* SESSION CHECK */
  fetch("../backend/auth/admin_check.php")
    .then(res => {
      if (!res.ok) window.location.href = "login.html";
      return res.json();
    })
    .then(admin => {
      document.getElementById("adminName").innerText = admin.user_name;
      loadAdminBookings();
    });

  document.getElementById("logoutBtn").addEventListener("click", () => {
    window.location.href = "../backend/auth/logout.php";
  });
});

/* LOAD BOOKINGS */
function loadAdminBookings() {
  fetch("../backend/actions/get_all_bookings.php")
    .then(res => res.json())
    .then(data => {
      const tbody = document.getElementById("adminBookingTable");
      tbody.innerHTML = "";

      data.forEach(b => {
        const tr = document.createElement("tr");
        tr.dataset.bookingId = b.booking_id;

        tr.innerHTML = `
          <td>${b.user_name}</td>
          <td>${b.booking_date}</td>
          <td>${b.time_slot}</td>
          <td>${b.court_name}</td>
          <td class="status">${b.payment_status}</td>
          <td>
            ${b.payment_status === "Pending"
              ? `
                <button class="btn-approve" onclick="approveBooking(${b.booking_id}, this)">Approve</button>
                <button class="btn-cancel" onclick="cancelAdmin(${b.booking_id}, this)">Cancel</button>
              `
              : "-"
            }
          </td>
        `;
        tbody.appendChild(tr);
      });
    });
}

/* ADMIN ACTIONS */
function approveBooking(id, btn) {
  const formData = new FormData();
  formData.append("booking_id", id);

  fetch("../backend/actions/approve_booking.php", {
    method: "POST",
    body: formData
  }).then(() => {
    const row = btn.closest("tr");
    row.querySelector(".status").innerText = "Approved";
    row.querySelectorAll("button").forEach(b => b.remove());
  });
}

function cancelAdmin(id, btn) {
  if (!confirm("Cancel this booking?")) return;

  const formData = new FormData();
  formData.append("booking_id", id);

  fetch("../backend/actions/cancel_booking.php", {
    method: "POST",
    body: formData
  }).then(() => {
    const row = btn.closest("tr");
    row.querySelector(".status").innerText = "Cancelled by Admin";
    row.querySelectorAll("button").forEach(b => b.remove());
  });
}
