# Pilah Dulu

Platform web edukasi pemilahan sampah rumah tangga. React + Vite, data di file JSON, tanpa backend.

## Menjalankan

```bash
npm install
npm run dev      # pengembangan
npm run build    # hasil di folder dist
npm run preview  # coba hasil build
```

## Struktur

```
src/
  config/site.js          nama, tagline, email, tim, loader, navbar, kunci materi
  data/
    items.json            daftar barang sampah (tambah barang di sini)
    sources.json          sumber rujukan (diacu dari items.json lewat id)
    materials.json        4 bab buku: halaman, narasi maskot, poin, ikon
    quiz.json             kuis cerita
    game.json             barang di game dan posisinya (x, y dalam persen)
    home.json             chip populer, langkah, kartu info beranda
  styles/tokens.css       semua warna, radius, bayangan, font
  components/             Logo, Mascot, Speaker, Loader, Navbar, Footer, Layout, ...
  pages/                  Home, Pilah (Cari + Tentang), ItemDetail
  features/belajar/       Belajar, Book, Quiz, Game
```

## Cara menyesuaikan

| Ingin mengubah | Ubah di |
|---|---|
| Logo | `SITE.logoImage` di `config/site.js` (taruh gambar di `public/`), atau edit `components/Logo.jsx` |
| Durasi loading, matikan loading | `SITE.loader` |
| Kapan navbar mengecil | `SITE.navbar.collapseAt` dan `reopenHold` |
| Buka semua materi (untuk demo) | `SITE.belajar.unlockAll = true` |
| Warna | `styles/tokens.css` |
| Tambah barang | tambah objek di `data/items.json` (ikon harus ada di `utils/icons.jsx`) |
| Tambah bab/halaman buku | `data/materials.json` |
| Tambah soal kuis | `data/quiz.json` (`correct` = indeks opsi yang benar) |
| Tambah sampah di game | `data/game.json`, `id` harus ada di `items.json` |
| Gambar maskot | `components/Mascot.jsx` (mood: happy, think, oops, cheer) |
| Suara maskot | tombol Suara di halaman Belajar (Web Speech API bawaan browser) |

## Yang wajib ditinjau tim sebelum dikumpulkan

- Isi `items.json` adalah draf. Klasifikasi, status daur ulang, dan langkah B3 belum dicek ke sumber resmi.
- `sources.json` hanya berisi judul regulasi. Isi `url` dan `accessed` untuk tiap sumber.
- Barang dengan `"verified": false` otomatis diberi label "Perlu konfirmasi". Ubah ke `true` setelah dicek.
- Ganti nama anggota dan email di `config/site.js`.
- Pastikan font (@fontsource) dan ikon (lucide-react) sesuai ketentuan lomba.

## Catatan teknis

- Router memakai `HashRouter` agar mudah di-host. Untuk URL bersih, ganti ke `BrowserRouter` dan atur fallback ke `index.html` di hosting.
- Progres materi disimpan di `localStorage` (tombol "Ulangi dari awal" untuk reset).
- Game memakai pointer events (mouse dan sentuh). Cadangan tanpa seret: ketuk sampah, lalu ketuk tempatnya.
