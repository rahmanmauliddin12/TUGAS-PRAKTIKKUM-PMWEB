/* =====================================================
   CarrerGo - app.js
   Data disimpan di localStorage (tanpa backend) sehingga
   fitur login, daftar, CRUD lowongan & lamaran bisa dicoba.
   ===================================================== */
(function () {
  "use strict";

  /* ---------- Ikon (SVG sprite, otomatis disisipkan) ---------- */
  const IN = 'var(--ic-in,#fff)';
  const S = 'fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"';
  const ICONS = {
    briefcase: `<path fill-rule="evenodd" d="M9 4h6a1.5 1.5 0 0 1 1.5 1.5V8H21a2.5 2.5 0 0 1 2.5 2.5v9A2.5 2.5 0 0 1 21 22H3a2.5 2.5 0 0 1-2.500-2.500v-9A2.5 2.5 0 0 1 3 8h4.500V5.500A1.500 1.500 0 0 1 9 4zm.5 2v2h5V6z"/><rect x=".5" y="13.500" width="23" height="1.500" fill="${IN}"/><circle cx="12" cy="14.300" r="2.200" fill="${IN}"/><circle cx="12" cy="14.300" r="1" fill="currentColor"/>`,
    home: `<path d="M12 2 .8 12.200h3.200V22h6v-6.500h4V22h6v-9.800h3.200z"/>`,
    user: `<circle cx="12" cy="7" r="4.500" ${S} stroke-width="1.700"/><path d="M3.500 22.500v-2a6 6 0 0 1 6-6h5a6 6 0 0 1 6 6v2" ${S} stroke-width="1.700"/>`,
    usercircle: `<circle cx="12" cy="12" r="11.500"/><circle cx="12" cy="9.300" r="3.800" fill="${IN}"/><path d="M4.600 19.300a8.600 8.600 0 0 1 14.800 0A11.400 11.400 0 0 1 12 23.500a11.400 11.400 0 0 1-7.400-4.200z" fill="${IN}"/>`,
    search: `<circle cx="10" cy="10" r="7.500" ${S} stroke-width="1.800"/><path d="m15.500 15.500 7 7" ${S} stroke-width="2"/>`,
    bell: `<path d="M12 23a2.700 2.700 0 0 0 2.600-2.100H9.400A2.700 2.700 0 0 0 12 23zm8-6.200v-5.300a8 8 0 0 0-5.500-7.600V3.200a2.500 2.500 0 0 0-5 0v.7A8 8 0 0 0 4 11.500v5.300L1.800 19v1.200h20.400V19z"/>`,
    mail: `<rect x="1.500" y="4" width="21" height="16" rx="1" ${S} stroke-width="1.300"/><path d="M1.500 4 12 13.500 22.500 4M1.500 20l7.800-8M22.500 20l-7.800-8" ${S} stroke-width="1.300"/>`,
    lock: `<path fill-rule="evenodd" d="M6.500 10V7.500a5.500 5.500 0 0 1 11 0V10H19a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V11a1 1 0 0 1 1-1zm2.200 0h6.600V7.500a3.300 3.300 0 0 0-6.600 0z"/><circle cx="12" cy="15.500" r="1.700" fill="${IN}"/><rect x="11.300" y="15.500" width="1.400" height="3.300" fill="${IN}"/>`,
    eye: `<path ${S} stroke-width="1.700" d="M1 12c1.600-4 5.600-7 11-7s9.400 3 11 7c-1.600 4-5.600 7-11 7S2.600 16 1 12z"/><circle cx="12" cy="12" r="3.600" ${S} stroke-width="1.700"/><path d="M3 2.500 21 21.500" ${S} stroke-width="2" style="display:var(--slash,none)"/>`,
    pin: `<path d="M12 1A8 8 0 0 0 4 9c0 6 8 14 8 14s8-8 8-14a8 8 0 0 0-8-8z"/><circle cx="12" cy="9" r="3" fill="${IN}"/>`,
    dollar: `<circle cx="12" cy="12" r="10.200" ${S} stroke-width="1.800"/><path d="M15.700 8.800c-.4-1.400-1.900-2.200-3.700-2.200-2 0-3.500 1-3.500 2.600 0 3.500 7.200 1.600 7.200 5.300 0 1.700-1.600 2.700-3.700 2.700-1.900 0-3.400-.9-3.800-2.300M12 4v16" ${S} stroke-width="1.700"/>`,
    clock: `<circle cx="12" cy="12" r="10.200" ${S} stroke-width="1.800"/><path d="M12 6v6.200l4 2.300" ${S} stroke-width="1.800"/>`,
    file: `<path d="M5 1.500h9l6 6V21a1.500 1.500 0 0 1-1.500 1.500h-13A1.500 1.500 0 0 1 4 21V3A1.500 1.500 0 0 1 5.500 1.500z"/><path d="M14 1.500v6h6" fill="${IN}" opacity=".55"/><rect x="7" y="11" width="10" height="1.500" fill="${IN}"/><rect x="7" y="14.500" width="10" height="1.500" fill="${IN}"/><rect x="7" y="18" width="6" height="1.500" fill="${IN}"/>`,
    award: `<path d="M7.300 14.500 4 23l4.200-2 2.200 2.800 1-6zM16.700 14.500 20 23l-4.200-2-2.200 2.800-1-6z"/><circle cx="12" cy="8.500" r="7.800"/><path d="m12 3.800 1.400 2.900 3.100.4-2.300 2.200.6 3.100-2.800-1.500-2.800 1.500.6-3.100-2.300-2.200 3.100-.4z" fill="${IN}"/>`,
    resume: `<rect x="3" y="1.500" width="18" height="21" rx="2" ${S} stroke-width="1.600"/><circle cx="9" cy="7.500" r="1.800" ${S} stroke-width="1.300"/><path d="M6 12c.4-2 5.600-2 6 0M14 6h4M14 9h4M6 15.500h12M6 18.500h12" ${S} stroke-width="1.300"/>`,
    monitor: `<rect x="1" y="3" width="22" height="14.500" rx="1.800"/><path d="M8.500 21.500h7L14.500 17.500h-5z"/>`,
    store: `<path d="M4 2h16l2.500 6.500c.4 2-1 3.700-3 3.700a3.200 3.200 0 0 1-2.800-1.700 3.200 3.200 0 0 1-5.400 0 3.200 3.200 0 0 1-2.800 1.700c-2 0-3.400-1.700-3-3.700z"/><path d="M3.500 13.500H5V21h14v-7.500h1.500V22.500h-17z"/><rect x="7.500" y="14.500" width="9" height="4" fill="currentColor"/>`,
    design: `<path d="M9.500 2a5 5 0 0 0-2.600 9.300V13h5.200v-1.700A5 5 0 0 0 9.500 2zM7.400 15.500h4.600" ${S} stroke-width="1.500"/><path d="m11.500 22 .8-3.800 8.500-8.500 3 3-8.500 8.500zM2 22h5v-3" ${S} stroke-width="1.500"/>`,
    coin: `<circle cx="12" cy="12" r="11.500"/><circle cx="12" cy="12" r="8.800" fill="none" stroke="${IN}" stroke-width="1.400"/><path d="M14.800 9.200c-.3-1.100-1.400-1.800-2.800-1.800-1.600 0-2.800.8-2.800 2.100 0 2.900 5.900 1.300 5.900 4.400 0 1.400-1.300 2.200-3.100 2.200-1.500 0-2.800-.7-3.100-1.900M12 5.800v12.400" fill="none" stroke="${IN}" stroke-width="1.500" stroke-linecap="round"/>`,
    cap: `<path d="M12 3.500 .8 9l11.200 5.500L21 10v6.500h1.800V9z"/><path d="M5.500 13.500v4c0 1.600 3 3.200 6.500 3.200s6.500-1.600 6.500-3.200v-4L12 16.800z"/>`,
    plus: `<circle cx="12" cy="12" r="11.500"/><path d="M9.800 5h4.400v4.800H19v4.400h-4.800V19H9.800v-4.800H5V9.800h4.800z" fill="${IN}"/>`,
    filter: `<path d="M2 3h20l-7.500 9.200V20l-5 2.200v-10z" ${S} stroke-width="2"/>`,
    chevron: `<path d="m4 8 8 8 8-8" ${S} stroke-width="4"/>`,
    menu: `<path d="M3 6h18M3 12h18M3 18h18" ${S} stroke-width="2.400"/>`,
    logout: `<path d="M9 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4M16 7l5 5-5 5M21 12H9" ${S} stroke-width="2"/>`,
    add: `<path d="M12 4v16M4 12h16" ${S} stroke-width="3"/>`
  };
  const ic = (n, cls) => `<svg class="ic ${cls || ""}" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-${n}"/></svg>`;
  const sprite = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  sprite.setAttribute("style", "display:none");
  sprite.innerHTML = Object.keys(ICONS).map((k) => `<symbol id="i-${k}" viewBox="0 0 24 24">${ICONS[k]}</symbol>`).join("");
  document.body.prepend(sprite);
  // <i data-ic="home"></i>  ->  svg ikon
  document.querySelectorAll("[data-ic]").forEach((el) => {
    el.outerHTML = ic(el.dataset.ic, el.className);
  });

  /* ---------- Helper ---------- */
  const ROOT = document.body.dataset.root || "";
  const U = (p) => ROOT + p;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const rp = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const params = new URLSearchParams(location.search);
  const mem = {};
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return k in mem ? mem[k] : d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { mem[k] = v; } },
    del(k) { try { localStorage.removeItem(k); } catch (e) { delete mem[k]; } }
  };

  function toast(msg) {
    let box = $(".toast-box");
    if (!box) { box = document.createElement("div"); box.className = "toast-box"; document.body.appendChild(box); }
    const t = document.createElement("div"); t.className = "toast"; t.textContent = msg; box.appendChild(t);
    setTimeout(() => t.remove(), 2600);
  }

  function modal(html, onMount) {
    const ov = document.createElement("div");
    ov.className = "overlay open";
    ov.innerHTML = `<div class="modal" role="dialog">${html}</div>`;
    const close = () => { ov.remove(); document.removeEventListener("keydown", esc_); };
    const esc_ = (e) => { if (e.key === "Escape") close(); };
    ov.addEventListener("mousedown", (e) => { if (e.target === ov) close(); });
    ov.addEventListener("click", (e) => { if (e.target.closest("[data-close]")) close(); });
    document.addEventListener("keydown", esc_);
    document.body.appendChild(ov);
    if (onMount) onMount(ov, close);
    const first = $("input,select,textarea", ov); if (first) first.focus();
    return close;
  }

  /* ---------- Data awal ---------- */
  const SEED_JOBS = [
    [1, "Data Analyst", "PT. Nusantara Digital", "Jakarta", 6000000, 8000000, "Full Time", "IT & Software"],
    [2, "UI/UX Designer", "Gigital Kreatif Studi", "Bandung", 5000000, 9000000, "Full Time", "Desain"],
    [3, "Marketing Staff", "PT. Media Kreatif", "Jakarta", 3500000, 5500000, "Full Time", "Marketing"],
    [4, "Frontend Development", "PT. Teknologi Indonesia", "Malang", 4000000, 6000000, "Full Time", "IT & Software"],
    [5, "Backend Developer", "PT. Solusi Data Mandiri", "Surabaya", 6500000, 9500000, "Full Time", "IT & Software"],
    [6, "Akuntan Junior", "PT. Cipta Finansial", "Jakarta", 4500000, 6500000, "Full Time", "Keuangan"],
    [7, "Guru Matematika", "SMA Cendekia Utama", "Malang", 3000000, 4500000, "Part Time", "Pendidikan"],
    [8, "Perawat", "Klinik Sehat Sentosa", "Surabaya", 4000000, 6000000, "Full Time", "Kesehatan"],
    [9, "Content Creator", "Kreasi Media Nusantara", "Bandung", 3000000, 5000000, "Freelance", "Marketing"],
    [10, "Graphic Designer", "Studio Warna Jaya", "Yogyakarta", 3500000, 6000000, "Full Time", "Desain"],
    [11, "Financial Analyst", "PT. Bank Mitra Bangsa", "Jakarta", 7000000, 10000000, "Full Time", "Keuangan"],
    [12, "Mobile Developer", "PT. Aplikasi Karya Bangsa", "Malang", 6000000, 9000000, "Full Time", "IT & Software"],
    [13, "Digital Marketing", "CV. Pemasaran Digital", "Malang", 3500000, 5500000, "Magang", "Marketing"],
    [14, "Dosen Tamu Informatika", "Institut Teknologi Nusantara", "Malang", 2500000, 4000000, "Part Time", "Pendidikan"],
    [15, "Apoteker", "Apotek Sehat Selalu", "Bandung", 5000000, 7000000, "Full Time", "Kesehatan"],
    [16, "QA Engineer", "PT. Teknologi Indonesia", "Jakarta", 5500000, 8000000, "Full Time", "IT & Software"],
    [17, "Staff Administrasi Keuangan", "PT. Cipta Finansial", "Surabaya", 3500000, 5000000, "Magang", "Keuangan"]
  ].map((a) => ({ id: a[0], title: a[1], company: a[2], location: a[3], min: a[4], max: a[5], type: a[6], category: a[7] }));
  const SEED_APPS = [5, 6, 8, 9, 11].map((j, i) => ({ id: i + 1, jobId: j, date: "2026-10-0" + (i + 1), status: i % 2 ? "Diproses" : "Terkirim" }));
  const SEED_USER = { name: "Rahman Mauliddin", email: "rahman@gmail.com", password: "rahman123", status: "Mahasiswa Teknik Informatika", hp: "08123456789", alamat: "Kamu nanyakk", photo: "" };
  const CATS = ["IT & Software", "Marketing", "Desain", "Keuangan", "Pendidikan", "Kesehatan"];
  const CAT_ICON = { "IT & Software": "monitor", "Marketing": "store", "Desain": "design", "Keuangan": "coin", "Pendidikan": "cap", "Kesehatan": "plus" };
  const TYPES = ["Full Time", "Part Time", "Magang", "Freelance"];
  const REKOMENDASI = [1, 2, 4];

  const DB = {
    users() { let u = store.get("cg_users"); if (!u) { u = [SEED_USER]; store.set("cg_users", u); } return u; },
    saveUsers(u) { store.set("cg_users", u); },
    jobs() { let j = store.get("cg_jobs"); if (!j) { j = SEED_JOBS; store.set("cg_jobs", j); } return j; },
    saveJobs(j) { store.set("cg_jobs", j); },
    apps(email) { let a = store.get("cg_apps_" + email); if (!a) { a = email === SEED_USER.email ? SEED_APPS : []; store.set("cg_apps_" + email, a); } return a; },
    saveApps(email, a) { store.set("cg_apps_" + email, a); }
  };
  const session = () => store.get("cg_session");
  const me = () => DB.users().find((u) => u.email === session());

  /* ---------- Guard halaman ---------- */
  if (document.body.dataset.auth === "required" && !me()) { location.replace(U("login.html")); return; }

  /* ---------- Topbar (search, notifikasi, user) ---------- */
  function initTopbar() {
    const user = me(); if (!user) return;
    const chip = $("#userChip");
    if (chip) chip.innerHTML = (user.photo ? `<img src="${user.photo}" alt="">` : ic("usercircle")) + `<span>${esc(user.name.split(" ")[0])}</span>`;
    const q = $("#topSearch");
    if (q) { q.value = params.get("q") || ""; q.addEventListener("keydown", (e) => { if (e.key === "Enter") location.href = U("lowongan/lowongan.html?q=") + encodeURIComponent(q.value.trim()); }); }
    const menus = { bell: $("#menuNotif"), chip: $("#menuUser") };
    const apps = DB.apps(user.email), jobs = DB.jobs();
    if (menus.bell) {
      const items = apps.slice(0, 3).map((a) => { const j = jobs.find((x) => x.id === a.jobId); return j ? `Lamaran <b>${esc(j.title)}</b> berstatus ${esc(a.status)}.` : ""; }).filter(Boolean);
      items.push(`Ada ${jobs.length} lowongan yang cocok untukmu.`);
      menus.bell.innerHTML = items.map((t) => `<div class="notif">${t}</div>`).join("");
    }
    if (menus.chip) menus.chip.innerHTML = `<a href="${U("profile.html")}">${ic("user")} Profil</a><button id="logout">${ic("logout")} Keluar</button>`;
    const toggle = (name) => Object.keys(menus).forEach((k) => menus[k] && menus[k].classList.toggle("open", k === name && !menus[k].classList.contains("open")));
    $("#bellBtn") && $("#bellBtn").addEventListener("click", (e) => { e.stopPropagation(); toggle("bell"); });
    chip && chip.addEventListener("click", (e) => { e.stopPropagation(); toggle("chip"); });
    document.addEventListener("click", () => toggle(null));
    $("#logout") && $("#logout").addEventListener("click", () => { store.del("cg_session"); location.href = U("login.html"); });
  }

  /* ---------- Kartu lowongan ---------- */
  function jobCard(j, applied) {
    return `<div class="job-card" tabindex="0" role="button" data-id="${j.id}">
      <div class="job-head">${ic("briefcase")}<div class="t">${esc(j.title)}<br>${esc(j.company)}</div></div>
      <div class="job-rows">
        <div class="job-row">${ic("pin")}<span>${esc(j.location)}</span></div>
        <div class="job-row">${ic("dollar")}<span>${rp(j.min)} - ${rp(j.max)}</span></div>
        <div class="job-row">${ic("clock")}<span>${esc(j.type)}</span>${applied ? '<em class="applied">Dilamar</em>' : ""}</div>
      </div></div>`;
  }
  function bindCards(root, refresh) {
    const open = (el) => showJob(+el.dataset.id, refresh);
    root.addEventListener("click", (e) => { const c = e.target.closest(".job-card"); if (c) open(c); });
    root.addEventListener("keydown", (e) => { if (e.key === "Enter") { const c = e.target.closest(".job-card"); if (c) open(c); } });
  }

  /* ---------- CRUD Lowongan: detail, edit, hapus, lamar ---------- */
  function showJob(id, refresh) {
    const j = DB.jobs().find((x) => x.id === id); if (!j) return;
    const user = me(), apps = DB.apps(user.email), done = apps.some((a) => a.jobId === id);
    modal(`<h3>${esc(j.title)}</h3><p class="sub">${esc(j.company)}</p>
      <div class="detail-list">
        <div>${ic("pin")}${esc(j.location)}</div>
        <div>${ic("dollar")}Rp ${rp(j.min)} - ${rp(j.max)}</div>
        <div>${ic("clock")}${esc(j.type)}</div>
        <div>${ic("briefcase")}${esc(j.category)}</div></div>
      <div class="m-actions">
        <button class="btn btn-danger" id="jDel">Hapus</button>
        <button class="btn btn-line" id="jEdit">Edit</button>
        <button class="btn ${done ? "btn-grey" : "btn-fill"}" id="jApply" ${done ? "disabled" : ""}>${done ? "Sudah Dilamar" : "Lamar Sekarang"}</button></div>`,
      (ov, close) => {
        $("#jApply", ov).onclick = () => {
          const list = DB.apps(user.email); list.push({ id: Date.now(), jobId: id, date: new Date().toISOString().slice(0, 10), status: "Terkirim" });
          DB.saveApps(user.email, list); close(); toast("Lamaran berhasil dikirim"); refresh && refresh();
        };
        $("#jDel", ov).onclick = () => {
          if (!confirm("Hapus lowongan \"" + j.title + "\"?")) return;
          DB.saveJobs(DB.jobs().filter((x) => x.id !== id));
          DB.saveApps(user.email, DB.apps(user.email).filter((a) => a.jobId !== id));
          close(); toast("Lowongan dihapus"); refresh && refresh();
        };
        $("#jEdit", ov).onclick = () => { location.href = U("lowongan/lowongan-entry.html?id=" + id); };
      });
  }
  function jobForm(j, refresh) {
    const v = j || { title: "", company: "", location: "", min: "", max: "", type: "Full Time", category: CATS[0] };
    const opt = (arr, cur) => arr.map((o) => `<option ${o === cur ? "selected" : ""}>${esc(o)}</option>`).join("");
    modal(`<h3>${j ? "Edit" : "Tambah"} Lowongan</h3>
      <div class="m-field"><label>Posisi</label><input id="fTitle" value="${esc(v.title)}" placeholder="cth: Data Analyst"></div>
      <div class="m-field"><label>Perusahaan</label><input id="fComp" value="${esc(v.company)}" placeholder="cth: PT. Nusantara Digital"></div>
      <div class="m-field"><label>Lokasi</label><input id="fLoc" value="${esc(v.location)}" placeholder="cth: Jakarta"></div>
      <div class="m-row"><div class="m-field"><label>Gaji minimum</label><input id="fMin" type="number" min="0" value="${v.min}" placeholder="6000000"></div>
      <div class="m-field"><label>Gaji maksimum</label><input id="fMax" type="number" min="0" value="${v.max}" placeholder="8000000"></div></div>
      <div class="m-row"><div class="m-field"><label>Jenis</label><select id="fType">${opt(TYPES, v.type)}</select></div>
      <div class="m-field"><label>Kategori</label><select id="fCat">${opt(CATS, v.category)}</select></div></div>
      <p class="form-msg" id="fMsg"></p>
      <div class="m-actions"><button class="btn btn-grey" data-close>Batal</button><button class="btn btn-fill" id="fSave">Simpan</button></div>`,
      (ov, close) => {
        $("#fSave", ov).onclick = () => {
          const d = { title: $("#fTitle", ov).value.trim(), company: $("#fComp", ov).value.trim(), location: $("#fLoc", ov).value.trim(), min: +$("#fMin", ov).value, max: +$("#fMax", ov).value, type: $("#fType", ov).value, category: $("#fCat", ov).value };
          if (!d.title || !d.company || !d.location) return ($("#fMsg", ov).textContent = "Posisi, perusahaan, dan lokasi wajib diisi.");
          if (d.max < d.min) return ($("#fMsg", ov).textContent = "Gaji maksimum harus lebih besar dari minimum.");
          const all = DB.jobs();
          if (j) Object.assign(all.find((x) => x.id === j.id), d); else all.unshift(Object.assign({ id: Date.now() }, d));
          DB.saveJobs(all); close(); toast(j ? "Lowongan diperbarui" : "Lowongan ditambahkan"); refresh && refresh();
        };
      });
  }
  /* Daftar lamaran (Read + Delete) */
  function showApps(refresh) {
    const user = me();
    const draw = (ov) => {
      const jobs = DB.jobs(), apps = DB.apps(user.email);
      $("#appList", ov).innerHTML = apps.length ? apps.map((a) => { const j = jobs.find((x) => x.id === a.jobId); if (!j) return ""; return `<div class="app-item"><div class="info"><b>${esc(j.title)}</b><br>${esc(j.company)} &middot; ${esc(a.date)}</div><span class="status">${esc(a.status)}</span><button class="btn btn-danger" data-del="${a.id}">Batalkan</button></div>`; }).join("") : '<p class="sub">Belum ada lamaran aktif.</p>';
    };
    modal(`<h3>Lamaran Aktif</h3><div id="appList"></div><div class="m-actions"><button class="btn btn-fill" data-close>Tutup</button></div>`, (ov) => {
      draw(ov);
      ov.addEventListener("click", (e) => {
        const b = e.target.closest("[data-del]"); if (!b) return;
        DB.saveApps(user.email, DB.apps(user.email).filter((a) => a.id !== +b.dataset.del));
        draw(ov); toast("Lamaran dibatalkan"); refresh && refresh();
      });
    });
  }

  /* =====================================================
     Controller per halaman
     ===================================================== */
  const pages = {
    /* ----- Landing ----- */
    landing() {
      $("#menuBtn").onclick = () => $(".menu").classList.toggle("open");
      $$('[data-go="top"]').forEach((a) => a.addEventListener("click", (e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }));
      $$('[data-go="fitur"]').forEach((a) => a.addEventListener("click", (e) => { e.preventDefault(); $("#fitur").scrollIntoView({ behavior: "smooth", block: "center" }); }));
      $$('[data-go="tentang"]').forEach((a) => a.addEventListener("click", (e) => {
        e.preventDefault();
        modal(`<h3>Tentang CarrerGo</h3><p class="sub">CarrerGo adalah platform karier yang membantu kamu menemukan peluang kerja terbaik, mengikuti pelatihan, dan mengelola profil kariermu dalam satu tempat.</p><div class="m-actions"><a class="btn btn-line" href="login.html">Login</a><a class="btn btn-fill" href="register.html">Mulai Sekarang</a></div>`);
      }));
      $$(".feat").forEach((f) => f.addEventListener("click", () => (location.href = "register.html")));
    },

    /* ----- Login ----- */
    login() {
      if (params.get("email")) $("#email").value = params.get("email");
      if (params.get("daftar")) $("#formMsg").classList.add("ok"), ($("#formMsg").textContent = "Akun berhasil dibuat. Silakan login.");
      $$(".eye").forEach((b) => b.addEventListener("click", () => { const i = b.previousElementSibling; const show = i.type === "password"; i.type = show ? "text" : "password"; b.classList.toggle("off", show); }));
      $("#loginForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const em = $("#email").value.trim().toLowerCase(), pw = $("#password").value, msg = $("#formMsg");
        msg.classList.remove("ok");
        if (!em || !pw) return (msg.textContent = "Email dan password wajib diisi.");
        const u = DB.users().find((x) => x.email.toLowerCase() === em && x.password === pw);
        if (!u) return (msg.textContent = "Email atau password salah.");
        store.set("cg_session", u.email); location.href = "dashboard.html";
      });
      $("#lupa").addEventListener("click", (e) => {
        e.preventDefault();
        modal(`<h3>Lupa Password</h3><p class="sub">Masukkan email akunmu dan password baru.</p>
          <div class="m-field"><label>Email</label><input id="rEmail" type="email" placeholder="Masukkan Email"></div>
          <div class="m-field"><label>Password baru</label><input id="rPass" type="password" placeholder="Minimal 6 karakter"></div>
          <p class="form-msg" id="rMsg"></p>
          <div class="m-actions"><button class="btn btn-grey" data-close>Batal</button><button class="btn btn-fill" id="rSave">Reset</button></div>`, (ov, close) => {
          $("#rSave", ov).onclick = () => {
            const us = DB.users(), u = us.find((x) => x.email.toLowerCase() === $("#rEmail", ov).value.trim().toLowerCase());
            if (!u) return ($("#rMsg", ov).textContent = "Email tidak terdaftar.");
            if ($("#rPass", ov).value.length < 6) return ($("#rMsg", ov).textContent = "Password minimal 6 karakter.");
            u.password = $("#rPass", ov).value; DB.saveUsers(us); close(); toast("Password berhasil diubah");
          };
        });
      });
    },

    /* ----- Daftar ----- */
    register() {
      $$(".eye").forEach((b) => b.addEventListener("click", () => { const i = b.previousElementSibling; const show = i.type === "password"; i.type = show ? "text" : "password"; b.classList.toggle("off", show); }));
      const bad = (id, text) => { const w = $("#" + id).closest(".input-wrap"); w.classList.add("invalid"); $("#e-" + id).textContent = text; return true; };
      $("#registerForm").addEventListener("submit", (e) => {
        e.preventDefault();
        $$(".input-wrap").forEach((w) => w.classList.remove("invalid")); $$(".err").forEach((x) => (x.textContent = ""));
        const name = $("#nama").value.trim(), em = $("#email").value.trim().toLowerCase(), pw = $("#password").value, cf = $("#confirm").value;
        let err = false;
        if (!name) err = bad("nama", "Nama lengkap wajib diisi.");
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) err = bad("email", "Format email tidak valid.");
        else if (DB.users().some((u) => u.email.toLowerCase() === em)) err = bad("email", "Email sudah terdaftar.");
        if (pw.length < 6) err = bad("password", "Password minimal 6 karakter.");
        if (cf !== pw) err = bad("confirm", "Konfirmasi password tidak sama.");
        if (err) return;
        const us = DB.users(); us.push({ name, email: em, password: pw, status: "Pencari Kerja", hp: "-", alamat: "-", photo: "" }); DB.saveUsers(us);
        location.href = "login.html?daftar=1&email=" + encodeURIComponent(em);
      });
    },

    /* ----- Dashboard ----- */
    dashboard() {
      const user = me(); $("#hello").textContent = "Halo, " + user.name.split(" ")[0] + "!";
      const draw = () => {
        const jobs = DB.jobs(), apps = DB.apps(user.email);
        $("#nJobs").textContent = jobs.length; $("#nApps").textContent = apps.length; $("#nRek").textContent = REKOMENDASI.length;
        $("#newJobs").innerHTML = jobs.slice(0, 2).map((j) => jobCard(j, apps.some((a) => a.jobId === j.id))).join("");
      };
      draw(); bindCards($("#newJobs"), draw);
      $("#cats").innerHTML = CATS.map((c) => `<a class="cat" href="${U("lowongan/lowongan.html?kategori=")}${encodeURIComponent(c)}"><span class="box">${ic(CAT_ICON[c])}</span>${esc(c)}</a>`).join("");
    },

    /* ----- Lowongan Kerja ----- */
    jobs() {
      const user = me(), qIn = $("#jobQ"), sLoc = $("#fLocation"), sCat = $("#fCategory"), sType = $("#fType");
      let adv = { min: 0, sort: "terbaru" };
      qIn.value = params.get("q") || "";
      const fillSel = () => {
        const jobs = DB.jobs(), keep = [sLoc.value, sCat.value, sType.value];
        const opts = (first, arr, cur) => `<option value="">${first}</option>` + arr.map((o) => `<option ${o === cur ? "selected" : ""}>${esc(o)}</option>`).join("");
        sLoc.innerHTML = opts("Semua Lokasi", [...new Set(jobs.map((j) => j.location))].sort(), keep[0]);
        sCat.innerHTML = opts("Semua kategori", CATS, keep[1] || params.get("kategori") || "");
        sType.innerHTML = opts("Semua Jenis", TYPES, keep[2]);
      };
      const draw = () => {
        fillSel();
        const apps = DB.apps(user.email), q = qIn.value.trim().toLowerCase();
        let list = DB.jobs().filter((j) =>
          (!q || (j.title + " " + j.company + " " + j.location).toLowerCase().includes(q)) &&
          (!sLoc.value || j.location === sLoc.value) && (!sCat.value || j.category === sCat.value) && (!sType.value || j.type === sType.value) &&
          j.max >= adv.min && (!params.get("rek") || REKOMENDASI.includes(j.id)));
        if (adv.sort === "gaji") list = list.slice().sort((a, b) => b.max - a.max);
        $("#jobList").innerHTML = list.length ? list.map((j) => jobCard(j, apps.some((a) => a.jobId === j.id))).join("") : '<div class="empty">Tidak ada lowongan yang cocok dengan pencarianmu.</div>';
      };
      draw(); bindCards($("#jobList"), draw);
      $("#btnCari").onclick = draw;
      qIn.addEventListener("keydown", (e) => { if (e.key === "Enter") draw(); });
      [sLoc, sCat, sType].forEach((s) => s.addEventListener("change", draw));
      $("#btnAdd").onclick = () => (location.href = "lowongan-entry.html");
      $("#btnFilter").onclick = () => modal(`<h3>Filter Lanjutan</h3>
        <div class="m-field"><label>Gaji maksimum minimal (Rp)</label><input id="aMin" type="number" min="0" value="${adv.min || ""}" placeholder="cth: 5000000"></div>
        <div class="m-field"><label>Urutkan</label><select id="aSort"><option value="terbaru" ${adv.sort === "terbaru" ? "selected" : ""}>Terbaru</option><option value="gaji" ${adv.sort === "gaji" ? "selected" : ""}>Gaji tertinggi</option></select></div>
        <div class="m-actions"><button class="btn btn-grey" id="aReset">Reset</button><button class="btn btn-fill" id="aOk">Terapkan</button></div>`, (ov, close) => {
        $("#aOk", ov).onclick = () => { adv = { min: +$("#aMin", ov).value || 0, sort: $("#aSort", ov).value }; close(); draw(); };
        $("#aReset", ov).onclick = () => { adv = { min: 0, sort: "terbaru" }; qIn.value = ""; sLoc.value = sCat.value = sType.value = ""; close(); draw(); };
      });
    },


    /* ----- Form entry lowongan (tambah / edit) ----- */
    entry() {
      const id = +params.get("id"), j = id ? DB.jobs().find((x) => x.id === id) : null;
      $("#entryTitle").textContent = j ? "Edit Lowongan" : "Tambah Lowongan";
      const fill = (el, arr, cur) => (el.innerHTML = arr.map((o) => `<option ${o === cur ? "selected" : ""}>${esc(o)}</option>`).join(""));
      fill($("#eType"), TYPES, j && j.type); fill($("#eCat"), CATS, j && j.category);
      if (j) { $("#eTitle").value = j.title; $("#eComp").value = j.company; $("#eLoc").value = j.location; $("#eMin").value = j.min; $("#eMax").value = j.max; }
      $("#entryForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const d = { title: $("#eTitle").value.trim(), company: $("#eComp").value.trim(), location: $("#eLoc").value.trim(), min: +$("#eMin").value, max: +$("#eMax").value, type: $("#eType").value, category: $("#eCat").value }, msg = $("#eMsg");
        if (!d.title || !d.company || !d.location) return (msg.textContent = "Posisi, perusahaan, dan lokasi wajib diisi.");
        if (!d.min || !d.max) return (msg.textContent = "Gaji minimum dan maksimum wajib diisi.");
        if (d.max < d.min) return (msg.textContent = "Gaji maksimum harus lebih besar dari minimum.");
        const all = DB.jobs();
        if (j) Object.assign(all.find((x) => x.id === j.id), d); else all.unshift(Object.assign({ id: Date.now() }, d));
        DB.saveJobs(all); toast(j ? "Lowongan diperbarui" : "Lowongan ditambahkan");
        setTimeout(() => (location.href = "lowongan.html"), 700);
      });
    },

    /* ----- Daftar lamaran ----- */
    lamaran() {
      const user = me();
      const draw = () => {
        const jobs = DB.jobs(), apps = DB.apps(user.email);
        const rows = apps.map((a) => {
          const j = jobs.find((x) => x.id === a.jobId); if (!j) return "";
          return `<div class="job-card app-card" data-job="${j.id}" data-app="${a.id}">
            <div class="job-head">${ic("briefcase")}<div class="t">${esc(j.title)}<br>${esc(j.company)}</div></div>
            <div class="job-rows">
              <div class="job-row">${ic("pin")}<span>${esc(j.location)}</span></div>
              <div class="job-row">${ic("dollar")}<span>${rp(j.min)} - ${rp(j.max)}</span></div>
              <div class="job-row">${ic("clock")}<span>${esc(a.status)} &middot; ${esc(a.date)}</span></div>
            </div>
            <div class="foot"><button class="btn btn-line" data-act="detail">Detail</button><button class="btn btn-danger" data-act="del">Batalkan</button></div></div>`;
        }).join("");
        $("#appCards").innerHTML = rows || '<div class="empty">Belum ada lamaran. Lamar lowongan di menu Lowongan Kerja.</div>';
      };
      draw();
      $("#appCards").addEventListener("click", (e) => {
        const b = e.target.closest("[data-act]"); if (!b) return;
        const c = b.closest(".app-card");
        if (b.dataset.act === "detail") showJob(+c.dataset.job, draw);
        else if (confirm("Batalkan lamaran ini?")) { DB.saveApps(user.email, DB.apps(user.email).filter((a) => a.id !== +c.dataset.app)); draw(); toast("Lamaran dibatalkan"); }
      });
    },

    /* ----- Profil ----- */
    profile() {
      const draw = () => {
        const u = me(), img = u.photo || "assets/avatar.png";
        $("#pName").textContent = u.name; $("#pStatus").textContent = u.status; $("#pMail").textContent = u.email;
        $("#dName").textContent = u.name; $("#dMail").textContent = u.email; $("#dHp").textContent = u.hp; $("#dAddr").textContent = u.alamat;
        $("#avBig").src = img; $("#avSmall").src = img; initTopbar();
      };
      draw();
      $("#btnEdit").onclick = () => { const u = me(); modal(`<h3>Edit Profil</h3>
        <div class="m-field"><label>Nama Lengkap</label><input id="eName" value="${esc(u.name)}"></div>
        <div class="m-field"><label>Status / Jurusan</label><input id="eStatus" value="${esc(u.status)}"></div>
        <div class="m-field"><label>Email</label><input id="eMail" type="email" value="${esc(u.email)}"></div>
        <div class="m-field"><label>No. HP</label><input id="eHp" value="${esc(u.hp)}"></div>
        <div class="m-field"><label>Alamat</label><textarea id="eAddr">${esc(u.alamat)}</textarea></div>
        <p class="form-msg" id="eMsg"></p>
        <div class="m-actions"><button class="btn btn-grey" data-close>Batal</button><button class="btn btn-fill" id="eSave">Simpan</button></div>`, (ov, close) => {
        $("#eSave", ov).onclick = () => {
          const us = DB.users(), cur = us.find((x) => x.email === u.email), em = $("#eMail", ov).value.trim();
          if (!$("#eName", ov).value.trim()) return ($("#eMsg", ov).textContent = "Nama tidak boleh kosong.");
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) return ($("#eMsg", ov).textContent = "Format email tidak valid.");
          if (em !== u.email && us.some((x) => x.email === em)) return ($("#eMsg", ov).textContent = "Email sudah dipakai akun lain.");
          if (em !== u.email) { store.set("cg_apps_" + em, DB.apps(u.email)); store.set("cg_session", em); }
          Object.assign(cur, { name: $("#eName", ov).value.trim(), status: $("#eStatus", ov).value.trim(), email: em, hp: $("#eHp", ov).value.trim(), alamat: $("#eAddr", ov).value.trim() });
          DB.saveUsers(us); close(); draw(); toast("Profil berhasil diperbarui");
        };
      }); };
      const file = $("#photoFile");
      $("#btnPhoto").onclick = () => file.click();
      file.addEventListener("change", () => {
        const f = file.files[0]; if (!f) return;
        if (!f.type.startsWith("image/")) return toast("File harus berupa gambar");
        const r = new FileReader();
        r.onload = () => {
          const im = new Image();
          im.onload = () => {
            const c = document.createElement("canvas"), n = 300, s = Math.min(im.width, im.height); c.width = c.height = n;
            c.getContext("2d").drawImage(im, (im.width - s) / 2, (im.height - s) / 2, s, s, 0, 0, n, n);
            const us = DB.users(); us.find((x) => x.email === session()).photo = c.toDataURL("image/jpeg", 0.85); DB.saveUsers(us); draw(); toast("Foto profil diperbarui");
          };
          im.src = r.result;
        };
        r.readAsDataURL(f);
      });
    }
  };

  const page = document.body.dataset.page;
  if (page !== "landing" && page !== "login" && page !== "register" && page !== "profile") initTopbar();
  if (pages[page]) pages[page]();
})();
