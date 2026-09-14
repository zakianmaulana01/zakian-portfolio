# Portfolio Zakian: minimalis dan berorientasi IT

Dua referensi menjadi arah, bukan template: Arita untuk fokus pada pekerjaan IT dan preview aplikasi yang hidup; Faiz untuk disiplin ruang, navigasi singkat, dan tipografi yang nyaman. Komposisi sendiri memakai kanvas putih terbuka, wordmark zakian/dev, satu preview sistem, serta struktur CV di atas galeri. Tidak memakai bingkai besar membulat, sapaan logo, kartu preview bertumpuk, atau aksen biru.

## Konten

Urutan: perkenalan dan CV, ringkasan pekerjaan saat ini, tentang saya, pengalaman, keahlian, pendidikan, karya, kontak. Isi profil sebelumnya tetap terlihat tanpa accordion. Delapan proyek tetap tersedia; lima proyek profesional memiliki tiga gambar, tiga proyek publik memiliki tautan repository.

## Visual

Putih, abu-abu netral, charcoal. Manrope untuk teks dan judul, monospace kecil untuk indeks bagian dan nama teknologi. Judul utama maksimal 47px, judul bagian 26px. Garis tipis, sudut kecil, ruang antarbagian terukur. Screenshot mempertahankan warna aset aslinya.

## Interaksi

Satu preview sistem berganti setiap enam detik. Pemilihan manual menghentikan pergantian otomatis agar pengguna dapat memeriksa gambar. Pergantian berhenti saat tab tidak aktif, preview di luar viewport, pengguna menjeda animasi, atau prefers-reduced-motion aktif. Transisi opacity dan hover ringan; pengguliran native.

## Aset

Gambar tersimpan dalam public/portfolio per nama proyek. Galeri menjelaskan bahwa gambar merupakan rekaan visual berdasarkan referensi, bukan screenshot produksi identik. Tidak menambahkan metrik hasil, testimoni, atau tautan project yang belum terverifikasi.

## GitHub, stack, dan kartu proyek

Contribution calendar menggabungkan HTML kontribusi publik GitHub akun zakianmaulana01 dengan snapshot agregat commit privat yang diverifikasi. Data privat hanya berisi tanggal dan jumlah aktivitas, tanpa nama repository atau kode. Sumber publik direvalidasi server setiap enam jam; jika tidak dapat diambil atau strukturnya berubah, gunakan snapshot publik + privat yang sudah diverifikasi beserta tanggalnya. Angka ini memberi konteks ritme kerja, bukan ukuran kualitas kerja.

Ikon stack berupa SVG Simple Icons lokal dalam public/icons/tech dan Phosphor untuk kategori generik. Hero memakai modul identitas `zakian.ts` untuk menghubungkan profesi programmer dengan fakta profil, tanpa jendela terminal palsu. Avatar kecil berasal dari akun GitHub Zakian dan dipakai sebagai penanda personal, bukan ilustrasi utama. Gerak kursor hanya menggeser modul identitas dan avatar agar interaksi terasa terarah. Semua animasi mematuhi reduced motion serta tombol jeda global.

Kartu project mengikuti pola informasi referensi IT Portfolio Arita: gambar, kategori, nama, deskripsi singkat, teknologi yang diketahui, dan akses detail. Tiga kolom desktop, dua tablet, satu mobile. Palet tetap monokrom; aset sistem mempertahankan warna aslinya.

## Keputusan hero v2

Dial desain: ENERGY 2, RHYTHM 2, MOTION 2. Hijau hutan dipilih sebagai warna kerja dan kode, sedangkan jingga tanah hanya menandai sapaan agar halaman tidak terasa monokrom. Layout dua kolom memisahkan cerita personal dan bukti identitas teknis. Manrope menjaga perkenalan tetap manusiawi; monospace hanya dipakai pada data developer. Sudut kecil mempertahankan kesan sistem, dengan satu sudut besar pada modul kode sebagai ciri visual. Ruang hero dibuat lebar agar nama, peran, dan tindakan utama terbaca sebelum recruiter masuk ke riwayat kerja.

