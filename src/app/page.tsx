"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { portfolioContent } from "./portfolio-content";

const profileLinks = [
  { label: "LinkedIn", href: portfolioContent.links.linkedin, icon: "linkedin" },
  { label: "GitHub", href: portfolioContent.links.github, icon: "github" },
];

const socialLinks = [...profileLinks, { label: "Email", href: portfolioContent.links.email, icon: "email" }];
const heroEyebrow = "AI/ML ENGINEER · DATA ENGINEER";
const headlinePhrases = ["Hi, I'm Lokesh.", "I like morning runs.", "I turn ideas into working tools.", "Getting lost in a good book.", "I'm always curious to build."];

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

function goToSlide(track: HTMLDivElement | null, index: number, reducedMotion: boolean) {
  const slide = track?.children.item(index);
  if (slide instanceof HTMLElement) {
    track?.scrollTo({ left: slide.offsetLeft, behavior: reducedMotion ? "auto" : "smooth" });
  }
}

function activeSlide(track: HTMLDivElement | null) {
  if (!track) return 0;
  const slides = Array.from(track.children);
  return slides.reduce((best, slide, index) => {
    const currentDistance = Math.abs((slide as HTMLElement).offsetLeft - track.scrollLeft);
    const bestDistance = Math.abs((slides[best] as HTMLElement).offsetLeft - track.scrollLeft);
    return currentDistance < bestDistance ? index : best;
  }, 0);
}

const experience = [
  {
    number: "01",
    title: "Applied AI/ML Engineer",
    company: "American College of Emergency Physicians (ACEP)",
    location: "Irving, TX",
    description: "Built AskEMDI, an LLM-powered natural-language-to-SQL platform using Amazon Bedrock and Anthropic Claude, enabling emergency physicians and researchers to query structured emergency-medicine data without writing SQL.",
    achievements: ["23M+ encounters processed", "LLM-powered natural-language-to-SQL"],
    technologies: ["Amazon Bedrock", "Anthropic Claude", "Azure Data Factory", "Azure Synapse", "Python", "SQL"],
    details: [
      "Built AskEMDI, an LLM-powered natural-language-to-SQL platform using Amazon Bedrock and Anthropic Claude for emergency medicine research.",
      "Engineered Azure Data Factory and Synapse pipelines for a 23M+ encounter dataset, with Python and SQL quality checks before data reached AI and analytics workflows.",
      "Worked with clinicians and operations stakeholders to turn research questions into usable query workflows and iterate on prototypes.",
    ],
  },
  {
    number: "02",
    title: "Research Assistant (Machine Learning)",
    company: "SEAR Lab",
    location: "Arlington, TX",
    description: "Built Python and SQL data pipelines for 500K+ time-series sensor records, covering data cleaning, feature engineering, and transformation to produce model-ready datasets for predictive modeling and operational analysis.",
    achievements: ["500K+ sensor records", "40% less KPI reporting time", "15% production-efficiency improvement"],
    technologies: ["Python", "SQL", "XGBoost", "ARIMA", "Matplotlib", "Power BI"],
    details: [
      "Built Python and SQL pipelines for 500K+ time-series sensor records, preparing model-ready data through cleaning, feature engineering, and transformation.",
      "Developed XGBoost and ARIMA models to analyze operational performance, contributing to a 15% improvement in production efficiency in the research environment.",
      "Automated reporting workflows and developed Power BI dashboards, reducing KPI reporting time by 40%.",
    ],
  },
  {
    number: "03",
    title: "Operations Analyst",
    company: "AIESEC",
    description: "Analyzed operational performance data and KPIs using Excel and SQL, identifying process inefficiencies that improved productivity by 15% and reduced operational costs by 10% through data-driven process optimization.",
    achievements: ["15% productivity improvement", "10% lower operating costs", "95% KPI attainment"],
    technologies: ["Excel", "SQL", "Google Cloud Platform"],
    details: [
      "Analyzed operational performance data and KPIs using Excel and SQL, identifying process inefficiencies that improved productivity by 15% and reduced operational costs by 10% through data-driven process optimization.",
      "Built KPI dashboards and automated reporting workflows, collaborating with cross-functional teams to achieve 95% KPI attainment and align analytics insights with organizational performance objectives.",
      "Maintained cloud-based operational datasets on Google Cloud Platform (GCP), ensuring data accuracy, improving accessibility for analytics reporting, and supporting Agile-driven operational initiatives.",
    ],
  },
];

