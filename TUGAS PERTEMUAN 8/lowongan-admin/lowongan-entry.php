<?php
$base  = '../';
$judul = 'Tambah Lowongan';
$aktif = 'lowongan';
include '../cek-admin.php';
include '../koneksi.php';
include 'pilihan.php';

// lowongan harus dimiliki oleh sebuah perusahaan
$perusahaan = mysqli_query($koneksi, "SELECT id_perusahaan, nama_perusahaan FROM tb_perusahaan ORDER BY nama_perusahaan");
if (mysqli_num_rows($perusahaan) == 0) {
    notif('Tambahkan data perusahaan terlebih dahulu', '../perusahaan/perusahaan-entry.php');
}

include '../partials/header-admin.php';
?>
      <h3>Input Lowongan</h3>
      <div class="form-box">
        <form action="lowongan-proses.php" method="post">
          <label for="id_perusahaan">Perusahaan</label>
          <select class="input" name="id_perusahaan" id="id_perusahaan">
<?php while ($p = mysqli_fetch_assoc($perusahaan)) { ?>
            <option value="<?= (int) $p['id_perusahaan'] ?>"><?= e($p['nama_perusahaan']) ?></option>
<?php } ?>
          </select>

          <label for="posisi">Posisi</label>
          <input class="input" type="text" name="posisi" id="posisi" maxlength="100" placeholder="cth: Data Analyst">

          <div class="row-2">
            <div>
              <label for="kategori">Kategori</label>
              <select class="input" name="kategori" id="kategori">
<?php foreach ($daftarKategori as $k) { ?>
                <option value="<?= e($k) ?>"><?= e($k) ?></option>
<?php } ?>
              </select>
            </div>
            <div>
              <label for="jenis">Jenis</label>
              <select class="input" name="jenis" id="jenis">
<?php foreach ($daftarJenis as $j) { ?>
                <option value="<?= e($j) ?>"><?= e($j) ?></option>
<?php } ?>
              </select>
            </div>
          </div>

          <div class="row-2">
            <div>
              <label for="gaji_min">Gaji Minimum (Rp)</label>
              <input class="input" type="number" name="gaji_min" id="gaji_min" min="0" placeholder="6000000">
            </div>
            <div>
              <label for="gaji_max">Gaji Maksimum (Rp)</label>
              <input class="input" type="number" name="gaji_max" id="gaji_max" min="0" placeholder="8000000">
            </div>
          </div>

          <button type="submit" class="btn btn-simpan" name="simpan">Simpan</button>
          <a class="btn" href="lowongan.php" style="margin-top: 18px;">Batal</a>
        </form>
      </div>
<?php include '../partials/footer-admin.php'; ?>
