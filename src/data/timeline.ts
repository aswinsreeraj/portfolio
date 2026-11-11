export interface TimelineItem {
  id: string;
  type: 'EDUCATION' | 'EXPERIENCE' | 'NOW' | 'NEXT';
  period: string;
  title: string;
  organization: string;
  location?: string;
  summary: string;
  details: string[];
  skillsLabel: 'Picked up' | 'Working with' | 'Aiming for';
  skills: string[];
  isCurrent?: boolean;
  isNext?: boolean;
}

export const timelineData: TimelineItem[] = [
  {
    id: 'target-role',
    type: 'NEXT',
    period: 'Immediate',
    title: 'A backend engineering role',
    organization: 'Engineering-first team building scalable distributed systems or AI infrastructure',
    location: 'Remote / Hybrid / On-site',
    summary: 'Seeking a team building reliable backend services, distributed systems, or AI-powered platforms where code quality, reliability, and systems thinking are prized.',
    details: [
      'Ready to own backend microservices, database schemas, and message queues under real-world load.',
      'Eager to collaborate with engineers who value Clean Architecture, comprehensive testing, and observability.'
    ],
    skillsLabel: 'Aiming for',
    skills: ['Backend Engineer (Go)', 'Distributed Systems Engineer', 'Platform / Infrastructure Engineer'],
    isNext: true
  },
  {
    id: 'brototype',
    type: 'EDUCATION',
    period: 'Aug 2025 – Present',
    title: 'Software Engineering Program (Go & Backend)',
    organization: 'Brototype',
    location: 'Kerala, India',
    summary: 'Ongoing intensive project-based program spanning Go backend systems, databases, Clean Architecture, React/TypeScript, Docker, Kubernetes, CI/CD, and microservices.',
    details: [
      'Engineered 3 flagship systems within Brototype: ARDA (Go + Python AI agent control plane & pgvector HNSW reliability gate), EVNTX (full-stack ticketing & escrow wallet platform), and Tenome Micro (4-service Go/gRPC/Kafka/Ollama/OTel platform).',
      'Awarded Overall Best Performer for June 2026 for technical execution, architecture quality, and peer community contributions.',
      'CS Foundations & DSA: Algorithmic array manipulation/optimization, and topics including trees, tries, heaps, graphs, DP, greedy, and bit manipulation.',
      'Full-Stack & Go Backend Core: Progressed from HTML5/CSS3/Tailwind/JS and React (Router, Redux, Zustand, MobX, Vite) to Go concurrency (goroutines, channels, sync primitives), Gin + bcrypt session/cookie CRUD, Clean Architecture, design patterns, unit testing/mocks, and structured logging (slog/Zerolog/Zap).',
      'Databases, Cloud & Distributed Systems: Practiced relational modeling, CTEs, window functions, triggers, isolation levels & row locking, EXPLAIN, sharding & MongoDB aggregations alongside GraphQL (gqlgen), Kafka/RabbitMQ/NATS, AWS (EC2/S3/RDS/IAM/VPC/Nginx), Jenkins/SonarQube/GitHub Actions, Docker, and Kubernetes (NGINX Gateway Fabric, HPA, PVCs, Helm, Prometheus/Grafana/OTel).'
    ],
    skillsLabel: 'Picked up',
    skills: ['Go', 'PostgreSQL', 'pgvector', 'Docker', 'Kubernetes', 'Kafka', 'gRPC', 'React'],
    isCurrent: true
  },
  {
    id: 'fanshawe',
    type: 'EDUCATION',
    period: 'Jan 2023 – Aug 2024',
    title: 'Ontario College Graduate Certificate, Electronics & Embedded Systems',
    organization: 'Fanshawe College',
    location: 'London, Canada',
    summary: "President's Honour Roll & Dean's Honour Roll (four terms, GPA 4.04 / 4.2). Graduate program focused primarily on PIC microcontroller development and Embedded C programming.",
    details: [
      'Studied Operating Systems, Systems Programming, RTOS, Digital Logic, Embedded Network Protocols, Telecommunications, and PIC microchip hardware interfacing in Embedded C.',
      'Completed Web Interfaces for HMI and Application Development coursework with brief beginner exposure to Vue.js and React Native.'
    ],
    skillsLabel: 'Picked up',
    skills: []
  },
  {
    id: 'amazon',
    type: 'EXPERIENCE',
    period: 'Mar 2022 – Dec 2022',
    title: 'Senior Product Compliance Associate',
    organization: 'Amazon',
    location: 'Bangalore, India',
    summary: 'Safeguarded consumer safety and marketplace integrity through regulatory product compliance assessments, SOP-driven risk classification, and cross-functional safety initiatives.',
    details: [
      'Conducted detailed assessments against rules, regulations, and industry standards—identifying, classifying, and restricting non-compliant products using established SOPs and risk rationale.',
      'Monitored and analyzed product data to proactively detect safety concerns, preventing non-compliant products from reaching consumers.',
      'Collaborated with legal, quality assurance, and operations teams to track evolving regulatory requirements and implement mitigation strategies.'
    ],
    skillsLabel: 'Picked up',
    skills: ['Regulatory Compliance', 'Risk Mitigation', 'Product Vetting', 'SOP Governance', 'Cross-Functional Ops']
  },
  {
    id: 'natwest',
    type: 'EXPERIENCE',
    period: 'Jan 2019 – Feb 2022',
    title: 'Operations Analyst',
    organization: 'NatWest Group',
    location: 'Chennai, India',
    summary: 'Maintained and reconciled multiple financial accounts, audited chargeback discrepancies, and investigated complex fraud cases under strict bookkeeping and regulatory standards.',
    details: [
      'Maintained and balanced multiple accounts via computerized bookkeeping systems, verifying transaction accuracy, flagging suspicious activity, and producing compliance reports.',
      'Performed in-depth audits and reconciliations across chargeback operations and fraud cases to resolve discrepancies and uphold policy and legal compliance.',
      'Investigated complex fraud cases and authored detailed resolution reports supporting organizational fraud prevention and mitigation.'
    ],
    skillsLabel: 'Picked up',
    skills: ['Account Reconciliation', 'Fraud Investigation', 'Chargeback Operations', 'Transaction Auditing', 'Regulatory Compliance']
  },
  {
    id: 'ece',
    type: 'EDUCATION',
    period: '2014 – 2018',
    title: 'B.Tech, Electronics & Communication Engineering',
    organization: 'Guru Gobind Singh Indraprastha University',
    location: 'Delhi, India',
    summary: 'Core engineering foundation in computer architecture, digital logic, networking protocols, and signal processing.',
    details: [
      'Gained first-principles understanding of hardware-software boundaries, memory registers, and discrete mathematics.',
      'Completed embedded micro-controller projects with real-time sensor data telemetry and C programming.'
    ],
    skillsLabel: 'Picked up',
    skills: ['C++', 'Digital Logic', 'Network Protocols', 'Algorithms', 'Mathematics']
  }
];
