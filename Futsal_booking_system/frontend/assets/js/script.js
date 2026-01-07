document.addEventListener('DOMContentLoaded', () => {
  const dateInput = document.getElementById('booking_date');
  const timeInputs = document.querySelectorAll('input[name="time_slot"]');
  const courtInputs = document.querySelectorAll('input[name="court_id"]');

  if (dateInput) {
    dateInput.addEventListener('change', () => {
      document.getElementById('summary-date').textContent = dateInput.value;
    });
  }

  timeInputs.forEach(input => {
    input.addEventListener('change', () => {
      document.getElementById('summary-time').textContent = input.value;
    });
  });

  courtInputs.forEach(input => {
    input.addEventListener('change', () => {
      const label = document.querySelector(`label[for="${input.id}"] strong`);
      document.getElementById('summary-court').textContent = label.textContent;
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("subscribe-form");
  const emailInput = document.getElementById("subscribe-email");
  const message = document.getElementById("subscribe-message");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!emailInput.value.includes("@")) {
      message.textContent = "Please enter a valid email address.";
      message.style.color = "red";
      return;
    }

    message.textContent = "Thanks for subscribing! You'll hear from us soon.";
    message.style.color = "black";
    emailInput.value = "";
  });
});
