<?php

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}


$host = "localhost";
$user = "root";
$password = "";
$database = "futsal_booking_db"; 

$conn = mysqli_connect($host, $user, $password, $database);

if (!$conn) {
    die("Database connection failed: " . mysqli_connect_error());
}
