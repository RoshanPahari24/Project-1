<?php
require_once "../config/db.php";

if (!isset($_SESSION['user_id']) || !isset($_SESSION['role'])) {
    http_response_code(401);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    exit;
}

$booking_id = intval($_POST['booking_id']);

// Fetch booking
$query = "SELECT * FROM booking WHERE booking_id = '$booking_id' LIMIT 1";
$result = mysqli_query($conn, $query);

if (mysqli_num_rows($result) !== 1) {
    http_response_code(404);
    exit;
}

$booking = mysqli_fetch_assoc($result);

/* CUSTOMER RULE */
if ($_SESSION['role'] === 'customer') {

    // Customer can cancel only own booking
    if ($booking['user_id'] != $_SESSION['user_id']) {
        http_response_code(403);
        exit;
    }

    $status = "Cancelled_User";
}

/* ADMIN RULE */
elseif ($_SESSION['role'] === 'admin') {
    $status = "Cancelled_Admin";
}

/* Update status */
$update = "
  UPDATE booking 
  SET payment_status = '$status'
  WHERE booking_id = '$booking_id'
";

mysqli_query($conn, $update);

http_response_code(200);
echo "success";
