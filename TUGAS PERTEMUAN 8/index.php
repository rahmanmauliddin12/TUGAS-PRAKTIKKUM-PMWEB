<?php
session_start();
$sudahLogin = isset($_SESSION['id_user']);
$adalahAdmin = $sudahLogin && ($_SESSION['role'] ?? '') === 'admin';
$namaUser = htmlspecialchars($_SESSION['nama'] ?? '');
?>
<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CarrerGo | Temukan Kerja, Kembangkan Karier</title>
<link rel="icon" href="assets/logo.svg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/style.css">
</head>
<body class="landing" data-page="landing">
  <div class="blob b1"></div><div class="blob b2"></div><div class="blob b3"></div><div class="blob b4"></div>
  <header class="nav">
    <a class="brand" href="index.php"><img src="assets/logo.svg" alt="CarrerGo"></a>
    <nav class="menu">
      <a href="#" data-go="top">Beranda</a>
      <a href="#" data-go="tentang">Tentang</a>
      <a href="#fitur" data-go="fitur">Fitur</a>
    </nav>
    <div class="auth">
<?php if ($sudahLogin) { ?>
      <?php if ($adalahAdmin) { ?>
      <a class="link-login" href="admin.php">Dashboard</a>
      <?php } else { ?>
      <span class="link-login">Halo, <?= $namaUser ?></span>
      <?php } ?>
      <a class="btn btn-fill btn-daftar" href="logout.php">Logout</a>
<?php } else { ?>
      <a class="link-login" href="login.php">Login</a>
      <a class="btn btn-fill btn-daftar" href="register.php">Daftar</a>
<?php } ?>
    </div>
    <button class="menu-btn" id="menuBtn" aria-label="Menu"><i data-ic="menu"></i></button>
  </header>
  <main class="hero">
    <div class="hero-text">
      <h1>Temukan Kerja,<span id="subJudul">Kembangkan Karier</span></h1>
      <p id="deskripsi">CarrerGo membantu kamu menemukan peluang kerja terbaik dan meningkatkan keterampilan untuk masa depan yang lebih baik</p>
      <div class="hero-cta">
<?php if ($sudahLogin) { ?>
        <a class="btn btn-fill" href="<?= $adalahAdmin ? 'admin.php' : 'logout.php' ?>"><?= $adalahAdmin ? 'Ke Dashboard' : 'Logout' ?></a>
<?php } else { ?>
        <a class="btn btn-fill" href="register.php">Mulai Sekarang</a>
        <a class="btn btn-sq" href="login.php">Login</a>
<?php } ?>
      </div>
    </div>
    <img class="hero-img" src="assets/hero.png" alt="Ilustrasi gedung dan rapat">
  </main>
  <section class="features" id="fitur">
    <div class="feat"><span class="feat-ic"><i data-ic="briefcase"></i></span><span>Lowongan Kerja<br>Terkini</span></div>
    <div class="feat"><span class="feat-ic"><i data-ic="award"></i></span><span>Pelatihan &amp;<br>pengembangan Skill</span></div>
    <div class="feat"><span class="feat-ic"><i data-ic="resume"></i></span><span>Profil karier<br>terpadu</span></div>
  </section>
<script src="js/app.js"></script>
<script src="js/tugas.js"></script>
</body>
</html>