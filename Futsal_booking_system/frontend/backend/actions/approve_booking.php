<?php
require_once "../config/db.php";

if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'admin') {
    http_response_code(401);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    exit;
}

$booking_id = intval($_POST['booking_id']);

$update = "
  UPDATE booking 
  SET payment_status = 'Approved'
  WHERE booking_id = '$booking_id'
";

mysqli_query($conn, $update);

http_response_code(200);
echo "approved";
