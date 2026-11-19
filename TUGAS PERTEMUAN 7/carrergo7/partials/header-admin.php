<?php
// Variabel yang harus diisi sebelum include: $base (awalan path), $judul, $aktif
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="<?= $base ?>css/carrergo.css">
  <title>CarrerGo Admin | <?= e($judul) ?></title>
</head>
<body>
  <div class="sidebar">
    <div class="logo-details"><span class="logo_name">CarrerGo</span></div>
    <ul class="nav-links">
      <li><a href="<?= $base ?>admin.php" class="<?= $aktif === 'dashboard' ? 'active' : '' ?>">Dashboard</a></li>
      <li><a href="<?= $base ?>perusahaan/perusahaan.php" class="<?= $aktif === 'perusahaan' ? 'active' : '' ?>">Perusahaan</a></li>
      <li><a href="<?= $base ?>logout.php">Log out</a></li>
    </ul>
  </div>
  <section class="home-section">
    <nav>
      <span class="admin_name">Admin: <?= e($_SESSION['nama']) ?></span>
    </nav>
    <div class="home-content">
