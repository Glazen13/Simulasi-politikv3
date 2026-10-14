// Bab 1 — Penyesuaian (Hari 1–7)

const bab1 = {
  1: {
    tajuk: "Hari Pertama",
    narasi: "Hari pertama kita duduk berdua. Rumah flat kecik je — dapur sempit, bilik satu, tapi ini la permulaan hidup kita.",
    dialog: function() {
      return `${gameState.panggilanPasangan}: " banyak lagi kotak ni. Jap lagi nak guna apa untuk masak malam ni?"`;
    },
    pilihan: [
      {
        teks: "Jom, {pemain} tolong kemas sama-sama.",
        kesan: { kasihSayang: 5, mood: 10, nota: "Tolong kemas" },
        reaksi: [
          "Yeay! {pasangan} pegang kotak tu, {pemain} susun dalam almari.",
          "Terima kasih. Seronok dapat buat sama-sama.",
          "Jom! Nanti kita boleh borak sambil kemas."
        ]
      },
      {
        teks: "{pasangan} kemas dulu, {pemain} nak rehat kejap.",
        kesan: { kasihSayang: -2, mood: -5, nota: "Suruh kemas sorang" },
        reaksi: [
          "...okay.",
          "Yela. {pasangan} kemas sendiri.",
          "Hmm."
        ]
      },
      {
        teks: "Malam ni kita tapau je la, penat ni.",
        kesan: { kasihSayang: 0, mood: 0, nota: "Tapau" },
        reaksi: [
          "Ok la. {pasangan} pun penat.",
          "Boleh. Nak makan apa?",
          "Jom. {pasangan} malas nak masak."
        ]
      }
    ]
  },
  
  2: {
    tajuk: "Malam Pertama",
    narasi: "Malam pertama kat rumah sendiri. Bukan rumah orang, bukan hotel — rumah kita.",
    dialog: function() {
      return `${gameState.panggilanPasangan}: " pelik la rasa. Macam tumpang rumah orang je."`;
    },
    pilihan: [
      {
        teks: "Sama la. Tapi lama-lama jadi rumah kita juga.",
        kesan: { kasihSayang: 3, mood: 5, nota: "Faham" },
        reaksi: [
          "Betul juga. Nanti kita beli langsir, pasu... buat cantik-cantik.",
          "{pasangan} harap macam tu.",
          "Ye. Kita usaha sama-sama."
        ]
      },
      {
        teks: "Jom, kita pasang cadar sama-sama.",
        kesan: { kasihSayang: 5, mood: 10, nota: "Pasang cadar" },
        reaksi: [
          "Jom! {pasangan} pegang hujung ni.",
          "Ok! Nanti kita berguling atas cadar baru.",
          "Seronoknya. Macam budak-budak."
        ]
      },
      {
        teks: "Esok {pemain} kena kerja awal. Tidur dulu la.",
        kesan: { kasihSayang: -3, mood: -5, nota: "Tidur awal" },
        reaksi: [
          "...okay.",
          "Yela. {pasangan} tidur.",
          "Hmm."
        ]
      }
    ]
  },
  
  3: {
    tajuk: "Pagi Pertama",
    narasi: "Alarm berbunyi. Hari pertama kerja selepas kahwin. {pasangan} nampak penat — semalam kemas sampai lewat.",
    dialog: function() {
      return `${gameState.panggilanPasangan}: " sarapan apa nak? {pasangan} tak sempat masak la."`;
    },
    pilihan: [
      {
        teks: "Takpe, {pemain} beli je kat luar. {pasangan} rehat dulu.",
        kesan: { kasihSayang: 2, mood: 5, nota: "Beli sarapan" },
        reaksi: [
          "Terima kasih. {pasangan} sayang {pemain}.",
          "Ok. Beli nasi lemak ye.",
          "{pemain} ni, memahami."
        ]
      },
      {
        teks: "Jom, kita masak simple-simple. {pemain} tolong.",
        kesan: { kasihSayang: 5, mood: 10, nota: "Masak bersama" },
        reaksi: [
          "Jom! {pemain} potong bawang, {pasangan} masak.",
          "Seronoknya. Macam honeymoon.",
          "Ok! {pasangan} suka masak berdua."
        ]
      },
      {
        teks: "Alah, apa susah. Telur pun boleh.",
        kesan: { kasihSayang: -3, mood: -5, nota: "Remehkan" },
        reaksi: [
          "Ye la... senang cakap.",
          "Ok. Telur la.",
          "{pemain} ni... tak faham."
        ]
      }
    ]
  },
  
  4: {
    tajuk: "Hari Biasa",
    narasi: "Hari biasa. Rutin mula.",
    jenis: "ringkasan"
  },
  
  5: {
    tajuk: "Event Random",
    narasi: "{pasangan} balik awal hari ni. Tapi dia tak cakap apa-apa. Muka macam ada sesuatu.",
    dialog: function() {
      return `${gameState.panggilanPasangan} duduk atas sofa tanpa buka kasut.`;
    },
    pilihan: [
      {
        teks: "Kenapa {pasangan}? Ada masalah kat kerja?",
        kesan: { kasihSayang: 4, mood: 8, nota: "Ambil berat" },
        reaksi: [
          "{pemain}... bos {pasangan} marah hari ni. {pasangan} tak buat salah pun.",
          "{pasangan} penat la. Kerja banyak.",
          "{pasangan} rindu {pemain} je."
        ]
      },
      {
        teks: "Dah makan? {pemain} lapo ni.",
        kesan: { kasihSayang: -3, mood: -8, nota: "Tak peduli" },
        reaksi: [
          "...{pasangan} penat la.",
          "Belum. {pemain} nak makan apa?",
          "Hmm."
        ]
      },
      {
        teks: "Diam je. Penat ke?",
        kesan: { kasihSayang: 1, mood: 2, nota: "Tanya" },
        reaksi: [
          "Hmm.",
          "Penat la.",
          "{pasangan} ok."
        ]
      }
    ]
  },
  
  6: {
    tajuk: "Mesej Sayang",
    jenis: "mini",
    mesej: "{pasangan} hantar mesej: \"{pemain}, balik nanti beli ayam ye.\"",
    pilihan: [
      {
        teks: "Ok {pasangan}.",
        kesan: { kasihSayang: 1, mood: 2, nota: "Balas mesej" }
      },
      {
        teks: "Malas la. {pasangan} beli sendiri.",
        kesan: { kasihSayang: -2, mood: -5, nota: "Malas" }
      },
      {
        teks: "Beli ayam + beli bunga sekali.",
        kesan: { kasihSayang: 3, mood: 8, duit: -30, nota: "Bunga" }
      }
    ]
  },
  
  7: {
    tajuk: "Hujung Minggu",
    narasi: "Hujung minggu pertama. Hari ni tak kerja. {pasangan} dok scroll phone, senyum-senyum.",
    dialog: function() {
      return `${gameState.panggilanPasangan}: " member {pasangan} ajak keluar. Nak pergi tak?"`;
    },
    pilihan: [
      {
        teks: "Jom, kita keluar. {pemain} belanja.",
        kesan: { kasihSayang: 5, mood: 10, duit: -100, nota: "Keluar" },
        reaksi: [
          "Yeay! {pasangan} nak pakai baju baru.",
          "Jom! {pasangan} dah lama tak keluar.",
          "Seronoknya! Nak pergi mana?"
        ]
      },
      {
        teks: "{pemain} penat la. {pasangan} pergi je la.",
        kesan: { kasihSayang: -4, mood: -8, nota: "Tak ikut" },
        reaksi: [
          "Yela. {pasangan} pergi sorang la.",
          "Ok.",
          "Hmm."
        ]
      },
      {
        teks: "Keluar mana? Kawan lelaki ke perempuan?",
        kesan: { kasihSayang: -5, mood: -10, nota: "Cemburu" },
        reaksi: [
          "{pemain} ni... kawan je pun. Kenapa nak tanya macam tu?",
          "{pasangan} tak suka {pemain} tanya macam ni.",
          "Hmm."
        ]
      }
    ]
  }
};
