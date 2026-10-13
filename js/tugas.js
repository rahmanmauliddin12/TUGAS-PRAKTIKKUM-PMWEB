(function () {
  // ===== CSS Toast (disisipkan lewat JS) =====
  const style = document.createElement("style");
  style.textContent = `
    .toast {
      position: fixed; bottom: 24px; left: 50%;
      transform: translateX(-50%);
      background: #333; color: #fff;
      padding: 12px 20px; border-radius: 8px;
      font-size: 14px; z-index: 9999;
      box-shadow: 0 4px 12px rgba(0,0,0,.25);
      opacity: 0; transition: opacity .3s;
    }
    .toast.show { opacity: 1; }
  `;
  document.head.append(style);

  // ===== DOM 1: Mengganti isi elemen (innerHTML) =====
  document.getElementById("subJudul").innerHTML = "Raih Karier Impianmu";

  // ===== DOM 2: Mengganti style CSS (style.backgroundColor) =====
  const fitur = document.querySelectorAll(".feat");
  fitur.forEach(function (f) {
    f.addEventListener("mouseenter", function () {
      f.style.backgroundColor = "#eaf2f8";
    });
    f.addEventListener("mouseleave", function () {
      f.style.backgroundColor = "";
    });
  });

  // ===== DOM 3: Menambah elemen baru (createElement + after) =====
  const catatan = document.createElement("p");
  catatan.textContent = "Ribuan lowongan baru setiap hari!";
  catatan.style.fontWeight = "600";
  document.getElementById("deskripsi").after(catatan);

  // ===== Mengubah atribut (setAttribute) =====
  fitur.forEach(function (f, i) {
    f.setAttribute("title", "Fitur ke-" + (i + 1));
  });

  // ===== Toast / Snackbar =====
  function showToast(pesan) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = pesan;
    document.body.append(toast);
    setTimeout(() => toast.classList.add("show"), 10);
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // Toast muncul saat halaman dibuka
  showToast("Selamat datang di CarrerGo!");

  // Toast muncul saat kartu fitur diklik
  fitur.forEach(function (f) {
    f.addEventListener("click", function () {
      showToast(f.textContent.trim().replace(/\s+/g, " ") + " dipilih");
    });
  });
})();