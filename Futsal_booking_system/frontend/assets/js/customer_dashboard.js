document.addEventListener("DOMContentLoaded", () => {

  /* SESSION CHECK */
  fetch("../backend/auth/session_check.php")
    .then(res => {
      if (!res.ok) window.location.href = "login.html";
      return res.json();
    })
    .then(user => {
      document.getElementById("username").innerText = user.user_name;
      loadCustomerBookings();
    });

  /* LOGOUT */
  document.getElementById("logoutBtn").addEventListener("click", () => {
    window.location.href = "../backend/auth/logout.php";
  });
});

/* LOAD BOOKINGS */
function loadCustomerBookings() {
  fetch("../backend/actions/get_customer_bookings.php")
    .then(res => res.json())
    .then(data => {
      const tbody = document.getElementById("bookingTable");
      tbody.innerHTML = "";

      data.forEach(b => {
        const tr = document.createElement("tr");
        tr.dataset.bookingId = b.booking_id;

        tr.innerHTML = `
          <td>${b.booking_date}</td>
          <td>${b.time_slot}</td>
          <td>${b.court_name}</td>
          <td class="status">${b.payment_status}</td>
          <td>
            ${b.payment_status === "Pending"
              ? `<button class="btn-cancel" onclick="cancelBooking(${b.booking_id}, this)">Cancel</button>`
              : "-"
            }
          </td>
        `;
        tbody.appendChild(tr);
      });
    });
}

/* CANCEL */
function cancelBooking(id, btn) {
  if (!confirm("Cancel this booking?")) return;

  const formData = new FormData();
  formData.append("booking_id", id);

  fetch("../backend/actions/cancel_booking.php", {
    method: "POST",
    body: formData
  }).then(() => {
    const row = btn.closest("tr");
    row.querySelector(".status").innerText = "Cancelled by You";
    btn.remove();
  });
}
