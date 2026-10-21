import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { portfolioContent } from "../../portfolio-content";

function projectSlug(project: (typeof portfolioContent.projects)[number]) {
  return new URL(project.caseStudy).pathname.split("/").pop() ?? "";
}

export function generateStaticParams() {
  return portfolioContent.projects.map((project) => ({ slug: projectSlug(project) }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = portfolioContent.projects.find((item) => projectSlug(item) === slug);
  if (!project) notFound();

  return (
    <main className="project-detail-page">
      <Link className="project-back-link" href="/#projects">← All projects</Link>
      <span className="project-number">{project.number} / {project.category}</span>
      <h1>{project.title}</h1>
      <p className="project-detail-summary">{project.description}</p>
      <div className={`project-art project-detail-art art-${project.motif}`}>
        <Image src={project.image} alt={project.diagram} fill priority sizes="(max-width: 800px) 92vw, 960px" />
      </div>
      <ul className="project-stack">{project.stack.map((technology) => <li key={technology}>{technology}</li>)}</ul>
      <div className="project-detail-sections">
        {project.caseStudyDetails.map((detail) => (
          <section className="project-detail-block" key={detail.heading}>
            <h2>{detail.heading}</h2>
            {"body" in detail && <p>{detail.body}</p>}
            {"bullets" in detail && <ul>{detail.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
          </section>
        ))}
      </div>
      {"github" in project && <a className="project-repository-link" href={project.github} target="_blank" rel="noopener noreferrer">Open GitHub link <span aria-hidden="true">↗</span></a>}
    </main>
  );
}
