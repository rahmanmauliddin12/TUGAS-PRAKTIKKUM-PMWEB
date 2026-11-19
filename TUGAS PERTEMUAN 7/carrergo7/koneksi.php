<?php
$servername = 'localhost';
$username   = 'root';
$password   = '';          // Laragon: password root kosong secara default
$database   = 'db_carrergo';

// membuat koneksi
$koneksi = mysqli_connect($servername, $username, $password, $database);

// mengecek koneksi
if (!$koneksi) {
    die('Connection Failed: ' . mysqli_connect_error());
}

// escape output agar aman dari XSS
function e($teks)
{
    return htmlspecialchars((string) $teks, ENT_QUOTES, 'UTF-8');
}

// tampilkan alert lalu pindah halaman
function notif($pesan, $url)
{
    echo '<script>alert(' . json_encode($pesan) . ');window.location=' . json_encode($url) . ';</script>';
    exit;
}
?>
