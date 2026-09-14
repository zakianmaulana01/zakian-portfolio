import { GithubLogo, LinkedinLogo, ArrowUpRight, GitBranch, GraduationCap } from "@phosphor-icons/react/dist/ssr";
import { profile, experience, education, capabilities } from "@/data/portfolio";
import { Navigation } from "@/components/navigation";
import { Projects } from "@/components/projects";
import { ContactActions, FooterControls } from "@/components/contact";
import { GitHubActivity } from "@/components/github-activity";
import { TechIcon } from "@/components/tech-icon";
import { Hero } from "@/components/hero";
import { Recognition } from "@/components/recognition";
import { SectionMotion } from "@/components/section-motion";
import { Workflow, LoopScene } from "@/components/developer-scenes";
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
          className="section container about-section"
          aria-labelledby="about-title"
        >
          <div className="section-heading">
            <span className="section-code">&lt;tentang-saya&gt;</span>
            <h2 id="about-title">
              Lebih dari
              <br />
              <span>sekadar menulis kode.</span>
            </h2>
          </div>
          <div className="about-grid">
            <div className="about-copy">
              <p className="about-lead">
                Saya senang ketika sesuatu yang rumit akhirnya terasa sederhana.
              </p>
              <p>{profile.introduction}</p>
              <p>
                Buat saya, aplikasi yang baik dimulai dari memahami orang yang
                akan menggunakannya. Itu yang saya bawa ke setiap pekerjaan.
              </p>
              <a
                href={profile.linkedin}
                className="text-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Kenal lebih dekat di LinkedIn
                <ArrowUpRight size={18} />
              </a>
            </div>
            <Workflow />
          </div>
          <span className="section-end" aria-hidden="true">
            &lt;/tentang-saya&gt;
          </span>
        </section>

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
          <LoopScene className="career-timeline">
            <span className="career-flow loop" aria-hidden="true" />
            {experience.map((job, index) => (
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
          </LoopScene>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link experience-link"
          >
            Lihat riwayat lengkap
            <ArrowUpRight size={18} />
          </a>
        </section>

        <section
          id="education"
          className="education-section"
          aria-labelledby="education-title"
        >
          <div className="container education-grid">
            <div>
              <span className="section-code">&lt;pendidikan&gt;</span>
              <h2 id="education-title">
                Fondasi untuk
                <br />
                <span>terus berkembang.</span>
              </h2>
              <code className="education-code" aria-hidden="true">
                belajar.
                <span className="syntax-keyword">tidakPernahSelesai</span>();
                <span className="code-caret loop" />
              </code>
            </div>
            <div className="education-list">
              {education.map((item) => (
                <article className="education-entry" key={item.school}>
                  <GraduationCap size={29} aria-hidden="true" />
                  <div>
                    <span className="education-period">{item.period}</span>
                    <h3>{item.school}</h3>
                    <p>{item.degree}</p>
                    <span className="education-detail">{item.detail}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

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
