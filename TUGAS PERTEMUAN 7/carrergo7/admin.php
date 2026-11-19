<?php
$base  = '';
$judul = 'Dashboard';
$aktif = 'dashboard';
include 'cek-admin.php';
include 'koneksi.php';

// hitung ringkasan data (READ)
function hitung($koneksi, $tabel)
{
    $r = mysqli_query($koneksi, "SELECT COUNT(*) AS total FROM $tabel");
    return mysqli_fetch_assoc($r)['total'];
}

include 'partials/header-admin.php';
?>
      <h2 id="text"><?= e($_SESSION['nama']) ?></h2>
      <h3 id="date"></h3>

      <div class="cards">
        <div class="card"><span><?= hitung($koneksi, 'tb_users') ?></span>Pengguna</div>
        <div class="card"><span><?= hitung($koneksi, 'tb_perusahaan') ?></span>Perusahaan</div>
        <div class="card"><span><?= hitung($koneksi, 'tb_lowongan') ?></span>Lowongan</div>
        <div class="card"><span><?= hitung($koneksi, 'tb_lamaran') ?></span>Lamaran</div>
      </div>

      <script>
        const nama = <?= json_encode($_SESSION['nama']) ?>;
        const bulan = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
        const hari  = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];
        const dua = (n) => (n < 10 ? "0" + n : n);

        function sapaan(jam) {
          if (jam >= 4 && jam <= 10) return "Selamat Pagi,";
          if (jam >= 11 && jam <= 14) return "Selamat Siang,";
          if (jam >= 15 && jam <= 18) return "Selamat Sore,";
          return "Selamat Malam,";
        }
        function jalankanJam() {
          const d = new Date();
          document.getElementById("text").textContent = sapaan(d.getHours()) + " " + nama;
          document.getElementById("date").textContent =
            hari[d.getDay()] + ", " + d.getDate() + " " + bulan[d.getMonth()] + " " + d.getFullYear() +
            ", " + d.getHours() + ":" + dua(d.getMinutes()) + ":" + dua(d.getSeconds());
        }
        jalankanJam();
        setInterval(jalankanJam, 1000);
      </script>
<?php include 'partials/footer-admin.php'; ?>
