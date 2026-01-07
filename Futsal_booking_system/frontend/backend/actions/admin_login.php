<?php
require_once "../config/db.php";
session_start();

$user = $_POST['username'];
$pass = $_POST['password'];

$stmt = $conn->prepare("SELECT * FROM admin WHERE username=?");
$stmt->bind_param("s", $user);
$stmt->execute();

$admin = $stmt->get_result()->fetch_assoc();

if ($admin && password_verify($pass, $admin['password'])) {
  $_SESSION['admin_id'] = $admin['admin_id'];
  header("Location: /frontend/admin_dashboard.html");
  exit;
}

die("ADMIN LOGIN FAILED");
