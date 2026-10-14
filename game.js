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
