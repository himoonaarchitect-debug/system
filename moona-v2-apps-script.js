// ============================================================
// MOONA SYSTEM v2 — Apps Script
// ============================================================

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;
    // AUTH
    if (action === 'addUser') return addUser(data);
    // CRM
    if (action === 'addLead') return addLead(data);
    if (action === 'updateLead') return updateLead(data);
    if (action === 'addFollowUpLog') return addFollowUpLog(data);
    // PROJECTS
    if (action === 'addProject') return addProject(data);
    if (action === 'updateProject') return updateProject(data);
    if (action === 'deleteProject') return deleteProject(data);
    // RAB
    if (action === 'addRABItem') return addRABItem(data);
    if (action === 'addRABItemsBatch') return addRABItemsBatch(data);
    if (action === 'updateRABRealisasi') return updateRABRealisasi(data);
    if (action === 'updateRABItem') return updateRABItem(data);
    if (action === 'deleteRABItem') return deleteRABItem(data);
    if (action === 'renameRABKelompok') return renameRABKelompok(data);
    if (action === 'deleteRABKelompok') return deleteRABKelompok(data);
    // LAPORAN
    if (action === 'addLaporanDesign') return addLaporanDesign(data);
    if (action === 'approvalLaporanDesign') return approvalLaporanDesign(data);
    if (action === 'addLaporanBuild') return addLaporanBuild(data);
    if (action === 'addLaporanBuildBatch') return addLaporanBuildBatch(data);
    if (action === 'approvalLaporanBuild') return approvalLaporanBuild(data);
    if (action === 'uploadFoto') return uploadFoto(data);
    // MEETINGS
    if (action === 'addMeeting') return addMeeting(data);
    if (action === 'deleteMeeting') return deleteMeeting(data);
    if (action === 'updateMeeting') return updateMeeting(data);
    if (action === 'addActionItem') return addActionItem(data);
    if (action === 'updateActionStatus') return updateActionStatus(data);
    // FINANCE
    if (action === 'addInvoice') return addInvoice(data);
    if (action === 'updateInvoiceLunas') return updateInvoiceLunas(data);
    if (action === 'addCashflow') return addCashflow(data);
    if (action === 'deleteCashflow') return deleteCashflow(data);
    if (action === 'deleteInvoice') return deleteInvoice(data);
    // CONTENT
    if (action === 'addContentPlan') return addContentPlan(data);
    if (action === 'updateContentStatus') return updateContentStatus(data);
    if (action === 'deleteContent') return deleteContent(data);
    if (action === 'addSosmedMetrics') return addSosmedMetrics(data);
    if (action === 'updateSosmedMetric') return updateSosmedMetric(data);
    if (action === 'deleteSosmedMetric') return deleteSosmedMetric(data);
    // CLIENT FILES
    if (action === 'addClientFile') return addClientFile(data);
    if (action === 'addSOP') return addSOP(data);
    if (action === 'updateSOP') return updateSOP(data);
    if (action === 'approvalSOP') return approvalSOP(data);
    if (action === 'deleteSOP') return deleteSOP(data);
    if (action === 'generateClientToken') return generateClientToken(data);
    if (action === 'revokeClientAccess') return revokeClientAccess(data);
    if (action === 'activateClientAccess') return activateClientAccess(data);
    if (action === 'deleteClientAccess') return deleteClientAccess(data);
    if (action === 'addClientChat') return addClientChat(data);
    if (action === 'markChatRead') return markChatRead(data);
    if (action === 'addTaskAssign') return addTaskAssign(data);
    if (action === 'updateTaskAssign') return updateTaskAssign(data);
    if (action === 'updateTaskStatus') return updateTaskStatus(data);
    if (action === 'pauseTaskAssign') return pauseTaskAssign(data);
    if (action === 'deleteTaskAssign') return deleteTaskAssign(data);
    return response({ status: 'error', message: 'Action tidak dikenal: ' + action });
  } catch (err) {
    return response({ status: 'error', message: err.toString() });
  }
}

function doGet(e) {
  const action = e.parameter.action;
  if (action === 'login') return login(e.parameter);
  if (action === 'getUsers') return getUsers();
  if (action === 'getLeads') return getLeads();
  if (action === 'getFollowUpLogs') return getFollowUpLogs();
  if (action === 'getProjects') return getProjects();
  if (action === 'getRAB') return getRAB(e.parameter);
  if (action === 'getLaporanDesign') return getLaporanDesign(e.parameter);
  if (action === 'getLaporanBuild') return getLaporanBuild(e.parameter);
  if (action === 'getMeetings') return getMeetings();
  if (action === 'getActionItems') return getActionItems(e.parameter);
  if (action === 'getInvoices') return getInvoices();
  if (action === 'getCashflows') return getCashflows();
  if (action === 'getContentPlan') return getContentPlan();
  if (action === 'validateClientToken') return validateClientToken(e.parameter);
  if (action === 'getClientData') return getClientData(e.parameter);
  if (action === 'getClientChat') return getClientChat(e.parameter);
  if (action === 'getClientAccess') return getClientAccess();
  if (action === 'getSosmedMetrics') return getSosmedMetrics();
  if (action === 'getSOP') return getSOP();
  if (action === 'getClientFiles') return getClientFiles(e.parameter);
  if (action === 'getTaskAssign') return getTaskAssign(e.parameter);
  return response({ status: 'ok', message: 'Moona API v2 aktif' });
}

