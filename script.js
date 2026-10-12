'use strict';
/* ==========================================================================
   SIMULATOR PARTI POLITIK MALAYSIA v3.0 — script.js
   Semua angka, calon, berita dan peristiwa ialah DATA SIMULASI / ANGGARAN
   kecuali dinyatakan. Rujukan awal: keputusan PRU15 (19 Nov 2022) — semak
   dengan sumber rasmi (SPR) jika perlukan ketepatan.
   ========================================================================== */

/* ---------- UTIL ---------- */
const $ = (s, r = document) => r.querySelector(s);
const rnd = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
const pick = a => a[Math.floor(Math.random() * a.length)];
const clamp = (v, a = 0, b = 100) => Math.max(a, Math.min(b, v));
const rm = n => (n < 0 ? '-' : '') + 'RM' + Math.abs(Math.round(n)).toLocaleString('en-US');
const f1 = n => (Math.round(n * 10) / 10).toFixed(1);
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const pd = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const isoStr = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const BULAN = ['Januari', 'Februari', 'Mac', 'April', 'Mei', 'Jun', 'Julai', 'Ogos', 'September', 'Oktober', 'November', 'Disember'];
const fmtDate = d => `${d.getDate()} ${BULAN[d.getMonth()]} ${d.getFullYear()}`;
const addMonth = (iso, n) => {
  const d = pd(iso), day = d.getDate();
  const t = new Date(d.getFullYear(), d.getMonth() + n, 1);
  t.setDate(Math.min(day, new Date(t.getFullYear(), t.getMonth() + 1, 0).getDate()));
  return isoStr(t);
};

/* ---------- DATA TETAP ---------- */
const SAVE_KEY = 'simPolitikMY_v3';
const GE_MONTHS = 60;                 // PRU simulasi dipendekkan supaya muat dalam satu sesi
const START_DATE = '2022-11-24';
const W0 = { PH: 82, PN: 74, BN: 30, GPS: 23, GRS: 6, LAIN: 7 };   // rujukan PRU15 (222 kerusi)
const GOV0 = ['PH', 'BN', 'GPS', 'GRS'];
const BLOC = {
  PH: { n: 'PH', c: '#ef4444' }, PN: { n: 'PN', c: '#16a34a' }, BN: { n: 'BN', c: '#2563eb' },
  GPS: { n: 'GPS', c: '#a855f7' }, GRS: { n: 'GRS', c: '#06b6d4' }, LAIN: { n: 'Lain', c: '#94a3b8' }
};
const BK = Object.keys(BLOC);
const RK = ['PH', 'PN', 'BN', 'GPS', 'GRS'];  // bloc yang ada skor hubungan

const MODES = {
  easy: { n: 'Easy', d: 'Tekanan politik lebih rendah, krisis lebih mudah dikendalikan dan kesan negatif lebih ringan. Lawan tetap bertindak munasabah.', fund: 1.5, luck: .1, neg: .7, pos: 1.2, evp: .6, elec: 1.15, cc: .8 },
  medium: { n: 'Medium', d: 'Seimbang. Keputusan ada kesan bermakna; kewangan, hubungan dan sokongan perlu diurus aktif.', fund: 1, luck: 0, neg: 1, pos: 1, evp: .75, elec: 1, cc: 1 },
  hard: { n: 'Hard', d: 'Sumber terhad, krisis mencabar dan kesilapan membawa kesan jangka panjang.', fund: .6, luck: -.08, neg: 1.4, pos: .85, evp: .9, elec: .85, cc: 1.2 },
  real: { n: 'Real Malaysia', d: 'Realisme diutamakan: undang-undang, kuasa jawatan dan institusi. Tiada kelebihan khas; hasil boleh jadi lebih mudah atau lebih sukar.', fund: .8, luck: 0, neg: 1.1, pos: .95, evp: .8, elec: .9, cc: 1.1, real: true }
};
const PATHN = { new: 'Tubuh parti baharu', join: 'Sertai parti sedia ada', take: 'Ambil alih / jenama semula' };

// Data parti = rujukan ringkas (simulasi). 'sh' = anggaran bahagian kerusi dalam blok.
const PARTI = [
  { n: 'Parti Keadilan Rakyat', s: 'PKR', b: 'PH', sh: .38, i: 'Reformasi & sosial demokrat', c: '#38bdf8', y: '⚖️' },
  { n: 'Parti Tindakan Demokratik', s: 'DAP', b: 'PH', sh: .49, i: 'Demokrasi sosial', c: '#ef4444', y: '🚀' },
  { n: 'Parti Amanah Negara', s: 'AMANAH', b: 'PH', sh: .10, i: 'Islam progresif', c: '#f97316', y: '🌙' },
  { n: 'Pertubuhan Kebangsaan Melayu Bersatu', s: 'UMNO', b: 'BN', sh: .85, i: 'Nasionalisme Melayu', c: '#b91c1c', y: '🔱' },
  { n: 'Persatuan Cina Malaysia', s: 'MCA', b: 'BN', sh: .10, i: 'Kerjasama pelbagai kaum', c: '#1d4ed8', y: '⭐' },
  { n: 'Parti Islam Se-Malaysia', s: 'PAS', b: 'PN', sh: .66, i: 'Islamisme', c: '#15803d', y: '🌙' },
  { n: 'Parti Pribumi Bersatu Malaysia', s: 'BERSATU', b: 'PN', sh: .34, i: 'Nasionalisme Melayu', c: '#1e40af', y: '🦅' },
  { n: 'Gabungan Parti Sarawak', s: 'GPS', b: 'GPS', sh: 1, i: 'Autonomi Sarawak', c: '#a855f7', y: '🦅' },
  { n: 'Gabungan Rakyat Sabah', s: 'GRS', b: 'GRS', sh: 1, i: 'Autonomi Sabah', c: '#06b6d4', y: '⛰️' },
  { n: 'Parti Warisan', s: 'WARISAN', b: 'LAIN', sh: .45, i: 'Regionalisme Sabah', c: '#f59e0b', y: '☀️' },
  { n: 'Parti kecil rekaan (simulasi)', s: 'PKX', b: 'LAIN', sh: .04, i: 'Populis', c: '#64748b', y: '🌾' }
];
const IDEO = ['Nasionalisme', 'Reformasi & sosial demokrat', 'Islam progresif', 'Konservatif', 'Liberal', 'Populis', 'Regionalisme', 'Teknokratik', 'Hijau & alam sekitar', 'Sosialis'];
const SIMBOL = ['🌙 Bulan', '⭐ Bintang', '☀️ Matahari', '🌺 Bunga', '🌳 Pokok', '🐅 Harimau', '🦅 Helang', '🔱 Trisula', '⚖️ Neraca', '🌾 Padi'];
const SASARAN = ['Belia & pengundi muda', 'Pengundi luar bandar', 'Pengundi bandar', 'Kelas pertengahan', 'Pekerja & peniaga kecil', 'Pengundi pelbagai kaum'];
const MAN = [
  { id: 'eko', n: 'Ekonomi & kos sara hidup', cost: 'RM8–15 bilion/tahun', feas: 55, risk: 'Tekanan fiskal dan inflasi', j: 'Persekutuan' },
  { id: 'kerja', n: 'Pekerjaan & gaji', cost: 'RM3–6 bilion/tahun', feas: 60, risk: 'Kos majikan, bergantung pelaburan', j: 'Persekutuan' },
  { id: 'didik', n: 'Pendidikan', cost: 'RM2–5 bilion/tahun', feas: 70, risk: 'Hasil mengambil masa bertahun', j: 'Persekutuan' },
  { id: 'sihat', n: 'Kesihatan', cost: 'RM3–7 bilion/tahun', feas: 65, risk: 'Kekurangan tenaga kerja', j: 'Persekutuan' },
  { id: 'rumah', n: 'Perumahan', cost: 'RM4–9 bilion/tahun', feas: 50, risk: 'Tanah, kos bina dan kelulusan negeri', j: 'Negeri & Persekutuan' },
  { id: 'negeri', n: 'Pembangunan negeri', cost: 'RM1–4 bilion/tahun', feas: 60, risk: 'Hubungan Persekutuan–negeri', j: 'Negeri' },
  { id: 'infra', n: 'Infrastruktur', cost: 'RM6–14 bilion/tahun', feas: 45, risk: 'Kos tinggi, projek lewat siap', j: 'Persekutuan' },
  { id: 'integriti', n: 'Tadbir urus & integriti', cost: 'RM0.3–1 bilion/tahun', feas: 72, risk: 'Tentangan kepentingan sedia ada', j: 'Persekutuan' },
  { id: 'sosial', n: 'Dasar sosial', cost: 'RM2–6 bilion/tahun', feas: 58, risk: 'Beban perbelanjaan tetap', j: 'Persekutuan' },
  { id: 'desa', n: 'Luar bandar & bandar', cost: 'RM2–5 bilion/tahun', feas: 62, risk: 'Penyelarasan banyak agensi', j: 'Persekutuan & negeri' }
];
const COALS = [
  { id: 'unity', n: 'Kerajaan Perpaduan', m: ['PH', 'BN', 'GPS', 'GRS'] },
  { id: 'ph', n: 'PH + GPS + GRS + Lain', m: ['PH', 'GPS', 'GRS', 'LAIN'] },
  { id: 'phbn', n: 'PH + BN + Lain', m: ['PH', 'BN', 'LAIN'] },
  { id: 'pn', n: 'PN + BN + GPS + GRS', m: ['PN', 'BN', 'GPS', 'GRS'] },
  { id: 'pn2', n: 'PN + GPS + GRS + Lain', m: ['PN', 'GPS', 'GRS', 'LAIN'] }
];
const ROLES = ['Ketua Cawangan', 'Ketua Bahagian', 'Naib Presiden', 'Timbalan Presiden', 'Presiden'];
const RANKP = [.15, .35, .55, .75, 1];

const ADMIN = {
  gaya: { l: 'Gaya pentadbiran', o: [
    ['pres', 'Berpusat pada Presiden', { stab: -.5 }, 'Keputusan pantas, ahli rasa dipinggir.'],
    ['demo', 'Demokrasi dalaman', { stab: 1, members: 15 }, 'Penyertaan tinggi, keputusan lebih lambat.'],
    ['kolek', 'Kolektif', { stab: .5 }, 'Seimbang tetapi kurang tegas.'],
    ['tekno', 'Teknokratik', { rep: .6, stab: -.3 }, 'Dasar kemas, akar umbi kurang rapat.']] },
  kuasa: { l: 'Kuasa Presiden', o: [
    ['sangat', 'Sangat tinggi', { stab: -1.5 }, 'Mudah bertindak, risiko bantahan.'],
    ['tinggi', 'Tinggi', { stab: -.5 }, 'Tegas dengan sedikit tentangan.'],
    ['sederhana', 'Sederhana', {}, 'Neutral.'],
    ['terhad', 'Terhad', { stab: .5, members: 10 }, 'Ahli lebih selesa, kepimpinan lemah.']] },
  disiplin: { l: 'Disiplin ahli', o: [
    ['ketat', 'Ketat', { stab: .8, members: -10 }, 'Terkawal tetapi ada yang berundur.'],
    ['sederhana', 'Sederhana', {}, 'Neutral.'],
    ['fleksibel', 'Fleksibel', { stab: -.6, members: 12 }, 'Ahli bebas, risiko kumpulan sendiri.']] },
  telus: { l: 'Ketelusan kewangan', o: [
    ['tinggi', 'Tinggi (audit bebas)', { rep: 1, cred: .5 }, 'Dipercayai, kos audit bulanan.'],
    ['sederhana', 'Sederhana', {}, 'Neutral.'],
    ['rendah', 'Rendah', { rep: -1, cred: -.5 }, 'Jimat kos, mudah dituduh.']] }
};

const NAMA = ['Nurul Aisyah binti Hamid', 'Mohd Farid bin Rosli', 'Tan Wei Ming', 'Kumar a/l Rajan', 'Siti Hajar binti Ali', 'Jonathan anak Bunyau', 'Lim Mei Ling', 'Ahmad Zulkifli bin Yusof', 'Priya a/p Subramaniam', 'Datu Ramli bin Jaafar', 'Norazlina binti Ismail', 'Wong Kah Hou', 'Azman bin Daud', 'Hafiz bin Kamal', 'Rosnah binti Abu', 'Vincent Lau', 'Mahendran a/l Pillai', 'Dayang Nurul Huda'];
const CTYPES = ['Calon Parlimen', 'Calon DUN', 'Setiausaha Agung', 'Bendahari'];
const STAT = ['Pengenalan', 'Jentera', 'Pengalaman', 'Sumber'];
const KUAT = { Pengenalan: 'Dikenali ramai di kawasan', Jentera: 'Jentera & ahli kuat', Pengalaman: 'Berpengalaman luas', Sumber: 'Sumber kempen mencukupi' };
const LEMAH = { Pengenalan: 'Kurang dikenali', Jentera: 'Jentera lemah', Pengalaman: 'Pengalaman terhad', Sumber: 'Sumber terhad' };
const CRISK = ['Mungkin dibantah kumpulan dalaman', 'Pernah dikritik di media sosial', 'Hubungan dengan gabungan belum jelas', 'Tiada rekod isu besar', 'Bergantung kuat pada penaja'];

const WORLD_NEWS = [
  { t: 'Simulasi: harga minyak mentah turun, kerajaan menjimatkan subsidi.', e: { PH: 2, BN: 1 } },
  { t: 'Simulasi: kes rasuah melibatkan pegawai negeri dibongkar.', e: { PH: -1, PN: 1, BN: -1 } },
  { t: 'Simulasi: perhimpunan besar pembangkang menarik ramai hadirin.', e: { PN: 3 } },
  { t: 'Simulasi: projek infrastruktur luar bandar dirasmikan.', e: { BN: 2, GPS: 1 } },
  { t: 'Simulasi: pertikaian dalaman melanda sebuah parti pembangkang.', e: { PN: -2 } },
  { t: 'Simulasi: kadar pengangguran belia menurun sedikit.', e: { PH: 1.5 } },
  { t: 'Simulasi: isu autonomi Sabah dan Sarawak kembali dibincang.', e: { GPS: 1, GRS: 1.5 } },
  { t: 'Simulasi: kos sara hidup terus menjadi aduan utama rakyat.', e: { PH: -1.5, BN: -1 } },
  { t: 'Simulasi: tinjauan awam menunjukkan sokongan pengundi muda berubah.', e: { LAIN: 1, PN: 1 } }
];
const VOTES = [
  { t: 'Rang Undang-Undang Belanjawan', d: 'Kerajaan membentangkan belanjawan; pembangkang mengkritik defisit.', pop: true },
  { t: 'Usul tergempar kos sara hidup', d: 'Usul meminta bantuan tunai tambahan kepada isi rumah berpendapatan rendah.', pop: true },
  { t: 'Rang Undang-Undang pembiayaan pendidikan', d: 'Cadangan skim pembiayaan baharu untuk pelajar.', pop: true },
  { t: 'Undi percaya kepada kerajaan (simulasi)', d: 'Kerajaan meminta Dewan Rakyat menzahirkan keyakinan.', pop: false },
  { t: 'Pindaan akta tadbir urus (simulasi)', d: 'Pindaan prosedur agensi kerajaan; perdebatan hangat tentang kuasa pusat.', pop: false }
];
const VOTE_MONTHS = [3, 8, 10, 15, 19, 22];
const CAL = [
  [3, 'Sidang Dewan Rakyat — undian'], [6, 'Perhimpunan Agung parti (simulasi)'], [8, 'Sidang Dewan Rakyat'],
  [10, 'Pembentangan Belanjawan (simulasi)'], [12, 'Pemilihan parti'], [15, 'Sidang Dewan Rakyat'],
  [19, 'Sidang Dewan Rakyat'], [22, 'Sidang terakhir sebelum pembubaran'], [24, 'PRU (tarikh simulasi)']
];
const LOANS = [{ a: 300000, r: .06, m: 12 }, { a: 500000, r: .08, m: 18 }, { a: 1000000, r: .11, m: 24 }];
const INVS = [
  { n: 'Simpanan tetap', a: 100000, m: 3, ret: .03, risk: .02, loss: .02, d: 'Selamat, pulangan kecil.' },
  { n: 'Unit amanah', a: 200000, m: 6, ret: .08, risk: .15, loss: .1, d: 'Pulangan sederhana, risiko pasaran.' },
  { n: 'Perniagaan / hartanah', a: 300000, m: 12, ret: .22, risk: .3, loss: .35, d: 'Pulangan tinggi, boleh rugi besar.' }
];
const STRATS = [
  { id: 'ceramah', n: 'Ceramah & rapat umum', c: 150000, s: 8, d: 'Sambutan tinggi, kos besar.' },
  { id: 'lawat', n: 'Lawatan kawasan', c: 80000, s: 6, d: 'Rapat dengan pengundi.' },
  { id: 'media', n: 'Media & media sosial', c: 60000, s: 5, d: 'Jangkauan luas, risiko berita palsu.' },
  { id: 'tempat', n: 'Kempen isu tempatan', c: 120000, s: 7, d: 'Menyentuh isu kawasan.' },
  { id: 'jentera', n: 'Jentera parti penuh', c: 200000, s: 9, d: 'Perlu sekurang-kurangnya 1,000 ahli.' },
  { id: 'terang', n: 'Penerangan manifesto', c: 50000, s: 4, d: 'Murah, kesan sederhana.' }
];

