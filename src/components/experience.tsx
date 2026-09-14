"use client";

import { useState } from "react";
import { ArrowUpRight, GitBranch, CaretDown, CaretUp } from "@phosphor-icons/react";
import { profile, experience } from "@/data/portfolio";
import { CareerTimeline } from "@/components/developer-scenes";

export function ExperienceSection() {
  const [showAll, setShowAll] = useState(false);
  const displayedExperience = showAll ? experience : experience.slice(0, 4);

  return (
    <section
      id="experience"
      className="section container experience-section"
      aria-labelledby="experience-title"
    >
      <div className="section-heading">
        <span className="section-code">&lt;pengalaman&gt;</span>
        <h2 id="experience-title">
          Perjalanan saya,
          <br />
          <span>satu langkah setiap waktu.</span>
        </h2>
        <p className="section-description">
          Belajar dari kebutuhan nyata, bertumbuh bersama tim.
        </p>
      </div>
      <CareerTimeline className="career-timeline">
        <span className="career-flow loop" aria-hidden="true" />
        {displayedExperience.map((job, index) => (
          <article className="experience-row" key={job.company}>
            <div
              className={`career-node ${job.current ? "career-node-current" : ""}`}
              aria-hidden="true"
            >
              {job.current ? <GitBranch size={17} /> : <span />}
            </div>
            <div className="experience-period">
              {job.period}
              {job.current && (
                <span className="current-role">Saat ini</span>
              )}
            </div>
            <div className="experience-main">
              <span className="experience-role">{job.role}</span>
              <h3>{job.company}</h3>
              <p>{job.description}</p>
            </div>
            <span className="career-index" aria-hidden="true">
              {String(experience.length - index).padStart(2, "0")}
            </span>
          </article>
        ))}
      </CareerTimeline>
      
      {!showAll ? (
        <button
          onClick={() => setShowAll(true)}
          className="text-link experience-link"
          style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", padding: 0 }}
        >
          Lihat riwayat lainnya
          <CaretDown size={18} />
        </button>
      ) : (
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <button
            onClick={() => {
              setShowAll(false);
              document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-link experience-link"
            style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", padding: 0 }}
          >
            Sembunyikan
            <CaretUp size={18} />
          </button>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link experience-link"
          >
            LinkedIn
            <ArrowUpRight size={18} />
          </a>
        </div>
      )}
    </section>
  );
}
