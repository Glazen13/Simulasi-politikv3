// ================================
// HINGGA KE JANNAH — GAME
// ================================

let sceneSemasa = null;

// ================================
// PROGRESS BAR
// ================================

function updateProgressBar() {
  const kasih = aiPasangan.kasihSayang;
  document.getElementById('bar-kasih').style.width = kasih + '%';
  document.getElementById('stat-kasih').textContent = kasih;
  
  const mood = aiPasangan.mood;
  document.getElementById('bar-mood').style.width = mood + '%';
  document.getElementById('stat-mood').textContent = aiPasangan.labelMood();
}

// ================================
// MULA MAIN
// ================================

function mulaMain() {
  tukarSkrin('skrin-main');
  gameState.hari = 1;
  gameState.tenagaAksi = 3;
  gameState.tenagaMax = 3;
  tunjukHari();
}

// ================================
// TUNJUK HARI
// ================================

function tunjukHari() {
  const hari = gameState.hari;
  const scene = bab1[hari];
  
  document.getElementById('stat-hari').textContent = `Hari ${hari}`;
  document.getElementById('stat-tenaga').textContent = `⚡ ${gameState.tenagaAksi}/${gameState.tenagaMax}`;
  document.getElementById('stat-duit').textContent = `💰 RM ${dapatDuit().toLocaleString()}`;
  
  updateProgressBar();
  
  if (!scene) {
    tunjukEndingBab1();
    return;
  }
  
  if (scene.jenis === 'ringkasan') {
    tunjukRingkasan(scene);
  } else if (scene.jenis === 'mini') {
    tunjukMiniEvent(scene);
  } else {
    tunjukScene(scene);
  }
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
// TUNJUK SCENE
// ================================

function tunjukScene(scene) {
  document.getElementById('narasi').textContent = gantiNama(scene.narasi);
  document.getElementById('dialog').textContent = gantiNama(scene.dialog());
  
  const pilihanDiv = document.getElementById('pilihan');
  pilihanDiv.innerHTML = '';
  
  scene.pilihan.forEach((p) => {
    const btn = document.createElement('button');
    btn.textContent = gantiNama(p.teks);
    btn.onclick = () => pilihPilihan(p);
    pilihanDiv.appendChild(btn);
  });
}

// ================================
// PILIH PILIHAN
// ================================

function pilihPilihan(pilihan) {
  const kesan = pilihan.kesan;
  
  if (kesan.kasihSayang) aiPasangan.updateKasihSayang(kesan.kasihSayang);
  if (kesan.mood) aiPasangan.updateMood(kesan.mood);
  if (kesan.duit) tambahDuit(kesan.duit);
  if (kesan.nota) aiPasangan.rekodMemori(kesan.kasihSayang >= 0 ? 'baik' : 'buruk', kesan.nota);
  
  if (pilihan.reaksi) {
    const reaksi = pilihan.reaksi[Math.floor(Math.random() * pilihan.reaksi.length)];
    document.getElementById('dialog').textContent = gantiNama(reaksi);
  }
  
  updateProgressBar();
  document.getElementById('stat-duit').textContent = `💰 RM ${dapatDuit().toLocaleString()}`;
  
  // AUTO-SAVE selepas pilihan
  simpanGame();
  
  const pilihanDiv = document.getElementById('pilihan');
  pilihanDiv.innerHTML = '';
  const btn = document.createElement('button');
  btn.textContent = '→ Hari Seterusnya';
  btn.onclick = hariSeterusnya;
  pilihanDiv.appendChild(btn);
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
  gameState.tenagaAksi = gameState.tenagaMax;
  
  // AUTO-SAVE selepas hari baru
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
    😊 Mood: ${aiPasangan.labelMood()}<br>
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
    // Ada save — tunjuk butang Sambung
    const btnSambung = document.createElement('button');
    btnSambung.className = 'btn-utama';
    btnSambung.innerHTML = `<span>▶ Sambung</span><span class="btn-arrow">→</span>`;
    btnSambung.onclick = sambungGame;
    menu.appendChild(btnSambung);
    
    // Info save
    const info = document.createElement('div');
    info.className = 'info-save';
    const tarikh = new Date(infoSave.timestamp).toLocaleDateString('ms-MY');
    info.textContent = `${infoSave.namaPemain} • Hari ${infoSave.hari} • ${tarikh}`;
    menu.appendChild(info);
    
    // Butang Main Baru
    const btnBaru = document.createElement('button');
    btnBaru.className = 'btn-sekunder';
    btnBaru.textContent = '🆕 Main Baru';
    btnBaru.onclick = mainBaru;
    menu.appendChild(btnBaru);
  } else {
    // Takde save — tunjuk butang Mula
    const btnMula = document.createElement('button');
    btnMula.className = 'btn-utama';
    btnMula.innerHTML = `<span>Mula Perjalanan</span><span class="btn-arrow">→</span>`;
    btnMula.onclick = mulaSetup;
    menu.appendChild(btnMula);
  }
}

