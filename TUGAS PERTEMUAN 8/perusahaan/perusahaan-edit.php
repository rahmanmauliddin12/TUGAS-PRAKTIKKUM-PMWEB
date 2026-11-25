<?php
$base  = '../';
$judul = 'Edit Perusahaan';
$aktif = 'perusahaan';
include '../cek-admin.php';
include '../koneksi.php';

if (!isset($_GET['id'])) {
    notif('Tidak ada ID yang Terdeteksi', 'perusahaan.php');
}
$id = (int) $_GET['id'];

// READ: ambil data yang akan diubah
$stmt = mysqli_prepare($koneksi, "SELECT * FROM tb_perusahaan WHERE id_perusahaan = ?");
mysqli_stmt_bind_param($stmt, 'i', $id);
mysqli_stmt_execute($stmt);
$data = mysqli_fetch_assoc(mysqli_stmt_get_result($stmt));

if (!$data) {
    notif('Data Tidak Ditemukan', 'perusahaan.php');
}

include '../partials/header-admin.php';
?>
      <h3>Edit Perusahaan</h3>
      <div class="form-box">
        <form action="perusahaan-proses.php" method="post" enctype="multipart/form-data">
          <input type="hidden" name="id" value="<?= (int) $data['id_perusahaan'] ?>">
          <input type="hidden" name="logoLama" value="<?= e($data['logo']) ?>">

          <label for="nama_perusahaan">Nama Perusahaan</label>
          <input class="input" type="text" name="nama_perusahaan" id="nama_perusahaan" maxlength="100"
                 value="<?= e($data['nama_perusahaan']) ?>">

          <label for="lokasi">Lokasi</label>
          <input class="input" type="text" name="lokasi" id="lokasi" maxlength="100"
                 value="<?= e($data['lokasi']) ?>">

          <label for="deskripsi">Deskripsi</label>
          <textarea class="input" name="deskripsi" id="deskripsi"><?= e($data['deskripsi']) ?></textarea>

          <label for="logo">Logo (kosongkan jika tidak diganti)</label>
          <?php if ($data['logo']) { ?>
            <img src="../img_perusahaan/<?= e($data['logo']) ?>" alt="Logo" width="120"><br>
          <?php } ?>
          <input type="file" name="logo" id="logo" accept=".jpg,.jpeg,.png">

          <button type="submit" class="btn btn-simpan" name="edit">Ubah</button>
          <a class="btn" href="perusahaan.php" style="margin-top: 18px;">Batal</a>
        </form>
      </div>
<?php include '../partials/footer-admin.php'; ?>