/* ---------- KEADAAN ---------- */
let S = null, SU = {}, CUR = null, CURV = null;
const MODE = () => MODES[S ? S.mode : SU.mode] || MODES.medium;
const D = () => pd(S.date);
const chance = p => Math.random() < clamp(p + MODE().luck, .03, .97);
const risk = p => Math.random() < clamp(p * MODE().neg, 0, .95);
const inGov = () => S.pBloc ? S.gov.includes(S.pBloc) : !!S.joinedGov;
const govSeats = () => S.gov.reduce((a, b) => a + (S.seats[b] || 0), 0) + (inGov() ? S.seats.P : 0);
const roleName = () => S.role;

function save() { try { localStorage.setItem(SAVE_KEY, JSON.stringify(S)); } catch (e) { /* abaikan */ } }
function load() { try { const r = localStorage.getItem(SAVE_KEY); return r ? JSON.parse(r) : null; } catch (e) { return null; } }

function money(amt, desc) {
  S.funds += amt;
  S.ledger.unshift({ d: fmtDate(D()), t: desc, a: amt, b: S.funds });
  if (S.ledger.length > 40) S.ledger.length = 40;
}
function addLog(t, x) { S.log.unshift({ d: fmtDate(D()), t, x }); if (S.log.length > 80) S.log.length = 80; }
const LBL = { fund: 'Dana', debt: 'Hutang', members: 'Ahli', support: 'Sokongan', stab: 'Kestabilan', rep: 'Reputasi', cred: 'Kredibiliti' };

function applyE(e, desc) {
  const M = MODE(), out = [];
  for (const k in (e || {})) {
    const v = e[k];
    if (k === 'rel') {
      for (const b in v) {
        if (S.rel[b] === undefined) continue;
        const d = v[b] > 0 ? v[b] * M.pos : v[b] * M.neg;
        S.rel[b] = clamp(S.rel[b] + d); out.push({ k: 'rel', l: 'Hubungan ' + b, v: d });
      }
      continue;
    }
    if (k === 'fund') { money(v, desc || 'Kesan tindakan'); out.push({ k, l: LBL[k], v }); continue; }
    if (k === 'debt') { S.debt = Math.max(0, S.debt + v); out.push({ k, l: LBL[k], v }); continue; }
    const adj = v > 0 ? v * M.pos : v * M.neg;
    if (k === 'members') S.members = Math.max(0, Math.round(S.members + adj));
    else if (k === 'support') S.support = clamp(S.support + adj, .1, 60);
    else S[k] = clamp(S[k] + adj);
    out.push({ k, l: LBL[k] || k, v: adj });
  }
  return out;
}
function deltaHTML(out) {
  return (out || []).filter(o => Math.abs(o.v) >= .05).map(o => {
    const s = o.v >= 0 ? '+' : '';
    let t;
    if (o.k === 'fund' || o.k === 'debt') t = (o.v >= 0 ? '+' : '-') + rm(Math.abs(o.v));
    else if (o.k === 'members') t = s + Math.round(o.v);
    else if (o.k === 'support') t = s + f1(o.v) + '%';
    else t = s + f1(o.v);
    const good = o.k === 'debt' ? o.v < 0 : o.v >= 0;
    return `<span class="d ${good ? 'up' : 'dn'}">${o.l} ${t}</span>`;
  }).join('');
}

/* ---------- UI ASAS ---------- */
function show(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.toggle('active', s.id === id));
  window.scrollTo(0, 0);
}
function openModal(html) { $('#modal-body').innerHTML = html; $('#modal').classList.add('open'); $('#modal-card').scrollTop = 0; }
function closeModal() { $('#modal').classList.remove('open'); }
let toastT;
function toast(t) { const el = $('#toast'); el.textContent = t; el.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove('show'), 2400); }
function resultModal(title, msg, out) {
  openModal(`<h3>${esc(title)}</h3><p>${esc(msg)}</p><div class="deltas">${deltaHTML(out)}</div><button class="btn" data-act="close">Teruskan</button>`);
}
const hdr = (t, s) => `<div class="hd"><h2>${t}</h2><p>${s || ''}</p></div>`;
const back = to => `<button class="btn ghost" data-act="goto" data-to="${to}">Kembali</button>`;
function bar(l, v, c, max, fmt) {
  const pct = clamp(v / (max || 100) * 100);
  return `<div class="bar"><div class="bl"><span>${l}</span><b>${fmt ? fmt(v) : Math.round(v)}</b></div><div class="bt"><i style="width:${pct}%;background:${c || 'var(--accent)'}"></i></div></div>`;
}

/* ---------- SKRIN AWAL ---------- */
function renderMode() {
  $('#s-mode').innerHTML = hdr('Pilih mod kesukaran', 'Mod menentukan sumber awal, tekanan krisis dan kesan keputusan. Tidak boleh ditukar secara senyap.') +
    Object.entries(MODES).map(([k, m]) => `<button class="opt" data-act="mode" data-v="${k}"><b>${m.n}</b><small>${m.d}</small></button>`).join('') + back('s-start');
}
function renderPath() {
  $('#s-path').innerHTML = hdr('Pilih laluan permulaan', 'Isi maklumat asas, sahkan, dan terus bermain.') +
    `<button class="opt" data-act="path" data-v="new"><b>🏛️ Tubuh parti sendiri</b><small>Mulakan dari bawah: nama, ideologi, warna, slogan. Parti baharu tiada kerusi.</small></button>
     <button class="opt" data-act="path" data-v="join"><b>🤝 Sertai parti sedia ada</b><small>Pilih parti. Anda boleh jadi ahli baharu atau memainkan pemimpin parti.</small></button>
     <button class="opt" data-act="path" data-v="take"><b>🔄 Ambil alih / jenama semula</b><small>Tukar nama, identiti dan arah parti lama. Perubahan besar boleh cetus bantahan.</small></button>` + back('s-mode');
}

const fld = (id, l, v, ph) => `<label>${l}<input id="f_${id}" value="${esc(v || '')}" placeholder="${esc(ph || '')}"></label>`;
const sel = (id, l, opts, v) => `<label>${l}<select id="f_${id}">${opts.map(o => `<option ${o === v ? 'selected' : ''}>${esc(o)}</option>`).join('')}</select></label>`;
const val = id => ($('#f_' + id) ? $('#f_' + id).value : '').trim();

function renderSetup() {
  const p = SU.path, v = SU.p || {}; let h = '';
  if (p === 'new') {
    h = hdr('🏛️ Tubuh parti baharu', 'Isi sendiri atau tekan Cadangan AI.') +
      `<button class="btn gold" data-act="suggest">🎲 Cadangan AI</button><div class="form">` +
      fld('nama', 'Nama parti', v.nama, 'cth: Parti Harapan Rakyat') + fld('sing', 'Singkatan', v.sing, 'cth: PHR') +
      fld('pemimpin', 'Nama Presiden / pemimpin', v.pemimpin) + sel('ideologi', 'Ideologi', IDEO, v.ideologi) +
      `<label>Warna parti<input type="color" id="f_warna" value="${v.warna || '#2563eb'}"></label>` +
      sel('simbol', 'Simbol / konsep logo', SIMBOL, v.simbolFull) + fld('slogan', 'Slogan', v.slogan) +
      sel('fokus', 'Fokus perjuangan', MAN.map(m => m.n), v.fokus) + sel('kawasan', 'Kawasan operasi', ['Seluruh negara', 'Negeri tertentu', 'Kawasan terpilih'], v.kawasan) +
      sel('sasaran', 'Sasaran pengundi', SASARAN, v.sasaran) +
      sel('hub', 'Hubungan awal dengan gabungan', ['Neutral', 'Rakan PH', 'Rakan BN', 'Rakan PN', 'Rakan GPS/GRS', 'Lawan kerajaan'], v.hub) + `</div>`;
  } else if (p === 'join') {
    h = hdr('🤝 Sertai parti sedia ada', 'Data parti ialah rujukan ringkas (simulasi).') +
      PARTI.map((t, i) => `<button class="opt ${SU.pi === i ? 'sel' : ''}" data-act="pickparty" data-i="${i}"><b>${t.y} ${esc(t.n)} (${t.s})</b><small>${esc(t.i)} · Blok ${BLOC[t.b].n} · Pemimpin: ${esc(t.leader || ({PKR:'Anwar Ibrahim',DAP:'Gobind Singh Deo',AMANAH:'Mohamad Sabu',UMNO:'Ahmad Zahid Hamidi',MCA:'Wee Ka Siong',MIC:'S.A. Vigneswaran',PAS:'Abdul Hadi Awang',BERSATU:'Muhyiddin Yassin',GPS:'Abang Johari Openg',GRS:'Hajiji Noor',WARISAN:'Shafie Apdal',MUDA:'Syed Saddiq Syed Abdul Rahman'}[t.s] || 'Semak profil semasa'))} · ≈${Math.round(W0[t.b] * t.sh)} kerusi (anggaran)</small></button>`).join('') +
      `<div class="form">` + sel('role', 'Peranan anda', ['Ahli / pemimpin baharu', 'Pemimpin parti sebenar'], v.role) +
      fld('pemimpin', 'Nama watak anda (pilihan)', v.pemimpin) + fld('slogan', 'Slogan (pilihan)', v.slogan) + `</div>
       <p class="note">Ahli baharu hanya mengawal sebahagian kecil sumber dan perlu naik pangkat. Pemimpin parti mempunyai kuasa penuh.</p>`;
  } else {
    h = hdr('🔄 Ambil alih / jenama semula', 'Pilihan anda ialah rancangan, bukan jaminan hasil.') + `<div class="form">` +
      sel('old', 'Parti lama', PARTI.map(t => t.n), v.old) + fld('nama', 'Nama baharu', v.nama) + fld('sing', 'Singkatan baharu', v.sing) +
      fld('pemimpin', 'Presiden (kosongkan = kekalkan)', v.pemimpin) + sel('ideologi', 'Ideologi', ['Kekalkan', ...IDEO], v.ideologi) +
      `<label>Warna baharu<input type="color" id="f_warna" value="${v.warna || '#7c3aed'}"></label>` + sel('simbol', 'Simbol', ['Kekalkan', ...SIMBOL], v.simbolFull) +
      fld('slogan', 'Slogan baharu', v.slogan) + sel('skala', 'Skala perubahan', ['Kecil', 'Sederhana', 'Besar', 'Menyeluruh'], v.skala) +
      sel('risiko', 'Tahap risiko dipilih', ['Rendah', 'Sederhana', 'Tinggi'], v.risiko) +
      sel('lama', 'Kepimpinan lama', ['Kekalkan', 'Rombak sebahagian', 'Rombak sepenuhnya'], v.lama) +
      sel('ahli', 'Keahlian', ['Kekalkan', 'Semak semula', 'Buka keahlian baharu'], v.ahli) + `</div>`;
  }
  $('#s-setup').innerHTML = h + `<button class="btn big" data-act="toconfirm">Seterusnya</button>` + back('s-path');
}

function collect() {
  const p = SU.path; let o = {};
  if (p === 'new') {
    const sm = val('simbol');
    o = { nama: val('nama'), sing: val('sing').toUpperCase(), pemimpin: val('pemimpin') || 'Presiden Baharu', ideologi: val('ideologi'), warna: val('warna'), simbolFull: sm, simbol: sm.split(' ')[0], slogan: val('slogan') || 'Bersama Rakyat', fokus: val('fokus'), kawasan: val('kawasan'), sasaran: val('sasaran'), hub: val('hub') };
    if (!o.nama || !o.sing) { toast('Isi nama dan singkatan parti.'); return null; }
  } else if (p === 'join') {
    const t = PARTI[SU.pi || 0], role = val('role');
    o = { nama: t.n, sing: t.s, ideologi: t.i, warna: t.c, simbol: t.y, slogan: val('slogan') || 'Bersama Rakyat', role, pemimpin: val('pemimpin') || (role === 'Pemimpin parti sebenar' ? 'Pemimpin sedia ada' : 'Ahli baharu'), fokus: MAN[0].n, kawasan: 'Seluruh negara', sasaran: 'Pengundi pelbagai kaum' };
  } else {
    const old = PARTI.find(t => t.n === val('old')) || PARTI[0], sm = val('simbol');
    o = {
      old: old.n, nama: val('nama'), sing: val('sing').toUpperCase(), pemimpin: val('pemimpin') || 'Presiden (kekal)',
      ideologi: val('ideologi') === 'Kekalkan' ? old.i : val('ideologi'), warna: val('warna'), simbolFull: sm, simbol: sm === 'Kekalkan' ? old.y : sm.split(' ')[0],
      slogan: val('slogan') || 'Wajah Baharu, Harapan Baharu', skala: val('skala'), risiko: val('risiko'), lama: val('lama'), ahli: val('ahli'), fokus: MAN[0].n, kawasan: 'Seluruh negara', sasaran: 'Pengundi pelbagai kaum'
    };
    if (!o.nama || !o.sing) { toast('Isi nama dan singkatan baharu.'); return null; }
  }
  return o;
}
function suggestParty() {
  const nm = pick(['Parti Harapan Rakyat', 'Parti Bangsa Maju', 'Gerakan Rakyat Bersatu', 'Parti Suara Anak Muda', 'Parti Wawasan Negeri', 'Parti Kebangkitan Nusantara']);
  const sing = nm.split(' ').filter(w => w.length > 2).map(w => w[0]).join('').toUpperCase();
  const set = (id, v) => { if ($('#f_' + id)) $('#f_' + id).value = v; };
  set('nama', nm); set('sing', sing); set('pemimpin', pick(NAMA)); set('ideologi', pick(IDEO));
  set('warna', pick(['#2563eb', '#16a34a', '#ea580c', '#7c3aed', '#0891b2', '#dc2626']));
  set('simbol', pick(SIMBOL)); set('slogan', pick(['Rakyat Dahulu', 'Maju Bersama', 'Suara Anda, Kuasa Anda', 'Bersih, Berani, Berkhidmat', 'Untuk Semua']));
  set('fokus', pick(MAN).n); set('sasaran', pick(SASARAN));
  toast('Cadangan AI diisi. Anda boleh sunting.');
}
function renderConfirm() {
  const p = SU.p;
  $('#s-confirm').innerHTML = hdr('✅ Sahkan identiti', 'Semak sebelum simulasi bermula.') +
    `<div class="card idcard" style="border-color:${p.warna}"><div class="badge lg" style="background:${p.warna}">${p.simbol}</div>
     <h3>${esc(p.nama)} (${esc(p.sing)})</h3><p class="muted">${esc(p.ideologi)}</p><p>“${esc(p.slogan)}”</p>
     <p class="muted">Pemimpin: ${esc(p.pemimpin)}<br>Mod: ${MODES[SU.mode].n} · ${PATHN[SU.path]}</p></div>
     <p class="note">Dana, ahli dan hubungan awal ditetapkan oleh AI mengikut mod dan laluan (data simulasi).</p>
     <button class="btn big" data-act="start">Mulakan simulasi</button><button class="btn ghost" data-act="goto" data-to="s-setup">Sunting</button>`;
}

/* ---------- BINA KEADAAN PERMAINAN ---------- */
function buildState() {
  const M = MODES[SU.mode], p = SU.p, path = SU.path;
  const s = {
    v: 3, mode: SU.mode, path, party: { nama: p.nama, sing: p.sing, pemimpin: p.pemimpin, ideologi: p.ideologi, warna: p.warna, simbol: p.simbol, slogan: p.slogan, fokus: p.fokus, kawasan: p.kawasan, sasaran: p.sasaran },
    role: 'Presiden', rank: 4, power: 1, date: START_DATE, sDate: START_DATE, month: 0, season: 1, ap: 3,
    funds: 0, debt: 0, loans: [], invests: [], members: 0, support: 1, stab: 65, rep: 50, cred: 50,
    rel: { PH: 50, PN: 50, BN: 50, GPS: 50, GRS: 50 }, admin: { gaya: 'pres', kuasa: 'sederhana', disiplin: 'sederhana', telus: 'sederhana' },
    seats: { ...W0, P: 0 }, w: { ...W0 }, gov: [...GOV0], pBloc: null, joinedGov: false,
    roster: [], posts: {}, log: [], ledger: [], mis: {}, ach: {}, resolved: 0, used: [], seasons: [], phase: 'play', tab: 'home',
    el: null, elCount: 0, flags: {}, prom: [], loansTaken: 0, startP: 0, sup0: 1, tgtSup: 4, lastWon: 0, joinedLabel: ''
  };
  let note = '';
  if (path === 'new') {
    s.funds = Math.round(400000 * M.fund * rnd(8, 12) / 10); s.members = rnd(300, 900); s.support = 1 + rnd(0, 15) / 10;
    const h = p.hub;
    if (h === 'Rakan PH') s.rel.PH = 70; else if (h === 'Rakan BN') s.rel.BN = 70; else if (h === 'Rakan PN') s.rel.PN = 70;
    else if (h === 'Rakan GPS/GRS') { s.rel.GPS = 68; s.rel.GRS = 68; } else if (h === 'Lawan kerajaan') GOV0.forEach(b => s.rel[b] = 30);
    note = 'Parti baharu bermula tanpa kerusi dan dengan pengenalan terhad.';
  } else {
    const t = path === 'join' ? PARTI[SU.pi || 0] : PARTI.find(x => x.n === p.old) || PARTI[0];
    const P = Math.round(W0[t.b] * t.sh);
    s.pBloc = t.b; s.seats[t.b] -= P; s.seats.P = P; s.w[t.b] = Math.max(0, W0[t.b] - P); s.startP = P;
    if (s.rel[t.b] !== undefined) s.rel[t.b] = 85;
    if (path === 'join') {
      const leader = p.role === 'Pemimpin parti sebenar';
      s.rank = leader ? 4 : 0; s.power = RANKP[s.rank]; s.role = ROLES[s.rank];
      s.funds = Math.round((500000 + P * 40000) * M.fund * s.power); s.members = Math.round((1500 + P * 300) * (leader ? 1 : .4));
      s.support = Math.max(.5, P / 222 * 100); s.stab = 70;
      note = leader ? 'Anda memimpin parti dengan kuasa penuh.' : 'Anda ahli baharu: kuasa dan sumber terhad. Naik pangkat dalam parti.';
    } else {
      const si = ['Kecil', 'Sederhana', 'Besar', 'Menyeluruh'].indexOf(p.skala), ri = ['Rendah', 'Sederhana', 'Tinggi'].indexOf(p.risiko);
      s.power = .85; s.rank = 4; s.role = 'Presiden (pengambilalihan)';
      s.funds = Math.round((300000 + P * 30000) * M.fund); s.debt = rnd(100, 600) * 1000;
      s.members = Math.round((1200 + P * 250) * (1 - [.02, .08, .18, .3][si])); s.stab = 70 - [2, 6, 12, 20][si];
      s.support = Math.max(.4, P / 222 * 100 * (1 - [.02, .08, .15, .25][si]));
      const lost = Math.round(P * [0, .05, .12, .2][si] * [.6, 1, 1.5][ri]);
      if (lost > 0) { s.seats.P -= lost; s.seats.LAIN += lost; }
      const ok = Math.random() < clamp(.5 - si * .05 + ri * .1, .2, .8);
      s.support *= ok ? 1.15 : .88;
      note = `Penjenamaan semula ${ok ? 'diterima sebahagian pengundi' : 'mencetus keraguan pengundi'}.` + (lost ? ` ${lost} wakil rakyat keluar dan menjadi Bebas.` : '');
    }
  }
  s.support = clamp(s.support, .3, 60); s.sup0 = s.support; s.tgtSup = Math.ceil(s.support) + 4; s.startP = s.seats.P;
  return { s, note };
}

