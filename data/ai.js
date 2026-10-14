// Sistem AI Pasangan
let aiPasangan = {
  personaliti: null,
  mood: 70,
  kasihSayang: 50,
  komunikasi: 50,
  kepercayaan: 50,
  moodDiri: 50,
  memoriBaik: [],
  memoriBuruk: [],
  
  updateMood: function(nilai) {
    this.mood = Math.max(0, Math.min(100, this.mood + nilai));
  },
  
  updateKasihSayang: function(nilai) {
    this.kasihSayang = Math.max(0, Math.min(100, this.kasihSayang + nilai));
  },
  
  updateKomunikasi: function(nilai) {
    this.komunikasi = Math.max(0, Math.min(100, this.komunikasi + nilai));
  },
  
  updateKepercayaan: function(nilai) {
    this.kepercayaan = Math.max(0, Math.min(100, this.kepercayaan + nilai));
  },
  
  updateMoodDiri: function(nilai) {
    this.moodDiri = Math.max(0, Math.min(100, this.moodDiri + nilai));
  },
  
  rekodMemori: function(jenis, nota) {
    const rekod = { hari: gameState.hari, nota: nota };
    if (jenis === 'baik') {
      this.memoriBaik.push(rekod);
    } else {
      this.memoriBuruk.push(rekod);
    }
  },
  
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
  aiPasangan.komunikasi = 50;
  aiPasangan.kepercayaan = 50;
  aiPasangan.moodDiri = 50;
  aiPasangan.memoriBaik = [];
  aiPasangan.memoriBuruk = [];
}
