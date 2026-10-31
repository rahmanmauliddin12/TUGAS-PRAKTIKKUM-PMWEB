<?php
session_start();
date_default_timezone_set('Asia/Jakarta');

// Hanya menerima kiriman dari form login (method POST)
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: login.php');
    exit;
}

$email = strtolower(trim($_POST['email'] ?? ''));
$nama  = trim($_POST['nama'] ?? '');

if ($email === '' || $nama === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header('Location: login.php?error=1');
    exit;
}

// SESSION: simpan nama pengguna di server
session_regenerate_id(true);
$_SESSION['email']       = $email;
$_SESSION['nama']        = $nama;
$_SESSION['waktu_login'] = date('d-m-Y H:i:s');

// COOKIE: ingat email terakhir selama 7 hari (dipakai untuk mengisi form login)
setcookie('cg_email', $email, time() + 86400 * 7, '/');

header('Location: dashboard.php');
exit;
