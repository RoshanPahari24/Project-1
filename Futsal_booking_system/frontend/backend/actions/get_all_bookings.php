<?php
require_once "../config/db.php";

if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'admin') {
    http_response_code(401);
    echo json_encode([]);
    exit;
}

$query = "
  SELECT 
    b.booking_id,
    b.booking_date,
    b.time_slot,
    b.payment_status,
    u.user_name,
    c.court_name
  FROM booking b
  JOIN user u ON b.user_id = u.user_id
  JOIN court c ON b.court_id = c.court_id
  ORDER BY b.created_at DESC
";

$result = mysqli_query($conn, $query);
$bookings = [];

while ($row = mysqli_fetch_assoc($result)) {
    $bookings[] = $row;
}

echo json_encode($bookings);
