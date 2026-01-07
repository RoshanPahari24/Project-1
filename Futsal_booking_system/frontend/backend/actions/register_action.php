<?php
require_once "../config/db.php";

$username = $_POST['username'] ?? '';
$phone    = $_POST['phone'] ?? '';
$email    = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

if (!$email || !$password) die("Missing fields");

$hash = password_hash($password, PASSWORD_BCRYPT);

$stmt = $conn->prepare(
  "INSERT INTO user (user_name, phone, email, password)
   VALUES (?, ?, ?, ?)"
);
$stmt->bind_param("ssss", $username, $phone, $email, $hash);

if ($stmt->execute()) {
  header("Location: /frontend/login.html");
  exit;
}

die("REGISTER ERROR: " . $stmt->error);
