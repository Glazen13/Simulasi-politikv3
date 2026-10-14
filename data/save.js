// ================================
// SISTEM SAVE / LOAD
// ================================

const SAVE_KEY = 'hingga-ke-jannah-save';

function simpanGame() {
  try {
    const data = {
      gameState: gameState,
      aiPasangan: {
        personaliti: aiPasangan.personaliti,
        mood: aiPasangan.mood,
        kasihSayang: aiPasangan.kasihSayang,
        memoriBaik: aiPasangan.memoriBaik,
        memoriBuruk: aiPasangan.memoriBuruk
      },
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
    return true;
  } catch (e) {
    console.error('Gagal simpan:', e);
    return false;
  }
}

function adaSave() {
  return localStorage.getItem(SAVE_KEY) !== null;
}

function loadGame() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return false;
    
    const data = JSON.parse(raw);
    
    // Restore gameState
    Object.assign(gameState, data.gameState);
    
    // Restore AI
    aiPasangan.personaliti = data.aiPasangan.personaliti;
    aiPasangan.mood = data.aiPasangan.mood;
    aiPasangan.kasihSayang = data.aiPasangan.kasihSayang;
    aiPasangan.memoriBaik = data.aiPasangan.memoriBaik || [];
    aiPasangan.memoriBuruk = data.aiPasangan.memoriBuruk || [];
    
    return true;
  } catch (e) {
    console.error('Gagal load:', e);
    return false;
  }
}

function resetSave() {
  if (confirm('Reset semua progress? Tindakan ini tidak boleh diundur.')) {
    localStorage.removeItem(SAVE_KEY);
    location.reload();
  }
}

function dapatkanInfoSave() {
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return null;
  
  try {
    const data = JSON.parse(raw);
    return {
      hari: data.gameState.hari,
      mod: data.gameState.mod,
      namaPemain: data.gameState.namaPemain,
      timestamp: data.timestamp
    };
  } catch (e) {
    return null;
  }
}