function startGame() {
  const { s, note } = buildState(); S = s;
  addLog('Mula', `${S.party.nama} memulakan simulasi pada ${fmtDate(D())}.`);
  money(0, 'Baki awal'); S.ledger[0].a = S.funds - 0; S.ledger[0].t = 'Dana permulaan (ditetapkan AI)';
  S.ledger[0].b = S.funds;
  initMissions(); checkAll(); save(); show('s-game');
  document.documentElement.style.setProperty('--accent', S.party.warna);
  refresh();
  const g = govSeats();
  openModal(`<h3>Selamat datang, ${esc(S.party.sing)}!</h3>
    <p>Tarikh simulasi: <b>${fmtDate(D())}</b>. Rujukan keadaan politik: selepas PRU15 (kerajaan perpaduan terbentuk).</p>
    <p>Dana permulaan <b>${rm(S.funds)}</b>${S.debt ? ` · hutang ${rm(S.debt)}` : ''} · ahli <b>${S.members.toLocaleString('en-US')}</b> · kerusi <b>${S.seats.P}</b>.</p>
    <p class="muted">${esc(note)}</p>
    <p class="muted">Kerajaan semasa (simulasi): ${S.gov.join(' + ')} dengan ${g} kerusi. PRU simulasi diadakan dalam ${GE_MONTHS} bulan.</p>
    <button class="btn" data-act="close">Mula</button>`);
}

/* ---------- RENDER PERMAINAN ---------- */
function refresh() {
  if (!S) return;
  document.documentElement.style.setProperty('--accent', S.party.warna);
  const p = S.party;
  $('#g-head').innerHTML = `<div class="badge" style="background:${p.warna}">${p.simbol}</div>
    <div class="hinfo"><b>${esc(p.sing)} <small>· ${esc(roleName())}</small></b><small>${fmtDate(D())} · Bulan ${S.month}/${GE_MONTHS}</small></div>
    <div class="chips"><span class="chip">Bulan ${S.month}/${GE_MONTHS}</span><span class="chip">${rm(S.funds)}</span></div>`;
  document.querySelectorAll('#g-nav button').forEach(b => b.classList.toggle('on', b.dataset.v === S.tab));
  const fn = { home: tabHome, act: tabAct, money: tabMoney, party: tabParty, world: tabWorld, mis: tabMis }[S.tab];
  $('#g-main').innerHTML = fn();
  save();
}

function seatBar() {
  const parts = BK.map(b => ({ n: BLOC[b].n, v: S.seats[b], c: BLOC[b].c }));
  if (S.seats.P > 0) parts.push({ n: S.party.sing, v: S.seats.P, c: S.party.warna });
  return `<div class="seatbar">${parts.filter(x => x.v > 0).map(x => `<i style="width:${x.v / 222 * 100}%;background:${x.c}" title="${esc(x.n)} ${x.v}"></i>`).join('')}</div>
    <div class="legend">${parts.map(x => `<span><i style="background:${x.c}"></i>${esc(x.n)} ${x.v}</span>`).join('')}</div>`;
}

function tabHome() {
  const g = govSeats(), ig = inGov(), M = MODE();
  const logs = S.log.slice(0, 4).map(l => `<div class="li"><small>${l.d} · ${esc(l.t)}</small>${esc(l.x)}</div>`).join('');
  return `<div class="card hero"><div class="row"><div><small>Musim politik ${S.season}</small><h3>${fmtDate(D())}</h3></div><span class="tag">${M.n}</span></div>
    ${bar('Menuju PRU (simulasi)', S.month, '#f2c14e', GE_MONTHS, v => `${v}/${GE_MONTHS} bulan`)}</div>
    <div class="card"><h4>${S.party.simbol} ${esc(S.party.nama)}</h4><div class="grid">
      <div class="stat"><small>Dana</small><b>${rm(S.funds)}</b></div><div class="stat"><small>Hutang</small><b>${rm(S.debt)}</b></div>
      <div class="stat"><small>Ahli</small><b>${S.members.toLocaleString('en-US')}</b></div><div class="stat"><small>Sokongan</small><b>${f1(S.support)}%</b></div>
      <div class="stat"><small>Kerusi Dewan Rakyat</small><b>${S.seats.P}</b></div><div class="stat"><small>Kedudukan</small><b>${ig ? 'Kerajaan' : 'Pembangkang'}</b></div></div>
      ${bar('Kestabilan parti', S.stab, S.stab < 35 ? 'var(--bad)' : 'var(--good)')}${bar('Reputasi', S.rep, '#38bdf8')}${bar('Kredibiliti', S.cred, '#f2c14e')}</div>
    <div class="card"><h4>Dewan Rakyat (222 kerusi)</h4>${seatBar()}
      <p class="muted">Kerajaan: <b>${S.gov.map(b => BLOC[b].n).join(' + ') || 'Parti anda'}</b> — ${g} kerusi (majoriti mudah 112). Pembangkang: ${222 - g}.</p></div>
    ${M.real ? `<div class="card"><small>Mod Real Malaysia: tindakan tertakluk undang-undang, kuasa jawatan dan institusi. Sumbangan tanpa pendedahan tidak dibenarkan.</small></div>` : ''}
    <div class="card"><h4>Perkembangan terkini</h4>${logs || '<small>Belum ada.</small>'}</div>
    <button class="btn big gold" data-act="next">⏭ Teruskan ke bulan seterusnya</button>
    <p class="note">Tenaga yang tidak digunakan hilang. Dunia terus bergerak walaupun anda tidak bertindak.</p>`;
}

/* ---------- TINDAKAN ---------- */
const spendAP = () => { S.ap--; };
const ACTIONS = [
  { id: 'dana', g: 'Kewangan', n: '💰 Majlis kutipan dana', d: 'Hasil bergantung pada reputasi dan penyokong. Kutipan boleh rendah.', cost: 20000,
    run() { if (chance(.5 + (S.rep - 50) / 200 + S.members / 20000)) { const g = Math.round(rnd(50, 180) * 1000 * (1 + S.members / 4000)); return { m: 'Majlis mendapat sambutan baik.', e: { fund: g, rep: 1 } }; } return { m: 'Kehadiran kurang; kutipan tidak menampung kos.', e: { fund: rnd(5, 25) * 1000 } }; } },
  { id: 'derma', g: 'Kewangan', n: '🤲 Pinta sumbangan penderma', d: 'Percuma, tetapi bergantung pada reputasi. Mod Real: penderma menuntut ketelusan.', cost: 0,
    run() { if (chance(.4 + S.rep / 220)) return { m: 'Beberapa penderma menyumbang.', e: { fund: rnd(30, 120) * 1000 } }; return { m: 'Penderma menolak buat masa ini.', e: { rep: -1 } }; } },
  { id: 'jimat', g: 'Kewangan', n: '✂️ Kurangkan perbelanjaan', d: 'Menjimatkan wang tetapi kakitangan dan cawangan tidak senang.', cost: 0,
    run() { return { m: 'Perbelanjaan operasi dipotong.', e: { fund: rnd(20, 60) * 1000, stab: -3 } }; } },
  { id: 'ahli', g: 'Organisasi', n: '📋 Kempen keahlian', d: 'Menambah ahli dan yuran bulanan.', cost: 10000,
    run() { if (chance(.85)) return { m: 'Pendaftaran ahli meningkat.', e: { members: Math.round(rnd(80, 260) * (1 + S.support / 20)), support: .1 } }; return { m: 'Sambutan hambar.', e: { members: rnd(10, 40) } }; } },
  { id: 'mesyuarat', g: 'Organisasi', n: '🗣️ Mesyuarat dalaman', d: 'Meredakan ketegangan dan menyelaras negeri serta cawangan.', cost: 5000,
    run() { return { m: 'Mesyuarat memperkukuh perpaduan.', e: { stab: rnd(3, 6) } }; } },
  { id: 'telus', g: 'Organisasi', n: '🔍 Laporan kewangan telus', d: 'Meningkatkan kepercayaan, tetapi kos audit.', cost: 20000,
    run() { return { m: 'Laporan diterbitkan kepada ahli dan umum.', e: { rep: 3, cred: 3 } }; } },
  { id: 'jawatan', g: 'Organisasi', n: '📈 Bertanding jawatan lebih tinggi', d: 'Naik pangkat dalam parti untuk menambah kuasa. Risiko ditolak.', cost: 10000, show: () => S.rank < 4,
    run() { if (chance(.28 + S.cred / 250 + Math.min(S.members / 40000, .15))) { S.rank++; S.power = RANKP[S.rank]; S.role = ROLES[S.rank]; return { m: `Anda dilantik sebagai ${S.role}. Kuasa kini ${Math.round(S.power * 100)}%.`, e: { cred: 1 } }; } return { m: 'Pencalonan tidak mendapat sokongan mencukupi.', e: { stab: -1, rep: -1 } }; } },
  { id: 'ceramah', g: 'Kempen & sokongan', n: '🎤 Ceramah umum', d: 'Menambah sokongan, berisiko tersasul.', cost: 25000,
    run() { if (risk(.22)) return { m: 'Kenyataan tersasul menjadi viral.', e: { support: .2, rep: -3, cred: -2 } }; return { m: 'Ucapan mendapat sambutan.', e: { support: rnd(3, 9) / 10, rep: 1 } }; } },
  { id: 'media', g: 'Kempen & sokongan', n: '📱 Kempen media sosial', d: 'Jangkauan luas; risiko serangan berita palsu.', cost: 15000,
    run() { if (risk(.2)) return { m: 'Kempen diserang pihak lawan.', e: { support: .1, rep: -3 } }; return { m: 'Video dan infografik tular.', e: { support: rnd(2, 6) / 10 } }; } },
  { id: 'komuniti', g: 'Kempen & sokongan', n: '🧺 Bantuan komuniti', d: 'Membina reputasi jangka sederhana.', cost: 40000,
    run() { return { m: 'Bantuan sampai kepada penduduk.', e: { rep: 3, support: .3, stab: 1 } }; } }
];
const H = {};
H.do = ({ id }) => {
  const a = ACTIONS.find(x => x.id === id);
  if (S.ap < 1) return toast('Tiada tindakan bulan ini.');
  if (a.cost > S.funds) return toast('Dana tidak mencukupi.');
  spendAP(); if (a.cost) money(-a.cost, 'Perbelanjaan: ' + a.n);
  const r = a.run();
  if (a.id === 'derma' && MODE().real && risk(.1)) { r.e.rep = (r.e.rep || 0) - 2; r.m += ' Semakan kepatuhan menimbulkan soalan.'; }
  const out = applyE(r.e, a.n); addLog('Tindakan', `${a.n.slice(2).trim()}: ${r.m}`);
  checkAll(); refresh(); resultModal(a.n, r.m, out);
};
function tabAct() {
  const groups = {};
  ACTIONS.filter(a => !a.show || a.show()).forEach(a => (groups[a.g] = groups[a.g] || []).push(a));
  return `<div class="apbox">⚡ Tenaga bulan ini: <b>${S.ap}/3</b><br><small>Setiap tindakan menggunakan tindakan. Hasil tidak dijamin.</small></div>` +
    Object.entries(groups).map(([g, l]) => `<h4 class="sec">${g}</h4>` + l.map(a => `<div class="card act"><div class="row"><b>${a.n}</b><span class="tag">${a.cost ? rm(a.cost) : 'Percuma'}</span></div><p class="muted">${a.d}</p><button class="btn sm" data-act="do" data-id="${a.id}" ${S.ap < 1 ? 'disabled' : ''}>Laksana</button></div>`).join('')).join('');
}

/* ---------- WANG ---------- */
function tabMoney() {
  return `<div class="grid" style="margin-top:12px"><div class="stat"><small>Baki dana</small><b>${rm(S.funds)}</b></div><div class="stat"><small>Jumlah hutang</small><b>${rm(S.debt)}</b></div></div>
    <button class="btn" data-act="loanmenu" ${S.ap < 1 ? 'disabled' : ''}>🏦 Buat pinjaman (tindakan)</button>
    <button class="btn ghost" data-act="invmenu" ${S.ap < 1 ? 'disabled' : ''}>📊 Buat pelaburan (tindakan)</button>
    <div class="card"><h4>Pinjaman aktif</h4>${S.loans.length ? S.loans.map(l => `<div class="li">Ansuran ${rm(l.monthly)}/bulan · ${l.left} bulan lagi</div>`).join('') : '<small>Tiada.</small>'}</div>
    <div class="card"><h4>Pelaburan aktif</h4>${S.invests.length ? S.invests.map(i => `<div class="li">${esc(i.n)} · ${rm(i.a)} · matang ${i.left} bulan lagi</div>`).join('') : '<small>Tiada.</small>'}</div>
    <div class="card"><h4>Lejar kewangan</h4>${S.ledger.slice(0, 15).map(l => `<div class="li"><div class="row"><span>${esc(l.t)}</span><b class="${l.a >= 0 ? 'pos' : 'neg'}">${l.a >= 0 ? '+' : ''}${rm(l.a)}</b></div><small>${l.d} · baki ${rm(l.b)}</small></div>`).join('')}</div>`;
}
H.loanmenu = () => openModal(`<h3>Pinjaman</h3><p class="muted">Menambah wang tetapi mewujudkan hutang. Gagal bayar menjejas reputasi dan kestabilan.</p>` +
  LOANS.map((l, i) => `<button class="opt" data-act="loan" data-i="${i}"><b>${rm(l.a)}</b><small>${l.m} bulan · faedah ${Math.round(l.r * 100)}% setahun · ansuran ${rm(l.a * (1 + l.r * l.m / 12) / l.m)}/bulan</small></button>`).join('') + `<button class="btn ghost" data-act="close">Batal</button>`);
H.loan = ({ i }) => {
  if (S.ap < 1) return; const l = LOANS[+i], total = l.a * (1 + l.r * l.m / 12);
  spendAP(); S.debt += total; S.loans.push({ left: l.m, monthly: total / l.m }); S.loansTaken = 1;
  money(l.a, 'Pinjaman diterima'); addLog('Kewangan', `Pinjaman ${rm(l.a)} diambil (${l.m} bulan).`); closeModal(); checkAll(); refresh();
  resultModal('Pinjaman diluluskan', `Anda menerima ${rm(l.a)}. Jumlah pembayaran balik ${rm(total)}.`, [{ k: 'fund', l: 'Dana', v: l.a }, { k: 'debt', l: 'Hutang', v: total }]);
};
H.invmenu = () => openModal(`<h3>Pelaburan</h3><p class="muted">Pulangan tidak dijamin. Wang terkunci sehingga matang.</p>` +
  INVS.map((v, i) => `<button class="opt" data-act="inv" data-i="${i}"><b>${v.n} — ${rm(v.a)}</b><small>${v.m} bulan · pulangan sasaran ${Math.round(v.ret * 100)}% · risiko rugi ${Math.round(v.risk * 100)}%. ${v.d}</small></button>`).join('') + `<button class="btn ghost" data-act="close">Batal</button>`);
H.inv = ({ i }) => {
  const v = INVS[+i]; if (S.ap < 1) return; if (S.funds < v.a) return toast('Dana tidak mencukupi.');
  spendAP(); money(-v.a, 'Pelaburan: ' + v.n); S.invests.push({ ...v, left: v.m });
  addLog('Kewangan', `Melabur ${rm(v.a)} dalam ${v.n}.`); closeModal(); refresh(); toast('Pelaburan dibuat.');
};

