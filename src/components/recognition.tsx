"use client";

import Image from "next/image";
import { ArrowUpRight, X } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { recognition } from "@/data/portfolio";

export function Recognition() {
  const [selected, setSelected] = useState<(typeof recognition)[number] | null>(
    null,
  );
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (!selected || !dialog.current) return;
    dialog.current.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [selected]);
  function close() {
    dialog.current?.close();
    setSelected(null);
    trigger.current?.focus();
  }
  return (
    <section
      id="recognition"
      className="recognition-section"
      aria-labelledby="recognition-title"
    >
      <div className="folio-section-heading">
        <div className="folio-section-label">
          <span>PENGHARGAAN & DOKUMENTASI</span>
          <h2 id="recognition-title">Cerita di balik pekerjaan.</h2>
        </div>
        <p>
          Apresiasi yang saya terima,
          <br />
          dan momen bersama tim.
        </p>
      </div>
      <div className="recognition-grid">
        {recognition.map((item) => (
          <article key={item.id} className="recognition-card">
            <button
              type="button"
              className="recognition-button"
              aria-label={`Lihat dokumen ${item.title}`}
              aria-haspopup="dialog"
              onClick={(event) => {
                trigger.current = event.currentTarget;
                setSelected(item);
              }}
            >
              <div className="recognition-image">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={item.width}
                  height={item.height}
                  sizes="(max-width: 700px) 90vw, 30vw"
                />
                <span className="recognition-expand" aria-hidden="true">
                  <ArrowUpRight size={21} />
                </span>
              </div>
              <div className="recognition-caption">
                <span>{item.kind}</span>
                <h3>{item.title}</h3>
                <p>{item.issuer}</p>
              </div>
            </button>
          </article>
        ))}
      </div>
      {selected && (
        <dialog
          ref={dialog}
          className="recognition-dialog"
          aria-labelledby="recognition-dialog-title"
          onCancel={(event) => {
            event.preventDefault();
            close();
          }}
          onClick={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <div className="recognition-dialog-content">
            <button
              type="button"
              className="recognition-close"
              aria-label="Tutup dokumen penghargaan"
              onClick={close}
            >
              <X size={24} aria-hidden="true" />
            </button>
            <Image
              src={selected.image}
              unoptimized
              loading="eager"
              alt={selected.title}
              width={selected.width}
              height={selected.height}
              sizes="90vw"
            />
            <div>
              <p className="recognition-kind">{selected.kind}</p>
              <h2 id="recognition-dialog-title">{selected.title}</h2>
              <p>{selected.description}</p>
            </div>
          </div>
        </dialog>
      )}
    </section>
  );
}
