<?php
$base = '../';
include '../cek-admin.php';
include '../koneksi.php';
include 'pilihan.php';
date_default_timezone_set('Asia/Jakarta');

// Validasi data form lowongan. Mengembalikan pesan kesalahan, atau '' jika data valid.
function cekData($daftarKategori, $daftarJenis)
{
    $posisi = trim($_POST['posisi'] ?? '');
    $min    = $_POST['gaji_min'] ?? '';
    $max    = $_POST['gaji_max'] ?? '';

    if ($posisi === '' || $min === '' || $max === '' || empty($_POST['id_perusahaan'])) {
        return 'Pastikan Anda Mengisi Semua Data';
    }
    if (!in_array($_POST['kategori'] ?? '', $daftarKategori) || !in_array($_POST['jenis'] ?? '', $daftarJenis)) {
        return 'Kategori atau Jenis tidak valid';
    }
    if ((int) $min < 0 || (int) $max < (int) $min) {
        return 'Gaji maksimum tidak boleh lebih kecil dari gaji minimum';
    }
    return '';
}

/* ================= CREATE ================= */
if (isset($_POST['simpan'])) {
    $salah = cekData($daftarKategori, $daftarJenis);
    if ($salah !== '') {
        notif($salah, 'lowongan-entry.php');
    }

    $idPerusahaan = (int) $_POST['id_perusahaan'];
    $posisi       = trim($_POST['posisi']);
    $kategori     = $_POST['kategori'];
    $jenis        = $_POST['jenis'];
    $gajiMin      = (int) $_POST['gaji_min'];
    $gajiMax      = (int) $_POST['gaji_max'];
    $tanggal      = date('Y-m-d');

    $stmt = mysqli_prepare($koneksi,
        "INSERT INTO tb_lowongan (id_perusahaan, posisi, kategori, jenis, gaji_min, gaji_max, tgl_posting)
         VALUES (?, ?, ?, ?, ?, ?, ?)");
    mysqli_stmt_bind_param($stmt, 'isssiis', $idPerusahaan, $posisi, $kategori, $jenis, $gajiMin, $gajiMax, $tanggal);

    if (mysqli_stmt_execute($stmt)) {
        notif('Data Lowongan Berhasil Ditambahkan', 'lowongan.php');
    }
    notif('Terjadi Kesalahan', 'lowongan-entry.php');

/* ================= UPDATE ================= */
} elseif (isset($_POST['edit'])) {
    $id = (int) $_POST['id'];

    $salah = cekData($daftarKategori, $daftarJenis);
    if ($salah !== '') {
        notif($salah, 'lowongan-edit.php?id=' . $id);
    }

    $idPerusahaan = (int) $_POST['id_perusahaan'];
    $posisi       = trim($_POST['posisi']);
    $kategori     = $_POST['kategori'];
    $jenis        = $_POST['jenis'];
    $gajiMin      = (int) $_POST['gaji_min'];
    $gajiMax      = (int) $_POST['gaji_max'];

    $stmt = mysqli_prepare($koneksi,
        "UPDATE tb_lowongan SET id_perusahaan = ?, posisi = ?, kategori = ?, jenis = ?, gaji_min = ?, gaji_max = ?
         WHERE id_lowongan = ?");
    mysqli_stmt_bind_param($stmt, 'isssiii', $idPerusahaan, $posisi, $kategori, $jenis, $gajiMin, $gajiMax, $id);

    if (mysqli_stmt_execute($stmt)) {
        notif('Data Lowongan Berhasil Diubah', 'lowongan.php');
    }
    notif('Terjadi Kesalahan', 'lowongan-edit.php?id=' . $id);

/* ================= DELETE ================= */
} elseif (isset($_POST['hapus'])) {
    $id = (int) $_POST['id'];

    // lowongan yang sudah memiliki lamaran tidak boleh dihapus (foreign key)
    $cek = mysqli_prepare($koneksi, "SELECT COUNT(*) FROM tb_lamaran WHERE id_lowongan = ?");
    mysqli_stmt_bind_param($cek, 'i', $id);
    mysqli_stmt_execute($cek);
    mysqli_stmt_bind_result($cek, $jumlah);
    mysqli_stmt_fetch($cek);
    mysqli_stmt_close($cek);

    if ($jumlah > 0) {
        notif('Lowongan tidak dapat dihapus karena sudah memiliki lamaran', 'lowongan.php');
    }

    $stmt = mysqli_prepare($koneksi, "DELETE FROM tb_lowongan WHERE id_lowongan = ?");
    mysqli_stmt_bind_param($stmt, 'i', $id);

    if (mysqli_stmt_execute($stmt)) {
        notif('Data Lowongan Berhasil Dihapus', 'lowongan.php');
    }
    notif('Data Lowongan Gagal Dihapus', 'lowongan.php');

} else {
    header('location: lowongan.php');
}
?>