/* ---------- PARTI ---------- */
function tabParty() {
  const p = S.party, canAdmin = S.power >= .5;
  const adm = Object.entries(ADMIN).map(([k, a]) => {
    const cur = a.o.find(o => o[0] === S.admin[k]) || a.o[0];
    return `<label>${a.l}<select data-admin="${k}" ${canAdmin ? '' : 'disabled'}>${a.o.map(o => `<option value="${o[0]}" ${o[0] === S.admin[k] ? 'selected' : ''}>${o[1]}</option>`).join('')}</select></label><small>${cur[3]}</small>`;
  }).join('<div style="height:8px"></div>');
  const ro = S.roster.map((c, i) => `<div class="li"><div class="row"><b>${esc(c.name)}</b><span class="tag">${c.type}</span></div><small>Skor ${c.ov}/100 · ${esc(c.kuat)}</small></div>`).join('');
  const posts = Object.entries(S.posts).map(([k, c]) => `<div class="li"><b>${k}:</b> ${esc(c.name)} <small>(skor ${c.ov})</small></div>`).join('');
  return `<div class="card"><div class="row" style="justify-content:flex-start"><div class="badge" style="background:${p.warna}">${p.simbol}</div><div><h3>${esc(p.nama)} (${esc(p.sing)})</h3><small>${esc(p.ideologi)}</small></div></div>
    <p class="muted" style="margin-top:8px">“${esc(p.slogan)}” · Pemimpin: ${esc(p.pemimpin)}<br>Peranan anda: <b>${esc(S.role)}</b> · Kuasa ${Math.round(S.power * 100)}%</p></div>
    <div class="card"><h4>Gaya pentadbiran</h4>${canAdmin ? '' : '<small>Anda belum mempunyai kuasa mengubah struktur parti.</small>'}<div class="form">${adm}</div></div>
    <div class="card"><h4>Cari calon & pemimpin</h4><p class="muted">Kos RM20,000 + 1 tenaga. Profil ialah data rekaan simulasi.</p>
      <div class="grid">${CTYPES.map(t => `<button class="btn sm ghost" data-act="cand" data-t="${t}" ${S.ap < 1 ? 'disabled' : ''}>${t}</button>`).join('')}</div></div>
    <div class="card"><h4>Calon ditandatangani (${S.roster.length})</h4>${ro || '<small>Belum ada calon.</small>'}</div>
    ${posts ? `<div class="card"><h4>Jawatan parti</h4>${posts}</div>` : ''}`;
}
H.cand = ({ t }) => {
  if (S.ap < 1) return toast('Tindakan tidak tersedia sekarang.'); if (S.funds < 20000) return toast('Dana tidak mencukupi.');
  spendAP(); money(-20000, 'Mencari calon: ' + t);
  const names = []; while (names.length < 3) { const n = pick(NAMA); if (!names.includes(n)) names.push(n); }
  CUR_C = names.map((n, i) => {
    const st = {}; STAT.forEach(k => st[k] = rnd(25, 88));
    const ks = STAT.slice().sort((a, b) => st[b] - st[a]);
    return { id: i, name: n, type: t, st, ov: Math.round(STAT.reduce((a, k) => a + st[k], 0) / 4), kuat: KUAT[ks[0]], lemah: LEMAH[ks[3]], risk: pick(CRISK) };
  });
  openModal(`<h3>${t}: 3 profil (data rekaan simulasi)</h3>` + CUR_C.map(c => `<div class="card"><div class="row"><b>${esc(c.name)}</b><span class="tag">Skor ${c.ov}</span></div>
    ${STAT.map(k => bar(k, c.st[k], 'var(--accent)')).join('')}<small>💪 ${c.kuat} · ⚠️ ${c.lemah}<br>Risiko: ${c.risk}</small>
    <button class="btn sm" data-act="sign" data-i="${c.id}">Pilih</button></div>`).join('') + `<button class="btn ghost" data-act="close">Tutup</button>`);
  refresh();
};
let CUR_C = [];
H.sign = ({ i }) => {
  const c = CUR_C[+i]; if (!c) return;
  let e = {};
  if (c.type === 'Calon Parlimen' || c.type === 'Calon DUN') {
    if (c.type === 'Calon Parlimen') S.roster.push(c); else S.roster.push(c);
    e = { stab: c.ov > 60 ? 1 : 0, members: Math.round(c.st.Jentera / 2) };
  } else { S.posts[c.type] = c; e = { stab: c.ov / 14, cred: c.st.Pengalaman / 40, members: Math.round(c.st.Jentera / 2) }; }
  let msg = `${c.name} dipilih sebagai ${c.type}.`;
  if (risk(.15)) { e.stab = (e.stab || 0) - 3; msg += ' Sebahagian ahli membantah pilihan ini.'; }
  const out = applyE(e); addLog('Parti', msg); CUR_C = []; checkAll(); refresh(); resultModal('Pilihan disahkan', msg, out);
};
document.addEventListener('change', e => {
  const k = e.target.dataset && e.target.dataset.admin; if (!k || !S) return;
  S.admin[k] = e.target.value; const out = applyE({ stab: -1.5 });
  addLog('Parti', `${ADMIN[k].l} ditukar.`); toast('Perubahan menimbulkan sedikit ketidakselesaan.'); refresh();
});

/* ---------- DUNIA ---------- */
function tabWorld() {
  const tot = BK.reduce((a, b) => a + S.w[b], 0) + S.seats.P;
  const cal = CAL.filter(c => c[0] >= S.month).map(c => `<div class="cal"><b>${fmtDate(pd(addMonth(S.sDate, c[0])))}</b><span>${c[1]}</span></div>`).join('');
  return `<div class="card"><h4>Kerajaan & Parlimen</h4><p>Kerajaan: <b>${S.gov.map(b => BLOC[b].n).join(' + ') || 'Parti anda'}</b> (${govSeats()} kerusi)<br>Parti anda: <b>${inGov() ? 'dalam kerajaan' : 'pembangkang'}</b></p>${seatBar()}
      <small>Kerusi ialah anggaran simulasi berasaskan PRU15 dan berubah selepas PRU simulasi.</small></div>
    <div class="card"><h4>Hubungan gabungan</h4>${RK.map(b => `<div class="row">${bar(BLOC[b].n, S.rel[b], BLOC[b].c)}<button class="btn sm ghost" style="width:auto;margin:0 0 0 10px" data-act="negmenu" data-b="${b}">Berunding</button></div>`).join('')}
      <small>Berunding: RM10,000 + 1 tenaga.</small></div>
    <div class="card"><h4>Tinjauan kasar pengaruh (simulasi)</h4>${BK.map(b => bar(BLOC[b].n, S.w[b] / tot * 100, BLOC[b].c, 60, v => f1(v) + '%')).join('')}${bar(S.party.sing, S.seats.P / tot * 100 + S.support * .3, S.party.warna, 60, v => f1(v) + '%')}</div>
    <div class="card"><h4>Kalendar politik</h4>${cal || '<small>Tiada.</small>'}</div>
    <div class="card"><h4>Log peristiwa & berita</h4>${S.log.slice(0, 25).map(l => `<div class="li"><small>${l.d} · ${esc(l.t)}</small>${esc(l.x)}</div>`).join('')}</div>`;
}
H.negmenu = ({ b }) => {
  if (S.ap < 1) return toast('Tindakan tidak tersedia sekarang.'); if (S.funds < 10000) return toast('Dana tidak mencukupi.');
  spendAP(); money(-10000, 'Rundingan dengan ' + b);
  const ok = chance(.55 + (S.cred - 50) / 250 + (S.seats.P > 0 ? .05 : 0));
  const out = applyE({ rel: { [b]: ok ? rnd(4, 10) : -rnd(2, 5) }, cred: ok ? .5 : 0 });
  const m = ok ? `Rundingan dengan ${b} membawa kemajuan.` : `Rundingan dengan ${b} menemui jalan buntu.`;
  addLog('Rundingan', m); checkAll(); refresh(); resultModal('Rundingan', m, out);
};

/* ---------- MISI & PENCAPAIAN ---------- */
const MISI = [
  { id: 'm_ahli', n: 'Bina jentera', d: () => 'Capai 2,000 ahli.', pr: () => S.members / 2000, ok: () => S.members >= 2000, r: 'Kestabilan +3', e: { stab: 3 } },
  { id: 'm_dana', n: 'Kewangan sihat', d: () => 'Simpan sekurang-kurangnya RM600,000.', pr: () => S.funds / 600000, ok: () => S.funds >= 600000, r: 'Kredibiliti +2', e: { cred: 2 } },
  { id: 'm_sokong', n: 'Suara rakyat', d: () => `Capai sokongan ${S.tgtSup}%.`, pr: () => S.support / S.tgtSup, ok: () => S.support >= S.tgtSup, r: 'Reputasi +3', e: { rep: 3 } },
  { id: 'm_krisis', n: 'Penyelesai krisis', d: () => 'Tangani 6 peristiwa atau krisis.', pr: () => S.resolved / 6, ok: () => S.resolved >= 6, r: 'Kredibiliti +2', e: { cred: 2 } },
  { id: 'm_calon', n: 'Jentera calon', d: () => 'Tandatangani 5 calon.', pr: () => S.roster.length / 5, ok: () => S.roster.length >= 5, r: 'Kestabilan +2', e: { stab: 2 } },
  { id: 'm_rakan', n: 'Rakan gabungan', d: () => 'Hubungan 70 atau lebih dengan satu bloc.', pr: () => Math.max(...RK.map(b => S.rel[b])) / 70, ok: () => Math.max(...RK.map(b => S.rel[b])) >= 70, r: 'Kredibiliti +2', e: { cred: 2 } },
  { id: 'm_pru', n: 'Menambah kerusi', d: () => `Menang lebih daripada ${S.startP} kerusi pada PRU.`, elec: true, pr: () => S.lastWon ? S.seats.P / (S.startP + 1) : 0, ok: () => S.elCount > 0 && S.seats.P > S.startP, r: 'Reputasi +4', e: { rep: 4 } }
];
function initMissions() { S.mis = {}; MISI.forEach(m => S.mis[m.id] = 'aktif'); }
function checkAll() {
  if (!S) return;
  MISI.forEach(m => {
    if (S.mis[m.id] === 'aktif' && m.ok()) { S.mis[m.id] = 'selesai'; const out = applyE(m.e); addLog('Misi', `Misi selesai: ${m.n}. Ganjaran: ${m.r}.`); toast('🎯 Misi selesai: ' + m.n); }
  });
  ACH.forEach(a => {
    if (!S.ach[a.id] && a.ok()) { S.ach[a.id] = { d: fmtDate(D()) }; addLog('Pencapaian', `${a.t}: ${a.n}`); toast('🏆 ' + a.n); }
  });
}
const ACH = [
  { id: 'a_mula', n: 'Langkah Pertama', t: 'Gangsa', d: 'Mulakan simulasi.', ok: () => true },
  { id: 'a_ahli', n: 'Jentera Besar', t: 'Perak', d: 'Capai 5,000 ahli.', ok: () => S.members >= 5000 },
  { id: 'a_dana', n: 'Peti Besi Penuh', t: 'Perak', d: 'Dana RM1.5 juta.', ok: () => S.funds >= 1.5e6 },
  { id: 'a_bebas', n: 'Bebas Hutang', t: 'Gangsa', d: 'Langsaikan semua pinjaman.', ok: () => S.loansTaken && S.debt <= 0 },
  { id: 'a_krisis', n: 'Penenang Krisis', t: 'Emas', d: 'Tangani 12 krisis.', ok: () => S.resolved >= 12 },
  { id: 'a_kerusi', n: 'Kerusi Pertama', t: 'Emas', d: 'Menang kerusi pada PRU.', ok: () => S.elCount > 0 && S.lastWon > 0 },
  { id: 'a_20', n: 'Blok Berpengaruh', t: 'Platinum', d: 'Menang 20 kerusi atau lebih.', ok: () => S.elCount > 0 && S.seats.P >= 20 },
  { id: 'a_king', n: 'Penentu Kerajaan', t: 'Platinum', d: 'Menjadi penentu pembentukan kerajaan.', ok: () => S.flags.king },
  { id: 'a_gov', n: 'Masuk Kerajaan', t: 'Emas', d: 'Parti anda dalam kerajaan selepas PRU.', ok: () => S.elCount > 0 && inGov() },
  { id: 'a_maj', n: 'Legenda Majoriti', t: 'Legenda', d: 'Menang 112 kerusi atau lebih.', ok: () => S.seats.P >= 112 },
  { id: 'a_muflis', n: 'Krisis Kewangan', t: 'Amaran', d: 'Dana menjadi negatif.', ok: () => S.funds < 0 },
  { id: 'a_pecah', n: 'Parti Retak', t: 'Amaran', d: 'Kestabilan jatuh 10 atau kurang.', ok: () => S.stab <= 10 },
  { id: 'a_kalah', n: 'Kekalahan Pahit', t: 'Amaran', d: 'Tiada kerusi selepas PRU.', ok: () => S.elCount > 0 && S.seats.P === 0 }
];
function tabMis() {
  const st = { aktif: '⏳', selesai: '✅', gagal: '❌' };
  return `<h4 class="sec">Misi musim ${S.season}</h4>` + MISI.map(m => `<div class="card"><div class="row"><b>${m.n}</b><span>${st[S.mis[m.id]] || '⏳'}</span></div><p class="muted">${m.d()}</p>
    ${S.mis[m.id] === 'selesai' ? '<span class="done">Selesai</span>' : bar('Kemajuan', clamp(m.pr() * 100), 'var(--good)', 100, v => Math.round(v) + '%')}<small>Ganjaran: ${m.r}</small></div>`).join('') +
    `<h4 class="sec">Pencapaian (${Object.keys(S.ach).length}/${ACH.length})</h4><div class="card">${ACH.map(a => `<div class="ach ${S.ach[a.id] ? '' : 'lock'}"><div class="medal m-${a.t}">${a.t === 'Amaran' ? '⚠️' : '🏅'}</div><div><b>${a.n}</b> <small>· ${a.t}</small><br><small>${a.d}${S.ach[a.id] ? ' · ' + S.ach[a.id].d : ''}</small></div></div>`).join('')}</div>` +
    (S.seasons.length ? `<h4 class="sec">Arkib musim</h4>` + S.seasons.map(x => `<div class="card"><b>Musim ${x.no}</b> <small>${x.start} → ${x.end}</small><p>Kerusi parti: <b>${x.won}</b> · ${x.inGov ? 'Dalam kerajaan' : 'Pembangkang'} · ${esc(x.gov)}</p><small>${esc(x.pm)}</small></div>`).join('') : '');
}

/* ---------- PERISTIWA ---------- */
const EV = [];
const ev = o => EV.push(o);
ev({ id: 'kos', c: 'Isu rakyat', t: 'Kos sara hidup terus meningkat', d: 'Harga barang runcit naik dan rakyat meluahkan rungutan di media sosial.', loc: 'Seluruh negara', sev: 2, ch: [
  { t: 'Kenyataan & cadangan dasar bantuan', n: 'Tiada kos. Risiko dikritik tiada pelaksanaan.', e: { rep: 1, support: .2 }, p: .25, b: { cred: -2 }, bm: 'Dikritik kerana tiada tindakan nyata.' },
  { t: 'Program bantuan makanan', n: 'RM60,000. Kesan jangka pendek baik.', cost: 60000, e: { rep: 3, support: .4, stab: 1 } },
  { t: 'Kempen penerangan harga adil', n: 'RM30,000. Mungkin dituduh bermain politik.', cost: 30000, e: { support: .3 }, p: .3, b: { rep: -2 }, bm: 'Dituduh mengambil kesempatan.' }] });
ev({ id: 'banjir', c: 'Bencana', t: 'Banjir di beberapa daerah', d: 'Hujan lebat menyebabkan ribuan penduduk berpindah ke pusat pemindahan.', loc: 'Pantai Timur & Utara (simulasi)', sev: 3, ch: [
  { t: 'Hantar sukarelawan & bantuan', n: 'RM50,000. Reputasi meningkat.', cost: 50000, e: { rep: 4, support: .5, members: 60 } },
  { t: 'Kutip dana mangsa banjir', n: 'RM10,000. Perlu ketelusan.', cost: 10000, e: { fund: 20000, rep: 2 }, p: .3, b: { rep: -3 }, bm: 'Dana dipersoalkan.' },
  { t: 'Kenyataan simpati sahaja', n: 'Percuma. Dilihat kurang bertindak.', e: { rep: -.5 } }] });
ev({ id: 'pecah', c: 'Konflik politik', t: 'Kumpulan dalaman menuntut jawatan', d: 'Sekumpulan ahli kanan mendesak pembahagian jawatan dan portfolio.', loc: 'Majlis Tertinggi', sev: 2, cond: () => S.stab < 80, ch: [
  { t: 'Rundingan & agihan jawatan', n: 'RM15,000. Ada yang tidak puas hati.', cost: 15000, e: { stab: 5 }, p: .25, b: { stab: -3, members: -40 }, bm: 'Kumpulan lain membantah.' },
  { t: 'Tindakan disiplin', n: 'Tegas tetapi berisiko bantahan.', e: { stab: 2, members: -60 }, p: .4, b: { stab: -6, rep: -3 }, bm: 'Bantahan meluas.' },
  { t: 'Rujuk tribunal dalaman', n: 'RM10,000. Proses lambat.', cost: 10000, e: { stab: 3, cred: 2 } }] });
ev({ id: 'demo', c: 'Isu domestik', t: 'Demonstrasi isu harga barang', d: 'Penunjuk perasaan berhimpun di ibu negara menuntut tindakan.', loc: 'Kuala Lumpur (simulasi)', sev: 2, ch: [
  { t: 'Sertai secara aman', n: 'Risiko insiden tidak diingini.', e: { support: .4, rep: 1 }, p: .25, b: { rep: -4 }, bm: 'Berlaku salah faham dengan pihak berkuasa.' },
  { t: 'Berunding dengan penganjur', n: 'Selamat, kesan sederhana.', e: { rep: 2, cred: 1 } },
  { t: 'Jauhkan diri', n: 'Tiada risiko; sokongan tidak bertambah.', e: { support: -.1 } }] });
