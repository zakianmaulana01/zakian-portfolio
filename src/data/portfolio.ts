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
    "Perjalanan saya dimulai dari Customer Care di Telkom, lalu implementasi sistem dan pengembangan web di Goodeva. Setelah itu saya mengembangkan ERP manufaktur dan sistem campaign. Saya suka memahami cara sebuah tim bekerja, menemukan masalahnya, lalu membangun solusi yang benar-benar berguna.",
};
export type Project = {
  id:
    | "bayaro"
    | "scada"
    | "chat"
    | "dwasys"
    | "campaign"
    | "multazam"
    | "mandjur"
    | "goodeva";
  name: string;
  category: "Frontend" | "Full stack";
  type: string;
  description: string;
  stack: string[];
  repo?: string;
  images?: { src: string; label: string }[];
  overview: string;
  highlights: string[];
};
export const projects: Project[] = [
  {
    id: "dwasys",
    name: "DwaSys Web",
    category: "Full stack",
    type: "ERP manufaktur",
    description:
      "Sistem operasional yang menghubungkan produksi, pengiriman, quality control, dan HR.",
    overview:
      "Sistem operasional yang menghubungkan produksi, pengiriman, quality control, dan HR.",
    stack: [],
    highlights: ["Modul utama", "Produksi", "Penjualan & pengiriman"],
    images: [
      {
        src: "/portfolio/dwasys-erp/01-general-pages.png",
        label: "Modul utama",
      },
      {
        src: "/portfolio/dwasys-erp/02-production-module.png",
        label: "Produksi",
      },
      {
        src: "/portfolio/dwasys-erp/03-sales-shipping.png",
        label: "Penjualan & pengiriman",
      },
    ],
  },
  {
    id: "campaign",
    name: "Campaign Submit Tools",
    category: "Full stack",
    type: "Pengelolaan campaign",
    description:
      "Pengajuan dan pemantauan campaign SMS, WhatsApp, serta push notification.",
    overview:
      "Pengajuan dan pemantauan campaign SMS, WhatsApp, serta push notification.",
    stack: [],
    highlights: [
      "Halaman masuk",
      "Pengajuan campaign",
      "Persetujuan & riwayat",
    ],
    images: [
      {
        src: "/portfolio/campaign-submit-tools/01-login.png",
        label: "Halaman masuk",
      },
      {
        src: "/portfolio/campaign-submit-tools/02-campaign-submit.png",
        label: "Pengajuan campaign",
      },
      {
        src: "/portfolio/campaign-submit-tools/03-approval-history.png",
        label: "Persetujuan & riwayat",
      },
    ],
  },
  {
    id: "multazam",
    name: "Multazam Smart System",
    category: "Full stack",
    type: "Operasional Haji & Umrah",
    description:
      "Pengelolaan jamaah, paket perjalanan, inventaris, dan keuangan dalam satu sistem.",
    overview:
      "Pengelolaan jamaah, paket perjalanan, inventaris, dan keuangan dalam satu sistem.",
    stack: [],
    highlights: ["Dashboard", "Pendaftaran jamaah", "Paket & keuangan"],
    images: [
      {
        src: "/portfolio/multazam-smart-system/01-dashboard.png",
        label: "Dashboard",
      },
      {
        src: "/portfolio/multazam-smart-system/02-jamaah-registration.png",
        label: "Pendaftaran jamaah",
      },
      {
        src: "/portfolio/multazam-smart-system/03-package-finance.png",
        label: "Paket & keuangan",
      },
    ],
  },
  {
    id: "mandjur",
    name: "Mandjur Chat × Tokopedia",
    category: "Full stack",
    type: "Integrasi percakapan",
    description:
      "Integrasi API percakapan dan dashboard monitoring untuk layanan Mandjur.",
    overview:
      "Integrasi API percakapan dan dashboard monitoring untuk layanan Mandjur.",
    stack: [],
    highlights: ["Monitoring", "Antrean percakapan", "Integrasi marketplace"],
    images: [
      {
        src: "/portfolio/mandjur-chat/01-monitoring-dashboard.png",
        label: "Monitoring",
      },
      {
        src: "/portfolio/mandjur-chat/02-chat-queue.png",
        label: "Antrean percakapan",
      },
      {
        src: "/portfolio/mandjur-chat/03-marketplace-integration.png",
        label: "Integrasi marketplace",
      },
    ],
  },
  {
    id: "goodeva",
    name: "Goodeva Company Profile",
    category: "Frontend",
    type: "Website korporat",
    description:
      "Website company profile untuk memperkenalkan perusahaan dan layanan teknologi.",
    overview:
      "Website company profile untuk memperkenalkan perusahaan dan layanan teknologi.",
    stack: [],
    highlights: ["Beranda", "Solusi", "Portofolio & kontak"],
    images: [
      {
        src: "/portfolio/goodeva-company-profile/01-homepage.png",
        label: "Beranda",
      },
      {
        src: "/portfolio/goodeva-company-profile/02-solutions.png",
        label: "Solusi",
      },
      {
        src: "/portfolio/goodeva-company-profile/03-portfolio-contact.png",
        label: "Portofolio & kontak",
      },
    ],
  },
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
  {
    company: "Goodeva Technology",
    role: "Web Programmer · Kontrak",
    period: "Feb 2020 – Des 2021",
    description:
      "Mengelola, mengonfigurasi, dan memantau server Ubuntu untuk mendukung pengembangan aplikasi web, serta merancang dan mengembangkan website company profile.",
    current: false,
  },
  {
    company: "Goodeva Technology",
    role: "IT Implementor · Kontrak",
    period: "Nov 2019 – Des 2021",
    description:
      "Memimpin tim dan berkolaborasi dengan project manager untuk menganalisis masalah pengguna, merancang fitur sesuai kebutuhan, serta memberikan transfer pengetahuan tentang alur proses sistem.",
    current: false,
  },
  {
    company: "Telkom Indonesia",
    role: "Customer Care · Magang",
    period: "Sep 2017 – Nov 2017",
    description:
      "Mendukung tim Customer Care wilayah Bekasi melalui pengelolaan data menggunakan Excel, validasi dokumen pelanggan, dan rekapitulasi data.",
    current: false,
  },
];
export const recognition = [
  {
    id: "goodeva-kejutan-performa",
    title: "Kejutan Performa",
    issuer: "Goodeva Technology",
    kind: "Penghargaan kinerja",
    description:
      "Apresiasi dari manajemen Goodeva atas performa kerja, diberikan kepada Zakian (CIT).",
    image: "/recognition/goodeva-kejutan-performa.png",
    width: 1025,
    height: 732,
  },
  {
    id: "goodeva-performance-rewards",
    title: "Performance Rewards Surprise",
    issuer: "Goodeva Technology",
    kind: "Penghargaan kontribusi",
    description:
      "Apresiasi atas kontribusi dan performa kerja dari manajemen Goodeva kepada Zakian Maulana.",
    image: "/recognition/goodeva-performance-rewards.png",
    width: 1280,
    height: 912,
  },
  {
    id: "qcc-2023",
    title: "Quality Control Circle 2023",
    issuer: "PT Dasa Windu Agung",
    kind: "Dokumentasi kegiatan · 2023",
    description:
      "Dokumentasi kegiatan QCC 2023 di PT Dasa Windu Agung. Foto menampilkan apresiasi Active Circle dan Best Facilitator dalam kegiatan tersebut.",
    image: "/recognition/qcc-2023.png",
    width: 720,
    height: 1280,
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
