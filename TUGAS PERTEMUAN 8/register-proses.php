<?php
include 'koneksi.php';

if (!isset($_POST['register'])) {
    header('location:register.php');
    exit;
}

$nama       = trim($_POST['nama']);
$email      = trim($_POST['email']);
$no_hp      = trim($_POST['no_hp']);
$password   = $_POST['password'];
$konfirmasi = $_POST['konfirmasi'];

// validasi input
if ($nama === '' || $email === '' || $password === '') {
    notif('Pastikan Anda Mengisi Semua Data', 'register.php');
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    notif('Format Email Tidak Valid', 'register.php');
}
if (strlen($password) < 6) {
    notif('Password Minimal 6 Karakter', 'register.php');
}
if ($password !== $konfirmasi) {
    notif('Konfirmasi Password Tidak Sama', 'register.php');
}

// cek apakah email sudah terdaftar
$cek = mysqli_prepare($koneksi, "SELECT id_user FROM tb_users WHERE email = ?");
mysqli_stmt_bind_param($cek, 's', $email);
mysqli_stmt_execute($cek);
mysqli_stmt_store_result($cek);
if (mysqli_stmt_num_rows($cek) > 0) {
    notif('Email Sudah Terdaftar', 'register.php');
}

// simpan akun baru (CREATE)
$hash = password_hash($password, PASSWORD_DEFAULT);
$tgl  = date('Y-m-d');

$stmt = mysqli_prepare($koneksi,
    "INSERT INTO tb_users (nama, email, password, no_hp, role, tgl_daftar)
     VALUES (?, ?, ?, ?, 'pencari', ?)");
mysqli_stmt_bind_param($stmt, 'sssss', $nama, $email, $hash, $no_hp, $tgl);

if (mysqli_stmt_execute($stmt)) {
    notif('Registrasi Berhasil, Silakan Login', 'login.php');
} else {
    notif('Terjadi Kesalahan', 'register.php');
}
?>
