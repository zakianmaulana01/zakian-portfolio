"use client";
import { useEffect, useState } from "react";
import { ArrowUpRight, List, X } from "@phosphor-icons/react";
const links = [
  { href: "#about", label: "Tentang" },
  { href: "#skills", label: "Keahlian" },
  { href: "#experience", label: "Pengalaman" },
  { href: "#work", label: "Proyek" },
];
export function Navigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-15% 0px -60% 0px" },
    );
    document
      .querySelectorAll("main section[id]")
      .forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        document.getElementById("menu-button")?.focus();
      }
    };
    const media = window.matchMedia("(min-width: 768px)");
    const resize = () => {
      if (media.matches) setOpen(false);
    };
    document.addEventListener("keydown", close);
    media.addEventListener("change", resize);
    return () => {
      document.removeEventListener("keydown", close);
      media.removeEventListener("change", resize);
    };
  }, [open]);
  return (
    <header className="site-header">
      <div className="nav-inner container">
        <a
          href="#home"
          className="wordmark"
          aria-label="Kembali ke beranda"
          onClick={() => setOpen(false)}
        >
          zakian<span>.dev</span>
        </a>
        <nav className="desktop-nav" aria-label="Navigasi utama">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={active === link.href.slice(1) ? "active" : ""}
              aria-current={
                active === link.href.slice(1) ? "location" : undefined
              }
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <a
            href="#contact"
            className="nav-contact"
            onClick={() => setOpen(false)}
          >
            Mari ngobrol
            <ArrowUpRight size={16} />
          </a>
          <button
            id="menu-button"
            className="icon-button menu-toggle"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Tutup menu" : "Buka menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? <X size={24} /> : <List size={24} />}
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="mobile-nav"
          className="mobile-nav"
          aria-label="Navigasi mobile"
        >
          {[
            ...links,
            { href: "#education", label: "Pendidikan" },
            { href: "#contact", label: "Kontak" },
          ].map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
              <ArrowUpRight size={21} />
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