ev({ id: 'fake', c: 'Media', t: 'Maklumat palsu tentang parti tular', d: 'Mesej palsu mendakwa parti anda terlibat dalam skandal.', loc: 'Media sosial', sev: 2, idle: { rep: -3 }, ch: [
  { t: 'Sidang media menafikan', n: 'RM10,000.', cost: 10000, e: { rep: 2, cred: 1 }, p: .25, b: { rep: -2 }, bm: 'Penafian dikatakan lewat.' },
  { t: 'Laporan polis & penjelasan fakta', n: 'RM5,000.', cost: 5000, e: { rep: 1, support: .1 } }] });
ev({ id: 'poll', c: 'Media', t: 'Tinjauan pendapat dikeluarkan', d: 'Sebuah firma tinjauan menerbitkan kajian tentang sokongan parti.', loc: 'Seluruh negara', sev: 1, ch: [
  { t: 'Gunakan data untuk menyusun kempen', n: 'RM20,000.', cost: 20000, e: { support: .3 } },
  { t: 'Pertikai kaedah kajian', n: 'Murah, boleh nampak defensif.', e: { cred: -1 } },
  { t: 'Semak semula strategi', n: 'Percuma.', e: { stab: 1, cred: 1 } }] });
ev({ id: 'audit', c: 'Kerajaan & institusi', t: 'Pertikaian kewangan & audit', d: 'Wartawan mempersoalkan laporan kewangan parti.', loc: 'Ibu pejabat parti', sev: 2, cond: () => S.admin.telus !== 'tinggi', ch: [
  { t: 'Audit bebas & dedah laporan', n: 'RM40,000.', cost: 40000, e: { rep: 4, cred: 4 } },
  { t: 'Jawapan ringkas', n: 'Murah, soalan berterusan.', e: { rep: -1 }, p: .4, b: { rep: -5, cred: -4 }, bm: 'Persoalan lanjut timbul.' }] });
ev({ id: 'real', real: true, c: 'Kerajaan & institusi', t: 'Semakan kepatuhan undang-undang', d: 'Pihak berkuasa meminta dokumen keahlian dan penyata kewangan dikemukakan.', loc: 'Pejabat parti', sev: 2, ch: [
  { t: 'Serahkan dokumen lengkap', n: 'RM25,000.', cost: 25000, e: { cred: 3, rep: 1 } },
  { t: 'Minta tempoh tambahan', n: 'Berisiko dianggap lewa.', e: { stab: -1 }, p: .35, b: { rep: -4, cred: -3 }, bm: 'Dikenakan peringatan rasmi.' }] });
ev({ id: 'prk', c: 'Pilihan raya', t: 'Pilihan raya kecil diadakan', d: 'Sebuah kerusi kosong dan PRK akan diadakan. Kerusi ialah data rekaan simulasi.', loc: 'P.999 (kawasan fiksyen)', sev: 2, ch: [
  { t: 'Bertanding', n: 'RM150,000. Tanpa asas kukuh, mungkin kalah deposit.', cost: 150000, e: { support: .5, rep: 2 }, p: () => clamp(.8 - S.support / 30, .2, .85), b: { rep: -3, cred: -2, support: -.2 }, bm: 'Kalah teruk dan hilang deposit.' },
  { t: 'Sokong calon rakan', n: 'RM30,000.', cost: 30000, e: { rep: 1, support: .1 } },
  { t: 'Tidak bertanding', n: 'Percuma.', e: { rep: -1 } }] });
ev({ id: 'kerjasama', c: 'Konflik politik', t: 'Tawaran kerjasama daripada sebuah gabungan', d: '', loc: 'Rundingan politik', sev: 2, make() {
  const b = pick(RK);
  return { id: 'kerjasama', c: 'Konflik politik', t: `Tawaran kerjasama daripada ${b}`, d: `Pemimpin ${b} mengajak parti anda berunding tentang kerjasama dan pembahagian kerusi.`, loc: 'Rundingan politik', sev: 2, ch: [
    { t: 'Terima & rancang kerjasama', n: 'Hubungan baik, ahli mungkin membantah.', e: { rel: { [b]: 10 } }, p: .3, b: { stab: -3 }, bm: 'Sebahagian ahli tidak setuju.' },
    { t: 'Rundingan bersyarat', n: 'Sederhana.', e: { rel: { [b]: 4 }, cred: 1 } },
    { t: 'Tolak dengan sopan', n: 'Hubungan menurun.', e: { rel: { [b]: -5 }, cred: 1 } }] };
} });
ev({ id: 'jerebu', c: 'Alam sekitar', t: 'Jerebu & krisis air di beberapa negeri', d: 'Kualiti udara merosot dan bekalan air terjejas.', loc: 'Lembah Klang & Utara (simulasi)', sev: 2, ch: [
  { t: 'Edar topeng & air bersih', n: 'RM40,000.', cost: 40000, e: { rep: 3, support: .3 } },
  { t: 'Desak kerajaan bertindak', n: 'Percuma.', e: { support: .2 } },
  { t: 'Diam', n: 'Tiada kos.', e: { rep: -1 } }] });
ev({ id: 'siber', c: 'Teknologi', t: 'Serangan siber ke laman web parti', d: 'Pangkalan data keahlian dilaporkan terdedah.', loc: 'Pelayan parti', sev: 3, ch: [
  { t: 'Upah pakar keselamatan', n: 'RM35,000.', cost: 35000, e: { stab: 1, cred: 2 } },
  { t: 'Kenyataan umum sahaja', n: 'Murah, ahli bimbang.', e: { rep: -1, members: -30 } },
  { t: 'Lapor kepada pihak berkuasa', n: 'Betul, tetapi lambat.', e: { rep: 1 }, p: .3, b: { members: -30 }, bm: 'Sebahagian ahli keluar.' }] });
ev({ id: 'lompat', c: 'Konflik politik', t: 'Penyokong utama mahu sertai parti lain', d: 'Seorang pemimpin bahagian dikatakan berunding dengan parti lain.', loc: 'Bahagian parti', sev: 2, cond: () => S.members > 400, ch: [
  { t: 'Berbincang & tawar peranan', n: 'RM20,000.', cost: 20000, e: { stab: 3 } },
  { t: 'Biarkan pergi', n: 'Percuma.', e: { members: -80, stab: -1 } },
  { t: 'Tindakan disiplin', n: 'Tegas.', e: { stab: 1, members: -120 }, p: .35, b: { rep: -3 }, bm: 'Dilihat melulu.' }] });
ev({ id: 'penderma', c: 'Ekonomi & kewangan', t: 'Penderma besar tawar sumbangan bersyarat', d: 'Seorang ahli perniagaan menawarkan sumbangan besar dan meminta kemudahan politik kemudian.', loc: 'Kuala Lumpur', sev: 2, ch: [
  { t: 'Terima dengan pendedahan penuh', n: 'Selamat dan sah.', e: { fund: 250000, rep: 1, cred: 1 }, p: .2, b: { rep: -4, cred: -3 }, bm: 'Motif penderma dipersoalkan.' },
  { t: 'Terima tanpa pendedahan', n: 'Tidak sah dalam mod Real. Risiko dibongkar tinggi.', real: true, e: { fund: 400000 }, p: .55, b: { rep: -8, cred: -6, fund: -150000 }, bm: 'Dibongkar media dan didenda.' },
  { t: 'Tolak', n: 'Integriti terjaga.', e: { cred: 3, rep: 1 } }] });
ev({ id: 'fed', c: 'Kerajaan & institusi', t: 'Pertikaian Persekutuan–negeri tentang peruntukan', d: 'Sebuah kerajaan negeri mendakwa peruntukan pembangunan tidak adil.', loc: 'Negeri (simulasi)', sev: 1, ch: [
  { t: 'Sokong tuntutan negeri', n: 'Disukai tempatan.', e: { rep: 1, support: .2 } },
  { t: 'Seru rundingan', n: 'Seimbang.', e: { cred: 2 } },
  { t: 'Diam', n: 'Tiada kos.', e: {} }] });
ev({ id: 'kaum', c: 'Isu domestik', t: 'Isu sensitif kaum dan agama tular', d: 'Satu isu di media sosial mencetuskan perbalahan dan kebimbangan.', loc: 'Media sosial', sev: 3, ch: [
  { t: 'Seru ketenangan & perpaduan', n: 'Selamat, kurang dramatik.', e: { rep: 2, cred: 2 }, p: .2, b: { members: -40 }, bm: 'Segelintir ahli kecewa.' },
  { t: 'Tuntut tindakan pihak berkuasa', n: 'Menarik sokongan tertentu.', e: { support: .2, rep: -1 }, p: .3, b: { rep: -4 }, bm: 'Dituduh mempolitikkan isu.' },
  { t: 'Kekal berkecuali', n: 'Tiada kos.', e: {} }] });
ev({ id: 'ringgit', c: 'Ekonomi & kewangan', t: 'Nilai ringgit melemah', d: 'Pasaran mata wang tidak menentu dan kos import meningkat.', loc: 'Seluruh negara', sev: 2, ch: [
  { t: 'Cadangkan pakej ekonomi', n: 'Percuma.', e: { cred: 1, support: .2 } },
  { t: 'Anjur seminar ekonomi', n: 'RM30,000.', cost: 30000, e: { cred: 3 } },
  { t: 'Abai', n: 'Tiada kos.', e: { cred: -1 } }] });
ev({ id: 'krisispimpin', c: 'Konflik politik', t: 'Usul mencabar kepimpinan parti', d: 'Segelintir pemimpin bahagian mengemukakan usul tidak percaya kepada kepimpinan.', loc: 'Mesyuarat parti', sev: 3, cond: () => S.stab < 55, ch: [
  { t: 'Mesyuarat khas Majlis Tertinggi', n: 'RM20,000.', cost: 20000, e: { stab: 6 }, p: .3, b: { stab: -6 }, bm: 'Keputusan dipertikai.' },
  { t: 'Perhimpunan agung khas', n: 'RM60,000. Kesan besar.', cost: 60000, e: { stab: 9, cred: 2 }, p: .35, b: { stab: -8, members: -150 }, bm: 'Parti hampir berpecah.' },
  { t: 'Berunding secara tertutup', n: 'Percuma.', e: { stab: 2 } }] });
ev({ id: 'ag', sched: 6, c: 'Aktiviti parti', t: 'Perhimpunan Agung parti', d: 'Perwakilan berhimpun untuk mendengar ucapan dasar dan membahaskan usul. (Tarikh simulasi.)', loc: 'Dewan perhimpunan', sev: 1, ch: [
  { t: 'Ucapan dasar besar', n: 'RM50,000.', cost: 50000, e: { stab: 4, support: .3, rep: 2 } },
  { t: 'Fokus pembaharuan parti', n: 'RM30,000.', cost: 30000, e: { stab: 2, cred: 3 }, p: .25, b: { stab: -3 }, bm: 'Pembaharuan dibantah penyokong lama.' },
  { t: 'Perhimpunan ringkas', n: 'Murah.', e: { stab: 1 } }] });
ev({ id: 'pemilihan', sched: 12, c: 'Aktiviti parti', t: 'Pemilihan jawatan parti', d: 'Pencalonan dan undian untuk jawatan utama parti. (Tarikh simulasi.)', loc: 'Seluruh parti', sev: 2, ch: [
  { t: 'Bentuk barisan bersepadu', n: 'RM20,000.', cost: 20000, e: { stab: 4, cred: 1 }, p: .2, b: { stab: -4 }, bm: 'Persaingan dalaman meruncing.' },
  { t: 'Benarkan pertandingan terbuka', n: 'Penyertaan tinggi, persaingan sengit.', e: { members: 120, stab: -2, rep: 2 } },
  { t: 'Pilihan Majlis Tertinggi', n: 'Cepat, mudah dikritik.', e: { stab: 1, rep: -2 } }] });

function pickEvent() {
  const sch = EV.find(e => e.sched === S.month); if (sch) return sch;
  let pool = EV.filter(e => !e.sched && (!e.cond || e.cond()) && (!e.real || MODE().real) && !S.used.includes(e.id));
  if (!pool.length) { S.used = []; pool = EV.filter(e => !e.sched && (!e.cond || e.cond()) && (!e.real || MODE().real)); }
  const e = pick(pool); S.used.push(e.id); return e;
}
function showEvent(e0) {
  const e = e0.make ? e0.make() : e0; CUR = e;
  const ch = e.ch.concat([{ t: '⏳ Tunggu & lihat', n: 'Tiada kos. Krisis mungkin berkembang.', idle: true, e: e.idle || { rep: -1, stab: -1 } }]);
  CUR.chx = ch;
  openModal(`<span class="cat">${e.c}</span> <span class="sev">${'●'.repeat(e.sev)}${'○'.repeat(3 - e.sev)}</span>
    <h3>${esc(e.t)}</h3><p>${esc(e.d)}</p><small>${fmtDate(D())} · ${esc(e.loc)}</small><div style="height:8px"></div>` +
    ch.map((c, i) => `<button class="opt" data-act="chev" data-i="${i}"><b>${esc(c.t)}</b><small>${esc(c.n)}${c.cost ? '' : ''}</small></button>`).join(''));
}
H.chev = ({ i }) => {
  const e = CUR, c = e.chx[+i];
  if (c.cost && S.funds < c.cost) return toast('Dana tidak mencukupi.');
  if (c.real && MODE().real) return toast('Tidak sah di sisi undang-undang dalam mod Real Malaysia.');
  if (c.cost) money(-c.cost, 'Perbelanjaan: ' + c.t);
  let out = applyE(c.e, c.t), msg = c.idle ? 'Anda menunggu; dunia terus bergerak.' : 'Tindakan dilaksanakan.';
  const p = typeof c.p === 'function' ? c.p() : c.p;
  if (p && risk(p)) { out = out.concat(applyE(c.b, 'Kesan buruk')); msg += ' ⚠️ ' + (c.bm || 'Hasil kurang baik.'); }
  if (!c.idle) S.resolved++;
  addLog('Peristiwa', `${e.t}: ${c.t}. ${msg}`); checkAll(); refresh();
  resultModal(e.t, msg, out);
};

/* ---------- UNDIAN PARLIMEN ---------- */
function openVote() {
  CURV = pick(VOTES); const P = S.seats.P;
  openModal(`<span class="cat">Dewan Rakyat</span><h3>${esc(CURV.t)}</h3><p>${esc(CURV.d)}</p>
    <small>Kerajaan ${govSeats()} kerusi · Pembangkang ${222 - govSeats()}${P ? ` · Kerusi anda ${P}` : ' · Parti anda tiada kerusi: hanya boleh mengeluarkan kenyataan'}.</small>
    <div style="height:8px"></div>
    <button class="opt" data-act="vote" data-v="ya"><b>Sokong</b><small>Mengundi setuju.</small></button>
    <button class="opt" data-act="vote" data-v="tidak"><b>Tolak</b><small>Mengundi tidak setuju.</small></button>
    <button class="opt" data-act="vote" data-v="kecuali"><b>Berkecuali</b><small>Tidak mengundi.</small></button>`);
}
H.vote = ({ v }) => {
  const t = CURV, P = S.seats.P, ig = inGov();
  let G = govSeats(), O = 222 - G; if (ig) G -= P; else O -= P;
  let yes = Math.round(G * .93) + Math.round(O * (t.pop ? .12 : .05)), no = Math.round(O * .85) + Math.round(G * .01);
  if (v === 'ya') yes += P; else if (v === 'tidak') no += P;
  const lulus = yes > no, k = P > 0 ? 1 : .35, e = {};
  if (t.pop) e.support = (v === 'ya' ? .3 : v === 'tidak' ? -.25 : -.05) * k;
  else { e.cred = (v === 'tidak' ? 1 : v === 'ya' ? -.5 : 0) * k; e.support = v === 'ya' ? .1 * k : 0; }
  if (P > 0) {
    if (ig && v !== 'ya') { e.stab = -3; e.rel = {}; S.gov.forEach(b => { if (b !== S.pBloc && RK.includes(b)) e.rel[b] = -3; }); }
    if (!ig && v === 'ya') { e.rel = {}; S.gov.forEach(b => { if (RK.includes(b)) e.rel[b] = 2; }); e.cred = (e.cred || 0) - 1; }
  }
  const out = applyE(e);
  const msg = `Setuju ${yes}, tidak ${no}, berkecuali/tidak hadir ${222 - yes - no}. ${lulus ? 'Usul diluluskan.' : 'Usul ditolak.'}${t.t.includes('percaya') ? (lulus ? ' Kerajaan mengekalkan keyakinan Dewan.' : ' Kerajaan goyah; kestabilan kerajaan diuji (simulasi).') : ''}`;
  addLog('Parlimen', `${t.t}: ${msg}`); S.resolved++; checkAll(); refresh(); resultModal(t.t, msg, out);
};

