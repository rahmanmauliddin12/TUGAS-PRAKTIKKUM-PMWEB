<?php
$base  = '../';
$judul = 'Hapus Lowongan';
$aktif = 'lowongan';
include '../cek-admin.php';
include '../koneksi.php';

if (!isset($_GET['id'])) {
    notif('Tidak ada ID yang Terdeteksi', 'lowongan.php');
}
$id = (int) $_GET['id'];

$stmt = mysqli_prepare($koneksi, "SELECT * FROM tb_lowongan WHERE id_lowongan = ?");
mysqli_stmt_bind_param($stmt, 'i', $id);
mysqli_stmt_execute($stmt);
$data = mysqli_fetch_assoc(mysqli_stmt_get_result($stmt));

if (!$data) {
    notif('Data Tidak Ditemukan', 'lowongan.php');
}

include '../partials/header-admin.php';
?>
      <h3>Hapus Lowongan</h3>
      <div class="form-box">
        <h4>Ingin menghapus lowongan "<?= e($data['posisi']) ?>"?</h4>
        <form action="lowongan-proses.php" method="post">
          <input type="hidden" name="id" value="<?= (int) $data['id_lowongan'] ?>">
          <button type="submit" class="btn btn-hapus" name="hapus" style="margin-top: 18px;">Ya, Hapus</button>
          <a class="btn" href="lowongan.php" style="margin-top: 18px;">Tidak</a>
        </form>
      </div>
<?php include '../partials/footer-admin.php'; ?>
