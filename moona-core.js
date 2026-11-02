// ============================================================
// MOONA CORE — dipakai semua halaman
// 1) URL backend (Apps Script) cukup diganti DI SINI saja kalau deployment baru.
// 2) Cek akses modul + sembunyikan menu sidebar yang tidak boleh dibuka.
// 3) Akses disegarkan dari server tiap halaman dibuka → perubahan di
//    User Management langsung berlaku tanpa login ulang.
// ============================================================
var MOONA_API = 'https://script.google.com/macros/s/AKfycbx8-PT1ZpbuCfSLoso8gF2JDpuN7nKI1zU1K-7AA4sBVZhrRyU_w_rN6KjBuQoKtGQQkw/exec';

// Daftar modul. levels:true = modul ini sudah mendukung mode "Lihat saja".
var MOONA_MODULES = [
  { key: 'dashboard',      nama: 'Dashboard',          grup: 'Utama',       file: 'moona-v2-dashboard.html' },
  { key: 'crm',            nama: 'CRM & Sales',        grup: 'Penjualan',   file: 'moona-v2-crm.html', levels: true },
  { key: 'client-portal',  nama: 'Client Portal',      grup: 'Penjualan',   file: 'moona-v2-client-portal.html' },
  { key: 'content',        nama: 'Content Planner',    grup: 'Penjualan',   file: 'moona-v2-content.html' },
  { key: 'projects',       nama: 'Project Management', grup: 'Operasional', file: 'moona-v2-projects.html' },
  { key: 'laporan-design', nama: 'Laporan Design',     grup: 'Operasional', file: 'moona-v2-laporan-design-v4.html' },
  { key: 'laporan-build',  nama: 'Laporan Build',      grup: 'Operasional', file: 'moona-v2-laporan-build-v4.html' },
  { key: 'aset',           nama: 'Aset',               grup: 'Operasional', file: 'moona-v2-assets.html', levels: true },
  { key: 'finance',        nama: 'Finance',            grup: 'Keuangan',    file: 'moona-v2-finance.html' },
  { key: 'meetings',       nama: 'Meeting Tracker',    grup: 'Tim',         file: 'moona-v2-meetings.html' },
  { key: 'playbook',       nama: 'Playbook',           grup: 'Tim',         file: 'moona-v2-playbook.html' },
  { key: 'sop',            nama: 'SOP & Dokumen',      grup: 'Tim',         file: 'moona-v2-sop.html' },
  { key: 'activity',       nama: 'Log Aktivitas',      grup: 'Admin',       file: 'moona-v2-activity.html' },
  { key: 'usermgmt',       nama: 'User Management',    grup: 'Admin',       file: 'moona-v2-usermgmt.html' }
];
// Urutan & judul kelompok menu
var MOONA_GROUPS = [
  { key: 'Utama',       label: '' },
  { key: 'Penjualan',   label: 'Penjualan' },
  { key: 'Operasional', label: 'Operasional' },
  { key: 'Keuangan',    label: 'Keuangan' },
  { key: 'Tim',         label: 'Tim & dokumen' },
  { key: 'Admin',       label: 'Admin' }
];

// Cadangan HANYA kalau server belum pernah mengirim data akses (mis. sesi lama).
var MOONA_FALLBACK_ACCESS = {
  Owner:              ['dashboard','crm','client-portal','projects','laporan-design','laporan-build','aset','meetings','finance','content','playbook','sop','activity','usermgmt'],
  OperasionalManager: ['dashboard','crm','client-portal','projects','laporan-design','laporan-build','aset','meetings','finance','playbook','sop','activity'],
  StudioHead:         ['dashboard','client-portal','projects','laporan-design','laporan-build','aset','meetings','playbook','sop'],
  Designer:           ['dashboard','laporan-design','laporan-build','meetings','playbook','sop'],
  Estimator:          ['dashboard','projects','laporan-design','laporan-build','meetings','playbook','sop'],
  SiteEngineer:       ['dashboard','laporan-design','laporan-build','aset','meetings','playbook','sop'],
  Sales:              ['dashboard','crm','client-portal','projects','meetings','playbook','sop'],
  Marketing:          ['dashboard','crm','client-portal','content','meetings','playbook','sop'],
  Finance:            ['dashboard','client-portal','aset','finance','meetings','playbook','sop']
};

