<?php
$base  = '../';
$judul = 'Edit Lowongan';
$aktif = 'lowongan';
include '../cek-admin.php';
include '../koneksi.php';
include 'pilihan.php';

if (!isset($_GET['id'])) {
    notif('Tidak ada ID yang Terdeteksi', 'lowongan.php');
}
$id = (int) $_GET['id'];

// READ: ambil data yang akan diubah
$stmt = mysqli_prepare($koneksi, "SELECT * FROM tb_lowongan WHERE id_lowongan = ?");
mysqli_stmt_bind_param($stmt, 'i', $id);
mysqli_stmt_execute($stmt);
$data = mysqli_fetch_assoc(mysqli_stmt_get_result($stmt));

if (!$data) {
    notif('Data Tidak Ditemukan', 'lowongan.php');
}

$perusahaan = mysqli_query($koneksi, "SELECT id_perusahaan, nama_perusahaan FROM tb_perusahaan ORDER BY nama_perusahaan");

include '../partials/header-admin.php';
?>
      <h3>Edit Lowongan</h3>
      <div class="form-box">
        <form action="lowongan-proses.php" method="post">
          <input type="hidden" name="id" value="<?= (int) $data['id_lowongan'] ?>">

          <label for="id_perusahaan">Perusahaan</label>
          <select class="input" name="id_perusahaan" id="id_perusahaan">
<?php while ($p = mysqli_fetch_assoc($perusahaan)) { ?>
            <option value="<?= (int) $p['id_perusahaan'] ?>"<?= (int) $p['id_perusahaan'] === (int) $data['id_perusahaan'] ? ' selected' : '' ?>><?= e($p['nama_perusahaan']) ?></option>
<?php } ?>
          </select>

          <label for="posisi">Posisi</label>
          <input class="input" type="text" name="posisi" id="posisi" maxlength="100" value="<?= e($data['posisi']) ?>" placeholder="cth: Data Analyst">

          <div class="row-2">
            <div>
              <label for="kategori">Kategori</label>
              <select class="input" name="kategori" id="kategori">
<?php foreach ($daftarKategori as $k) { ?>
                <option value="<?= e($k) ?>"<?= $k === $data['kategori'] ? ' selected' : '' ?>><?= e($k) ?></option>
<?php } ?>
              </select>
            </div>
            <div>
              <label for="jenis">Jenis</label>
              <select class="input" name="jenis" id="jenis">
<?php foreach ($daftarJenis as $j) { ?>
                <option value="<?= e($j) ?>"<?= $j === $data['jenis'] ? ' selected' : '' ?>><?= e($j) ?></option>
<?php } ?>
              </select>
            </div>
          </div>

          <div class="row-2">
            <div>
              <label for="gaji_min">Gaji Minimum (Rp)</label>
              <input class="input" type="number" name="gaji_min" id="gaji_min" min="0" value="<?= (int) $data['gaji_min'] ?>" placeholder="6000000">
            </div>
            <div>
              <label for="gaji_max">Gaji Maksimum (Rp)</label>
              <input class="input" type="number" name="gaji_max" id="gaji_max" min="0" value="<?= (int) $data['gaji_max'] ?>" placeholder="8000000">
            </div>
          </div>

          <button type="submit" class="btn btn-simpan" name="edit">Ubah</button>
          <a class="btn" href="lowongan.php" style="margin-top: 18px;">Batal</a>
        </form>
      </div>
<?php include '../partials/footer-admin.php'; ?>
