<?php
$base  = '../';
$judul = 'Hapus Perusahaan';
$aktif = 'perusahaan';
include '../cek-admin.php';
include '../koneksi.php';

if (!isset($_GET['id'])) {
    notif('Tidak ada ID yang Terdeteksi', 'perusahaan.php');
}
$id = (int) $_GET['id'];

$stmt = mysqli_prepare($koneksi, "SELECT * FROM tb_perusahaan WHERE id_perusahaan = ?");
mysqli_stmt_bind_param($stmt, 'i', $id);
mysqli_stmt_execute($stmt);
$data = mysqli_fetch_assoc(mysqli_stmt_get_result($stmt));

if (!$data) {
    notif('Data Tidak Ditemukan', 'perusahaan.php');
}

include '../partials/header-admin.php';
?>
      <h3>Hapus Perusahaan</h3>
      <div class="form-box">
        <h4>Ingin menghapus data "<?= e($data['nama_perusahaan']) ?>"?</h4>
        <form action="perusahaan-proses.php" method="post">
          <input type="hidden" name="id" value="<?= (int) $data['id_perusahaan'] ?>">
          <button type="submit" class="btn btn-hapus" name="hapus" style="margin-top: 18px;">Ya, Hapus</button>
          <a class="btn" href="perusahaan.php" style="margin-top: 18px;">Tidak</a>
        </form>
      </div>
<?php include '../partials/footer-admin.php'; ?>
