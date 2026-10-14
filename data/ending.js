// Sistem Ending

function semakEnding() {
  const kasih = aiPasangan.kasihSayang;
  const duit = gameState.kewangan.simpanan;
  
  if (kasih >= 90 && duit > 5000) {
    return {
      tajuk: "🏆 Hingga ke Jannah",
      teks: "Kau dan pasangan duduk di tepi tingkap. Langit cerah. Tangan dua-dua bersatu.\n\nKau capai ending terbaik. Semoga hubungan kau di dunia juga sampai ke Jannah.",
      warna: "#FFD700"
    };
  }
  
  if (kasih >= 70 && duit > 3000) {
    return {
      tajuk: "🥈 Bahagia Sederhana",
      teks: "Kau dan pasangan duduk atas sofa. TV buka. Pasangan tersenyum.\n\nHidup sederhana. Tapi bahagia.",
      warna: "#C0C0C0"
    };
  }
  
  if (duit > 10000 && kasih < 50) {
    return {
      tajuk: "🥉 Terlalu Sibuk",
      teks: "Kau balik kerja. Rumah sunyi. Pasangan dah tidur.\n\nKau berjaya kewangan. Tapi hubungan renggang.",
      warna: "#CD7F32"
    };
  }
  
  if (duit < 0 && kasih < 40) {
    return {
      tajuk: "⚠️ Kewangan Kritikal",
      teks: "Rumah sunyi. Surat bertimbun atas meja.\n\nKewangan susah. Hubungan tegang.",
      warna: "#FF6347"
    };
  }
  
  if (kasih < 20) {
    return {
      tajuk: "💔 Berpisah Jalan",
      teks: "Rumah sunyi. Katil kosong.\n\nHubungan gagal. Tapi bukan penamat.",
      warna: "#8B0000"
    };
  }
  
  return {
    tajuk: "🌈 Ujian Hidup",
    teks: "Kau dan pasangan masih bersama. Banyak yang jadi.\n\nTeruskan perjalanan.",
    warna: "#9370DB"
  };
}
