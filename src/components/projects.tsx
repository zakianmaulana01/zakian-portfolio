"use client";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  X,
  GithubLogo,
  Check,
  Code,
} from "@phosphor-icons/react";
import { projects, type Project } from "@/data/portfolio";
import { ProjectVisual } from "./developer-scenes";
const filters = ["Semua", "Frontend", "Full stack"] as const;
export function Projects() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("Semua");
  const [selected, setSelected] = useState<Project | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const visible = projects.filter(
    (project) => filter === "Semua" || project.category === filter,
  );
  useEffect(() => {
    const element = dialog.current;
    if (selected && element && !element.open) {
      element.showModal();
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);
  function close() {
    dialog.current?.close();
    setSelected(null);
  }
  return (
    <>
      <div className="work-toolbar">
        <div className="filters" role="group" aria-label="Filter proyek">
          {filters.map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              aria-pressed={item === filter}
            >
              {item}
              {item === "Semua" && <span>{projects.length}</span>}
            </button>
          ))}
        </div>
        <a
          href="https://github.com/zakianmaulana01?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="all-repositories"
        >
          <GithubLogo size={18} />
          Semua repository
          <ArrowUpRight size={15} />
        </a>
      </div>
      <div className="project-grid" aria-live="polite">
        {visible.map((project) => (
          <article
            key={project.id}
            className={`project ${project.id === "bayaro" ? "featured-project" : ""}`}
          >
            <button
              className="project-button"
              onClick={() => setSelected(project)}
              aria-label={`Lihat detail proyek ${project.name}`}
              aria-haspopup="dialog"
            >
              <ProjectVisual kind={project.id} />
              <div className="project-info">
                <span className="project-type">{project.type}</span>
                <h3>{project.name}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-stack">
                  {project.stack.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <span className="project-detail-link">
                  Kenali proyek ini <ArrowRight size={19} />
                </span>
              </div>
            </button>
          </article>
        ))}
      </div>
      <p className="project-footnote">
        <Code size={15} aria-hidden="true" />
        Setiap proyek punya cerita. Kodenya bisa kamu jelajahi di GitHub.
      </p>
      <dialog
        ref={dialog}
        className="project-dialog"
        aria-labelledby="project-title"
        onCancel={close}
        onClose={() => setSelected(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        {selected && (
          <div className="dialog-content">
            <button
              className="icon-button dialog-close"
              onClick={close}
              aria-label="Tutup detail proyek"
            >
              <X size={24} />
            </button>
            <ProjectVisual kind={selected.id} />
            <div className="dialog-body">
              <p className="project-type">{selected.type}</p>
              <h2 id="project-title">{selected.name}</h2>
              <p className="dialog-overview">{selected.overview}</p>
              <h3>Yang ada di dalamnya</h3>
              <ul className="project-highlights">
                {selected.highlights.map((item) => (
                  <li key={item}>
                    <Check size={18} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="project-stack">
                {selected.stack.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className="dialog-actions">
                <a
                  className="button button-primary"
                  href={selected.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GithubLogo size={20} />
                  Jelajahi kode
                  <ArrowUpRight size={18} />
                </a>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
