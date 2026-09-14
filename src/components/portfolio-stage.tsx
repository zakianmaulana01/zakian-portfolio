"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { projects } from "@/data/portfolio";
import { useMotionPreference } from "./preferences";

import { TechIcon } from "./tech-icon";
import { LoopScene } from "./developer-scenes";
const featured = [projects[0], projects[2], projects[3]];
export function PortfolioStage() {
  const [index, setIndex] = useState(0);
  const [manual, setManual] = useState(false);
  const reduce = useMotionPreference();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (reduce || manual) return;
    let visible = false;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    if (ref.current) observer.observe(ref.current);
    const timer = setInterval(() => {
      if (visible && !document.hidden)
        setIndex((value) => (value + 1) % featured.length);
    }, 6000);
    return () => {
      clearInterval(timer);
      observer.disconnect();
    };
  }, [reduce, manual]);
  const project = featured[index];
  return (
    <div className="hero-workspace" ref={ref}>
      <LoopScene className="hero-tech-orbit">
        <span className="hero-tech-label">DIBANGUN DENGAN</span>
        {["Laravel", "React", "Next.js"].map((tech, i) => (
          <span key={tech} className={`hero-tech-token token-${i} loop`}>
            <TechIcon name={tech} size={21} />
            <span>{tech}</span>
          </span>
        ))}
      </LoopScene>
      <div className="folio-preview">
        <div className="folio-preview-heading">
          <span aria-hidden="true">&lt;/&gt;</span>
          <p>Catatan pengembangan</p>
          <span className="preview-edition">01/03</span>
        </div>
        <div className="folio-preview-frame">
          {featured.map((item, i) => (
            <Image
              key={item.id}
              className={i === index ? "preview-active" : ""}
              src={item.images![0].src}
              alt={i === index ? `Rekaan visual ${item.name}` : ""}
              aria-hidden={i !== index}
              width={1672}
              height={941}
              sizes="(max-width: 700px) 90vw, 560px"
              preload={i === 0}
            />
          ))}
        </div>
        <div className="folio-preview-caption">
          <div>
            <p>{project.name}</p>
            <span>{project.type}</span>
          </div>
          <a href="#work" aria-label="Jelajahi semua karya">
            ↗
          </a>
        </div>
        <div
          className="folio-preview-selector"
          role="group"
          aria-label="Pilih preview proyek"
        >
          {featured.map((item, i) => (
            <button
              key={item.id}
              aria-label={`Preview ${item.name}`}
              aria-pressed={i === index}
              onClick={() => {
                setIndex(i);
                setManual(true);
              }}
            >
              <span>0{i + 1}</span>
              <i aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>
      <LoopScene className="hero-code-flow">
        <code>antarmuka</code>
        <span aria-hidden="true" className="code-flow-line">
          <i className="loop" />
        </span>
        <code>logika</code>
        <span aria-hidden="true" className="code-flow-line">
          <i className="loop" />
        </span>
        <code>data</code>
      </LoopScene>
    </div>
  );
}
