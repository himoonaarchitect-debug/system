// ============================================================
// MOONA SYSTEM v2 — Apps Script
// ============================================================

function doPost(e) {
  var data = {}, action = '';
  try {
    data = JSON.parse(e.postData.contents);
    action = data.action;
    var res = dispatchPost(action, data);
    logActivity(data.actorId, data.actorRole, action, data.id || '', 'ok', '');
    return res;
  } catch (err) {
    logActivity((data && data.actorId) || '', (data && data.actorRole) || '', action, (data && data.id) || '', 'error', err.toString());
    return response({ status: 'error', message: err.toString() });
  }
}

function dispatchPost(action, data) {
    // AUTH
    if (action === 'addUser') return addUser(data);
    if (action === 'updateUser') return updateUser(data);
    if (action === 'setUserActive') return setUserActive(data);
    if (action === 'resetPassword') return resetPassword(data);
    if (action === 'saveRoleAccess') return saveRoleAccess(data);
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

    if (action === 'addAsset') return addAsset(data);
    if (action === 'updateAsset') return updateAsset(data);
    if (action === 'deleteAsset') return deleteAsset(data);
    if (action === 'addAgenda') return addAgenda(data);
    if (action === 'updateAgenda') return updateAgenda(data);
    if (action === 'deleteAgenda') return deleteAgenda(data);
    return response({ status: 'error', message: 'Action tidak dikenal: ' + action });
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
  if (action === 'getAssets') return getAssets();
  if (action === 'getAssetAgenda') return getAssetAgenda();
  if (action === 'getActivityLog') return getActivityLog(e.parameter);
  if (action === 'getActivityRecap') return getActivityRecap(e.parameter);
  if (action === 'getAccessMap') return getAccessMap();
  if (action === 'getAllUsers') return getAllUsers();
  // ── PLAYBOOK MODULE ──
  if (action === 'getPlaybooks')      return getPlaybooks();
  if (action === 'getPlaybookDetail') return getPlaybookDetail(e.parameter);
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
      logActivity(id, role, 'login', '', 'ok', '');
      return response({ status: 'ok', id, nama, username, role, jobTitle: String(jobTitle || ''), access: getAccessForRole(role) });
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
  if (data.nama !== undefined) updates['Nama'] = data.nama;
  if (data.wa !== undefined) updates['NoWA'] = data.wa;
  if (data.sumber !== undefined) updates['Sumber'] = data.sumber;
  if (data.layanan !== undefined) updates['TipeLayanan'] = data.layanan;
  if (data.proyek !== undefined) updates['TipeProyek'] = data.proyek;
  if (data.tglMasuk !== undefined) updates['TanggalMasuk'] = data.tglMasuk;
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


// ════════════════════════════════════════════════════
// MODUL ASET — Fase 1 (Register). AssetAgenda di-seed untuk Fase 2.
// ════════════════════════════════════════════════════

// Jalankan SEKALI dari editor Apps Script untuk membuat sheet.
function setupAssetSheets() {
  const ssx = ss();
  if (!ssx.getSheetByName('Assets')) {
    const sh = ssx.insertSheet('Assets');
    sh.appendRow(['ID','KodeAset','NamaAset','Kategori','Lokasi','LokasiProyek_ID','PenanggungJawab_ID','Kondisi','Status','Catatan','TanggalBeli','NilaiBeli','UmurEkonomisTahun','NilaiResidu','CreatedAt']);
    sh.setFrozenRows(1);
  }
  if (!ssx.getSheetByName('AssetAgenda')) {
    const sh2 = ssx.insertSheet('AssetAgenda');
    sh2.appendRow(['ID','Asset_ID','JenisAgenda','Judul','TanggalJatuhTempo','Status','TanggalSelesai','Biaya','UlangTiap','PIC_ID','Catatan','CreatedAt']);
    sh2.setFrozenRows(1);
  }
  return 'Sheet Assets & AssetAgenda siap.';
}

function getAssets() {
  return response({ status: 'ok', data: norm(sheet('Assets').getDataRange().getValues()) });
}

function addAsset(data) {
  const s = sheet('Assets');
  const id = 'AST-' + nowId();
  s.appendRow([
    id, data.kode || '', data.nama, data.kategori, data.lokasi,
    data.lokasiProyekId || '', data.pjId || '', data.kondisi || 'Baik', data.status || 'Aktif', data.catatan || '',
    data.tglBeli || '', data.nilaiBeli || '', data.umur || '', data.residu || '', nowStr()
  ]);
  return response({ status: 'ok', id });
}

function updateAsset(data) {
  const map = {
    kode: 'KodeAset', nama: 'NamaAset', kategori: 'Kategori', lokasi: 'Lokasi',
    lokasiProyekId: 'LokasiProyek_ID', pjId: 'PenanggungJawab_ID', kondisi: 'Kondisi', status: 'Status',
    catatan: 'Catatan', tglBeli: 'TanggalBeli', nilaiBeli: 'NilaiBeli', umur: 'UmurEkonomisTahun', residu: 'NilaiResidu'
  };
  const updates = {};
  Object.keys(map).forEach(k => { if (data[k] !== undefined) updates[map[k]] = data[k]; });
  updateCols('Assets', data.id, updates);
  return response({ status: 'ok' });
}

function deleteAsset(data) {
  const id = data.id;
  if (!id) return response({ status: 'error', message: 'Asset ID kosong.' });
  const summary = { agenda: 0, asset: 0 };
  summary.agenda = deleteRowsByCol('AssetAgenda', 'Asset_ID', id); // cascade (Fase 2)
  summary.asset = deleteRowsByCol('Assets', 'ID', id);
  return response({ status: 'ok', summary });
}

// ── MODUL ASET — Fase 2 (Agenda & Pengingat) ──
function getAssetAgenda() {
  return response({ status: 'ok', data: norm(sheet('AssetAgenda').getDataRange().getValues()) });
}

function addAgenda(data) {
  const s = sheet('AssetAgenda');
  const id = 'AGN-' + nowId();
  s.appendRow([
    id, data.assetId, data.jenis, data.judul, data.jatuhTempo,
    data.status || 'Terjadwal', data.tglSelesai || '', data.biaya || '', data.ulangTiap || '', data.picId || '', data.catatan || '', nowStr()
  ]);
  return response({ status: 'ok', id });
}

function updateAgenda(data) {
  const map = {
    assetId: 'Asset_ID', jenis: 'JenisAgenda', judul: 'Judul', jatuhTempo: 'TanggalJatuhTempo',
    status: 'Status', tglSelesai: 'TanggalSelesai', biaya: 'Biaya', ulangTiap: 'UlangTiap', picId: 'PIC_ID', catatan: 'Catatan'
  };
  const updates = {};
  Object.keys(map).forEach(k => { if (data[k] !== undefined) updates[map[k]] = data[k]; });
  updateCols('AssetAgenda', data.id, updates);
  // Recurrence: kalau ditandai Selesai & punya UlangTiap → otomatis buat agenda berikutnya
  if (data.status === 'Selesai') {
    const row = findRowObj('AssetAgenda', data.id);
    if (row && row['UlangTiap'] && row['UlangTiap'] !== 'Tidak berulang') {
      const nextDue = addInterval(row['TanggalJatuhTempo'], row['UlangTiap']);
      if (nextDue) {
        sheet('AssetAgenda').appendRow([
          'AGN-' + nowId(), row['Asset_ID'], row['JenisAgenda'], row['Judul'], nextDue,
          'Terjadwal', '', '', row['UlangTiap'], row['PIC_ID'], row['Catatan'], nowStr()
        ]);
      }
    }
  }
  return response({ status: 'ok' });
}

function deleteAgenda(data) {
  if (!data.id) return response({ status: 'error', message: 'Agenda ID kosong.' });
  const n = deleteRowsByCol('AssetAgenda', 'ID', data.id);
  return response({ status: 'ok', deleted: n });
}

// Helper: ambil 1 baris sebagai objek by ID
function findRowObj(sheetName, id) {
  const arr = norm(sheet(sheetName).getDataRange().getValues());
  return arr.find(r => String(r['ID']) === String(id)) || null;
}
// Helper: tambah interval ("1 bulan"/"6 bulan"/"1 tahun") ke tanggal YYYY-MM-DD
function addInterval(dateStr, ulang) {
  const mm = String(dateStr || '').match(/^(\d{4})-(\d{2})-(\d{2})/);
  const rep = String(ulang || '').match(/(\d+)\s*(bulan|tahun)/i);
  if (!mm || !rep) return '';
  let y = parseInt(mm[1]), mo = parseInt(mm[2]) - 1, da = parseInt(mm[3]);
  const n = parseInt(rep[1]);
  if (/tahun/i.test(rep[2])) y += n; else mo += n;
  const d = new Date(y, mo, da);
  const MM = String(d.getMonth() + 1).padStart(2, '0'), DD = String(d.getDate()).padStart(2, '0');
  return d.getFullYear() + '-' + MM + '-' + DD;
}

// ════════════════════════════════════════════════════
// MODUL LOG AKTIVITAS (Audit + Rekap)
// ════════════════════════════════════════════════════

// Jalankan SEKALI dari editor untuk membuat sheet.
function setupActivityLog() {
  var ssx = ss();
  if (!ssx.getSheetByName('ActivityLog')) {
    var sh = ssx.insertSheet('ActivityLog');
    sh.appendRow(['ID','Waktu','User_ID','Role','Modul','Aksi','Target_ID','Hasil','Ringkasan']);
    sh.setFrozenRows(1);
  }
  return 'Sheet ActivityLog siap.';
}

// Catat satu kejadian. Aman: error logging tidak boleh mengganggu operasi utama.
function logActivity(actorId, actorRole, action, targetId, result, summary) {
  try {
    if (!action) return;
    var sh = ss().getSheetByName('ActivityLog');
    if (!sh) return; // belum di-setup
    sh.appendRow([
      'LOG-' + nowId(), nowStr(), actorId || '', actorRole || '',
      moduleOf(action), action, targetId || '', result || 'ok', summary || ''
    ]);
  } catch (e) { /* sengaja diabaikan */ }
}

// Turunkan nama modul dari nama action.
function moduleOf(action) {
  var a = String(action || '');
  if (a === 'login') return 'Auth';
  if (a.indexOf('Lead') >= 0 || a.indexOf('FollowUp') >= 0) return 'CRM';
  if (a.indexOf('Project') >= 0 || a.indexOf('RAB') >= 0) return 'Projects';
  if (a.indexOf('LaporanDesign') >= 0) return 'Laporan Design';
  if (a.indexOf('LaporanBuild') >= 0 || a === 'uploadFoto') return 'Laporan Build';
  if (a.indexOf('Meeting') >= 0 || a.indexOf('ActionItem') >= 0 || a.indexOf('ActionStatus') >= 0) return 'Meetings';
  if (a.indexOf('Invoice') >= 0 || a.indexOf('Cashflow') >= 0) return 'Finance';
  if (a.indexOf('Content') >= 0 || a.indexOf('Sosmed') >= 0) return 'Content';
  if (a.indexOf('SOP') >= 0 || a.indexOf('ClientFile') >= 0) return 'SOP & Dokumen';
  if (a.indexOf('Client') >= 0 || a.indexOf('Chat') >= 0) return 'Client Portal';
  if (a.indexOf('Task') >= 0) return 'Tasks';
  if (a.indexOf('Asset') >= 0 || a.indexOf('Agenda') >= 0) return 'Aset';
  if (a.indexOf('User') >= 0) return 'Auth';
  if (a.indexOf('Playbook') >= 0) return 'Playbook';
  return 'Lainnya';
}

// FASE 2 — Audit: kembalikan log (terbaru dulu, dibatasi).
function getActivityLog(params) {
  var sh = ss().getSheetByName('ActivityLog');
  if (!sh) return response({ status: 'ok', data: [] });
  var data = norm(sh.getDataRange().getValues());
  data.reverse(); // terbaru dulu
  var limit = (params && params.limit) ? parseInt(params.limit) : 1500;
  if (data.length > limit) data = data.slice(0, limit);
  return response({ status: 'ok', data: data });
}

// FASE 3 — Rekap: agregasi dihitung di server.
function getActivityRecap(params) {
  var sh = ss().getSheetByName('ActivityLog');
  if (!sh) return response({ status: 'ok', data: { perModul: {}, perUser: [], perDay: {}, total: 0 } });
  var rows = norm(sh.getDataRange().getValues());

  // nama user dari sheet Users
  var urows = sheet('Users').getDataRange().getValues();
  var nameOf = {};
  for (var i = 1; i < urows.length; i++) {
    nameOf[String(urows[i][0])] = { nama: String(urows[i][1] || ''), role: String(urows[i][4] || '') };
  }

  var perModul = {}, perUserMap = {}, perDay = {};
  rows.forEach(function (r) {
    var modul = r['Modul'] || 'Lainnya';
    perModul[modul] = (perModul[modul] || 0) + 1;

    var uid = r['User_ID'] || '(tak diketahui)';
    if (!perUserMap[uid]) {
      perUserMap[uid] = {
        userId: uid,
        nama: nameOf[uid] ? nameOf[uid].nama : uid,
        role: r['Role'] || (nameOf[uid] ? nameOf[uid].role : ''),
        total: 0, write: 0, login: 0, lastActive: ''
      };
    }
    var u = perUserMap[uid];
    u.total++;
    if (r['Aksi'] === 'login') u.login++; else u.write++;
    u.lastActive = r['Waktu']; // rows urut append → yang terakhir = paling baru

    var d = isoDay(r['Waktu']);
    if (d) perDay[d] = (perDay[d] || 0) + 1;
  });

  var perUser = Object.keys(perUserMap).map(function (k) { return perUserMap[k]; })
    .sort(function (a, b) { return b.total - a.total; });

  return response({ status: 'ok', data: { perModul: perModul, perUser: perUser, perDay: perDay, total: rows.length } });
}

// Normalisasi tanggal lokal "D/M/YYYY, ..." → "YYYY-MM-DD" (untuk grouping & sort)
function isoDay(waktu) {
  var m = String(waktu || '').match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (!m) return '';
  return m[3] + '-' + ('0' + m[2]).slice(-2) + '-' + ('0' + m[1]).slice(-2);
}

// ════════════════════════════════════════════════════
// MODUL USER MANAGEMENT (RoleAccess + User CRUD)
// ════════════════════════════════════════════════════

// Jalankan SEKALI dari editor. Seed = persis MOONA_ACCESS sekarang (akses tidak berubah hari pertama).
function setupRoleAccess() {
  var ssx = ss();
  var sh = ssx.getSheetByName('RoleAccess');
  if (!sh) {
    sh = ssx.insertSheet('RoleAccess');
    sh.appendRow(['Role', 'DefaultModule', 'Modules', 'Aktif']);
    sh.setFrozenRows(1);
    var seed = [
      ['Owner', 'moona-v2-dashboard.html', 'dashboard,crm,client-portal,projects,laporan-design,laporan-build,aset,meetings,finance,content,sop,activity,usermgmt', 'TRUE'],
      ['OperasionalManager', 'moona-v2-dashboard.html', 'dashboard,crm,client-portal,projects,laporan-design,laporan-build,aset,meetings,finance,sop,activity', 'TRUE'],
      ['StudioHead', 'moona-v2-dashboard.html', 'dashboard,client-portal,projects,laporan-design,laporan-build,aset,meetings,sop', 'TRUE'],
      ['Designer', 'moona-v2-laporan-design-v4.html', 'dashboard,laporan-design,laporan-build,meetings,sop', 'TRUE'],
      ['Estimator', 'moona-v2-projects.html', 'dashboard,projects,laporan-design,laporan-build,meetings,sop', 'TRUE'],
      ['SiteEngineer', 'moona-v2-laporan-build-v4.html', 'dashboard,laporan-design,laporan-build,aset,meetings,sop', 'TRUE'],
      ['Sales', 'moona-v2-crm.html', 'dashboard,crm,client-portal,projects,meetings,sop', 'TRUE'],
      ['Marketing', 'moona-v2-content.html', 'dashboard,crm,client-portal,content,meetings,sop', 'TRUE'],
      ['Finance', 'moona-v2-finance.html', 'dashboard,client-portal,aset,finance,meetings,sop', 'TRUE']
    ];
    seed.forEach(function (r) { sh.appendRow(r); });
  }
  return 'Sheet RoleAccess siap.';
}

// Akses 1 role → {modules:[...], default:'file'} ; null kalau tak ada.
function getAccessForRole(role) {
  try {
    var sh = ss().getSheetByName('RoleAccess');
    if (!sh) return null;
    var vals = sh.getDataRange().getValues();
    for (var i = 1; i < vals.length; i++) {
      if (String(vals[i][0]).trim() === String(role).trim()) {
        if (String(vals[i][3]).trim().toUpperCase() === 'FALSE') return null;
        var toks = String(vals[i][2] || '').split(',').map(function (x) { return x.trim(); }).filter(function (x) { return x; });
        var mods = [], levels = {};
        toks.forEach(function (t) { var p = t.split(':'); var k = p[0].trim(); if (k) { mods.push(k); levels[k] = (p[1] || 'manage').trim(); } });
        return { modules: mods, levels: levels, default: String(vals[i][1] || 'moona-v2-dashboard.html') };
      }
    }
    return null;
  } catch (e) { return null; }
}

// Seluruh matriks untuk UI.
function getAccessMap() {
  var sh = ss().getSheetByName('RoleAccess');
  if (!sh) return response({ status: 'ok', data: [] });
  var vals = sh.getDataRange().getValues();
  var out = [];
  for (var i = 1; i < vals.length; i++) {
    if (!vals[i][0]) continue;
    var toks = String(vals[i][2] || '').split(',').map(function (x) { return x.trim(); }).filter(function (x) { return x; });
    var mods = [], levels = {};
    toks.forEach(function (t) { var p = t.split(':'); var k = p[0].trim(); if (k) { mods.push(k); levels[k] = (p[1] || 'manage').trim(); } });
    out.push({
      role: String(vals[i][0]),
      defaultModule: String(vals[i][1] || ''),
      modules: mods,
      levels: levels,
      aktif: String(vals[i][3]).trim().toUpperCase() !== 'FALSE'
    });
  }
  return response({ status: 'ok', data: out });
}

// Simpan akses 1 role (update / insert).
function saveRoleAccess(data) {
  var sh = ss().getSheetByName('RoleAccess');
  if (!sh) return response({ status: 'error', message: 'Sheet RoleAccess belum ada' });
  var mods = Array.isArray(data.modules) ? data.modules.join(',') : String(data.modules || '');
  var def = data.defaultModule || 'moona-v2-dashboard.html';
  var vals = sh.getDataRange().getValues();
  for (var i = 1; i < vals.length; i++) {
    if (String(vals[i][0]).trim() === String(data.role).trim()) {
      sh.getRange(i + 1, 2).setValue(def);
      sh.getRange(i + 1, 3).setValue(mods);
      return response({ status: 'ok' });
    }
  }
  sh.appendRow([data.role, def, mods, 'TRUE']);
  return response({ status: 'ok' });
}

// --- User CRUD (index-based; kolom: 1=ID 2=Nama 3=Username 4=Password 5=Role 6=Aktif 7=JobTitle) ---
function findUserRow_(id) {
  var sh = sheet('Users');
  var vals = sh.getDataRange().getValues();
  for (var i = 1; i < vals.length; i++) {
    if (String(vals[i][0]) === String(id)) return { sh: sh, row: i + 1 };
  }
  return null;
}
function updateUser(data) {
  var r = findUserRow_(data.id);
  if (!r) return response({ status: 'error', message: 'User tidak ditemukan' });
  if (data.nama !== undefined) r.sh.getRange(r.row, 2).setValue(data.nama);
  if (data.username !== undefined) r.sh.getRange(r.row, 3).setValue(data.username);
  if (data.role !== undefined) r.sh.getRange(r.row, 5).setValue(data.role);
  if (data.jobTitle !== undefined) r.sh.getRange(r.row, 7).setValue(data.jobTitle);
  return response({ status: 'ok' });
}
function setUserActive(data) {
  var r = findUserRow_(data.id);
  if (!r) return response({ status: 'error', message: 'User tidak ditemukan' });
  var v = (data.aktif === true || String(data.aktif).toUpperCase() === 'TRUE') ? 'TRUE' : 'FALSE';
  r.sh.getRange(r.row, 6).setValue(v);
  return response({ status: 'ok' });
}
function resetPassword(data) {
  var r = findUserRow_(data.id);
  if (!r) return response({ status: 'error', message: 'User tidak ditemukan' });
  r.sh.getRange(r.row, 4).setValue(data.password || '');
  return response({ status: 'ok' });
}

// Semua user (termasuk nonaktif) + field lengkap untuk modul User Management. Password tidak diekspos.
function getAllUsers() {
  var rows = sheet('Users').getDataRange().getValues();
  var out = [];
  for (var i = 1; i < rows.length; i++) {
    if (!rows[i][0]) continue;
    out.push({
      id: String(rows[i][0]), nama: String(rows[i][1]), username: String(rows[i][2]),
      role: String(rows[i][4]), aktif: String(rows[i][5]).trim().toUpperCase() === 'TRUE',
      jobTitle: String(rows[i][6] || '')
    });
  }
  return response({ status: 'ok', data: out });
}

// Jalankan SEKALI dari editor untuk menulis ulang RoleAccess dengan level (key:level).
// MENIMPA isi RoleAccess. Aman dijalankan karena belum ada kustomisasi.
function reseedRoleAccessLevels() {
  var ssx = ss();
  var sh = ssx.getSheetByName('RoleAccess');
  if (!sh) { sh = ssx.insertSheet('RoleAccess'); }
  sh.clear();
  sh.appendRow(['Role', 'DefaultModule', 'Modules', 'Aktif']);
  sh.setFrozenRows(1);
  var seed = [
    ['Owner', 'moona-v2-dashboard.html', 'dashboard:manage,crm:manage,client-portal:manage,projects:manage,laporan-design:manage,laporan-build:manage,aset:manage,meetings:manage,finance:manage,content:manage,sop:manage,activity:manage,usermgmt:manage', 'TRUE'],
    ['OperasionalManager', 'moona-v2-dashboard.html', 'dashboard:manage,crm:manage,client-portal:manage,projects:manage,laporan-design:manage,laporan-build:manage,aset:manage,meetings:manage,finance:manage,sop:manage,activity:manage', 'TRUE'],
    ['StudioHead', 'moona-v2-dashboard.html', 'dashboard:manage,client-portal:manage,projects:manage,laporan-design:manage,laporan-build:manage,aset:view,meetings:manage,sop:manage', 'TRUE'],
    ['Designer', 'moona-v2-laporan-design-v4.html', 'dashboard:manage,laporan-design:manage,laporan-build:manage,meetings:manage,sop:manage', 'TRUE'],
    ['Estimator', 'moona-v2-projects.html', 'dashboard:manage,projects:manage,laporan-design:manage,laporan-build:manage,meetings:manage,sop:manage', 'TRUE'],
    ['SiteEngineer', 'moona-v2-laporan-build-v4.html', 'dashboard:manage,laporan-design:manage,laporan-build:manage,aset:view,meetings:manage,sop:manage', 'TRUE'],
    ['Sales', 'moona-v2-crm.html', 'dashboard:manage,crm:manage,client-portal:manage,projects:manage,meetings:manage,sop:manage', 'TRUE'],
    ['Marketing', 'moona-v2-content.html', 'dashboard:manage,crm:view,client-portal:manage,content:manage,meetings:manage,sop:manage', 'TRUE'],
    ['Finance', 'moona-v2-finance.html', 'dashboard:manage,client-portal:manage,aset:view,finance:manage,meetings:manage,sop:manage', 'TRUE']
  ];
  seed.forEach(function (r) { sh.appendRow(r); });
  return 'RoleAccess ditulis ulang dengan level.';
}


// ─── PLAYBOOK SETUP & SEED ───────────────────────────────────

function setupPlaybookSheets() {
  var ssx = ss();
  var sheets = [
    { name: 'Playbooks',          headers: ['ID','NamaPlaybook','Versi','Layanan','TanggalTerbit','Status','Pengantar','CaraBaca'] },
    { name: 'PlaybookKebijakan',  headers: ['ID','Playbook_ID','Urutan','Judul','Deskripsi'] },
    { name: 'PlaybookFase',       headers: ['ID','Playbook_ID','Nomor','Eyebrow','Nama','Lede','SVG','CRMStage'] },
    { name: 'PlaybookAktivitas',  headers: ['ID','Playbook_ID','Fase_ID','Kode','Nama','Lane','Pemilik','SOPInduk_Kode','IK_Kode','Gelombang','Urutan','CRMStage'] },
    { name: 'PlaybookGate',       headers: ['ID','Playbook_ID','Kode','Nama','Subtitle','Owner','Checklist','Urutan'] },
    { name: 'PlaybookSOPItem',    headers: ['ID','Playbook_ID','Kode','Nama','Jenis','Pemilik','Status','DipanggilDi','Dok_ID','Urutan'] },
    { name: 'PlaybookDiskusi',    headers: ['ID','Playbook_ID','Tipe','Urutan','Judul','Deskripsi','RefKode'] },
    { name: 'PlaybookChangelog',  headers: ['ID','Playbook_ID','Versi','Urutan','Ringkasan'] }
  ];
  var created = [], exist = [];
  sheets.forEach(function(spec){
    var sh = ssx.getSheetByName(spec.name);
    if (sh) { exist.push(spec.name); return; }
    sh = ssx.insertSheet(spec.name);
    sh.appendRow(spec.headers);
    sh.setFrozenRows(1);
    created.push(spec.name);
  });
  return 'Created: ' + (created.length ? created.join(', ') : '(none)') + ' | Already exist: ' + (exist.length ? exist.join(', ') : '(none)');
}

// Tambah module 'playbook' ke RoleAccess untuk role-role yang butuh.
// Default: Owner, OperasionalManager, StudioHead → manage. Sales, Designer, Estimator, SiteEngineer, Marketing, Finance → manage (read-only di praktiknya).
// Aman dijalankan berulang kali — kalau sudah ada, di-skip.
function grantPlaybookAccess() {
  var sh = ss().getSheetByName('RoleAccess');
  if (!sh) return 'Sheet RoleAccess belum ada — jalankan setupRoleAccess() dulu.';
  var vals = sh.getDataRange().getValues();
  var changes = [];
  for (var i = 1; i < vals.length; i++) {
    var role = String(vals[i][0] || '').trim();
    if (!role) continue;
    var modules = String(vals[i][2] || '');
    var toks = modules.split(',').map(function(x){return x.trim();}).filter(function(x){return x;});
    var keys = toks.map(function(t){ return t.split(':')[0].trim(); });
    if (keys.indexOf('playbook') >= 0) continue; // sudah ada
    // Tambahkan 'playbook' (level default — manage)
    toks.push('playbook');
    sh.getRange(i + 1, 3).setValue(toks.join(','));
    changes.push(role);
  }
  return changes.length ? ('Added playbook access to: ' + changes.join(', ')) : 'Semua role sudah punya akses playbook.';
}

// Dangerous: wipe semua data playbook (kecuali RoleAccess). Untuk reseed.
function wipePlaybookData() {
  var names = ['Playbooks','PlaybookKebijakan','PlaybookFase','PlaybookAktivitas','PlaybookGate','PlaybookSOPItem','PlaybookDiskusi','PlaybookChangelog'];
  var wiped = [];
  names.forEach(function(n){
    var sh = ss().getSheetByName(n);
    if (!sh) return;
    var last = sh.getLastRow();
    if (last > 1) {
      sh.getRange(2, 1, last - 1, sh.getLastColumn()).clearContent();
      wiped.push(n);
    }
  });
  return 'Wiped data rows in: ' + wiped.join(', ');
}

// ─── PLAYBOOK GETTERS (frontend API) ─────────────────────────

// List semua playbook (metadata saja, untuk switcher).
function getPlaybooks() {
  var sh = ss().getSheetByName('Playbooks');
  if (!sh) return response({ status: 'ok', data: [] });
  return response({ status: 'ok', data: norm(sh.getDataRange().getValues()) });
}

// Detail lengkap 1 playbook (semua tab join). Params: ?id=PB-xxx atau ?layanan=Interior
function getPlaybookDetail(params) {
  var pid = String(params.id || '').trim();
  var layanan = String(params.layanan || '').trim();
  // Resolve playbook id
  var pbSh = ss().getSheetByName('Playbooks');
  if (!pbSh) return response({ status: 'error', message: 'Sheet Playbooks belum ada' });
  var playbooks = norm(pbSh.getDataRange().getValues());
  var pb = null;
  if (pid) {
    for (var i = 0; i < playbooks.length; i++) { if (playbooks[i]['ID'] === pid) { pb = playbooks[i]; break; } }
  } else if (layanan) {
    for (var j = 0; j < playbooks.length; j++) { if (String(playbooks[j]['Layanan']).toLowerCase() === layanan.toLowerCase()) { pb = playbooks[j]; break; } }
  } else if (playbooks.length) {
    pb = playbooks[0]; // default: first
  }
  if (!pb) return response({ status: 'error', message: 'Playbook tidak ditemukan' });
  pid = pb['ID'];

  function rowsFor(name) {
    var sh = ss().getSheetByName(name);
    if (!sh) return [];
    return norm(sh.getDataRange().getValues()).filter(function(r){ return r['Playbook_ID'] === pid; });
  }
  function sortByUrutan(a, b) {
    return (parseInt(a['Urutan']) || 0) - (parseInt(b['Urutan']) || 0);
  }

  return response({ status: 'ok', data: {
    playbook:    pb,
    kebijakan:   rowsFor('PlaybookKebijakan').sort(sortByUrutan),
    fase:        rowsFor('PlaybookFase').sort(function(a,b){ return (parseInt(a['Nomor'])||0) - (parseInt(b['Nomor'])||0); }),
    aktivitas:   rowsFor('PlaybookAktivitas').sort(sortByUrutan),
    gate:        rowsFor('PlaybookGate').sort(sortByUrutan),
    sop:         rowsFor('PlaybookSOPItem').sort(sortByUrutan),
    diskusi:     rowsFor('PlaybookDiskusi').sort(sortByUrutan),
    changelog:   rowsFor('PlaybookChangelog').sort(sortByUrutan)
  } });
}


// ─── SEEDER: Peta Sistem Interior v2.2 ──────────────────────
//
// Idempotent partial: kalau Playbooks sudah punya entry layanan='Interior',
// fungsi ini akan tolak (untuk safety). Pakai wipePlaybookData() kalau mau reseed.
function seedPlaybook_Interior_v2_2() {
  var pbSh = sheet('Playbooks');
  if (!pbSh) return 'Sheet Playbooks belum ada — jalankan setupPlaybookSheets() dulu.';
  // Cek duplikat
  var existing = norm(pbSh.getDataRange().getValues());
  for (var e = 0; e < existing.length; e++) {
    if (String(existing[e]['Layanan']).toLowerCase() === 'interior') {
      return 'Playbook layanan Interior sudah ada (' + existing[e]['ID'] + '). Hapus dulu atau pakai wipePlaybookData().';
    }
  }

  var PID = 'PB-INT';  // fixed ID untuk Peta Interior — mudah di-reference

  // ── 1. PLAYBOOK METADATA ──
  pbSh.appendRow([
    PID,
    'Peta Sistem Operasional — Layanan Interior',
    'v2.2',
    'Interior',
    'Juni 2026',
    'Locked',
    'Peta sistem operasional untuk semua project layanan interior Moona. Dokumen ini menjadi guideline tim — bukan sekadar referensi, tapi sumber kebenaran untuk siapa-melakukan-apa-kapan. Tiga lapis dokumen: Peta (helikopter, dokumen ini) → SOP (proses lintas peran per fase) → IK (cara satu orang mengerjakan satu kotak, langkah demi langkah).',
    'Alur dibaca dari atas ke bawah. Setiap kolom (lane) adalah satu peran — kotak di kolom itu berarti tugasnya peran tersebut. Panah lintas kolom = serah terima antar divisi. Tiap kotak biru memikul dua kode — SOP induk & IK. Peta hanya memuat hal yang berlaku untuk semua project; variasi per-project (jumlah tahap desain, jenis kanal komunikasi) hidup di dalam SOP.'
  ]);

  // ── 2. KEBIJAKAN KUNCI ──
  var kebSh = sheet('PlaybookKebijakan');
  var kebijakan = [
    ['Respon lead < 2 jam',            'SLA first response oleh Account Manager.'],
    ['Survey wajib',                   'Tidak ada jalur tanpa survey untuk project interior.'],
    ['Biaya survey deductible',        'Dipotong dari nilai kontrak saat deal — bukan hangus.'],
    ['No-addendum',                    'Harga kontrak terkunci. Konsekuensinya: RAB wajib akurat sebelum kontrak.'],
    ['RAB oleh Estimator',             'Penyusunan RAB dipegang Hilmi (Estimator & Cost Control), bukan Manops.'],
    ['Handover Sales → Ops di Gate 1', 'Brief signed adalah dokumen serah terimanya.'],
    ['Desain bertahap, approval per tahap', 'Jumlah tahap mengikuti scope project; presisi RAB naik tiap tahap; effort render selalu di tahap belakang.'],
    ['Termin cair sebelum instalasi',  'Barang tidak keluar workshop sebelum pembayaran termin masuk.'],
    ['QC workshop 3 lapis = gate uang','Lolos berurut SE → Arsitek → Manops baru termin ditagih. Manops pemegang sign-off final.'],
    ['Walkthrough & BAST satu aktivitas', 'Punch list harus nol baru BAST diteken; BAST memicu pelunasan. Punch list hanya cacat-vs-scope, bukan permintaan baru.']
  ];
  kebijakan.forEach(function(k, i){
    kebSh.appendRow(['KEB-INT-' + (i+1), PID, i+1, k[0], k[1]]);
  });

  // ── 3. FASE (dengan SVG snapshot) ──
  var fsSh = sheet('PlaybookFase');
  var faseData = [
    {
      no: 1,
      eyebrow: 'Fase 1 · Akuisisi',
      nama: 'Dari lead masuk sampai brief signed',
      lede: 'Lead datang dari dua arah — klien menghubungi (inbound) atau Moona menghubungi (outbound) — keduanya di-fuel konten Marketing di hulu (SOP-MKT-01). Begitu biaya survey cair, Admin Client langsung menyiapkan kanal komunikasi project: grup WA internal, grup WA klien, dan link portal klien di Moona System. Fase ditutup dengan serah terima resmi ke Operasional di Gate 1.',
      svg: `<svg viewBox="0 0 680 790" role="img" xmlns="http://www.w3.org/2000/svg">
  <title>Swimlane Fase 1 Akuisisi v2.2</title>
  <defs><marker id="ar1" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></marker></defs>
  <rect x="16" y="16" width="156" height="32" rx="8" fill="#0C2D5C"/><text class="bt" x="94" y="32" text-anchor="middle" dominant-baseline="central" fill="#FFFFFF">Klien</text>
  <rect x="180" y="16" width="156" height="32" rx="8" fill="#0C2D5C"/><text class="bt" x="258" y="32" text-anchor="middle" dominant-baseline="central" fill="#FFFFFF">Sales</text>
  <rect x="344" y="16" width="156" height="32" rx="8" fill="#0C2D5C"/><text class="bt" x="422" y="32" text-anchor="middle" dominant-baseline="central" fill="#FFFFFF">Studio</text>
  <rect x="508" y="16" width="156" height="32" rx="8" fill="#0C2D5C"/><text class="bt" x="586" y="32" text-anchor="middle" dominant-baseline="central" fill="#FFFFFF">Finance</text>
  <line x1="176" y1="56" x2="176" y2="708" stroke="#D8E3F4" stroke-dasharray="5 5"/>
  <line x1="340" y1="56" x2="340" y2="708" stroke="#D8E3F4" stroke-dasharray="5 5"/>
  <line x1="504" y1="56" x2="504" y2="708" stroke="#D8E3F4" stroke-dasharray="5 5"/>
  <rect x="20" y="70" width="148" height="72" rx="8" fill="#2665D6"/>
  <text class="bt" x="94" y="88" text-anchor="middle" dominant-baseline="central" fill="#FFFFFF">Lead masuk</text>
  <text class="bs" x="94" y="110" text-anchor="middle" dominant-baseline="central" fill="#C3D7F8">klien hubungi /</text>
  <text class="bs" x="94" y="126" text-anchor="middle" dominant-baseline="central" fill="#C3D7F8">Moona hubungi</text>
  <line x1="168" y1="106" x2="184" y2="106" stroke="#0C2D5C" stroke-width="1.5" marker-end="url(#ar1)"/>
  <rect x="184" y="70" width="148" height="72" rx="8" fill="#2665D6"/>
  <text class="bt" x="258" y="88" text-anchor="middle" dominant-baseline="central" fill="#FFFFFF">Capture &amp; tag</text>
  <text class="bs" x="258" y="110" text-anchor="middle" dominant-baseline="central" fill="#C3D7F8">Admin Client</text>
  <text class="bs" x="258" y="126" text-anchor="middle" dominant-baseline="central" fill="#C3D7F8">respon &lt;2 jam (AM)</text>
  <line x1="258" y1="142" x2="258" y2="166" stroke="#0C2D5C" stroke-width="1.5" marker-end="url(#ar1)"/>
  <rect x="184" y="166" width="148" height="72" rx="8" fill="#2665D6"/>
  <text class="bt" x="258" y="184" text-anchor="middle" dominant-baseline="central" fill="#FFFFFF">Konsultasi</text>
  <text class="bs" x="258" y="206" text-anchor="middle" dominant-baseline="central" fill="#C3D7F8">Account Manager</text>
  <text class="bs" x="258" y="222" text-anchor="middle" dominant-baseline="central" fill="#C3D7F8">+ kalkulator</text>
  <line x1="258" y1="238" x2="258" y2="262" stroke="#0C2D5C" stroke-width="1.5" marker-end="url(#ar1)"/>
  <rect x="184" y="262" width="148" height="56" rx="8" fill="#0C2D5C"/>
  <text class="bt" x="258" y="282" text-anchor="middle" dominant-baseline="central" fill="#FFFFFF">Klien lanjut?</text>
  <text class="bs" x="258" y="300" text-anchor="middle" dominant-baseline="central" fill="#9DB7E0">ya ↓ · tidak ←</text>
  <line x1="184" y1="294" x2="168" y2="294" stroke="#0C2D5C" stroke-width="1.5" marker-end="url(#ar1)"/>
  <rect x="20" y="258" width="148" height="72" rx="8" fill="#2B2B28"/>
  <text class="bt" x="94" y="276" text-anchor="middle" dominant-baseline="central" fill="#FFFFFF">Loss leads</text>
  <text class="bs" x="94" y="298" text-anchor="middle" dominant-baseline="central" fill="#BDBBB2">follow-up [AM]</text>
  <text class="bs" x="94" y="314" text-anchor="middle" dominant-baseline="central" fill="#BDBBB2">end · database</text>
  <path d="M258 318 L258 342 L586 342 L586 364" fill="none" stroke="#0C2D5C" stroke-width="1.5" marker-end="url(#ar1)"/>
  <rect x="512" y="364" width="148" height="72" rx="8" fill="#2665D6"/>
  <text class="bt" x="586" y="382" text-anchor="middle" dominant-baseline="central" fill="#FFFFFF">Biaya survey</text>
  <text class="bs" x="586" y="404" text-anchor="middle" dominant-baseline="central" fill="#C3D7F8">Admin Finance</text>
  <text class="bs" x="586" y="420" text-anchor="middle" dominant-baseline="central" fill="#C3D7F8">cair · deductible</text>
  <line x1="586" y1="436" x2="586" y2="456" stroke="#8A6206" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#ar1)"/>
  <rect x="512" y="456" width="148" height="56" rx="8" fill="#E9AE24" stroke="#8A6206" stroke-dasharray="5 4" stroke-width="1.2"/>
  <text class="bt" x="586" y="476" text-anchor="middle" dominant-baseline="central" fill="#3A2A03">SOP penerimaan</text>
  <text class="bs" x="586" y="494" text-anchor="middle" dominant-baseline="central" fill="#5F4607">pembayaran · FIN-01</text>
  <path d="M512 400 L258 400 L258 420" fill="none" stroke="#0C2D5C" stroke-width="1.5" marker-end="url(#ar1)"/>
  <rect x="184" y="420" width="148" height="72" rx="8" fill="#2665D6"/>
  <text class="bt" x="258" y="438" text-anchor="middle" dominant-baseline="central" fill="#FFFFFF">Setup kanal</text>
  <text class="bs" x="258" y="460" text-anchor="middle" dominant-baseline="central" fill="#C3D7F8">Admin Client</text>
  <text class="bs" x="258" y="476" text-anchor="middle" dominant-baseline="central" fill="#C3D7F8">WA + portal klien</text>
  <path d="M258 492 L258 510 L422 510 L422 528" fill="none" stroke="#0C2D5C" stroke-width="1.5" marker-end="url(#ar1)"/>
  <rect x="348" y="528" width="148" height="56" rx="8" fill="#2665D6"/>
  <text class="bt" x="422" y="548" text-anchor="middle" dominant-baseline="central" fill="#FFFFFF">Site survey</text>
  <text class="bs" x="422" y="566" text-anchor="middle" dominant-baseline="central" fill="#C3D7F8">Head of Studio</text>
  <path d="M422 584 L422 602 L258 602 L258 618" fill="none" stroke="#0C2D5C" stroke-width="1.5" marker-end="url(#ar1)"/>
  <rect x="184" y="618" width="148" height="72" rx="8" fill="#2665D6"/>
  <text class="bt" x="258" y="636" text-anchor="middle" dominant-baseline="central" fill="#FFFFFF">Brief detail</text>
  <text class="bs" x="258" y="658" text-anchor="middle" dominant-baseline="central" fill="#C3D7F8">AM + klien ttd</text>
  <text class="bs" x="258" y="674" text-anchor="middle" dominant-baseline="central" fill="#C3D7F8">output: brief fix</text>
  <line x1="258" y1="690" x2="258" y2="718" stroke="#0C2D5C" stroke-width="1.5" marker-end="url(#ar1)"/>
  <rect x="12" y="718" width="656" height="48" rx="8" fill="#E9AE24"/>
  <text class="bt" x="340" y="734" text-anchor="middle" dominant-baseline="central" fill="#3A2A03">Gate 1 — handover Sales → Operasional</text>
  <text class="bs" x="340" y="752" text-anchor="middle" dominant-baseline="central" fill="#5F4607">brief signed · biaya survey cair · kanal komunikasi aktif</text>
  </svg>`
    },
    {
      no: 2,
      eyebrow: 'Fase 2 · Desain',
      nama: 'Dari kickoff desain sampai siap produksi',
      lede: 'Design development berjalan sebagai loop bertahap: jumlah tahap ditentukan di kickoff berdasarkan scope project (kecil 2 tahap, kompleks 3–4 tahap). Empat aturan main di tiap project: (1) Approval tiap tahap — tidak ada tahap berikutnya tanpa persetujuan klien; (2) Presisi RAB naik tiap tahap — dari kisaran ke detail & lock di tahap final; (3) Effort mahal di belakang — render & detailing hanya setelah arah & budget disepakati; (4) Tahap final = siap penawaran — output: desain final + RAB detail.',
      svg: `<svg viewBox="0 0 680 694" role="img" xmlns="http://www.w3.org/2000/svg">
  <title>Swimlane Fase 2 Desain v2.2</title>
  <defs><marker id="ar2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></marker></defs>
  <rect x="16" y="16" width="156" height="32" rx="8" fill="#0C2D5C"/><text class="bt" x="94" y="32" text-anchor="middle" dominant-baseline="central" fill="#FFFFFF">Studio</text>
  <rect x="180" y="16" width="156" height="32" rx="8" fill="#0C2D5C"/><text class="bt" x="258" y="32" text-anchor="middle" dominant-baseline="central" fill="#FFFFFF">Sales &amp; Direktur</text>
  <rect x="344" y="16" width="156" height="32" rx="8" fill="#0C2D5C"/><text class="bt" x="422" y="32" text-anchor="middle" dominant-baseline="central" fill="#FFFFFF">Klien</text>
  <rect x="508" y="16" width="156" height="32" rx="8" fill="#0C2D5C"/><text class="bt" x="586" y="32" text-anchor="middle" dominant-baseline="central" fill="#FFFFFF">Finance</text>
  <line x1="176" y1="56" x2="176" y2="612" stroke="#D8E3F4" stroke-dasharray="5 5"/>
  <line x1="340" y1="56" x2="340" y2="612" stroke="#D8E3F4" stroke-dasharray="5 5"/>
  <line x1="504" y1="56" x2="504" y2="612" stroke="#D8E3F4" stroke-dasharray="5 5"/>
  <rect x="20" y="70" width="148" height="72" rx="8" fill="#2665D6"/>
  <text class="bt" x="94" y="88" text-anchor="middle" dominant-baseline="central" fill="#FFFFFF">Kickoff desain</text>
  <text class="bs" x="94" y="110" text-anchor="middle" dominant-baseline="central" fill="#C3D7F8">tentukan jumlah</text>
  <text class="bs" x="94" y="126" text-anchor="middle" dominant-baseline="central" fill="#C3D7F8">tahap dari scope</text>
  <line x1="94" y1="142" x2="94" y2="166" stroke="#0C2D5C" stroke-width="1.5" marker-end="url(#ar2)"/>
  <rect x="20" y="166" width="148" height="72" rx="8" fill="#2665D6"/>
  <text class="bt" x="94" y="184" text-anchor="middle" dominant-baseline="central" fill="#FFFFFF">Desain tahap-n</text>
  <text class="bs" x="94" y="206" text-anchor="middle" dominant-baseline="central" fill="#C3D7F8">tim studio</text>
  <text class="bs" x="94" y="222" text-anchor="middle" dominant-baseline="central" fill="#C3D7F8">makin detail</text>
  <line x1="94" y1="238" x2="94" y2="262" stroke="#0C2D5C" stroke-width="1.5" marker-end="url(#ar2)"/>
  <rect x="20" y="262" width="148" height="72" rx="8" fill="#2665D6"/>
  <text class="bt" x="94" y="280" text-anchor="middle" dominant-baseline="central" fill="#FFFFFF">RAB tahap-n</text>
  <text class="bs" x="94" y="302" text-anchor="middle" dominant-baseline="central" fill="#C3D7F8">Estimator (Hilmi)</text>
  <text class="bs" x="94" y="318" text-anchor="middle" dominant-baseline="central" fill="#C3D7F8">presisi naik</text>
  <line x1="168" y1="298" x2="184" y2="298" stroke="#0C2D5C" stroke-width="1.5" marker-end="url(#ar2)"/>
  <rect x="184" y="262" width="148" height="72" rx="8" fill="#2665D6"/>
  <text class="bt" x="258" y="280" text-anchor="middle" dominant-baseline="central" fill="#FFFFFF">Presentasi</text>
  <text class="bs" x="258" y="302" text-anchor="middle" dominant-baseline="central" fill="#C3D7F8">desain + RAB</text>
  <text class="bs" x="258" y="318" text-anchor="middle" dominant-baseline="central" fill="#C3D7F8">tahap berjalan</text>
  <line x1="332" y1="298" x2="348" y2="298" stroke="#0C2D5C" stroke-width="1.5" marker-end="url(#ar2)"/>
  <rect x="348" y="262" width="148" height="72" rx="8" fill="#0C2D5C"/>
  <text class="bt" x="422" y="280" text-anchor="middle" dominant-baseline="central" fill="#FFFFFF">Approve tahap?</text>
  <text class="bs" x="422" y="302" text-anchor="middle" dominant-baseline="central" fill="#9DB7E0">tahap final: ↓</text>
  <text class="bs" x="422" y="318" text-anchor="middle" dominant-baseline="central" fill="#9DB7E0">selain itu: ↻</text>
  <path d="M422 262 L422 202 L168 202" fill="none" stroke="#0C2D5C" stroke-width="1.5" marker-end="url(#ar2)"/>
  <text class="bs" x="295" y="188" text-anchor="middle" dominant-baseline="central" fill="#5A6B86">↻ tahap berikut / revisi</text>
  <path d="M422 334 L422 350 L258 350 L258 366" fill="none" stroke="#0C2D5C" stroke-width="1.5" marker-end="url(#ar2)"/>
  <rect x="184" y="366" width="148" height="72" rx="8" fill="#2665D6"/>
  <text class="bt" x="258" y="384" text-anchor="middle" dominant-baseline="central" fill="#FFFFFF">Penawaran</text>
  <text class="bs" x="258" y="406" text-anchor="middle" dominant-baseline="central" fill="#C3D7F8">AM + Direktur</text>
  <text class="bs" x="258" y="422" text-anchor="middle" dominant-baseline="central" fill="#C3D7F8">nego harga</text>
  <line x1="332" y1="402" x2="348" y2="402" stroke="#0C2D5C" stroke-width="1.5" marker-end="url(#ar2)"/>
  <rect x="348" y="366" width="148" height="72" rx="8" fill="#2665D6"/>
  <text class="bt" x="422" y="384" text-anchor="middle" dominant-baseline="central" fill="#FFFFFF">Ttd kontrak</text>
  <text class="bs" x="422" y="406" text-anchor="middle" dominant-baseline="central" fill="#C3D7F8">harga lock</text>
  <text class="bs" x="422" y="422" text-anchor="middle" dominant-baseline="central" fill="#C3D7F8">no-addendum</text>
  <path d="M422 438 L422 458 L586 458 L586 474" fill="none" stroke="#0C2D5C" stroke-width="1.5" marker-end="url(#ar2)"/>
  <rect x="512" y="474" width="148" height="56" rx="8" fill="#2665D6"/>
  <text class="bt" x="586" y="494" text-anchor="middle" dominant-baseline="central" fill="#FFFFFF">DP cair</text>
  <text class="bs" x="586" y="512" text-anchor="middle" dominant-baseline="central" fill="#C3D7F8">Admin Finance</text>
  <line x1="586" y1="530" x2="586" y2="550" stroke="#8A6206" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#ar2)"/>
  <rect x="512" y="550" width="148" height="56" rx="8" fill="#E9AE24" stroke="#8A6206" stroke-dasharray="5 4" stroke-width="1.2"/>
  <text class="bt" x="586" y="570" text-anchor="middle" dominant-baseline="central" fill="#3A2A03">SOP penerimaan</text>
  <text class="bs" x="586" y="588" text-anchor="middle" dominant-baseline="central" fill="#5F4607">pembayaran · FIN-01</text>
  <path d="M512 502 L94 502 L94 526" fill="none" stroke="#0C2D5C" stroke-width="1.5" marker-end="url(#ar2)"/>
  <rect x="20" y="526" width="148" height="72" rx="8" fill="#2665D6"/>
  <text class="bt" x="94" y="544" text-anchor="middle" dominant-baseline="central" fill="#FFFFFF">Gambar kerja</text>
  <text class="bs" x="94" y="566" text-anchor="middle" dominant-baseline="central" fill="#C3D7F8">Drafter + SE</text>
  <text class="bs" x="94" y="582" text-anchor="middle" dominant-baseline="central" fill="#C3D7F8">pengadaan: Manops</text>
  <line x1="94" y1="598" x2="94" y2="622" stroke="#0C2D5C" stroke-width="1.5" marker-end="url(#ar2)"/>
  <rect x="12" y="622" width="656" height="48" rx="8" fill="#E9AE24"/>
  <text class="bt" x="340" y="638" text-anchor="middle" dominant-baseline="central" fill="#3A2A03">Gate 2 — siap produksi</text>
  <text class="bs" x="340" y="656" text-anchor="middle" dominant-baseline="central" fill="#5F4607">kontrak ttd · DP cair · gambar kerja final</text>
  </svg>`
    },
    {
      no: 3,
      eyebrow: 'Fase 3 · Produksi',
      nama: 'Dari pengadaan sampai instalasi tuntas',
      lede: 'Penagihan termin pindah ke setelah produksi workshop, sebelum instalasi site — barang tidak keluar workshop sebelum termin cair. Konsekuensinya QC terjadi dua kali: QC workshop (dasar penagihan termin) dan QC site (syarat Gate 3). QC workshop kini tiga lapis berurut — SE (mutu bangun) → Arsitek (kesetiaan desain) → Manops (scope/RAB & sign-off final) — karena dia gate uang, bukan QC biasa. SOP pendukung paling banyak dipanggil di fase ini.',
      svg: `<svg viewBox="0 0 680 654" role="img" xmlns="http://www.w3.org/2000/svg">
  <title>Swimlane Fase 3 Produksi v2.2</title>
  <defs><marker id="ar3" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></marker></defs>
  <rect x="16" y="16" width="156" height="32" rx="8" fill="#0C2D5C"/><text class="bt" x="94" y="32" text-anchor="middle" dominant-baseline="central" fill="#FFFFFF">Manops</text>
  <rect x="180" y="16" width="156" height="32" rx="8" fill="#0C2D5C"/><text class="bt" x="258" y="32" text-anchor="middle" dominant-baseline="central" fill="#FFFFFF">Site Engineer</text>
  <rect x="344" y="16" width="156" height="32" rx="8" fill="#0C2D5C"/><text class="bt" x="422" y="32" text-anchor="middle" dominant-baseline="central" fill="#FFFFFF">Finance</text>
  <rect x="508" y="16" width="156" height="32" rx="8" fill="#0C2D5C"/><text class="bt" x="586" y="32" text-anchor="middle" dominant-baseline="central" fill="#FFFFFF">SOP pendukung</text>
  <line x1="176" y1="56" x2="176" y2="572" stroke="#D8E3F4" stroke-dasharray="5 5"/>
  <line x1="340" y1="56" x2="340" y2="572" stroke="#D8E3F4" stroke-dasharray="5 5"/>
  <line x1="504" y1="56" x2="504" y2="572" stroke="#D8E3F4" stroke-dasharray="5 5"/>
  <rect x="20" y="70" width="148" height="56" rx="8" fill="#2665D6"/>
  <text class="bt" x="94" y="90" text-anchor="middle" dominant-baseline="central" fill="#FFFFFF">Pengadaan</text>
  <text class="bs" x="94" y="108" text-anchor="middle" dominant-baseline="central" fill="#C3D7F8">material &amp; vendor</text>
  <line x1="168" y1="98" x2="508" y2="98" stroke="#8A6206" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#ar3)"/>
  <rect x="512" y="70" width="148" height="56" rx="8" fill="#E9AE24" stroke="#8A6206" stroke-dasharray="5 4" stroke-width="1.2"/>
  <text class="bt" x="586" y="90" text-anchor="middle" dominant-baseline="central" fill="#3A2A03">SOP PR · PO</text>
  <text class="bs" x="586" y="108" text-anchor="middle" dominant-baseline="central" fill="#5F4607">terima barang</text>
  <path d="M94 126 L94 146 L258 146 L258 162" fill="none" stroke="#0C2D5C" stroke-width="1.5" marker-end="url(#ar3)"/>
  <rect x="184" y="162" width="148" height="72" rx="8" fill="#2665D6"/>
  <text class="bt" x="258" y="180" text-anchor="middle" dominant-baseline="central" fill="#FFFFFF">Produksi</text>
  <text class="bs" x="258" y="202" text-anchor="middle" dominant-baseline="central" fill="#C3D7F8">workshop</text>
  <text class="bs" x="258" y="218" text-anchor="middle" dominant-baseline="central" fill="#C3D7F8">furniture custom</text>
  <line x1="332" y1="198" x2="508" y2="198" stroke="#8A6206" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#ar3)"/>
  <rect x="512" y="170" width="148" height="56" rx="8" fill="#E9AE24" stroke="#8A6206" stroke-dasharray="5 4" stroke-width="1.2"/>
  <text class="bt" x="586" y="190" text-anchor="middle" dominant-baseline="central" fill="#3A2A03">Dokumentasi</text>
  <text class="bs" x="586" y="208" text-anchor="middle" dominant-baseline="central" fill="#5F4607">konten · MKT-02</text>
  <path d="M258 234 L258 254 L94 254 L94 270" fill="none" stroke="#0C2D5C" stroke-width="1.5" marker-end="url(#ar3)"/>
  <rect x="20" y="270" width="148" height="72" rx="8" fill="#2665D6"/>
  <text class="bt" x="94" y="288" text-anchor="middle" dominant-baseline="central" fill="#FFFFFF">QC workshop</text>
  <text class="bs" x="94" y="310" text-anchor="middle" dominant-baseline="central" fill="#C3D7F8">SE→Arsitek→Manops</text>
  <text class="bs" x="94" y="326" text-anchor="middle" dominant-baseline="central" fill="#C3D7F8">↻ fail: perbaikan</text>
  <line x1="168" y1="306" x2="348" y2="306" stroke="#0C2D5C" stroke-width="1.5" marker-end="url(#ar3)"/>
  <rect x="348" y="270" width="148" height="72" rx="8" fill="#2665D6"/>
  <text class="bt" x="422" y="288" text-anchor="middle" dominant-baseline="central" fill="#FFFFFF">Tagih termin</text>
  <text class="bs" x="422" y="310" text-anchor="middle" dominant-baseline="central" fill="#C3D7F8">Admin Finance</text>
  <text class="bs" x="422" y="326" text-anchor="middle" dominant-baseline="central" fill="#C3D7F8">sblm kirim barang</text>
  <line x1="496" y1="306" x2="512" y2="306" stroke="#8A6206" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#ar3)"/>
  <rect x="512" y="278" width="148" height="56" rx="8" fill="#E9AE24" stroke="#8A6206" stroke-dasharray="5 4" stroke-width="1.2"/>
  <text class="bt" x="586" y="298" text-anchor="middle" dominant-baseline="central" fill="#3A2A03">SOP invoicing</text>
  <text class="bs" x="586" y="316" text-anchor="middle" dominant-baseline="central" fill="#5F4607">&amp; kwitansi · FIN-02</text>
  <path d="M422 342 L422 362 L258 362 L258 378" fill="none" stroke="#0C2D5C" stroke-width="1.5" marker-end="url(#ar3)"/>
  <rect x="184" y="378" width="148" height="72" rx="8" fill="#2665D6"/>
  <text class="bt" x="258" y="396" text-anchor="middle" dominant-baseline="central" fill="#FFFFFF">Instalasi</text>
  <text class="bs" x="258" y="418" text-anchor="middle" dominant-baseline="central" fill="#C3D7F8">Site Engineer</text>
  <text class="bs" x="258" y="434" text-anchor="middle" dominant-baseline="central" fill="#C3D7F8">stlh termin cair</text>
  <path d="M258 450 L258 470 L94 470 L94 486" fill="none" stroke="#0C2D5C" stroke-width="1.5" marker-end="url(#ar3)"/>
  <rect x="20" y="486" width="148" height="72" rx="8" fill="#2665D6"/>
  <text class="bt" x="94" y="504" text-anchor="middle" dominant-baseline="central" fill="#FFFFFF">Progress &amp; QC</text>
  <text class="bs" x="94" y="526" text-anchor="middle" dominant-baseline="central" fill="#C3D7F8">site · Manops+AIC</text>
  <text class="bs" x="94" y="542" text-anchor="middle" dominant-baseline="central" fill="#C3D7F8">↻ fail: perbaikan</text>
  <line x1="94" y1="558" x2="94" y2="582" stroke="#0C2D5C" stroke-width="1.5" marker-end="url(#ar3)"/>
  <rect x="12" y="582" width="656" height="48" rx="8" fill="#E9AE24"/>
  <text class="bt" x="340" y="598" text-anchor="middle" dominant-baseline="central" fill="#3A2A03">Gate 3 — produksi tuntas</text>
  <text class="bs" x="340" y="616" text-anchor="middle" dominant-baseline="central" fill="#5F4607">QC site passed · termin terbayar</text>
  </svg>`
    },
    {
      no: 4,
      eyebrow: 'Fase 4 · Handover',
      nama: 'Dari walkthrough sampai garansi & closure',
      lede: 'Walkthrough & BAST digabung jadi satu aktivitas (F4-01) — kalau ada catatan, perbaikan dikerjakan langsung lalu walkthrough ulang sampai punch list nol, baru BAST diteken. Dua rem yang dikunci: BAST = gate uang (memicu pelunasan), dan punch list hanya untuk cacat-vs-scope kontrak, bukan permintaan baru — permintaan baru jadi penawaran terpisah, melindungi no-addendum di garis finish. Setelah serah terima: styling & foto jadi amunisi konten, garansi jadi alasan klien tenang, lessons learned jadi input perbaikan sistem.',
      svg: `<svg viewBox="0 0 680 452" role="img" xmlns="http://www.w3.org/2000/svg">
  <title>Swimlane Fase 4 Handover v2.2</title>
  <defs><marker id="ar4" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></marker></defs>
  <rect x="16" y="16" width="156" height="32" rx="8" fill="#0C2D5C"/><text class="bt" x="94" y="32" text-anchor="middle" dominant-baseline="central" fill="#FFFFFF">Manops</text>
  <rect x="180" y="16" width="156" height="32" rx="8" fill="#0C2D5C"/><text class="bt" x="258" y="32" text-anchor="middle" dominant-baseline="central" fill="#FFFFFF">Klien</text>
  <rect x="344" y="16" width="156" height="32" rx="8" fill="#0C2D5C"/><text class="bt" x="422" y="32" text-anchor="middle" dominant-baseline="central" fill="#FFFFFF">Finance</text>
  <rect x="508" y="16" width="156" height="32" rx="8" fill="#0C2D5C"/><text class="bt" x="586" y="32" text-anchor="middle" dominant-baseline="central" fill="#FFFFFF">Sales</text>
  <line x1="176" y1="56" x2="176" y2="390" stroke="#D8E3F4" stroke-dasharray="5 5"/>
  <line x1="340" y1="56" x2="340" y2="390" stroke="#D8E3F4" stroke-dasharray="5 5"/>
  <line x1="504" y1="56" x2="504" y2="390" stroke="#D8E3F4" stroke-dasharray="5 5"/>

  <!-- merged-activity band: walkthrough + BAST = satu aktivitas, loop tetap tampak -->
  <rect x="10" y="84" width="332" height="208" rx="14" fill="#EAF1FC"/>
  <text class="bs" x="16" y="76" text-anchor="start" fill="#1D4FAE" style="font-weight:700">Satu aktivitas · F4-01 — loop perbaikan tetap tampak</text>

  <rect x="16" y="96" width="140" height="48" rx="8" fill="#2665D6"/>
  <text class="bt" x="86" y="114" text-anchor="middle" dominant-baseline="central" fill="#FFFFFF">Walkthrough</text>
  <text class="bs" x="86" y="132" text-anchor="middle" dominant-baseline="central" fill="#C3D7F8">+ punch list</text>
  <line x1="86" y1="144" x2="86" y2="162" stroke="#0C2D5C" stroke-width="1.5" marker-end="url(#ar4)"/>

  <rect x="16" y="162" width="140" height="48" rx="8" fill="#0C2D5C"/>
  <text class="bt" x="86" y="180" text-anchor="middle" dominant-baseline="central" fill="#FFFFFF">Punch list nol?</text>
  <text class="bs" x="86" y="196" text-anchor="middle" dominant-baseline="central" fill="#9DB7E0">ya → · belum ↻</text>
  <line x1="86" y1="210" x2="86" y2="228" stroke="#0C2D5C" stroke-width="1.5" marker-end="url(#ar4)"/>

  <rect x="16" y="228" width="140" height="48" rx="8" fill="#2665D6"/>
  <text class="bt" x="86" y="246" text-anchor="middle" dominant-baseline="central" fill="#FFFFFF">Perbaikan</text>
  <text class="bs" x="86" y="264" text-anchor="middle" dominant-baseline="central" fill="#C3D7F8">ulangi walkthrough</text>
  <path d="M156 252 L172 252 L172 120 L156 120" fill="none" stroke="#0C2D5C" stroke-width="1.5" marker-end="url(#ar4)"/>
  <text class="bs" x="177" y="150" text-anchor="start" fill="#5A6B86">↻</text>

  <rect x="188" y="162" width="140" height="48" rx="8" fill="#2665D6"/>
  <text class="bt" x="258" y="180" text-anchor="middle" dominant-baseline="central" fill="#FFFFFF">BAST ttd</text>
  <text class="bs" x="258" y="196" text-anchor="middle" dominant-baseline="central" fill="#C3D7F8">serah terima</text>
  <line x1="156" y1="186" x2="188" y2="186" stroke="#0C2D5C" stroke-width="1.5" marker-end="url(#ar4)"/>

  <line x1="328" y1="186" x2="352" y2="186" stroke="#0C2D5C" stroke-width="1.5" marker-end="url(#ar4)"/>
  <rect x="352" y="162" width="140" height="48" rx="8" fill="#2665D6"/>
  <text class="bt" x="422" y="180" text-anchor="middle" dominant-baseline="central" fill="#FFFFFF">Pelunasan</text>
  <text class="bs" x="422" y="196" text-anchor="middle" dominant-baseline="central" fill="#C3D7F8">Admin Finance</text>
  <line x1="422" y1="210" x2="422" y2="228" stroke="#8A6206" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#ar4)"/>
  <rect x="352" y="228" width="140" height="48" rx="8" fill="#E9AE24" stroke="#8A6206" stroke-dasharray="5 4" stroke-width="1.2"/>
  <text class="bt" x="422" y="246" text-anchor="middle" dominant-baseline="central" fill="#3A2A03">SOP penerimaan</text>
  <text class="bs" x="422" y="264" text-anchor="middle" dominant-baseline="central" fill="#5F4607">pembayaran · FIN-01</text>

  <path d="M258 162 L258 124 L512 124" fill="none" stroke="#0C2D5C" stroke-width="1.5" marker-end="url(#ar4)"/>
  <rect x="512" y="96" width="148" height="56" rx="8" fill="#2665D6"/>
  <text class="bt" x="586" y="114" text-anchor="middle" dominant-baseline="central" fill="#FFFFFF">Styling &amp; foto</text>
  <text class="bs" x="586" y="132" text-anchor="middle" dominant-baseline="central" fill="#C3D7F8">Marketing + AM</text>
  <line x1="586" y1="152" x2="586" y2="172" stroke="#0C2D5C" stroke-width="1.5" marker-end="url(#ar4)"/>
  <rect x="512" y="172" width="148" height="56" rx="8" fill="#2665D6"/>
  <text class="bt" x="586" y="190" text-anchor="middle" dominant-baseline="central" fill="#FFFFFF">Garansi</text>
  <text class="bs" x="586" y="208" text-anchor="middle" dominant-baseline="central" fill="#C3D7F8">after-sales · AM</text>
  <path d="M586 228 L586 300 L86 300 L86 320" fill="none" stroke="#0C2D5C" stroke-width="1.5" marker-end="url(#ar4)"/>

  <rect x="16" y="320" width="140" height="56" rx="8" fill="#2665D6"/>
  <text class="bt" x="86" y="340" text-anchor="middle" dominant-baseline="central" fill="#FFFFFF">Closure</text>
  <text class="bs" x="86" y="358" text-anchor="middle" dominant-baseline="central" fill="#C3D7F8">lessons + Direktur</text>
  <line x1="86" y1="376" x2="86" y2="396" stroke="#0C2D5C" stroke-width="1.5" marker-end="url(#ar4)"/>
  <rect x="12" y="396" width="656" height="48" rx="8" fill="#E9AE24"/>
  <text class="bt" x="340" y="412" text-anchor="middle" dominant-baseline="central" fill="#3A2A03">Closing gate — project selesai</text>
  <text class="bs" x="340" y="430" text-anchor="middle" dominant-baseline="central" fill="#5F4607">BAST ttd · lunas · dokumentasi terarsip</text>
  </svg>`
    }
  ];
  faseData.forEach(function(f){
    fsSh.appendRow(['FASE-INT-' + f.no, PID, f.no, f.eyebrow, f.nama, f.lede, f.svg, '']);
  });

  // ── 4. AKTIVITAS (19 kotak; lane assignment dari swimlane) ──
  var akSh = sheet('PlaybookAktivitas');
  var aktivitas = [
    // FASE 1 — 4 aktivitas
    ['AK-INT-F1-01', 1, 'F1-01', 'Lead masuk & capture',          'Sales',  'Admin Client',         'SOP-INT-F1-01', 'IK-INT-F1-01',     'Gel.2', 1],
    ['AK-INT-F1-02', 1, 'F1-02', 'Konsultasi & kalkulator',       'Sales',  'Account Manager',      'SOP-INT-F1-01', 'IK-INT-F1-02',     'Gel.2', 2],
    ['AK-INT-F1-03', 1, 'F1-04', 'Site survey',                   'Studio', 'Head of Studio',       'SOP-INT-F1-02', 'IK-INT-F1-04',     'Gel.1', 3],
    ['AK-INT-F1-04', 1, 'F1-05', 'Brief detail & approval',       'Sales',  'AM + Klien',           'SOP-INT-F1-03', 'IK-INT-F1-05',     'Gel.2', 4],
    // FASE 2 — 5 aktivitas
    ['AK-INT-F2-01', 2, 'F2-01', 'Kickoff & desain tahap-n',      'Studio', 'HoS + Studio',         'SOP-INT-F2-01', 'IK-INT-F2-01/02',  'Gel.2', 1],
    ['AK-INT-F2-02', 2, 'F2-03', 'Penyusunan RAB tahap-n',        'Studio', 'Estimator (Hilmi)',    'SOP-INT-F2-02', 'IK-INT-F2-03',     'Gel.1', 2],
    ['AK-INT-F2-03', 2, 'F2-04', 'Presentasi & approval desain',  'Sales',  'AM + Studio',          'SOP-INT-F2-03', 'IK-INT-F2-04',     'Gel.2', 3],
    ['AK-INT-F2-04', 2, 'F2-05', 'Penawaran & kontrak',           'Sales',  'AM + Direktur',        'SOP-INT-F2-04', 'IK-INT-F2-05/06',  'Gel.2', 4],
    ['AK-INT-F2-05', 2, 'F2-07', 'Gambar kerja & rencana pengadaan', 'Studio', 'Drafter + SE',      'SOP-INT-F2-05', 'IK-INT-F2-07',     'Gel.1', 5],
    // FASE 3 — 5 aktivitas
    ['AK-INT-F3-01', 3, 'F3-01', 'Pengadaan material & vendor',   'Manops', 'Manops',               'SOP-INT-F3-01', 'IK-INT-F3-01',     'Gel.2', 1],
    ['AK-INT-F3-02', 3, 'F3-02', 'Produksi workshop',             'SE',     'Site Engineer',        'SOP-INT-F3-02', 'IK-INT-F3-02',     'Gel.2', 2],
    ['AK-INT-F3-03', 3, 'F3-03', 'QC workshop (3 lapis)',         'Manops', 'SE → Arsitek → Manops','SOP-INT-F3-04', 'IK-INT-F3-03',     'Gel.1', 3],
    ['AK-INT-F3-04', 3, 'F3-05', 'Instalasi site',                'SE',     'Site Engineer',        'SOP-INT-F3-03', 'IK-INT-F3-05',     'Gel.1', 4],
    ['AK-INT-F3-05', 3, 'F3-06', 'Progress & QC site',            'Manops', 'Manops + AIC',         'SOP-INT-F3-04', 'IK-INT-F3-06',     'Gel.1', 5],
    // FASE 4 — 4 aktivitas
    ['AK-INT-F4-01', 4, 'F4-01', 'Walkthrough, punch list & BAST','Manops', 'Manops + AM',          'SOP-INT-F4-01', 'IK-INT-F4-01',     'Gel.1', 1],
    ['AK-INT-F4-02', 4, 'F4-02', 'Styling, foto & testimonial',   'Sales',  'Marketing + AM',       'SOP-INT-F4-02', 'IK-INT-F4-02',     'Gel.3', 2],
    ['AK-INT-F4-03', 4, 'F4-03', 'After-sales & garansi',         'Sales',  'Account Manager',      'SOP-INT-F4-03', 'IK-INT-F4-03',     'Gel.3', 3],
    ['AK-INT-F4-04', 4, 'F4-04', 'Closure & lessons learned',     'Manops', 'Manops + Direktur',    'SOP-INT-F4-04', 'IK-INT-F4-04',     'Gel.3', 4],
    // LINTAS FASE — pelaporan klien (panggilan dari F2 & F3)
    ['AK-INT-X-01',  0, 'MKT-04','Pelaporan progres klien',       'Lintas','Darma (kemas & kirim)', 'SOP-MKT-04',    'IK-MKT-04',        'Gel.2', 1]
  ];
  aktivitas.forEach(function(a){
    var faseId = a[1] === 0 ? '' : ('FASE-INT-' + a[1]);
    akSh.appendRow([a[0], PID, faseId, a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], '']);
  });

  // ── 5. GATE (4 gate + checklist) ──
  var gtSh = sheet('PlaybookGate');
  var gates = [
    ['GT-INT-G1', 'CHK-G1', 'Gate 1', 'Akuisisi → Desain (handover Sales → Ops)',
      'Manager Operational',
      'Brief detail ditandatangani klien;Biaya survey cair & tercatat (deductible);Data survey lengkap di Drive Project;Kanal komunikasi aktif: grup WA internal, grup WA klien, portal klien Moona System',
      1],
    ['GT-INT-G2', 'CHK-G2', 'Gate 2', 'Desain → Produksi',
      'Manager Operational',
      'Seluruh tahap desain approved klien (sampai tahap final);Kontrak ditandatangani (harga lock, no-addendum);DP cair & tercatat;Gambar kerja final & procurement plan disetujui Manops',
      2],
    ['GT-INT-G3', 'CHK-G3', 'Gate 3', 'Produksi → Handover',
      'Manager Operational',
      'QC workshop lolos sebelum barang dikirim;Termin cair sebelum instalasi dimulai;QC site lolos (Manops + AIC);Laporan progres & dokumentasi konten lengkap',
      3],
    ['GT-INT-G4', 'CHK-G4', 'Closing gate', 'Project resmi selesai',
      'Manager Operational',
      'BAST ditandatangani klien;Pelunasan masuk & tercatat;Foto, testimonial & arsip dokumen lengkap;Lessons learned tercatat (Manops + Direktur)',
      4]
  ];
  gates.forEach(function(g){
    gtSh.appendRow([g[0], PID, g[1], g[2], g[3], g[4], g[5], g[6]]);
  });

  // ── 6. SOP MASTER LIST (16 spine + 11 pendukung) ──
  var spSh = sheet('PlaybookSOPItem');
  var sopItems = [
    // SPINE — Fase 1
    ['SOP-INT-F1-01', 'Lead Management & Konsultasi', 'Spine', 'Admin Client + AM',          'Update Canva lama', 'Lead masuk · Capture & tag · Konsultasi · Klien lanjut? · Setup kanal'],
    ['SOP-INT-F1-02', 'Site Survey Interior',         'Spine', 'Head of Studio',             'Baru',              'Site survey'],
    ['SOP-INT-F1-03', 'Brief Detail & Approval',      'Spine', 'AM + Klien',                 'Baru',              'Brief detail'],
    // SPINE — Fase 2
    ['SOP-INT-F2-01', 'Design Development',           'Spine', 'HoS + AIC + Drafter',        'Baru',              'Kickoff · Desain tahap-n'],
    ['SOP-INT-F2-02', 'Penyusunan RAB',               'Spine', 'Estimator (Hilmi)',          'Baru',              'RAB tahap-n'],
    ['SOP-INT-F2-03', 'Presentasi & Approval Desain', 'Spine', 'AM + Studio',                'Baru',              'Presentasi · Approve tahap?'],
    ['SOP-INT-F2-04', 'Penawaran & Kontrak',          'Spine', 'AM + Direktur',              'Baru',              'Penawaran · Ttd kontrak'],
    ['SOP-INT-F2-05', 'Gambar Kerja & Rencana Pengadaan', 'Spine', 'Drafter + SE + Manops',  'Baru',              'Gambar kerja'],
    // SPINE — Fase 3
    ['SOP-INT-F3-01', 'Pengadaan Material & Vendor',  'Spine', 'Manops',                     'Baru',              'Pengadaan'],
    ['SOP-INT-F3-02', 'Produksi Workshop',            'Spine', 'Site Engineer',              'Baru',              'Produksi workshop'],
    ['SOP-INT-F3-03', 'Instalasi Site',               'Spine', 'Site Engineer',              'Baru',              'Instalasi'],
    ['SOP-INT-F3-04', 'Progress Report & QC',         'Spine', 'SE → Arsitek → Manops',      'Baru',              'QC workshop · Tagih termin · Progress & QC site'],
    // SPINE — Fase 4
    ['SOP-INT-F4-01', 'Walkthrough, Punch List & BAST','Spine','Manops + AM',                'Baru',              'Walkthrough · Punch list · BAST (satu aktivitas)'],
    ['SOP-INT-F4-02', 'Styling, Foto & Testimonial',  'Spine', 'Marketing + AM',             'Baru',              'Styling & foto'],
    ['SOP-INT-F4-03', 'After-Sales & Garansi',        'Spine', 'Account Manager',            'Baru',              'Garansi'],
    ['SOP-INT-F4-04', 'Closure & Lessons Learned',    'Spine', 'Manops + Direktur',          'Baru',              'Closure'],
    // PENDUKUNG — Finance
    ['SOP-FIN-01', 'Penerimaan Pembayaran',           'Pendukung', 'Finance',                'Update Canva lama', 'Biaya survey (F1) · DP (F2) · Pelunasan (F4)'],
    ['SOP-FIN-02', 'Invoicing & Kwitansi',            'Pendukung', 'Finance',                'Update Canva lama', 'Termin (F3, setelah QC workshop) · semua penagihan'],
    ['SOP-FIN-03', 'Pembayaran Vendor',               'Pendukung', 'Finance',                'Update Canva lama', 'Pengadaan (F3)'],
    // PENDUKUNG — Procurement
    ['SOP-PRC-01', 'Purchase Request',                'Pendukung', 'Manops',                 'Update Canva lama', 'F3-01'],
    ['SOP-PRC-02', 'Purchase Order',                  'Pendukung', 'Manops',                 'Update Canva lama', 'F3-01'],
    ['SOP-PRC-03', 'Penerimaan Barang',               'Pendukung', 'Manops',                 'Update Canva lama', 'F3-01'],
    ['SOP-PRC-04', 'Dokumentasi Pembelian',           'Pendukung', 'Manops',                 'Update Canva lama', 'F3-01'],
    // PENDUKUNG — Marketing
    ['SOP-MKT-01', 'Lead Generation Content',         'Pendukung', 'Marketing',              'Baru',              'Hulu, sebelum F1'],
    ['SOP-MKT-02', 'Dokumentasi Konten Lapangan',     'Pendukung', 'Marketing',              'Baru',              'F3'],
    ['SOP-MKT-03', 'Kalkulator Interior',             'Pendukung', 'Marketing',              'Baru',              'Konsultasi (F1)'],
    ['SOP-MKT-04', 'Pelaporan Progres Klien',         'Pendukung', 'Darma (kemas & kirim)',  'Baru',              'Approval tiap tahap desain (F2) · milestone produksi (F3)']
  ];
  sopItems.forEach(function(s, i){
    spSh.appendRow(['SP-' + s[0], PID, s[0], s[1], s[2], s[3], s[4], s[5], '', i+1]);
  });

  // ── 7. DISKUSI (titik diskusi + risk note) ──
  var dkSh = sheet('PlaybookDiskusi');
  var diskusi = [
    ['Diskusi', 'Bobot % per milestone untuk laporan progres', 'Laporan ke klien pakai persen ditimbang per milestone (bukan rata-rata kasar) supaya angka tidak jadi sumber sengketa di bawah no-addendum. Pembagian bobotnya perlu dikunci: mis. desain disetujui 20 — material datang 30 — produksi workshop 30 — instalasi 15 — BAST 5. Angka finalnya berapa, dan sama untuk semua ukuran project?', 'SOP-MKT-04'],
    ['Diskusi', 'Konfirmasi daftar IK gelombang 1', 'Tujuh IK diusulkan ditulis duluan atas dasar risiko: site survey, RAB, gambar kerja, QC workshop 3-lapis, instalasi, QC site, walkthrough/BAST. Ada yang harus naik/turun prioritas menurut lapangan? IK ditulis bertahap, bukan sekaligus.', 'IK gelombang 1'],
    ['Diskusi', 'Rumah SOP pelaporan klien — Marketing atau Client-Relations', 'Pelaporan progres untuk sementara ditaruh di bawah Marketing (MKT-04) karena belum ada bucket khusus. Tapi fungsinya klien-facing murni, bukan akuisisi. Begitu volume relasi-klien bertambah, layak dipertimbangkan bucket Client-Relations sendiri. Buat sekarang atau nanti?', 'SOP-MKT-04'],
    ['Diskusi', 'Urutan & override sign-off QC workshop 3-lapis', 'QC workshop berurut SE→Arsitek→Manops, Manops pemegang sign-off final (gate uang, memicu termin). Pertanyaan: kalau SE atau Arsitek menolak tapi Manops mau lolos demi jadwal — siapa yang menang? Usulan: temuan SE/Arsitek bersifat blocking, Manops tidak bisa override mutu/desain, hanya scope. Setuju?', 'SOP-INT-F3-04'],
    ['Diskusi', 'Batas revisi per tahap desain', 'Dengan desain bertahap, batas revisi bisa dibedakan: tahap awal longgar (effort murah, belum render), tahap final ketat (render ulang mahal) — misal maksimal 2x lalu berbayar. Angka finalnya berapa?', 'SOP-INT-F2-03'],
    ['Diskusi', 'Struktur pembayaran termin', 'Posisi termin sudah dikunci: setelah QC workshop, sebelum instalasi, dan instalasi menunggu termin cair. Yang tersisa: komposisi pembayaran (mis. DP 40 — termin 40 — pelunasan 20) dan apakah komposisinya sama untuk semua ukuran project.', 'SOP-INT-F3-04 · FIN-02'],
    ['Diskusi', 'Posisi styling & testimonial', 'Diusulkan jadi alur utama (bukan SOP pendukung Marketing) karena klien-facing dan punya urutan wajib — momen foto harus sebelum serah terima penuh. Setuju?', 'SOP-INT-F4-02'],
    ['Diskusi', 'SLA respon lead <2 jam', 'Realistis di luar jam kerja? Perlu definisi jam operasional respon (mis. 08.00–20.00) supaya SLA-nya bisa diukur adil.', 'SOP-INT-F1-01'],
    ['Diskusi', 'Flag kontrol: double-hat Account Manager + Finance Manager', 'Saat ini satu orang memegang negosiasi penjualan sekaligus kontrol uang. Aman untuk ukuran tim sekarang, tapi begitu tim bertambah, validasi pembayaran harus dipisah dari fungsi penjualan. Dicatat sebagai agenda struktur, bukan masalah hari ini.', ''],
    ['Risk', 'Klien mundur setelah tahap final desain', 'Klien mundur setelah tahap final desain (render sudah jadi, harga detail sudah keluar). Keputusan saat ini: status quo — approval per tahap tanpa fee komitmen tambahan; biaya survey deductible hanya menutup effort tahap awal. Bila terjadi kasus nyata, opsi yang sudah disiapkan: komitmen tertulis saat approval tiap tahap, atau design fee tahap lanjut yang juga bersifat deductible.', '']
  ];
  diskusi.forEach(function(d, i){
    dkSh.appendRow(['DSK-INT-' + (i+1), PID, d[0], i+1, d[1], d[2], d[3]]);
  });

  // ── 8. CHANGELOG ──
  var clSh = sheet('PlaybookChangelog');
  var changelog = [
    ['v2.2', 'Review tim lanjutan: (1) tiap kotak aktivitas kini bertanda kode SOP induk + IK satu-halaman — model dokumen 3 lapis Peta→SOP→IK; (2) QC workshop dipertegas 3 lapis berurut SE→Arsitek→Manops, Manops sign-off final sebagai gate uang (anti-diffusion); (3) walkthrough + BAST digabung jadi satu aktivitas F4-01 dengan loop perbaikan terlihat, BAST hanya diteken saat punch list nol, BAST memicu pelunasan; (4) SOP-MKT-04 Pelaporan Progres Klien ditambah — input di sumber (SE/Studio log ke Hub), Darma mengemas & mengirim, persen ditimbang per milestone; (5) titik diskusi & changelog disesuaikan.'],
    ['v2.1', 'Hasil review tim: (1) "Buat grup WA" jadi "Setup kanal komunikasi" — WA internal, WA klien, portal klien Moona System, semua di satu titik setelah biaya survey cair; (2) design development jadi loop bertahap generik, jumlah tahap by scope; (3) penagihan termin pindah ke setelah QC workshop, sebelum instalasi — instalasi menunggu termin cair; (4) QC jadi dua titik (workshop & site); (5) checklist gate & titik diskusi disesuaikan; (6) catatan risiko ditambahkan.'],
    ['v2.0', 'Draft awal: peta sistem 4 fase + gate, master list 16 SOP spine + 10 SOP pendukung + 4 checklist gate, 6 titik diskusi.']
  ];
  changelog.forEach(function(c, i){
    clSh.appendRow(['CL-INT-' + (i+1), PID, c[0], i+1, c[1]]);
  });

  return 'Seeded Peta Sistem Interior v2.2 (ID: ' + PID + ') — 1 playbook, 10 kebijakan, 4 fase, 19 aktivitas, 4 gate, 27 SOP item, 10 diskusi/risk, 3 changelog.';
}
