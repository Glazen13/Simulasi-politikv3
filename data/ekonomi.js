// ============================================
// SISTEM KEWANGAN REALISTIK
// Gaji masuk 25hb, bil ikut tarikh sendiri
// ============================================

let ekonomi = {
  duit: 0,
  tarikh: 1,
  hariDalamMinggu: "Isnin",
  hariSemasa: 1,
  sejarah: []
};

// ============================================
// TARIKH & HARI
// ============================================

function nextDay(hari) {
  let senarai = ["Isnin", "Selasa", "Rabu", "Khamis", "Jumaat", "Sabtu", "Ahad"];
  let index = senarai.indexOf(hari);
  return senarai[(index + 1) % 7];
}

function isWeekend(hari) {
  return hari === "Sabtu" || hari === "Ahad";
}

function tarikhGaji() {
  // Gaji masuk 25hb
  // Kalau 25hb jatuh Sabtu/Ahad → gaji masuk 24hb (Jumaat)
  let tarikh25 = 25;
  let hari25 = kiraHari(tarikh25);
  
  if (isWeekend(hari25)) {
    return 24; // Jumaat
  }
  return 25;
}

function kiraHari(tarikh) {
  // Kira hari dalam minggu ikut tarikh
  // (Simple: guna hari semasa + offset)
  let hariSekarang = ekonomi.hariDalamMinggu;
  let tarikhSekarang = ekonomi.tarikh;
  let beza = tarikh - tarikhSekarang;
  
  let senarai = ["Isnin", "Selasa", "Rabu", "Khamis", "Jumaat", "Sabtu", "Ahad"];
  let index = senarai.indexOf(hariSekarang);
  let indexBaru = (index + beza) % 7;
  if (indexBaru < 0) indexBaru += 7;
  
  return senarai[indexBaru];
}

// ============================================
// BELANJA HARIAN (IKUT GAYA HIDUP)
// ============================================

function kiraBelanjaHarian() {
  let asas = 0;
  
  // Ikut gaya hidup
  if (setupKewangan.gayaHidup === "jimat") {
    asas = 40;
  } else if (setupKewangan.gayaHidup === "sederhana") {
    asas = 60;
  } else if (setupKewangan.gayaHidup === "senang") {
    asas = 100;
  }
  
  // Hujung minggu lebih
  if (isWeekend(ekonomi.hariDalamMinggu)) {
    asas *= 2;
  }
  
  return asas;
}

// ============================================
// PROSES HARIAN
// ============================================

function prosesHarian() {
  let log = [];
  let masuk = 0;
  let keluar = 0;
  
  // 1. SEMAK GAJI (25hb atau 24hb kalau weekend)
  let tarikhGajiIni = tarikhGaji();
  if (ekonomi.tarikh === tarikhGajiIni) {
    let gajiTotal = setupKewangan.gajiPemain + setupKewangan.gajiPasangan;
    ekonomi.duit += gajiTotal;
    masuk += gajiTotal;
    log.push("💰 Gaji masuk: +RM " + gajiTotal);
  }
  
  // 2. SEMAK SIDE INCOME (kalau ada)
  if (setupKewangan.sideIncome > 0 && ekonomi.tarikh === 25) {
    ekonomi.duit += setupKewangan.sideIncome;
    masuk += setupKewangan.sideIncome;
    log.push("💼 Side income: +RM " + setupKewangan.sideIncome);
  }
  
  // 3. SEMAK KOMITMEN (ikut tarikh)
  setupKewangan.komitmen.forEach(function(k) {
    if (ekonomi.tarikh === k.tarikh) {
      ekonomi.duit -= k.jumlah;
      keluar += k.jumlah;
      log.push("📋 " + k.nama + ": -RM " + k.jumlah);
    }
  });
  
  // 4. SEMAK HUTANG (ikut tarikh)
  setupKewangan.hutang.forEach(function(h) {
    if (ekonomi.tarikh === h.tarikh) {
      ekonomi.duit -= h.bayaran;
      keluar += h.bayaran;
      h.baki -= h.bayaran;
      log.push("💳 " + h.nama + ": -RM " + h.bayaran);
    }
  });
  
  // 5. BELANJA HARIAN
  let belanja = kiraBelanjaHarian();
  ekonomi.duit -= belanja;
  keluar += belanja;
  log.push("🍽️ Belanja harian: -RM " + belanja);
  
  // 6. SIMPAN SEJARAH
  ekonomi.sejarah.push({
    hari: ekonomi.hariSemasa,
    tarikh: ekonomi.tarikh,
    masuk: masuk,
    keluar: keluar,
    baki: ekonomi.duit
  });
  
  // 7. UPDATE TARIKH
  ekonomi.tarikh++;
  if (ekonomi.tarikh > 30) {
    ekonomi.tarikh = 1;
  }
  ekonomi.hariDalamMinggu = nextDay(ekonomi.hariDalamMinggu);
  ekonomi.hariSemasa++;
  
  return {
    masuk: masuk,
    keluar: keluar,
    baki: ekonomi.duit,
    log: log
  };
}

// ============================================
// SEMAK KEWANGAN KRITIKAL
// ============================================

function semakKritikal() {
  if (ekonomi.duit < 0) {
    return {
      tahap: "kritikal",
      mesej: "⚠️ Duit negatif! Cari duit segera.",
      option: ["side_income", "pinjam", "jual_barang"]
    };
  }
  if (ekonomi.duit < 200) {
    return {
      tahap: "bahaya",
      mesej: "⚠️ Duit sikit. Hati-hati.",
      option: ["jimat", "side_income"]
    };
  }
  if (ekonomi.duit < 500) {
    return {
      tahap: "risau",
      mesej: "💰 Duit semakin susut.",
      option: ["jimat"]
    };
  }
  return null;
}

// ============================================
// TAMBAH DUIT (SIDE INCOME)
// ============================================

function tambahDuit(jumlah, sumber) {
  ekonomi.duit += jumlah;
  ekonomi.sejarah.push({
    hari: ekonomi.hariSemasa,
    tarikh: ekonomi.tarikh,
    masuk: jumlah,
    keluar: 0,
    baki: ekonomi.duit,
    sumber: sumber
  });
  return ekonomi.duit;
}

// ============================================
// KIRA JUMLAH KOMITMEN BULANAN
// ============================================

function jumlahKomitmenBulanan() {
  let total = 0;
  setupKewangan.komitmen.forEach(function(k) {
    total += k.jumlah;
  });
  setupKewangan.hutang.forEach(function(h) {
    total += h.bayaran;
  });
  return total;
}

// ============================================
// LAPORAN BULANAN
// ============================================

function laporanBulanan() {
  let masuk = 0;
  let keluar = 0;
  
  ekonomi.sejarah.forEach(function(s) {
    masuk += s.masuk;
    keluar += s.keluar;
  });
  
  return {
    masuk: masuk,
    keluar: keluar,
    lebihan: masuk - keluar,
    baki: ekonomi.duit,
    komitmen: jumlahKomitmenBulanan()
  };
}

// ============================================
// SIMPAN & LOAD
// ============================================

function simpanEkonomi() {
  localStorage.setItem("ekonomi", JSON.stringify(ekonomi));
}

function loadEkonomi() {
  let data = localStorage.getItem("ekonomi");
  if (data) {
    ekonomi = JSON.parse(data);
  }
}