/* ---------- BULAN SETERUSNYA ---------- */
H.next = () => {
  if (S.phase !== 'play') return;
  const M = MODE();
  // kewangan bulanan
  const inc = Math.round(S.members * 12 + S.support * 2500);
  let exp = 12000 + S.members * 4 + (S.admin.telus === 'tinggi' ? 3000 : 0);
  money(inc, 'Yuran & sumbangan kecil'); money(-Math.round(exp), 'Perbelanjaan operasi');
  // pinjaman
  S.loans.forEach(l => {
    if (S.funds >= l.monthly) { money(-l.monthly, 'Bayaran pinjaman'); S.debt = Math.max(0, S.debt - l.monthly); }
    else { S.rep = clamp(S.rep - 3); S.stab = clamp(S.stab - 2); S.debt += l.monthly * .05; addLog('Kewangan', 'Gagal bayar ansuran pinjaman. Reputasi dan kestabilan terjejas.'); }
    l.left--;
  });
  S.loans = S.loans.filter(l => l.left > 0); if (!S.loans.length && S.debt < 1 && S.loansTaken) S.debt = 0;
  // pelaburan
  S.invests.forEach(i => {
    i.left--; if (i.left > 0) return;
    const bad = Math.random() < clamp(i.risk * M.neg, 0, .9), g = Math.round(i.a * (bad ? -i.loss : i.ret * (.7 + Math.random() * .6)));
    money(i.a + g, `Pelaburan matang: ${i.n}`); addLog('Kewangan', `${i.n} matang: ${g >= 0 ? 'untung' : 'rugi'} ${rm(Math.abs(g))}.`);
  });
  S.invests = S.invests.filter(i => i.left > 0);
  // pentadbiran bulanan
  Object.keys(S.admin).forEach(k => { const o = ADMIN[k].o.find(x => x[0] === S.admin[k]); if (o && o[2]) applyE(o[2]); });
  // sokongan hanyut
  S.support = clamp(S.support + (S.rep - 50) / 1500 + (S.stab - 50) / 2500 - .01, .1, 60);
  S.stab = clamp(S.stab + (S.stab < 50 ? .3 : -.2));
  if (S.funds < 0) { S.rep = clamp(S.rep - 3); S.stab = clamp(S.stab - 3); addLog('Kewangan', 'Dana negatif! Reputasi dan kestabilan merosot.'); }
  if (S.stab <= 5 && S.members > 100) { const l = Math.round(S.members * .25); S.members -= l; addLog('Parti', `Parti retak: ${l} ahli keluar.`); }
  // dunia bergerak sendiri
  BK.forEach(b => { S.w[b] = clamp(S.w[b] + rnd(-15, 15) / 10, .5, 130); });
  if (Math.random() < .6) { const n = pick(WORLD_NEWS); for (const b in n.e) S.w[b] = clamp(S.w[b] + n.e[b], .5, 130); addLog('Dunia', n.t); }
  S.date = addMonth(S.date, 1); S.month++; S.ap = 3;
  checkAll(); refresh();
  if (S.month >= GE_MONTHS) return startElection();
  if (VOTE_MONTHS.includes(S.month)) return openVote();
  if (EV.find(e => e.sched === S.month)) return showEvent(pickEvent());
  if (Math.random() < M.evp) showEvent(pickEvent());
  else toast('Bulan berlalu dengan agak tenang.');
};

/* ---------- PILIHAN RAYA ---------- */
function startElection() {
  MISI.forEach(m => { if (S.mis[m.id] === 'aktif' && !m.elec) S.mis[m.id] = 'gagal'; });
  S.phase = 'election';
  S.el = { step: 0, man: [], contest: 0, strat: [], qual: 35, camp: 0, manScore: 0, res: null };
  closeModal(); show('s-election'); renderEl(); save();
}
function areaCap() {
  if (S.path === 'new') return ({ 'Seluruh negara': 150, 'Negeri tertentu': 40, 'Kawasan terpilih': 12 })[S.party.kawasan] || 40;
  return Math.min(222, Math.max(40, Math.round(S.seats.P * 2.2 + 20)));
}
const costSeat = () => Math.round(100000 * MODE().cc);
const stratCost = (s, n) => Math.round(s.c * (.5 + n / 80));
function stepBar(n) { return `<div class="step">${[0, 1, 2, 3, 4, 5, 6].map(i => `<i class="${i <= n ? 'on' : ''}"></i>`).join('')}</div>`; }
function renderEl() {
  const el = S.el, box = $('#s-election'); let h = stepBar(el.step);
  if (el.step === 0) {
    h += hdr('🗳️ Parlimen dibubarkan', `PRU (tarikh simulasi): ${fmtDate(D())}`) +
      `<div class="card"><h4>Keadaan sebelum PRU</h4>${seatBar()}<div class="grid"><div class="stat"><small>Dana</small><b>${rm(S.funds)}</b></div><div class="stat"><small>Sokongan</small><b>${f1(S.support)}%</b></div><div class="stat"><small>Ahli</small><b>${S.members.toLocaleString('en-US')}</b></div><div class="stat"><small>Calon</small><b>${S.roster.length}</b></div></div></div>
      <p class="muted">Langkah: manifesto, calon & kawasan, kempen, hari mengundi, pembentukan kerajaan.</p><button class="btn big" data-act="elnext">Mula persiapan</button>`;
  } else if (el.step === 1) {
    h += hdr('📜 Manifesto', 'Pilih sehingga 3 fokus. Janji tidak realistik menjejas kredibiliti.') +
      MAN.map((m, i) => `<button class="opt ${el.man.includes(i) ? 'sel' : ''}" data-act="man" data-i="${i}"><b>${m.n}</b><small>Kos: ${m.cost} · Kebolehlaksanaan ${m.feas}/100 · Bidang kuasa: ${m.j}<br>Risiko: ${m.risk}</small></button>`).join('') +
      `<button class="btn big" data-act="elnext" ${el.man.length ? '' : 'disabled'}>Seterusnya (${el.man.length}/3)</button>`;
  } else if (el.step === 2) {
    const cap = areaCap(), cs = costSeat(), mx = Math.max(0, Math.min(cap, Math.floor(S.funds * .7 / cs)));
    const def = Math.min(mx, S.path === 'new' ? 20 : S.seats.P + 10);
    h += hdr('🧑‍💼 Calon & kawasan', 'Tentukan bilangan kerusi Parlimen yang ditandingi.') +
      `<div class="card"><p>Kawasan operasi: <b>${esc(S.party.kawasan)}</b> · Had: ${cap} · Kos setiap kerusi: ${rm(cs)}</p>
      <input type="range" id="el_c" min="0" max="${mx}" value="${def}"><div class="row"><span id="el_info"></span></div>
      <small>Calon ditandatangani: ${S.roster.length}. Kerusi tanpa calon pilihan guna calon umum (skor 35).</small></div><button class="btn big" data-act="elnext">Seterusnya</button>`;
  } else if (el.step === 3) {
    h += hdr('📣 Strategi kempen', 'Pilih sehingga 3. Setiap strategi ada kos dan risiko.') +
      `<p class="muted">Kos kerusi: ${rm(el.contest * costSeat())} · Dana: ${rm(S.funds)}</p>` +
      STRATS.map((s, i) => `<button class="opt ${el.strat.includes(i) ? 'sel' : ''}" data-act="strat" data-i="${i}"><b>${s.n} — ${rm(stratCost(s, el.contest))}</b><small>${s.d}</small></button>`).join('') +
      `<button class="btn big gold" data-act="elnext">Hari penamaan & mengundi</button>`;
  } else if (el.step === 4) {
    const r = el.res;
    h += hdr('🗳️ Keputusan PRU', `Keluar mengundi (simulasi): ${r.turnout}%`) +
      `<div class="card"><h4>Parti anda</h4><div class="big-num">${r.won}</div><p class="muted">kerusi dimenangi daripada ${el.contest} yang ditandingi · undi popular anggaran ${f1(r.share)}%</p></div>
      <div class="card"><h4>Dewan Rakyat selepas PRU</h4>${seatBar()}</div>
      <div class="card"><h4>Analisis</h4><div class="li">Kadar kemenangan kerusi: ${Math.round(r.p * 100)}% (calon ${Math.round(el.qual)} · kempen ${el.camp} · manifesto ${f1(el.manScore)})</div>
      <div class="li">Sebelum PRU: ${S.startP} kerusi → selepas: ${r.won}</div></div>
      <button class="btn big" data-act="elnext">Rundingan pembentukan kerajaan</button>`;
  } else if (el.step === 5) {
    const P = S.seats.P;
    h += hdr('🏛️ Pembentukan kerajaan', 'Majoriti mudah ialah 112 kerusi. Yang di-Pertuan Agong melantik Ahli Dewan Rakyat yang pada hemat Baginda mungkin mendapat kepercayaan majoriti (Perkara 43(2)(a)).') +
      COALS.map(c => { const ci = coalInfo(c); return `<button class="opt" data-act="coal" data-id="${c.id}"><b>${c.n}</b><small>Tanpa anda ${ci.without} · Dengan anda ${ci.withP} · ${ci.status}</small></button>`; }).join('') +
      (P >= 112 ? `<button class="opt" data-act="coal" data-id="solo"><b>Bentuk kerajaan sendiri</b><small>${P} kerusi — majoriti mudah.</small></button>` : '') +
      `<button class="opt" data-act="coal" data-id="opp"><b>Kekal pembangkang</b><small>Gabungan lain membentuk kerajaan. Parti anda mengambil peranan pembangkang.</small></button>`;
  } else {
    const g = el.gov;
    h += hdr('📚 Ringkasan musim', `Musim ${S.season} tamat pada ${fmtDate(D())}`) +
      `<div class="card"><h4>Kerajaan baharu</h4><p><b>${esc(g.label)}</b> — ${g.seats} kerusi (${g.kind})</p><small>${esc(g.pm)}</small></div>
      <div class="card"><h4>Parti anda</h4><p>${S.seats.P} kerusi · ${inGov() ? 'Dalam kerajaan' : 'Pembangkang'}</p></div>
      <div class="card"><h4>Pemantauan manifesto</h4>${S.prom.map(p => `<div class="li"><div class="row"><span>${esc(p.n)}</span><b>${p.s}</b></div></div>`).join('')}</div>
      <div class="card"><h4>Pencapaian & misi</h4><p>${Object.keys(S.ach).length} pencapaian · ${Object.values(S.mis).filter(x => x === 'selesai').length} misi selesai</p></div>
      <button class="btn big" data-act="newseason">Mulakan musim baharu</button>`;
  }
  box.innerHTML = h;
  if (el.step === 2) updContest();
}
function updContest() {
  const r = $('#el_c'); if (!r) return; const n = +r.value, c = n * costSeat();
  $('#el_info').innerHTML = `<b>${n}</b> kerusi · kos ${rm(c)}`;
}
document.addEventListener('input', e => { if (e.target.id === 'el_c') updContest(); });
H.man = ({ i }) => { const m = S.el.man, k = +i; if (m.includes(k)) m.splice(m.indexOf(k), 1); else if (m.length < 3) m.push(k); else toast('Maksimum 3 fokus.'); renderEl(); };
H.strat = ({ i }) => { const m = S.el.strat, k = +i; if (m.includes(k)) m.splice(m.indexOf(k), 1); else if (m.length < 3) m.push(k); else toast('Maksimum 3 strategi.'); renderEl(); };
H.elnext = () => {
  const el = S.el;
  if (el.step === 1) {
    const sel = el.man.map(i => MAN[i]); let sc = 0;
    sel.forEach(m => { sc += (m.feas - 40) / 10; if (m.n === S.party.fokus) sc += 2; if (m.feas < 50) S.cred = clamp(S.cred - 3); });
    el.manScore = Math.max(0, sc * 1.5);
    S.prom = sel.map(m => ({ n: m.n, f: m.feas, s: 'Belum dinilai' }));
    addLog('Pilihan raya', 'Manifesto: ' + sel.map(m => m.n).join(', ') + '.');
  }
  if (el.step === 2) {
    el.contest = +($('#el_c') ? $('#el_c').value : 0);
    const n = S.roster.filter(c => c.type === 'Calon Parlimen').length + S.roster.filter(c => c.type === 'Calon DUN').length * .5;
    const have = Math.min(el.contest, Math.round(n)), avg = n ? S.roster.reduce((a, c) => a + c.ov, 0) / S.roster.length : 35;
    el.qual = el.contest ? (have * avg + (el.contest - have) * 35) / el.contest : 35;
  }
  if (el.step === 3) {
    const sc = el.contest * costSeat(), st = el.strat.map(i => STRATS[i]), tc = st.reduce((a, s) => a + stratCost(s, el.contest), 0);
    if (sc + tc > S.funds) return toast(`Dana tidak mencukupi (${rm(sc + tc)} diperlukan).`);
    if (sc) money(-sc, 'Kos pencalonan & kempen PRU'); if (tc) money(-tc, 'Strategi kempen PRU');
    el.camp = Math.round(st.reduce((a, s) => a + (s.id === 'jentera' && S.members < 1000 ? s.s / 2 : s.s), 0));
    if (st.some(s => s.id === 'media') && risk(.2)) { el.camp -= 3; addLog('Pilihan raya', 'Kempen media sosial diserang berita palsu.'); }
    runElection();
  }
  el.step++; renderEl(); save();
};
function runElection() {
  const M = MODE(), el = S.el, n = el.contest;
  let p = S.support / 100 * 3 + (el.qual - 50) / 100 * .15 + el.camp * .003 + el.manScore * .002 + (S.cred - 50) / 500 + (S.stab - 50) / 800 - .01 + (S.seats.P > 0 ? .06 : 0);
  p = clamp(clamp(p, .01, .85) * M.elec, .01, .9);
  let won = 0; for (let i = 0; i < n; i++) if (Math.random() < p) won++;
  if (S.path !== 'new' && n === 0) won = 0;
  const w = {}; let tot = 0;
  BK.forEach(b => { w[b] = Math.max(.5, S.w[b] * (1 + rnd(-12, 12) / 100)); });
  if (S.pBloc) w[S.pBloc] = Math.max(.5, w[S.pBloc] + (S.support - S.sup0) * 2.2);
  BK.forEach(b => tot += w[b]);
  const rest = 222 - won, seats = {}; let sum = 0;
  BK.forEach(b => { seats[b] = Math.round(rest * w[b] / tot); sum += seats[b]; });
  const big = BK.reduce((a, b) => seats[b] > seats[a] ? b : a, 'PH'); seats[big] += rest - sum;
  S.seats = { ...seats, P: won }; S.w = { ...seats };
  S.lastWon = won; S.elCount++;
  el.res = { won, p, turnout: rnd(64, 76), share: clamp(S.support + el.camp * .05 + (p > .3 ? 1 : 0), .1, 60) };
  S.support = clamp(won ? Math.max(S.support, won / 222 * 100) : S.support * .8, .2, 60);
  S.stab = clamp(S.stab + (won > S.startP ? 4 : -4));
  addLog('Pilihan raya', `PRU simulasi: ${S.party.sing} menang ${won} kerusi.`); checkAll();
}
function coalInfo(c) {
  const P = S.seats.P, without = c.m.reduce((a, b) => a + S.seats[b], 0), withP = without + P;
  const own = S.pBloc && c.m.includes(S.pBloc);
  const rel = c.m.filter(b => RK.includes(b)).reduce((a, b, _, arr) => a + S.rel[b] / arr.length, 0);
  let status;
  if (own) status = withP >= 112 ? 'Parti anda sudah dalam blok — majoriti' : 'Parti anda dalam blok — tiada majoriti';
  else if (without >= 112) status = 'Sudah majoriti tanpa anda';
  else if (withP >= 112) status = 'Anda penentu majoriti';
  else status = 'Tiada majoriti walaupun anda sertai';
  if (!own && rel < 40) status += ' · hubungan rendah (mungkin ditolak)';
  return { without, withP, status, rel, own };
}
H.coal = ({ id }) => {
  const el = S.el, P = S.seats.P; let c, joined = false, label, kind, pm, flagK = false;
  if (id === 'solo') { S.gov = []; S.pBloc = null; S.joinedGov = true; label = 'Kerajaan parti anda'; kind = 'majoriti sendiri'; pm = 'Calon Perdana Menteri: pemimpin parti anda'; el.gov = { label, seats: P, kind, pm }; }
  else if (id === 'opp') {
    const list = COALS.map(x => ({ x, i: coalInfo(x) })).sort((a, b) => b.i.without - a.i.without);
    const best = (list.find(l => l.i.without >= 112) || list[0]);
    S.gov = [...best.x.m]; if (S.pBloc && !S.gov.includes(S.pBloc)) { /* kekal */ } if (S.pBloc && S.gov.includes(S.pBloc)) { S.pBloc = null; S.stab = clamp(S.stab - 4); S.rep = clamp(S.rep - 3); }
    S.joinedGov = false; label = best.x.n; kind = best.i.without >= 112 ? 'majoriti' : 'minoriti'; el.gov = { label, seats: best.i.without, kind, pm: pmOf(best.x.m) };
  } else {
    c = COALS.find(x => x.id === id); const ci = coalInfo(c);
    if (!ci.own && ci.rel < 40) { toast('Gabungan itu enggan menerima parti anda (hubungan rendah).'); return; }
    if (S.pBloc && !ci.own) { S.pBloc = null; S.stab = clamp(S.stab - 6); S.rep = clamp(S.rep - 4); addLog('Parti', 'Parti meninggalkan blok asal untuk menyertai gabungan lain.'); }
    S.gov = [...c.m]; S.joinedGov = !S.pBloc;
    flagK = !ci.own && ci.without < 112 && ci.withP >= 112;
    kind = ci.withP >= 112 ? (flagK ? 'majoriti — anda penentu' : 'majoriti') : 'minoriti'; label = c.n;
    el.gov = { label, seats: ci.withP, kind, pm: pmOf(c.m) };
  }
  if (flagK) S.flags.king = true;
  const out = inGov() ? applyE({ support: .4, cred: 2, stab: 2 }) : applyE({ stab: -1 });
  addLog('Kerajaan', `${el.gov.label} membentuk kerajaan (${el.gov.kind}). ${inGov() ? 'Parti anda dalam kerajaan.' : 'Parti anda pembangkang.'}`);
  S.prom.forEach(m => { const q = Math.random(); const f = m.f / 100;
    m.s = inGov() ? (q < f * .35 ? 'Selesai' : q < f * .8 ? 'Sedang dilaksanakan' : q < .9 ? 'Tertangguh' : 'Gagal') : (q < .6 ? 'Tertangguh (pembangkang)' : 'Gagal / tidak relevan'); });
  S.seasons.push({ no: S.season, start: fmtDate(pd(S.sDate)), end: fmtDate(D()), won: S.seats.P, inGov: inGov(), gov: `${el.gov.label} (${el.gov.seats} kerusi, ${el.gov.kind})`, pm: el.gov.pm });
  checkAll(); el.step = 6; renderEl(); save();
};
const pmOf = m => { const b = m.filter(x => x !== 'LAIN').reduce((a, x) => S.seats[x] > S.seats[a] ? x : a, m[0]); return `Calon Perdana Menteri daripada blok ${BLOC[b].n}, dilantik apabila mendapat kepercayaan majoriti.`; };
H.newseason = () => {
  const d = pd(S.date); d.setDate(d.getDate() + 5); S.date = isoStr(d); S.sDate = S.date;
  S.season++; S.month = 0; S.ap = 3; S.phase = 'play'; S.el = null; S.used = []; S.startP = S.seats.P;
  S.support = clamp(S.seats.P > 0 ? Math.max(S.seats.P / 222 * 100, .3) : S.support, .3, 60); S.sup0 = S.support; S.tgtSup = Math.ceil(S.support) + 4; S.lastWon = 0;
  S.w = { ...W0 }; BK.forEach(b => S.w[b] = S.seats[b]);
  initMissions(); S.tab = 'home'; addLog('Musim', `Musim politik ${S.season} bermula.`); checkAll(); show('s-game'); refresh();
};

