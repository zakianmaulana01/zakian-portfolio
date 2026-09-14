"use client";

import { ArrowClockwise } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import type { mountHeroScene } from "@/lib/hero-scene";

export function HeroSculpture() {
  const host = useRef<HTMLDivElement>(null);
  const controls = useRef<ReturnType<typeof mountHeroScene> | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let cancelled = false;
    import("@/lib/hero-scene")
      .then(({ mountHeroScene }) => {
        if (cancelled || !host.current) return;
        try {
          controls.current = mountHeroScene(host.current);
          setReady(true);
        } catch {
          // The static code sculpture remains visible when WebGL is unavailable.
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
      controls.current?.dispose();
      controls.current = null;
    };
  }, []);

  return (
    <div className="sculpture-stage" data-ready={ready}>
      <div className="sculpture-halo" aria-hidden="true" />
      <div className="sculpture-fallback" aria-hidden="true">
        <span>&lt;</span>
        <i>/</i>
        <span>&gt;</span>
      </div>
      <div ref={host} className="sculpture-canvas" />
      <span className="sculpture-note sculpture-note-top" aria-hidden="true">
        ide → logika
      </span>
      <span className="sculpture-note sculpture-note-bottom" aria-hidden="true">
        kode → aplikasi
      </span>
      {ready && (
        <div className="sculpture-controls">
          <span>Geser untuk memutar</span>
          <div>
            <button
              type="button"
              aria-label="Putar objek 3D ke kiri"
              onClick={() => controls.current?.rotate(-1)}
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Putar objek 3D ke kanan"
              onClick={() => controls.current?.rotate(1)}
            >
              →
            </button>
            <button
              type="button"
              aria-label="Atur ulang posisi 3D"
              onClick={() => controls.current?.reset()}
            >
              <ArrowClockwise size={17} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
