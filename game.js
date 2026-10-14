// Game utama

let sceneSemasa = null;

function mulaMain() {
  tukarSkrin('skrin-main');
  gameState.hari = 1;
  gameState.tenagaAksi = 3;
  gameState.tenagaMax = 3;
  tunjukHari();
}

function tunjukHari() {
  const hari = gameState.hari;
  const scene = bab1[hari];
  
  // Update header
  document.getElementById('stat-hari').textContent = `Hari ${hari}`;
  document.getElementById('stat-tenaga').textContent = `⚡ ${gameState.tenagaAksi}/${gameState.tenagaMax}`;
  document.getElementById('stat-duit').textContent = `💰 RM ${dapatDuit().toLocaleString()}`;
  
  // Update footer
  document.getElementById('stat-kasih').textContent = `❤️ ${aiPasangan.kasihSayang}`;
  document.getElementById('stat-mood').textContent = aiPasangan.labelMood();
  
  if (!scene) {
    // Habis Bab 1
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

function gantiNama(teks) {
  return teks
    .replace(/{pemain}/g, gameState.panggilanPemain)
    .replace(/{pasangan}/g, gameState.panggilanPasangan);
}

function tunjukScene(scene) {
  document.getElementById('narasi').textContent = gantiNama(scene.narasi);
  document.getElementById('dialog').textContent = gantiNama(scene.dialog());
  
  const pilihanDiv = document.getElementById('pilihan');
  pilihanDiv.innerHTML = '';
  
  scene.pilihan.forEach((p, index) => {
    const btn = document.createElement('button');
    btn.textContent = gantiNama(p.teks);
    btn.onclick = () => pilihPilihan(p);
    pilihanDiv.appendChild(btn);
  });
}

function pilihPilihan(pilihan) {
  // Apply kesan
  const kesan = pilihan.kesan;
  
  if (kesan.kasihSayang) aiPasangan.updateKasihSayang(kesan.kasihSayang);
  if (kesan.mood) aiPasangan.updateMood(kesan.mood);
  if (kesan.duit) tambahDuit(kesan.duit);
  if (kesan.nota) aiPasangan.rekodMemori(kesan.kasihSayang >= 0 ? 'baik' : 'buruk', kesan.nota);
  
  // Tunjuk reaksi
  if (pilihan.reaksi) {
    const reaksi = pilihan.reaksi[Math.floor(Math.random() * pilihan.reaksi.length)];
    document.getElementById('dialog').textContent = gantiNama(reaksi);
  }
  
  // Update footer
  document.getElementById('stat-kasih').textContent = `❤️ ${aiPasangan.kasihSayang}`;
  document.getElementById('stat-mood').textContent = aiPasangan.labelMood();
  document.getElementById('stat-duit').textContent = `💰 RM ${dapatDuit().toLocaleString()}`;
  
  // Butang seterusnya
  const pilihanDiv = document.getElementById('pilihan');
  pilihanDiv.innerHTML = '';
  const btn = document.createElement('button');
  btn.textContent = '→ Hari Seterusnya';
  btn.onclick = hariSeterusnya;
  pilihanDiv.appendChild(btn);
}

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
  
  document.getElementById('stat-duit').textContent = `💰 RM ${dapatDuit().toLocaleString()}`;
}

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

function hariSeterusnya() {
  gameState.hari++;
  gameState.tenagaAksi = gameState.tenagaMax;
  tunjukHari();
}

function tunjukEndingBab1() {
  document.getElementById('narasi').textContent = '📖 Bab 1 Tamat';
  document.getElementById('dialog').innerHTML = `
    ❤️ Kasih sayang: ${aiPasangan.kasihSayang}<br>
    😊 Mood:
