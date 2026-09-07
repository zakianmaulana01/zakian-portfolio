export const profile = {
  name: "Zakian Maulana Syaifulloh",
  shortName: "Zakian",
  role: "Web Developer",
  email: "zakianmaulana2001@gmail.com",
  github: "https://github.com/zakianmaulana01",
  linkedin: "https://www.linkedin.com/in/zakian-maulana-syaifulloh/",
  location: "Bekasi, Indonesia",
  summary:
    "Saya mengembangkan aplikasi web yang membantu pekerjaan jadi lebih mudah. Berbekal 4+ tahun pengalaman, saya menghubungkan kebutuhan bisnis, logika program, dan antarmuka yang nyaman digunakan.",
  introduction:
    "Perjalanan saya dimulai dari pengembangan ERP manufaktur, berlanjut ke sistem campaign, hingga aplikasi web interaktif. Saya suka memahami cara sebuah tim bekerja, menemukan masalahnya, lalu membangun solusi yang benar-benar berguna.",
};
export type Project = {
  id: "bayaro" | "scada" | "chat";
  name: string;
  category: "Frontend" | "Full stack";
  type: string;
  description: string;
  stack: string[];
  repo: string;
  overview: string;
  highlights: string[];
};
export const projects: Project[] = [
  {
    id: "bayaro",
    name: "BAYARO POS",
    category: "Frontend",
    type: "Website produk & simulator kasir",
    description:
      "Membantu pelaku UMKM mengenal sistem kasir dengan mencoba alur pemesanan secara langsung.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Motion"],
    repo: "https://github.com/zakianmaulana01/REACTJS-LANDING-PAGE-BAYARO",
    overview:
      "Website produk untuk UMKM Indonesia dengan simulator kasir interaktif. Pengunjung dapat menjelajahi alur dari memilih menu hingga menyelesaikan transaksi simulasi.",
    highlights: [
      "Katalog menu, keranjang, dan simulasi pembayaran interaktif.",
      "Pengelolaan meja, riwayat transaksi, dan laporan penjualan.",
      "Tampilan responsif dengan alur pendaftaran melalui WhatsApp.",
    ],
  },
  {
    id: "scada",
    name: "Industrial SCADA",
    category: "Frontend",
    type: "Dashboard pemantauan & editor visual",
    description:
      "Membuat sistem industri yang kompleks lebih mudah dipantau, dimodelkan, dan dipahami.",
    stack: ["Next.js", "React Flow", "Recharts", "TypeScript"],
    repo: "https://github.com/zakianmaulana01/NEXTJS-PLC-MANY",
    overview:
      "Dashboard dan editor visual untuk sistem udara bertekanan. Repository publik menggunakan telemetri simulasi dengan kontrak API yang disiapkan untuk integrasi PLC di tahap berikutnya.",
    highlights: [
      "Editor drag-and-drop untuk perangkat dan jalur perpipaan.",
      "Penyimpanan tata letak serta konfigurasi sumber data.",
      "Simulasi perangkat, antrean alarm, dan visualisasi tren.",
    ],
  },
  {
    id: "chat",
    name: "Laravel Multiuser Chat",
    category: "Full stack",
    type: "Aplikasi percakapan real-time",
    description:
      "Satu backend, dua pendekatan frontend. Percakapan tetap terhubung dan tersinkronisasi.",
    stack: ["Laravel", "Vue 3", "MySQL", "Pusher"],
    repo: "https://github.com/zakianmaulana01/LARAVEL-CHAT-MULTIUSER",
    overview:
      "Aplikasi percakapan berbasis Laravel dengan antarmuka Blade dan Vue yang berbagi backend. Dilengkapi alur deployment untuk shared hosting.",
    highlights: [
      "Percakapan privat, indikator mengetik, dan status pesan dibaca.",
      "Autentikasi berdasarkan peran serta panel administrasi.",
      "Notifikasi real-time melalui Pusher dan Laravel Echo.",
    ],
  },
];
export const experience = [
  {
    company: "PT Arita Prima Indonesia Tbk",
    role: "IT Programmer",
    period: "Des 2025 – sekarang",
    description: "Menjalani peran sebagai IT Programmer di Jakarta Utara.",
    current: true,
  },
  {
    company: "PT Kinarya Alihdaya Mandiri",
    role: "Web Developer",
    period: "Mei 2025 – Des 2025",
    description:
      "Merawat fitur sistem campaign Telkomsel dan mengoptimalkan query SQL untuk pelaporan bersama tim produk serta pemasaran.",
    current: false,
  },
  {
    company: "PT Dasa Windu Agung",
    role: "Web Developer",
    period: "Jan 2022 – Apr 2025",
    description:
      "Mengembangkan ERP untuk produksi, pengiriman, quality control, dan HR dengan PHP, Laravel, MySQL, serta SQL Server.",
    current: false,
  },
];
export const capabilities = [
  {
    title: "Antarmuka & interaksi",
    description:
      "Website responsif dan dashboard interaktif yang mudah dipahami pengguna.",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue"],
  },
  {
    title: "Logika & pengelolaan data",
    description:
      "Logika bisnis, integrasi API, dan struktur database untuk mendukung aplikasi.",
    skills: [
      "PHP",
      "Laravel",
      "CodeIgniter",
      "REST API",
      "MySQL",
      "SQL Server",
    ],
  },
];
export const education = [
  {
    school: "Universitas Indraprasta PGRI",
    degree: "S1 Teknik Informatika",
    period: "2020–2024",
    detail: "IPK 3,70 / 4,00",
  },
  {
    school: "SMKN 2 Kota Bekasi",
    degree: "Rekayasa Perangkat Lunak",
    period: "Pendidikan kejuruan",
    detail: "Fondasi awal perjalanan saya di pengembangan perangkat lunak.",
  },
];
