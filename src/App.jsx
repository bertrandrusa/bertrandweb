import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDown, ArrowUpRight, ChevronDown, Mail } from "lucide-react";
import Lenis from "lenis";

const navItems = [
  { id: "home", label: "index" },
  { id: "about", label: "about" },
  { id: "education", label: "education" },
  { id: "skills", label: "skills" },
  { id: "experience", label: "experience" },
  { id: "portfolio", label: "projects" },
  { id: "contact", label: "contact" },
];

const skillGroups = [
  {
    mark: "AI",
    title: "AI & Data",
    skills: ["RAG systems", "Llama models", "FAISS", "LangChain", "Pandas", "OCR pipelines"],
  },
  {
    mark: "SEC",
    title: "Security Foundations",
    skills: ["Secure coding", "Authentication", "Access control", "Audit logging", "Backups & recovery", "Cybersecurity fundamentals"],
  },
  {
    mark: "SYS",
    title: "Systems & Infrastructure",
    skills: ["Linux", "Docker", "PostgreSQL", "TCP/IP & HTTP/S", "Git & CI/CD", "Windows"],
  },
  {
    mark: "DEV",
    title: "Software Engineering",
    skills: ["Python", "JavaScript / TypeScript", "React", "FastAPI", "Node.js", "SQL"],
  },
];

const experiences = [
  {
    role: "Software Engineer Intern",
    company: "TuningSQL",
    location: "Springfield, MO · Hybrid",
    date: "Jan 2026 — Apr 2026",
    summary:
      "Built reliable backend and data systems using Python, PostgreSQL, Docker, and Linux, with an emphasis on automation, auditability, backups, and recoverability.",
    bullets: [
      "Developed Python, Pandas, and SQL ETL pipelines for PDF and web data.",
      "Optimized PostgreSQL queries, indexing strategies, and schema design.",
      "Built Dockerized services and supported authenticated backup workflows, scheduled jobs, and audit logging.",
    ],
  },
  {
    role: "Resident Assistant",
    company: "Missouri State University",
    location: "Springfield, MO",
    date: "Aug 2023 — May 2026",
    summary:
      "Led a residential community of 35+ students through mentorship, programming, conflict resolution, and consistent support.",
    bullets: [
      "Planned community programs and supported student wellbeing.",
      "Resolved conflicts through clear, empathetic communication.",
      "Built an inclusive, accountable residential environment.",
    ],
  },
  {
    role: "Software Development Intern",
    company: "Rwanda Space Agency",
    location: "Kigali, Rwanda",
    date: "May 2023 — Jul 2023",
    summary:
      "Refactored frontend modules and built React interfaces for geospatial data and Earth Observation workflows.",
    bullets: [
      "Improved application load time by approximately 20%.",
      "Created reusable React components for data visualization.",
      "Collaborated on software supporting SDG-focused analytics.",
    ],
  },
];

const projects = [
  {
    number: "01",
    title: "BearChat",
    date: "2025",
    description:
      "A domain-specific AI campus assistant combining retrieval, fine-tuning, OCR, and streaming responses for Missouri State University questions.",
    tags: ["Python", "Llama", "RAG", "FAISS", "Flask"],
    href: "https://github.com/GGirishya/BearChat",
  },
  {
    number: "02",
    title: "J.A.R.V.I.S",
    date: "2026",
    description:
      "A real-time voice AI assistant with low-latency audio capture, asynchronous processing, and natural speech-to-speech interaction.",
    tags: ["Python", "FastAPI", "LangChain", "ElevenLabs"],
    href: "https://github.com/bertrandrusa/jarvis-local-ai",
  },
  {
    number: "03",
    title: "Secure Data Operations",
    date: "2026",
    description:
      "A Dockerized Linux and PostgreSQL platform with authenticated access, incremental backups, scheduled jobs, audit logging, and recovery-oriented workflows.",
    tags: ["Security", "Docker", "PostgreSQL", "Linux", "Audit Logs"],
    href: null,
  },
];

