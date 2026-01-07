<?php
require_once "../config/db.php";

if (!isset($_SESSION['user_id']) || !isset($_SESSION['role'])) {
    header("Location: ../../frontend/login.html");
    exit;
}

// Role check function
function requireRole($role) {
    if ($_SESSION['role'] !== $role) {
        header("Location: ../../frontend/login.html");
        exit;
    }
}