function sambungGame() {
  if (loadGame()) {
    // Re-init AI methods
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
  // Pastikan method AI wujud selepas load
  aiPasangan.reaksi = function(pilihan, kesan) {
    this.updateMood(kesan.mood || 0);
    this.updateKasihSayang(kesan.kasihSayang || 0);
    if (kesan.kasihSayang > 0) {
      this.rekodMemori('baik', kesan.nota || 'Pemain buat baik');
    } else if (kesan.kasihSayang < 0) {
      this.rekodMemori('buruk', kesan.nota || 'Pemain buat buruk');
    }
    return this.dapatDialog(kesan);
  };
  
  aiPasangan.updateMood = function(nilai) {
    this.mood = Math.max(0, Math.min(100, this.mood + nilai));
  };
  
  aiPasangan.updateKasihSayang = function(nilai) {
    this.kasihSayang = Math.max(0, Math.min(100, this.kasihSayang + nilai));
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

// ============================================
// GAME UTAMA — BAHAGIAN KEWANGAN
// ============================================

let game = {
  hari: 1,
  tenaga: 3,
  tenagaMax: 3,
  kasihSayang: 70,
  mood: "Gembira",
  mod: "suami",
  namaPemain: "",
  panggilanPemain: "",
  namaPasangan: "",
  panggilanPasangan: "",
  personaliti: "manja",
  titikMula: "A"
};

// ============================================
// MULA GAME
// ============================================

function mulaGame() {
  // Ambil setup
  loadSetup();
  loadEkonomi();
  
  // Set duit awal
  ekonomi.duit = setupKewangan.simpananTunai + setupKewangan.simpananASB;
  
  // Set hari
  ekonomi.hariSemasa = 1;
  ekonomi.tarikh = 1;
  ekonomi.hariDalamMinggu = "Isnin";
  
  // Tunjuk game
  tunjukGame();
  tunjukHari();
}

// ============================================
// TUNJUK HARI
// ============================================

function tunjukHari() {
  // Proses kewangan harian
  let hasil = prosesHarian();
  
  // Update UI
  document.getElementById("hari").textContent = "Hari " + ekonomi.hariSemasa + " (" + ekonomi.tarikh + "hb)";
  document.getElementById("duit").textContent = "RM " + formatDuit(ekonomi.duit);
  document.getElementById("tenaga").textContent = game.tenaga + "/" + game.tenagaMax;
  document.getElementById("kasihSayang").textContent = game.kasihSayang;
  document.getElementById("mood").textContent = game.mood;
  
  // Tunjuk log
  tunjukLog(hasil.log);
  
  // Semak kritikal
  let kritikal = semakKritikal();
  if (kritikal) {
    tunjukAlert(kritikal);
  }
}

// ============================================
// FORMAT DUIT
// ============================================

function formatDuit(jumlah) {
  return jumlah.toLocaleString('ms-MY');
}

// ============================================
// TUNJUK LOG
// ============================================

function tunjukLog(log) {
  let html = "";
  log.forEach(function(item) {
    html += "<div class='log-item'>" + item + "</div>";
  });
  document.getElementById("log").innerHTML = html;
}

// ============================================
// TUNJUK ALERT
// ============================================

function tunjukAlert(kritikal) {
  let html = "<div class='alert alert-" + kritikal.tahap + "'>";
  html += "<p>" + kritikal.mesej + "</p>";
  html += "<div class='alert-option'>";
  kritikal.option.forEach(function(opt) {
    html += "<button onclick='pilihOption(\"" + opt + "\")'>" + opt + "</button>";
  });
  html += "</div></div>";
  document.getElementById("alert").innerHTML = html;
}

// ============================================
// PILIH OPTION KEWANGAN
// ============================================

function pilihOption(opt) {
  if (opt === "side_income") {
    tunjukSideIncome();
  } else if (opt === "pinjam") {
    tunjukPinjam();
  } else if (opt === "jual_barang") {
    tunjukJualBarang();
  } else if (opt === "jimat") {
    tukarGayaHidup("jimat");
  }
}

// ============================================
// SIDE INCOME
// ============================================

function tunjukSideIncome() {
  let html = "<div class='modal'>";
  html += "<h3>💼 Cari Side Income</h3>";
  html += "<button onclick='buatGrab()'>Grab (+RM 40, -1 tenaga)</button>";
  html += "<button onclick='buatFreelance()'>Freelance (+RM 300, -2 tenaga)</button>";
  html += "<button onclick='tutupModal()'>Tutup</button>";
  html += "</div>";
  document.getElementById("modal").innerHTML = html;
}

function buatGrab() {
  if (game.tenaga >= 1) {
    game.tenaga -= 1;
    tambahDuit(40, "Grab");
    tutupModal();
    tunjukHari();
  }
}

function buatFreelance() {
  if (game.tenaga >= 2) {
    game.tenaga -= 2;
    tambahDuit(300, "Freelance");
    tutupModal();
    tunjukHari();
  }
}

// ============================================
// TUKAR GAYA HIDUP
// ============================================

function tukarGayaHidup(gaya) {
  setupKewangan.gayaHidup = gaya;
  simpanSetup();
  tutupModal();
  tunjukHari();
}

// ============================================
// TUTUP MODAL
// ============================================

function tutupModal() {
  document.getElementById("modal").innerHTML = "";
}

// ============================================
// HARI SETERUSNYA
// ============================================

function hariSeterusnya() {
  game.hari++;
  game.tenaga = game.tenagaMax;
  simpanEkonomi();
  tunjukHari();
}

// Jalankan menu bila page load
window.addEventListener('DOMContentLoaded', () => {
  janaMenuTajuk();
});
