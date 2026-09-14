import { ArrowUpRight, GitBranch, GraduationCap, BracketsCurly, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { profile, education, capabilities } from "@/data/portfolio";
import { Navigation } from "@/components/navigation";
import { Projects } from "@/components/projects";
import { ContactActions, FooterControls } from "@/components/contact";
import { GitHubActivity } from "@/components/github-activity";
import { AnimatedTools } from "@/components/animated-tools";
import { Hero } from "@/components/hero";
import { ExperienceSection } from "@/components/experience";
import { Recognition } from "@/components/recognition";
import { SectionMotion } from "@/components/section-motion";
import { Workflow } from "@/components/developer-scenes";
import "./portfolio-v2.css";
import "./intro-wide.css";
import "./section-details.css";

export default function Home() {
  const tools = capabilities.flatMap((group) => group.skills);

  return (
    <>
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
      <div className="folio">
        <a className="skip-link" href="#main">
          Lewati ke konten
        </a>
        <Navigation />
      </div>

      <main id="main">
        <div className="folio">
          <SectionMotion />
          <Hero />
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

        <section
          id="about"
          className="section container about-section"
          aria-labelledby="about-title"
        >
          <div className="about-grid">
            <div className="about-copy">
              <div className="section-heading">
                <span className="section-code">&lt;tentang-saya&gt;</span>
                <h2 id="about-title">
                  Lebih dari
                  <br />
                  <span>sekadar menulis kode.</span>
                </h2>
              </div>
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

        <ExperienceSection />

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

        <div className="folio">
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
            <AnimatedTools tools={tools} />
          </section>
          <Recognition />
          <GitHubActivity />
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
        </div>
      </main>
      
      <div className="folio">
        <footer className="folio-footer">
          <p>© {new Date().getFullYear()} Zakian Maulana Syaifulloh</p>
          <FooterControls />
        </footer>
      </div>
    </>
  );
}