/* ---------- PENGENDALI KLIK ---------- */
H.close = () => { closeModal(); if (S && S.phase === 'play' && $('#s-game').classList.contains('active')) refresh(); };
H.tab = ({ v }) => { S.tab = v; refresh(); $('#g-main').scrollTop = 0; };
H.about = () => openModal(`<h3>Cara bermain</h3>
  <p>1. Pilih mod, laluan dan identiti parti.<br>2. Setiap bulan anda ada 3 tenaga untuk tindakan, wang, calon dan rundingan.<br>3. Tekan <b>Teruskan ke bulan seterusnya</b>: kewangan dikira, dunia bergerak dan peristiwa atau undian Parlimen mungkin berlaku.<br>4. Selepas ${GE_MONTHS} bulan (simulasi), PRU diadakan: manifesto, calon, kempen, keputusan dan pembentukan kerajaan.<br>5. Mulakan musim baharu dan teruskan.</p>
  <p class="muted">Semua calon, berita dan angka ialah rekaan atau anggaran simulasi. Hasil tidak dijamin dan lawan bertindak mengikut kepentingan sendiri.</p><button class="btn" data-act="close">Faham</button>`);
H.newgame = () => { renderMode(); show('s-mode'); };
H.cont = () => { const d = load(); if (!d) return toast('Tiada simpanan.'); S = d; if (S.phase === 'election' && S.el) { show('s-election'); renderEl(); } else { show('s-game'); refresh(); } };
H.mode = ({ v }) => { SU = { mode: v }; renderPath(); show('s-path'); };
H.path = ({ v }) => { SU.path = v; SU.pi = v === 'join' ? 0 : SU.pi; SU.p = null; renderSetup(); show('s-setup'); };
H.pickparty = ({ i }) => { SU.pi = +i; SU.p = Object.assign(SU.p || {}, { role: val('role'), pemimpin: val('pemimpin'), slogan: val('slogan') }); renderSetup(); };
H.suggest = suggestParty;
H.toconfirm = () => { const o = collect(); if (!o) return; SU.p = o; renderConfirm(); show('s-confirm'); };
H.start = startGame;
H.goto = ({ to }) => { if (to === 's-mode') renderMode(); if (to === 's-path') renderPath(); if (to === 's-setup') renderSetup(); show(to); };

document.addEventListener('click', e => {
  const b = e.target.closest('[data-act]'); if (!b || b.disabled) return;
  const f = H[b.dataset.act]; if (f) f(b.dataset, b);
});

/* ---------- MULA ---------- */
(function init() {
  if (load()) $('#btn-continue').hidden = false;
})();


/* ========================= v4 FEATURE PATCH =========================
   Identity builder, leadership archetypes, constituency start, policy stance,
   image uploads, government hub, pause/save tools. All game numbers are simulated.
   ==================================================================== */
