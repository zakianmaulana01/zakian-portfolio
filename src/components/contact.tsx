"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Copy,
  Check,
  Pause,
  Play,
  ArrowUp,
} from "@phosphor-icons/react";
import { profile } from "@/data/portfolio";
import { useMotionPreference, toggleMotion } from "./preferences";

export function ContactActions() {
  const [status, setStatus] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  async function copy() {
    clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(profile.email);
      setStatus("Alamat email berhasil disalin.");
    } catch {
      setStatus("Silakan pilih lalu salin alamat email di atas.");
    }
    timer.current = setTimeout(() => setStatus(""), 4000);
  }
  return (
    <div className="contact-actions">
      <div className="email-row">
        <a href={`mailto:${profile.email}`} className="email-link">
          {profile.email}
          <ArrowUpRight aria-hidden="true" size={28} />
        </a>
        <button
          className="icon-button copy-button"
          onClick={copy}
          aria-label="Salin alamat email"
        >
          {status === "Alamat email berhasil disalin." ? (
            <Check size={20} />
          ) : (
            <Copy size={20} />
          )}
        </button>
      </div>
      <p className="copy-status" role="status">
        {status}
      </p>
    </div>
  );
}

export function FooterControls() {
  const reduce = useMotionPreference();
  return (
    <div className="footer-controls">
      <button
        onClick={toggleMotion}
        className="motion-toggle"
        aria-pressed={!reduce}
      >
        {reduce ? <Play size={14} /> : <Pause size={14} />}
        {reduce ? "Animasi dijeda" : "Animasi aktif"}
      </button>
      <a href="#home" className="back-top">
        Kembali ke atas <ArrowUp size={17} />
      </a>
    </div>
  );
}
