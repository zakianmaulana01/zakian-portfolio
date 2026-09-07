# Zakian Maulana Syaifulloh · CV & Portofolio

Website personal berbahasa Indonesia dengan tema putih-biru, aksen editor kode, dan animasi berulang di beberapa bagian. Dibangun menggunakan Next.js, React, TypeScript, Tailwind CSS, dan Motion.

## Isi website

1. Perkenalan, nama lengkap, ringkasan profil, dan editor kode interaktif.
2. Tentang saya dan ilustrasi proses kerja.
3. Keahlian dengan diagram teknologi bergerak.
4. Pengalaman kerja dalam linimasa.
5. Pendidikan.
6. Proyek pilihan, filter kategori, dan dialog detail.
7. Kontak email, LinkedIn, dan GitHub.

Halaman `/resume` menyajikan CV teks dengan tombol **Cetak / Simpan PDF** dan gaya cetak A4.

## Menjalankan secara lokal

Gunakan Node.js 20.9 atau yang lebih baru.

```bash
npm install
npm run dev -- --port 3001
```

Buka `http://127.0.0.1:3001`. Untuk produksi, gunakan `npm run build` lalu `npm run start`.

Website tidak membutuhkan akun, API key, atau database. Data disimpan lokal. Tautan email membuka aplikasi email pengunjung.

## Mengubah konten dan tampilan

- `src/data/portfolio.ts`: profil, kontak, keahlian, pengalaman, pendidikan, dan proyek.
- `src/app/page.tsx`: susunan halaman utama.
- `src/app/resume/page.tsx`: CV untuk dicetak.
- `src/components/developer-scenes.tsx`: editor kode dan ilustrasi animasi.
- `src/app/globals.css`: palet warna, tata letak responsif, animasi, dan gaya cetak.

Tema selalu terang. Tombol animasi di footer menyimpan preferensi jeda. Preferensi sistem untuk mengurangi gerakan juga dihormati. Ilustrasi animasi dijeda ketika di luar area pandang atau tab tidak aktif. Font disajikan secara lokal melalui `next/font`.

## Sumber konten

- [Profil LinkedIn](https://www.linkedin.com/in/zakian-maulana-syaifulloh/)
- [GitHub Zakian](https://github.com/zakianmaulana01)
- [BAYARO POS](https://github.com/zakianmaulana01/REACTJS-LANDING-PAGE-BAYARO)
- [Industrial SCADA](https://github.com/zakianmaulana01/NEXTJS-PLC-MANY)
- [Laravel Multiuser Chat](https://github.com/zakianmaulana01/LARAVEL-CHAT-MULTIUSER)
- Email diberikan langsung oleh pemilik.

Ilustrasi proyek dibuat dengan elemen HTML/CSS dan diberi label **Visual konsep**. Ilustrasi tersebut bukan tangkapan layar aplikasi. Aset gambar dari desain sebelumnya masih tersedia di `public/images/`, tetapi tidak digunakan pada desain ini.

SCADA dijelaskan sebagai simulasi telemetri dengan fondasi integrasi PLC, sesuai README publiknya. Tidak ada metrik hasil, testimoni, sertifikasi, atau tanggung jawab pekerjaan yang dibuat-buat. Proyek ditautkan ke repository agar pengunjung dapat melihat implementasinya.

## Publikasi dan status pemeriksaan

Website belum dipublikasikan. Saat deployment, isi `NEXT_PUBLIC_SITE_URL` dengan domain HTTPS tujuan; URL produksi Vercel menjadi cadangan otomatis.

Sesuai permintaan pemilik, revisi putih-biru berbahasa Indonesia ini dikerjakan **tanpa menjalankan build, lint, tes, atau pemeriksaan browser**. Pemilik akan mencoba tampilannya langsung. Perintah pemeriksaan yang tersedia: `npm run typecheck`, `npm run lint`, dan `npm run test:e2e`.
