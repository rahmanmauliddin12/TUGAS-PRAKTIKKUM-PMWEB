<?php
$emailCookie = $_COOKIE['cg_email'] ?? '';
$msg = '';
$ok = false;
if (isset($_GET['logout'])) { $msg = 'Kamu sudah keluar. Session dihapus.'; $ok = true; }
elseif (isset($_GET['auth'])) { $msg = 'Silakan login terlebih dahulu.'; }
elseif (isset($_GET['error'])) { $msg = 'Data login tidak valid. Coba lagi.'; }
?>
<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CarrerGo | Login</title>
<link rel="icon" href="assets/logo.svg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/style.css">
</head>
<body class="auth login-page" data-page="login">
<div class="auth-page">
  <div class="auth-left">
    <div class="blob b-l"></div><div class="blob b-b1"></div>
    <a href="index.php"><img class="logo" src="assets/logo.svg" alt="CarrerGo"></a>
    <div class="auth-form-wrap">
      <h1>Selamat Datang!</h1>
      <p class="auth-sub">Masuk ke akun CarrerGo untuk melanjutkan perjalanan kariermu</p>
      <form id="loginForm" method="post" action="login-proses.php" novalidate>
        <div class="field f-email"><label for="email">Email</label>
          <div class="input-wrap"><i data-ic="mail" class="mail"></i><input id="email" name="email" type="email" value="<?= htmlspecialchars($emailCookie) ?>" placeholder="Masukkan Email" autocomplete="email"><input type="hidden" name="nama" id="namaHidden"></div></div>
        <div class="field f-pass"><label for="password">Password</label>
          <div class="input-wrap"><i data-ic="lock" class="lock"></i><input id="password" type="password" placeholder="Masukkan Password" autocomplete="current-password"><button type="button" class="eye" aria-label="Tampilkan password"><i data-ic="eye"></i></button></div></div>
        <a href="#" class="lupa" id="lupa">Lupa Password</a>
        <button type="submit" class="btn submit-btn">Login</button>
        <p class="form-msg<?= $ok ? ' ok' : '' ?>" id="formMsg"><?= htmlspecialchars($msg) ?></p>
      </form>
      <p class="alt">Belum punya akun? <a href="register.php">Daftar</a></p>
    </div>
  </div>
  <div class="auth-right">
    <div class="blob dark b-r1"></div><div class="blob dark b-b2"></div>
    <img class="illu" src="assets/login-illustration.png" alt="">
  </div>
</div>
<script src="js/app.js"></script>
<script src="js/tugas.js"></script>
</body>
</html>
