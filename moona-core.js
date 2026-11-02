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
  { key: 'crm',            nama: 'CRM & Sales',        grup: 'Sales',       file: 'moona-v2-crm.html', levels: true },
  { key: 'client-portal',  nama: 'Client Portal',      grup: 'Sales',       file: 'moona-v2-client-portal.html' },
  { key: 'projects',       nama: 'Project Management', grup: 'Operasional', file: 'moona-v2-projects.html' },
  { key: 'laporan-design', nama: 'Laporan Design',     grup: 'Operasional', file: 'moona-v2-laporan-design-v4.html' },
  { key: 'laporan-build',  nama: 'Laporan Build',      grup: 'Operasional', file: 'moona-v2-laporan-build-v4.html' },
  { key: 'aset',           nama: 'Aset',               grup: 'Operasional', file: 'moona-v2-assets.html', levels: true },
  { key: 'meetings',       nama: 'Meeting Tracker',    grup: 'Lainnya',     file: 'moona-v2-meetings.html' },
  { key: 'finance',        nama: 'Finance',            grup: 'Lainnya',     file: 'moona-v2-finance.html' },
  { key: 'content',        nama: 'Content Planner',    grup: 'Lainnya',     file: 'moona-v2-content.html' },
  { key: 'playbook',       nama: 'Playbook',           grup: 'Lainnya',     file: 'moona-v2-playbook.html' },
  { key: 'sop',            nama: 'SOP & Dokumen',      grup: 'Lainnya',     file: 'moona-v2-sop.html' },
  { key: 'activity',       nama: 'Log Aktivitas',      grup: 'Admin',       file: 'moona-v2-activity.html' },
  { key: 'usermgmt',       nama: 'User Management',    grup: 'Admin',       file: 'moona-v2-usermgmt.html' }
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
  document.body.innerHTML = '<div style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:#f8f7f4;font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',sans-serif;padding:20px">'
    + '<div style="max-width:420px;background:#fff;border:0.5px solid #e5e3dc;border-radius:12px;padding:32px;text-align:center">'
    + '<div style="font-size:42px;margin-bottom:14px;line-height:1">🔒</div>'
    + '<div style="font-size:18px;font-weight:600;color:#1a1a18;margin-bottom:6px">Akses ditolak</div>'
    + '<div style="font-size:13px;color:#6b6a64;line-height:1.55;margin-bottom:18px">Modul ini belum dibuka untuk akun <strong>' + (s.jobTitle || s.role) + '</strong>.<br>Minta admin membuka aksesnya di User Management.</div>'
    + '<div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap">'
    + '<a href="' + defFile + '" style="display:inline-block;padding:9px 18px;background:#406EB6;color:#fff;text-decoration:none;border-radius:8px;font-size:12px;font-weight:600">Buka modul utama saya →</a>'
    + '<button onclick="localStorage.removeItem(\'moona_v2_session\');localStorage.removeItem(\'moona_v2_access\');location.href=\'moona-v2-login.html\'" style="padding:9px 18px;background:#fff;color:#6b6a64;border:0.5px solid #d0cec7;border-radius:8px;font-size:12px;cursor:pointer;font-family:inherit">Logout</button>'
    + '</div><div style="font-size:10px;color:#9d9b94;margin-top:14px">Login sebagai: <strong>' + s.nama + '</strong></div></div></div>';
}

// Dipanggil di awal tiap modul: if (!moonaRequireAccess('crm')) throw ...
function moonaRequireAccess(currentModule) {
  var s = moonaSession();
  if (!s) { location.href = 'moona-v2-login.html'; return false; }
  window.__moonaModule = currentModule;
  moonaRefreshAccess();
  var acc = moonaAccess();
  if (acc.modules.indexOf(currentModule) >= 0) {
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
  var items = document.querySelectorAll('.sidebar .nav-item');
  for (var i = 0; i < items.length; i++) {
    var el = items[i];
    var m = String(el.getAttribute('onclick') || '').match(/go\('([^']+)'\)/);
    var key = m ? moonaKeyOf(m[1]) : '';
    if (!key && el.classList.contains('active')) key = window.__moonaModule || '';
    if (key) el.style.display = acc.modules.indexOf(key) >= 0 ? '' : 'none';
  }
  // Judul seksi yang semua menunya tersembunyi ikut disembunyikan
  var secs = document.querySelectorAll('.sidebar .nav-section');
  for (var j = 0; j < secs.length; j++) {
    var n = secs[j].nextElementSibling, any = false;
    while (n && !n.classList.contains('nav-section') && !n.classList.contains('sidebar-footer')) {
      if (n.classList.contains('nav-item') && n.style.display !== 'none') any = true;
      n = n.nextElementSibling;
    }
    secs[j].style.display = any ? '' : 'none';
  }
  var cards = document.querySelectorAll('a.mod-card[href]');
  for (var c = 0; c < cards.length; c++) {
    var k = moonaKeyOf(cards[c].getAttribute('href'));
    if (k) cards[c].style.display = acc.modules.indexOf(k) >= 0 ? '' : 'none';
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