// ── HELPER ──
function ss() { return SpreadsheetApp.getActiveSpreadsheet(); }
function sheet(name) { return ss().getSheetByName(name); }

function norm(rows) {
  if (rows.length <= 1) return [];
  const headers = rows[0];
  return rows.slice(1)
    .filter(row => row.some(cell => cell !== '' && cell !== null))
    .map(row => {
      let obj = {};
      headers.forEach((h, i) => { obj[String(h).trim()] = row[i] !== undefined ? String(row[i]) : ''; });
      return obj;
    });
}

function getById(sheetName, id) {
  const s = sheet(sheetName);
  const rows = s.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][0]) === String(id)) return { row: i + 1, data: rows[i], headers: rows[0] };
  }
  return null;
}

function updateCol(sheetName, id, colName, value) {
  const s = sheet(sheetName);
  const rows = s.getDataRange().getValues();
  const headers = rows[0];
  const col = headers.indexOf(colName);
  if (col < 0) return false;
  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][0]) === String(id)) {
      s.getRange(i + 1, col + 1).setValue(value);
      return true;
    }
  }
  return false;
}

function updateCols(sheetName, id, updates) {
  const s = sheet(sheetName);
  const rows = s.getDataRange().getValues();
  const headers = rows[0];
  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][0]) === String(id)) {
      for (const [colName, value] of Object.entries(updates)) {
        const col = headers.indexOf(colName);
        if (col >= 0) s.getRange(i + 1, col + 1).setValue(value);
      }
      return true;
    }
  }
  return false;
}

