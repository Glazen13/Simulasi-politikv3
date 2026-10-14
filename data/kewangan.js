// ============================================
// SISTEM KEWANGAN — SETUP & LOGIK
// ============================================

let setupKewangan = {
  gajiPemain: 0,
  gajiPasangan: 0,
  sideIncome: 0,
  simpananTunai: 0,
  simpananASB: 0,
  komitmen: [],
  hutang: [],
  gayaHidup: "sederhana"
};

// ============================================
// TAMBAH KOMITMEN (UI)
// ============================================

function tambahKomitmen() {
  let list = document.getElementById("komitmen-list");
  let div = document.createElement("div");
  div.className = "komitmen-row";
  div.innerHTML = `
    <input type="text" class="komitmen-nama" placeholder="Contoh: Sewa rumah" value="">
    <input type="number" class="komitmen-jumlah" placeholder="RM" value="">
    <input type="number" class="komitmen-tarikh" placeholder="Tarikh (1-30)" value="26" min="1" max="30">
    <button class="btn-hapus" onclick="this.parentElement.remove()">✕</button>
  `;
  list.appendChild(div);
}

// ============================================
// TAMBAH HUTANG (UI)
// ============================================

function tambahHutang() {
  let list = document.getElementById("hutang-list");
  let div = document.createElement("div");
  div.className = "hutang-row";
  div.innerHTML = `
    <input type="text" class="hutang-nama" placeholder="Contoh: PTPTN" value="">
    <input type="number" class="hutang-baki" placeholder="Baki RM" value="">
    <input type="number" class="hutang-bayaran" placeholder="Bayaran RM/bulan" value="">
    <input type="number" class="hutang-tarikh" placeholder="Tarikh (1-30)" value="20" min="1" max="30">
    <button class="btn-hapus" onclick="this.parentElement.remove()">✕</button>
  `;
  list.appendChild(div);
}

// ============================================
// AMBIL DATA KOMITMEN
// ============================================

function ambilKomitmen() {
  let senarai = [];
  let rows = document.querySelectorAll(".komitmen-row");
  rows.forEach(function(row) {
    let nama = row.querySelector(".komitmen-nama").value;
    let jumlah = parseInt(row.querySelector(".komitmen-jumlah").value) || 0;
    let tarikh = parseInt(row.querySelector(".komitmen-tarikh").value) || 26;
    if (nama && jumlah > 0) {
      senarai.push({ nama: nama, jumlah: jumlah, tarikh: tarikh });
    }
  });
  return senarai;
}

// ============================================
// AMBIL DATA HUTANG
// ============================================

function ambilHutang() {
  let senarai = [];
  let rows = document.querySelectorAll(".hutang-row");
  rows.forEach(function(row) {
    let nama = row.querySelector(".hutang-nama").value;
    let baki = parseInt(row.querySelector(".hutang-baki").value) || 0;
    let bayaran = parseInt(row.querySelector(".hutang-bayaran").value) || 0;
    let tarikh = parseInt(row.querySelector(".hutang-tarikh").value) || 20;
    if (nama && bayaran > 0) {
      senarai.push({ nama: nama, baki: baki, bayaran: bayaran, tarikh: tarikh });
    }
  });
  return senarai;
}

// ============================================
// SIMPAN SETUP KEWANGAN
// ============================================

function simpanKewangan() {
  setupKewangan = {
    gajiPemain: parseInt(document.getElementById("input-gaji-pemain").value) || 0,
    gajiPasangan: parseInt(document.getElementById("input-gaji-pasangan").value) || 0,
    sideIncome: parseInt(document.getElementById("input-side-income").value) || 0,
    simpananTunai: parseInt(document.getElementById("input-simpanan-tunai").value) || 0,
    simpananASB: parseInt(document.getElementById("input-simpanan-asb").value) || 0,
    gayaHidup: document.getElementById("input-gaya-hidup").value,
    komitmen: ambilKomitmen(),
    hutang: ambilHutang()
  };

  localStorage.setItem("setupKewangan", JSON.stringify(setupKewangan));
  console.log("Setup kewangan disimpan:", setupKewangan);

  // Mula game
  if (typeof mulaMain === "function") {
    mulaMain();
  } else {
    alert("Setup disimpan! Sila sambung kod main.");
  }
}

// ============================================
// LOAD SETUP
// ============================================

function loadSetupKewangan() {
  let data = localStorage.getItem("setupKewangan");
  if (data) {
    setupKewangan = JSON.parse(data);
  }
}
