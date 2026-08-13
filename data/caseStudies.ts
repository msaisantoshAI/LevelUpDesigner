export interface ProcessArtifact {
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  type: 'heuristic' | 'wireframe' | 'system' | 'metrics';
}

export interface CaseStudy {
  id: string;
  number: string;
  year: string;
  title: string;
  subtitle: string;
  oneLiner: string;
  tag: string;
  context: {
    role: string;
    team: string;
    timeline: string;
    tools: string[];
    company: string;
  };
  metrics: {
    value: string;
    label: string;
    detail: string;
  }[];
  bullets: string[];
  problem: {
    title: string;
    description: string;
    painPoints: string[];
  };
  constraints: string[];
  process: {
    step: string;
    title: string;
    description: string;
    artifact?: ProcessArtifact;
  }[];
  theDecision: {
    title: string;
    rationale: string;
    tradeoff: string;
  };
  reflection: string;
  screenType: 'search' | 'service' | 'ai-workflow';
}

export const PROCESS_STEPS = [
  {
    number: "01",
    phase: "Frame & Audit",
    title: "Heuristic Audit & Usability Framing",
    description: "Conducted heuristic evaluations and UX audits on Ultimatix customer platforms and TM System (TMS) to identify usability gaps and improve workflow efficiency.",
    deliverable: "UX Audit Matrix & Usability Gap Report"
  },
  {
    number: "02",
    phase: "Structure & System",
    title: "Structured IA & Design Systems",
    description: "Rebuilt the Enterprise Search experience into a structured 'All Results' page. Contributed to the Design System building scalable icon libraries and interaction states.",
    deliverable: "Search IA & Figma Component Tokens"
  },
  {
    number: "03",
    phase: "Craft & Wireframes",
    title: "Low-Fi Wireframing to High-Fi Prototypes",
    description: "Designed low-fidelity wireframes and high-fidelity Figma/XD prototypes to validate requirements and gather stakeholder feedback for on-time delivery.",
    deliverable: "Clickable Figma Prototypes"
  },
  {
    number: "04",
    phase: "AI Acceleration & Metrics",
    title: "AI Orchestration & Metric Optimization",
    description: "Blended UX design with AI assistants (Cursor, Antigravity, Lovable, Claude) to drive 80%+ reduction in recurring issues and decrease support tickets by 50%.",
    deliverable: "80%+ Issue Reduction CSAT Report"
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "enterprise-search",
    number: "01",
    year: "2025",
    title: "Ultimatix ( TX Team ) — Enterprise Search & Platform Rebuild",
    subtitle: "Rebuilt the Enterprise Search experience, designing a structured 'All Results' page that improved hierarchy, reduced chaos, and drove an 80%+ reduction in recurring issues.",
    oneLiner: "Conducting heuristic evaluations, UX audits, and design system icon libraries for 500,000+ TCS enterprise users.",
    tag: "Enterprise UX Audit · Heuristic Evaluation · Design Systems · Search IA",
    context: {
      role: "UX Designer",
      team: "Ultimatix ( TX Team )",
      timeline: "Oct 2025 — Present",
      tools: ["Figma", "Adobe XD", "Design Systems", "Usability Heuristics", "Analytics", "WCAG"],
      company: "Tata Consultancy Services (TCS)"
    },
    metrics: [
      {
        value: "80%+",
        label: "Reduction in Recurring Issues",
        detail: "Achieved through strategic UI improvements and structured search IA."
      },
      {
        value: "50%",
        label: "Decrease in Employee Tickets",
        detail: "Reduced support volume via intuitive self-serve navigation."
      },
      {
        value: "TM System",
        label: "Resource Tracking Clarity",
        detail: "Delivered UX solutions for TM System (TMS) operational workflows."
      }
    ],
    bullets: [
      "Conducted heuristic evaluations and UX audits to identify usability gaps and improve enterprise workflow efficiency.",
      "Redesigned internal customer platforms with user-centric dashboards and streamlined estimation workflows, reducing task time and improving visibility.",
      "Delivered UX solutions for TM System (TMS), enhancing resource tracking and operational clarity.",
      "Drove an 80%+ reduction in recurring application issues through strategic UI improvements, decreasing employee-raised tickets by 50%.",
      "Rebuilt the Enterprise Search experience, designing a structured 'All Results' page that improved hierarchy, reduced chaos, and resolved search usability challenges.",
      "Created prototypes and design specifications in Figma/XD, collaborating cross-functionally to align UX strategy with business goals.",
      "Contributed to the Design System by building scalable icon libraries and interaction states, ensuring consistency and accessibility.",
      "Used analytics, user feedback, and UX best practices to continuously optimize usability and satisfaction."
    ],
    problem: {
      title: "Enterprise Workflow Friction & Fragmented Search",
      description: "Employees encountered usability challenges navigating legacy customer platforms and isolated search portals, generating high ticket volume and low operational visibility.",
      painPoints: [
        "Inconsistent search hierarchy across enterprise modules.",
        "High task completion time in estimation and TM System resource workflows.",
        "Lack of standardized design system components and interaction states."
      ]
    },
    constraints: [
      "Enterprise scale serving 500,000+ TCS internal employees.",
      "Strict WCAG accessibility standards across web and mobile platforms.",
      "Fast-turnaround cross-functional alignment between engineering and business stakeholders."
    ],
    process: [
      {
        step: "01",
        title: "Heuristic Evaluation & UX Audit",
        description: "Audited existing TM System and search workflows to map friction points and usability gaps.",
        artifact: {
          title: "Heuristic Audit Matrix",
          subtitle: "Severity scoring across 10 NN/g principles",
          description: "Identified zero-state search gaps and estimation form friction.",
          badge: "UX Audit",
          type: "heuristic"
        }
      },
      {
        step: "02",
        title: "Structured 'All Results' Search Architecture",
        description: "Designed unified search hierarchy organizing results into Actions, Applications, Documents, and People.",
        artifact: {
          title: "Search Hierarchy Architecture",
          subtitle: "Categorized vs Tabular layout",
          description: "Instant contextual previews reducing user search friction.",
          badge: "Wireframe",
          type: "wireframe"
        }
      },
      {
        step: "03",
        title: "Figma & Adobe XD Interactive Prototypes",
        description: "Built scalable icon libraries, interaction states, and accessibility tokens to align cross-functional teams."
      }
    ],
    theDecision: {
      title: "Unified 'All Results' Intent Hierarchy over Flat Tab Lists",
      rationale: "Positioned top intent matches directly in a structured overview, eliminating redundant user clicks.",
      tradeoff: "Required front-end rendering coordination, but resolved core search usability challenges."
    },
    reflection: "Combining heuristic evaluation rigor with clear design system tokens accelerates alignment with developers and business stakeholders.",
    screenType: "search"
  },
  {
    id: "service-portal",
    number: "02",
    year: "2024",
    title: "Tech SW Service - Next Gen — Service Workflow Modernization",
    subtitle: "Designed low-fidelity wireframes, high-fidelity Figma mock-ups, and design system integrations for Next Gen software service portals.",
    oneLiner: "Validating functional requirements, managing projects with tight deadlines, and delivering user-centered designs on time.",
    tag: "Wireframing · Prototyping · Figma · Stakeholder Validation · Agile Delivery",
    context: {
      role: "UX Designer",
      team: "Tech SW Service - Next Gen",
      timeline: "Oct 2022 — Sept 2025",
      tools: ["Figma", "Adobe XD", "Wireframing", "Usability Testing", "Design Systems", "Jira"],
      company: "Tata Consultancy Services (TCS)"
    },
    metrics: [
      {
        value: "On-Time",
        label: "Tight Deadline Delivery",
        detail: "Consistently delivered high-quality designs within budget."
      },
      {
        value: "100%",
        label: "Design System Integration",
        detail: "Collaborated with developers to streamline development."
      },
      {
        value: "Low to High Fi",
        label: "Validated Prototypes",
        detail: "Brought functional requirements to life with clickable prototypes."
      }
    ],
    bullets: [
      "Designed low-fidelity wireframes and clickable prototypes to validate requirements and gather stakeholder feedback.",
      "Developed high-fidelity mock-ups using Figma to bring functional requirements to life, ensuring alignment with stakeholder expectations.",
      "Collaborated with developers and project managers to optimize user-centered design processes, integrating design systems to streamline development.",
      "Successfully managed projects with tight deadlines, consistently delivering high-quality designs on time and within budget.",
      "Provided regular progress updates to management and communicated detailed design specs to internal teams."
    ],
    problem: {
      title: "Complex Requirements & Tight Delivery Deadlines",
      description: "Internal software service requests required clear visual validation to prevent development rework and align engineering teams with management goals.",
      painPoints: [
        "Unclear requirement specs causing stakeholder misalignment.",
        "Need for rapid low-fidelity wireframing prior to high-fidelity Figma builds.",
        "Maintaining design system consistency under fast-paced project schedules."
      ]
    },
    constraints: [
      "Strict project deadlines and budget parameters.",
      "Multi-persona user roles across internal teams and management.",
      "Integration with existing enterprise frontend frameworks."
    ],
    process: [
      {
        step: "01",
        title: "Low-Fidelity Wireframes & Feedback",
        description: "Created rapid conceptual wireframes to test layout flows with stakeholders before high-fi design.",
        artifact: {
          title: "Wireframe Flow Validation",
          subtitle: "Rapid layout iteration map",
          description: "Pruned non-essential fields to streamline form submission.",
          badge: "Wireframes",
          type: "wireframe"
        }
      },
      {
        step: "02",
        title: "High-Fidelity Figma Mock-ups & Prototypes",
        description: "Developed interactive Figma prototypes with design system specs for dev handoff."
      }
    ],
    theDecision: {
      title: "Code-Aligned Design System Components",
      rationale: "Integrated pre-built design system tokens into Figma mock-ups to minimize developer handoff lag.",
      tradeoff: "Required upfront component library maintenance, but ensured 100% on-time delivery."
    },
    reflection: "Iterative wireframing and transparent progress updates build immense trust between UX, engineering, and management.",
    screenType: "service"
  },
  {
    id: "ai-workflow",
    number: "03",
    year: "2023",
    title: "AI-Native UX Design, Orchestration & Automation System",
    subtitle: "Blending UX design with AI assistants (Cursor, Antigravity, Lovable, Claude Code, GPT, Perplexity) for rapid research, orchestration, and living prototypes.",
    oneLiner: "Integrating AI automation into user-centered design to guide users, reduce confusion, and build trust.",
    tag: "AI Assistants · Cursor · Antigravity · Lovable · Claude · Prototyping",
    context: {
      role: "UX Designer & AI Practice Lead",
      team: "AI Design Practice",
      timeline: "2023 — Present",
      tools: ["Cursor", "Antigravity", "Lovable", "Claude Code", "GPT", "Perplexity", "Framer"],
      company: "Enterprise UX & AI Orchestration"
    },
    metrics: [
      {
        value: "12 Tools",
        label: "AI & Design Ecosystem",
        detail: "Fluent in Figma, XD, Cursor, Antigravity, Claude, Lovable."
      },
      {
        value: "3x",
        label: "Prototyping Speed",
        detail: "Rapid functional React code mockups generated parallel to Figma."
      },
      {
        value: "100%",
        label: "User Trust Focus",
        detail: "Interactions designed to guide users and reduce confusion."
      }
    ],
    bullets: [
      "Blending UX design with AI assistants, automation, and orchestration to design interactions that guide users, reduce confusion, and build trust.",
      "Leveraging Cursor, Antigravity, Lovable, and Claude Code for living React component prototypes.",
      "Utilizing GPT and Perplexity for deep research synthesis, competitive benchmarking, and prompt-assisted heuristic coding.",
      "Combining visual craft with code feasibility for zero handoff friction."
    ],
    problem: {
      title: "Static Design Handoff Lag in AI Era",
      description: "Traditional static Figma specs fail to demonstrate dynamic AI state logic, streaming responses, and responsive edge cases to stakeholders.",
      painPoints: [
        "Static prototypes failing to convey real AI data states.",
        "Manual research synthesis delaying insight delivery.",
        "Disconnect between visual UI specs and production code."
      ]
    },
    constraints: [
      "Ensuring AI output remains grounded in human-centered Nielsen Norman heuristics.",
      "Maintaining high visual craft and WCAG accessibility standards.",
      "Designing interfaces that build user trust in AI recommendations."
    ],
    process: [
      {
        step: "01",
        title: "Prompt-Assisted Heuristic Extraction",
        description: "Synthesized qualitative user feedback transcripts using Claude and Perplexity in minutes.",
        artifact: {
          title: "AI Research Synthesis",
          subtitle: "Qualitative pattern clustering",
          description: "Extracted core friction themes in minutes.",
          badge: "AI Research",
          type: "heuristic"
        }
      },
      {
        step: "02",
        title: "Living Code Prototypes with Cursor & Antigravity",
        description: "Built functional React + Tailwind components directly alongside Figma designs."
      }
    ],
    theDecision: {
      title: "Living Code Prototypes for Complex Interactions",
      rationale: "Using code as the primary artifact for AI state logic eliminates ambiguity for dev teams.",
      tradeoff: "Requires front-end fluency, but guarantees 100% fidelity."
    },
    reflection: "AI does not replace design judgment — it amplifies velocity and frees designers to focus on strategic human empathy.",
    screenType: "ai-workflow"
  }
];

