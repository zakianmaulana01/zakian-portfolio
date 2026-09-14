# Menarik kontribusi GitHub untuk portfolio

Panduan ini mengambil kalender kontribusi dari akun GitHub yang sedang login melalui GitHub CLI. Data yang dihasilkan berisi total, tanggal, jumlah kontribusi, dan level intensitas warna. Nama repository privat serta isi kode tidak ikut diekspor.

## 1. Pastikan GitHub CLI sudah login

```bash
gh auth status
```

Jika belum login, jalankan:

```bash
gh auth login
```

Untuk memasukkan kontribusi privat milik akun sendiri, token perlu scope `user`:

```bash
gh auth refresh -h github.com -s user
```

GitHub akan membuka proses otorisasi perangkat. Selesaikan di browser menggunakan akun yang kontribusinya ingin ditampilkan.

## 2. Ambil kalender resmi selama satu tahun

Jalankan dari root proyek. Hasil mentah disimpan di folder lokal yang sudah diabaikan Git.

```bash
mkdir -p .github-contributions

gh api graphql -f query='query {
  viewer {
    login
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            date
            contributionCount
            contributionLevel
          }
        }
      }
    }
  }
}' > .github-contributions/calendar.json
```

Periksa totalnya:

```bash
jq '.data.viewer.contributionsCollection.contributionCalendar.totalContributions' \
  .github-contributions/calendar.json
```

Nilai ini harus sama dengan angka “contributions in the last year” pada profil GitHub ketika dilihat dari akun pemilik.

## 3. Bentuk data untuk aplikasi

Untuk portfolio ini, data publik yang aman disimpan di `src/data/github-contributions.json`. File tersebut hanya berisi total kontribusi dan daftar angka per hari; tidak ada nama repository, URL privat, email, token, atau source code.

Peta level GitHub:

| GitHub | Nilai aplikasi |
| --- | ---: |
| `NONE` | 0 |
| `FIRST_QUARTILE` | 1 |
| `SECOND_QUARTILE` | 2 |
| `THIRD_QUARTILE` | 3 |
| `FOURTH_QUARTILE` | 4 |

Saat menyalin data ke aplikasi, gunakan `totalContributions` sebagai angka utama. Jangan menjumlahkan commit dari endpoint repository secara manual karena kontribusi GitHub dapat melibatkan email commit terverifikasi, pull request, dan aktivitas privat yang tidak terlihat dari endpoint publik.

## 4. Implementasi di Next.js

Gunakan file agregat yang aman untuk dirender oleh aplikasi. Contoh bentuk file `src/data/github-contributions.json`:

```json
{
  "username": "nama-akun",
  "verifiedAt": "2026-09-13",
  "total": 1438,
  "startDate": "2025-09-14",
  "counts": [0, 2, 6],
  "levels": [0, 1, 2]
}
```

`counts` dan `levels` harus memiliki panjang yang sama. Urutannya dimulai dari `startDate`, satu elemen untuk satu hari. Ubah data ringkas tersebut menjadi array kalender sebelum diberikan ke komponen:

```ts
import contributionData from "@/data/github-contributions.json";

const start = new Date(`${contributionData.startDate}T00:00:00Z`).getTime();

const days = contributionData.counts.map((count, index) => ({
  date: new Date(start + index * 86_400_000).toISOString().slice(0, 10),
  count,
  level: contributionData.levels[index],
}));
```

Render setiap hari sebagai sel SVG atau elemen grid. Pakai `level` untuk class warna, dan `count` sebagai isi tooltip agar kalender dapat dibaca recruiter maupun screen reader:

```tsx
{days.map((day) => (
  <rect
    key={day.date}
    className={`contribution-level-${day.level}`}
    aria-label={`${day.date}: ${day.count} kontribusi`}
  >
    <title>{`${day.date}: ${day.count} kontribusi`}</title>
  </rect>
))}
```

Tambahkan lima class warna dari level 0 sampai 4. Gunakan warna netral untuk level 0 dan gradasi hijau GitHub untuk level 1–4. Simpan total, tanggal verifikasi, dan catatan bahwa aktivitas privat ditampilkan anonim di section agar konteksnya jelas.

Di portfolio ini, implementasinya ada di [src/lib/github-activity.ts](../src/lib/github-activity.ts), [src/components/github-activity.tsx](../src/components/github-activity.tsx), dan [src/data/github-contributions.json](../src/data/github-contributions.json).

Setelah memperbarui data, jalankan:

```bash
npm run lint
npm run build
npm run test:e2e
```

## 5. Keamanan data

- Jangan simpan token GitHub di file proyek.
- Jangan commit isi folder `.github-contributions/`; folder ini hanya untuk hasil tarik lokal.
- File agregat yang tidak memuat data sensitif boleh dimasukkan ke repository untuk kebutuhan tampilan website.
- Tarik ulang data sebelum rilis atau saat ingin memperbarui angka kontribusi.
