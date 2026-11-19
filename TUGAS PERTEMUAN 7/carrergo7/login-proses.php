<?php
session_start();
include 'koneksi.php';

if (!isset($_POST['login'])) {
    header('location:login.php');
    exit;
}

$email    = trim($_POST['email']);
$password = $_POST['password'];

// READ: ambil akun berdasarkan email
$stmt = mysqli_prepare($koneksi,
    "SELECT id_user, nama, password, role FROM tb_users WHERE email = ?");
mysqli_stmt_bind_param($stmt, 's', $email);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);
$user   = mysqli_fetch_assoc($result);

// cocokkan password dengan hash yang tersimpan
if ($user && password_verify($password, $user['password'])) {
    session_regenerate_id(true);
    $_SESSION['id_user'] = $user['id_user'];
    $_SESSION['nama']    = $user['nama'];
    $_SESSION['role']    = $user['role'];

    if ($user['role'] === 'admin') {
        header('location:admin.php');
    } else {
        header('location:index.php');
    }
    exit;
}

notif('Email atau password Anda salah, silakan coba lagi', 'login.php');
?>