function nowId() { return new Date().getTime(); }
function nowStr() { return new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' }); }

function response(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── AUTH ──
function login(params) {
  const rows = sheet('Users').getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    const [id, nama, username, password, role, aktif, jobTitle] = rows[i];
    if (
      String(username).trim().toLowerCase() === String(params.username).trim().toLowerCase() &&
      String(password).trim() === String(params.password).trim() &&
      String(aktif).trim().toUpperCase() === 'TRUE'
    ) {
      return response({ status: 'ok', id, nama, username, role, jobTitle: String(jobTitle || '') });
    }
  }
  return response({ status: 'error', message: 'Login gagal' });
}

function getUsers() {
  const rows = sheet('Users').getDataRange().getValues();
  if (rows.length <= 1) return response({ status: 'ok', data: [] });
  const users = rows.slice(1)
    .filter(r => String(r[5]).trim().toUpperCase() === 'TRUE')
    .map(r => ({ id: String(r[0]), nama: String(r[1]), role: String(r[4]), jobTitle: String(r[6] || '') }));
  return response({ status: 'ok', data: users });
}

function addUser(data) {
  const s = sheet('Users');
  const id = 'USR-' + nowId();
  s.appendRow([id, data.nama, data.username, data.password, data.role, 'TRUE', data.jobTitle || '']);
  return response({ status: 'ok', id });
}

// ── CRM ──
function addLead(data) {
  const s = sheet('Leads');
  const id = 'LEAD-' + nowId();
  // Tanggal masuk: kalau user kirim manual (format YYYY-MM-DD dari input date), pakai itu.
  // Kalau tidak, default ke nowStr().
  const tgl = (data.tglMasuk && String(data.tglMasuk).trim()) ? String(data.tglMasuk).trim() : nowStr();
  s.appendRow([
    id, data.nama, data.wa, data.alamat || '', data.sumber,
    data.layanan, data.proyek, data.tahap || 'Consultation',
    tgl, tgl, data.followup || '', '', '', data.nilai || '', ''
  ]);
  return response({ status: 'ok', id });
}

function getLeads() {
  return response({ status: 'ok', data: norm(sheet('Leads').getDataRange().getValues()) });
}

function updateLead(data) {
  const updates = {};
  if (data.tahap !== undefined) {
    updates['TahapPipeline'] = data.tahap;
    updates['TanggalMasukTahap'] = nowStr();
  }
  if (data.status !== undefined) {
    updates['StatusAkhir'] = data.status;
    if (data.status === 'Deal') updates['TanggalClosing'] = nowStr();
  }
  if (data.alasanLost !== undefined) updates['AlasanLost'] = data.alasanLost;
  if (data.followup !== undefined) updates['FollowUpBerikutnya'] = data.followup;
  if (data.nilai !== undefined) updates['NilaiKontrak'] = data.nilai;
  if (data.alamat !== undefined) updates['Alamat'] = data.alamat;
  updateCols('Leads', data.id, updates);
  return response({ status: 'ok' });
}

function addFollowUpLog(data) {
  const id = 'FU-' + nowId();
  sheet('FollowUpLog').appendRow([id, data.leadId, data.catatan, nowStr(), data.pic || '']);
  if (data.followupNext) updateCol('Leads', data.leadId, 'FollowUpBerikutnya', data.followupNext);
  return response({ status: 'ok', id });
}

function getFollowUpLogs() {
  return response({ status: 'ok', data: norm(sheet('FollowUpLog').getDataRange().getValues()) });
}

// ── PROJECTS ──
function addProject(data) {
  const s = sheet('Projects');
  const id = 'PRJ-' + nowId();
  s.appendRow([
    id, data.leadId || '', data.nama, data.klien,
    data.tipeProyek, data.tipeLayanan, data.segmen,
    data.pic, data.mulai, data.target, data.nilai || '',
    'Aktif', data.catatan || '', nowStr(), data.folderFoto || ''
  ]);
  return response({ status: 'ok', id });
}

function getProjects() {
  return response({ status: 'ok', data: norm(sheet('Projects').getDataRange().getValues()) });
}

function updateProject(data) {
  const updates = { TanggalUpdate: nowStr() };
  ['StatusProyek','PIC','TargetSelesai','CatatanProyek','NilaiKontrak','FolderFoto','NamaProyek','TanggalMulai','NamaKlien','TipeLayanan','Segmen','TipeProyek'].forEach(k => {
    if (data[k] !== undefined) updates[k] = data[k];
  });
  updateCols('Projects', data.id, updates);
  return response({ status: 'ok' });
}

// Hapus proyek + cascade delete data terkait (RAB, TaskAssign, LaporanDesign, LaporanBuild)
function deleteProject(data) {
  const projectId = data.id;
  if (!projectId) return response({ status: 'error', message: 'Project ID kosong.' });
  const summary = { rab: 0, task: 0, lapDesign: 0, lapBuild: 0, project: 0 };
  // 1) Hapus item RAB
  summary.rab = deleteRowsByCol('RAB', 'Project_ID', projectId);
  // 2) Hapus task assignments
  summary.task = deleteRowsByCol('TaskAssign', 'Project_ID', projectId);
  // 3) Hapus laporan design
  summary.lapDesign = deleteRowsByCol('LaporanDesign', 'Project_ID', projectId);
  // 4) Hapus laporan build
  summary.lapBuild = deleteRowsByCol('LaporanBuild', 'Project_ID', projectId);
  // 5) Hapus baris proyeknya sendiri
  summary.project = deleteRowsByCol('Projects', 'ID', projectId);
  return response({ status: 'ok', summary });
}

// Helper: hapus semua row di sheet tertentu yang kolomnya cocok dengan value tertentu.
// Iterasi dari belakang biar deleteRow tidak shift index baris di atasnya.
function deleteRowsByCol(sheetName, colName, value) {
  let s;
  try { s = sheet(sheetName); } catch (e) { return 0; }
  const rows = s.getDataRange().getValues();
  if (!rows.length) return 0;
  const headers = rows[0];
  const colIdx = headers.indexOf(colName);
  if (colIdx < 0) return 0;
  let count = 0;
  for (let i = rows.length - 1; i >= 1; i--) {
    if (String(rows[i][colIdx]) === String(value)) { s.deleteRow(i + 1); count++; }
  }
  return count;
}

// ── RAB ──
function addRABItem(data) {
  const id = 'RAB-' + nowId();
  const total = (parseFloat(data.volume) || 0) * (parseFloat(data.harga) || 0);
  sheet('RAB').appendRow([
    id, data.projectId, data.kelompok || '', data.nama,
    data.volume, data.satuan, data.harga, total, 0, 0
  ]);
  // Recalculate all bobot for this project
  recalcRABBobot(data.projectId);
  return response({ status: 'ok', id, total });
}

// Batch insert multiple items in same kelompok — dipakai dari modal Tambah Item RAB
// Payload: { projectId, kelompok, items: [{nama, volume, satuan, harga}, ...] }
function addRABItemsBatch(data) {
  if (!data.items || !Array.isArray(data.items) || data.items.length === 0) {
    return response({ status: 'error', message: 'Tidak ada item untuk disimpan.' });
  }
  const s = sheet('RAB');
  const ids = [];
  const baseId = nowId();
  data.items.forEach((it, idx) => {
    const id = 'RAB-' + baseId + '-' + idx;
    const vol = parseFloat(it.volume) || 0;
    const harga = parseFloat(it.harga) || 0;
    const total = vol * harga;
    s.appendRow([
      id, data.projectId, data.kelompok || '', it.nama,
      it.volume, it.satuan, it.harga, total, 0, 0
    ]);
    ids.push(id);
  });
  recalcRABBobot(data.projectId);
  return response({ status: 'ok', ids, count: ids.length });
}

// Rename semua item dengan kelompok lama → kelompok baru pada satu proyek
function renameRABKelompok(data) {
  const s = sheet('RAB');
  const rows = s.getDataRange().getValues();
  const headers = rows[0];
  const pidCol = headers.indexOf('Project_ID');
  const kelompokCol = headers.indexOf('KelompokPekerjaan');
  if (pidCol < 0 || kelompokCol < 0) return response({ status: 'error', message: 'Kolom RAB tidak lengkap.' });
  let count = 0;
  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][pidCol]) === String(data.projectId) && String(rows[i][kelompokCol]) === String(data.oldName)) {
      s.getRange(i + 1, kelompokCol + 1).setValue(data.newName || '');
      count++;
    }
  }
  return response({ status: 'ok', count });
}

// Hapus seluruh item di satu kelompok pada satu proyek (sekaligus recalc bobot)
function deleteRABKelompok(data) {
  const s = sheet('RAB');
  const rows = s.getDataRange().getValues();
  const headers = rows[0];
  const pidCol = headers.indexOf('Project_ID');
  const kelompokCol = headers.indexOf('KelompokPekerjaan');
  if (pidCol < 0 || kelompokCol < 0) return response({ status: 'error', message: 'Kolom RAB tidak lengkap.' });
  // Iterate dari belakang biar deleteRow tidak shift index untuk row di atasnya
  let count = 0;
  for (let i = rows.length - 1; i >= 1; i--) {
    if (String(rows[i][pidCol]) === String(data.projectId) && String(rows[i][kelompokCol]) === String(data.kelompok)) {
      s.deleteRow(i + 1);
      count++;
    }
  }
  if (count > 0) recalcRABBobot(data.projectId);
  return response({ status: 'ok', count });
}


