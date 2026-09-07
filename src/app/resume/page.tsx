import type { Metadata } from "next";
import {
  profile,
  experience,
  education,
  capabilities,
  projects,
} from "@/data/portfolio";
import { ResumeActions } from "@/components/resume-actions";

export const metadata: Metadata = {
  title: "CV | Zakian Maulana Syaifulloh",
  description:
    "Profil, keahlian, pengalaman kerja, pendidikan, dan proyek pilihan Zakian Maulana Syaifulloh.",
};

export default function Resume() {
  return (
    <main className="resume-page container">
      <ResumeActions />
      <article className="resume-sheet">
        <header className="resume-header">
          <p className="small-label">DAFTAR RIWAYAT HIDUP</p>
          <h1>{profile.name}</h1>
          <p className="resume-role">Web Developer / IT Programmer</p>
          <p className="resume-location">{profile.location}</p>
          <div className="resume-contact">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={profile.linkedin}>
              linkedin.com/in/zakian-maulana-syaifulloh
            </a>
            <a href={profile.github}>github.com/zakianmaulana01</a>
          </div>
        </header>
        <section className="resume-section">
          <h2>Profil singkat</h2>
          <p>{profile.summary}</p>
        </section>
        <section className="resume-section">
          <h2>Keahlian teknis</h2>
          <div className="resume-skills">
            {capabilities.map((group, index) => (
              <p key={group.title}>
                <strong>{index === 0 ? "Antarmuka" : "Backend & data"}</strong>
                <span>{group.skills.join(" · ")}</span>
              </p>
            ))}
          </div>
        </section>
        <section className="resume-section">
          <h2>Pengalaman kerja</h2>
          {experience.map((job) => (
            <div key={job.company} className="resume-entry">
              <div className="resume-entry-heading">
                <h3>{job.company}</h3>
                <span>{job.period}</span>
              </div>
              <p className="resume-entry-role">{job.role}</p>
              <p>{job.description}</p>
            </div>
          ))}
        </section>
        <section className="resume-section">
          <h2>Pendidikan</h2>
          {education.map((item) => (
            <div key={item.school} className="resume-entry">
              <div className="resume-entry-heading">
                <h3>{item.school}</h3>
                <span>{item.period}</span>
              </div>
              <p>
                {item.degree} · {item.detail}
              </p>
            </div>
          ))}
        </section>
        <section className="resume-section">
          <h2>Proyek pilihan</h2>
          {projects.map((project) => (
            <div key={project.id} className="resume-entry">
              <div className="resume-entry-heading">
                <h3>{project.name}</h3>
                <span>{project.category}</span>
              </div>
              <p>{project.description}</p>
              <p className="resume-project-stack">
                {project.stack.join(" · ")}
              </p>
              <a className="resume-project-link" href={project.repo}>
                {project.repo.replace("https://", "")}
              </a>
            </div>
          ))}
        </section>
      </article>
    </main>
  );
}
