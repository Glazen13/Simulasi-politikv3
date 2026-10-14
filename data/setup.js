// ================================
// SETUP DATA UNTUK GAME
// ================================

let gameState = {
  mod: null,
  namaPemain: '',
  panggilanPemain: '',
  namaPasangan: '',
  panggilanPasangan: '',
  personaliti: null,
  titikMula: null,
  kewangan: {},
  hari: 1,
  tenagaAksi: 3,
  tenagaMax: 3,
  kasihSayang: 50,
  mood: 50,
  memori: [],
  history: []
};

// ================================
// FUNGSI TUKAR SKRIN
// ================================

function tukarSkrin(id) {
  document.querySelectorAll('.skrin').forEach(s => s.classList.remove('active'));
  const skrin = document.getElementById(id);
  if (skrin) {
    skrin.classList.add('active');
  } else {
    console.error('Skrin tak jumpa:', id);
  }
}

// ================================
// FUNGSI SETUP
// ================================

function mulaSetup() {
  tukarSkrin('skrin-mod');
}

function pilihMod(mod) {
  gameState.mod = mod;
  
  if (mod === 'suami') {
    document.getElementById('input-panggilan-pemain').placeholder = 'Contoh: Abang';
    document.getElementById('input-panggilan-pasangan').placeholder = 'Contoh: Sayang';
  } else {
    document.getElementById('input-panggilan-pemain').placeholder = 'Contoh: Sayang';
    document.getElementById('input-panggilan-pasangan').placeholder = 'Contoh: Abang';
  }
  
  tukarSkrin('skrin-nama');
}

function simpanNama() {
  gameState.namaPemain = document.getElementById('input-nama-pemain').value || 'Pemain';
  gameState.panggilanPemain = document.getElementById('input-panggilan-pemain').value || 'Sayang';
  gameState.namaPasangan = document.getElementById('input-nama-pasangan').value || 'Pasangan';
  gameState.panggilanPasangan = document.getElementById('input-panggilan-pasangan').value || 'Abang';
  
  tukarSkrin('skrin-personaliti');
}

function pilihPersonaliti(p) {
  if (p === 'rawak') {
    const senarai = ['romantik', 'manja', 'cool', 'rajin'];
    p = senarai[Math.floor(Math.random() * senarai.length)];
  }
  gameState.personaliti = p;
  tukarSkrin('skrin-titik-mula');
}

function pilihTitikMula(t) {
  gameState.titikMula = t;
  
  const defaults = {
    sewa:    { gajiPemain: 3000, gajiPasangan: 2500, simpanan: 2000, sewa: 800 },
    ibubapa: { gajiPemain: 3000, gajiPasangan: 2500, simpanan: 3500, sewa: 300 },
    mertua:  { gajiPemain: 3000, gajiPasangan: 2500, simpanan: 3500, sewa: 200 },
    sendiri: { gajiPemain: 3500, gajiPasangan: 2500, simpanan: 1000, sewa: 1200 }
  };
  
  const d = defaults[t];
  document.getElementById('input-gaji-pemain').value = d.gajiPemain;
  document.getElementById('input-gaji-pasangan').value = d.gajiPasangan;
  document.getElementById('input-simpanan').value = d.simpanan;
  document.getElementById('input-sewa').value = d.sewa;
  
  tukarSkrin('skrin-kewangan');
}

function simpanKewangan() {
  gameState.kewangan = {
    gajiPemain: parseInt(document.getElementById('input-gaji-pemain').value) || 0,
    gajiPasangan: parseInt(document.getElementById('input-gaji-pasangan').value) || 0,
    simpanan: parseInt(document.getElementById('input-simpanan').value) || 0,
    sewa: parseInt(document.getElementById('input-sewa').value) || 0,
    komitmen: []
  };
  
  initAI();
  mulaMain();
}
