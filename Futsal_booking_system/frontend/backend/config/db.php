<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$conn = new mysqli("localhost", "root", "", "futsal_booking");
if ($conn->connect_error) die("DB Connection Failed");
