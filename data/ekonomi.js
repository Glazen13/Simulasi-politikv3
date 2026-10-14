// Sistem ekonomi

function kiraHarian() {
  const k = gameState.kewangan;
  
  // Gaji harian (bulan / 30)
  const gajiHarian = (k.gajiPemain + k.gajiPasangan) / 30;
  
  // Perbelanjaan harian
  const makan = 30;
  const petrol = 20;
  
  // Sewa harian
  const sewaHarian = k.sewa / 30;
  
  // Update simpanan
  k.simpanan += gajiHarian - makan - petrol - sewaHarian;
  
  return {
    masuk: Math.round(gajiHarian),
    keluar: Math.round(makan + petrol + sewaHarian),
    bersih: Math.round(gajiHarian - makan - petrol - sewaHarian)
  };
}

function dapatDuit() {
  return Math.round(gameState.kewangan.simpanan);
}

function tambahDuit(nilai) {
  gameState.kewangan.simpanan += nilai;
}
