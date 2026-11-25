<?php
$base = '../';
include '../cek-admin.php';
include '../koneksi.php';

// Upload logo. Hasil: nama file baru, '' (tidak ada file), atau false (file tidak valid)
function upload()
{
    if ($_FILES['logo']['error'] === 4) {
        return '';
    }
    if ($_FILES['logo']['error'] !== 0 || $_FILES['logo']['size'] > 2 * 1024 * 1024) {
        return false;
    }

    $ekstensi = strtolower(pathinfo($_FILES['logo']['name'], PATHINFO_EXTENSION));
    if (!in_array($ekstensi, ['jpg', 'jpeg', 'png'])) {
        return false;
    }

    $namaBaru = uniqid() . '.' . $ekstensi;
    if (!move_uploaded_file($_FILES['logo']['tmp_name'], '../img_perusahaan/' . $namaBaru)) {
        return false;
    }
    return $namaBaru;
}

function hapusFile($nama)
{
    $path = '../img_perusahaan/' . basename($nama);
    if ($nama !== '' && is_file($path)) {
        unlink($path);
    }
}

/* ================= CREATE ================= */
if (isset($_POST['simpan'])) {
    $nama      = trim($_POST['nama_perusahaan']);
    $lokasi    = trim($_POST['lokasi']);
    $deskripsi = trim($_POST['deskripsi']);

    if ($nama === '' || $lokasi === '' || $deskripsi === '') {
        notif('Pastikan Anda Mengisi Semua Data', 'perusahaan-entry.php');
    }

    $logo = upload();
    if ($logo === false) {
        notif('Logo harus berupa JPG/PNG dengan ukuran maksimal 2 MB', 'perusahaan-entry.php');
    }

    $stmt = mysqli_prepare($koneksi,
        "INSERT INTO tb_perusahaan (nama_perusahaan, lokasi, deskripsi, logo) VALUES (?, ?, ?, ?)");
    mysqli_stmt_bind_param($stmt, 'ssss', $nama, $lokasi, $deskripsi, $logo);

    if (mysqli_stmt_execute($stmt)) {
        notif('Data Perusahaan Berhasil Ditambahkan', 'perusahaan.php');
    }
    hapusFile($logo);
    notif('Terjadi Kesalahan', 'perusahaan-entry.php');

/* ================= UPDATE ================= */
} elseif (isset($_POST['edit'])) {
    $id        = (int) $_POST['id'];
    $nama      = trim($_POST['nama_perusahaan']);
    $lokasi    = trim($_POST['lokasi']);
    $deskripsi = trim($_POST['deskripsi']);
    $logoLama  = $_POST['logoLama'];

    if ($nama === '' || $lokasi === '' || $deskripsi === '') {
        notif('Pastikan Anda Mengisi Semua Data', 'perusahaan-edit.php?id=' . $id);
    }

    // jika tidak ada logo baru, pakai logo lama
    $logo = upload();
    if ($logo === false) {
        notif('Logo harus berupa JPG/PNG dengan ukuran maksimal 2 MB', 'perusahaan-edit.php?id=' . $id);
    }
    $logoBaruDiupload = ($logo !== '');
    if (!$logoBaruDiupload) {
        $logo = $logoLama;
    }

    $stmt = mysqli_prepare($koneksi,
        "UPDATE tb_perusahaan SET nama_perusahaan = ?, lokasi = ?, deskripsi = ?, logo = ?
         WHERE id_perusahaan = ?");
    mysqli_stmt_bind_param($stmt, 'ssssi', $nama, $lokasi, $deskripsi, $logo, $id);

    if (mysqli_stmt_execute($stmt)) {
        if ($logoBaruDiupload) {
            hapusFile($logoLama);   // logo lama dihapus setelah update berhasil
        }
        notif('Data Perusahaan Berhasil Diubah', 'perusahaan.php');
    }
    if ($logoBaruDiupload) {
        hapusFile($logo);
    }
    notif('Terjadi Kesalahan', 'perusahaan-edit.php?id=' . $id);

/* ================= DELETE ================= */
} elseif (isset($_POST['hapus'])) {
    $id = (int) $_POST['id'];

    // perusahaan yang masih memiliki lowongan tidak boleh dihapus (foreign key)
    $cek = mysqli_prepare($koneksi, "SELECT COUNT(*) FROM tb_lowongan WHERE id_perusahaan = ?");
    mysqli_stmt_bind_param($cek, 'i', $id);
    mysqli_stmt_execute($cek);
    mysqli_stmt_bind_result($cek, $jumlah);
    mysqli_stmt_fetch($cek);
    mysqli_stmt_close($cek);

    if ($jumlah > 0) {
        notif('Perusahaan tidak dapat dihapus karena masih memiliki lowongan', 'perusahaan.php');
    }

    // ambil nama logo agar file ikut dihapus
    $ambil = mysqli_prepare($koneksi, "SELECT logo FROM tb_perusahaan WHERE id_perusahaan = ?");
    mysqli_stmt_bind_param($ambil, 'i', $id);
    mysqli_stmt_execute($ambil);
    mysqli_stmt_bind_result($ambil, $logo);
    mysqli_stmt_fetch($ambil);
    mysqli_stmt_close($ambil);

    $stmt = mysqli_prepare($koneksi, "DELETE FROM tb_perusahaan WHERE id_perusahaan = ?");
    mysqli_stmt_bind_param($stmt, 'i', $id);

    if (mysqli_stmt_execute($stmt)) {
        hapusFile((string) $logo);
        notif('Data Perusahaan Berhasil Dihapus', 'perusahaan.php');
    }
    notif('Data Perusahaan Gagal Dihapus', 'perusahaan.php');

} else {
    header('location: perusahaan.php');
}
?>