Latar grid pastel dikembalikan atas arahan pemilik portfolio. Garis grid menghubungkan identitas programmer dengan sistem yang dikerjakan, sedangkan bidang biru dan ungu pucat memberi kedalaman tanpa membuat seluruh halaman penuh warna.

## Keputusan hero v3

Video referensi diterjemahkan menjadi hero personal dengan headline dua baris, elemen teknis di tepi, serta navbar yang memadat saat halaman digulir. Biru dipilih atas arahan pemilik dan dipakai pada role, wordmark, CTA, fokus, serta kursor. Kartu statistik dan badge tim dari referensi tidak digunakan karena tidak mewakili profil Zakian. Modul kode hanya berisi fokus kerja yang sudah tercatat, sedangkan avatar berasal dari akun GitHub yang diberikan.

## Keputusan hero v4

Komposisi terpusat dari video ditinggalkan agar portfolio tidak menyerupai referensi. Hero memakai layout editorial asimetris: indeks vertikal, perkenalan di kiri, dan developer map biru di kanan. Developer map menghubungkan alur kerja, logika sistem, serta aplikasi sebagai motif yang berasal dari pekerjaan Zakian. Navbar tidak lagi menjadi kapsul mengambang; angka kecil dan garis aktif memberi ritme seperti indeks portfolio cetak.

## Keputusan hero studio

Design Read: developer portfolio untuk recruiter, dengan bahasa kinetic editorial dan identitas cobalt. Dial: DESIGN_VARIANCE 8, MOTION_INTENSITY 6, VISUAL_DENSITY 3. Avatar AI, developer map berbentuk kartu, indeks vertikal, dan navbar bernomor dihapus. Hero memakai bidang biru struktural dan monogram Z kinetik sebagai identitas yang tetap terbaca tanpa nama brand. Navbar kembali sederhana dengan wordmark tekstual dan satu CTA yang jelas. Desktop memakai komposisi split; mobile menyusun copy, tindakan, visual, dan rail teknologi secara vertikal tanpa posisi absolut pada konten utama.

## Hero 3D dan gerak antarseksi — 14 September 2026

Arah terbaru dari pengguna: halaman lebar, light theme biru, perkenalan personal, tanpa monogram Z, dengan objek 3D interaktif dan animasi bagian lain yang selaras.

- Hero memakai simbol kode tiga dimensi buatan sendiri, material biru dan metal, serta pencahayaan studio. Three.js dimuat terpisah setelah halaman tampil. Drag, tombol putar, reset, dan jeda dapat digunakan; mode pengurangan gerak dan pengaturan footer tetap dihormati. Render berhenti ketika tab tersembunyi atau adegan di luar layar. Fallback tipografi tersedia tanpa WebGL.
- Gerak bagian lain mengikuti interaksi: kemiringan maksimal dua derajat pada kartu proyek, penghargaan, dan pendidikan; titik timeline menegaskan baris pengalaman yang sedang dibaca; judul bagian muncul satu kali tanpa menyembunyikan konten awal. ENERGY 3 / RHYTHM 3 / MOTION 3. Isi pengalaman dan pendidikan tetap terbuka.
- Lebar halaman mengikuti viewport dengan gutter 4vw, minimum 22px, maksimum 100px. Navigasi menjadi indeks bagian, dengan respons kedalaman ketika diarahkan kursor.
- Screenshot LinkedIn dari pengguna menjadi sumber dua peran Goodeva dan magang Telkom. Periode Goodeva dipertahankan tumpang tindih sesuai sumber. Deskripsi diringkas hanya dari teks yang terlihat.
- Dua gambar apresiasi Goodeva ditampilkan sebagai penghargaan, tanpa tanggal atau ID kredensial rekaan. Foto QCC 2023 ditampilkan sebagai dokumentasi kegiatan; tidak diklaim sebagai penghargaan Best Facilitator pribadi. Gambar asli disalin ke public/recognition dan ditampilkan utuh.
