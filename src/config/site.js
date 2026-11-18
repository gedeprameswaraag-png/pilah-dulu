// ============================================================
//  PENGATURAN UTAMA — ubah di sini, tanpa menyentuh komponen.
// ============================================================
export const SITE = {
  name: 'Pilah Dulu',
  tagline: 'Cari nama barangnya, pahami jenisnya, lalu pilah dari rumah.',
  email: 'gedeprameswaraag@gmail.com', // tujuan mailto formulir usulan
  logoImage: '/logo.svg', // isi '/logo.png' (taruh di folder public) untuk mengganti logo SVG bawaan
  mascotName: 'Ambang',

  team: {
    name: 'Mepet',
    members: [
      { name: 'Gede Prameswara A.G', role: 'Frontend' },
      { name: 'Gede Eka Setyawan', role: 'Konten & data' },
      { name: 'Juan Bennett Lius Djara', role: 'Desain & pengujian' }
    ]
  },

  loader: { enabled: true, minMs: 1900, text: 'Menyiapkan kartu pilah…' },

  // Navbar melayang: berapa px scroll sebelum mengecil jadi lingkaran,
  // dan berapa px scroll setelah dibuka manual sebelum mengecil lagi.
  navbar: { collapseAt: 90, reopenHold: 160 },

  // Setel true untuk membuka semua materi (berguna saat demo/juri).
  belajar: { unlockAll: false },
  voiceLang: 'id-ID'
}

export const NAV_LINKS = [
  { to: '/', label: 'Beranda', end: true },
  { to: '/pilah', label: 'Pilah' },
  { to: '/belajar', label: 'Belajar' },
  { to: '/kontak', label: 'Kontak' }
]

// Warna kategori ada di styles/tokens.css (satu sumber).
export const CATEGORIES = {
  organik: { label: 'Organik', desc: 'Berasal dari makhluk hidup dan mudah membusuk, seperti sisa makanan dan daun. Bisa dikompos.' },
  anorganik: { label: 'Anorganik', desc: 'Sulit membusuk, seperti plastik, kertas, kaca, dan logam. Banyak yang bisa didaur ulang bila bersih.' },
  b3: { label: 'B3', desc: 'Bahan berbahaya dan beracun, seperti baterai dan lampu. Perlu disimpan aman dan diserahkan lewat kanal resmi.' },
  residu: { label: 'Residu', desc: 'Sisa yang belum bisa dipilah ke kategori lain atau belum ada jalur daur ulangnya.' }
}

export const RECYCLING = {
  ya: { label: 'Bisa didaur ulang', tone: 'good' },
  terbatas: { label: 'Daur ulang terbatas', tone: 'mid' },
  tidak: { label: 'Belum bisa didaur ulang', tone: 'bad' },
  belum: { label: 'Perlu konfirmasi', tone: 'mid' }
}
