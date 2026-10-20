/**
 * Content transcribed from Lokesh's live portfolio and its expanded panels on
 * 2026-10-20. Experience panel details were not exposed during extraction and
 * remain in the existing page data until they can be verified.
 */
export const portfolioContent = {
  source: "https://lokesh-portfolio-sepia-iota.vercel.app/",
  hero: {
    title: "AI/ML Engineer & Data Engineer building useful AI systems.",
    description:
      "I build AI applications, integrations, and data pipelines that turn complex requirements into working, testable software.",
    education: "M.S. in Information Systems — The University of Texas at Arlington (UTA)",
    work:
      "Hands-on work includes an LLM-powered natural-language-to-SQL platform, predictive ML models, and an API verification workflow for 10 selected endpoints.",
    location: "Austin, TX, USA · Open to relocation",
    processLabel: "FROM AMBIGUITY TO WORKING SYSTEMS",
    process: "Discovery → prototype → integration → validation → clear handoff.",
  },
  links: {
    email: "mailto:lokeshramloka@gmail.com",
    linkedin: "https://www.linkedin.com/in/lokesh-ram-hariram/?isSelfProfile=true",
    github: "https://github.com/lokeshram1",
    resume: "https://lokesh-portfolio-sepia-iota.vercel.app/Lokesh-Ram-Resume.pdf",
  },
  contact: {
    eyebrow: "CONTACT · BUILDING AI, ML, AND INTEGRATION SYSTEMS",
    heading: "Have a real problem to work through?",
    description:
      "Open to full-time AI Engineer, Applied AI, Machine Learning Engineer, and Data Engineer opportunities.",
  },
  projectsIntro:
    "AI applications, integrations, and ML systems with explicit validation and practical trade-offs.",
  projects: [
    {
      number: "01",
      category: "AI AGENTS · API INTEGRATION",
      title: "API Integration & Contract Verification Agent",
      description:
        "How do you know an AI-generated API integration actually works? This agent turns API documentation into executable clients and tests, then checks observed behavior against documented contracts.",
      stack: ["Python", "Claude API", "Shippo API", "FastAPI", "Docker", "JSON Schema"],
      diagram:
        "Illustrative API workflow: documentation, generated client, execution, and contract checks.",
      caseStudy: "https://lokesh-portfolio-sepia-iota.vercel.app/projects/api-contract-agent",
      github: "https://github.com/lokeshram1",
      motif: "api",
      image: "/projects/api-contract.svg",
      caseStudyDetails: [
        {
          heading: "The challenge",
          body: "Integrating an unfamiliar API means translating prose into request mappings and response models, while undocumented behavior and inconsistent errors can break an otherwise plausible generated client.",
        },
        {
          heading: "System and implementation",
          bullets: [
            "Used Claude API to parse Shippo documentation for 10 selected endpoints and generate endpoint clients, request mappings, response schemas, and integration tests.",
            "Ran a bounded generate–execute–diagnose–repair workflow against the Shippo test environment, retrying once for defined issues such as missing fields, incorrect mappings, and invalid request formats.",
            "Compared documented request and response structures with observed API behavior, including error responses.",
          ],
        },
        {
          heading: "Engineering choices",
          bullets: [
            "Treat generated code as a candidate that must execute, not as proof of correctness.",
            "Bound repair attempts and keep unresolved failures visible for an engineer to review.",
            "Record discrepancies and repair history in an endpoint-level report for an auditable handoff.",
          ],
        },
        {
          heading: "Reliability and validation",
          bullets: [
            "Executable integration tests against the API test environment.",
            "JSON Schema checks against observed responses.",
            "Reports of missing parameters, schema mismatches, unexpected fields, and inconsistent errors.",
          ],
        },
        {
          heading: "Practical value",
          body: "Provides engineers with a repeatable way to inspect generated API integrations and see which endpoint contracts passed, failed, or still need human review.",
        },
        {
          heading: "Trade-offs and scope",
          body: "Verification covered 10 selected endpoints and defined failure cases. A passing check does not guarantee correctness for every API state or future contract change; unresolved issues require human review.",
        },
      ],
    },
    {
      number: "02",
      category: "APPLIED AI · NATURAL LANGUAGE TO SQL",
      title: "AskEMDI — Natural-Language-to-SQL Platform",
      description:
        "An LLM-powered application that lets emergency physicians and researchers ask questions of structured data in natural language rather than writing SQL.",
      stack: ["Amazon Bedrock", "Anthropic Claude", "Azure Data Factory", "Azure Synapse", "Python", "SQL"],
      diagram:
        "Illustrative natural-language-to-SQL flow connecting a question, query, and structured data.",
      caseStudy: "https://lokesh-portfolio-sepia-iota.vercel.app/projects/askemdi",
      motif: "askemdi",
      image: "/projects/askemdi.svg",
      caseStudyDetails: [
        {
          heading: "The challenge",
          body: "Making structured encounter data useful to nontechnical researchers requires both an accessible query workflow and data that has been prepared and checked before it reaches downstream AI and analytics.",
        },
        {
          heading: "System and implementation",
          bullets: [
            "Contributed to AskEMDI, an LLM-powered natural-language-to-SQL platform using Amazon Bedrock and Anthropic Claude.",
            "Engineered Azure Data Factory and Azure Synapse pipelines to ingest, cleanse, transform, and validate a dataset of 23M+ encounters.",
            "Built Python and SQL checks for missing values, inconsistent records, and coding issues before downstream workflows.",
            "Gathered requirements with clinicians and operations stakeholders, demonstrated prototypes, and refined query logic and outputs from feedback.",
          ],
        },
        {
          heading: "Engineering choices",
          bullets: [
            "Treat data preparation and validation as part of the AI application, not as separate cleanup.",
            "Use prototype demonstrations and stakeholder feedback to refine how questions map to query logic and outputs.",
          ],
        },
        {
          heading: "Reliability and validation",
          bullets: [
            "Python and SQL data-quality validation for missing values, inconsistencies, and coding issues.",
            "Stakeholder review of prototype behavior and query outputs.",
          ],
        },
        {
          heading: "Practical value",
          body: "Connected natural-language access to a structured data foundation built from 23M+ encounters, with validation steps and stakeholder feedback in the workflow.",
        },
        {
          heading: "Trade-offs and scope",
          body: "The résumé describes individual contributions within a broader platform effort; it does not establish sole ownership or provide query-quality metrics, so neither is claimed here.",
        },
      ],
    },
    {
      number: "03",
      category: "LLM APPLICATIONS · INFORMATION RETRIEVAL",
      title: "Longitudinal Meeting Intelligence & Accountability System",
      description:
        "Turns recurring public city council meeting minutes into searchable accountability intelligence that tracks commitments across sessions.",
      stack: ["Python", "Claude API", "Embeddings", "PostgreSQL", "FastAPI", "Docker"],
      diagram:
        "Illustrative timeline connecting commitments across recurring meetings for review.",
      caseStudy: "https://lokesh-portfolio-sepia-iota.vercel.app/projects/meeting-intelligence",
      github: "https://github.com/lokeshram1",
      motif: "meeting",
      image: "/projects/meeting-intelligence.svg",
      caseStudyDetails: [
        {
          heading: "The challenge",
          body: "Meeting records are unstructured and each session is easy to read in isolation. Following a commitment over time requires matching related items while distinguishing a continuing issue from a genuinely new one.",
        },
        {
          heading: "System and implementation",
          bullets: [
            "Extracted decisions, action items, owners, deadlines, and issue context from recurring public meeting minutes.",
            "Persisted records in PostgreSQL and used embedding similarity followed by Claude-based verification to match related items across meetings.",
            "Tracked overdue, stale, and repeatedly resurfacing commitments with an evidence trail across meetings.",
            "Built an interactive accountability dashboard.",
          ],
        },
        {
          heading: "Engineering choices",
          bullets: [
            "Use similarity to retrieve candidate matches, then use Claude-based verification to assess the relationship.",
            "Preserve the source evidence and temporal state so related commitments can be inspected over time.",
            "Evaluate matching errors explicitly rather than treating every semantic similarity as a true match.",
          ],
        },
        {
          heading: "Reliability and validation",
          bullets: [
            "Created a manually labeled set of 75 meeting/action-item examples.",
            "Analyzed false matches and missed links to identify recurring sources of error.",
          ],
        },
        {
          heading: "Practical value",
          body: "Makes unresolved commitments easier to find across meeting records, with their context and evidence available for review.",
        },
        {
          heading: "Trade-offs and scope",
          body: "The 75-example set was used to analyze error patterns; no accuracy score is reported. Meeting records and extracted details still need human review.",
        },
      ],
    },
    {
      number: "04",
      category: "MACHINE LEARNING · RISK ANALYTICS",
      title: "E-Commerce Pricing Risk Detection System",
      description:
        "An end-to-end ML application that scores product listings for suspicious prices and gives reviewers evidence to investigate each flag.",
      stack: ["Python", "XGBoost", "Sentence Transformers", "PostgreSQL", "FastAPI", "Streamlit", "Docker"],
      diagram:
        "Illustrative pricing-risk concept showing product signals prioritized for human review; not model output.",
      caseStudy: "https://lokesh-portfolio-sepia-iota.vercel.app/projects/pricing-risk",
      github: "https://github.com/lokeshram1",
      motif: "pricing",
      image: "/projects/pricing-risk.svg",
      caseStudyDetails: [
        {
          heading: "The challenge",
          body: "A price can look unusual for many reasons. A useful review queue needs category context and product semantics, while balancing missed anomalies against the workload created by false alarms.",
        },
        {
          heading: "System and implementation",
          bullets: [
            "Used the Amazon Reviews 2023 electronics metadata dataset.",
            "Combined category-level price deviations, relative discounts, product attributes, and Sentence Transformer embeddings of product text as XGBoost features.",
            "Built a FastAPI scoring service and a Streamlit investigation dashboard showing comparable category prices, product attributes, contributing signals, and model explanations.",
            "Created synthetic anomaly labels by injecting realistic anomalies into genuine product-price records.",
          ],
        },
        {
          heading: "Engineering choices",
          bullets: [
            "Present risk signals and comparisons so a person can investigate a score.",
            "Tune decision thresholds using precision, recall, false-negative cost, and expected manual-review volume.",
            "Use synthetic injected anomalies for evaluation and identify them as synthetic labels.",
          ],
        },
        {
          heading: "Reliability and validation",
          bullets: [
            "Evaluated against an injected-anomaly benchmark.",
            "Tuned thresholds against precision, recall, false-negative cost, and manual-review volume.",
          ],
        },
        {
          heading: "Practical value",
          body: "Packages feature engineering, scoring, and investigation into a review-oriented application rather than leaving the model as a notebook output.",
        },
        {
          heading: "Trade-offs and scope",
          body: "The anomaly labels were synthetically injected. No production deployment, model accuracy, savings, or financial impact is claimed.",
        },
      ],
    },
    {
      number: "05",
      category: "AI AGENTS · INCIDENT INVESTIGATION",
      title: "IncidentIQ",
      description:
        "The portfolio describes an evidence-first incident investigation workflow: the model proposes hypotheses; evidence determines which ones hold up.",
      stack: ["Python", "FastAPI", "Next.js", "Docker", "PostgreSQL"],
      diagram:
        "Illustrative incident workflow: signals inform hypotheses, which are checked against evidence.",
      caseStudy: "https://lokesh-portfolio-sepia-iota.vercel.app/projects/incidentiq",
      github: "https://github.com/lokeshram1/IncidentIQ",
      motif: "incident",
      image: "/projects/incidentiq.svg",
      caseStudyDetails: [
        {
          heading: "The challenge",
          body: "Incident investigation produces competing explanations from operational signals. Teams need to see why a hypothesis is plausible and what evidence supports or weakens it.",
        },
        {
          heading: "System and implementation",
          bullets: [
            "The current portfolio describes ranked hypotheses using logs, metrics, deployments, and baselines.",
            "It describes deterministic checks and supporting evidence as separate from model-generated possibilities.",
            "The linked repository README describes a synthetic checkout incident where latency rises from about 300ms to 4.2 seconds after deployment v1.9; payment latency rises from 190ms to 3900ms while database latency stays near baseline (40ms to 45ms).",
          ],
        },
        {
          heading: "Engineering choices",
          bullets: [
            "Keep hypothesis generation distinct from validation.",
            "Make the evidence behind a candidate explanation inspectable.",
          ],
        },
        {
          heading: "Reliability and validation",
          body: "The linked repository README lists tests for evidence calculations, baseline-versus-incident comparisons, hypothesis scoring, root-cause ranking, API endpoints, and the complete end-to-end incident investigation.",
        },
        {
          heading: "Practical value",
          body: "The stated design principle is clear and relevant to dependable AI workflows: a model can suggest an explanation, while evidence must support it.",
        },
        {
          heading: "Trade-offs and scope",
          body: "The repository describes synthetic incident data rather than production telemetry. It presents a demonstration workflow and evidence-validation architecture, not a production incident-management system; additional security, observability, evaluation, reliability, and operational controls would be needed.",
        },
      ],
    },
  ],
  skillsIntro:
    "A practical toolkit across AI application development, data systems, ML, and delivery.",
  skillGroups: [
    {
      name: "AI & LLM Engineering",
      icon: "brain",
      skills: ["LLMs", "Generative AI", "OpenAI API", "Claude API", "Amazon Bedrock", "RAG", "AI agents", "Embeddings", "Vector search", "Tool calling", "Structured outputs", "LLM evaluation", "Guardrails"],
    },
    {
      name: "AI Application & Integration Engineering",
      icon: "code",
      skills: ["Python", "FastAPI", "REST APIs", "JSON Schema", "API integration", "Contract validation", "Agentic workflows", "Human-in-the-loop systems", "Natural-language-to-SQL"],
    },
    {
      name: "Machine Learning",
      icon: "database",
      skills: ["XGBoost", "ARIMA", "Predictive modeling", "Feature engineering", "Time-series forecasting", "Statistical analysis", "Exploratory data analysis"],
    },
    {
      name: "Data & Cloud Engineering",
      icon: "nodes",
      skills: ["SQL", "PostgreSQL", "ETL/ELT", "Azure Data Factory", "Azure Synapse Analytics", "AWS", "Azure", "Data modeling", "Docker", "Kubernetes", "CI/CD"],
    },
    {
      name: "Analytics & Collaboration",
      icon: "brain",
      skills: ["Power BI", "DAX", "Power Query", "KPI analysis", "Requirements gathering", "Technical discovery", "Prototyping", "Systems integration", "Solution design"],
    },
  ],
  education: [
    {
      degree: "Master of Science, Information Systems",
      institution: "The University of Texas at Arlington",
      date: "May 2026",
    },
    {
      degree: "Bachelor of Science, Computer Science",
      institution: "Sathyabama University",
      date: "May 2024",
    },
  ],
  writingIntro:
    "Draft article outlines on reliability, integration, and production behavior. These are not published posts.",
  writing: [
    {
      title: "How to Validate an LLM-Generated API Integration",
      description:
        "Draft outline: executable checks, API contracts, bounded repair attempts, error handling, and auditable handoffs.",
    },
    {
      title: "Why I Separate LLM Hypothesis Generation From Evidence-Based Validation",
      description:
        "Draft outline: candidate explanations, deterministic checks, evidence quality, and reviewable incident workflows.",
    },
    {
      title: "Building Longitudinal Memory Across Repeated Meetings",
      description:
        "Draft outline: candidate retrieval, verified matching, temporal state, and analysis of false matches and missed links.",
    },
    {
      title: "Evaluating an ML-Based Pricing Risk Detection System",
      description:
        "Draft outline: synthetic anomaly labels, threshold trade-offs, review volume, and interpretable risk signals.",
    },
    {
      title: "Connecting Natural Language to Structured Data Safely",
      description:
        "Draft outline: data foundations, validation, stakeholder discovery, and natural-language-to-SQL workflows.",
    },
  ],
  extractionGaps: [
    "The source Experience panel remained collapsed during extraction, so its full role descriptions, dates, and detail bullets are not included here.",
    "The source project's diagram image files were not accessible as local assets; their rendered alt descriptions were captured instead.",
  ],
} as const;
