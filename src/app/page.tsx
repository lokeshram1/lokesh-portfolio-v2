"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { portfolioContent } from "./portfolio-content";

const profileLinks = [
  { label: "LinkedIn", href: portfolioContent.links.linkedin, icon: "linkedin" },
  { label: "GitHub", href: portfolioContent.links.github, icon: "github" },
];

const socialLinks = [...profileLinks, { label: "Email", href: portfolioContent.links.email, icon: "email" }];
const heroEyebrow = "AI/ML ENGINEER · DATA ENGINEER";
const heroGreeting = "Hi, I'm Lokesh.";
const heroIntroduction = "I enjoy early-morning runs, getting lost in a good book, and turning curious ideas into practical AI tools.";
const headlinePhrases = ["Building useful AI systems.", "Turning ideas into working tools.", "Always curious. Always building."];

const sections = [
  { id: "about", label: "ABOUT ME", kicker: "ABOUT ME" },
  { id: "projects", label: "FEATURED PROJECTS", kicker: "FEATURED PROJECTS" },
  { id: "skills", label: "SKILLS", kicker: "SKILLS" },
  { id: "experience", label: "EXPERIENCE", kicker: "EXPERIENCE" },
  { id: "education", label: "EDUCATION", kicker: "EDUCATION" },
  { id: "writing", label: "TECHNICAL WRITING", kicker: "TECHNICAL WRITING" },
  { id: "contact", label: "CONTACT", kicker: "CONTACT" },
] as const;
type SectionId = (typeof sections)[number]["id"];
const { projects, skillGroups, education, writing } = portfolioContent;

const experience = [
  {
    title: "Applied AI/ML Engineer",
    company: "American College of Emergency Physicians (ACEP)",
    date: "Aug 2025 — Jan 2026",
    bullets: [
      "Built AskEMDI, an LLM-powered natural-language-to-SQL platform using Amazon Bedrock and Anthropic Claude for emergency medicine research.",
      "Engineered Azure Data Factory and Synapse pipelines for a 23M+ encounter dataset, with Python and SQL quality checks before data reached AI and analytics workflows.",
      "Worked with clinicians and operations stakeholders to turn research questions into usable query workflows and iterate on prototypes.",
    ],
  },
  {
    title: "Research Assistant (Machine Learning)",
    company: "SEAR Lab",
    date: "Aug 2024 — May 2025",
    bullets: [
      "Built Python and SQL pipelines for 500K+ time-series sensor records, preparing model-ready data through cleaning, feature engineering, and transformation.",
      "Developed XGBoost and ARIMA models to analyze operational performance, contributing to a 15% improvement in production efficiency in the research environment.",
      "Automated reporting workflows and developed Power BI dashboards, reducing KPI reporting time by 40%.",
    ],
  },
];

function SocialIcon({ name }: { name: string }) {
  const paths: Record<string, React.ReactNode> = {
    linkedin: <><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4v12H3z"/><path d="M9 9.5h3.8v1.64h.06c.53-.95 1.82-1.95 3.75-1.95 4 0 4.74 2.63 4.74 6.05v6.26h-4v-5.55c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.13 1.44-2.13 2.93v5.65H9z"/></>,
    github: <path d="M12 .8a11.2 11.2 0 0 0-3.54 21.83c.56.1.77-.24.77-.54v-2.1c-3.13.68-3.79-1.33-3.79-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 .1.76-1.26 3.42-1.73.1-.72.4-1.21.72-1.49-2.5-.28-5.13-1.25-5.13-5.56 0-1.23.44-2.24 1.16-3.03-.12-.28-.5-1.43.11-2.99 0 0 .94-.3 3.08 1.16a10.7 10.7 0 0 1 5.6 0c2.14-1.46 3.08-1.16 3.08-1.16.61 1.56.23 2.71.11 2.99.72.79 1.16 1.8 1.16 3.03 0 4.32-2.64 5.28-5.15 5.56.41.35.77 1.04.77 2.1v3.12c0 .3.2.65.78.54A11.2 11.2 0 0 0 12 .8Z"/>,
    email: <><rect x="2.5" y="4.5" width="19" height="15" rx="1.5"/><path d="m3.5 6 8.5 7 8.5-7"/></>,
  };
  return <svg aria-hidden="true" focusable="false" className="social-icon" viewBox="0 0 24 24" fill={name === "email" ? "none" : "currentColor"} stroke={name === "email" ? "currentColor" : "none"} strokeWidth="1.6">{paths[name]}</svg>;
}

