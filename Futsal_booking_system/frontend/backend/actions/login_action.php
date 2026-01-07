<?php
require_once "../config/db.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Location: ../../frontend/login.html");
    exit;
}

$email = mysqli_real_escape_string($conn, $_POST['email']);
$password = $_POST['password'];

$query = "SELECT * FROM user WHERE email='$email' LIMIT 1";
$result = mysqli_query($conn, $query);

if (mysqli_num_rows($result) !== 1) {
    header("Location: ../../frontend/login.html?error=invalid");
    exit;
}

$user = mysqli_fetch_assoc($result);

/* Password check (plain for now) */
if ($password !== $user['password']) {
    header("Location: ../../frontend/login.html?error=invalid");
    exit;
}

/* Create session */
$_SESSION['user_id'] = $user['user_id'];
$_SESSION['user_name'] = $user['user_name'];
$_SESSION['email'] = $user['email'];

/* ADMIN IDENTIFICATION */
if ($user['email'] === 'admin@futsal.com') {
    $_SESSION['role'] = 'admin';
    header("Location: ../../frontend/admin_dashboard.html");
    exit;
}

/* CUSTOMER */
$_SESSION['role'] = 'customer';
header("Location: ../../frontend/customer_dashboard.html");
exit;