function SocialIcon({ name }: { name: string }) {
  const paths: Record<string, React.ReactNode> = {
    linkedin: <><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4v12H3z"/><path d="M9 9.5h3.8v1.64h.06c.53-.95 1.82-1.95 3.75-1.95 4 0 4.74 2.63 4.74 6.05v6.26h-4v-5.55c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.13 1.44-2.13 2.93v5.65H9z"/></>,
    github: <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.492.998.108-.776.418-1.305.762-1.605-2.665-.3-5.467-1.333-5.467-5.931 0-1.31.468-2.381 1.236-3.221-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.655 1.653.243 2.873.12 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.807 5.628-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .319.216.694.825.576C20.565 22.092 24 17.594 24 12.297c0-6.627-5.373-12-12-12Z"/>,
    email: <><rect x="2.5" y="4.5" width="19" height="15" rx="1.5"/><path d="m3.5 6 8.5 7 8.5-7"/></>,
  };
  return <svg aria-hidden="true" focusable="false" className="social-icon" viewBox="0 0 24 24" fill={name === "email" ? "none" : "currentColor"} stroke={name === "email" ? "currentColor" : "none"} strokeWidth="1.6">{paths[name]}</svg>;
}

function SectionHeading({
  id,
  label,
  kicker,
  index,
}: {
  id: SectionId;
  label: string;
  kicker: string;
  index: number;
}) {
  return (
    <header className="portfolio-heading" id={`${id}-heading`}>
      <span className="section-kicker">{String(index).padStart(2, "0")} / {kicker}</span>
      <h2 className="portfolio-heading-title">{label}</h2>
    </header>
  );
}

function CarouselNav({
  label,
  count,
  index,
  onSelect,
  onPrevious,
  onNext,
}: {
  label: string;
  count: number;
  index: number;
  onSelect: (index: number) => void;
  onPrevious: () => void;
  onNext: () => void;
}) {
  return (
    <div className="carousel-controls" aria-label={`${label} carousel controls`}>
      <button type="button" onClick={onPrevious} aria-label={`Previous ${label}`} className="carousel-arrow">←</button>
      <div className="carousel-dots" role="group" aria-label={`Choose ${label}`}>
        {Array.from({ length: count }, (_, i) => <button type="button" key={i} className={`carousel-dot${i === index ? " is-active" : ""}`} aria-label={`Go to ${label} ${i + 1} of ${count}`} aria-current={i === index ? "true" : undefined} onClick={() => onSelect(i)} />)}
      </div>
      <span className="carousel-count" aria-live="polite">{String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}</span>
      <button type="button" onClick={onNext} aria-label={`Next ${label}`} className="carousel-arrow">→</button>
    </div>
  );
}

type HeroProps = {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  reducedMotion: boolean | null;
};

