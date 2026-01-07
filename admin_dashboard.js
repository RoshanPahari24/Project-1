/* AUTH */
const admin = JSON.parse(localStorage.getItem("loggedInUser"));
if (!admin || admin.role !== "admin") {
  window.location.href = "login.html";
}

document.getElementById("adminName").innerText = admin.user_name;

/* STATS */
function renderStats() {
  document.getElementById("totalBookings").innerText = bookings.length;

  document.getElementById("pendingBookings").innerText =
    bookings.filter(b => b.payment_status === "Pending").length;

  document.getElementById("approvedBookings").innerText =
    bookings.filter(b => b.payment_status === "Approved").length;
}

/* BOOKINGS */
function renderBookings() {
  const tbody = document.getElementById("adminBookingTable");
  tbody.innerHTML = "";

  bookings.forEach(b => {
    const user = users.find(u => u.user_id === b.user_id);
    const court = courts.find(c => c.court_id === b.court_id);

    tbody.innerHTML += `
      <tr>
        <td>${user.user_name}</td>
        <td>${b.booking_date}</td>
        <td>${b.time_slot}</td>
        <td>${court.court_name}</td>
        <td>${b.payment_status}</td>
        <td>
          <button class="btn-approve" onclick="approveBooking(${b.booking_id})">
            Approve
          </button>
          <button class="btn-cancel" onclick="cancelBooking(${b.booking_id})">
            Cancel
          </button>
        </td>
      </tr>
    `;
  });
}

/* ACTIONS */
function approveBooking(id) {
  const booking = bookings.find(b => b.booking_id === id);
  booking.payment_status = "Approved";
  renderBookings();
  renderStats();
}

function cancelBooking(id) {
  if (!confirm("Cancel this booking?")) return;
  const booking = bookings.find(b => b.booking_id === id);
  booking.payment_status = "Cancelled_Admin";
  renderBookings();
  renderStats();
}

/* COURTS */
function renderCourts() {
  const tbody = document.getElementById("courtTable");
  tbody.innerHTML = "";

  courts.forEach(c => {
    tbody.innerHTML += `
      <tr>
        <td>${c.court_name}</td>
        <td>${c.court_type}</td>
      </tr>
    `;
  });
}

function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}

/* INIT */
renderStats();
renderBookings();
renderCourts();
