<?php
$base = '../';
include '../cek-admin.php';
include '../koneksi.php';
require_once '../dompdf/autoload.inc.php';

use Dompdf\Dompdf;

// notice/deprecated tidak boleh tercetak karena akan merusak file PDF
error_reporting(E_ALL & ~E_DEPRECATED & ~E_NOTICE);
date_default_timezone_set('Asia/Jakarta');

$dompdf = new Dompdf();

$query = mysqli_query($koneksi,
    "SELECT l.*, p.nama_perusahaan, p.lokasi
     FROM tb_lowongan l
     JOIN tb_perusahaan p ON l.id_perusahaan = p.id_perusahaan
     ORDER BY l.id_lowongan");

$html = '<style>
            body { font-family: Helvetica, Arial, sans-serif; font-size: 12px; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #000; padding: 6px; }
            th { background: #04157a; color: #fff; }
         </style>';
$html .= '<center><h3>Data Lowongan CarrerGo</h3></center>';
$html .= '<p>Dicetak pada: ' . date('d-m-Y H:i') . ' oleh ' . e($_SESSION['nama']) . '</p><hr/><br>';
$html .= '<table>
            <tr>
                <th>No</th>
                <th>Posisi</th>
                <th>Perusahaan</th>
                <th>Lokasi</th>
                <th>Kategori</th>
                <th>Jenis</th>
                <th>Gaji</th>
                <th>Tgl Posting</th>
            </tr>';

$no = 1;
while ($lowongan = mysqli_fetch_assoc($query)) {
    $html .= '<tr>
                <td>' . $no . '</td>
                <td>' . e($lowongan['posisi']) . '</td>
                <td>' . e($lowongan['nama_perusahaan']) . '</td>
                <td>' . e($lowongan['lokasi']) . '</td>
                <td>' . e($lowongan['kategori']) . '</td>
                <td>' . e($lowongan['jenis']) . '</td>
                <td>Rp. ' . number_format($lowongan['gaji_min'], 0, ',', '.') . ' - ' . number_format($lowongan['gaji_max'], 0, ',', '.') . '</td>
                <td>' . date('d-m-Y', strtotime($lowongan['tgl_posting'])) . '</td>
              </tr>';
    $no++;
}
$html .= '</table>';

$dompdf->loadHtml($html);

// Setting ukuran dan orientasi kertas
$dompdf->setPaper('A4', 'landscape');

// Rendering dari HTML ke PDF
$dompdf->render();

// Melakukan output file PDF
$dompdf->stream('laporan-lowongan.pdf');
?>
