<?php
// Penjaga halaman admin. Variabel $base harus diisi sebelum file ini di-include.
session_start();
if (!isset($_SESSION['id_user']) || $_SESSION['role'] !== 'admin') {
    header('location:' . $base . 'login.php');
    exit;
}
?>
