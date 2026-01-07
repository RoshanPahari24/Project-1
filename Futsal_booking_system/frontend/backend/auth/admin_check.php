<?php
require_once "../config/db.php";

if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== 'admin') {
    http_response_code(401);
    echo "unauthorized";
    exit;
}

echo json_encode([
    "user_name" => $_SESSION['user_name'],
    "role" => $_SESSION['role']
]);
