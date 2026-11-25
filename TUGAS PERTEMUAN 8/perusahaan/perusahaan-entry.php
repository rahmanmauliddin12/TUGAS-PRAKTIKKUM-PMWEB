<?php
$base  = '../';
$judul = 'Tambah Perusahaan';
$aktif = 'perusahaan';
include '../cek-admin.php';
include '../koneksi.php';
include '../partials/header-admin.php';
?>
      <h3>Input Perusahaan</h3>
      <div class="form-box">
        <form action="perusahaan-proses.php" method="post" enctype="multipart/form-data">
          <label for="nama_perusahaan">Nama Perusahaan</label>
          <input class="input" type="text" name="nama_perusahaan" id="nama_perusahaan" maxlength="100" placeholder="Nama perusahaan">

          <label for="lokasi">Lokasi</label>
          <input class="input" type="text" name="lokasi" id="lokasi" maxlength="100" placeholder="Kota / alamat">

          <label for="deskripsi">Deskripsi</label>
          <textarea class="input" name="deskripsi" id="deskripsi" placeholder="Deskripsi perusahaan"></textarea>

          <label for="logo">Logo (JPG/PNG, maks. 2 MB, boleh dikosongkan)</label>
          <input type="file" name="logo" id="logo" accept=".jpg,.jpeg,.png">

          <button type="submit" class="btn btn-simpan" name="simpan">Simpan</button>
          <a class="btn" href="perusahaan.php" style="margin-top: 18px;">Batal</a>
        </form>
      </div>
<?php include '../partials/footer-admin.php'; ?>
