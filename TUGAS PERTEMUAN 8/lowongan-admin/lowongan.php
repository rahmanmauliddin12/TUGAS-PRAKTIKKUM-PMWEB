<?php
$base  = '../';
$judul = 'Lowongan';
$aktif = 'lowongan';
include '../cek-admin.php';
include '../koneksi.php';
include '../partials/header-admin.php';
?>
      <h3>Data Lowongan</h3>
      <div class="aksi-bar">
        <a class="btn btn-tambah" href="lowongan-entry.php">Tambah Data</a>
        <a class="btn btn-cetak" href="lowongan-cetak.php" target="_blank">Cetak PDF</a>
      </div>

      <table class="table-data">
        <thead>
          <tr>
            <th style="width: 5%">No</th>
            <th>Posisi</th>
            <th>Perusahaan</th>
            <th>Kategori</th>
            <th>Jenis</th>
            <th>Gaji</th>
            <th>Tgl Posting</th>
            <th style="width: 14%">Aksi</th>
          </tr>
        </thead>
        <tbody>
<?php
// READ: tampilkan seluruh lowongan beserta nama perusahaannya (JOIN)
$sql = "SELECT l.*, p.nama_perusahaan
        FROM tb_lowongan l
        JOIN tb_perusahaan p ON l.id_perusahaan = p.id_perusahaan
        ORDER BY l.id_lowongan DESC";
$result = mysqli_query($koneksi, $sql);

if (mysqli_num_rows($result) == 0) {
    echo "<tr><td colspan='8' align='center'>Data Kosong</td></tr>";
}

$no = 1;
while ($data = mysqli_fetch_assoc($result)) {
?>
          <tr>
            <td><?= $no++ ?></td>
            <td><?= e($data['posisi']) ?></td>
            <td><?= e($data['nama_perusahaan']) ?></td>
            <td><?= e($data['kategori']) ?></td>
            <td><?= e($data['jenis']) ?></td>
            <td>Rp <?= number_format($data['gaji_min'], 0, ',', '.') ?> - <?= number_format($data['gaji_max'], 0, ',', '.') ?></td>
            <td><?= e(date('d-m-Y', strtotime($data['tgl_posting']))) ?></td>
            <td>
              <a class="btn-edit" href="lowongan-edit.php?id=<?= (int) $data['id_lowongan'] ?>">Edit</a> |
              <a class="btn-delete" href="lowongan-hapus.php?id=<?= (int) $data['id_lowongan'] ?>">Hapus</a>
            </td>
          </tr>
<?php } ?>
        </tbody>
      </table>
<?php include '../partials/footer-admin.php'; ?>
