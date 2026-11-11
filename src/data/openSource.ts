export interface OpenSourceRepo {
  name: string;
  repoUrl: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  tags: string[];
}

export interface PullRequestContribution {
  id: string;
  title: string;
  repo: string;
  repoUrl: string;
  prNumber: number;
  prUrl: string;
  status: 'merged' | 'open';
  date: string;
  summary: string;
  impact: string;
  linesAdded: number;
  linesDeleted: number;
}

export interface IssueContribution {
  id: string;
  title: string;
  repo: string;
  repoUrl: string;
  issueNumber: number;
  issueUrl: string;
  status: 'resolved' | 'closed';
  date: string;
  summary: string;
}

export const openSourceData = {
  stats: {
    contributionsThisYear: 428,
    pullRequestsMerged: 18,
    issuesResolved: 24,
    repositoriesCount: 12
  },
  featuredRepositories: [
    {
      name: 'oras-project/oras-go',
      repoUrl: 'https://github.com/oras-project/oras-go',
      description: 'OCI Registry As Storage (ORAS) Go client library. Contributed code, documentation, and tests to the Go implementation; reviewed and merged upstream.',
      stars: 680,
      forks: 145,
      language: 'Go',
      tags: ['go', 'oci', 'oras', 'containers', 'cloud-native']
    },
    {
      name: 'aswinsreeraj/arda',
      repoUrl: 'https://github.com/aswinsreeraj/arda',
      description: 'Multi-tenant AI agent control plane and governance platform (Go + Python) with bounded execution loops, Temporal workflows, Vault BYOK custody, 10-step MCP tool guardrails, and pgvector reliability gating.',
      stars: 0,
      forks: 0,
      language: 'Go',
      tags: ['go', 'python', 'agents', 'temporal', 'pgvector', 'mcp']
    },
    {
      name: 'aswinsreeraj/evntx',
      repoUrl: 'https://github.com/aswinsreeraj/evntx',
      description: 'Full-stack multi-role ticketing and escrow wallet platform in Go (Clean Architecture) and React 19/TypeScript with optimistic CAS reservations and late-capture Razorpay auto-refunds.',
      stars: 0,
      forks: 0,
      language: 'Go',
      tags: ['go', 'gin', 'postgresql', 'concurrency', 'docker']
    },
    {
      name: 'aswinsreeraj/tenome-micro',
      repoUrl: 'https://github.com/aswinsreeraj/tenome-micro',
      description: '4-service event-driven Go platform (gateway, search, AI summarization via Ollama, DLT notifications) with Kafka, Dragonfly, SQLite & OpenTelemetry.',
      stars: 0,
      forks: 0,
      language: 'Go',
      tags: ['go', 'grpc', 'kafka', 'dragonfly', 'ollama', 'otel', 'kubernetes']
    }
  ] as OpenSourceRepo[],

  pullRequests: [
    {
      id: 'pr-oras',
      title: 'Go Client SDK Implementation, Tests & Documentation Enhancements',
      repo: 'oras-project/oras-go',
      repoUrl: 'https://github.com/oras-project/oras-go',
      prNumber: 0,
      prUrl: 'https://github.com/oras-project/oras-go/pulls?q=is%3Apr+state%3Aclosed+author%3Aaswinsreeraj',
      status: 'merged',
      date: '2024',
      summary: 'Contributed Go code, documentation improvements, and unit/integration test coverage to the CNCF ORAS Go client SDK.',
      impact: 'Reviewed and merged upstream in CNCF / ORAS Go client library.',
      linesAdded: 0,
      linesDeleted: 0
    }
  ] as PullRequestContribution[],

  issuesResolved: [] as IssueContribution[]
};
