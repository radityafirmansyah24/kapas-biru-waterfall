# Website Wisata Air Terjun Kapas Biru
**Projek Edukasi & Presentasi Wisata Alam untuk Bu Ratna**
*Kecamatan Pronojiwo, Kabupaten Lumajang, Jawa Timur*

---

## 📌 Ringkasan Fitur Website

Website ini dibuat khusus dengan tampilan modern, elegan, responsif, dan rapi sesuai seluruh instruksi yang diminta:

1. **Bagian Awal Utama (Hero & Foto Kelompok)**:
   - Header penyambutan eksklusif mengenai pesona Air Terjun Kapas Biru.
   - **Showcase Foto Kelompok**: Dilengkapi bingkai foto tim, badge resmi "Projek Bu Ratna", tombol perbesar foto (lightbox), serta daftar kartu anggota kelompok dan peran masing-masing.
   - Fitur otomatis membaca file foto lokal (`foto-kelompok.jpg` / `foto-kelompok.png`).

2. **Penjelasan Sejarah Kapas Biru**:
   - Asal-usul penamaan "Kapas Biru" (buih air seputih kapas dan rona gradasi biru di dasar tebing).
   - Sejarah penemuan, gotong royong warga Dusun Mulyoharjo, dan pembentukan Pokdarwis (2015-2016).
   - Karakteristik tebing batuan purba vulkanik di lereng Gunung Semeru dan sungai Besuk Bang.

3. **Video Sinematik (Autoplay & Loop)**:
   - Video kualitas tinggi dengan pengaturan `autoplay`, `loop`, `muted`, dan `playsinline`.
   - Tombol pengendali interaktif:
     - **Play / Pause**
     - **Aktifkan / Matikan Suara** (Toggle Audio)
     - **Layar Penuh (Fullscreen)**
     - Indikator status loop otomatis.

4. **Penjelasan Harga Tiket Masuk, Parkir, & Fasilitas**:
   - Kartu harga resmi & transparan:
     - **Tiket Masuk Wisatawan**: Rp 10.000 / orang
     - **Parkir Sepeda Motor**: Rp 5.000 / unit
     - **Parkir Mobil**: Rp 10.000 / unit
   - Rincian 8 fasilitas pendukung (Lahan Parkir, Toilet & Kamar Bilas, Musholla, Warung Kuliner, Jalur Trekking Berpagar, Gazebo, Spot Foto Panorama, dan Pemandu Lokal).
   - Tips penting bagi pengunjung dan jam operasional (07.00 - 15.00 WIB).

5. **Foto Dokumentasi Wisata (Galeri Interaktif)**:
   - Grid dokumentasi foto dengan filter kategori (*Semua*, *Air Terjun*, *Jalur Trekking*, *Panorama Alam*).
   - Fitur **Lightbox Modal**: Ketika foto diklik, gambar akan terbuka dalam ukuran besar dengan resolusi jernih beserta deskripsinya.

6. **Buku Tamu Pengunjung (Guestbook)**:
   - Form input interaktif: Nama, Asal Kota/Instansi, Rating Bintang (1-5), dan Pesan/Kesan.
   - Pesan baru otomatis tersimpan di peramban (`localStorage`) dan ditampilkan secara real-time.
   - Dilengkapi contoh testimoni pengunjung autentik.

7. **Menu yang Rapi & Teratur**:
   - Sticky navbar dengan efek kaca buram (*glassmorphism*).
   - ScrollSpy otomatis menandai menu yang sedang aktif sesuai posisi layar.
   - Menu burger mobile yang responsif di smartphone dan tablet.
   - Tombol *Floating Back to Top* untuk kembali ke atas dengan mulus.

8. **Proteksi Keamanan Informasi (Anti-Ubah Konten)**:
   - Sesuai syarat: *"jangan sampai orang lain dapat mengubah informasi yang ada"*.
   - Seluruh konten profil wisata (sejarah, harga tiket, fasilitas, foto kelompok) bersifat **statis dan terkunci** (read-only di kode sumber), sehingga pengunjung luar atau pihak ketiga tidak dapat meretas, menyunting, atau merusak data resmi yang ditampilkan.
   - Form buku tamu menerapkan **sanitasi anti-XSS ketat** (`sanitizeHTML`) sehingga tidak ada skrip jahat atau kode HTML yang dapat disusupkan oleh pengunjung luar.

---

## 🚀 Cara Menjalankan Website

1. Cukup buka folder:
   `c:\Users\Dell\OneDrive\Dokumen\ProjectBuRatna2`
2. Klik dua kali (double click) file **`index.html`** untuk langsung membukanya di browser apa saja (Google Chrome, Microsoft Edge, Mozilla Firefox, dll).
3. Halaman akan langsung tampil secara sempurna tanpa perlu instalasi aplikasi tambahan!

---

## 📸 Cara Memasang Foto & Video Asli Sendiri

### 1. Memasang Foto Kelompok Asli
Jika Anda memiliki foto asli bersama teman-teman kelompok Anda:
1. Siapkan foto kelompok Anda.
2. Beri nama file tersebut: **`foto-kelompok.jpg`**
3. Simpan file tersebut langsung di dalam folder projek ini (`c:\Users\Dell\OneDrive\Dokumen\ProjectBuRatna2\foto-kelompok.jpg`).
4. Refresh halaman di browser, foto kelompok akan otomatis terganti dengan foto Anda!

### 2. Memasang Video Sinematik Karya Sendiri (Opsional)
Jika kelompok Anda memiliki rekaman video sinematik sendiri:
1. Beri nama file video tersebut: **`video-cinematic.mp4`**
2. Simpan di folder projek (`c:\Users\Dell\OneDrive\Dokumen\ProjectBuRatna2\video-cinematic.mp4`).
3. Website akan secara otomatis memutar video Anda dengan fitur autoplay dan loop. Jika tidak ada file lokal, website otomatis memutar video air terjun berkualitas tinggi secara online.

Untuk mengubah nama-nama anggota kelompok, Anda cukup membuka `index.html` dan mengganti teks `Anggota 1`, `Anggota 2`, dst., pada bagian `Daftar Anggota Kelompok`.

---

## 📂 Struktur Berkas

```text
ProjectBuRatna2/
├── index.html          # Halaman utama web (struktur semantik & konten resmi)
├── css/
│   └── style.css       # Gaya tampilan custom, animasi, dan scrollbar
├── js/
│   └── script.js       # Logika video autoplay/loop, filter galeri, dan buku tamu
├── foto-kelompok.jpg   # (Opsional) Tempat meletakkan foto asli kelompok Anda
└── README.md           # Panduan lengkap dokumentasi projek
```