// ── TANGGAL ──
// Ubah nilai tanggal apa pun (Date, "2026-09-25", "25/9/2026", "Thu Sep 25 2026 00:00:00 GMT+0700")
// jadi "YYYY-MM-DD" menurut jam lokal (WIB). Dipakai untuk <input type="date">.
// Jangan pakai toISOString() untuk ini: hasilnya UTC, jadi di WIB tanggalnya mundur 1 hari.
function moonaISODate(v) {
  if (v === null || v === undefined || v === '') return '';
  var d;
  if (v instanceof Date) d = v;
  else {
    var s = String(v).trim();
    var m = s.match(/^(\d{4})-(\d{2})-(\d{2})/); if (m) return m[1] + '-' + m[2] + '-' + m[3];
    m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/); if (m) return m[3] + '-' + ('0' + m[2]).slice(-2) + '-' + ('0' + m[1]).slice(-2);
    d = new Date(s);
  }
  if (isNaN(d)) return '';
  return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
}
function moonaToday() { return moonaISODate(new Date()); }
// Baca tanggal dari format apa pun yang ada di database → Date (jam lokal), atau null.
// "2026-09-25" · "2026-09-25T10:00:00Z" · "25/9/2026, 14.30.00" · "Thu Sep 25 2026 ... GMT+0700"
function moonaParseDate(v) {
  if (v === null || v === undefined || v === '') return null;
  if (v instanceof Date) return isNaN(v) ? null : v;
  var s = String(v).trim(), m, d;
  m = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (m) return new Date(+m[1], +m[2] - 1, +m[3]);
  m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})(?:[,\s]+(\d{1,2})[\.:](\d{2}))?/);
  if (m) return new Date(+m[3], +m[2] - 1, +m[1], m[4] ? +m[4] : 0, m[5] ? +m[5] : 0);
  d = new Date(s);
  return isNaN(d) ? null : d;
}
// "25 Sep 2026, 14.30"
function moonaFmtDateTime(v) {
  var d = moonaParseDate(v); if (!d) return v ? String(v) : '';
  return d.toLocaleString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}