function SectionHeading({ number, title, accent, kicker }) {
  return (
    <div className="section-heading">
      <span className="section-number">{number}</span>
      <div>
        <h2>
          {title} <em>{accent}</em>
        </h2>
        <p>{kicker}</p>
      </div>
    </div>
  );
}

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [openExperience, setOpenExperience] = useState(0);
  const lenisRef = useRef(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return undefined;

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.1,
      easing: (time) => Math.min(1, 1.001 - Math.pow(2, -10 * time)),
    });

    lenisRef.current = lenis;
    let frameId;

    const frame = (time) => {
      lenis.raf(time);
      frameId = window.requestAnimationFrame(frame);
    };

    frameId = window.requestAnimationFrame(frame);

    const hashTarget = window.location.hash.slice(1);
    if (hashTarget && document.getElementById(hashTarget)) {
      window.setTimeout(() => lenis.scrollTo(`#${hashTarget}`, { offset: -78 }), 120);
    }

    return () => {
      window.cancelAnimationFrame(frameId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const sections = navItems
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-24% 0px -66% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (menuOpen) {
      lenisRef.current?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenisRef.current?.start();
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navigateTo = (event, id) => {
    event.preventDefault();
    setMenuOpen(false);

    const target = document.getElementById(id);
    if (!target) return;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset: -78, duration: 1.1 });
    } else {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    window.history.replaceState(null, "", `#${id}`);
  };

  return (
    <div className="site-shell">
      <header className="site-header">
        <a href="#home" className="wordmark" onClick={(event) => navigateTo(event, "home")}>
          Bertrand<span aria-hidden="true" />
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={activeSection === id ? "is-active" : ""}
              aria-current={activeSection === id ? "page" : undefined}
              onClick={(event) => navigateTo(event, id)}
            >
              {label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span />
          <span />
        </button>
      </header>

      <div id="mobile-menu" className={`mobile-menu ${menuOpen ? "is-open" : ""}`}>
        <nav aria-label="Mobile navigation">
          {navItems.map(({ id, label }, index) => (
            <motion.a
              key={id}
              href={`#${id}`}
              className={activeSection === id ? "is-active" : ""}
              initial={false}
              animate={menuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -22 }}
              transition={{ duration: 0.3, delay: menuOpen ? index * 0.045 : 0 }}
              onClick={(event) => navigateTo(event, id)}
            >
              <span>0{index + 1}</span>
              {label}
            </motion.a>
          ))}
        </nav>
      </div>

      <main>
        <section id="home" className="hero-section hero-grid">
          <div className="page-container hero-inner">
            <motion.div
              className="availability"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span /> Available for AI, cybersecurity, software &amp; infrastructure roles
            </motion.div>

            <div className="hero-layout">
              <div className="hero-copy">
                <motion.h1
                  initial={{ opacity: 0, y: 36 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span>Bertrand</span>
                  <span>Rusanganwa</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                >
                  <strong>AI · Software Engineering · Cybersecurity</strong>
                  Building intelligent, secure systems and protecting the software, infrastructure, and data behind them.
                </motion.p>
              </div>

              <motion.figure
                className="portrait-frame"
                initial={{ opacity: 0, scale: 0.96, rotate: 0 }}
                animate={{ opacity: 1, scale: 1, rotate: 1.4 }}
                transition={{ duration: 0.9, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  src={`${import.meta.env.BASE_URL}images/profile.jpg`}
                  alt="Bertrand Rusanganwa"
                  className="portrait-image"
                />
              </motion.figure>
            </div>

            <motion.div
              className="hero-meta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55 }}
            >
              <div>
                <span>Based in</span> <strong>Indiana, USA</strong>
                <span>©</span> <strong>2026</strong>
                <span>v.</span> <strong>02.0</strong>
              </div>
              <a href="#about" onClick={(event) => navigateTo(event, "about")}>
                Scroll <ArrowDown aria-hidden="true" />
              </a>
            </motion.div>
          </div>
        </section>

        <section id="about" className="portfolio-section">
          <div className="page-container">
            <Reveal>
              <SectionHeading
                number="02"
                title="A note"
                accent="on me"
                kicker="The short version"
              />
            </Reveal>

            <div className="about-layout">
              <Reveal className="about-lead">
                <p>
                  I build <em>intelligent, secure</em> systems—and I care how they work, how they feel, and how they hold up.
                </p>
              </Reveal>
              <Reveal className="about-body" delay={0.08}>
                <p>
                  I&apos;m Bertrand, a Computer Science graduate from Missouri State University with minors in Mathematics and Cybersecurity. I combine software engineering with AI, Linux, databases, infrastructure, and secure-system practices to build dependable technology.
                </p>
                <p>
                  My experience includes retrieval-augmented AI, Python automation, Dockerized services, PostgreSQL optimization, authenticated applications, audit logging, backups, and recovery workflows. I&apos;m growing toward security operations, cloud security, vulnerability assessment, and secure software development.
                </p>
                <a href="https://github.com/bertrandrusa/bertrandweb/raw/refs/heads/main/Bertrand_resume.pdf" target="_blank" rel="noreferrer" className="text-link">
                  Read my full resume <ArrowUpRight aria-hidden="true" />
                </a>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="education" className="portfolio-section section-tint">
          <div className="page-container">
            <Reveal>
              <SectionHeading
                number="03"
                title="What I"
                accent="studied"
                kicker="A technical foundation with range"
              />
            </Reveal>

            <Reveal className="education-card">
              <div className="education-index">01 / 01</div>
              <div>
                <p className="education-school">Missouri State University</p>
                <h3>B.S. Computer Science</h3>
                <p>Minors in Mathematics &amp; Cybersecurity · Focused on operating systems, secure computing, and technical problem solving</p>
              </div>
              <dl>
                <div>
                  <dt>Tenure</dt>
                  <dd>2022 — 2026</dd>
                </div>
                <div>
                  <dt>Recognition</dt>
                  <dd>4× Dean&apos;s List</dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </section>

        <section id="skills" className="portfolio-section">
          <div className="page-container">
            <Reveal>
              <SectionHeading
                number="04"
                title="Capabilities"
                accent="across systems"
                kicker="AI, security, infrastructure & software"
              />
            </Reveal>

            <div className="skill-groups">
              {skillGroups.map((group, index) => (
                <motion.article
                  key={group.title}
                  className="skill-group"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: index * 0.07 }}
                >
                  <div className="skill-group-heading">
                    <span>{group.mark}</span>
                    <h3>{group.title}</h3>
                  </div>
                  <ul>
                    {group.skills.map((skill) => <li key={skill}>{skill}</li>)}
                  </ul>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="portfolio-section section-tint">
          <div className="page-container">
            <Reveal>
              <SectionHeading
                number="05"
                title="Where I&apos;ve"
                accent="worked"
                kicker="A reverse-chronological tour"
              />
            </Reveal>

            <div className="experience-list">
              {experiences.map((item, index) => {
                const isOpen = openExperience === index;
                return (
                  <motion.article
                    key={`${item.company}-${item.role}`}
                    layout
                    className={`experience-item ${isOpen ? "is-open" : ""}`}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenExperience(isOpen ? -1 : index)}
                    >
                      <span className="experience-number">0{index + 1}</span>
                      <span className="experience-title">
                        <strong>{item.role}</strong>
                        <small>{item.company} · {item.location}</small>
                      </span>
                      <span className="experience-date">{item.date}</span>
                      <ChevronDown aria-hidden="true" />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          className="experience-details"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <div>
                            <p>{item.summary}</p>
                            <ul>
                              {item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="portfolio" className="portfolio-section">
          <div className="page-container">
            <Reveal>
              <SectionHeading
                number="06"
                title="Selected"
                accent="work"
                kicker="AI systems, secure infrastructure & useful software"
              />
            </Reveal>

            <div className="projects-grid">
              {projects.map((project, index) => {
                const Card = project.href ? motion.a : motion.article;
                const linkProps = project.href
                  ? { href: project.href, target: "_blank", rel: "noreferrer" }
                  : {};

                return (
                  <Card
                    key={project.title}
                    {...linkProps}
                    className="project-card"
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.65, delay: index * 0.08 }}
                  >
                    <div className="project-topline">
                      <span>{project.number}</span>
                      <span>{project.date}</span>
                    </div>
                    <div className="project-visual">
                      <span>{project.title.slice(0, 2).toUpperCase()}</span>
                    </div>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-tags">
                      {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                    <div className="project-action">
                      {project.href ? "View on GitHub" : "Private project"}
                      {project.href && <ArrowUpRight aria-hidden="true" />}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section hero-grid">
          <div className="page-container">
            <Reveal>
              <SectionHeading
                number="07"
                title="Get in"
                accent="touch"
                kicker="The last section"
              />
            </Reveal>

            <Reveal className="contact-content" delay={0.08}>
              <h3>
                Let&apos;s build something <em>worth remembering.</em>
              </h3>
              <p>I&apos;m open to AI, cybersecurity, software engineering, cloud, and infrastructure opportunities.</p>

              <div className="contact-links">
                <a href="mailto:rusanganwabertrand10@gmail.com">
                  <span>01</span>
                  <small>Email</small>
                  <strong>rusanganwabertrand10@gmail.com</strong>
                  <Mail aria-hidden="true" />
                </a>
                <a href="https://www.linkedin.com/in/bertrand-rusanganwa-433607276/" target="_blank" rel="noreferrer">
                  <span>02</span>
                  <small>LinkedIn</small>
                  <strong>in/bertrand-rusanganwa</strong>
                  <ArrowUpRight aria-hidden="true" />
                </a>
                <a href="https://github.com/bertrandrusa" target="_blank" rel="noreferrer">
                  <span>03</span>
                  <small>GitHub</small>
                  <strong>@bertrandrusa</strong>
                  <ArrowUpRight aria-hidden="true" />
                </a>
              </div>
            </Reveal>

            <footer>
              <span>© 2025 — All rights reserved</span>
              <span>Designed &amp; built by Bertrand</span>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}
