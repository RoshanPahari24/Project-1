<?php
require_once "../config/db.php";

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    exit;
}

$court_id = intval($_GET['court_id']);
$booking_date = $_GET['booking_date'];

$query = "
  SELECT time_slot
  FROM booking
  WHERE court_id = '$court_id'
    AND booking_date = '$booking_date'
    AND payment_status NOT IN ('Cancelled_User', 'Cancelled_Admin')
";

$result = mysqli_query($conn, $query);

$slots = [];
while ($row = mysqli_fetch_assoc($result)) {
    $slots[] = $row['time_slot'];
}

echo json_encode($slots);
