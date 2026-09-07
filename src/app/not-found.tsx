import Link from "next/link";
export default function NotFound() {
  return (
    <main className="container section">
      <p className="section-code">404 · HALAMAN TIDAK DITEMUKAN</p>
      <h1 style={{ fontSize: "clamp(42px,8vw,80px)", letterSpacing: "-.05em" }}>
        Sepertinya salah alamat.
      </h1>
      <p className="section-description">
        Halaman ini belum tersedia. Yuk, kembali mengenal saya dan proyek yang
        saya kerjakan.
      </p>
      <Link
        href="/"
        className="button button-primary"
        style={{ marginTop: 30 }}
      >
        Kembali ke portofolio
      </Link>
    </main>
  );
}