function updateRABItem(data) {
  updateCols('RAB', data.id, {
    NamaItem: data.nama,
    KelompokPekerjaan: data.kelompok || '',
    Volume: data.volume,
    Satuan: data.satuan,
    HargaSatuan: data.harga,
    Total: (parseFloat(data.volume)||0) * (parseFloat(data.harga)||0)
  });
  // Recalculate bobot for all items in this project
  const rows = norm(sheet('RAB').getDataRange().getValues());
  const item = rows.find(r => r['ID'] === data.id);
  if(item) recalcRABBobot(item['Project_ID']);
  return response({ status: 'ok' });
}
function recalcRABBobot(projectId) {
  const sh = sheet('RAB');
  const rows = sh.getDataRange().getValues();
  const headers = rows[0];
  const pidCol = headers.indexOf('Project_ID');
  const totalCol = headers.indexOf('Total');
  const bobotCol = headers.indexOf('Bobot');
  // Sum total for project
  let sumTotal = 0;
  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][pidCol]) === String(projectId)) {
      sumTotal += parseFloat(rows[i][totalCol]) || 0;
    }
  }
  if (sumTotal === 0) return;
  // Update bobot for each row
  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][pidCol]) === String(projectId)) {
      const rowTotal = parseFloat(rows[i][totalCol]) || 0;
      const bobot = sumTotal > 0 ? Math.round((rowTotal / sumTotal) * 10000) / 100 : 0;
      sh.getRange(i + 1, bobotCol + 1).setValue(bobot);
    }
  }
}

function deleteRABItem(data) {
  const sh = sheet('RAB');
  const rows = sh.getDataRange().getValues();
  let projectId = '';
  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][0]) === String(data.id)) {
      projectId = String(rows[i][1]);
      sh.deleteRow(i + 1);
      break;
    }
  }
  if (projectId) recalcRABBobot(projectId);
  return response({ status: 'ok' });
}

function getRAB(params) {
  const data = norm(sheet('RAB').getDataRange().getValues());
  const filtered = params.projectId ? data.filter(r => r['Project_ID'] === params.projectId) : data;
  return response({ status: 'ok', data: filtered });
}

function updateRABRealisasi(data) {
  updateCol('RAB', data.id, 'Realisasi', data.realisasi);
  return response({ status: 'ok' });
}

// ── LAPORAN DESIGN ──
function addLaporanDesign(data) {
  const id = 'LPD-' + nowId();
  sheet('LaporanDesign').appendRow([
    id, data.projectId, nowStr(), data.pic,
    data.fase, data.persentase, data.deskripsi || '',
    data.fotoUrl || '', data.assignKe || '',
    'Pending', ''
  ]);
  return response({ status: 'ok', id });
}

function getLaporanDesign(params) {
  const data = norm(sheet('LaporanDesign').getDataRange().getValues());
  const filtered = params.projectId ? data.filter(r => r['Project_ID'] === params.projectId) : data;
  return response({ status: 'ok', data: filtered });
}

function approvalLaporanDesign(data) {
  updateCols('LaporanDesign', data.id, {
    StatusApproval: data.status,
    CatatanApproval: data.catatan || ''
  });
  return response({ status: 'ok' });
}

// ── LAPORAN BUILD ──
function addLaporanBuild(data) {
  const id = 'LPB-' + nowId();
  sheet('LaporanBuild').appendRow([
    id, data.projectId, nowStr(), data.pic,
    data.rabId || '', data.namaItem,
    data.progressItem, data.keterangan || '',
    data.fotoUrl || '', data.jumlahTukang || '0',
    'Pending',                  // StatusApproval (K)
    ''                          // CatatanApproval (L)
  ]);
  // Update realisasi RAB hanya kalau auto-approve (untuk sekarang: tidak)
  // Realisasi RAB di-sync saat approval, bukan saat submit
  return response({ status: 'ok', id });
}

function getLaporanBuild(params) {
  const data = norm(sheet('LaporanBuild').getDataRange().getValues());
  const filtered = params.projectId ? data.filter(r => r['Project_ID'] === params.projectId) : data;
  return response({ status: 'ok', data: filtered });
}

function approvalLaporanBuild(data) {
  const sh = sheet('LaporanBuild');
  const rows = sh.getDataRange().getValues();
  const headers = rows[0];
  let target = null;
  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][0]) === String(data.id)) {
      target = {};
      headers.forEach((h, idx) => target[h] = rows[i][idx]);
      break;
    }
  }
  if (!target) return response({ status: 'error', message: 'Laporan tidak ditemukan' });

  // Update status & catatan approval (kolom K & L di sheet)
  updateCols('LaporanBuild', data.id, {
    StatusApproval: data.status,
    CatatanApproval: data.catatan || ''
  });

  // Kalau Approved, sync realisasi RAB
  if (data.status === 'Approved' && target['RAB_ID']) {
    const progress = parseFloat(target['ProgressItem'] || 0);
    if (!isNaN(progress)) {
      updateCol('RAB', String(target['RAB_ID']), 'Realisasi', progress);
    }
  }

  return response({ status: 'ok' });
}

