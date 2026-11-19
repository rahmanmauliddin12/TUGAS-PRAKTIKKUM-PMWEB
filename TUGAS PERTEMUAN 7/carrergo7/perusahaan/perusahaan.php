<?php
$base  = '../';
$judul = 'Perusahaan';
$aktif = 'perusahaan';
include '../cek-admin.php';
include '../koneksi.php';
include '../partials/header-admin.php';
?>
      <h3>Data Perusahaan</h3>
      <a class="btn btn-tambah" href="perusahaan-entry.php">Tambah Data</a>

      <table class="table-data">
        <thead>
          <tr>
            <th style="width: 5%">No</th>
            <th style="width: 15%">Logo</th>
            <th>Nama Perusahaan</th>
            <th>Lokasi</th>
            <th style="width: 30%">Deskripsi</th>
            <th style="width: 15%">Aksi</th>
          </tr>
        </thead>
        <tbody>
<?php
// READ: tampilkan seluruh data perusahaan
$result = mysqli_query($koneksi, "SELECT * FROM tb_perusahaan ORDER BY id_perusahaan DESC");

if (mysqli_num_rows($result) == 0) {
    echo "<tr><td colspan='6' align='center'>Data Kosong</td></tr>";
}

$no = 1;
while ($data = mysqli_fetch_assoc($result)) {
?>
          <tr>
            <td><?= $no++ ?></td>
            <td>
              <?php if ($data['logo']) { ?>
                <img src="../img_perusahaan/<?= e($data['logo']) ?>" alt="Logo">
              <?php } else { echo '-'; } ?>
            </td>
            <td><?= e($data['nama_perusahaan']) ?></td>
            <td><?= e($data['lokasi']) ?></td>
            <td><?= e($data['deskripsi']) ?></td>
            <td>
              <a class="btn-edit" href="perusahaan-edit.php?id=<?= (int) $data['id_perusahaan'] ?>">Edit</a> |
              <a class="btn-delete" href="perusahaan-hapus.php?id=<?= (int) $data['id_perusahaan'] ?>">Hapus</a>
            </td>
          </tr>
<?php } ?>
        </tbody>
      </table>
<?php include '../partials/footer-admin.php'; ?>
