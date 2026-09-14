"use client";

import { ArrowDown, ArrowUpRight } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { HeroSculpture } from "@/components/hero-sculpture";

const role = "Web Developer / IT Programmer";

export function Hero() {
  const [typed, setTyped] = useState("");
  useEffect(() => {
    let index = 0;
    const timer = window.setInterval(() => {
      index = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? role.length
        : index + 1;
      setTyped(role.slice(0, index));
      if (index >= role.length) window.clearInterval(timer);
    }, 55);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="home" className="intro-wide" aria-labelledby="hero-title">
      <div className="intro-main">
        <div className="intro-personal">
          <div className="intro-prelude">
            <span>Halo, saya Zakian.</span>
            <span>Bekasi, Indonesia</span>
          </div>
          <h1 id="hero-title">
            Zakian <span>Maulana.</span>
            <span className="sr-only"> Syaifulloh</span>
          </h1>
          <p className="intro-role">
            <span aria-hidden="true">
              {typed}
              <i />
            </span>
            <span className="sr-only">{role}</span>
          </p>
          <p className="intro-statement">
            Menulis kode,
            <br />
            <em>memahami manusia.</em>
          </p>
          <p className="intro-bio">
            Saya mengembangkan aplikasi bisnis dan sistem internal. Dari alur
            kerja di pabrik sampai platform campaign, saya senang membuat yang
            rumit jadi lebih mudah dipakai.
          </p>
          <div className="intro-actions">
            <a href="/resume" className="intro-cv">
              Kenali saya lewat CV <ArrowUpRight size={22} aria-hidden="true" />
            </a>
            <a href="#work" className="intro-work">
              Lihat karya saya <ArrowDown size={20} aria-hidden="true" />
            </a>
          </div>
        </div>
        <HeroSculpture />
      </div>
    </section>
  );
}