function addLaporanBuildBatch(data) {
  // Multi-item submit per laporan
  const items = Array.isArray(data.items) ? data.items : [];
  const ids = [];
  for (let i = 0; i < items.length; i++) {
    const it = items[i];
    const id = 'LPB-' + nowId() + '-' + i;
    sheet('LaporanBuild').appendRow([
      id, data.projectId, nowStr(), data.pic,
      it.rabId || '', it.namaItem,
      it.progressItem, it.keterangan || '',
      data.fotoUrl || '', data.jumlahTukang || '0',
      'Pending',                // StatusApproval (K)
      ''                        // CatatanApproval (L)
    ]);
    ids.push(id);
  }
  return response({ status: 'ok', ids: ids });
}

// ── MEETINGS ──
function addMeeting(data) {
  const id = 'MTG-' + nowId();
  sheet('Meetings').appendRow([
    id, data.judul, data.tipe, data.projectId || '',
    nowStr(), data.peserta || '', data.keputusan || '', data.catatan || '',
    data.tanggalMeeting || '', data.lokasi || '',
    data.pesertaHadir || '', data.visibleToClient || 'No'
  ]);
  return response({ status: 'ok', id });
}

function updateMeeting(data) {
  updateCols('Meetings', data.id, {
    Judul: data.judul, Tipe: data.tipe, Project_ID: data.projectId || '',
    Peserta: data.peserta || '', Keputusan: data.keputusan || '', Catatan: data.catatan || '',
    TanggalMeeting: data.tanggalMeeting || '', Lokasi: data.lokasi || '',
    PesertaHadir: data.pesertaHadir || '', VisibleToClient: data.visibleToClient || 'No'
  });
  return response({ status: 'ok' });
}

function getMeetings() {
  return response({ status: 'ok', data: norm(sheet('Meetings').getDataRange().getValues()) });
}

function addActionItem(data) {
  const id = 'ACT-' + nowId();
  sheet('ActionItems').appendRow([id, data.meetingId, data.deskripsi, data.pic, data.deadline, 'Open', '']);
  return response({ status: 'ok', id });
}

function getActionItems(params) {
  const data = norm(sheet('ActionItems').getDataRange().getValues());
  const filtered = params.meetingId ? data.filter(r => r['Meeting_ID'] === params.meetingId) : data;
  return response({ status: 'ok', data: filtered });
}

function updateActionStatus(data) {
  updateCols('ActionItems', data.id, { Status: data.status, Catatan: data.catatan || '' });
  return response({ status: 'ok' });
}

// ── FINANCE ──
function addInvoice(data) {
  const id = 'INV-' + nowId();
  sheet('Invoice').appendRow([
    id, data.projectId, data.termin, data.nominal,
    data.kirim, data.tempo, data.status || 'Menunggu',
    data.lunas || '', data.oleh || '', data.catatan || ''
  ]);
  return response({ status: 'ok', id });
}

function getInvoices() {
  return response({ status: 'ok', data: norm(sheet('Invoice').getDataRange().getValues()) });
}

function updateInvoiceLunas(data) {
  updateCols('Invoice', data.id, { StatusBayar: 'Lunas', TanggalLunas: data.tgl });
  return response({ status: 'ok' });
}

function addCashflow(data) {
  const id = 'CF-' + nowId();
  sheet('Cashflow').appendRow([id, data.projectId || '', data.minggu || '', data.tgl, data.masuk || '0', data.keluar || '0', data.kategori || '', data.ket || '']);
  return response({ status: 'ok', id });
}

function deleteCashflow(data) {
  const sh = sheet('Cashflow');
  const rows = sh.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][0]) === String(data.id)) { sh.deleteRow(i + 1); break; }
  }
  return response({ status: 'ok' });
}

function deleteInvoice(data) {
  const sh = sheet('Invoice');
  const rows = sh.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][0]) === String(data.id)) { sh.deleteRow(i + 1); break; }
  }
  return response({ status: 'ok' });
}

function getCashflows() {
  return response({ status: 'ok', data: norm(sheet('Cashflow').getDataRange().getValues()) });
}

// ── CONTENT PLANNER ──
function addContentPlan(data) {
  const id = 'CNT-' + nowId();
  sheet('ContentPlan').appendRow([
    id, data.tanggal, data.platform, data.jenisKonten, data.tipeKonten,
    data.judul, data.copywriting || '', data.caption || '',
    data.brief || '', data.referensi || '', data.linkFile || '',
    data.linkPost || '', data.status || 'Idea', data.pic || '', data.catatan || ''
  ]);
  return response({ status: 'ok', id });
}

function getContentPlan() {
  return response({ status: 'ok', data: norm(sheet('ContentPlan').getDataRange().getValues()) });
}

function updateContentStatus(data) {
  const updates = {
    Judul: data.judul, Tanggal: data.tanggal, Platform: data.platform,
    JenisKonten: data.jenisKonten || '', TipeKonten: data.tipeKonten || '',
    Brief: data.brief || '', Copywriting: data.copywriting || '',
    Caption: data.caption || '', Referensi: data.referensi || '',
    LinkFile: data.linkFile || '', LinkPost: data.linkPost || '',
    StatusKonten: data.status, PIC: data.pic || '', Catatan: data.catatan || ''
  };
  updateCols('ContentPlan', data.id, updates);
  return response({ status: 'ok' });
}

