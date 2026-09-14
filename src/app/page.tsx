import { GithubLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import { profile, experience, education, capabilities } from "@/data/portfolio";
import { Navigation } from "@/components/navigation";
import { Projects } from "@/components/projects";
import { ContactActions, FooterControls } from "@/components/contact";
import { GitHubActivity } from "@/components/github-activity";
import { TechIcon } from "@/components/tech-icon";
import { Hero } from "@/components/hero";
import { Recognition } from "@/components/recognition";
import { SectionMotion } from "@/components/section-motion";
import "./portfolio-v2.css";
import "./intro-wide.css";
import "./section-details.css";

export default function Home() {
  const tools = capabilities.flatMap((group) => group.skills);

  return (
    <div className="folio">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: profile.name,
            jobTitle: profile.role,
            email: profile.email,
            sameAs: [profile.github, profile.linkedin],
          }).replace(/</g, "\\u003c"),
        }}
      />
      <a className="skip-link" href="#main">
        Lewati ke konten
      </a>
      <Navigation />
      <main id="main">
        <SectionMotion />
        <Hero />
        <div className="folio-infobar">
          <p>
            <strong>4+ tahun</strong> mengembangkan web
          </p>
          <p>
            IT Programmer <span>di PT Arita Prima Indonesia Tbk</span>
          </p>
          <div>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Zakian"
            >
              <GithubLogo size={20} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Zakian"
            >
              <LinkedinLogo size={20} />
            </a>
          </div>
        </div>
        <section
          id="about"
          className="folio-about"
          aria-labelledby="about-title"
        >
          <div className="folio-section-label">
            <span>01 / PROFIL</span>
            <h2 id="about-title">Kenalan dulu.</h2>
          </div>
          <div>
            <p className="folio-about-lead">
              Saya senang ketika sesuatu yang rumit akhirnya terasa sederhana.
            </p>
            <p>{profile.introduction}</p>
            <p>
              Buat saya, aplikasi yang baik dimulai dari memahami orang yang
              akan menggunakannya. Itu yang saya bawa ke setiap pekerjaan.
            </p>
          </div>
        </section>
        <div className="folio-resume-grid">
          <div className="folio-resume-aside">
            <section id="education" aria-labelledby="education-title">
              <div className="folio-section-label">
                <span>04 / PENDIDIKAN</span>
                <h2 id="education-title">Fondasi perjalanan.</h2>
              </div>
              {education.map((item) => (
                <article className="folio-school" key={item.school}>
                  <h3>{item.school}</h3>
                  <p>
                    {item.degree} · {item.period}
                  </p>
                  <span>{item.detail}</span>
                </article>
              ))}
            </section>
          </div>
          <section id="experience" aria-labelledby="experience-title">
            <div className="folio-section-label">
              <span>02 / PENGALAMAN</span>
              <h2 id="experience-title">Belajar lewat pekerjaan.</h2>
            </div>
            <div className="folio-career folio-journey">
              <span className="journey-signal" aria-hidden="true" />
              {experience.map((job) => (
                <article key={`${job.company}-${job.role}`}>
                  <div className="career-meta">
                    <span>{job.period}</span>
                    {job.current && (
                      <span className="folio-current">Saat ini</span>
                    )}
                  </div>
                  <h3>{job.company}</h3>
                  <p className="folio-job-role">{job.role}</p>
                  <p>{job.description}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
        <Recognition />
        <GitHubActivity />
        <section
          id="skills"
          className="folio-tools"
          aria-labelledby="skills-title"
        >
          <div className="folio-tools-heading">
            <span className="folio-kicker">TOOLS / STACK</span>
            <h2 id="skills-title">Alat yang saya gunakan.</h2>
            <p>
              Perangkat yang saya gunakan untuk merancang dan membangun produk
              digital.
            </p>
          </div>
          <div className="folio-tool-deck" role="list" aria-label="Tech stack">
            {tools.map((tool) => (
              <article key={tool} className="folio-tool-card" role="listitem">
                <TechIcon name={tool} size={42} />
                <span>{tool}</span>
              </article>
            ))}
          </div>
        </section>
        <section id="work" className="folio-work" aria-labelledby="work-title">
          <div className="folio-section-heading">
            <div className="folio-section-label">
              <span>05 / KARYA</span>
              <h2 id="work-title">Dari ide ke implementasi.</h2>
            </div>
            <p>
              Sistem yang saya kerjakan.
              <br />
              Eksplorasi yang terus berlanjut.
            </p>
          </div>
          <Projects />
        </section>
        <section
          id="contact"
          className="folio-contact"
          aria-labelledby="contact-title"
        >
          <div>
            <p className="folio-kicker">PUNYA PROYEK ATAU PELUANG KERJA?</p>
            <h2 id="contact-title">Mari mulai percakapan.</h2>
            <p>
              Saya siap mendengar kebutuhan tim dan cerita di balik proyekmu.
            </p>
          </div>
          <ContactActions />
        </section>
      </main>
      <footer className="folio-footer">
        <p>© {new Date().getFullYear()} Zakian Maulana Syaifulloh</p>
        <FooterControls />
      </footer>
    </div>
  );
}
