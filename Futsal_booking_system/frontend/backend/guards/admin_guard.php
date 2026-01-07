<?php
session_start();
if (!isset($_SESSION['admin_id'])) {
  header("Location: /frontend/admin_login.html");
  exit;
}