function deleteContent(data) {
  const sh = sheet('ContentPlan');
  const rows = sh.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][0]) === String(data.id)) { sh.deleteRow(i + 1); break; }
  }
  return response({ status: 'ok' });
}

function updateSosmedMetric(data) {
  // Schema sheet baru:
  // ID | Tanggal | Platform | Followers | Reach | Impressions | Engagement | Catatan
  // | Views | Interactions | PostViews | ProfileViews | Likes | Comments | Shares | Audience | Messaging
  updateCols('SosmedMetrics', data.id, {
    Tanggal: data.tanggal, Platform: data.platform,
    Followers: data.followers || '', Reach: data.reach || '',
    Impressions: data.impressions || '', Engagement: data.engagement || '',
    Catatan: data.catatan || '',
    Views: data.views || '', Interactions: data.interactions || '',
    PostViews: data.postViews || '', ProfileViews: data.profileViews || '',
    Likes: data.likes || '', Comments: data.comments || '', Shares: data.shares || '',
    Audience: data.audience || '', Messaging: data.messaging || ''
  });
  return response({ status: 'ok' });
}

function deleteSosmedMetric(data) {
  const sh = sheet('SosmedMetrics');
  const rows = sh.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][0]) === String(data.id)) { sh.deleteRow(i + 1); break; }
  }
  return response({ status: 'ok' });
}

function addSosmedMetrics(data) {
  const id = 'SM-' + nowId();
  // Urut kolom HARUS sama dengan header sheet:
  // ID | Tanggal | Platform | Followers | Reach | Impressions | Engagement | Catatan
  // | Views | Interactions | PostViews | ProfileViews | Likes | Comments | Shares | Audience | Messaging
  sheet('SosmedMetrics').appendRow([
    id, data.tanggal, data.platform,
    data.followers || '', data.reach || '', data.impressions || '',
    data.engagement || '', data.catatan || '',
    data.views || '', data.interactions || '',
    data.postViews || '', data.profileViews || '',
    data.likes || '', data.comments || '', data.shares || '',
    data.audience || '', data.messaging || ''
  ]);
  return response({ status: 'ok', id });
}

function getSosmedMetrics() {
  return response({ status: 'ok', data: norm(sheet('SosmedMetrics').getDataRange().getValues()) });
}

// ── CLIENT FILES ──
function addClientFile(data) {
  const id = 'CLF-' + nowId();
  sheet('ClientFiles').appendRow([
    id, data.projectId, data.namaFile, data.tipeFile,
    data.linkFile, nowStr(), data.keterangan || ''
  ]);
  return response({ status: 'ok', id });
}

function getClientFiles(params) {
  const data = norm(sheet('ClientFiles').getDataRange().getValues());
  const filtered = params.projectId ? data.filter(r => r['Project_ID'] === params.projectId) : data;
  return response({ status: 'ok', data: filtered });
}


// ── SOP & DOKUMEN ──
function addSOP(data) {
  const id = 'SOP-' + nowId();
  // Schema sheet 'SOP':
  // ID | Judul | Kategori | Divisi | Deskripsi | LinkDokumen | Uploader | TanggalUpload
  // | Tag | Versi | StatusApproval | CatatanApproval | ApprovedBy | TanggalApproval | SubKategori
  sheet('SOP').appendRow([
    id, data.judul, data.kategori, data.divisi || '',
    data.deskripsi || '', data.linkDokumen, data.uploader,
    nowStr(), data.tag || '', data.versi || '1.0',
    'Pending Review', '', '', '',
    data.subKategori || ''
  ]);
  return response({ status: 'ok', id });
}

function getSOP() {
  return response({ status: 'ok', data: norm(sheet('SOP').getDataRange().getValues()) });
}

function updateSOP(data) {
  updateCols('SOP', data.id, {
    Judul: data.judul, Kategori: data.kategori, Divisi: data.divisi || '',
    Deskripsi: data.deskripsi || '', LinkDokumen: data.linkDokumen,
    Tag: data.tag || '', Versi: data.versi || '1.0',
    SubKategori: data.subKategori || ''
  });
  return response({ status: 'ok' });
}

function approvalSOP(data) {
  updateCols('SOP', data.id, {
    StatusApproval: data.status,
    CatatanApproval: data.catatan || '',
    ApprovedBy: data.approvedBy,
    TanggalApproval: nowStr()
  });
  return response({ status: 'ok' });
}

function deleteSOP(data) {
  const sh = sheet('SOP');
  const rows = sh.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][0]) === String(data.id)) { sh.deleteRow(i + 1); break; }
  }
  return response({ status: 'ok' });
}



function deleteMeeting(data) {
  const sh = sheet('Meetings');
  const rows = sh.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][0]) === String(data.id)) { sh.deleteRow(i + 1); break; }
  }
  return response({ status: 'ok' });
}
// ── CLIENT PORTAL ──
function generateClientToken(data) {
  const id = 'CLA-' + nowId();
  const token = 'mna_' + Utilities.getUuid().replace(/-/g, '').substring(0, 24);
  sheet('ClientAccess').appendRow([
    id, data.namaKlien, data.email || '', data.phone || '',
    token, data.createdBy, nowStr(), '', 'Active'
  ]);
  return response({ status: 'ok', id: id, token: token });
}

