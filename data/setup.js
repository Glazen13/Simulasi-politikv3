// ============================================
// SETUP KEWANGAN AWAL
// Pemain isi detail di sini
// ============================================

let setupKewangan = {
  // Pendapatan
  gajiPemain: 0,
  gajiPasangan: 0,
  sideIncome: 0,
  
  // Simpanan
  simpananTunai: 0,
  simpananASB: 0,
  
  // Hutang
  hutang: [],
  
  // Komitmen bulanan
  komitmen: [],
  
  // Gaya hidup
  gayaHidup: "sederhana"
};

// ============================================
// DEFAULT IKUT TITIK MULA
// ============================================

function defaultKewangan(titikMula) {
  if (titikMula === "A") {
    // Rumah Sewa Sendiri
    return {
      gajiPemain: 3000,
      gajiPasangan: 2500,
      sideIncome: 0,
      simpananTunai: 2000,
      simpananASB: 0,
      hutang: [
        { nama: "PTPTN", baki: 15000, bayaran: 200, tarikh: 20 }
      ],
      komitmen: [
        { nama: "Sewa rumah", jumlah: 800, tarikh: 26 },
        { nama: "TNB (api)", jumlah: 120, tarikh: 27 },
        { nama: "Syabas (air)", jumlah: 50, tarikh: 28 },
        { nama: "Internet", jumlah: 80, tarikh: 5 },
        { nama: "Phone", jumlah: 60, tarikh: 10 }
      ],
      gayaHidup: "sederhana"
    };
  }
  
  if (titikMula === "B") {
    // Rumah Ibu Bapa
    return {
      gajiPemain: 3000,
      gajiPasangan: 2500,
      sideIncome: 0,
      simpananTunai: 3500,
      simpananASB: 0,
      hutang: [
        { nama: "PTPTN", baki: 15000, bayaran: 200, tarikh: 20 }
      ],
      komitmen: [
        { nama: "Bagi mak", jumlah: 300, tarikh: 26 },
        { nama: "TNB (api)", jumlah: 100, tarikh: 27 },
        { nama: "Syabas (air)", jumlah: 40, tarikh: 28 },
        { nama: "Internet", jumlah: 80, tarikh: 5 },
        { nama: "Phone", jumlah: 60, tarikh: 10 }
      ],
      gayaHidup: "sederhana"
    };
  }
  
  if (titikMula === "C") {
    // Rumah Mertua
    return {
      gajiPemain: 3000,
      gajiPasangan: 2500,
      sideIncome: 0,
      simpananTunai: 3500,
      simpananASB: 0,
      hutang: [
        { nama: "PTPTN", baki: 15000, bayaran: 200, tarikh: 20 }
      ],
      komitmen: [
        { nama: "Bagi mertua", jumlah: 200, tarikh: 26 },
        { nama: "TNB (api)", jumlah: 100, tarikh: 27 },
        { nama: "Syabas (air)", jumlah: 40, tarikh: 28 },
        { nama: "Internet", jumlah: 80, tarikh: 5 },
        { nama: "Phone", jumlah: 60, tarikh: 10 }
      ],
      gayaHidup: "sederhana"
    };
  }
  
  if (titikMula === "D") {
    // Rumah Sendiri
    return {
      gajiPemain: 3500,
      gajiPasangan: 2500,
      sideIncome: 0,
      simpananTunai: 1000,
      simpananASB: 0,
      hutang: [
        { nama: "PTPTN", baki: 15000, bayaran: 200, tarikh: 20 },
        { nama: "Loan rumah", baki: 250000, bayaran: 1200, tarikh: 15 }
      ],
      komitmen: [
        { nama: "TNB (api)", jumlah: 150, tarikh: 27 },
        { nama: "Syabas (air)", jumlah: 60, tarikh: 28 },
        { nama: "Internet", jumlah: 80, tarikh: 5 },
        { nama: "Phone", jumlah: 60, tarikh: 10 }
      ],
      gayaHidup: "sederhana"
    };
  }
  
  return defaultKewangan("A");
}

// ============================================
// SIMPAN & LOAD
// ============================================

function simpanSetup() {
  let data = {
    gajiPemain: parseInt(document.getElementById("gajiPemain").value) || 0,
    gajiPasangan: parseInt(document.getElementById("gajiPasangan").value) || 0,
    sideIncome: parseInt(document.getElementById("sideIncome").value) || 0,
    simpananTunai: parseInt(document.getElementById("simpananTunai").value) || 0,
    simpananASB: parseInt(document.getElementById("simpananASB").value) || 0,
    gayaHidup: document.getElementById("gayaHidup").value,
    komitmen: ambilKomitmen(),
    hutang: ambilHutang()
  };
  
  localStorage.setItem("setupKewangan", JSON.stringify(data));
  setupKewangan = data;
}

function loadSetup() {
  let data = localStorage.getItem("setupKewangan");
  if (data) {
    setupKewangan = JSON.parse(data);
  }
}

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
