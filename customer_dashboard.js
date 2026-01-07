/* ======================
   LOGIN CHECK
====================== */
const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
if (!loggedUser) {
  window.location.href = "login.html";
}


document.getElementById("usernameText").innerText = loggedUser.user_name;

/* ======================
   MOCK DATA (DB MATCH)
====================== */
let bookings = [
  {
    booking_id: 1,
    user_id: loggedUser.user_id,
    court_id: 1,
    court_name: "Court A",
    booking_date: "2026-01-10",
    time_slot: "6:00 AM - 7:00 AM",
    payment_status: "Pending",
    created_at: "2026-01-08"
  },
  {
    booking_id: 2,
    user_id: loggedUser.user_id,
    court_id: 2,
    court_name: "Court B",
    booking_date: "2026-01-12",
    time_slot: "7:00 PM - 8:00 PM",
    payment_status: "Cancelled_Admin",
    created_at: "2026-01-08"
  }
];

/* ======================
   DASHBOARD LOAD
====================== */
function loadDashboard() {
  renderStats();
  renderTable();
}

/* ======================
   VISUALIZER
====================== */
function renderStats() {
  document.getElementById("totalBookings").innerText = bookings.length;

  document.getElementById("activeBookings").innerText =
    bookings.filter(b =>
      b.payment_status === "Pending" || b.payment_status === "Approved"
    ).length;

  document.getElementById("cancelledBookings").innerText =
    bookings.filter(b =>
      b.payment_status.includes("Cancelled")
    ).length;
}

/* ======================
   TABLE
====================== */
function renderTable() {
  const tbody = document.getElementById("bookingTableBody");
  tbody.innerHTML = "";

  bookings.forEach(b => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${b.booking_date}</td>
      <td>${b.time_slot}</td>
      <td>${b.court_name}</td>
      <td class="status ${b.payment_status}">
        ${formatStatus(b.payment_status)}
      </td>
      <td>
        ${canCancel(b.payment_status)
          ? `<button class="btn-cancel" onclick="cancelBooking(${b.booking_id})">Cancel</button>`
          : "-"}
      </td>
    `;

    tbody.appendChild(tr);
  });
}

/* ======================
   ACTIONS
====================== */
function cancelBooking(id) {
  if (!confirm("Cancel this booking?")) return;

  const booking = bookings.find(b => b.booking_id === id);
  booking.payment_status = "Cancelled_User";

  renderStats();
  renderTable();
}

function canCancel(status) {
  return status === "Pending" || status === "Approved";
}

function formatStatus(status) {
  if (status === "Cancelled_User") return "Cancelled by You";
  if (status === "Cancelled_Admin") return "Cancelled by Admin";
  return status;
}

/* ======================
   UI HELPERS
====================== */
function toggleUserMenu() {
  const menu = document.getElementById("userDropdown");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}

window.onload = loadDashboard;
// after successful validation
localStorage.setItem("loggedInUser", JSON.stringify({
  user_id: 1,
  user_name: "TestUser"
}));
window.location.href = "customer_dashboard.html";
