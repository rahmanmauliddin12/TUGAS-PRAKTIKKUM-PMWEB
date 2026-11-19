<?php
$root = '../';
require __DIR__ . '/../includes/auth.php';
?>
<?php
$tersimpan = isset($_POST['simpan']);

if ($tersimpan) {
    $posisi     = trim($_POST['posisi'] ?? '');
    $perusahaan = trim($_POST['perusahaan'] ?? '');
    $lokasi     = trim($_POST['lokasi'] ?? '');
    $gajiMin    = (int) ($_POST['gaji_min'] ?? 0);
    $gajiMax    = (int) ($_POST['gaji_max'] ?? 0);
    $jenis      = $_POST['jenis'] ?? '';
    $kategori   = $_POST['kategori'] ?? '';
    $id         = $_POST['id'] ?? '';
    $logo       = $_FILES['photo']['name'] ?? '';

    $valid = $posisi !== '' && $perusahaan !== '' && $lokasi !== '' && $gajiMin > 0 && $gajiMax >= $gajiMin;
}

function rupiah($angka) {
    return 'Rp ' . number_format($angka, 0, ',', '.');
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CarrerGo | Hasil Simpan Lowongan</title>
<link rel="icon" href="../assets/logo.svg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../css/style.css">
</head>
<body data-root="../" data-page="proses" data-auth="required">
<div class="app">
  <aside class="sidebar">
    <a href="../dashboard.php"><img class="logo" src="../assets/logo-white.svg" alt="CarrerGo"></a>
    <nav class="side-nav"><a href="../dashboard.php" class=""><i data-ic="home"></i>Dashboard</a><a href="lowongan.php" class="active"><i data-ic="briefcase"></i>Lowongan Kerja</a><a href="../profile.php" class=""><i data-ic="user"></i>Profil</a></nav>
  </aside>
  <main class="main jobs">
    <div class="topbar">
      <label class="searchbox"><i data-ic="search"></i><input id="topSearch" type="text" placeholder="Cari Lowongan, posisi, atau perusahaan"></label>
      <div class="top-right">
        <button class="bell" id="bellBtn" aria-label="Notifikasi"><i data-ic="bell"></i><span class="dot"></span></button>
        <button class="user-chip" id="userChip"></button>
      </div>
      <div class="dropdown" id="menuNotif"></div><div class="dropdown" id="menuUser"></div>
    </div>

    <?php if (!$tersimpan): ?>
      <h2 class="page-title">Tidak Ada Data</h2>
      <div class="entry-card">
        <p>Halaman ini hanya menerima data dari form lowongan.</p>
        <div class="m-actions"><a class="btn btn-fill" href="lowongan-entry.php">Ke Form Lowongan</a></div>
      </div>

    <?php elseif (!$valid): ?>
      <h2 class="page-title">Data Belum Lengkap</h2>
      <div class="entry-card">
        <p class="form-msg" style="text-align:left">Posisi, perusahaan, lokasi wajib diisi, dan gaji maksimum tidak boleh lebih kecil dari gaji minimum.</p>
        <div class="m-actions"><a class="btn btn-fill" href="lowongan-entry.php">Kembali ke Form</a></div>
      </div>

    <?php else: ?>
      <h2 class="page-title"><?= $id !== '' ? 'Lowongan Diperbarui' : 'Lowongan Ditambahkan' ?></h2>
      <div class="entry-card">
        <table class="hasil-table">
          <tr><th>Posisi</th><td><?= htmlspecialchars($posisi) ?></td></tr>
          <tr><th>Perusahaan</th><td><?= htmlspecialchars($perusahaan) ?></td></tr>
          <tr><th>Lokasi</th><td><?= htmlspecialchars($lokasi) ?></td></tr>
          <tr><th>Gaji</th><td><?= rupiah($gajiMin) ?> - <?= rupiah($gajiMax) ?></td></tr>
          <tr><th>Jenis</th><td><?= htmlspecialchars($jenis) ?></td></tr>
          <tr><th>Kategori</th><td><?= htmlspecialchars($kategori) ?></td></tr>
          <tr><th>Nama file logo</th><td><?= $logo !== '' ? htmlspecialchars($logo) : '(tidak ada file)' ?></td></tr>
        </table>
        <div class="m-actions"><a class="btn btn-fill" href="lowongan.php">Lihat Daftar Lowongan</a></div>
      </div>
    <?php endif; ?>
  </main>
</div>
<script src="../js/app.js"></script>
</body>
</html>
