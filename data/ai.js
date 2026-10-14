// Sistem AI Pasangan
let aiPasangan = {
  personaliti: null,
  mood: 70,
  kasihSayang: 50,
  memoriBaik: [],
  memoriBuruk: [],
  
  // Reaksi ikut personaliti
  reaksi: function(pilihan, kesan) {
    this.updateMood(kesan.mood || 0);
    this.updateKasihSayang(kesan.kasihSayang || 0);
    
    if (kesan.kasihSayang > 0) {
      this.rekodMemori('baik', kesan.nota || 'Pemain buat baik');
    } else if (kesan.kasihSayang < 0) {
      this.rekodMemori('buruk', kesan.nota || 'Pemain buat buruk');
    }
    
    return this.dapatDialog(kesan);
  },
  
  updateMood: function(nilai) {
    this.mood = Math.max(0, Math.min(100, this.mood + nilai));
  },
  
  updateKasihSayang: function(nilai) {
    this.kasihSayang = Math.max(0, Math.min(100, this.kasihSayang + nilai));
  },
  
  rekodMemori: function(jenis, nota) {
    const rekod = { hari: gameState.hari, nota: nota };
    if (jenis === 'baik') {
      this.memoriBaik.push(rekod);
    } else {
      this.memoriBuruk.push(rekod);
    }
  },
  
  dapatDialog: function(kesan) {
    // Dialog default — akan override oleh scene
    return kesan.dialog || '';
  },
  
  // Dapat label mood
  labelMood: function() {
    if (this.mood >= 80) return '😍 Gembira';
    if (this.mood >= 50) return '🙂 Neutral';
    if (this.mood >= 30) return '😐 Sejuk';
    if (this.mood >= 10) return '😞 Sedih';
    return '😡 Marah';
  }
};

function initAI() {
  aiPasangan.personaliti = gameState.personaliti;
  aiPasangan.mood = 70;
  aiPasangan.kasihSayang = 50;
  aiPasangan.memoriBaik = [];
  aiPasangan.memoriBuruk = [];
}
