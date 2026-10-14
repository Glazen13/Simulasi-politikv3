const bab1Baru = {
  1: {
    tajuk: "Hari Pertama",
    sesi: [
      {
        masa: "pagi",
        situasi: "Rumah sewa. Kecil. Kotak masih bertimbun. Baru pindah semalam.",
        dialog: "{pasangan}: \"{pemain}... banyak lagi kotak ni. Kita kemas sama-sama ye?\"",
        pilihan: [
          {
            teks: "Jom, {pemain} tolong.",
            kesan: { kasih: 5, komunikasi: 3, kepercayaan: 1, mood_diri: 2, mood_ai: "Gembira", memori: "Baik" },
            reaksi: "{pasangan} tersenyum lebar. \"{pemain} terbaik!\""
          },
          {
            teks: "{pasangan} kemas dulu. {pemain} rehat.",
            kesan: { kasih: -2, komunikasi: -1, kepercayaan: 0, mood_diri: 0, mood_ai: "Neutral" },
            reaksi: "{pasangan} diam. \"Oh... ok.\""
          },
          {
            teks: "Esok je la.",
            kesan: { kasih: -3, komunikasi: -2, kepercayaan: -1, mood_diri: 0, mood_ai: "Sejuk", memori: "Buruk" },
            reaksi: "{pasangan} berhenti. \"Esok? {pemain}... kita dah takde tempat nak letak barang.\""
          }
        ]
      },
      {
        masa: "tengahari",
        situasi: "Kedai runcit. Barang dapur habis.",
        dialog: "{pasangan}: \"{pemain}, senarai ni panjang sikit. Cukup ke duit kita?\"",
        pilihan: [
          {
            teks: "Ikut awak. {pemain} bayar.",
            kesan: { kasih: 4, komunikasi: 2, kepercayaan: 2, mood_diri: 1, mood_ai: "Gembira" },
            reaksi: "{pasangan}: \"Terima kasih {pemain}.\""
          },
          {
            teks: "Beli yang perlu je dulu.",
            kesan: { kasih: 0, komunikasi: 0, kepercayaan: 1, mood_diri: 1, mood_ai: "Neutral" },
            reaksi: "{pasangan}: \"Ok. Kita ikut senarai.\""
          },
          {
            teks: "{pasangan} pilih la sendiri.",
            kesan: { kasih: -1, komunikasi: -2, kepercayaan: 0, mood_diri: 0, mood_ai: "Neutral" },
            reaksi: "{pasangan}: \"...ok.\""
          }
        ]
      },
      {
        masa: "petang",
        situasi: "Balik rumah. Penat. Duduk atas sofa.",
        dialog: "{pasangan}: \"{pemain}, penat eh? Hari ni banyak jalan.\"",
        pilihan: [
          {
            teks: "Sikit. Tapi seronok.",
            kesan: { kasih: 3, komunikasi: 2, kepercayaan: 0, mood_diri: 1, mood_ai: "Gembira" },
            reaksi: "{pasangan}: \"{pemain} ni... positif.\""
          },
          {
            teks: "Jom rehat. Esok sambung.",
            kesan: { kasih: 2, komunikasi: 1, kepercayaan: 0, mood_diri: 2, mood_ai: "Neutral" },
            reaksi: "{pasangan}: \"Jom. {pasangan} urut kaki {pemain}.\""
          },
          {
            teks: "{pasangan} tak tolong pun tadi.",
            kesan: { kasih: -4, komunikasi: -3, kepercayaan: -1, mood_diri: -1, mood_ai: "Sejuk", memori: "Buruk" },
            reaksi: "{pasangan} diam. Muka berubah."
          }
        ]
      },
      {
        masa: "malam",
        situasi: "Duduk atas katil. Lampu kuning. Rumah sewa sunyi.",
        dialog: "{pasangan}: \"{pemain}... pelik la rasa. Macam tumpang rumah orang.\"",
        pilihan: [
          {
            teks: "Sama. Tapi lama-lama jadi rumah kita.",
            kesan: { kasih: 3, komunikasi: 4, kepercayaan: 1, mood_diri: 2, mood_ai: "Gembira" },
            reaksi: "{pasangan}: \"Betul juga. Nanti kita beli langsir.\""
          },
          {
            teks: "Jom, kita pasang cadar sama-sama.",
            kesan: { kasih: 5, komunikasi: 3, kepercayaan: 1, mood_diri: 1, mood_ai: "Gembira", memori: "Baik" },
            reaksi: "{pasangan}: \"Jom! {pasangan} pegang hujung ni.\""
          },
          {
            teks: "Esok kena kerja awal. Tidur dulu.",
            kesan: { kasih: -3, komunikasi: -2, kepercayaan: 0, mood_diri: 1, mood_ai: "Sejuk", memori: "Buruk" },
            reaksi: "{pasangan}: \"...ok.\""
          }
        ]
      }
    ]
  }
};