function Hero({
  menuOpen,
  setMenuOpen,
  reducedMotion,
}: HeroProps) {
  const [typedPhrase, setTypedPhrase] = useState("");

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
      setTypedPhrase(phrase.slice(0, position));
      if (!deleting && position === phrase.length) {
        deleting = true;
        schedule(tick, 2200);
      } else if (deleting && position === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % headlinePhrases.length;
        schedule(tick, 420);
      } else {
        const punctuationPause = !deleting && /[,.]/.test(phrase[position - 1]) ? 240 : 0;
        schedule(tick, (deleting ? 58 : 115) + punctuationPause);
      }
    };
    schedule(tick, 650);

    return () => {
      cancelled = true;
      timers.forEach((timer) => window.clearTimeout(timer));
      timers.clear();
    };
  }, [reducedMotion]);

  const widestPhrase = headlinePhrases.reduce((longest, phrase) => phrase.length > longest.length ? phrase : longest, "");
  const visiblePhrase = reducedMotion === true ? headlinePhrases[0] : typedPhrase;

  return (
    <section id="hero" className="hero snap-section">
      <div className="hero-network" aria-hidden="true"><svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="network-line" x1="0" x2="1"><stop offset="0" stopColor="#5d9fa5" stopOpacity="0"/><stop offset=".5" stopColor="#5d9fa5" stopOpacity=".22"/><stop offset="1" stopColor="#5d9fa5" stopOpacity="0"/></linearGradient></defs><g className="network-paths" fill="none" stroke="url(#network-line)" strokeWidth="1"><path d="M-40 590 185 410 410 505 630 300 835 410 1050 210 1480 335"/><path d="M-30 315 200 440 385 260 605 430 825 235 1030 420 1240 295 1480 520"/><path d="M90 860 260 650 500 700 715 525 930 660 1160 525 1400 710"/></g><g className="network-nodes" fill="#5d9fa5"><circle cx="185" cy="410" r="3"/><circle cx="410" cy="505" r="2.5"/><circle cx="630" cy="300" r="3"/><circle cx="835" cy="410" r="2.5"/><circle cx="1050" cy="210" r="3"/><circle cx="200" cy="440" r="2.5"/><circle cx="385" cy="260" r="3"/><circle cx="605" cy="430" r="2.5"/><circle cx="825" cy="235" r="3"/><circle cx="1030" cy="420" r="2.5"/><circle cx="500" cy="700" r="3"/><circle cx="715" cy="525" r="2.5"/><circle cx="930" cy="660" r="3"/></g></svg></div>
      <div className="hero-orbit orbit-one" />
      <div className="hero-orbit orbit-two" />
      <div className="hero-content">
        <div className="portrait-frame"><Image className="profile-photo" src="/profile.jpg" alt="Lokesh Ram Hariram in a navy suit outdoors" width={1000} height={1328} priority sizes="(max-width: 620px) 100px, 128px" /></div>
        <p className="eyebrow hero-eyebrow">{heroEyebrow}</p>
        <h1 className="hero-typewriter" aria-label={headlinePhrases.join(" ")}>
          <span className="headline-measure" aria-hidden="true">{widestPhrase}</span>
          <span className="headline-live" aria-hidden="true">{visiblePhrase}{reducedMotion === false && <span className="cursor">|</span>}</span>
        </h1>
        <nav className={`hero-nav${menuOpen ? " is-open" : ""}`} aria-label="Main navigation">
          {sections.map(({ id, label }, index) => (
            <a key={id} aria-label={`${String(index + 1).padStart(2, "0")} / ${label}`} href={`#${id}`} onClick={() => setMenuOpen(false)}>{String(index + 1).padStart(2, "0")} / {label}</a>
          ))}
        </nav>
        <button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label="Toggle navigation"><span /><span /></button>
      </div>
      <a className="home-button" href="#hero" aria-label="Back to home"><span aria-hidden="true">⌂</span></a>
    </section>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState<boolean | null>(null);
  const [projectIndex, setProjectIndex] = useState(0);
  const [experienceIndex, setExperienceIndex] = useState(0);
  const [expandedExperience, setExpandedExperience] = useState<number | null>(null);
  const projectTrack = useRef<HTMLDivElement>(null);
  const experienceTrack = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const motionReduced = reducedMotion !== false;

  const carouselKeys = (event: React.KeyboardEvent<HTMLDivElement>, index: number, count: number, track: React.RefObject<HTMLDivElement | null>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight" && event.key !== "Home" && event.key !== "End") return;
    event.preventDefault();
    const next = event.key === "Home" ? 0 : event.key === "End" ? count - 1 : (index + (event.key === "ArrowRight" ? 1 : -1) + count) % count;
    goToSlide(track.current, next, motionReduced);
  };

  return (
    <>
      <header className="topbar" aria-label="Social and contact links">
        <div className="social-links">
          {socialLinks.map((link) => {
            const accessibleLabel = link.icon === "linkedin" ? "LinkedIn profile" : link.icon === "github" ? "GitHub profile" : "Send email";
            return (
              <a key={link.label} href={link.href} title={accessibleLabel} aria-label={accessibleLabel} {...(link.href.startsWith("https:") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                <SocialIcon name={link.icon} />
              </a>
            );
          })}
        </div>
        <a className="contact-shortcut" href="#contact" onClick={closeMenu}><span className="envelope" aria-hidden="true">✉</span> Get in touch</a>
      </header>

      <main className="page-scroll">
        <Hero key={reducedMotion === null ? "motion-pending" : reducedMotion ? "reduced-motion" : "motion-enabled"} menuOpen={menuOpen} setMenuOpen={setMenuOpen} reducedMotion={reducedMotion} />

        <section id="about" className="portfolio-section content-section about-section">
          <SectionHeading id="about" label="ABOUT ME" kicker="ABOUT ME" index={1} />
          <div id="about-panel" className="section-content" aria-labelledby="about-heading">
           <div className="about-layout">
            <div className="about-portrait"><div className="about-orbit" /><span>LRH</span><small>AI · DATA · SYSTEMS</small></div>
            <div className="about-copy">
              <p className="eyebrow">HERE IS A LITTLE BACKGROUND</p>
              <h3>Turning complex data into useful tools.</h3>
              <p>I’m Lokesh Hariram. I earned an M.S. in Information Systems at The University of Texas at Arlington after studying Computer Science at Sathyabama University. My work spans applied AI/ML engineering at ACEP and machine-learning research at SEAR Lab.</p>
              <p>I enjoy solving practical problems with data engineering, machine learning, and software people can use. I care about dependable systems that work beyond a demo, and about connecting strong data foundations to useful ML applications. Outside engineering, I enjoy morning runs, a good book, and following my curiosity.</p>
              <a className="resume-button" href="/Lokesh-Ram-Resume.pdf" target="_blank" rel="noopener noreferrer" aria-label="View Lokesh Ram Hariram’s résumé as a PDF">View My Resume <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          </div>
        </section>

        <section id="projects" className="portfolio-section content-section projects-section">
          <SectionHeading id="projects" label="FEATURED PROJECTS" kicker="FEATURED PROJECTS" index={2} />
          <div id="projects-panel" className="section-content" aria-labelledby="projects-heading">
          <div className="carousel-shell">
          <div className="project-list carousel-track" ref={projectTrack} role="region" aria-label="Featured projects" tabIndex={0} onKeyDown={(event) => carouselKeys(event, projectIndex, projects.length, projectTrack)} onScroll={(event) => setProjectIndex(activeSlide(event.currentTarget))}>
            {projects.map((project) => (
              <article className="project-card" key={project.number}>
                <div className={`project-art art-${project.motif}`}><Image src={project.image} alt={`Conceptual workflow illustration: ${project.diagram}`} fill sizes="(max-width: 620px) 92vw, (max-width: 900px) 32vw, 24vw"/></div>
                <div className="project-copy"><span className="project-number">{project.category}</span><h3>{project.title}</h3><p>{project.description}</p><ul className="project-stack">{project.stack.map((item) => <li key={item}>{item}</li>)}</ul></div>
                <div className="project-links">
                  <a href={`/projects/${new URL(project.caseStudy).pathname.split("/").pop()}`} aria-label={`View ${project.title} details`}>View details <span aria-hidden="true">↗</span></a>
                  {"github" in project && <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} GitHub`}>GitHub <span aria-hidden="true">↗</span></a>}
                </div>
              </article>
            ))}
          </div>
          <CarouselNav label="project" count={projects.length} index={projectIndex} onSelect={(next) => goToSlide(projectTrack.current, next, motionReduced)} onPrevious={() => goToSlide(projectTrack.current, (projectIndex + projects.length - 1) % projects.length, motionReduced)} onNext={() => goToSlide(projectTrack.current, (projectIndex + 1) % projects.length, motionReduced)} />
          </div>
          </div>
        </section>

        <section id="skills" className="portfolio-section content-section skills-section">
          <SectionHeading id="skills" label="SKILLS" kicker="SKILLS" index={3} />
          <div id="skills-panel" className="section-content" aria-labelledby="skills-heading">
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

        <section id="experience" className="portfolio-section content-section experience-section">
          <SectionHeading id="experience" label="EXPERIENCE" kicker="EXPERIENCE" index={4} />
          <div id="experience-panel" className="section-content" aria-labelledby="experience-heading">
          <div className="experience-section-intro"><h3>Applied engineering, with outcomes.</h3><p>Building data foundations, applied ML models, and AI workflows with domain and engineering stakeholders.</p></div>
          <div className="carousel-shell">
          <div className="experience-list carousel-track" ref={experienceTrack} role="region" aria-label="Experience" tabIndex={0} onKeyDown={(event) => carouselKeys(event, experienceIndex, experience.length, experienceTrack)} onScroll={(event) => setExperienceIndex(activeSlide(event.currentTarget))}>
            {experience.map((job) => {
              return (
                <article className="experience-card" key={job.number}>
                  <div className="exp-index">{job.number}</div>
                  <div className="exp-main">
                    <h4>{job.title}</h4>
                    <div className="exp-meta"><span className="company">{job.company}</span>{"location" in job && <span>{job.location}</span>}</div>
                    <p className="experience-description">{job.description}</p>
                    <ul className="experience-achievements">{job.achievements.map((achievement) => <li key={achievement}>{achievement}</li>)}</ul>
                    <ul className="experience-technologies">{job.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
                  </div>
                  <button className="details-toggle" aria-expanded={expandedExperience === Number(job.number)} aria-controls={`experience-details-${job.number}`} onClick={() => setExpandedExperience((open) => open === Number(job.number) ? null : Number(job.number))}>{expandedExperience === Number(job.number) ? "Hide details" : "View details"}</button>
                  <div className="experience-details" id={`experience-details-${job.number}`} hidden={expandedExperience !== Number(job.number)}>
                    <ul>{job.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
                  </div>
                </article>
              );
            })}
          </div>
          <CarouselNav label="experience" count={experience.length} index={experienceIndex} onSelect={(next) => goToSlide(experienceTrack.current, next, motionReduced)} onPrevious={() => goToSlide(experienceTrack.current, (experienceIndex + experience.length - 1) % experience.length, motionReduced)} onNext={() => goToSlide(experienceTrack.current, (experienceIndex + 1) % experience.length, motionReduced)} />
          </div>
          </div>
        </section>

        <section id="education" className="portfolio-section content-section education-section">
          <SectionHeading id="education" label="EDUCATION" kicker="EDUCATION" index={5} />
          <div id="education-panel" className="section-content" aria-labelledby="education-heading">
            <div className="education-list">
              {education.map((item) => <div key={item.degree}><strong>{item.degree}</strong><small>{item.institution}</small></div>)}
            </div>
          </div>
        </section>

        <section id="writing" className="portfolio-section content-section writing-section">
          <SectionHeading id="writing" label="TECHNICAL WRITING" kicker="TECHNICAL WRITING" index={6} />
          <div id="writing-panel" className="section-content" aria-labelledby="writing-heading">
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

        <section id="contact" className="portfolio-section content-section contact-section">
          <SectionHeading id="contact" label="CONTACT" kicker="CONTACT" index={7} />
          <div id="contact-panel" className="section-content contact-panel" aria-labelledby="contact-heading">
            <div className="contact-orbit" />
            <div className="contact-content"><p className="eyebrow">{portfolioContent.contact.eyebrow}</p><h3>{portfolioContent.contact.heading}</h3><p className="contact-description">{portfolioContent.contact.description}</p><a className="email-link" href={portfolioContent.links.email}>Get in touch <span aria-hidden="true">↗</span></a><div className="contact-profiles">{profileLinks.map((link) => <a href={link.href} key={link.label} target="_blank" rel="noopener noreferrer">{link.label} <span aria-hidden="true">↗</span></a>)}<a href="/Lokesh-Ram-Resume.pdf" target="_blank" rel="noopener noreferrer">Résumé <span aria-hidden="true">↗</span></a></div></div>
            <footer>LOKESH RAM HARIRAM <span>BUILT WITH CARE</span></footer>
          </div>
        </section>
      </main>
    </>
  );
}
