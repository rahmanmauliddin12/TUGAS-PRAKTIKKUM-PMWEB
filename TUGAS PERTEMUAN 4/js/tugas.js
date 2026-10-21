(function () {
  "use strict";

  const style = document.createElement("style");
  style.textContent = `
    .tg-toast {
      position: fixed; bottom: 24px; left: 50%;
      transform: translateX(-50%);
      background: #333; color: #fff;
      padding: 12px 20px; border-radius: 8px;
      font-size: 14px; z-index: 9999;
      box-shadow: 0 4px 12px rgba(0,0,0,.25);
      opacity: 0; transition: opacity .3s;
      max-width: 90vw; text-align: center;
    }
    .tg-toast.show { opacity: 1; }

    .tg-extra { margin: 10px 0 0 1.1rem; display: flex; flex-wrap: wrap; align-items: center; gap: 12px; }
    .tg-extra .tg-sapaan { margin: 0 !important; font-size: 16px !important; color: #1f48ff; font-weight: 700; }
    .tg-extra .tg-btn {
      border: 2px solid #1f48ff; background: #fff; color: #1f48ff;
      padding: 6px 14px; border-radius: 20px; font-size: 13px;
      font-weight: 600; cursor: pointer; transition: .2s;
    }
    .tg-extra .tg-btn:hover { background: #1f48ff; color: #fff; }

    .tg-quote {
      position: fixed; right: 20px; bottom: 20px; z-index: 50;
      width: 300px; max-width: calc(100vw - 40px);
      background: #fff; border-left: 5px solid #1f48ff; border-radius: 10px;
      padding: 14px 16px; box-shadow: 0 6px 20px rgba(4,21,122,.18);
      font-size: 13px; line-height: 1.5; color: #1a2038;
    }
    .tg-quote h4 { margin: 0 0 6px; font-size: 13px; color: #04157a; }
    .tg-quote .tg-q-text { margin: 0; font-style: italic; }
    .tg-quote .tg-q-by { margin: 4px 0 8px; color: #777; font-size: 12px; }
    .tg-quote .tg-btn {
      border: 0; background: #1f48ff; color: #fff; padding: 5px 12px;
      border-radius: 14px; font-size: 12px; cursor: pointer;
    }
    .tg-quote .tg-btn:disabled { opacity: .6; cursor: wait; }

    .tg-hint { font-size: 13px; margin: 4px 0 0; min-height: 14px; }
    .tg-hint.ok { color: #2e7d32; }
    .tg-hint.bad { color: #e53935; }
    .tg-focus { outline: 2px solid #1f48ff; outline-offset: 2px; border-radius: 8px; }
  `;
  document.head.append(style);

  function showToast(pesan) {
    const toast = document.createElement("div");   // DOM: membuat elemen baru
    toast.className = "tg-toast";
    toast.textContent = pesan;
    document.body.append(toast);                   // DOM: menambah ke halaman
    setTimeout(() => toast.classList.add("show"), 10);
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  const simpan = {
    ambil(key, awal) {
      try { return localStorage.getItem(key) ?? awal; } catch (e) { return awal; }
    },
    taruh(key, nilai) {
      try { localStorage.setItem(key, nilai); } catch (e) { /* abaikan */ }
    }
  };

  function delay(ms) {
    return new Promise(function (resolve) {
      setTimeout(resolve, ms);
    });
  }

  function landing() {

    document.getElementById("subJudul").innerHTML = "Raih Karier Impianmu";

    const fitur = document.querySelectorAll(".feat");
    fitur.forEach(function (f) {
      f.addEventListener("mouseenter", function () {
        f.style.backgroundColor = "#eaf2f8";
      });
      f.addEventListener("mouseleave", function () {
        f.style.backgroundColor = "";
      });
    });

    const catatan = document.createElement("p");
    catatan.textContent = "Ribuan lowongan baru setiap hari!";
    catatan.style.fontWeight = "600";
    document.getElementById("deskripsi").after(catatan);

    fitur.forEach(function (f, i) {
      f.setAttribute("title", "Fitur ke-" + (i + 1));
    });

    const extra = document.createElement("div");
    extra.className = "tg-extra";
    extra.innerHTML =
      '<p class="tg-sapaan" id="tgSapaan"></p>' +
      '<button type="button" class="tg-btn" id="tgNama">Ubah Nama Sapaan</button>';
    catatan.after(extra);

    const sapaan = document.getElementById("tgSapaan");

    function tampilSapaan() {
      const nama = simpan.ambil("tg_nama", "");
      sapaan.textContent = nama ? "Halo, " + nama + "!" : "";
    }
    tampilSapaan();

    const kunjungan = Number(simpan.ambil("tg_kunjungan", 0)) + 1;
    simpan.taruh("tg_kunjungan", kunjungan);

    const namaTersimpan = simpan.ambil("tg_nama", "");
    showToast(
      namaTersimpan
        ? "Selamat datang kembali, " + namaTersimpan + "! (kunjungan ke-" + kunjungan + ")"
        : "Selamat datang di CarrerGo! (kunjungan ke-" + kunjungan + ")"
    );

    document.getElementById("tgNama").addEventListener("click", function () {
      const input = prompt("Silakan masukkan namamu:", simpan.ambil("tg_nama", ""));

      if (input === null) return;

      if (input.trim() === "") {
        alert("Nama tidak boleh kosong!");
        return;
      }
      simpan.taruh("tg_nama", input.trim());
      tampilSapaan();
      showToast("Nama sapaan disimpan: " + input.trim());
    });

    fitur.forEach(function (f) {
      f.addEventListener("click", function () {
        const namaFitur = f.textContent.trim().replace(/\s+/g, " ");
        // confirm() mengembalikan true (OK) atau false (Cancel)
        const lanjut = confirm(namaFitur + "\n\nIngin daftar sekarang untuk memakai fitur ini?");
        if (lanjut) {
          location.href = "register.html";
        } else {
          showToast("Oke, silakan jelajahi dulu.");
        }
      });
    });

    document.querySelector(".brand").addEventListener("dblclick", function (e) {
      e.preventDefault();
      alert("CarrerGo v1.0\nTugas Praktikum Pemrograman Web - BAB 4 JavaScript II");
    });

    document.addEventListener("keydown", function (e) {
      if (e.ctrlKey || e.altKey || e.metaKey) return;         
      const tag = (e.target.tagName || "").toLowerCase();
      if (tag === "input" || tag === "textarea") return;      
      if (e.key.toLowerCase() === "l") location.href = "login.html";
      if (e.key.toLowerCase() === "d") location.href = "register.html";
    });

    document.querySelector(".hero-img").addEventListener("contextmenu", function () {
      showToast("Ilustrasi ini milik CarrerGo.");
    });

    window.addEventListener("offline", function () { showToast("Kamu sedang offline."); });
    window.addEventListener("online", function () { showToast("Kamu kembali online."); });

    buatKartuKutipan();
  }


  const KUTIPAN_CADANGAN = [
    { quote: "Kesempatan datang pada mereka yang siap.", author: "CarrerGo" },
    { quote: "Mulai dari mana kamu berada, pakai apa yang kamu punya.", author: "Arthur Ashe" },
    { quote: "Karier terbaik dibangun dari langkah kecil yang konsisten.", author: "CarrerGo" }
  ];


  async function ambilKutipan() {  
    const pembatal = new AbortController();
    const timer = setTimeout(() => pembatal.abort(), 5000);

    try {
      const [respon] = await Promise.all([
        fetch("https://dummyjson.com/quotes/random", { signal: pembatal.signal }), 
        delay(500)
      ]);

      if (!respon.ok) throw new Error("Respon server: " + respon.status);
      return await respon.json();               
    } catch (err) {
      console.warn("Fetch gagal, memakai kutipan cadangan:", err.message);
      return KUTIPAN_CADANGAN[Math.floor(Math.random() * KUTIPAN_CADANGAN.length)];
    } finally {
      clearTimeout(timer);                       
    }
  }

  function buatKartuKutipan() {
    const kartu = document.createElement("aside");
    kartu.className = "tg-quote";
    kartu.innerHTML =
      "<h4>Kutipan Karier</h4>" +
      '<p class="tg-q-text" id="tgQ">Memuat...</p>' +
      '<p class="tg-q-by" id="tgBy"></p>' +
      '<button type="button" class="tg-btn" id="tgQBtn">Kutipan Lain</button>';
    document.body.append(kartu);

    const teks = kartu.querySelector("#tgQ");
    const oleh = kartu.querySelector("#tgBy");
    const tombol = kartu.querySelector("#tgQBtn");

    async function muat() {
      tombol.disabled = true;
      teks.textContent = "Memuat...";
      oleh.textContent = "";

      const data = await ambilKutipan();        
      teks.textContent = "\u201C" + data.quote + "\u201D";
      oleh.textContent = "- " + data.author;
      tombol.disabled = false;
    }

    tombol.addEventListener("click", muat);      
    muat();                                     
  }
  function login() {
    const email = document.getElementById("email");
    const pass = document.getElementById("password");

    if (!email.value) email.value = simpan.ambil("tg_email", "");

    email.addEventListener("change", function () {
      simpan.taruh("tg_email", email.value.trim());
    });

    const hint = document.createElement("p");
    hint.className = "tg-hint";
    email.closest(".field").append(hint);

    email.addEventListener("input", function () {
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
      if (email.value.trim() === "") {
        hint.textContent = "";
        hint.className = "tg-hint";
      } else if (valid) {
        hint.textContent = "Format email sudah benar";
        hint.className = "tg-hint ok";
      } else {
        hint.textContent = "Format email belum benar";
        hint.className = "tg-hint bad";
      }
    });

    [email, pass].forEach(function (el) {
      el.addEventListener("focus", function () { el.closest(".input-wrap").classList.add("tg-focus"); });
      el.addEventListener("blur", function () { el.closest(".input-wrap").classList.remove("tg-focus"); });
    });

    const capsHint = document.createElement("p");
    capsHint.className = "tg-hint bad";
    pass.closest(".field").append(capsHint);

    function cekCaps(e) {
      capsHint.textContent = e.getModifierState && e.getModifierState("CapsLock")
        ? "Caps Lock sedang aktif" : "";
    }
    pass.addEventListener("keydown", cekCaps);
    pass.addEventListener("keyup", cekCaps);
    pass.addEventListener("blur", function () { capsHint.textContent = ""; });
  }
  const halaman = document.body.dataset.page;
  if (halaman === "landing") landing();
  if (halaman === "login") login();
})();