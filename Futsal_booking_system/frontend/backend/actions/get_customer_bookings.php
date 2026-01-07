<?php
require_once "../config/db.php";

/* Auth check */
if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'customer') {
    http_response_code(401);
    echo json_encode([]);
    exit;
}

$user_id = $_SESSION['user_id'];

$query = "
  SELECT 
    b.booking_id,
    b.booking_date,
    b.time_slot,
    b.payment_status,
    c.court_name
  FROM booking b
  JOIN court c ON b.court_id = c.court_id
  WHERE b.user_id = '$user_id'
  ORDER BY b.created_at DESC
";

$result = mysqli_query($conn, $query);

$bookings = [];

while ($row = mysqli_fetch_assoc($result)) {
    $bookings[] = $row;
}

echo json_encode($bookings);
