<?php
require_once "../config/db.php";

if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'customer') {
    http_response_code(401);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    exit;
}

$user_id = $_SESSION['user_id'];
$booking_date = $_POST['booking_date'];
$time_slot = $_POST['time_slot'];
$court_id = intval($_POST['court_id']);

/* Insert booking (Pending by default) */
$query = "
  INSERT INTO booking (user_id, court_id, booking_date, time_slot, payment_status, created_at)
  VALUES ('$user_id', '$court_id', '$booking_date', '$time_slot', 'Pending', NOW())
";

if (!mysqli_query($conn, $query)) {
    // Handles UNIQUE constraint failure (slot already booked)
    http_response_code(409);
    echo "slot_taken";
    exit;
}

http_response_code(200);
echo "success";