function AccordionHeading({
  id,
  label,
  kicker,
  index,
  expanded,
  onClick,
}: {
  id: SectionId;
  label: string;
  kicker: string;
  index: number;
  expanded: boolean;
  onClick: () => void;
}) {
  return (
    <h2 className="section-heading accordion-heading">
      <button
        id={`${id}-trigger`}
        className="accordion-trigger"
        type="button"
        aria-expanded={expanded}
        aria-controls={`${id}-panel`}
        aria-label={`${expanded ? "Collapse" : "Expand"} ${label.toLowerCase()} section`}
        onClick={onClick}
      >
        <span className="section-kicker">0{index} / {kicker}</span>
        <span className="accordion-heading-title">{label}</span>
        <span className={`accordion-chevron${expanded ? " is-expanded" : ""}`} aria-hidden="true" />
      </button>
    </h2>
  );
}

type HeroProps = {
  expandedSection: SectionId | null;
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  reducedMotion: boolean | null;
  navigateToSection: (id: SectionId) => void;
  setExpandedSection: React.Dispatch<React.SetStateAction<SectionId | null>>;
};

function Hero({
  expandedSection,
  menuOpen,
  setMenuOpen,
  reducedMotion,
  navigateToSection,
  setExpandedSection,
}: HeroProps) {
  const [tagline, setTagline] = useState("");

  useEffect(() => {
    if (reducedMotion !== false) return;

    let cancelled = false;
    const timers = new Set<number>();
    const schedule = (callback: () => void, delay: number) => {
      const timer = window.setTimeout(() => {
        timers.delete(timer);
        if (!cancelled) callback();
      }, delay);
      timers.add(timer);
    };
    let phraseIndex = 0;
    let position = 0;
    let deleting = false;
    const tick = () => {
      const phrase = headlinePhrases[phraseIndex];
      position += deleting ? -1 : 1;
      setTagline(phrase.slice(0, position));
      if (!deleting && position === phrase.length) {
        deleting = true;
        schedule(tick, 2500);
      } else if (deleting && position === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % headlinePhrases.length;
        schedule(tick, 420);
      } else {
        const punctuationPause = !deleting && /[,.]/.test(phrase[position - 1]) ? 150 : 0;
        schedule(tick, (deleting ? 42 : 86) + punctuationPause);
      }
    };
    schedule(tick, 650);

    return () => {
      cancelled = true;
      timers.forEach((timer) => window.clearTimeout(timer));
      timers.clear();
    };
  }, [reducedMotion]);

  const measureTagline = headlinePhrases.reduce((longest, phrase) => phrase.length > longest.length ? phrase : longest, "");
  const visibleTagline = reducedMotion === true ? headlinePhrases[0] : tagline;

  return (
    <section id="hero" className="hero snap-section">
      <div className="hero-network" aria-hidden="true"><svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="network-line" x1="0" x2="1"><stop offset="0" stopColor="#5d9fa5" stopOpacity="0"/><stop offset=".5" stopColor="#5d9fa5" stopOpacity=".22"/><stop offset="1" stopColor="#5d9fa5" stopOpacity="0"/></linearGradient></defs><g className="network-paths" fill="none" stroke="url(#network-line)" strokeWidth="1"><path d="M-40 590 185 410 410 505 630 300 835 410 1050 210 1480 335"/><path d="M-30 315 200 440 385 260 605 430 825 235 1030 420 1240 295 1480 520"/><path d="M90 860 260 650 500 700 715 525 930 660 1160 525 1400 710"/></g><g className="network-nodes" fill="#5d9fa5"><circle cx="185" cy="410" r="3"/><circle cx="410" cy="505" r="2.5"/><circle cx="630" cy="300" r="3"/><circle cx="835" cy="410" r="2.5"/><circle cx="1050" cy="210" r="3"/><circle cx="200" cy="440" r="2.5"/><circle cx="385" cy="260" r="3"/><circle cx="605" cy="430" r="2.5"/><circle cx="825" cy="235" r="3"/><circle cx="1030" cy="420" r="2.5"/><circle cx="500" cy="700" r="3"/><circle cx="715" cy="525" r="2.5"/><circle cx="930" cy="660" r="3"/></g></svg></div>
      <div className="hero-orbit orbit-one" />
      <div className="hero-orbit orbit-two" />
      <div className="hero-content">
        <div className="portrait-frame"><Image className="profile-photo" src="/profile.jpg" alt="Lokesh Ram Hariram in a navy suit outdoors" width={1000} height={1328} priority sizes="(max-width: 620px) 100px, 128px" /></div>
        <p className="eyebrow hero-eyebrow">{heroEyebrow}</p>
        <h1>{heroGreeting}</h1>
        <p className="hero-personal">{heroIntroduction}</p>
        <p className="hero-typewriter" aria-label={`Rotating taglines: ${headlinePhrases.join(" ")}`}><span className="headline-measure" aria-hidden="true">{measureTagline}</span><span className="headline-live" aria-hidden="true">{visibleTagline}{reducedMotion === false && <span className="cursor">|</span>}</span></p>
        <nav className={`hero-nav${menuOpen ? " is-open" : ""}`} aria-label="Main navigation">
          {sections.map(({ id, label }, index) => (
            <a key={id} aria-label={`${String(index + 1).padStart(2, "0")} / ${label}`} className={expandedSection === id ? "active" : ""} aria-current={expandedSection === id ? "location" : undefined} href={`#${id}`} onClick={(event) => { event.preventDefault(); navigateToSection(id); }}>{String(index + 1).padStart(2, "0")} / {label}</a>
          ))}
        </nav>
        <button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label="Toggle navigation"><span /><span /></button>
      </div>
      <a className="home-button" href="#hero" aria-label="Back to home" onClick={(event) => { event.preventDefault(); setExpandedSection(null); document.getElementById("hero")?.scrollIntoView({ behavior: reducedMotion === false ? "smooth" : "auto" }); }}><span aria-hidden="true">⌂</span></a>
    </section>
  );
}

