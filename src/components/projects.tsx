"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, X, GithubLogo, Check } from "@phosphor-icons/react";
import { projects, type Project } from "@/data/portfolio";
import { TechIcon } from "./tech-icon";
const filters = ["Semua", "Frontend", "Full stack"] as const;
export function Projects() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("Semua");
  const [slide, setSlide] = useState(0);
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
              onClick={() => {
                setSlide(0);
                setSelected(project);
              }}
              aria-label={`Lihat detail proyek ${project.name}`}
              aria-haspopup="dialog"
            >
              {project.images ? (
                <div className="project-screen">
                  <Image
                    src={project.images[0].src}
                    alt={`${project.name}, ${project.images[0].label}, rekaan visual`}
                    width={1672}
                    height={941}
                    sizes="(max-width: 760px) 100vw, 50vw"
                  />
                  <span className="screen-count">03 layar ↗</span>
                </div>
              ) : (
                <div className="project-screen">
                  <Image
                    src={`/images/${project.id}-cover.png`}
                    alt={`Visual konsep ${project.name}`}
                    width={1536}
                    height={1024}
                    sizes="(max-width: 700px) 90vw, 480px"
                  />
                </div>
              )}
              <div className="project-info">
                <span className="project-type">{project.type}</span>
                <h3>{project.name}</h3>
                <p className="project-card-description">
                  {project.description}
                </p>
                {project.stack.length > 0 && (
                  <div className="project-card-stack">
                    {project.stack.slice(0, 3).map((tech) => (
                      <span key={tech}>
                        <TechIcon name={tech} size={12} />
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 3 && (
                      <span>+{project.stack.length - 3}</span>
                    )}
                  </div>
                )}
                <div className="project-card-footer">
                  <span>
                    {project.repo ? "Repository publik" : "Project profesional"}
                  </span>
                  <span>
                    Lihat proyek <ArrowUpRight size={14} />
                  </span>
                </div>
              </div>
            </button>
          </article>
        ))}
      </div>
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
            {selected.images ? (
              <div className="project-gallery">
                <Image
                  src={selected.images[slide].src}
                  alt={`${selected.name}, ${selected.images[slide].label}, rekaan visual`}
                  width={1672}
                  height={941}
                  sizes="(max-width: 760px) 100vw, 900px"
                />
                <div
                  className="gallery-controls"
                  role="group"
                  aria-label="Pilih gambar proyek"
                >
                  {selected.images.map((img, index) => (
                    <button
                      key={img.src}
                      aria-pressed={slide === index}
                      onClick={() => setSlide(index)}
                    >
                      <span>0{index + 1}</span> {img.label}
                    </button>
                  ))}
                </div>
                <p className="gallery-note">
                  Rekaan visual berbasis referensi portfolio; detail tampilan
                  dapat berbeda dari sistem asli.
                </p>
              </div>
            ) : (
              <div className="project-gallery">
                <Image
                  src={`/images/${selected.id}-cover.png`}
                  alt={`Visual konsep ${selected.name}`}
                  width={1536}
                  height={1024}
                  sizes="(max-width: 760px) 100vw, 900px"
                />
                <p className="gallery-note">
                  Visual konsep proyek. Implementasi tersedia melalui repository
                  publik.
                </p>
              </div>
            )}
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
                  <span key={tag}>
                    <TechIcon name={tag} size={14} />
                    {tag}
                  </span>
                ))}
              </div>
              {selected.repo && (
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
              )}
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
