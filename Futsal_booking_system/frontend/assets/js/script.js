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