// Tampilan tanggal ringkas: "25 Sep 2026"
function moonaFmtDate(v) {
  var d = moonaParseDate(v); if (!d) return v ? String(v) : '';
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

function moonaSession() { try { return JSON.parse(localStorage.getItem('moona_v2_session')); } catch (e) { return null; } }
function moonaAccess() {
  var acc = null; try { acc = JSON.parse(localStorage.getItem('moona_v2_access')); } catch (e) {}
  if (acc && acc.modules) return acc;
  var s = moonaSession();
  var mods = (s && MOONA_FALLBACK_ACCESS[s.role]) || [];
  return { modules: mods, levels: {}, default: mods.length ? moonaFileOf(mods[0]) : 'moona-v2-dashboard.html' };
}
function moonaFileOf(key) { for (var i = 0; i < MOONA_MODULES.length; i++) if (MOONA_MODULES[i].key === key) return MOONA_MODULES[i].file; return 'moona-v2-dashboard.html'; }
function moonaKeyOf(file) { for (var i = 0; i < MOONA_MODULES.length; i++) if (MOONA_MODULES[i].file === file) return MOONA_MODULES[i].key; return ''; }
function moonaHas(key) { return moonaAccess().modules.indexOf(key) >= 0; }
// 'manage' | 'view' | 'none'
function moonaLevel(key) { var a = moonaAccess(); if (a.modules.indexOf(key) < 0) return 'none'; return (a.levels && a.levels[key]) || 'manage'; }
function moonaCanManage(key) { return moonaLevel(key) === 'manage'; }

function moonaDenied(s, defFile) {
  document.body.innerHTML = '<div style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:#F3F6FA;font-family:\'Plus Jakarta Sans\',Inter,system-ui,sans-serif;padding:20px">'
    + '<div style="max-width:440px;width:100%;background:#fff;border:1px solid #E2E8F1;border-radius:16px;padding:36px 32px;text-align:center;box-shadow:0 22px 56px -16px rgba(10,29,58,.18)">'
    + '<div style="width:52px;height:52px;border-radius:14px;background:#EEF3FB;color:#406EB6;display:flex;align-items:center;justify-content:center;margin:0 auto 16px"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4.5" y="10.5" width="15" height="10" rx="2"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/></svg></div>'
    + '<div style="font-size:19px;font-weight:700;color:#13223A;margin-bottom:6px;letter-spacing:-.01em">Modul ini belum dibuka untukmu</div>'
    + '<div style="font-size:14px;color:#4D5C74;line-height:1.55;margin-bottom:22px">Akun <strong>' + moonaEsc(s.jobTitle || s.role) + '</strong> belum punya akses ke halaman ini. Minta admin membukanya di User Management.</div>'
    + '<div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap">'
    + '<a href="' + defFile + '" style="display:inline-flex;align-items:center;min-height:38px;padding:0 18px;background:#406EB6;color:#fff;text-decoration:none;border-radius:8px;font-size:13.5px;font-weight:600">Buka modul utama saya</a>'
    + '<button onclick="moonaLogout()" style="min-height:38px;padding:0 18px;background:#fff;color:#4D5C74;border:1px solid #CCD5E3;border-radius:8px;font-size:13.5px;font-weight:600;cursor:pointer;font-family:inherit">Keluar</button>'
    + '</div><div style="font-size:12px;color:#7F8DA3;margin-top:18px">Masuk sebagai ' + moonaEsc(s.nama) + '</div></div></div>';
}

// ── IKON (garis 24×24, stroke mengikuti warna teks) ──
var MOONA_ICONS = {
  'dashboard':'<rect x="3.5" y="3.5" width="7" height="7" rx="1.6"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.6"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.6"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.6"/>',
  'crm':'<path d="M3.5 5h17l-6.5 7.6v5.2l-4 2.2v-7.4L3.5 5z"/>',
  'client-portal':'<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.4 2.5 3.6 5.3 3.6 8.5s-1.2 6-3.6 8.5c-2.4-2.5-3.6-5.3-3.6-8.5S9.6 6 12 3.5z"/>',
  'content':'<rect x="3.5" y="4.5" width="17" height="15" rx="2"/><circle cx="9" cy="10" r="1.7"/><path d="M20.5 15.5l-4.8-4.8-8.7 8.8"/>',
  'projects':'<rect x="3.5" y="7" width="17" height="12.5" rx="2"/><path d="M8.5 7V5.5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2V7M3.5 12.5h17"/>',
  'laporan-design':'<path d="M4.5 19.5l1-4.2L15.8 5a2.1 2.1 0 0 1 3 3L8.6 18.4l-4.1 1.1z"/><path d="M13.8 7l3 3"/>',
  'laporan-build':'<path d="M3 18.5h18"/><path d="M5 18.5v-3a7 7 0 0 1 14 0v3"/><path d="M10 8.9V6h4v2.9"/><path d="M12 9v5"/>',
  'aset':'<path d="M20.5 7.8L12 3.5 3.5 7.8 12 12.1l8.5-4.3z"/><path d="M3.5 7.8v8.4L12 20.5l8.5-4.3V7.8"/><path d="M12 12.1v8.4"/>',
  'finance':'<path d="M4 7.5V6a2 2 0 0 1 2-2h11.5v3.5"/><rect x="3.5" y="7.5" width="17" height="12.5" rx="2"/><path d="M16 13.8h2"/>',
  'meetings':'<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M16 3v4M8 3v4M3.5 10h17"/><path d="M9 15l2 2 4-4"/>',
  'playbook':'<path d="M9 4.5l-5.5 2v13l5.5-2 6 2 5.5-2v-13l-5.5 2-6-2z"/><path d="M9 4.5v13M15 6.5v13"/>',
  'sop':'<path d="M14 3.5H7a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-10l-5-5z"/><path d="M14 3.5v5h5M8.5 13h7M8.5 16.5h5"/>',
  'activity':'<path d="M3 12h4l2.7-7 4.6 14 2.7-7h4"/>',
  'usermgmt':'<circle cx="9" cy="8.5" r="3.4"/><path d="M3 19.5a6 6 0 0 1 12 0"/><path d="M15.5 5.3a3.4 3.4 0 0 1 0 6.4M21 19.5a6 6 0 0 0-3.6-5.5"/>',
  'logout':'<path d="M9.5 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h3.5"/><path d="M15.5 16.5L20 12l-4.5-4.5M20 12H9"/>',
  'menu':'<path d="M4 7h16M4 12h16M4 17h16"/>'
};
function moonaIcon(name) {
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (MOONA_ICONS[name] || '') + '</svg>';
}
function moonaEsc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function moonaInitials(nama) {
  var w = String(nama || '').trim().split(/\s+/).filter(Boolean);
  if (!w.length) return '?';
  return ((w[0][0] || '') + (w.length > 1 ? w[w.length - 1][0] : (w[0][1] || ''))).toUpperCase();
}
function moonaLogout() {
  localStorage.removeItem('moona_v2_session'); localStorage.removeItem('moona_v2_access');
  location.href = 'moona-v2-login.html';
}

// Bangun ulang panel navigasi kiri (sama di semua modul) + bilah atas HP.
function moonaBuildShell(cur) {
  var sb = document.querySelector('.sidebar');
  if (!sb || sb.classList.contains('mx-ready')) return;
  var s = moonaSession() || {}, acc = moonaAccess();
  var logo = 'moona-logo.svg';  // logo utuh: huruf m + bulan
  var home = acc.default || 'moona-v2-dashboard.html';
  var curMod = null;
  var h = '<div class="mx-brand"><a class="mx-brand-link" href="' + home + '" aria-label="Moona Hub — halaman utama"><img class="mx-logo" src="' + logo + '" alt="Moona"><span class="mx-brand-name">Hub</span></a></div>';
  h += '<nav class="mx-nav" aria-label="Menu utama">';
  MOONA_GROUPS.forEach(function (g) {
    var mods = MOONA_MODULES.filter(function (m) { return m.grup === g.key && acc.modules.indexOf(m.key) >= 0; });
    if (!mods.length) return;
    h += '<div class="mx-group">' + (g.label ? '<div class="mx-group-label">' + g.label + '</div>' : '');
    mods.forEach(function (m) {
      var on = m.key === cur; if (on) curMod = m;
      h += '<a class="mx-item' + (on ? ' active' : '') + '" href="' + m.file + '"' + (on ? ' aria-current="page"' : '') + '>'
        + moonaIcon(m.key) + '<span>' + moonaEsc(m.nama) + '</span>'
        + (m.key === 'crm' ? '<span class="mx-badge" id="nav-badge"></span>' : '') + '</a>';
    });
    h += '</div>';
  });
  h += '</nav>';
  h += '<div class="mx-user"><div class="mx-avatar" aria-hidden="true">' + moonaEsc(moonaInitials(s.nama)) + '</div>'
    + '<div class="mx-user-meta"><div class="mx-user-name">' + moonaEsc(s.nama || '') + '</div><div class="mx-user-role">' + moonaEsc(s.jobTitle || s.role || '') + '</div></div>'
    + '<button class="mx-logout" type="button" onclick="moonaLogout()" title="Keluar" aria-label="Keluar">' + moonaIcon('logout') + '</button>'
    + '<span id="sf-name" hidden></span></div>';
  sb.innerHTML = h;
  sb.id = sb.id || 'mx-sidebar';
  sb.classList.add('mx-ready');
  document.body.classList.add('mx-app', 'mx-mod-' + cur);

  // Bilah atas + laci untuk layar kecil
  var tb = document.createElement('header');
  tb.className = 'mx-topbar';
  tb.innerHTML = '<button class="mx-burger" type="button" aria-label="Buka menu" aria-controls="' + sb.id + '" aria-expanded="false">' + moonaIcon('menu') + '</button>'
    + '<img class="mx-logo" src="' + logo + '" alt="Moona"><span class="mx-topbar-title">' + moonaEsc(curMod ? curMod.nama : '') + '</span>';
  document.body.insertBefore(tb, document.body.firstChild);
  var scrim = document.createElement('div'); scrim.className = 'mx-scrim'; document.body.appendChild(scrim);
  var burger = tb.querySelector('.mx-burger');
  function setOpen(open) {
    document.body.classList.toggle('mx-nav-open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) { var a = sb.querySelector('.mx-item.active') || sb.querySelector('.mx-item'); if (a) a.focus(); }
  }
  burger.addEventListener('click', function () { setOpen(!document.body.classList.contains('mx-nav-open')); });
  scrim.addEventListener('click', function () { setOpen(false); burger.focus(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && document.body.classList.contains('mx-nav-open')) { setOpen(false); burger.focus(); } });
}

// Dipanggil di awal tiap modul: if (!moonaRequireAccess('crm')) throw ...
function moonaRequireAccess(currentModule) {
  var s = moonaSession();
  if (!s) { location.href = 'moona-v2-login.html'; return false; }
  window.__moonaModule = currentModule;
  moonaRefreshAccess();
  var acc = moonaAccess();
  if (acc.modules.indexOf(currentModule) >= 0) {
    try { moonaBuildShell(currentModule); } catch (e) { var sb0 = document.querySelector('.sidebar'); if (sb0) sb0.classList.add('mx-ready'); }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', moonaApplyNav);
    else moonaApplyNav();
    return true;
  }
  moonaDenied(s, acc.default || 'moona-v2-dashboard.html');
  return false;
}

// Sembunyikan menu sidebar & kartu dashboard untuk modul yang tidak dibuka.
function moonaApplyNav() {
  var acc = moonaAccess();
  // Panel lama (kalau shell gagal dibangun): sembunyikan menu yang tertutup
  var items = document.querySelectorAll('.sidebar .nav-item');
  for (var i = 0; i < items.length; i++) {
    var m = String(items[i].getAttribute('onclick') || '').match(/go\('([^']+)'\)/);
    var key = m ? moonaKeyOf(m[1]) : '';
    if (key) items[i].style.display = acc.modules.indexOf(key) >= 0 ? '' : 'none';
  }
  // Kartu modul di dashboard: sembunyikan yang tertutup, ganti singkatan dengan ikon
  var cards = document.querySelectorAll('a.mod-card[href]');
  for (var c = 0; c < cards.length; c++) {
    var k = moonaKeyOf(cards[c].getAttribute('href'));
    if (!k) continue;
    cards[c].style.display = acc.modules.indexOf(k) >= 0 ? '' : 'none';
    var ic = cards[c].querySelector('.mod-icon');
    if (ic && !ic.querySelector('svg')) ic.innerHTML = moonaIcon(k);
  }
}

// Ambil akses terbaru dari server (di belakang layar).
function moonaRefreshAccess() {
  if (window.__moonaRefreshing) return; window.__moonaRefreshing = true;
  var s = moonaSession(); if (!s || !s.id) return;
  var before = localStorage.getItem('moona_v2_access') || '';
  fetch(MOONA_API + '?action=getMyAccess&id=' + encodeURIComponent(s.id))
    .then(function (r) { return r.json(); })
    .then(function (d) {
      if (!d || d.status !== 'ok' || !d.access) return; // backend lama → pakai yang tersimpan
      if (d.aktif === false) {
        localStorage.removeItem('moona_v2_session'); localStorage.removeItem('moona_v2_access');
        location.href = 'moona-v2-login.html'; return;
      }
      var after = JSON.stringify(d.access);
      localStorage.setItem('moona_v2_access', after);
      var ns = Object.assign({}, s, { nama: d.nama || s.nama, role: d.role || s.role, jobTitle: d.jobTitle || s.jobTitle || '' });
      localStorage.setItem('moona_v2_session', JSON.stringify(ns));
      if (after !== before) {
        var mod = window.__moonaModule;
        // Akses berubah → muat ulang supaya tombol/izin di halaman ikut menyesuaikan
        if (before && mod) location.reload();
        else moonaApplyNav();
      }
    })
    .catch(function () {});
}
