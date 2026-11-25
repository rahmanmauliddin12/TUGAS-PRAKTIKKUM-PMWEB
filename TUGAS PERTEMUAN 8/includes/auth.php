<?php
// Dipakai lewat require di semua halaman yang butuh login.
// $root diisi oleh halaman pemanggil ('' atau '../') supaya redirect benar.
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

if (!isset($_SESSION['email'])) {
    header('Location: ' . ($root ?? '') . 'login.php?auth=1');
    exit;
}

$namaUser  = $_SESSION['nama'] ?? '';
$emailUser = $_SESSION['email'];