function getClientAccess() {
  return response({ status: 'ok', data: norm(sheet('ClientAccess').getDataRange().getValues()) });
}

function revokeClientAccess(data) {
  updateCols('ClientAccess', data.id, { Status: 'Revoked' });
  return response({ status: 'ok' });
}

function activateClientAccess(data) {
  updateCols('ClientAccess', data.id, { Status: 'Active' });
  return response({ status: 'ok' });
}

function deleteClientAccess(data) {
  const sh = sheet('ClientAccess');
  const rows = sh.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][0]) === String(data.id)) { sh.deleteRow(i + 1); break; }
  }
  return response({ status: 'ok' });
}

function validateClientToken(params) {
  const token = params.token;
  if (!token) return response({ status: 'error', message: 'Token tidak valid' });
  const rows = norm(sheet('ClientAccess').getDataRange().getValues());
  const acc = rows.find(r => r['Token'] === token);
  if (!acc) return response({ status: 'error', message: 'Token tidak ditemukan' });
  if (acc['Status'] === 'Revoked') return response({ status: 'error', message: 'Akses sudah dinonaktifkan' });
  // Update LastAccess
  updateCols('ClientAccess', acc['ID'], { LastAccess: nowStr() });
  return response({ status: 'ok', data: acc });
}

function getClientData(params) {
  const token = params.token;
  if (!token) return response({ status: 'error', message: 'Token tidak valid' });
  const accRows = norm(sheet('ClientAccess').getDataRange().getValues());
  const acc = accRows.find(r => r['Token'] === token);
  if (!acc || acc['Status'] === 'Revoked') return response({ status: 'error', message: 'Akses tidak valid' });

  const namaKlien = acc['NamaKlien'];
  // Ambil semua proyek untuk klien ini
  const allProjects = norm(sheet('Projects').getDataRange().getValues());
  const myProjects = allProjects.filter(p => String(p['NamaKlien']).toLowerCase().trim() === String(namaKlien).toLowerCase().trim());
  const projIds = myProjects.map(p => p['ID']);

  // Ambil data terkait
  const rab = norm(sheet('RAB').getDataRange().getValues()).filter(r => projIds.indexOf(r['Project_ID']) >= 0);
  const lapDesign = norm(sheet('LaporanDesign').getDataRange().getValues()).filter(r => projIds.indexOf(r['Project_ID']) >= 0 && r['StatusApproval'] === 'Approved');
  const lapBuild = norm(sheet('LaporanBuild').getDataRange().getValues()).filter(r => projIds.indexOf(r['Project_ID']) >= 0 && r['StatusApproval'] === 'Approved');
  const meetings = norm(sheet('Meetings').getDataRange().getValues()).filter(r => {
    return projIds.indexOf(r['Project_ID']) >= 0 && r['VisibleToClient'] === 'Yes';
  });
  const invoices = norm(sheet('Invoice').getDataRange().getValues()).filter(r => projIds.indexOf(r['Project_ID']) >= 0);
  const files = norm(sheet('ClientFiles').getDataRange().getValues()).filter(r => projIds.indexOf(r['Project_ID']) >= 0);

  return response({
    status: 'ok',
    data: {
      access: acc,
      projects: myProjects,
      rab: rab,
      lapDesign: lapDesign,
      lapBuild: lapBuild,
      meetings: meetings,
      invoices: invoices,
      files: files
    }
  });
}

function getClientChat(params) {
  const token = params.token;
  if (!token) return response({ status: 'error', message: 'Token tidak valid' });
  const rows = norm(sheet('ClientChat').getDataRange().getValues());
  const filtered = rows.filter(r => r['Token'] === token);
  if (params.projectId) {
    return response({ status: 'ok', data: filtered.filter(r => r['ProjectId'] === params.projectId || !r['ProjectId']) });
  }
  return response({ status: 'ok', data: filtered });
}

function addClientChat(data) {
  const id = 'CHT-' + nowId();
  sheet('ClientChat').appendRow([
    id, data.token, data.namaKlien || '', data.projectId || '',
    data.pengirim, data.role, data.pesan, nowStr(),
    data.role === 'Klien' ? 'No' : 'Yes'
  ]);
  return response({ status: 'ok', id: id });
}

function markChatRead(data) {
  const sh = sheet('ClientChat');
  const rows = sh.getDataRange().getValues();
  const headers = rows[0];
  const tokenCol = headers.indexOf('Token');
  const readCol = headers.indexOf('DibacaOlehTim');
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][tokenCol] === data.token) {
      sh.getRange(i + 1, readCol + 1).setValue('Yes');
    }
  }
  return response({ status: 'ok' });
}

function addClientFileUpdated(data) {
  const id = 'CLF-' + nowId();
  sheet('ClientFiles').appendRow([
    id, data.projectId, data.namaFile, data.tipeFile,
    data.linkFile, nowStr(), data.keterangan || ''
  ]);
  return response({ status: 'ok', id: id });
}


// ── TASK ASSIGN ──
function addTaskAssign(data) {
  const id = 'TSK-' + nowId();
  sheet('TaskAssign').appendRow([
    id, data.projectId, data.staffNama, data.faseDesign || '',
    data.tanggalMulai, data.tanggalSelesai,
    data.durasi || '', data.status || 'Belum mulai',
    data.assignedBy, nowStr(),
    data.parentId || '',           // Parent_ID
    data.urutanSegment || 1,       // UrutanSegment
    '',                            // PausedAt
    ''                             // PauseReason
  ]);
  return response({ status: 'ok', id });
}

