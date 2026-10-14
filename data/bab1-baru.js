// ================================
// FASA 1: BULAN MADU
// Bab 1: Penyesuaian (Minggu 1-2)
// Mod: Suami | Rumah: Sewa | Personaliti: Romantik
// ================================

const bab1Baru = {
  1: {
    tajuk: "Hari Pertama",
    sesi: [
      {
        masa: "pagi",
        situasi: "Alarm berbunyi. 6.30 pagi. Rumah sewa kecik. Langsir nipis. Cahaya matahari masuk perlahan. Kotak masih bertimbun merata. Sayang duduk tepi katil. Pandang awak.",
        dialog: "{pasangan}: \"Abang... bangun la sayang. Matahari dah naik. Saya nak siapkan sarapan untuk abang.\"",
        pilihan: [
          {
            teks: "Jap sayang. 5 minit.",
            kesan: { kasih: 0, komunikasi: 1, kepercayaan: 0, mood_diri: 1, mood_ai: "Neutral" },
            reaksi: "Ok. Saya kira. 5 minit je ye, abang."
          },
          {
            teks: "Abang bangun. Sayang jangan risau.",
            kesan: { kasih: 3, komunikasi: 2, kepercayaan: 1, mood_diri: 2, mood_ai: "Gembira", memori: "Baik" },
            reaksi: "Yeay! Abang terbaik. Jom, saya tunggu kat dapur."
          },
          {
            teks: "Alamak! Pukul berapa?",
            kesan: { kasih: 2, komunikasi: 3, kepercayaan: 0, mood_diri: 1, mood_ai: "Neutral" },
            reaksi: "6.30, abang. Relaks. Saya dah kejut awal."
          }
        ]
      },
      {
        masa: "tengahari",
        situasi: "Kedai runcit. Barang dapur habis. Sayang pegang senarai panjang. Dia pandang awak. Risau.",
        dialog: "{pasangan}: \"Abang, senarai ni panjang sikit. Cukup ke duit kita? Saya tak nak susahkan abang.\"",
        pilihan: [
          {
            teks: "Ikut awak. Abang bayar.",
            kesan: { kasih: 4, komunikasi: 2, kepercayaan: 2, mood_diri: 1, mood_ai: "Gembira", memori: "Baik" },
            reaksi: "Terima kasih abang. Abang memang penyayang."
          },
          {
            teks: "Beli yang perlu je dulu.",
            kesan: { kasih: 0, komunikasi: 0, kepercayaan: 1, mood_diri: 1, mood_ai: "Neutral" },
            reaksi: "Ok. Kita ikut senarai."
          },
          {
            teks: "Awak pilih la sendiri.",
            kesan: { kasih: -1, komunikasi: -2, kepercayaan: 0, mood_diri: 0, mood_ai: "Neutral" },
            reaksi: "...ok."
          }
        ]
      },
      {
        masa: "petang",
        situasi: "Balik rumah. Penat. Duduk atas sofa. Sayang datang duduk sebelah. Dia letak kepala atas bahu awak.",
        dialog: "{pasangan}: \"Abang, penat eh? Hari ni banyak jalan. Saya urut kaki abang ye.\"",
        pilihan: [
          {
            teks: "Sikit. Tapi seronok.",
            kesan: { kasih: 3, komunikasi: 2, kepercayaan: 0, mood_diri: 1, mood_ai: "Gembira" },
            reaksi: "Abang ni... positif. Saya suka."
          },
          {
            teks: "Jom rehat. Esok sambung.",
            kesan: { kasih: 2, komunikasi: 1, kepercayaan: 0, mood_diri: 2, mood_ai: "Neutral" },
            reaksi: "Jom. Saya urut kaki abang."
          },
          {
            teks: "Awak tak tolong pun tadi.",
            kesan: { kasih: -4, komunikasi: -3, kepercayaan: -1, mood_diri: -1, mood_ai: "Sejuk", memori: "Buruk" },
            reaksi: "Dia diam. Muka berubah."
          }
        ]
      },
      {
        masa: "malam",
        situasi: "Balik. Duduk atas katil. Lampu kuning. Selimut tebal. Rumah sewa sunyi. Hanya bunyi kipas. Sayang sandar kat bahu awak. Tangan dia cari tangan awak. Genggam. Jari dia kecil. Sejuk. Dia diam lama. Pandang siling. Kemudian pusing. Pandang awak. Mata dia berkaca. Ada air.",
        dialog: "{pasangan}: \"Abang... Seminggu ni... saya rasa macam mimpi. Saya tak sangka kita boleh sampai sini. Abang gembira tak? Jujur ye, abang. Saya tak nak abang pura-pura. Saya takut... abang menyesal.\"",
        pilihan: [
          {
            teks: "Seronok sayang. Abang tak menyesal.",
            kesan: { kasih: 6, komunikasi: 4, kepercayaan: 3, mood_diri: 3, mood_ai: "Gembira", memori: "Baik" },
            reaksi: "(peluk awak) Abang... saya sayang abang. Terima kasih."
          },
          {
            teks: "Biasa je.",
            kesan: { kasih: -3, komunikasi: -3, kepercayaan: -1, mood_diri: 0, mood_ai: "Sejuk", memori: "Buruk" },
            reaksi: "Dia diam. Lepas tangan. Pusing ke dinding. \"...oh. Ok.\""
          },
          {
            teks: "Penat. Tapi usaha.",
            kesan: { kasih: 3, komunikasi: 2, kepercayaan: 1, mood_diri: 1, mood_ai: "Neutral" },
            reaksi: "Saya faham. Jom kita usaha sama-sama. Saya tak nak lepas abang."
          },
          {
            teks: "Awak macam mana?",
            kesan: { kasih: 7, komunikasi: 5, kepercayaan: 3, mood_diri: 3, mood_ai: "Gembira", memori: "Baik" },
            reaksi: "(air mata jatuh) Saya... gembira. Sangat. Sebab ada abang. Abang jangan pergi ye."
          }
        ]
      }
    ]
  },

  2: {
    tajuk: "Pagi Pertama",
    sesi: [
      {
        masa: "pagi",
        situasi: "Alarm bunyi. 6.45 pagi. Bau kopi dari dapur. Sayang dah bangun awal. Dia datang kejut awak. Muka dia bersinar.",
        dialog: "{pasangan}: \"Abang... bangun. Saya buat kopi. Wangi kan? Abang suka kopi saya.\"",
        pilihan: [
          {
            teks: "Terima kasih sayang. Wangi.",
            kesan: { kasih: 4, komunikasi: 2, kepercayaan: 1, mood_diri: 2, mood_ai: "Gembira", memori: "Baik" },
            reaksi: "Jom. Saya buat roti bakar sekali."
          },
          {
            teks: "Jap lagi 5 minit.",
            kesan: { kasih: -1, komunikasi: 0, kepercayaan: 0, mood_diri: 1, mood_ai: "Neutral" },
            reaksi: "Ok. Saya tunggu. Kopi nanti sejuk."
          },
          {
            teks: "Awak bangun awal ye?",
            kesan: { kasih: 2, komunikasi: 1, kepercayaan: 1, mood_diri: 1, mood_ai: "Neutral" },
            reaksi: "Saja. Nak kejut abang. Nak tengok muka abang."
          }
        ]
      },
      {
        masa: "tengahari",
        situasi: "Tengah hari. Kerja. Phone berbunyi.",
        dialog: "📱 {pasangan}: \"Abang, dah makan? Saya masak lebih tadi. Ingat nak tapau untuk abang. Saya rindu abang.\"",
        pilihan: [
          {
            teks: "Dah makan. Awak?",
            kesan: { kasih: 2, komunikasi: 3, kepercayaan: 1, mood_diri: 1, mood_ai: "Gembira" },
            reaksi: "Dah. Tapi sunyi makan sorang."
          },
          {
            teks: "Belum. Sibuk.",
            kesan: { kasih: 0, komunikasi: -1, kepercayaan: 0, mood_diri: 0, mood_ai: "Neutral" },
            reaksi: "Ok. Jangan skip ye. Saya risau."
          },
          {
            teks: "Awak masak apa tadi?",
            kesan: { kasih: 1, komunikasi: 2, kepercayaan: 0, mood_diri: 1, mood_ai: "Neutral" },
            reaksi: "Telur je. Saya belajar masak sambal. Nak try nanti?"
          }
        ]
      },
      {
        masa: "petang",
        situasi: "Petang. Balik rumah. Buka pintu — bau masakan. Sayang lari sikit, peluk awak. Bau perfume dia harum.",
        dialog: "{pasangan}: \"Abang! Dah balik! Penat eh, abang? Jom duduk. Saya urut kaki abang.\"",
        pilihan: [
          {
            teks: "Balik. Penat la sayang.",
            kesan: { kasih: 3, komunikasi: 2, kepercayaan: 1, mood_diri: 1, mood_ai: "Gembira" },
            reaksi: "Duduk sini. Saya urut."
          },
          {
            teks: "Bau apa ni? Sayang masak?",
            kesan: { kasih: 4, komunikasi: 2, kepercayaan: 1, mood_diri: 2, mood_ai: "Gembira", memori: "Baik" },
            reaksi: "Sambal ayam! Saya belajar dari mak tadi."
          },
          {
            teks: "Jap, letak beg dulu sayang.",
            kesan: { kasih: 1, komunikasi: 0, kepercayaan: 0, mood_diri: 0, mood_ai: "Neutral" },
            reaksi: "Oh... ok. Sorry. Saya tak sabar."
          }
        ]
      },
      {
        masa: "malam",
        situasi: "Meja kecil. Sayang letak lilin. Dua pinggan. Sayang ambil nasi. Dia duduk. Pandang awak makan.",
        dialog: "{pasangan}: \"Abang, makan ni. Saya masak banyak. Abang kena habiskan ye. Abang... terima kasih ye. Sebab kahwin dengan saya. Saya tak sangka kita boleh sampai sini.\"",
        pilihan: [
          {
            teks: "Sama sayang. Abang yang patut syukur.",
            kesan: { kasih: 6, komunikasi: 4, kepercayaan: 2, mood_diri: 3, mood_ai: "Gembira", memori: "Baik" },
            reaksi: "(mata berkaca) Abang... saya sayang abang."
          },
          {
            teks: "Awak dah makan?",
            kesan: { kasih: 4, komunikasi: 3, kepercayaan: 2, mood_diri: 1, mood_ai: "Gembira" },
            reaksi: "Belum. Saya tunggu abang. Jom makan sama."
          },
          {
            teks: "Nasi banyak la.",
            kesan: { kasih: -2, komunikasi: -1, kepercayaan: 0, mood_diri: 0, mood_ai: "Neutral" },
            reaksi: "Oh. Saya ambil balik separuh."
          }
        ]
      }
    ]
  },

  3: {
    tajuk: "Rutin Mula",
    sesi: [
      {
        masa: "pagi",
        situasi: "Alarm bunyi. Sayang panik. Rambut bersepah.",
        dialog: "{pasangan}: \"Abang! Lambat! Saya tak sempat masak.\"",
        pilihan: [
          {
            teks: "Jom, abang hantar. Kita beli sarapan.",
            kesan: { kasih: 4, komunikasi: 3, kepercayaan: 1, mood_diri: 1, mood_ai: "Gembira", memori: "Baik" },
            reaksi: "Terima kasih! Abang terbaik."
          },
          {
            teks: "Takpe. Abang beli nanti.",
            kesan: { kasih: 2, komunikasi: 1, kepercayaan: 1, mood_diri: 1, mood_ai: "Neutral" },
            reaksi: "Ok. Sorry ye."
          },
          {
            teks: "Kenapa tak bangun awal?",
            kesan: { kasih: -4, komunikasi: -2, kepercayaan: -1, mood_diri: -1, mood_ai: "Sejuk", memori: "Buruk" },
            reaksi: "Sorry... saya cuba lagi."
          }
        ]
      },
      {
        masa: "tengahari",
        situasi: "Kerja. Phone berbunyi.",
        dialog: "📱 {pasangan}: \"Abang, saya rindu. Abang buat apa?\"",
        pilihan: [
          {
            teks: "Rindu juga. Abang tengah meeting.",
            kesan: { kasih: 3, komunikasi: 3, kepercayaan: 1, mood_diri: 1, mood_ai: "Gembira" },
            reaksi: "Ok. Sorry ganggu. Saya tunggu abang balik."
          },
          {
            teks: "Sibuk. Nanti.",
            kesan: { kasih: -2, komunikasi: -2, kepercayaan: 0, mood_diri: -1, mood_ai: "Sejuk" },
            reaksi: "...ok."
          },
          {
            teks: "Abang pun rindu. Balik nanti kita borak.",
            kesan: { kasih: 4, komunikasi: 3, kepercayaan: 2, mood_diri: 2, mood_ai: "Gembira", memori: "Baik" },
            reaksi: "Yeay! Saya tunggu."
          }
        ]
      },
      {
        masa: "petang",
        situasi: "Petang. Balik rumah. Pinggan bertimbun. Sayang belum balik.",
        dialog: "Rumah sunyi. Pinggan bertimbun di sinki.",
        pilihan: [
          {
            teks: "Basuh pinggan dulu.",
            kesan: { kasih: 4, komunikasi: 1, kepercayaan: 2, mood_diri: 2, mood_ai: "Gembira", memori: "Baik" },
            reaksi: "{pasangan} balik. \"Eh, abang basuh pinggan?\""
          },
          {
            teks: "Tunggu dia balik.",
            kesan: { kasih: 0, komunikasi: 0, kepercayaan: 0, mood_diri: 0, mood_ai: "Neutral" },
            reaksi: "Dia balik. Penat."
          },
          {
            teks: "Marah bila dia balik.",
            kesan: { kasih: -5, komunikasi: -3, kepercayaan: -2, mood_diri: -2, mood_ai: "Marah", memori: "Buruk" },
            reaksi: "Kenapa abang marah?"
          }
        ]
      },
      {
        masa: "malam",
        situasi: "Sayang balik lambat. Penat. Muka dia lesu. Dia letak beg. Duduk atas sofa.",
        dialog: "{pasangan}: \"Sorry abang. Meeting lambat. Saya tak sempat nak masak.\"",
        pilihan: [
          {
            teks: "Takpe. Abang dah masak.",
            kesan: { kasih: 6, komunikasi: 3, kepercayaan: 2, mood_diri: 2, mood_ai: "Gembira", memori: "Baik" },
            reaksi: "Abang... terbaik. Saya sayang abang."
          },
          {
            teks: "Kenapa tak bagitahu?",
            kesan: { kasih: -2, komunikasi: -1, kepercayaan: -1, mood_diri: 0, mood_ai: "Neutral" },
            reaksi: "Sorry. Saya terlupa."
          },
          {
            teks: "Diam. Muka masam.",
            kesan: { kasih: -4, komunikasi: -3, kepercayaan: -1, mood_diri: -1, mood_ai: "Sejuk", memori: "Buruk" },
            reaksi: "Dia diam. Pergi bilik air."
          }
        ]
      }
    ]
  },

  4: {
    tajuk: "Hujung Minggu",
    sesi: [
      {
        masa: "pagi",
        situasi: "Sabtu. Tak kerja. Sayang masih tidur. Muka tenang. Selimut sampai dagu.",
        dialog: "Rumah sewa sunyi. Sayang masih tidur.",
        pilihan: [
          {
            teks: "Biar dia tidur. Masak sarapan.",
            kesan: { kasih: 5, komunikasi: 2, kepercayaan: 2, mood_diri: 3, mood_ai: "Gembira", memori: "Baik" },
            reaksi: "Dia bangun. \"Bau apa ni? Abang masak?\""
          },
          {
            teks: "Kejut dia. Jom jalan.",
            kesan: { kasih: -2, komunikasi: 0, kepercayaan: 0, mood_diri: -1, mood_ai: "Neutral" },
            reaksi: "Alah... saya nak tidur lagi."
          },
          {
            teks: "Pergi kerja (OT).",
            kesan: { kasih: -3, komunikasi: -2, kepercayaan: -1, mood_diri: -1, mood_ai: "Sejuk", memori: "Buruk" },
            reaksi: "Dia bangun. Rumah sunyi."
          }
        ]
      },
      {
        masa: "tengahari",
        situasi: "Sayang bangun. Bau sarapan. Dia datang ke dapur. Rambut bersepah. Mata masih kuyu.",
        dialog: "{pasangan}: \"Abang masak?! Wangi la. Saya terkejut.\"",
        pilihan: [
          {
            teks: "Jom makan.",
            kesan: { kasih: 5, komunikasi: 3, kepercayaan: 1, mood_diri: 2, mood_ai: "Gembira", memori: "Baik" },
            reaksi: "Saya sayang abang. Abang penyayang."
          },
          {
            teks: "Dah lama dah.",
            kesan: { kasih: 1, komunikasi: 0, kepercayaan: 0, mood_diri: 0, mood_ai: "Neutral" },
            reaksi: "Sorry. Saya bangun lambat."
          },
          {
            teks: "Awak lambat bangun.",
            kesan: { kasih: -4, komunikasi: -2, kepercayaan: -1, mood_diri: -1, mood_ai: "Sejuk", memori: "Buruk" },
            reaksi: "...sorry."
          }
        ]
      },
      {
        masa: "petang",
        situasi: "Sayang ajak keluar. Dia dah pakai baju cantik.",
        dialog: "{pasangan}: \"Abang, jom jalan-jalan. Bosan duduk rumah. Saya nak keluar dengan abang.\"",
        pilihan: [
          {
            teks: "Jom.",
            kesan: { kasih: 4, komunikasi: 2, kepercayaan: 1, mood_diri: 2, mood_ai: "Gembira", memori: "Baik" },
            reaksi: "Yeay! Saya nak pakai baju baru."
          },
          {
            teks: "Penat la.",
            kesan: { kasih: -3, komunikasi: -2, kepercayaan: 0, mood_diri: 0, mood_ai: "Sejuk" },
            reaksi: "Yela. Saya duduk rumah la."
          },
          {
            teks: "Nak pergi mana?",
            kesan: { kasih: 0, komunikasi: 1, kepercayaan: 0, mood_diri: 0, mood_ai: "Neutral" },
            reaksi: "Mana-mana je. Janji keluar dengan abang."
          }
        ]
      },
      {
        masa: "malam",
        situasi: "Balik. Letih tapi seronok. Sayang sandar bahu awak dalam kereta.",
        dialog: "{pasangan}: \"Abang, hari ni best. Saya suka keluar dengan abang.\"",
        pilihan: [
          {
            teks: "Jom buat selalu.",
            kesan: { kasih: 4, komunikasi: 3, kepercayaan: 1, mood_diri: 2, mood_ai: "Gembira", memori: "Baik" },
            reaksi: "Jom! Saya suka."
          },
          {
            teks: "Jarang dapat cuti.",
            kesan: { kasih: 0, komunikasi: 0, kepercayaan: 0, mood_diri: 0, mood_ai: "Neutral" },
            reaksi: "Yela. Kerja penting."
          },
          {
            teks: "Awak bayar ke?",
            kesan: { kasih: -5, komunikasi: -3, kepercayaan: -2, mood_diri: -1, mood_ai: "Sejuk", memori: "Buruk" },
            reaksi: "...Abang ni. Saya bayar la."
          }
        ]
      }
    ]
  },

  5: {
    tajuk: "Hari Biasa",
    sesi: [
      {
        masa: "pagi",
        situasi: "Sayang bangun lambat. Dia panik. Rambut bersepah.",
        dialog: "{pasangan}: \"Alamak! Lambat! Abang, saya lambat!\"",
        pilihan: [
          {
            teks: "Jom, abang hantar.",
            kesan: { kasih: 4, komunikasi: 2, kepercayaan: 1, mood_diri: 1, mood_ai: "Gembira", memori: "Baik" },
            reaksi: "Terima kasih abang! Abang terbaik."
          },
          {
            teks: "Awak pergi sendiri.",
            kesan: { kasih: -2, komunikasi: -1, kepercayaan: 0, mood_diri: 0, mood_ai: "Neutral" },
            reaksi: "Ok... saya pergi."
          },
          {
            teks: "Abang pun lambat.",
            kesan: { kasih: 0, komunikasi: 0, kepercayaan: 0, mood_diri: 0, mood_ai: "Neutral" },
            reaksi: "Jom la. Kita dua-dua lambat."
          }
        ]
      },
      {
        masa: "tengahari",
        situasi: "Phone berbunyi.",
        dialog: "📱 {pasangan}: \"Abang, tolong beli telur balik nanti. Saya nak masak untuk abang.\"",
        pilihan: [
          {
            teks: "Ok.",
            kesan: { kasih: 2, komunikasi: 2, kepercayaan: 2, mood_diri: 1, mood_ai: "Gembira" },
            reaksi: "Terima kasih! Saya sayang abang."
          },
          {
            teks: "Lupa la.",
            kesan: { kasih: -3, komunikasi: -2, kepercayaan: -2, mood_diri: 0, mood_ai: "Sejuk", memori: "Buruk" },
            reaksi: "...takpe. Saya beli sendiri."
          },
          {
            teks: "Awak beli sendiri.",
            kesan: { kasih: -4, komunikasi: -2, kepercayaan: -1, mood_diri: 0, mood_ai: "Sejuk" },
            reaksi: "Ok."
          }
        ]
      },
      {
        masa: "petang",
        situasi: "Balik. Sayang masak. Dia letak sudu. Cuba rasa.",
        dialog: "{pasangan}: \"Abang, rasa ni cukup garam?\"",
        pilihan: [
          {
            teks: "Sedap.",
            kesan: { kasih: 4, komunikasi: 2, kepercayaan: 1, mood_diri: 2, mood_ai: "Gembira", memori: "Baik" },
            reaksi: "Betul? Saya tambah sikit."
          },
          {
            teks: "Kurang sikit.",
            kesan: { kasih: 1, komunikasi: 2, kepercayaan: 1, mood_diri: 1, mood_ai: "Neutral" },
            reaksi: "Ok. Saya tambah."
          },
          {
            teks: "Masin la.",
            kesan: { kasih: -3, komunikasi: -2, kepercayaan: -1, mood_diri: 0, mood_ai: "Sejuk" },
            reaksi: "...sorry."
          }
        ]
      },
      {
        masa: "malam",
        situasi: "Duduk berdua. TV pasang. Sayang diam. Fikir sesuatu. Muka dia kosong.",
        dialog: "{pasangan} diam. Fikir sesuatu.",
        pilihan: [
          {
            teks: "Ada apa ni?",
            kesan: { kasih: 3, komunikasi: 4, kepercayaan: 2, mood_diri: 1, mood_ai: "Gembira", memori: "Baik" },
            reaksi: "Takde. Saya fikir kerja je."
          },
          {
            teks: "Jom tidur.",
            kesan: { kasih: -2, komunikasi: -2, kepercayaan: 0, mood_diri: 1, mood_ai: "Neutral" },
            reaksi: "...ok."
          },
          {
            teks: "Diam juga.",
            kesan: { kasih: -4, komunikasi: -4, kepercayaan: -1, mood_diri: -1, mood_ai: "Sejuk", memori: "Buruk" },
            reaksi: "Dua-dua diam. TV je bunyi."
          }
        ]
      }
    ]
  },

  6: {
    tajuk: "Mini Event",
    sesi: [
      {
        masa: "pagi",
        situasi: "Sayang bangun awal. Ada sesuatu. Dia duduk atas katil. Pandang awak.",
        dialog: "{pasangan}: \"Abang, semalam saya mimpi pelik. Saya mimpi kita pindah rumah besar. Ada taman. Ada anak.\"",
        pilihan: [
          {
            teks: "Mimpi apa?",
            kesan: { kasih: 3, komunikasi: 4, kepercayaan: 1, mood_diri: 1, mood_ai: "Gembira" },
            reaksi: "Saya mimpi kita pindah rumah besar."
          },
          {
            teks: "Mimpi pun percaya.",
            kesan: { kasih: 0, komunikasi: -1, kepercayaan: 0, mood_diri: 0, mood_ai: "Neutral" },
            reaksi: "Yela. Saya merepek je."
          },
          {
            teks: "Jom sarapan.",
            kesan: { kasih: 1, komunikasi: 1, kepercayaan: 1, mood_diri: 1, mood_ai: "Neutral" },
            reaksi: "Jom. Saya lapar."
          }
        ]
      },
      {
        masa: "tengahari",
        situasi: "Mesej masuk.",
        dialog: "📱 {pasangan}: \"Abang, nanti balik beli ayam ye. Saya nak masak kari untuk abang.\"",
        pilihan: [
          {
            teks: "Ok sayang.",
            kesan: { kasih: 2, komunikasi: 2, kepercayaan: 2, mood_diri: 1, mood_ai: "Gembira" },
            reaksi: "Terima kasih! Saya sayang abang."
          },
          {
            teks: "Beli apa?",
            kesan: { kasih: 1, komunikasi: 1, kepercayaan: 0, mood_diri: 0, mood_ai: "Neutral" },
            reaksi: "Ayam la. Nak masak kari."
          },
          {
            teks: "Awak beli je la.",
            kesan: { kasih: -3, komunikasi: -2, kepercayaan: -1, mood_diri: 0, mood_ai: "Sejuk" },
            reaksi: "...ok."
          }
        ]
      },
      {
        masa: "petang",
        situasi: "Balik. Ada ayam. Sayang tersenyum lebar.",
        dialog: "{pasangan}: \"Abang beli!\"",
        pilihan: [
          {
            teks: "Tengok. Abang ingat.",
            kesan: { kasih: 4, komunikasi: 3, kepercayaan: 2, mood_diri: 1, mood_ai: "Gembira", memori: "Baik" },
            reaksi: "Abang terbaik!"
          },
          {
            teks: "Mahal tak?",
            kesan: { kasih: 1, komunikasi: 1, kepercayaan: 0, mood_diri: 0, mood_ai: "Neutral" },
            reaksi: "Ok la. Jom masak."
          },
          {
            teks: "Salah ayam la.",
            kesan: { kasih: -3, komunikasi: -2, kepercayaan: -1, mood_diri: 0, mood_ai: "Sejuk" },
            reaksi: "...takpe. Guna je."
          }
        ]
      },
      {
        masa: "malam",
        situasi: "Sayang tersenyum. Mata berkilat.",
        dialog: "{pasangan}: \"Abang, terima kasih ye. Sebab beli ayam. Saya tahu abang penat.\"",
        pilihan: [
          {
            teks: "Sama-sama.",
            kesan: { kasih: 3, komunikasi: 2, kepercayaan: 1, mood_diri: 2, mood_ai: "Gembira" },
            reaksi: "Jom makan."
          },
          {
            teks: "Awak masak sedap.",
            kesan: { kasih: 5, komunikasi: 3, kepercayaan: 2, mood_diri: 2, mood_ai: "Gembira", memori: "Baik" },
            reaksi: "Betul? Saya masak lagi."
          },
          {
            teks: "Alah, biasa je.",
            kesan: { kasih: -1, komunikasi: -1, kepercayaan: 0, mood_diri: 0, mood_ai: "Neutral" },
            reaksi: "...ok."
          }
        ]
      }
    ]
  },

  7: {
    tajuk: "Hujung Minggu + Report",
    sesi: [
      {
        masa: "pagi",
        situasi: "Minggu. Dua-dua cuti. Sayang ajak kemas rumah.",
        dialog: "{pasangan}: \"Abang, jom kemas rumah. Dah seminggu kita kahwin. Rumah pun dah macam rumah.\"",
        pilihan: [
          {
            teks: "Jom.",
            kesan: { kasih: 4, komunikasi: 2, kepercayaan: 1, mood_diri: 2, mood_ai: "Gembira", memori: "Baik" },
            reaksi: "Jom! Saya sapu, abang mop."
          },
          {
            teks: "Nanti la.",
            kesan: { kasih: -2, komunikasi: -1, kepercayaan: 0, mood_diri: 0, mood_ai: "Neutral" },
            reaksi: "Yela. Saya kemas sendiri."
          },
          {
            teks: "Awak kemas. Abang tengok.",
            kesan: { kasih: -4, komunikasi: -2, kepercayaan: -2, mood_diri: -1, mood_ai: "Sejuk", memori: "Buruk" },
            reaksi: "Dia diam. Sambung kemas."
          }
        ]
      },
      {
        masa: "tengahari",
        situasi: "Kemas siap. Penat. Duduk tepi. Sayang sandar bahu awak.",
        dialog: "{pasangan}: \"Abang, kita dah seminggu kahwin. Macam tak sangka. Saya harap kita terus macam ni.\"",
        pilihan: [
          {
            teks: "Cepat eh masa.",
            kesan: { kasih: 3, komunikasi: 2, kepercayaan: 1, mood_diri: 2, mood_ai: "Gembira" },
            reaksi: "Ye. Rasa macam baru semalam."
          },
          {
            teks: "Rasa lama.",
            kesan: { kasih: -2, komunikasi: -1, kepercayaan: 0, mood_diri: 0, mood_ai: "Neutral" },
            reaksi: "...yela."
          },
          {
            teks: "Jom sambut.",
            kesan: { kasih: 4, komunikasi: 2, kepercayaan: 1, mood_diri: 2, mood_ai: "Gembira", memori: "Baik" },
            reaksi: "Jom! Saya nak masak special."
          }
        ]
      },
      {
        masa: "petang",
        situasi: "Sayang tunjuk phone. Muka dia ceria.",
        dialog: "{pasangan}: \"Abang, member ajak keluar malam ni. Abang nak pergi tak? Kalau abang tak nak, saya tak pergi.\"",
        pilihan: [
          {
            teks: "Jom, kita pergi.",
            kesan: { kasih: 4, komunikasi: 3, kepercayaan: 2, mood_diri: 2, mood_ai: "Gembira", memori: "Baik" },
            reaksi: "Yeay! Jom!"
          },
          {
            teks: "Awak pergi je la.",
            kesan: { kasih: -4, komunikasi: -2, kepercayaan: -1, mood_diri: 0, mood_ai: "Sejuk", memori: "Buruk" },
            reaksi: "...ok. Saya pergi sendiri."
          },
          {
            teks: "Kawan lelaki ke perempuan?",
            kesan: { kasih: -5, komunikasi: -3, kepercayaan: -3, mood_diri: -1, mood_ai: "Marah", memori: "Buruk" },
            reaksi: "Abang ni... kawan je pun."
          }
        ]
      },
      {
        masa: "malam",
        situasi: "Balik. Duduk atas katil. Lampu kuning. Selimut tebal. Rumah sewa sunyi. Hanya bunyi kipas. Sayang sandar kat bahu awak. Tangan dia cari tangan awak. Genggam. Jari dia kecil. Sejuk. Dia diam lama. Pandang siling. Kemudian pusing. Pandang awak. Mata dia berkaca. Ada air.",
        dialog: "{pasangan}: \"Abang... Seminggu ni... saya rasa macam mimpi. Saya tak sangka kita boleh sampai sini. Abang gembira tak? Jujur ye, abang. Saya tak nak abang pura-pura. Saya takut... abang menyesal.\"",
        pilihan: [
          {
            teks: "Seronok sayang. Abang tak menyesal.",
            kesan: { kasih: 6, komunikasi: 4, kepercayaan: 3, mood_diri: 3, mood_ai: "Gembira", memori: "Baik" },
            reaksi: "(peluk awak) Abang... saya sayang abang. Terima kasih."
          },
          {
            teks: "Biasa je.",
            kesan: { kasih: -3, komunikasi: -3, kepercayaan: -1, mood_diri: 0, mood_ai: "Sejuk", memori: "Buruk" },
            reaksi: "Dia diam. Lepas tangan. Pusing ke dinding. \"...oh. Ok.\""
          },
          {
            teks: "Penat. Tapi usaha.",
            kesan: { kasih: 3, komunikasi: 2, kepercayaan: 1, mood_diri: 1, mood_ai: "Neutral" },
            reaksi: "Saya faham. Jom kita usaha sama-sama. Saya tak nak lepas abang."
          },
          {
            teks: "Awak macam mana?",
            kesan: { kasih: 7, komunikasi: 5, kepercayaan: 3, mood_diri: 3, mood_ai: "Gembira", memori: "Baik" },
            reaksi: "(air mata jatuh) Saya... gembira. Sangat. Sebab ada abang. Abang jangan pergi ye."
          }
        ]
      }
    ]
  },

  8: {
    tajuk: "Bulan Baru",
    sesi: [
      {
        masa: "pagi",
        situasi: "Isnin pagi. Hujan renyai. Sayang bangun awal. Dia duduk tepi tingkap. Pandang luar.",
        dialog: "{pasangan}: \"Abang... hujan la. Saya malas nak keluar. Tapi kena kerja. Abang hantar saya ye?\"",
        pilihan: [
          {
            teks: "Jom, abang hantar.",
            kesan: { kasih: 4, komunikasi: 3, kepercayaan: 1, mood_diri: 1, mood_ai: "Gembira", memori: "Baik" },
            reaksi: "Terima kasih abang. Abang terbaik."
          },
          {
            teks: "Ambil payung. Hati-hati.",
            kesan: { kasih: 2, komunikasi: 1, kepercayaan: 1, mood_diri: 1, mood_ai: "Neutral" },
            reaksi: "Ok. Saya gerak dulu."
          },
          {
            teks: "Awak pergi sendiri la.",
            kesan: { kasih: -3, komunikasi: -1, kepercayaan: -1, mood_diri: 0, mood_ai: "Sejuk" },
            reaksi: "...ok. Saya pergi."
          }
        ]
      },
      {
        masa: "tengahari",
        situasi: "Kerja. Hujan masih turun. Phone berbunyi.",
        dialog: "📱 {pasangan}: \"Abang, saya sejuk. Hujan ni. Abang sihat tak?\"",
        pilihan: [
          {
            teks: "Sihat. Awak jaga diri.",
            kesan: { kasih: 3, komunikasi: 2, kepercayaan: 1, mood_diri: 1, mood_ai: "Gembira" },
            reaksi: "Ok. Abang pun jaga diri ye."
          },
          {
            teks: "Abang pun sejuk. Balik nanti kita minum sup.",
            kesan: { kasih: 4, komunikasi: 3, kepercayaan: 2, mood_diri: 2, mood_ai: "Gembira", memori: "Baik" },
            reaksi: "Jom! Saya masak sup."
          },
          {
            teks: "Sibuk. Nanti.",
            kesan: { kasih: -1, komunikasi: -1, kepercayaan: 0, mood_diri: 0, mood_ai: "Neutral" },
            reaksi: "...ok."
          }
        ]
      },
      {
        masa: "petang",
        situasi: "Balik rumah. Hujan dah berhenti. Sayang kat dapur. Dia masak sup.",
        dialog: "{pasangan}: \"Abang! Dah balik. Saya masak sup. Abang minum dulu. Panas ni.\"",
        pilihan: [
          {
            teks: "Terima kasih sayang. Wangi.",
            kesan: { kasih: 4, komunikasi: 2, kepercayaan: 1, mood_diri: 2, mood_ai: "Gembira", memori: "Baik" },
            reaksi: "Jom minum. Saya buat air panas sekali."
          },
          {
            teks: "Abang penat. Jap kejap.",
            kesan: { kasih: -1, komunikasi: 0, kepercayaan: 0, mood_diri: 0, mood_ai: "Neutral" },
            reaksi: "Ok. Saya panaskan balik."
          },
          {
            teks: "Awak sihat tak?",
            kesan: { kasih: 3, komunikasi: 2, kepercayaan: 1, mood_diri: 1, mood_ai: "Gembira" },
            reaksi: "Sihat. Cuma sejuk sikit."
          }
        ]
      },
      {
        masa: "malam",
        situasi: "Duduk atas sofa. Selimut tebal. Sayang sandar bahu awak. Hujan mula turun balik.",
        dialog: "{pasangan}: \"Abang, hujan ni... saya rasa tenang. Sebab ada abang.\"",
        pilihan: [
          {
            teks: "Sama. Abang rasa tenang.",
            kesan: { kasih: 4, komunikasi: 3, kepercayaan: 2, mood_diri: 2, mood_ai: "Gembira", memori: "Baik" },
            reaksi: "(senyum) Jom duduk macam ni. Sampai tidur."
          },
          {
            teks: "Jom tidur awal.",
            kesan: { kasih: -1, komunikasi: 0, kepercayaan: 0, mood_diri: 1, mood_ai: "Neutral" },
            reaksi: "Ok. Jom."
          },
          {
            teks: "Abang nak buat kerja sikit.",
            kesan: { kasih: -3, komunikasi: -2, kepercayaan: 0, mood_diri: 0, mood_ai: "Sejuk" },
            reaksi: "Oh... ok. Saya tidur dulu."
          }
        ]
      }
    ]
  },

  9: {
    tajuk: "Bil Pertama",
    sesi: [
      {
        masa: "pagi",
        situasi: "Pagi. Sayang pegang surat. Muka dia risau.",
        dialog: "{pasangan}: \"Abang... surat ni. Bil api. RM 180. Cukup ke duit kita?\"",
        pilihan: [
          {
            teks: "Cukup. Abang dah kira.",
            kesan: { kasih: 3, komunikasi: 2, kepercayaan: 3, mood_diri: 1, mood_ai: "Gembira", memori: "Baik" },
            reaksi: "Terima kasih abang. Abang memang teliti."
          },
          {
            teks: "Jom semak kewangan sama-sama.",
            kesan: { kasih: 4, komunikasi: 4, kepercayaan: 3, mood_diri: 1, mood_ai: "Gembira", memori: "Baik" },
            reaksi: "Jom! Saya nak belajar."
          },
          {
            teks: "Alah, RM 180 je pun.",
            kesan: { kasih: -3, komunikasi: -2, kepercayaan: -1, mood_diri: 0, mood_ai: "Sejuk" },
            reaksi: "Dia diam. Muka berubah."
          }
        ]
      },
      {
        masa: "tengahari",
        situasi: "Kerja. Phone berbunyi.",
        dialog: "📱 {pasangan}: \"Abang, saya risau pasal duit. Abang fikir cukup ke sampai hujung bulan?\"",
        pilihan: [
          {
            teks: "Insya-Allah cukup. Abang jaga.",
            kesan: { kasih: 4, komunikasi: 3, kepercayaan: 3, mood_diri: 2, mood_ai: "Gembira", memori: "Baik" },
            reaksi: "Terima kasih abang. Saya rasa tenang."
          },
          {
            teks: "Jom kita berjimat.",
            kesan: { kasih: 3, komunikasi: 3, kepercayaan: 2, mood_diri: 1, mood_ai: "Gembira" },
            reaksi: "Jom! Saya tolong."
          },
          {
            teks: "Awak jangan risau. Abang uruskan.",
            kesan: { kasih: 3, komunikasi: 1, kepercayaan: 2, mood_diri: 1, mood_ai: "Neutral" },
            reaksi: "Ok. Saya percaya abang."
          }
        ]
      },
      {
        masa: "petang",
        situasi: "Balik. Sayang duduk atas sofa. Ada kertas atas meja.",
        dialog: "{pasangan}: \"Abang, saya dah list perbelanjaan bulan ni. Abang tengok kejap.\"",
        pilihan: [
          {
            teks: "Jom, abang tengok.",
            kesan: { kasih: 4, komunikasi: 3, kepercayaan: 3, mood_diri: 1, mood_ai: "Gembira", memori: "Baik" },
            reaksi: "Terima kasih abang. Saya nak belajar urus duit."
          },
          {
            teks: "Nanti la. Abang penat.",
            kesan: { kasih: -2, komunikasi: -2, kepercayaan: -1, mood_diri: 0, mood_ai: "Sejuk" },
            reaksi: "...ok."
          },
          {
            teks: "Awak uruskan la. Abang tak faham.",
            kesan: { kasih: -3, komunikasi: -3, kepercayaan: -2, mood_diri: -1, mood_ai: "Sejuk" },
            reaksi: "Dia diam. Simpan kertas."
          }
        ]
      },
      {
        masa: "malam",
        situasi: "Duduk atas katil. Sayang pandang awak. Muka dia serius.",
        dialog: "{pasangan}: \"Abang... kita kena plan kewangan. Saya tak nak kita susah. Abang fikir macam mana?\"",
        pilihan: [
          {
            teks: "Jom buat simpanan bersama.",
            kesan: { kasih: 5, komunikasi: 4, kepercayaan: 4, mood_diri: 3, mood_ai: "Gembira", memori: "Baik" },
            reaksi: "(senyum) Jom! Saya suka abang fikir masa depan."
          },
          {
            teks: "Abang akan cari side income.",
            kesan: { kasih: 4, komunikasi: 3, kepercayaan: 3, mood_diri: 2, mood_ai: "Gembira" },
            reaksi: "Bagus! Saya tolong abang."
          },
          {
            teks: "Kita baru kahwin. Relaks la.",
            kesan: { kasih: -3, komunikasi: -2, kepercayaan: -2, mood_diri: -1, mood_ai: "Sejuk", memori: "Buruk" },
            reaksi: "Dia diam. Pusing ke dinding."
          }
        ]
      }
    ]
  },

  10: {
    tajuk: "Kawan AI",
    sesi: [
      {
        masa: "pagi",
        situasi: "Sabtu. Sayang duduk atas sofa. Pandang phone. Senyum-senyum.",
        dialog: "{pasangan}: \"Abang, kawan saya ajak keluar. Dia rindu saya. Abang bagi tak?\"",
        pilihan: [
          {
            teks: "Bagi. Jom kita pergi sama-sama.",
            kesan: { kasih: 5, komunikasi: 3, kepercayaan: 3, mood_diri: 2, mood_ai: "Gembira", memori: "Baik" },
            reaksi: "Yeay! Abang terbaik. Jom!"
          },
          {
            teks: "Pergi la. Abang tak kisah.",
            kesan: { kasih: 1, komunikasi: 0, kepercayaan: 1, mood_diri: 0, mood_ai: "Neutral" },
            reaksi: "Ok. Saya pergi kejap."
          },
          {
            teks: "Kawan lelaki ke perempuan?",
            kesan: { kasih: -4, komunikasi: -3, kepercayaan: -3, mood_diri: -1, mood_ai: "Sejuk", memori: "Buruk" },
            reaksi: "Dia diam. Muka berubah. \"...kawan je pun.\""
          }
        ]
      },
      {
        masa: "tengahari",
        situasi: "Mall. Sayang jumpa kawan dia. Awak duduk tepi. Tengok.",
        dialog: "{pasangan}: \"Abang, ni kawan saya. Dia yang saya cerita tu.\"",
        pilihan: [
          {
            teks: "Hai. Jaga {pasangan} ye.",
            kesan: { kasih: 4, komunikasi: 3, kepercayaan: 3, mood_diri: 2, mood_ai: "Gembira", memori: "Baik" },
            reaksi: "Kawan dia: \"Wah, abang awak sporting!\""
          },
          {
            teks: "Ok. Abang duduk sini.",
            kesan: { kasih: 1, komunikasi: 1, kepercayaan: 1, mood_diri: 0, mood_ai: "Neutral" },
            reaksi: "Ok. Kami borak kejap."
          },
          {
            teks: "Diam. Muka masam.",
            kesan: { kasih: -4, komunikasi: -3, kepercayaan: -2, mood_diri: -1, mood_ai: "Sejuk", memori: "Buruk" },
            reaksi: "{pasangan}: \"Abang... kenapa?\""
          }
        ]
      },
      {
        masa: "petang",
        situasi: "Balik. Sayang penat. Tapi seronok.",
        dialog: "{pasangan}: \"Abang, terima kasih ye. Sebab bagi saya keluar. Abang memahami.\"",
        pilihan: [
          {
            teks: "Sama-sama. Abang percaya awak.",
            kesan: { kasih: 5, komunikasi: 3, kepercayaan: 4, mood_diri: 2, mood_ai: "Gembira", memori: "Baik" },
            reaksi: "(peluk) Abang... saya sayang abang."
          },
          {
            teks: "Jom rehat.",
            kesan: { kasih: 1, komunikasi: 0, kepercayaan: 0, mood_diri: 1, mood_ai: "Neutral" },
            reaksi: "Jom."
          },
          {
            teks: "Kawan awak tu... banyak cakap.",
            kesan: { kasih: -3, komunikasi: -2, kepercayaan: -2, mood_diri: 0, mood_ai: "Sejuk", memori: "Buruk" },
            reaksi: "Dia diam. Muka berubah."
          }
        ]
      },
      {
        masa: "malam",
        situasi: "Duduk atas katil. Sayang pandang awak. Muka dia serius.",
        dialog: "{pasangan}: \"Abang, abang cemburu ke tadi? Jujur ye.\"",
        pilihan: [
          {
            teks: "Sikit. Sebab abang sayang awak.",
            kesan: { kasih: 5, komunikasi: 4, kepercayaan: 3, mood_diri: 2, mood_ai: "Gembira", memori: "Baik" },
            reaksi: "(senyum) Abang... saya pun sayang abang. Jangan risau."
          },
          {
            teks: "Tak. Abang ok.",
            kesan: { kasih: 2, komunikasi: 1, kepercayaan: 1, mood_diri: 1, mood_ai: "Neutral" },
            reaksi: "Ok. Jom tidur."
          },
          {
            teks: "Abang tak cemburu. Abang percaya.",
            kesan: { kasih: 4, komunikasi: 2, kepercayaan: 4, mood_diri: 2, mood_ai: "Gembira", memori: "Baik" },
            reaksi: "Terima kasih abang. Abang memang matang."
          }
        ]
      }
    ]
  },

  11: {
    tajuk: "Hujung Minggu",
    sesi: [
      {
        masa: "pagi",
        situasi: "Minggu pagi. Sayang bangun awal. Dia duduk tepi tingkap. Pandang luar.",
        dialog: "{pasangan}: \"Abang... jom buat sesuatu hari ni. Saya bosan duduk rumah. Kita pergi mana-mana.\"",
        pilihan: [
          {
            teks: "Jom. Abang bawa awak jalan.",
            kesan: { kasih: 5, komunikasi: 3, kepercayaan: 2, mood_diri: 3, mood_ai: "Gembira", memori: "Baik" },
            reaksi: "Yeay! Saya nak siap cantik."
          },
          {
            teks: "Jom, tapi dekat-dekat je.",
            kesan: { kasih: 3, komunikasi: 2, kepercayaan: 1, mood_diri: 2, mood_ai: "Gembira" },
            reaksi: "Ok. Janji keluar."
          },
          {
            teks: "Penat la. Duduk rumah je.",
            kesan: { kasih: -3, komunikasi: -2, kepercayaan: -1, mood_diri: -1, mood_ai: "Sejuk" },
            reaksi: "...ok."
          }
        ]
      },
      {
        masa: "tengahari",
        situasi: "Taman. Sayang pegang tangan awak. Dia senyum lebar.",
        dialog: "{pasangan}: \"Abang, cantiknya tempat ni. Saya suka. Terima kasih bawa saya.\"",
        pilihan: [
          {
            teks: "Sama. Abang suka tengok awak senyum.",
            kesan: { kasih: 5, komunikasi: 3, kepercayaan: 2, mood_diri: 3, mood_ai: "Gembira", memori: "Baik" },
            reaksi: "(malu) Abang ni... buat saya cair."
          },
          {
            teks: "Jom ambik gambar.",
            kesan: { kasih: 4, komunikasi: 3, kepercayaan: 1, mood_diri: 2, mood_ai: "Gembira", memori: "Baik" },
            reaksi: "Jom! Saya nak upload."
          },
          {
            teks: "Ok. Jom balik.",
            kesan: { kasih: -2, komunikasi: -1, kepercayaan: 0, mood_diri: -1, mood_ai: "Neutral" },
            reaksi: "...baru sampai."
          }
        ]
      },
      {
        masa: "petang",
        situasi: "Cafe. Sayang pesan air. Dia pandang awak.",
        dialog: "{pasangan}: \"Abang, saya nak tanya. Abang tak pernah cerita pasal family abang.\"",
        pilihan: [
          {
            teks: "Nanti abang cerita. Panjang.",
            kesan: { kasih: 4, komunikasi: 4, kepercayaan: 3, mood_diri: 2, mood_ai: "Gembira", memori: "Baik" },
            reaksi: "Ok. Saya nak dengar. Saya nak kenal abang lagi."
          },
          {
            teks: "Kenapa nak tahu?",
            kesan: { kasih: -1, komunikasi: -2, kepercayaan: -1, mood_diri: 0, mood_ai: "Neutral" },
            reaksi: "Saja. Saya nak tahu je."
          },
          {
            teks: "Lain kali la.",
            kesan: { kasih: -2, komunikasi: -2, kepercayaan: -1, mood_diri: 0, mood_ai: "Sejuk" },
            reaksi: "Ok."
          }
        ]
      },
      {
        masa: "malam",
        situasi: "Balik. Sayang letak kepala atas bahu awak.",
        dialog: "{pasangan}: \"Abang... hari ni best. Saya rasa kita makin rapat.\"",
        pilihan: [
          {
            teks: "Sama. Abang rasa kita makin rapat.",
            kesan: { kasih: 5, komunikasi: 3, kepercayaan: 3, mood_diri: 3, mood_ai: "Gembira", memori: "Baik" },
            reaksi: "(senyum) Jom kita terus macam ni."
          },
          {
            teks: "Jom tidur. Penat.",
            kesan: { kasih: -1, komunikasi: 0, kepercayaan: 0, mood_diri: 1, mood_ai: "Neutral" },
            reaksi: "Ok. Jom."
          },
          {
            teks: "Abang nak borak lagi.",
            kesan: { kasih: 4, komunikasi: 4, kepercayaan: 2, mood_diri: 2, mood_ai: "Gembira", memori: "Baik" },
            reaksi: "Jom! Saya pun nak borak."
          }
        ]
      }
    ]
  },

  12: {
    tajuk: "Konflik Pertama",
    sesi: [
      {
        masa: "pagi",
        situasi: "Pagi. Sayang diam. Muka dia masam. Dia tak cakap apa-apa.",
        dialog: "{pasangan} diam. Tak cakap apa-apa.",
        pilihan: [
          {
            teks: "Ada apa ni? Jom cakap.",
            kesan: { kasih: 4, komunikasi: 4, kepercayaan: 2, mood_diri: 1, mood_ai: "Neutral", memori: "Baik" },
            reaksi: "Dia diam. Kemudian cakap. \"Abang... semalam abang tak dengar saya.\""
          },
          {
            teks: "Penat ke? Rehat la.",
            kesan: { kasih: -1, komunikasi: -1, kepercayaan: 0, mood_diri: 0, mood_ai: "Sejuk" },
            reaksi: "Dia diam lagi."
          },
          {
            teks: "Diam je.",
            kesan: { kasih: -4, komunikasi: -4, kepercayaan: -1, mood_diri: -1, mood_ai: "Sejuk", memori: "Buruk" },
            reaksi: "Dia bangun. Pergi bilik air."
          }
        ]
      },
      {
        masa: "tengahari",
        situasi: "Kerja. Phone berbunyi. Mesej dari Sayang.",
        dialog: "📱 {pasangan}: \"Abang, saya nak cakap sesuatu. Tapi abang kena dengar. Jujur.\"",
        pilihan: [
          {
            teks: "Ok. Abang dengar.",
            kesan: { kasih: 4, komunikasi: 4, kepercayaan: 3, mood_diri: 2, mood_ai: "Gembira", memori: "Baik" },
            reaksi: "Terima kasih abang. Nanti kita borak."
          },
          {
            teks: "Sibuk. Nanti.",
            kesan: { kasih: -3, komunikasi: -3, kepercayaan: -1, mood_diri: 0, mood_ai: "Sejuk", memori: "Buruk" },
            reaksi: "...ok."
          },
          {
            teks: "Cakap sekarang.",
            kesan: { kasih: 2, komunikasi: 2, kepercayaan: 1, mood_diri: 0, mood_ai: "Neutral" },
            reaksi: "Ok. Saya taip."
          }
        ]
      },
      {
        masa: "petang",
        situasi: "Balik. Sayang duduk atas sofa. Muka serius.",
        dialog: "{pasangan}: \"Abang, saya nak cakap. Semalam abang tak dengar saya. Saya cakap pasal kerja. Abang main phone.\"",
        pilihan: [
          {
            teks: "Sorry sayang. Abang tak perasan.",
            kesan: { kasih: 5, komunikasi: 4, kepercayaan: 3, mood_diri: 2, mood_ai: "Gembira", memori: "Baik" },
            reaksi: "(lega) Terima kasih abang. Saya nak abang dengar."
          },
          {
            teks: "Abang penat la. Sorry.",
            kesan: { kasih: 2, komunikasi: 1, kepercayaan: 1, mood_diri: 1, mood_ai: "Neutral" },
            reaksi: "Saya faham. Tapi lain kali dengar ye."
          },
          {
            teks: "Alah, kecil je pun.",
            kesan: { kasih: -4, komunikasi: -3, kepercayaan: -2, mood_diri: -1, mood_ai: "Sejuk", memori: "Buruk" },
            reaksi: "Dia diam. Mata berkaca."
          }
        ]
      },
      {
        masa: "malam",
        situasi: "Duduk atas katil. Sayang diam. Pandang dinding.",
        dialog: "{pasangan}: \"Abang... saya tak nak kita gaduh. Saya sayang abang. Tapi saya nak abang dengar saya.\"",
        pilihan: [
          {
            teks: "Abang janji. Abang dengar.",
            kesan: { kasih: 6, komunikasi: 5, kepercayaan: 4, mood_diri: 3, mood_ai: "Gembira", memori: "Baik" },
            reaksi: "(peluk awak) Terima kasih abang. Saya sayang abang."
          },
          {
            teks: "Ok. Abang cuba.",
            kesan: { kasih: 3, komunikasi: 2, kepercayaan: 2, mood_diri: 1, mood_ai: "Neutral" },
            reaksi: "Ok. Saya percaya abang."
          },
          {
            teks: "Awak ni sensitif la.",
            kesan: { kasih: -5, komunikasi: -4, kepercayaan: -3, mood_diri: -2, mood_ai: "Marah", memori: "Buruk" },
            reaksi: "Dia diam. Pusing ke dinding. Menangis."
          }
        ]
      }
    ]
  },

  13: {
    tajuk: "Baiki Hubungan",
    sesi: [
      {
        masa: "pagi",
        situasi: "Pagi. Sayang masih sejuk. Tapi muka dia lembut.",
        dialog: "{pasangan}: \"Abang, semalam saya fikir. Saya tak nak gaduh lama.\"",
        pilihan: [
          {
            teks: "Sama. Abang pun tak nak.",
            kesan: { kasih: 5, komunikasi: 4, kepercayaan: 3, mood_diri: 2, mood_ai: "Gembira", memori: "Baik" },
            reaksi: "(senyum) Jom kita baiki. Sama-sama."
          },
          {
            teks: "Ok. Abang minta maaf.",
            kesan: { kasih: 4, komunikasi: 3, kepercayaan: 3, mood_diri: 2, mood_ai: "Gembira", memori: "Baik" },
            reaksi: "Terima kasih abang. Saya pun minta maaf."
          },
          {
            teks: "Elok la tu.",
            kesan: { kasih: -1, komunikasi: -1, kepercayaan: 0, mood_diri: 0, mood_ai: "Neutral" },
            reaksi: "Dia diam."
          }
        ]
      },
      {
        masa: "tengahari",
        situasi: "Kerja. Awak hantar mesej dulu.",
        dialog: "📱 Awak: \"Sayang, abang nak tanya. Awak nak makan apa malam ni? Abang beli.\"",
        pilihan: [
          {
            teks: "Abang beli apa-apa. Abang suka.",
            kesan: { kasih: 4, komunikasi: 3, kepercayaan: 2, mood_diri: 2, mood_ai: "Gembira", memori: "Baik" },
            reaksi: "Ok. Abang beli kegemaran awak."
          },
          {
            teks: "Ayam. Kalau boleh.",
            kesan: { kasih: 3, komunikasi: 2, kepercayaan: 1, mood_diri: 1, mood_ai: "Gembira" },
            reaksi: "Ok. Abang beli."
          },
          {
            teks: "Tak tau. Abang decide.",
            kesan: { kasih: 2, komunikasi: 1, kepercayaan: 1, mood_diri: 1, mood_ai: "Neutral" },
            reaksi: "Ok."
          }
        ]
      },
      {
        masa: "petang",
        situasi: "Balik. Sayang kat dapur. Dia masak. Awak letak beg. Datang kat dia.",
        dialog: "{pasangan}: \"Abang... saya masak special. Sebab saya nak kita baik semula.\"",
        pilihan: [
          {
            teks: "Terima kasih sayang. Abang hargai.",
            kesan: { kasih: 5, komunikasi: 3, kepercayaan: 3, mood_diri: 3, mood_ai: "Gembira", memori: "Baik" },
            reaksi: "(senyum) Jom makan. Sama-sama."
          },
          {
            teks: "Abang tolong sikit.",
            kesan: { kasih: 4, komunikasi: 3, kepercayaan: 2, mood_diri: 2, mood_ai: "Gembira", memori: "Baik" },
            reaksi: "Jom! Abang hiris bawang."
          },
          {
            teks: "Ok. Abang tunggu.",
            kesan: { kasih: 1, komunikasi: 0, kepercayaan: 0, mood_diri: 0, mood_ai: "Neutral" },
            reaksi: "Ok."
          }
        ]
      },
      {
        masa: "malam",
        situasi: "Duduk atas katil. Sayang sandar bahu awak. Tangan dia cari tangan awak.",
        dialog: "{pasangan}: \"Abang... terima kasih ye. Sebab abang dengar saya. Saya rasa lega.\"",
        pilihan: [
          {
            teks: "Sama. Abang nak kita ok.",
            kesan: { kasih: 5, komunikasi: 4, kepercayaan: 4, mood_diri: 3, mood_ai: "Gembira", memori: "Baik" },
            reaksi: "(peluk) Abang... saya sayang abang. Jangan lepas saya."
          },
          {
            teks: "Abang janji. Abang dengar selalu.",
            kesan: { kasih: 6, komunikasi: 5, kepercayaan: 4, mood_diri: 3, mood_ai: "Gembira", memori: "Baik" },
            reaksi: "(mata berkaca) Terima kasih abang. Saya percaya abang."
          },
          {
            teks: "Jom tidur.",
            kesan: { kasih: 0, komunikasi: 0, kepercayaan: 0, mood_diri: 1, mood_ai: "Neutral" },
            reaksi: "Ok. Jom."
          }
        ]
      }
    ]
  },

  14: {
    tajuk: "Report Minggu 2",
    sesi: [
      {
        masa: "pagi",
        situasi: "Minggu pagi. Sayang bangun awal. Dia buat sarapan. Muka dia ceria.",
        dialog: "{pasangan}: \"Abang, bangun. Saya buat sarapan special. Dua minggu kita kahwin!\"",
        pilihan: [
          {
            teks: "Terima kasih sayang. Abang sayang awak.",
            kesan: { kasih: 5, komunikasi: 3, kepercayaan: 3, mood_diri: 3, mood_ai: "Gembira", memori: "Baik" },
            reaksi: "(senyum lebar) Saya pun. Jom makan."
          },
          {
            teks: "Wah, special ye.",
            kesan: { kasih: 4, komunikasi: 2, kepercayaan: 1, mood_diri: 2, mood_ai: "Gembira" },
            reaksi: "Ye! Sebab abang."
          },
          {
            teks: "Jom makan.",
            kesan: { kasih: 2, komunikasi: 1, kepercayaan: 1, mood_diri: 1, mood_ai: "Neutral" },
            reaksi: "Jom."
          }
        ]
      },
      {
        masa: "tengahari",
        situasi: "Duduk atas sofa. Sayang letak kepala atas bahu awak.",
        dialog: "{pasangan}: \"Abang, dua minggu ni macam mana? Abang gembira tak?\"",
        pilihan: [
          {
            teks: "Gembira. Walaupun ada naik turun.",
            kesan: { kasih: 5, komunikasi: 4, kepercayaan: 3, mood_diri: 3, mood_ai: "Gembira", memori: "Baik" },
            reaksi: "Sama. Tapi kita usaha. Jom teruskan."
          },
          {
            teks: "Gembira. Abang sayang awak.",
            kesan: { kasih: 6, komunikasi: 3, kepercayaan: 3, mood_diri: 3, mood_ai: "Gembira", memori: "Baik" },
            reaksi: "(peluk) Saya pun. Jangan lepas saya."
          },
          {
            teks: "Ok la.",
            kesan: { kasih: -2, komunikasi: -2, kepercayaan: 0, mood_diri: 0, mood_ai: "Neutral" },
            reaksi: "...ok."
          }
        ]
      },
      {
        masa: "petang",
        situasi: "Sayang ajak keluar. Dia nak beli sesuatu.",
        dialog: "{pasangan}: \"Abang, jom keluar. Saya nak beli langsir baru. Rumah kita dah macam rumah.\"",
        pilihan: [
          {
            teks: "Jom. Abang belanja.",
            kesan: { kasih: 5, komunikasi: 3, kepercayaan: 2, mood_diri: 3, mood_ai: "Gembira", memori: "Baik" },
            reaksi: "Yeay! Abang terbaik. Jom!"
          },
          {
            teks: "Jom, tapi jimat sikit.",
            kesan: { kasih: 3, komunikasi: 2, kepercayaan: 2, mood_diri: 2, mood_ai: "Gembira" },
            reaksi: "Ok. Saya pilih yang murah."
          },
          {
            teks: "Penat la. Awak pergi sendiri.",
            kesan: { kasih: -3, komunikasi: -2, kepercayaan: -1, mood_diri: 0, mood_ai: "Sejuk" },
            reaksi: "...ok."
          }
        ]
      },
      {
        masa: "malam",
        situasi: "Duduk atas katil. Lampu kuning. Sayang sandar bahu awak. Mata dia berkaca.",
        dialog: "{pasangan}: \"Abang... dua minggu ni banyak benda jadi. Saya belajar banyak. Terima kasih sebab sabar dengan saya.\"",
        pilihan: [
          {
            teks: "Sama. Abang pun belajar.",
            kesan: { kasih: 5, komunikasi: 4, kepercayaan: 4, mood_diri: 3, mood_ai: "Gembira", memori: "Baik" },
            reaksi: "(senyum) Jom kita belajar sama-sama."
          },
          {
            teks: "Abang sayang awak. Selalu.",
            kesan: { kasih: 6, komunikasi: 4, kepercayaan: 4, mood_diri: 3, mood_ai: "Gembira", memori: "Baik" },
            reaksi: "(air mata) Saya pun. Jangan pergi ye, abang."
          },
          {
            teks: "Jom tidur.",
            kesan: { kasih: 0, komunikasi: 0, kepercayaan: 0, mood_diri: 1, mood_ai: "Neutral" },
            reaksi: "Ok. Jom."
          }
        ]
      }
    ]
  },
   // ═══════════════════════════════════════
  // SAMBUNG DI SINI ⬇️
  // ═══════════════════════════════════════
};
