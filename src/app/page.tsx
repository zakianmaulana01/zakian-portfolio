import {
  ArrowUpRight,
  ArrowRight,
  Code,
  Database,
  MapPin,
  GithubLogo,
  LinkedinLogo,
  GraduationCap,
  FileText,
  ArrowDown,
  GitBranch,
  BracketsCurly,
} from "@phosphor-icons/react/dist/ssr";
import { profile, experience, capabilities, education } from "@/data/portfolio";
import { Navigation } from "@/components/navigation";
import { MagneticLink } from "@/components/motion";
import { Projects } from "@/components/projects";
import { ContactActions, FooterControls } from "@/components/contact";
import {
  CodeIntro,
  TypewriterRole,
  Workflow,
  StackDiagram,
  LoopScene,
  ContactSignal,
} from "@/components/developer-scenes";

export default function Home() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    email: profile.email,
    sameAs: [profile.github, profile.linkedin],
    homeLocation: { "@type": "Place", name: profile.location },
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(person).replace(/</g, "\\u003c"),
        }}
      />
      <a className="skip-link" href="#main">
        Lewati ke konten
      </a>
      <Navigation />
      <main id="main">
        <section id="home" className="hero" aria-labelledby="hero-title">
          <div className="hero-dot-field" aria-hidden="true" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="hero-eyebrow">
                <span className="code-slash">{"//"}</span> KENALAN DULU, YUK.
              </div>
              <h1 id="hero-title">
                Halo, saya
                <br />
                <span>
                  Zakian
                  <span className="hero-cursor loop" aria-hidden="true">
                    _
                  </span>
                </span>
              </h1>
              <p className="hero-fullname">Zakian Maulana Syaifulloh</p>
              <TypewriterRole />
              <p className="hero-summary">{profile.summary}</p>
              <div className="hero-actions">
                <MagneticLink href="/resume" className="button button-primary">
                  <FileText size={19} />
                  Lihat CV saya
                  <ArrowUpRight size={18} />
                </MagneticLink>
                <a href="#work" className="hero-project-link">
                  Jelajahi proyek
                  <ArrowDown size={18} />
                </a>
              </div>
              <div className="hero-socials">
                <span>
                  <MapPin size={16} />
                  {profile.location}
                </span>
                <span className="social-divider" />
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Zakian"
                >
                  <GithubLogo size={21} />
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Zakian"
                >
                  <LinkedinLogo size={21} />
                </a>
              </div>
            </div>
            <CodeIntro />
          </div>
          <div className="container hero-bottom">
            <div className="hero-metric">
              <strong>
                4<span>+</span>
              </strong>
              <span>
                tahun pengalaman
                <br />
                mengembangkan web
              </span>
            </div>
            <div className="hero-metric">
              <span className="metric-symbol">
                <BracketsCurly size={30} />
              </span>
              <span>
                Dari logika bisnis
                <br />
                sampai antarmuka
              </span>
            </div>
            <div className="hero-metric">
              <span className="metric-symbol">
                <GitBranch size={29} />
              </span>
              <span>
                Terus membangun.
                <br />
                Terus belajar.
              </span>
            </div>
            <a href="#about" className="hero-next">
              Tentang saya
              <ArrowRight size={20} />
            </a>
          </div>
        </section>

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
          id="skills"
          className="section skills-section"
          aria-labelledby="skills-title"
        >
          <div className="container">
            <div className="section-heading">
              <span className="section-code">&lt;keahlian&gt;</span>
              <h2 id="skills-title">
                Di balik layar,
                <br />
                <span>ini alat tempur saya.</span>
              </h2>
            </div>
            <div className="skills-grid">
              <StackDiagram />
              <div className="capabilities">
                {capabilities.map((capability, index) => (
                  <article key={capability.title} className="capability">
                    <div className="capability-title">
                      <span className="capability-icon">
                        {index === 0 ? (
                          <Code size={25} />
                        ) : (
                          <Database size={25} />
                        )}
                      </span>
                      <div>
                        <span className="capability-category">
                          {index === 0 ? "FRONTEND" : "BACKEND & DATABASE"}
                        </span>
                        <h3>{capability.title}</h3>
                      </div>
                    </div>
                    <p>{capability.description}</p>
                    <div className="skill-list">
                      {capability.skills.map((skill) => (
                        <span key={skill}>{skill}</span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
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

        <section
          id="work"
          className="section container work-section"
          aria-labelledby="work-title"
        >
          <div className="section-heading">
            <span className="section-code">&lt;proyek-pilihan&gt;</span>
            <h2 id="work-title">
              Idenya jadi nyata.
              <br />
              <span>Kodenya bisa dilihat.</span>
            </h2>
            <p className="section-description">
              Beberapa hal yang saya bangun, dari kebutuhan sampai implementasi.
            </p>
          </div>
          <Projects />
          <span className="section-end" aria-hidden="true">
            &lt;/proyek-pilihan&gt;
          </span>
        </section>

        <section
          id="contact"
          className="contact-section"
          aria-labelledby="contact-title"
        >
          <div className="container contact-layout">
            <div>
              <span className="section-code">&lt;mulai-percakapan&gt;</span>
              <h2 id="contact-title">
                Punya ide?
                <br />
                <span>Kita ngobrol, yuk.</span>
              </h2>
              <p>
                Ada posisi yang cocok atau proyek menarik?
                <br />
                Saya siap mendengar ceritanya.
              </p>
              <ContactActions />
              <div className="social-links">
                <MagneticLink
                  external
                  href={profile.linkedin}
                  className="social-link"
                >
                  <LinkedinLogo size={20} />
                  LinkedIn
                  <ArrowUpRight size={17} />
                </MagneticLink>
                <MagneticLink
                  external
                  href={profile.github}
                  className="social-link"
                >
                  <GithubLogo size={20} />
                  GitHub
                  <ArrowUpRight size={17} />
                </MagneticLink>
              </div>
            </div>
            <div className="contact-art" aria-hidden="true">
              <ContactSignal />
              <code>
                halo.<span>kirim</span>();
              </code>
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer container">
        <div>
          <a href="#home" className="wordmark" aria-label="Kembali ke beranda">
            zakian<span>.dev</span>
          </a>
          <p>© {new Date().getFullYear()} Zakian Maulana Syaifulloh</p>
        </div>
        <span className="footer-note">
          Dibangun dengan rasa ingin tahu
          <span className="footer-code" aria-hidden="true">
            {"</>"}
          </span>
        </span>
        <FooterControls />
      </footer>
    </>
  );
}