function getTaskAssign(params) {
  const rows = norm(sheet('TaskAssign').getDataRange().getValues());
  if (params && params.staffNama) {
    return response({ status: 'ok', data: rows.filter(r => r['StaffNama'] === params.staffNama) });
  }
  if (params && params.projectId) {
    return response({ status: 'ok', data: rows.filter(r => r['Project_ID'] === params.projectId) });
  }
  return response({ status: 'ok', data: rows });
}

function updateTaskAssign(data) {
  updateCols('TaskAssign', data.id, {
    StaffNama: data.staffNama,
    FaseDesign: data.faseDesign || '',
    TanggalMulai: data.tanggalMulai,
    TanggalSelesai: data.tanggalSelesai,
    Durasi: data.durasi || '',
    Status: data.status || 'Belum mulai'
  });
  return response({ status: 'ok' });
}

function updateTaskStatus(data) {
  updateCols('TaskAssign', data.id, { Status: data.status });
  return response({ status: 'ok' });
}

function deleteTaskAssign(data) {
  const sh = sheet('TaskAssign');
  const rows = sh.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][0]) === String(data.id)) { sh.deleteRow(i + 1); break; }
  }
  return response({ status: 'ok' });
}

// ── PAUSE & SPLIT TASK ──
function pauseTaskAssign(data) {
  const sh = sheet('TaskAssign');
  const rows = sh.getDataRange().getValues();
  const headers = rows[0];

  let oldTask = null;
  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][0]) === String(data.id)) {
      oldTask = {};
      headers.forEach((h, idx) => oldTask[h] = rows[i][idx]);
      break;
    }
  }
  if (!oldTask) return response({ status: 'error', message: 'Tugas tidak ditemukan' });

  const curStatus = String(oldTask['Status']);
  if (curStatus === 'Paused') return response({ status: 'error', message: 'Tugas ini sudah dalam status Paused' });
  if (curStatus === 'Selesai') return response({ status: 'error', message: 'Tugas yang sudah Selesai tidak bisa di-pause' });

  const tglPauseStr = String(data.tanggalPause).substring(0, 10);
  const tglResumeStr = String(data.tanggalResume).substring(0, 10);
  const tglSelesaiOld = formatDateOnly(oldTask['TanggalSelesai']);
  const tglMulaiOld = formatDateOnly(oldTask['TanggalMulai']);

  if (diffDaysISO(tglPauseStr, tglResumeStr) <= 0) {
    return response({ status: 'error', message: 'Tanggal resume harus setelah tanggal pause' });
  }
  if (diffDaysISO(tglMulaiOld, tglPauseStr) < 0) {
    return response({ status: 'error', message: 'Tanggal pause tidak boleh sebelum tanggal mulai tugas' });
  }
  if (diffDaysISO(tglPauseStr, tglSelesaiOld) < 0) {
    return response({ status: 'error', message: 'Tanggal pause tidak boleh setelah tanggal selesai tugas' });
  }

  const sisaHari = Math.max(1, diffDaysISO(tglPauseStr, tglSelesaiOld) + 1);
  const durasiLama = Math.max(1, diffDaysISO(tglMulaiOld, tglPauseStr) + 1);
  const tglSelesaiBaru = addDaysISO(tglResumeStr, sisaHari - 1);
  const parentId = oldTask['Parent_ID'] ? String(oldTask['Parent_ID']) : String(oldTask['ID']);
  const newUrut = (parseFloat(oldTask['UrutanSegment']) || 1) + 1;

  // 1) Update tugas lama: status Paused, TanggalSelesai jadi tglPause, simpan alasan
  updateCols('TaskAssign', data.id, {
    Status: 'Paused',
    TanggalSelesai: tglPauseStr,
    Durasi: durasiLama,
    PausedAt: nowStr(),
    PauseReason: data.alasan || ''
  });

  // 2) Buat segment baru sebagai lanjutan
  const newId = 'TSK-' + nowId();
  sh.appendRow([
    newId,
    String(oldTask['Project_ID']),
    String(oldTask['StaffNama']),
    String(oldTask['FaseDesign']),
    tglResumeStr,
    tglSelesaiBaru,
    sisaHari,
    'Belum mulai',
    String(oldTask['AssignedBy']),
    nowStr(),
    parentId,
    newUrut,
    '',
    ''
  ]);

  return response({ status: 'ok', newId: newId, sisaHari: sisaHari, parentId: parentId });
}

function formatDateOnly(val) {
  if (!val) return '';
  if (val instanceof Date) return Utilities.formatDate(val, 'Asia/Jakarta', 'yyyy-MM-dd');
  return String(val).substring(0, 10);
}

function diffDaysISO(d1, d2) {
  const [y1, m1, dd1] = d1.split('-').map(Number);
  const [y2, m2, dd2] = d2.split('-').map(Number);
  return Math.round((Date.UTC(y2, m2 - 1, dd2) - Date.UTC(y1, m1 - 1, dd1)) / 86400000);
}

function addDaysISO(d, n) {
  const [y, m, dd] = d.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, dd));
  dt.setUTCDate(dt.getUTCDate() + n);
  return dt.toISOString().substring(0, 10);
}

