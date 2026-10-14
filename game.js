// ================================
// HINGGA KE JANNAH — GAME
// ================================

let sceneSemasa = null;

// ================================
// PROGRESS BAR
// ================================

function updateProgressBar() {
  document.getElementById('bar-kasih').style.width = aiPasangan.kasihSayang + '%';
  document.getElementById('stat-kasih').textContent = aiPasangan.kasihSayang;
  
  document.getElementById('bar-komunikasi').style.width = aiPasangan.komunikasi + '%';
  document.getElementById('stat-komunikasi').textContent = aiPasangan.komunikasi;
  
  document.getElementById('bar-kepercayaan').style.width = aiPasangan.kepercayaan + '%';
  document.getElementById('stat-kepercayaan').textContent = aiPasangan.kepercayaan;
  
  document.getElementById('bar-mood-diri').style.width = aiPasangan.moodDiri + '%';
  document.getElementById('stat-mood-diri').textContent = aiPasangan.moodDiri;
  
  document.getElementById('bar-mood-ai').style.width = aiPasangan.mood + '%';
  document.getElementById('stat-mood-ai').textContent = '🙂 Mood AI: ' + aiPasangan.labelMood();
}

// ================================
// MULA MAIN
// ================================

function mulaMain() {
  tukarSkrin('skrin-main');
  gameState.hari = 1;
  gameState.sesi = 0;
  tunjukHari();
}

// ================================
// TUNJUK HARI (SATU SAHAJA)
// ================================

function tunjukHari() {
  const hari = gameState.hari;
  const sesi = gameState.sesi || 0;
  
  document.getElementById('stat-hari').textContent = `Hari ${hari}`;
  document.getElementById('stat-duit').textContent = `💰 RM ${dapatDuit().toLocaleString()}`;
  
  updateProgressBar();
  
  const sceneHari = bab1Baru[hari];
  if (!sceneHari) {
    tunjukEndingBab1();
    return;
  }
  
  const scene = sceneHari.sesi[sesi];
  if (!scene) {
    tunjukEndingBab1();
    return;
  }
  
  document.getElementById('narasi').textContent = gantiNama(scene.situasi);
  document.getElementById('dialog').textContent = gantiNama(scene.dialog);
  
  const pilihanDiv = document.getElementById('pilihan');
  pilihanDiv.innerHTML = '';
  
  scene.pilihan.forEach(p => {
    const btn = document.createElement('button');
    btn.textContent = gantiNama(p.teks);
    btn.onclick = () => pilihPilihan(p);
    pilihanDiv.appendChild(btn);
  });
}

// ================================
// GANTI NAMA
// ================================

function gantiNama(teks) {
  return teks
    .replace(/{pemain}/g, gameState.panggilanPemain)
    .replace(/{pasangan}/g, gameState.panggilanPasangan);
}

// ================================
// PILIH PILIHAN
// ================================

function pilihPilihan(pilihan) {
  const kesan = pilihan.kesan;
  
  if (kesan.kasih) aiPasangan.updateKasihSayang(kesan.kasih);
  if (kesan.komunikasi) aiPasangan.updateKomunikasi(kesan.komunikasi);
  if (kesan.kepercayaan) aiPasangan.updateKepercayaan(kesan.kepercayaan);
  if (kesan.mood_diri) aiPasangan.updateMoodDiri(kesan.mood_diri);
  if (kesan.mood_ai) aiPasangan.updateMood(kesan.mood_ai === 'Gembira' ? 10 : kesan.mood_ai === 'Sejuk' ? -10 : 0);
  if (kesan.duit) tambahDuit(kesan.duit);
  if (kesan.memori) aiPasangan.rekodMemori(kesan.memori, pilihan.teks);
  
  if (pilihan.reaksi) {
    document.getElementById('dialog').textContent = gantiNama(pilihan.reaksi);
  }
  
  updateProgressBar();
  document.getElementById('stat-duit').textContent = `💰 RM ${dapatDuit().toLocaleString()}`;
  
  simpanGame();
  
  const pilihanDiv = document.getElementById('pilihan');
  pilihanDiv.innerHTML = '';
  const btn = document.createElement('button');
  btn.textContent = '→ Sesi Seterusnya';
  btn.onclick = sesiSeterusnya;
  pilihanDiv.appendChild(btn);
}

// ================================
// SESI SETERUSNYA
// ================================

function sesiSeterusnya() {
  gameState.sesi++;
  if (gameState.sesi >= 4) {
    gameState.sesi = 0;
    gameState.hari++;
  }
  simpanGame();
  tunjukHari();
}

// ================================
// RINGKASAN
// ================================

function tunjukRingkasan(scene) {
  const ekonomi = kiraHarian();
  
  document.getElementById('narasi').textContent = `📊 ${scene.tajuk}`;
  document.getElementById('dialog').innerHTML = `
    💰 Duit: RM ${dapatDuit().toLocaleString()}<br>
    + Masuk: RM ${ekonomi.masuk}<br>
    - Keluar: RM ${ekonomi.keluar}<br>
    <br>
    ❤️ Kasih sayang: ${aiPasangan.kasihSayang}<br>
    😊 Mood: ${aiPasangan.labelMood()}
  `;
  
  const pilihanDiv = document.getElementById('pilihan');
  pilihanDiv.innerHTML = '';
  const btn = document.createElement('button');
  btn.textContent = '→ Hari Seterusnya';
  btn.onclick = hariSeterusnya;
  pilihanDiv.appendChild(btn);
  
  updateProgressBar();
  document.getElementById('stat-duit').textContent = `💰 RM ${dapatDuit().toLocaleString()}`;
}

