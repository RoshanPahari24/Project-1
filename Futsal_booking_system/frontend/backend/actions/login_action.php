<?php
require_once "../config/db.php";
session_start();

$email = $_POST['email'] ?? '';
$pass  = $_POST['password'] ?? '';

$stmt = $conn->prepare("SELECT * FROM user WHERE email=?");
$stmt->bind_param("s", $email);
$stmt->execute();

$user = $stmt->get_result()->fetch_assoc();

if ($user && password_verify($pass, $user['password'])) {
  $_SESSION['user_id'] = $user['user_id'];
  header("Location: /frontend/customer_dashboard.html");
  exit;
}

die("LOGIN FAILED");