export default function Home() {
  const [expandedSection, setExpandedSection] = useState<SectionId | null>(null);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState<boolean | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const scrollToSection = (id: SectionId) => {
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({
        behavior: reducedMotion === false ? "smooth" : "auto",
        block: "start",
      });
    });
  };
  const navigateToSection = (id: SectionId) => {
    setExpandedSection(id);
    if (id !== "projects") setExpandedProject(null);
    closeMenu();
    scrollToSection(id);
  };
  const toggleSection = (id: SectionId) => {
    if (expandedSection === id) {
      setExpandedSection(null);
      if (id === "projects") setExpandedProject(null);
    } else {
      setExpandedSection(id);
      if (id !== "projects") setExpandedProject(null);
    }
    scrollToSection(id);
  };

  return (
    <>
      <header className="topbar" aria-label="Social and contact links">
        <div className="social-links">
          {socialLinks.map((link) => (
            <a key={link.label} href={link.href} title={link.label} aria-label={link.label} {...(link.href.startsWith("https:") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
              <SocialIcon name={link.icon} />
            </a>
          ))}
        </div>
        <a className="contact-shortcut" href="#contact" onClick={(event) => { event.preventDefault(); navigateToSection("contact"); }}><span className="envelope" aria-hidden="true">✉</span> Get in touch</a>
      </header>

      <main className="page-scroll">
        <Hero key={reducedMotion === null ? "motion-pending" : reducedMotion ? "reduced-motion" : "motion-enabled"} expandedSection={expandedSection} menuOpen={menuOpen} setMenuOpen={setMenuOpen} reducedMotion={reducedMotion} navigateToSection={navigateToSection} setExpandedSection={setExpandedSection} />

        <section id="about" className={`accordion-section content-section about-section${expandedSection === "about" ? " is-expanded" : ""}`}>
          <AccordionHeading id="about" label="ABOUT ME" kicker="ABOUT ME" index={1} expanded={expandedSection === "about"} onClick={() => toggleSection("about")} />
          <div id="about-panel" className="accordion-panel" aria-labelledby="about-trigger" hidden={expandedSection !== "about"}>
           <div className="about-layout">
            <div className="about-portrait"><div className="about-orbit" /><span>LRH</span><small>AI · DATA · SYSTEMS</small></div>
            <div className="about-copy">
              <p className="eyebrow">HERE IS A LITTLE BACKGROUND</p>
              <h3>Turning complex data into useful tools.</h3>
              <p>I enjoy working on practical problems where language, data, and software meet. My work has included an LLM-powered natural-language-to-SQL platform, data pipelines, predictive ML models, and an API verification workflow.</p>
              <p>I like turning requirements into working, testable systems—from discovery and prototyping through integration, validation, and a clear handoff. Outside engineering, I enjoy early-morning runs and getting lost in a good book.</p>
              <a className="resume-button" href="/Lokesh-Ram-Resume.pdf" target="_blank" rel="noopener noreferrer" aria-label="View Lokesh Ram Hariram’s résumé as a PDF">View My Resume <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          </div>
        </section>

        <section id="projects" className={`accordion-section content-section projects-section${expandedSection === "projects" ? " is-expanded" : ""}`}>
          <AccordionHeading id="projects" label="FEATURED PROJECTS" kicker="FEATURED PROJECTS" index={2} expanded={expandedSection === "projects"} onClick={() => toggleSection("projects")} />
          <div id="projects-panel" className="accordion-panel" aria-labelledby="projects-trigger" hidden={expandedSection !== "projects"}>
          <div className="project-list">
            {projects.map((project) => (
              <article className="project-card" key={project.number}>
                <div className={`project-art art-${project.motif}`}><Image src={project.image} alt={`Conceptual workflow illustration: ${project.diagram}`} fill sizes="(max-width: 620px) 92vw, (max-width: 900px) 32vw, 24vw"/></div>
                <div className="project-copy"><span className="project-number">{project.category}</span><h3>{project.title}</h3><p>{project.description}</p><ul className="project-stack">{project.stack.map((item) => <li key={item}>{item}</li>)}</ul></div>
                <div className="project-links">
                  <a href={project.caseStudy} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} case study`}>Case study <span aria-hidden="true">↗</span></a>
                  {"github" in project && <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} GitHub`}>GitHub <span aria-hidden="true">↗</span></a>}
                  <button id={`project-details-trigger-${project.number}`} className="project-detail-trigger" type="button" aria-expanded={expandedProject === project.number} aria-controls={`project-details-${project.number}`} onClick={() => setExpandedProject((current) => current === project.number ? null : project.number)}>
                    {expandedProject === project.number ? "Close details" : "Project details"}<span className={`accordion-chevron${expandedProject === project.number ? " is-expanded" : ""}`} aria-hidden="true" />
                  </button>
                </div>
                <div id={`project-details-${project.number}`} className="project-detail-panel" aria-labelledby={`project-details-trigger-${project.number}`} hidden={expandedProject !== project.number}>
                  {project.caseStudyDetails.map((detail) => (
                    <section className="project-detail-block" key={detail.heading}>
                      <h4>{detail.heading}</h4>
                      {"body" in detail && <p>{detail.body}</p>}
                      {"bullets" in detail && <ul>{detail.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
                    </section>
                  ))}
                </div>
              </article>
            ))}
          </div>
          </div>
        </section>

        <section id="skills" className={`accordion-section content-section skills-section${expandedSection === "skills" ? " is-expanded" : ""}`}>
          <AccordionHeading id="skills" label="SKILLS" kicker="SKILLS" index={3} expanded={expandedSection === "skills"} onClick={() => toggleSection("skills")} />
          <div id="skills-panel" className="accordion-panel" aria-labelledby="skills-trigger" hidden={expandedSection !== "skills"}>
          <p className="skills-hint">{portfolioContent.skillsIntro}</p>
          <div className="skill-group-grid">
            {skillGroups.map((group, index) => (
              <article className="skill-group-card" key={group.name}>
                <span className="skill-group-index">0{index + 1}</span>
                <h3>{group.name}</h3>
                <ul>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
              </article>
            ))}
          </div>
          </div>
        </section>

        <section id="experience" className={`accordion-section content-section experience-section${expandedSection === "experience" ? " is-expanded" : ""}`}>
          <AccordionHeading id="experience" label="EXPERIENCE" kicker="EXPERIENCE" index={4} expanded={expandedSection === "experience"} onClick={() => toggleSection("experience")} />
          <div id="experience-panel" className="accordion-panel" aria-labelledby="experience-trigger" hidden={expandedSection !== "experience"}>
          <p className="source-note">Experience details are retained from the existing résumé-based content and have not been verified against the live portfolio’s expanded Experience panel.</p>
          <div className="experience-list">
            {experience.map((job, index) => (
              <article className="experience-card" key={job.company}>
                <div className="exp-index">0{index + 1}</div>
                <div className="exp-main"><p className="eyebrow">{job.date}</p><h3>{job.title}</h3><p className="company">{job.company}</p>
                  <ul>{job.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
                </div>
                <span className="exp-arrow" aria-hidden="true">↗</span>
              </article>
            ))}
          </div>
          </div>
        </section>

        <section id="education" className={`accordion-section content-section education-section${expandedSection === "education" ? " is-expanded" : ""}`}>
          <AccordionHeading id="education" label="EDUCATION" kicker="EDUCATION" index={5} expanded={expandedSection === "education"} onClick={() => toggleSection("education")} />
          <div id="education-panel" className="accordion-panel" aria-labelledby="education-trigger" hidden={expandedSection !== "education"}>
            <div className="education-list">
              {education.map((item) => <div key={item.degree}><span>{item.date.toUpperCase()}</span><strong>{item.degree}</strong><small>{item.institution}</small></div>)}
            </div>
          </div>
        </section>

        <section id="writing" className={`accordion-section content-section writing-section${expandedSection === "writing" ? " is-expanded" : ""}`}>
          <AccordionHeading id="writing" label="TECHNICAL WRITING" kicker="TECHNICAL WRITING" index={6} expanded={expandedSection === "writing"} onClick={() => toggleSection("writing")} />
          <div id="writing-panel" className="accordion-panel" aria-labelledby="writing-trigger" hidden={expandedSection !== "writing"}>
            <p className="writing-intro">{portfolioContent.writingIntro}</p>
            <div className="writing-list">
              {writing.map((item, index) => (
                <article className="writing-card" key={item.title}>
                  <span className="project-number">0{index + 1} / DRAFT OUTLINE</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className={`accordion-section content-section contact-section${expandedSection === "contact" ? " is-expanded" : ""}`}>
          <AccordionHeading id="contact" label="CONTACT" kicker="CONTACT" index={7} expanded={expandedSection === "contact"} onClick={() => toggleSection("contact")} />
          <div id="contact-panel" className="accordion-panel contact-panel" aria-labelledby="contact-trigger" hidden={expandedSection !== "contact"}>
            <div className="contact-orbit" />
            <div className="contact-content"><p className="eyebrow">{portfolioContent.contact.eyebrow}</p><h3>{portfolioContent.contact.heading}</h3><p className="contact-description">{portfolioContent.contact.description}</p><a className="email-link" href={portfolioContent.links.email}>Get in touch <span aria-hidden="true">↗</span></a><div className="contact-profiles">{profileLinks.map((link) => <a href={link.href} key={link.label} target="_blank" rel="noopener noreferrer">{link.label} <span aria-hidden="true">↗</span></a>)}<a href="/Lokesh-Ram-Resume.pdf" target="_blank" rel="noopener noreferrer">Résumé <span aria-hidden="true">↗</span></a></div></div>
            <footer>© {new Date().getFullYear()} LOKESH RAM HARIRAM <span>BUILT WITH CARE</span></footer>
          </div>
        </section>
      </main>
    </>
  );
}