const LEADER_STYLES = [
 {id:'kingmaker',n:'Kingmaker / Pemimpin Berpengaruh',d:'Rundingan, strategi dan pembentukan gabungan.',stats:{Karisma:84,Diplomasi:94,Strategi:92,Integriti:65,Ekonomi:68}},
 {id:'technocrat',n:'Teknokrat',d:'Data, ekonomi dan pelaksanaan dasar.',stats:{Ekonomi:94,Analisis:93,Integriti:82,Karisma:58,Debat:65}},
 {id:'debater',n:'Juara Debat',d:'Hujah, media dan perbahasan Parlimen.',stats:{Debat:96,Komunikasi:92,Strategi:78,Diplomasi:62,Karisma:84}},
 {id:'tycoon',n:'Taikun / Usahawan',d:'Pelaburan, rangkaian dan pengurusan dana.',stats:{Ekonomi:90,Rangkaian:94,Organisasi:84,Integriti:60,Karisma:70}},
 {id:'youth',n:'Orang Muda',d:'Inovasi, belia dan kempen digital.',stats:{TarikanBelia:94,MediaSosial:93,Inovasi:89,Pengalaman:48,Karisma:82}},
 {id:'activist',n:'Aktivis Rakyat',d:'Akar umbi, kebajikan dan mobilisasi komuniti.',stats:{AkarUmbi:95,Mobilisasi:93,Integriti:88,Diplomasi:58,Karisma:80}},
 {id:'statesman',n:'Negarawan Berpengalaman',d:'Pentadbiran, krisis dan institusi.',stats:{Pengalaman:95,Krisis:91,Diplomasi:89,Integriti:82,Inovasi:62}},
 {id:'populist',n:'Populis / Suara Rakyat',d:'Isu harian, kos sara hidup dan mesej mudah.',stats:{Karisma:93,Mobilisasi:91,Komunikasi:89,PerancanganFiskal:55,Debat:78}},
 {id:'reformer',n:'Reformis / Antirasuah',d:'Ketelusan, akauntabiliti dan pembaharuan institusi.',stats:{Integriti:96,Reformasi:95,Telus:94,Diplomasi:66,Karisma:74}},
 {id:'strategist',n:'Ahli Strategi Parti',d:'Jentera, calon, sasaran dan analisis pilihan raya.',stats:{Strategi:97,Organisasi:95,AnalisisPilihanRaya:93,Karisma:65,Diplomasi:78}}
];
const STATES_MY = {
 'Perlis':['Kangar'],
 'Kedah':['Langkawi','Jerlun','Kubang Pasu','Padang Terap','Pokok Sena','Alor Setar','Kuala Kedah','Pendang','Jerai','Sik','Merbok','Sungai Petani','Baling','Padang Serai','Kulim-Bandar Baharu'],
 'Pulau Pinang':['Kepala Batas','Tasek Gelugor','Bagan','Permatang Pauh','Bukit Mertajam','Batu Kawan','Nibong Tebal','Bukit Bendera','Tanjong','Jelutong','Bukit Gelugor','Bayan Baru','Balik Pulau'],
 'Perak':['Gerik','Lenggong','Larut','Parit Buntar','Bagan Serai','Bukit Gantang','Taiping','Padang Rengas','Beruas','Sitiawan','Teluk Intan','Pasir Salak','Bagan Datuk','Tapah','Kampar','Gopeng','Ipoh Timor','Ipoh Barat','Kuala Kangsar','Sungai Siput','Tambun','Batu Gajah','Lumut','Tanjong Malim'],
 'Selangor':['Sabak Bernam','Sungai Besar','Hulu Selangor','Tanjong Karang','Kuala Selangor','Selayang','Gombak','Ampang','Pandan','Hulu Langat','Bangi','Puchong','Kota Raja','Klang','Kapar','Kota Damansara','Sungai Buloh','Subang','Petaling Jaya','Damansara','Shah Alam'],
 'Negeri Sembilan':['Jelebu','Jempol','Seremban','Kuala Pilah','Rasah','Rembau','Port Dickson','Tampin'],
 'Melaka':['Masjid Tanah','Alor Gajah','Tangga Batu','Hang Tuah Jaya','Kota Melaka','Jasin'],
 'Johor':['Segamat','Sekijang','Labis','Pagoh','Ledang','Bakri','Muar','Parit Sulong','Ayer Hitam','Sri Gading','Batu Pahat','Simpang Renggam','Kluang','Sembrong','Mersing','Tenggara','Kota Tinggi','Pengerang','Tebrau','Pasir Gudang','Johor Bahru','Pulai','Iskandar Puteri','Kulai','Pontian','Tanjung Piai'],
 'Pahang':['Cameron Highlands','Lipis','Raub','Jerantut','Indera Mahkota','Kuantan','Paya Besar','Pekan','Maran','Kuala Krau','Temerloh','Bentong','Bera','Rompin'],
 'Terengganu':['Besut','Setiu','Kuala Nerus','Kuala Terengganu','Marang','Hulu Terengganu','Dungun','Kemaman'],
 'Kelantan':['Tumpat','Pengkalan Chepa','Kota Bharu','Pasir Mas','Rantau Panjang','Kubang Kerian','Bachok','Ketereh','Tanah Merah','Pasir Puteh','Machang','Jeli','Kuala Krai','Gua Musang'],
 'Sabah':['Kudat','Kota Marudu','Kota Belud','Tuaran','Sepanggar','Kota Kinabalu','Putatan','Penampang','Papar','Kimanis','Beaufort','Sipitang','Ranau','Keningau','Tenom','Pensiangan','Beluran','Libaran','Batu Sapi','Sandakan','Kinabatangan','Lahad Datu','Semporna','Tawau','Kalabakan'],
 'Sarawak':['Mas Gading','Santubong','Petra Jaya','Bandar Kuching','Stampin','Kota Samarahan','Puncak Borneo','Serian','Batang Sadong','Batang Lupar','Sri Aman','Lubok Antu','Betong','Saratok','Tanjong Manis','Igan','Sarikei','Julau','Kanowit','Sibu','Lanang','Mukah','Selangau','Kapit','Hulu Rajang','Bintulu','Sibuti','Miri','Baram','Limbang','Lawas'],
 'Kuala Lumpur':['Kepong','Batu','Wangsa Maju','Segambut','Setiawangsa','Titiwangsa','Bukit Bintang','Lembah Pantai','Seputeh','Cheras','Bandar Tun Razak'],
 'Putrajaya':['Putrajaya'], 'Labuan':['Labuan']
};
const DUN_MY = {
 'Pulau Pinang':['Penaga','Bertam','Pinang Tunggal','Permatang Berangan','Sungai Dua','Telok Ayer Tawar','Sungai Puyu','Bagan Jermal','Bagan Dalam','Seberang Jaya','Permatang Pasir','Penanti','Bertam','Machang Bubuk','Padang Lalang','Perai','Bukit Tengah','Bukit Tambun','Jawi','Sungai Bakap','Sungai Acheh','Tanjong Bunga','Air Putih','Kebun Bunga','Pulau Tikus','Padang Kota','Pengkalan Kota','Komtar','Datok Keramat','Sungai Pinang','Batu Lanchang','Seri Delima','Air Itam','Paya Terubong','Batu Uban','Pantai Jerejak','Batu Maung','Bayan Lepas','Pulau Betong','Telok Bahang'],
 'Selangor':['Sungai Air Tawar','Sabak','Sungai Panjang','Sekinchan','Hulu Bernam','Kuala Kubu Baharu','Batang Kali','Kuala Selangor','Jeram','Kuang','Rawang','Taman Templer','Sungai Tua','Gombak Setia','Hulu Kelang','Bukit Antarabangsa','Lembah Jaya','Pandan Indah','Teratai','Dusun Tua','Semenyih','Kajang','Sungai Ramal','Balakong','Seri Kembangan','Serdang','Kinrara','Subang Jaya','Kota Damansara','Kota Anggerik','Batu Tiga','Meru','Sementa','Selat Klang','Bandar Baru Klang','Pelabuhan Klang','Pandamaran','Kota Kemuning','Banting','Morib','Tanjong Sepat','Dengkil','Sungai Pelek'],
 'Kedah':['Ayer Hangat','Kuah','Kota Siputeh','Ayer Hitam','Bukit Kayu Hitam','Jitra','Kuala Nerang','Pedu','Bukit Lada','Bukit Pinang','Derga','Suka Menanti','Kota Darul Aman','Alor Mengkudu','Anak Bukit','Pengkalan Kundor','Tokai','Sungai Tiang','Sungai Limau','Guar Chempedak','Gurun','Belantek','Jeneri','Bukit Selambau','Tanjong Dawai','Pantai Merdeka','Bakar Arang','Sidam','Bayu','Kulim','Lunas','Bandar Baharu'],
 'Johor':['Buloh Kasap','Jementah','Pemanis','Kemelah','Tenang','Bekok','Gambir','Tangkak','Serom','Bentayan','Sungai Balang','Maharani','Sungai Abong','Simpang Jeram','Bukit Naning','Parit Yaani','Parit Raja','Penggaram','Semarang','Rengit','Machap','Layang-Layang','Mengkibol','Mahkota','Paloh','Kahang','Endau','Tenggaroh','Panti','Pasir Raja','Sedili','Johor Lama','Penawar','Tanjung Surat','Kukup','Pekan Nanas','Benut','Permas','Larkin','Stulang','Perling','Kempas','Skudai','Nusajaya','Kota Iskandar','Bukit Permai','Mawar','Puteri Wangsa'],
 'Sabah':['Banggi','Bengkoka','Pitas','Tanjong Kapor','Matunggong','Bandau','Tandek','Pintasan','Usukan','Kadamaian','Sulaman','Pantai Dalit','Tamparuli','Kiulu','Karambunai','Inanam','Likas','Api-Api','Luyang','Tanjung Aru','Petagas','Tanjung Keramat','Kawang','Pantai Manis','Bongawan','Membakut','Klias','Kuala Penyu','Lumadan','Sindumin','Kundasang','Karanaan','Paginatan','Tambunan','Bingkor','Liawan','Melalap','Kemabong','Tulid','Sook','Nabawan','Sugut','Labuk','Gum-Gum','Sungai Manila','Sungai Sibuga','Sekong','Karamunting','Elopura','Tanjong Papat','Kuamut','Lamag','Sukau','Silam','Kunak','Sulabayan','Senallang','Bugaya','Balung','Apas','Sri Tanjong','Merotai','Tanjung Batu','Sebatik']
};
const DEFAULT_DUN = ['Kawasan DUN 01','Kawasan DUN 02','Kawasan DUN 03','Kawasan DUN 04','Kawasan DUN 05','Kawasan DUN 06'];
const oldRenderSetup = renderSetup;
renderSetup = function(){
 oldRenderSetup();
 const p=SU.p||{}; const custom = `
 <div class="setup-section"><h3>Identiti pemimpin</h3><div class="form">
 ${sel('gayaPemimpin','Gaya kepimpinan',LEADER_STYLES.map(x=>x.n),p.gayaPemimpin||LEADER_STYLES[1].n)}
 ${fld('umur','Umur pemimpin',p.umur||'35','Contoh: 35')}
 ${sel('latar','Latar belakang', ['Ahli politik','Teknokrat / ekonomi','Usahawan','Aktivis masyarakat','Peguam','Akademik','Pemimpin belia','Pentadbiran awam'],p.latar||'Ahli politik')}
 <label>Potret pemimpin (JPG, PNG atau WebP)<input id="f_portraitFile" type="file" accept="image/png,image/jpeg,image/webp"></label>
 <label>Logo parti (JPG, PNG atau WebP)<input id="f_logoFile" type="file" accept="image/png,image/jpeg,image/webp"></label>
 <div class="upload-preview">${p.portraitData?`<img class="round" src="${p.portraitData}" alt="Potret pemimpin">`:'<img class="round" alt="Pratonton potret" src="">'}<small>Potret disimpan bersama simpanan permainan.</small></div>
 <div class="upload-preview">${p.logoData?`<img src="${p.logoData}" alt="Logo parti">`:'<img alt="Pratonton logo" src="">'}<small>Logo dipaparkan pada profil dan keputusan PRU.</small></div>
 </div></div>
 ${SU.path==='new'?`<div class="setup-section"><h3>Kerusi permulaan</h3><p class="muted">Pilihan satu kerusi ialah mekanik simulasi, bukan pemilikan kerusi sebenar.</p><div class="form">
 ${sel('seatMode','Cara bermula',['Tanpa kerusi','Pilih 1 kerusi Parlimen','Pilih 1 kerusi DUN','Pilih 1 kerusi secara rawak'],p.seatMode||'Tanpa kerusi')}
 ${sel('seatState','Negeri / Wilayah',Object.keys(STATES_MY),p.seatState||'Pulau Pinang')}
 ${sel('seatArea','Kawasan Parlimen',STATES_MY[p.seatState||'Pulau Pinang'].map((x,i)=>`${x}`),p.seatArea||'Bagan')}
 <label class="wide">Kawasan DUN<select id="f_dunArea">${(DUN_MY[p.seatState||'Pulau Pinang']||DEFAULT_DUN).map(x=>`<option ${x===(p.dunArea||'')?'selected':''}>${x}</option>`).join('')}</select></label>
 </div><p class="note">Pangkalan kawasan disediakan untuk semua negeri; senarai DUN terperinci boleh berbeza mengikut negeri dan perlu diselaraskan dengan sempadan rasmi terkini.</p></div>`:''}
 <div class="setup-section"><h3>Pendirian politik</h3><div class="form">
 ${sel('subsidi','Subsidi',['Menyeluruh','Bersasar','Kurangkan subsidi'],p.subsidi||'Bersasar')}
 ${sel('cukai','Cukai',['Cukai rendah','Cukai progresif','Perluas asas cukai'],p.cukai||'Cukai progresif')}
 ${sel('rasuah','Rasuah & integriti',['Reformasi tegas','Pembaharuan berperingkat','Kecekapan pentadbiran'],p.rasuah||'Reformasi tegas')}
 ${sel('kesihatan','Kesihatan',['Perkukuh kesihatan awam','Kerjasama awam-swasta','Pilihan pesakit'],p.kesihatan||'Perkukuh kesihatan awam')}
 ${sel('ekonomi','Model ekonomi',['Ekonomi pasaran','Ekonomi campuran','Negara menerajui sektor strategik'],p.ekonomi||'Ekonomi campuran')}
 ${sel('kebajikan','Kebajikan',['Bantuan bersasar','Perlindungan sosial meluas','Pekerjaan & mobiliti ekonomi'],p.kebajikan||'Bantuan bersasar')}
 ${sel('pendidikan','Pendidikan',['Perkukuh pendidikan awam','TVET & kemahiran industri','Pelbagai penyedia'],p.pendidikan||'Perkukuh pendidikan awam')}
 ${sel('iklim','Alam sekitar & tenaga',['Peralihan berperingkat','Utamakan tindakan iklim','Utamakan kos tenaga'],p.iklim||'Peralihan berperingkat')}
 ${sel('negeri','Hubungan Persekutuan–Negeri',['Kuasa berpusat','Seimbang','Lebih autonomi negeri'],p.negeri||'Seimbang')}
 </div></div>`;
 $('#s-setup').innerHTML = $('#s-setup').innerHTML.replace('<button class="btn big" data-act="toconfirm">Seterusnya</button>', custom+'<button class="btn big" data-act="toconfirm">Seterusnya</button>');
};
const oldCollect = collect;
collect = function(){
 const o=oldCollect(); if(!o)return null;
 const get=id=>{const el=$('#f_'+id);return el?el.value:''};
 Object.assign(o,{gayaPemimpin:get('gayaPemimpin')||'Teknokrat',umur:Number(get('umur')||35),latar:get('latar')||'Ahli politik',seatMode:get('seatMode')||'Tanpa kerusi',seatState:get('seatState')||'Pulau Pinang',seatArea:get('seatArea')||'',dunArea:get('dunArea')||get('dunArea')||($('#f_dunArea')?$('#f_dunArea').value:''),subsidi:get('subsidi')||'Bersasar',cukai:get('cukai')||'Cukai progresif',rasuah:get('rasuah')||'Reformasi tegas',kesihatan:get('kesihatan')||'Perkukuh kesihatan awam',ekonomi:get('ekonomi')||'Ekonomi campuran',kebajikan:get('kebajikan')||'Bantuan bersasar',pendidikan:get('pendidikan')||'Perkukuh pendidikan awam',iklim:get('iklim')||'Peralihan berperingkat',negeri:get('negeri')||'Seimbang',logoData:(SU.p&&SU.p.logoData)||'',portraitData:(SU.p&&SU.p.portraitData)||''});
 if(SU.path==='new' && o.seatMode==='Pilih 1 kerusi Parlimen' && !o.seatArea){toast('Pilih kawasan Parlimen.');return null;}
 return o;
};
const oldBuildState = buildState;
buildState = function(){
 const result=oldBuildState(); const s=result.s, p=SU.p||{};
 s.party.leaderStyle=p.gayaPemimpin||'Teknokrat'; s.party.portraitData=p.portraitData||''; s.party.logoData=p.logoData||''; s.party.leaderAge=p.umur||35; s.party.background=p.latar||'Ahli politik';
 s.party.policies={subsidi:p.subsidi||'Bersasar',cukai:p.cukai||'Cukai progresif',rasuah:p.rasuah||'Reformasi tegas',kesihatan:p.kesihatan||'Perkukuh kesihatan awam',ekonomi:p.ekonomi||'Ekonomi campuran',kebajikan:p.kebajikan||'Bantuan bersasar',pendidikan:p.pendidikan||'Perkukuh pendidikan awam',iklim:p.iklim||'Peralihan berperingkat',negeri:p.negeri||'Seimbang'};
 const style=LEADER_STYLES.find(x=>x.n===s.party.leaderStyle)||LEADER_STYLES[1]; s.leaderStats=style.stats;
 if(s.path==='new'){
   s.funds=Math.round((250000+Math.random()*150000)*MODE().fund); s.debt=0; s.members=rnd(80,350); s.support=clamp(0.5+rnd(0,10)/10,.5,2); s.seats.P=0; s.startP=0;
   const mode=p.seatMode||'Tanpa kerusi';
   if(mode==='Pilih 1 kerusi Parlimen'||mode==='Pilih 1 kerusi secara rawak'){
     const areas=STATES_MY[p.seatState]||STATES_MY['Pulau Pinang']; const area=mode==='Pilih 1 kerusi secara rawak'?pick(areas):(p.seatArea||areas[0]);
     s.seats.P=1; s.startP=1; s.startConstituency={type:'Parlimen',state:p.seatState||'Pulau Pinang',area}; s.support=1.5; s.members=Math.max(s.members,180);
     result.note=`Parti baharu bermula dengan satu kerusi simulasi di ${area}, ${p.seatState||'Pulau Pinang'}. Ini bukan dakwaan kerusi sebenar.`;
   } else if(mode==='Pilih 1 kerusi DUN'){
     const areas=DUN_MY[p.seatState]||DEFAULT_DUN; const area=p.dunArea||pick(areas); s.dunSeats=1; s.startConstituency={type:'DUN',state:p.seatState||'Pulau Pinang',area}; s.support=1.2;
     result.note=`Parti baharu bermula dengan satu kerusi DUN simulasi di ${area}, ${p.seatState||'Pulau Pinang'}.`;
   } else result.note='Parti baharu bermula dari bawah tanpa kerusi, dengan dana dan jentera terhad.';
 }
 s.ap=999; s.party.leaderName=s.party.pemimpin;
 return result;
};
// A 60-month career has no action-energy restriction. Keep legacy internal counter harmless.
const oldSpendAP=spendAP; spendAP=function(){ if(S) S.ap=999; };
const oldRefresh=refresh;
refresh=function(){
 if(!S)return;
 oldRefresh();
 const p=S.party;
 if($('#g-head')){const badge=$('#g-head .badge'); if(badge && p.logoData) badge.innerHTML=`<img src="${p.logoData}" alt="Logo parti" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`; const info=$('#g-head .hinfo'); if(info && p.portraitData && !info.querySelector('img')) info.insertAdjacentHTML('afterbegin',`<img class="portrait-small" src="${p.portraitData}" alt="Potret pemimpin">`);}
};
const oldTabParty=tabParty;
tabParty=function(){
 const orig=oldTabParty();
 const p=S.party;
 $('#g-main').insertAdjacentHTML('afterbegin',`<div class="card hero"><div class="row" style="justify-content:flex-start">${p.portraitData?`<img class="portrait-small" style="width:64px;height:64px" src="${p.portraitData}" alt="Potret">`:''}<div><h3>${esc(p.pemimpin)}</h3><p class="muted">${esc(p.leaderStyle||'Gaya belum ditetapkan')} · ${esc(p.background||'')}</p></div></div><p>${esc(p.ideologi||'')}</p><button class="btn sm ghost" data-act="editidentity">Edit identiti & dasar</button></div>`);
 return orig;
};
function tabGov(){
 const p=S.party, policy=p.policies||{}; const seatRows=Object.entries(S.seats).filter(([k,v])=>k!=='P'&&v>0).map(([k,v])=>`<div class="li">${esc(BLOC[k]?.n||k)}: <b>${v}</b> kerusi</div>`).join('');
 $('#g-main').innerHTML=`<div class="hd"><h2>🏛️ Kerajaan & Parlimen</h2><p>Data ekonomi dan kerusi dalam mod simulasi.</p></div>
 <div class="grid"><div class="stat"><small>Kerusi parti</small><b>${S.seats.P||0}</b></div><div class="stat"><small>Peranan</small><b>${inGov()?'Kerajaan':'Pembangkang / parti baharu'}</b></div><div class="stat"><small>Kestabilan</small><b>${Math.round(S.stab)}/100</b></div><div class="stat"><small>Kepuasan / sokongan</small><b>${Math.round(S.support)}%</b></div></div>
 <div class="card"><h3>Peta kerusi Dewan Rakyat</h3><div class="seatmap">${Array.from({length:222},(_,i)=>`<i title="Kerusi ${i+1}" style="display:inline-block;width:10px;height:10px;margin:2px;border-radius:2px;background:${i<(S.seats.P||0)?p.warna:(i%4===0?'#64748b':i%4===1?'#16a34a':i%4===2?'#ef4444':'#a855f7')}"></i>`).join('')}</div><p class="muted">Paparan kerusi untuk simulasi; bukan peta komposisi rasmi masa nyata.</p>${seatRows}</div>
 <div class="card"><h3>Ekonomi simulasi</h3><div class="grid"><div class="stat"><small>KDNK (indeks)</small><b>${(100+S.month*.35+S.support*.08).toFixed(1)}</b></div><div class="stat"><small>Inflasi (anggaran)</small><b>${(2.2+Math.sin(S.month/5)*.8+(policy.subsidi==='Kurangkan subsidi'?.5:0)).toFixed(1)}%</b></div><div class="stat"><small>Pengangguran (indeks)</small><b>${(4.0-Math.min(1,S.month*.02)+Math.sin(S.month/7)*.3).toFixed(1)}%</b></div><div class="stat"><small>Hutang parti</small><b>${rm(S.debt)}</b></div></div></div>
 <div class="card"><h3>Pendirian dasar parti</h3>${Object.entries(policy).map(([k,v])=>`<div class="li"><b>${esc(k)}</b>: ${esc(v)}</div>`).join('')||'<p class="muted">Tiada profil dasar.</p>'}</div>
 <div class="card"><h3>Kerjaya pemimpin</h3><p>${esc(p.pemimpin)} · ${esc(p.leaderStyle||'')}</p><p>Pengalaman: ${S.month} bulan · Musim: ${S.season}</p><button class="btn ghost" data-act="retire">Bersara dan mulakan kerjaya baharu</button></div>`;
}
const oldTabHandler=H.tab; H.tab=({v})=>{if(v==='gov'){S.tab='gov';tabGov();document.querySelectorAll('#g-nav button').forEach(b=>b.classList.toggle('on',b.dataset.v===v));return;}oldTabHandler({v});};
H.pause=()=>openModal(`<h3>Menu permainan</h3><p>Simulasi dihentikan sementara selagi menu ini dibuka.</p><button class="btn" data-act="close">Sambung</button><button class="btn ghost" data-act="savegame">Simpan permainan</button><button class="btn ghost" data-act="help">Cara bermain</button><button class="btn ghost" data-act="restart">Mula semula</button><button class="btn ghost" data-act="mainmenu">Menu utama</button>`);
H.savegame=()=>{save();toast('Permainan disimpan pada peranti ini.');};
H.help=()=>H.about();
H.restart=()=>openModal(`<h3>Mula semula?</h3><p>Permainan semasa akan diganti dengan permainan baharu jika anda teruskan.</p><button class="btn" data-act="newgame">Pilih permainan baharu</button><button class="btn ghost" data-act="close">Batal</button>`);
H.mainmenu=()=>{save();closeModal();show('s-start');};
H.retire=()=>openModal(`<h3>Bersara daripada kerjaya?</h3><p>Kerjaya ini akan tamat. Mulakan permainan baharu untuk mencipta watak atau parti lain.</p><button class="btn" data-act="retireyes">Bersara</button><button class="btn ghost" data-act="close">Batal</button>`);
H.retireyes=()=>{S=null;localStorage.removeItem(SAVE_KEY);closeModal();renderMode();show('s-mode');};
H.editidentity=()=>{SU={mode:S.mode,path:'take',pi:0,p:{nama:S.party.nama,sing:S.party.sing,pemimpin:S.party.pemimpin,ideologi:S.party.ideologi,warna:S.party.warna,simbol:S.party.simbol,slogan:S.party.slogan,gayaPemimpin:S.party.leaderStyle,portraitData:S.party.portraitData,logoData:S.party.logoData}};renderSetup();show('s-setup');toast('Sunting identiti kemudian mulakan permainan baharu untuk menerapkan semua perubahan.');};
// Upload previews are read locally, resized to keep save data practical.
document.addEventListener('change',e=>{
 if(e.target.id==='f_seatState'){const st=e.target.value; const a=$('#f_seatArea'); if(a){a.innerHTML=(STATES_MY[st]||[]).map(x=>`<option>${esc(x)}</option>`).join('');} const d=$('#f_dunArea'); if(d){d.innerHTML=(DUN_MY[st]||DEFAULT_DUN).map(x=>`<option>${esc(x)}</option>`).join('');}}
 if(e.target.id==='f_seatMode'){const state=$('#f_seatState'); if(state)state.disabled=false;}
 if(e.target.id==='f_logoFile'||e.target.id==='f_portraitFile'){const file=e.target.files&&e.target.files[0]; if(!file)return; if(!/^image\/(png|jpeg|webp)$/.test(file.type)){toast('Sila pilih fail JPG, PNG atau WebP.');e.target.value='';return;} if(file.size>5*1024*1024){toast('Saiz gambar maksimum 5 MB.');e.target.value='';return;} const isLogo=e.target.id==='f_logoFile'; const reader=new FileReader(); reader.onload=()=>{const img=new Image(); img.onload=()=>{const c=document.createElement('canvas'); const max=640, scale=Math.min(1,max/Math.max(img.width,img.height));c.width=Math.round(img.width*scale);c.height=Math.round(img.height*scale);c.getContext('2d').drawImage(img,0,0,c.width,c.height);const data=c.toDataURL('image/jpeg',.82);SU.p=SU.p||{};SU.p[isLogo?'logoData':'portraitData']=data;renderSetup();toast(isLogo?'Logo disimpan dalam pratonton.':'Potret disimpan dalam pratonton.');};img.src=reader.result;};reader.readAsDataURL(file);}
});
// Wrap start flow so identity uploads and custom settings survive confirmation.
const oldToConfirm=H.toconfirm; H.toconfirm=()=>{const o=collect();if(!o)return;SU.p=o;renderConfirm();show('s-confirm');};
const oldRenderConfirm=renderConfirm; renderConfirm=function(){ oldRenderConfirm(); const p=SU.p||{}; if(p.portraitData) $('#s-confirm').insertAdjacentHTML('afterbegin', `<img src="${p.portraitData}" class="portrait-small" style="width:82px;height:82px;display:block;margin:0 auto 12px" alt="Potret pemimpin">`); $('#s-confirm').insertAdjacentHTML('beforeend', `<p class="muted">Gaya: ${esc(p.gayaPemimpin||'Teknokrat')} · Kerusi mula: ${esc(p.seatMode||'—')} ${esc(p.seatArea||p.dunArea||'')}</p>`); };
// New party starts with very limited resources; no energy mechanic is enforced.
const oldStartGame=startGame; startGame=function(){oldStartGame(); if(S){S.ap=999;save();refresh();}};

/* Live identity editing from the party profile */
H.editidentity=()=>openModal(`<h3>Edit identiti parti</h3><div class="form">${fld('editPartyName','Nama parti',S.party.nama)}${fld('editPartySing','Singkatan',S.party.sing)}${fld('editLeaderName','Nama pemimpin',S.party.pemimpin)}<label>Warna parti<input id="editPartyColor" type="color" value="${S.party.warna||'#2563eb'}"></label><label>Tukar logo<input id="editLogoFile" type="file" accept="image/png,image/jpeg,image/webp"></label><label>Tukar potret pemimpin<input id="editPortraitFile" type="file" accept="image/png,image/jpeg,image/webp"></label></div><p class="muted">Gambar baharu akan disimpan pada peranti ini. Nama, warna dan gambar tidak mengubah jumlah kerusi secara automatik.</p><button class="btn" data-act="applyidentity">Simpan perubahan</button><button class="btn ghost" data-act="close">Batal</button>`);
H.applyidentity=()=>{const name=$('#f_editPartyName')?.value?.trim(),sing=$('#f_editPartySing')?.value?.trim(),leader=$('#f_editLeaderName')?.value?.trim(),color=$('#editPartyColor')?.value;if(name)S.party.nama=name;if(sing)S.party.sing=sing.toUpperCase();if(leader)S.party.pemimpin=leader;if(color)S.party.warna=color;save();closeModal();refresh();toast('Identiti parti dikemas kini.');};
document.addEventListener('change',e=>{
 if(e.target.id==='f_logoFile'||e.target.id==='f_portraitFile'){const prior=collect();if(prior)SU.p={...(SU.p||{}),...prior};}
 if(e.target.id==='editLogoFile'||e.target.id==='editPortraitFile'){const file=e.target.files&&e.target.files[0];if(!file)return;if(!/^image\/(png|jpeg|webp)$/.test(file.type)||file.size>5*1024*1024){toast('Pilih JPG, PNG atau WebP sehingga 5 MB.');return;}const key=e.target.id==='editLogoFile'?'logoData':'portraitData';const reader=new FileReader();reader.onload=()=>{const img=new Image();img.onload=()=>{const c=document.createElement('canvas'),scale=Math.min(1,640/Math.max(img.width,img.height));c.width=Math.round(img.width*scale);c.height=Math.round(img.height*scale);c.getContext('2d').drawImage(img,0,0,c.width,c.height);S.party[key]=c.toDataURL('image/jpeg',.82);save();refresh();toast('Gambar dikemas kini. Tekan Simpan perubahan untuk menyimpan nama dan warna.');};img.src=reader.result;};reader.readAsDataURL(file);}
});
