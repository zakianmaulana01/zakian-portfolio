# Arah desain portofolio Zakian

CV personal untuk recruiter, dengan kepribadian seorang pengembang web. Perkenalan dan riwayat profesional mendahului proyek. Bahasa antarmuka Indonesia; nama teknologi dan jabatan mengikuti istilah aslinya.

DESIGN_VARIANCE: 8. MOTION_INTENSITY: 8. VISUAL_DENSITY: 4.

## Identitas visual

Tema terang saja, sesuai permintaan pemilik. Putih `#ffffff`, tinta `#192238`, biru utama `#315efb`, dan bidang biru pucat `#f0f4ff`. Tidak memakai palet cokelat atau oranye. Space Grotesk untuk judul, Manrope untuk teks, monospace untuk aksen kode. Tipografi besar, ruang yang lega, garis tipis, dan sudut 10–14 px.

Hero menggabungkan perkenalan yang mudah dipindai dengan editor kode ringan. Tab `profil.ts` dan `stack.ts` bisa dipilih. Ilustrasi proyek memakai konsep transaksi, aliran data, dan percakapan; semuanya diberi label visual konsep.

## Gerakan

Gerakan berulang berlangsung di dalam bagian halaman: efek mengetik jabatan, editor melayang, orbit teknologi, urutan proses kerja, linimasa karier, serta ilustrasi proyek. Pengguliran tetap native dan konten tidak menunggu animasi scroll untuk terlihat.

Tombol jeda di footer dan `prefers-reduced-motion` menonaktifkan gerakan. Komponen LoopScene menjeda ilustrasi saat keluar dari viewport atau tab tersembunyi. Tombol tetap dapat difokuskan dan editor berhenti melayang saat digunakan lewat keyboard.

Navigasi berada pada lapisan 40; dialog memakai native top layer. Tampilan mobile memakai satu kolom dan menu ringkas. Halaman CV memiliki gaya cetak A4.

## Integritas konten

Riwayat profesional berasal dari LinkedIn pemilik. Proyek berasal dari repository GitHub yang diberikan. Jangan menambahkan metrik, testimoni, sertifikasi, klien, tautan demo, atau tanggung jawab pekerjaan yang belum terverifikasi. SCADA menggunakan telemetri simulasi. Aset raster desain sebelumnya tidak digunakan dalam desain aktif.