export const RESUME_DATA = {
  name: "Sai Santosh Madhari",
  role: "UX Designer",
  experienceYears: "3+ years of experience",
  email: "madhari.santosh@tcs.com",
  phone: "+91 7989672240",
  behance: "M.Sai Santosh",
  behanceUrl: "https://behance.net",
  linkedin: "Sai Santosh Madhari",
  linkedinUrl: "https://linkedin.com",
  
  aboutMe: "Results-driven UX Designer with 3+ years of experience designing intuitive web and mobile experiences. Skilled in user-centered design, wireframing, prototyping, usability testing, and cross-functional collaboration to deliver scalable solutions. Proven ability to improve usability, streamline workflows, Blending UX design with AI assistants, automation, and orchestration, I design interactions that guide users, reduce confusion, and build trust.",
  
  experienceSummary: "I have strong experience in UX/UI design, working with both internal teams and clients to create user-friendly dashboards and websites. My focus has always been on understanding user needs and turning them into easy-to-use, visually appealing designs. I've worked on a variety of projects, from detailed dashboards to responsive websites, ensuring they are both functional and attractive. I aim to create designs that not only look good but also make the user's experience smooth and enjoyable.",

  skills: [
    "Product Design thinking",
    "UX Audit",
    "Stakeholder Collaboration",
    "Visual & Interface design",
    "Customer Experience",
    "Project Management Basics",
    "Accessibility (WCAG)",
    "Heuristic Evaluation",
    "Data-Driven Design Decisions",
    "Usability Testing",
    "Design System",
    "Cross-functional Coordination"
  ],

  certifications: [
    { title: "Google UX Design Certification", issuer: "Coursera" },
    { title: "Adobe XD & UI Design", issuer: "Udemy" },
    { title: "Ai for Designers", issuer: "Interaction Design Foundation (IxDF)" },
    { title: "Design Psychology", issuer: "LinkedIn" },
    { title: "Agile User Experience Design", issuer: "LinkedIn" },
    { title: "The 10 Pillars of Customer Experience", issuer: "LinkedIn" }
  ],

  education: {
    degree: "BFA in Applied Art ( Visual Communication Design )",
    institution: "Jawaharlal Nehru Architecture and Fine Arts University"
  },

  interests: [
    "Drawing & Painting",
    "Mentoring / Teaching",
    "Content Creation"
  ],

  tools: [
    { name: "Figma", category: "Design" },
    { name: "Adobe XD", category: "Design" },
    { name: "Photoshop", category: "Design" },
    { name: "Illustrator", category: "Design" },
    { name: "Jira Software", category: "Project" },
    { name: "Framer", category: "Code" },
    { name: "Lovable", category: "AI" },
    { name: "Cursor", category: "AI Code" },
    { name: "Antigravity", category: "AI Code" },
    { name: "Claude (Anthropic)", category: "AI" },
    { name: "GPT", category: "AI" },
    { name: "Perplexity", category: "AI Research" }
  ]
};
