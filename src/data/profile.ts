export interface ProfileData {
  name: string;
  handle: string;
  initials: string;
  role: string;
  location: string;
  phone?: string;
  availability: string;
  headline: string;
  shortBio: string;
  aboutBio: string;
  email: string;
  github: string;
  linkedin: string;
  youtube?: string;
  leetcode?: string;
  resumeUrl: string;
  lastUpdated: string;
  stats: {
    label: string;
    value: string;
    detail: string;
  }[];
  usefulAreas: {
    icon: string;
    title: string;
    description: string;
  }[];
  habits: {
    num: string;
    title: string;
    principle: string;
    example: string;
    summary?: string;
  }[];
}

export const profile: ProfileData = {
  name: "Aswin Sreeraj",
  handle: "aswinsreeraj",
  initials: "AS",
  role: "Backend & Full-Stack Developer | Go",
  location: "Kerala, India",
  availability: "Open to backend roles",
  headline: "Backend engineer building reliable services.",
  shortBio: "Building reliable REST APIs, distributed services, and database-driven applications in Go with strong focus on concurrency control, transaction integrity, and clean architecture.",
  aboutBio: "I am a backend engineer based in Kerala, India, focused on building reliable REST and gRPC services, concurrent workflows, and database-backed platforms in Go and Python. My engineering foundation started in electronics (GGSIPU, Delhi), followed by financial account reconciliation and fraud investigation at NatWest Group (Jan 2019 – Feb 2022), product compliance and risk mitigation at Amazon (Mar 2022 – Dec 2022), and Honours graduate study in Electronics & Embedded Systems at Fanshawe College, Canada (PIC microcontrollers & Embedded C; GPA 4.04 / 4.2). I am currently advancing backend systems engineering at Brototype (Aug 2025 – Present), where I was recognized as Overall Best Performer for June 2026.\n\nWithin my engineering work, I have built platforms including ARDA (Go + Python multi-tenant AI agent control plane & pgvector HNSW reliability gate), EVNTX (multi-role event ticketing & escrow wallet platform), and Tenome Micro (4-service Go/gRPC/Kafka/Ollama/OTel platform). When I am not optimizing SQL queries or tuning concurrency boundaries, I actively explore distributed systems research, database storage internals, and engineering postmortems.",
  email: "aswinsreeraj96@gmail.com",
  github: "https://github.com/aswinsreeraj",
  linkedin: "https://linkedin.com/in/aswinsreeraj",
  youtube: "https://youtube.com/@aswinsreeraj96",
  resumeUrl: "/Aswin_Sreeraj.pdf",
  lastUpdated: "2026-11",
  stats: [
    {
      value: "0.75 ms",
      label: "HNSW DB RETRIEVAL",
      detail: "pgvector HNSW retrieval (99.4% Recall@1 at N=10k) in ARDA Reliability Service"
    },
    {
      value: "98.9 µs",
      label: "TOOL GATEWAY WRITE",
      detail: "Go 10-step ToolGateway write microbenchmark in ARDA control plane"
    },
    {
      value: "491 tests",
      label: "AUTOMATED SUITES",
      detail: "272 Go test/benchmark funcs + 219 Python reliability/HNSW/Redpanda tests"
    },
    {
      value: "4 services",
      label: "OTEL EVENT MESH",
      detail: "Gateway, Search, Ollama AI & Notify with Kafka claim-check + Tempo traces"
    }
  ],
  usefulAreas: [
    {
      icon: "layers",
      title: "APIs and services",
      description: "Designing high-concurrency Go microservices, REST & gRPC endpoints, and deterministic state-machines following Clean Architecture."
    },
    {
      icon: "shield-check",
      title: "Reliability and performance",
      description: "Hardening distributed services with optimistic concurrency control, idempotency keys, Kafka event streaming, and connection pool tuning."
    },
    {
      icon: "database",
      title: "Data and integrations",
      description: "PostgreSQL transactional ledgers, row-level locks, Redis/Dragonfly caching, pgvector dense embeddings, and Model Context Protocol (MCP) toolkits."
    }
  ],
  habits: [
    {
      num: "01",
      title: "Design before coding",
      principle: "Model database schemas, state machines, and API contracts before touching implementation code.",
      example: "In EVNTX, drafting the multi-party wallet ledger and explicit booking state transitions eliminated concurrency bugs early.",
      summary: "Model database schemas, state machines, and API contracts before touching implementation code — e.g. in EVNTX, drafting the multi-party wallet ledger and explicit booking state transitions eliminated concurrency bugs early."
    },
    {
      num: "02",
      title: "Instrument from day one",
      principle: "Structured JSON logging, OpenTelemetry traces, and Prometheus metrics on every synchronous and async path.",
      example: "In Tenome Micro, OpenTelemetry traceparent headers propagate from Gin across gRPC, Kafka, and Ollama into Grafana Tempo.",
      summary: "Structured JSON logging (`zerolog`/`zap`) and distributed OpenTelemetry traces on every hop — e.g. in Tenome Micro, OTel context flows across HTTP, gRPC, Kafka & Ollama into Tempo."
    },
    {
      num: "03",
      title: "Test failure paths first",
      principle: "Write integration tests for payment verification recovery, expired locks, and worker crashes before the happy path.",
      example: "In EVNTX, VerifyPayment triggers automatic Razorpay refunds when payments clear after the 1-minute reservation hold has expired.",
      summary: "Write integration tests for payment verification recovery, expired locks, and worker crashes before the happy path — e.g. in EVNTX, VerifyPayment automatically triggers Razorpay refunds when payments clear after the 1-minute hold expired."
    }
  ]
};