// ================================
// MINI EVENT
// ================================

function tunjukMiniEvent(scene) {
  document.getElementById('narasi').textContent = `📱 Mesej`;
  document.getElementById('dialog').textContent = gantiNama(scene.mesej);
  
  const pilihanDiv = document.getElementById('pilihan');
  pilihanDiv.innerHTML = '';
  
  scene.pilihan.forEach(p => {
    const btn = document.createElement('button');
    btn.textContent = gantiNama(p.teks);
    btn.onclick = () => pilihPilihan(p);
    pilihanDiv.appendChild(btn);
  });
}

// ================================
// HARI SETERUSNYA
// ================================

function hariSeterusnya() {
  gameState.hari++;
  gameState.sesi = 0;
  simpanGame();
  tunjukHari();
}

// ================================
// ENDING BAB 1
// ================================

function tunjukEndingBab1() {
  document.getElementById('narasi').textContent = '📖 Bab 1 Tamat';
  document.getElementById('dialog').innerHTML = `
    ❤️ Kasih sayang: ${aiPasangan.kasihSayang}<br>
    💬 Komunikasi: ${aiPasangan.komunikasi}<br>
    🤝 Kepercayaan: ${aiPasangan.kepercayaan}<br>
    😊 Mood Diri: ${aiPasangan.moodDiri}<br>
    🙂 Mood AI: ${aiPasangan.labelMood()}<br>
    💰 Duit: RM ${dapatDuit().toLocaleString()}<br>
    <br>
    Bab 2: Rutin & Realiti akan datang...
  `;
  
  const pilihanDiv = document.getElementById('pilihan');
  pilihanDiv.innerHTML = '';
  const btn = document.createElement('button');
  btn.textContent = '🔄 Main Lagi';
  btn.onclick = () => location.reload();
  pilihanDiv.appendChild(btn);
}

// ================================
// MENU TAJUK
// ================================

function janaMenuTajuk() {
  const menu = document.getElementById('menu-tajuk');
  menu.innerHTML = '';
  
  const infoSave = dapatkanInfoSave();
  
  if (infoSave) {
    const btnSambung = document.createElement('button');
    btnSambung.className = 'btn-utama';
    btnSambung.innerHTML = `<span>▶ Sambung</span><span class="btn-arrow">→</span>`;
    btnSambung.onclick = sambungGame;
    menu.appendChild(btnSambung);
    
    const info = document.createElement('div');
    info.className = 'info-save';
    const tarikh = new Date(infoSave.timestamp).toLocaleDateString('ms-MY');
    info.textContent = `${infoSave.namaPemain} • Hari ${infoSave.hari} • ${tarikh}`;
    menu.appendChild(info);
    
    const btnBaru = document.createElement('button');
    btnBaru.className = 'btn-sekunder';
    btnBaru.textContent = '🆕 Main Baru';
    btnBaru.onclick = mainBaru;
    menu.appendChild(btnBaru);
  } else {
    const btnMula = document.createElement('button');
    btnMula.className = 'btn-utama';
    btnMula.innerHTML = `<span>Mula Perjalanan</span><span class="btn-arrow">→</span>`;
    btnMula.onclick = mulaSetup;
    menu.appendChild(btnMula);
  }
}

function sambungGame() {
  if (loadGame()) {
    initAIMethods();
    tukarSkrin('skrin-main');
    tunjukHari();
  } else {
    alert('Gagal load game. Cuba main baru.');
    mainBaru();
  }
}

function mainBaru() {
  if (adaSave()) {
    if (!confirm('Main baru akan hapus save lama. Teruskan?')) {
      return;
    }
  }
  localStorage.removeItem(SAVE_KEY);
  mulaSetup();
}

function initAIMethods() {
  aiPasangan.updateMood = function(nilai) {
    this.mood = Math.max(0, Math.min(100, this.mood + nilai));
  };
  
  aiPasangan.updateKasihSayang = function(nilai) {
    this.kasihSayang = Math.max(0, Math.min(100, this.kasihSayang + nilai));
  };
  
  aiPasangan.updateKomunikasi = function(nilai) {
    this.komunikasi = Math.max(0, Math.min(100, this.komunikasi + nilai));
  };
  
  aiPasangan.updateKepercayaan = function(nilai) {
    this.kepercayaan = Math.max(0, Math.min(100, this.kepercayaan + nilai));
  };
  
  aiPasangan.updateMoodDiri = function(nilai) {
    this.moodDiri = Math.max(0, Math.min(100, this.moodDiri + nilai));
  };
  
  aiPasangan.rekodMemori = function(jenis, nota) {
    const rekod = { hari: gameState.hari, nota: nota };
    if (jenis === 'baik') {
      this.memoriBaik.push(rekod);
    } else {
      this.memoriBuruk.push(rekod);
    }
  };
  
  aiPasangan.labelMood = function() {
    if (this.mood >= 80) return '😍 Gembira';
    if (this.mood >= 50) return '🙂 Neutral';
    if (this.mood >= 30) return '😐 Sejuk';
    if (this.mood >= 10) return '😞 Sedih';
    return '😡 Marah';
  };
}

// Jalankan menu bila page load
window.addEventListener('DOMContentLoaded', () => {
  janaMenuTajuk();
});
