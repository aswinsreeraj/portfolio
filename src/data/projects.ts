export interface ProjectData {
  id: string;
  number: string; // e.g. "PROJECT 01"
  name: string;
  tagline: string;
  status: 'In Progress' | 'Completed' | 'Learning Project';
  shortDescription: string;
  technologies: string[];
  githubUrl: string;
  repositories?: {
    label: string;
    url: string;
  }[];
  demoUrl?: string;
  youtubeUrl?: string;
  videoUrl?: string;
  screenshotUrl: string;
  screenshotFit?: 'cover' | 'contain';
  screenshotBg?: 'dark' | 'light';
  screenshotLabel?: string;
  gallery?: {
    src: string;
    title: string;
    caption: string;
    badge?: string;
    cropPreview?: boolean;
  }[];
  metrics: {
    label: string;
    value: string;
  }[];
  overview: string;
  constraints: string;
  features: string[];
  techStackDetailed: {
    category: string;
    items: string[];
  }[];
  architecture: {
    description: string;
    diagramFlow: string[];
    components: {
      step: number;
      name: string;
      role: string;
      details: string;
    }[];
  };
  decisions: {
    title: string;
    why: string;
    rejected: string;
  }[];
  whatWentWrong?: {
    title: string;
    story: string;
    learned: string;
  };
  evidence?: {
    p99Latency: string;
    sustainedLoad: string;
    failureTests: string;
    benchmarkSnippet: string;
  };
}

export const projectsData: ProjectData[] = [
  {
    id: 'arda',
    number: 'PROJECT 01',
    name: 'ARDA',
    tagline: 'Auditable, Reliable, Durable Agents Platform',
    status: 'In Progress',
    shortDescription: 'A polyglot multi-tenant control plane and governance platform (Go + Python) that runs configurable LLM agents inside bounded execution loops, enforces 10-step MCP tool guardrails and Vault BYOK custody, and gates autonomous decisions using pgvector historical precedent.',
    technologies: ['Go', 'Python', 'PostgreSQL', 'pgvector', 'Temporal', 'gRPC', 'Redpanda', 'Vault', 'MCP'],
    githubUrl: 'https://github.com/aswinsreeraj/arda',
    repositories: [
      {
        label: 'Source: arda (Go Control Plane)',
        url: 'https://github.com/aswinsreeraj/arda'
      },
      {
        label: 'Source: arda-reliability-service (Python)',
        url: 'https://github.com/aswinsreeraj/arda-reliability-service'
      }
    ],
    videoUrl: '/projects/arda.mp4',
    screenshotUrl: '/projects/arda-communication.jpg',
    screenshotFit: 'cover',
    screenshotBg: 'light',
    screenshotLabel: 'control plane · guardrails & vector gate',
    gallery: [
      {
        src: '/projects/arda-communication.jpg',
        title: 'Service Communication & Trust Boundaries',
        badge: 'System Architecture',
        caption: 'Fig. 1 · Multi-service communication topology across the API Gateway (REST/WS), Agent Registry & Execution Plane, 10-step Tool Gateway / MCP Connection Manager, pgvector Reliability Service (gRPC), Temporal workflows, HashiCorp Vault, and Redpanda event streams.'
      },
      {
        src: '/projects/arda-scalability.jpg',
        title: 'Scalability & Workload Isolation Plan',
        badge: 'Scalability Blueprint',
        caption: 'Fig. 2 · Planned Kubernetes horizontal scaling blueprint isolating I/O-bound Go control/execution pods from CPU/embedding-bound Reliability workers, read-replicated PostgreSQL + HNSW retrieval, partitioned Redpanda consumers, and Redis rate-limiting state.'
      }
    ],
    metrics: [
      { label: 'PGVECTOR HNSW (N=10K)', value: '0.75 ms DB' },
      { label: 'TOOL GATEWAY WRITE', value: '98.9 µs' },
      { label: 'AUTOMATED TESTS', value: '491 specs' }
    ],
    overview: 'ARDA (Auditable, Reliable, Durable Agents) separates deterministic governance from probabilistic LLM reasoning across two dedicated repositories: a Go control plane and execution engine (arda) paired with a hexagonal Python reliability microservice (arda-reliability-service). Tenants author versioned agent snapshots locked by PostgreSQL immutability triggers, store BYOK LLM and MCP credentials exclusively in HashiCorp Vault KV v2, and execute agents across Temporal durable workflows (async) or realtime sync paths under bounded token/iteration budgets, custom Draft-07 schema checks, 10-step Tool Gateway guardrails, and pgvector HNSW precedent gating.',
    constraints: 'Tenant isolation strips client-supplied X-Tenant-ID headers at Gateway/Execution ingress and re-verifies JWT claims on gRPC metadata and Vault KV v2 paths. Plaintext secrets are rejected at Registry validation and masked ([REDACTED]) in audit logs; published agent_versions are enforced immutable via PostgreSQL triggers (SQLSTATE P0001); custom Draft-07 validation caps schemas at 64 KB / 100k steps with remote $refs disabled; MCP endpoints block SSRF metadata IPs; and both tool guardrails and the reliability gate fail closed on policy breaches or insufficient precedent.',
    features: [
      'Control Plane & Vault BYOK Custody: Gin Gateway (HS256 JWT + 4-role RBAC), gRPC Agent Registry with PostgreSQL immutability triggers, and HashiCorp Vault KV v2 credential storage with permanent DestroySecret purging.',
      'Dual-Mode Bounded Execution: Shared AgentRuntime hosting Temporal durable workflows (AgentExecutionWorkflow on arda-v1-task-queue) and realtime sync mode, enforcing BudgetTracker limits across 6 LLM adapters (OpenAI, Anthropic, Gemini, Groq, Grok, OpenRouter).',
      '10-Step Tool Gateway & MCP Sandbox: Evaluates allowlists, Draft-07 input_schema validation, CompositeGuardrail business rules, IdempotencyLockManager SHA-256 deduplication, SSRF-guarded MCP dispatch, and redacted AuditEvent persistence.',
      'pgvector HNSW Reliability Service (Completed — Python): Embeds only case_description via BAAI/bge-small-en-v1.5 (384-d), retrieves tenant-scoped precedents using iterative_scan=strict_order (99.4% Recall@1 at N=10k), and scores Agreement × Density × Coverage under a 6-stage fail-closed gate.',
      'Cross-Language Human Feedback Loop (Completed — Python): Async aiokafka consumer inside arda-reliability-service reading arda.human-resolutions.v1, validating canonical 13-field HMAC-SHA256 Go/Python signatures, quarantining conflicting labels, committing atomically to Postgres, and relaying safely to DLQ.'
    ],
    techStackDetailed: [
      { category: 'Control & Execution Plane', items: ['Go 1.27', 'Gin HTTP', 'Temporal Go SDK', 'gRPC & Protobuf (bufconn)'] },
      { category: 'Reliability & ML Service', items: ['Python 3.15', 'BAAI/bge-small-en-v1.5', 'SQLAlchemy + asyncpg', 'scikit-learn / NumPy'] },
      { category: 'Data, Vectors & Secrets', items: ['PostgreSQL 16', 'pgvector (HNSW cosine)', 'HashiCorp Vault KV v2', 'Alembic & golang-migrate'] },
      { category: 'Governance, Events & MCP', items: ['Redpanda (Kafka / aiokafka)', 'Model Context Protocol (mcp-go)', 'Custom Draft-07 JSON Schema'] }
    ],
    architecture: {
      description: 'Implemented across a completed Go control/execution platform (Gateway, gRPC Registry, Execution Service, Temporal Workers, shared AgentRuntime + 10-step ToolGateway, HashiCorp Vault) and a completed hexagonal Python Reliability Service (arda-reliability-service: gRPC gate, BAAI/bge-small-en-v1.5 embeddings, pgvector HNSW strict_order scans, multiplicative gating, and Redpanda feedback consumer). The dedicated Human Review service and web Frontend—alongside standalone Notification/Audit consumers, transactional outbox relays, Kubernetes HPA, and OTel observability shown in Fig. 1 and Fig. 2—remain pending.',
      diagramFlow: [
        'Client HTTP Request',
        'Gin Gateway (JWT & RBAC)',
        'Temporal / Sync Runtime',
        '10-Step ToolGateway & MCP',
        'Python Reliability Gate (gRPC)',
        'Redpanda Feedback Loop'
      ],
      components: [
        {
          step: 1,
          name: 'API Gateway & Identity',
          role: 'Go · Gin · HS256 JWT · RBAC',
          details: 'Terminates public HTTP/REST traffic, validates HS256 JWTs and 4-role permissions (super_admin, company_admin, agent_developer, reviewer), manages bcrypt users/memberships atomically, and never trusts client tenant headers.'
        },
        {
          step: 2,
          name: 'Agent Registry & Vault KV v2',
          role: 'Go · gRPC · Postgres · HashiCorp Vault',
          details: 'Enforces InternalAuthInterceptor x-tenant-id checks, blocks plaintext credentials, locks published agent_versions via Postgres triggers (trg_agent_versions_immutability), and purges KV v2 metadata via Vault DestroySecret.'
        },
        {
          step: 3,
          name: 'Execution Plane & Temporal Runtime',
          role: 'Go · Temporal SDK · pkg/agentruntime',
          details: 'Runs durable crash-resilient workflows (StartToCloseTimeout 30s, exponential backoff) and synchronous realtime calls through one shared AgentRuntime, bounded by BudgetTracker and custom DoS-capped Draft-07 schema validation.'
        },
        {
          step: 4,
          name: '10-Step Tool Gateway & MCP',
          role: 'Go · Guardrails · SHA-256 Idempotency',
          details: 'Guards every MCP call (inprocess TransactionSimulator or cmd/mcp-server): allowlist, input_schema, CompositeGuardrail denials (~11.7 µs), per-key idempotency deduplication, cloud-metadata SSRF blocking, and secret masking.'
        },
        {
          step: 5,
          name: 'Reliability Gate Service (Completed)',
          role: 'Python · Async gRPC · pgvector HNSW',
          details: 'Completed hexagonal service (arda-reliability-service) using BAAI/bge-small-en-v1.5 (384-d) and pgvector HNSW with strict_order iterative scans (0.75 ms DB / 99.4% Recall@1 at N=10k), multiplicative scoring, 6-stage gating, and deferred calibration behind CalibratorPort.'
        },
        {
          step: 6,
          name: 'Redpanda Feedback Pipeline (Completed)',
          role: 'Python · aiokafka · HMAC-SHA256',
          details: 'Completed inside arda-reliability-service: validates canonical cross-language signatures, enforces 300s replay windows and bot-reviewer regex screening, quarantines conflicting precedents, persists feedback idempotently, and ensures synchronous DLQ offset safety.'
        },
        {
          step: 7,
          name: 'Human Review Service & Frontend (Pending)',
          role: 'Go · Review Queue · Web UI (Upcoming)',
          details: 'Pending next phase: standalone Human Review service for reviewer case assignment/resolutions (publishing signed arda.human-resolutions.v1 events) and the tenant-facing web Frontend, plus standalone Notification/Audit consumers and Kubernetes deployment.'
        }
      ]
    },
    decisions: [
      {
        title: 'HTTP/JSON Public Gateway + Internal gRPC (with In-Process bufconn Mode)',
        why: 'Gives web and external callers ergonomic REST/JSON APIs while enforcing typed .proto contracts (AgentRegistryService and ReliabilityService) and x-tenant-id gRPC metadata internally. In-process bufconn keeps local development single-binary while exercising real gRPC serialization and interceptors.',
        rejected: 'Public gRPC APIs (incompatible with standard browsers/REST webhooks without Envoy proxies) and un-typed internal HTTP forwarding (lost contract safety and bypassed interceptor auth).'
      },
      {
        title: 'PostgreSQL + pgvector HNSW (iterative_scan = strict_order) over Dedicated Vector DB',
        why: 'Co-locating 384-d BAAI/bge-small-en-v1.5 embeddings alongside relational tenant/agent scopes and human_feedback_events guarantees ACID transactions across idempotency checks and conflict quarantine. Enabling SET LOCAL hnsw.iterative_scan = strict_order prevents pgvector 0.8.x filtered scans from terminating with 0 rows on multi-tenant partitions, achieving 99.4% Recall@1 in 0.75 ms at N=10k.',
        rejected: 'Standalone/SaaS vector stores (introduced split-brain consistency between precedent vectors and Postgres idempotency tables) and 768-d E5-base embeddings (2x HNSW memory footprint without accuracy gain).'
      },
      {
        title: 'Decomposed Multiplicative Score + Intentionally Deferred Calibration',
        why: 'Computing Agreement × Density × Coverage guarantees a zero-collapse veto when cold-starting or encountering conflicting twins under a 6-stage fail-closed gate. Because 5-fold connected-group CV on N=100 synthetic cases produced 0.5352 ROC-AUC, production calibration remains behind UnavailableCalibrator (is_calibrated = false) until N >= 1,000 live human adjudications, with Protobuf keeping raw_score separate from optional calibrated_confidence.',
        rejected: 'Fitting Platt or Isotonic scaling on tiny synthetic datasets, which compressed probabilities to [0.4813, 0.5465] coin-flip noise and risked masking missing precedent behind pseudo-probabilities.'
      },
      {
        title: 'Dual Durable/Sync Execution Mode & Bounded Custom Draft-07 Schema Engine',
        why: 'Temporal isolates non-deterministic LLM/MCP calls inside activities with exponential retries for durable recovery, while mode="sync" serves interactive requests via the identical AgentRuntime library. A bespoke Draft-07 validator restricts schema size (64 KB), depth (10), regex length (250 chars), and evaluation steps (100k) while forbidding remote $refs.',
        rejected: 'Purely async or purely sync architectures, and off-the-shelf schema libraries permitting unbounded regexes or external HTTP $ref SSRF resolution.'
      }
    ],
    evidence: {
      p99Latency: '0.75 ms DB (HNSW)',
      sustainedLoad: '98.9 µs Gateway',
      failureTests: '491 passing tests',
      benchmarkSnippet: `# Go Tool Gateway Microbenchmarks (pkg/toolgateway/benchmarks_test.go)
Benchmark_SuccessfulRead       ~93.4 µs/op    28.4 KB/op    450 allocs/op
Benchmark_SuccessfulWrite      ~98.9 µs/op    31.2 KB/op    496 allocs/op
Benchmark_GuardrailDenial      ~11.7 µs/op     6.3 KB/op     64 allocs/op

# Python Reliability pgvector HNSW (N=10,000, m=16, ef_c=64, ef_s=64)
HNSW Recall@1: 99.4% | Recall@5: 98.8% | DB Time: 0.75 ms (Pipeline p50: 11.8 ms)`
    },
    whatWentWrong: {
      title: 'Silent Zero-Row Truncation on Filtered pgvector HNSW Scans',
      story: 'On a shared 12,650-row multi-tenant table, filtered cosine queries for a 1,000-row partition silently returned 0 rows (0.0% recall) under default hnsw.iterative_scan = off because HNSW exhausted ef_search scanning other agents\' vectors. Adding SET LOCAL hnsw.iterative_scan = strict_order restored 99.1% Recall@1 and 98.9% Recall@5.',
      learned: 'Always test filtered HNSW recall across multi-tenant partition densities, and enable iterative_scan = strict_order on shared pgvector tables.'
    }
  },
  {
    id: 'evntx',
    number: 'PROJECT 02',
    name: 'EVNTX',
    tagline: 'Multi-Role Event Discovery, Ticketing & Escrow Wallet Platform',
    status: 'Completed',
    shortDescription: 'A full-stack multi-role event management and ticketing platform built with Go (Clean Architecture, Gin, PostgreSQL/GORM) and React 19/TypeScript. Solves ticket tier overselling, 1-minute checkout hold expiration, escrow organizer settlement, and split-fee refund accounting across Razorpay and an internal wallet ledger.',
    technologies: ['Go', 'Gin', 'GORM', 'PostgreSQL', 'React', 'TypeScript', 'TanStack Query', 'Zustand', 'Docker', 'Razorpay', 'AWS S3'],
    githubUrl: 'https://github.com/aswinsreeraj/evntx',
    videoUrl: '/projects/evntx.mp4',
    screenshotUrl: '/projects/evntx-landing.jpg',
    screenshotFit: 'cover',
    screenshotBg: 'light',
    screenshotLabel: 'ticketing · atomic locks & escrow vault',
    gallery: [
      {
        src: '/projects/evntx-landing.jpg',
        title: 'EVNTX — Event Discovery & Multi-Role Frontend',
        badge: 'Frontend UI',
        cropPreview: true,
        caption: 'Fig. 1 · EVNTX landing page UI featuring category/city search, upcoming event cards, organizer onboarding CTA, and multi-role React 19 SPA entrypoints. Click to view full scrollable page.'
      }
    ],
    metrics: [
      { label: 'CHECKOUT HOLD TTL', value: '1 min window' },
      { label: 'DB CONNECTION POOL', value: '25 max / 10 idle' },
      { label: 'EVENT CACHE TTL', value: '60s RWMutex' }
    ],
    overview: 'EVNTX serves attendees (goer), event hosts (organizer), and platform operators (admin) across a Clean Architecture Go monolith (29 AutoMigrate tables in PostgreSQL) and a feature-modular React 19 TypeScript SPA. Attendees log in passwordlessly via 6-digit bcrypt Email OTP or Google OAuth, reserve ticket tiers under a 1-minute hold via optimistic compare-and-swap, check out via Razorpay or their internal wallet, and present single-use QR tickets scanned live in-browser. Organizers manage draft-to-live lifecycles, monitor anonymous-to-booking engagement funnels, and withdraw settled escrow earnings into AES-256-GCM-encrypted bank/UPI accounts.',
    constraints: 'Ticket reservations must prevent overselling without locking out concurrent browsers (3-attempt optimistic CAS on ticket_type_models.version); QR check-ins (CheckInTicket) and wallet transfers must run inside ACID transactions with PostgreSQL FOR UPDATE row locks enforcing valid -> used ticket exclusivity and non-negative withdrawable balance (available_balance - abs(reserve_balance)); Razorpay late captures past the 1-minute hold must fail safely (EVT_015) and trigger an automatic Razorpay refund API call; auth routes enforce per-IP token-bucket rate limits; and payout bank/IFSC/UPI credentials are encrypted via AES-256-GCM.',
    features: [
      'Concurrency-Safe Ticket Reservation & QR Check-In: Optimistic CAS on ticket_type_models (version = version + 1 WHERE available_quantity >= qty) across 3 retry attempts, paired with FOR UPDATE row locks on single-use QR ticket scans via html5-qrcode.',
      'Escrow Settlement & Multi-Bucket Wallet Ledger: Multi-bucket user/organizer wallets (available, pending, reserve) plus singleton platform treasury ledger; completed events release earnings via SettleEventEarnings (5% organizer fee) while reserve_balance guards refunded platform fees.',
      'Razorpay Signature Verification & Late-Capture Auto-Refunds: HMAC signature verification (POST /payments/razorpay/verify), FetchOrder verification for wallet top-ups, and automatic RefundPayment calls when payment completes after the 1-minute reservation expired.',
      'In-Process Caching & Cron Lifecycle Workers: 60s sync.RWMutex cache on event details, IP token-bucket rate limiting, and embedded robfig/cron workers every 10m (booking expiry), 30m (payout settlement), and 45m (event settlement) logged to job_log_models.',
      'Passwordless Security, AES-GCM Secrets & Funnel Analytics: 6-digit CSPRNG bcrypt OTP, 15m JWT / SHA-256 hashed 7d refresh sessions, Google OAuth, AES-256-GCM payout encryption, S3/local storage uploads, and daily ON CONFLICT funnel rollups.'
    ],
    techStackDetailed: [
      { category: 'Backend Engine', items: ['Go 1.25', 'Gin v1.12', 'Clean Architecture', 'robfig/cron/v3', 'zerolog'] },
      { category: 'Database & Locking', items: ['PostgreSQL', 'GORM + pgx/v5', 'Optimistic CAS (version)', 'FOR UPDATE Row Locks'] },
      { category: 'Payments & Security', items: ['Razorpay Go SDK', 'HMAC + Auto-Refund', 'HS256 JWT / Google OAuth', 'AES-256-GCM Payouts'] },
      { category: 'Frontend & Hosting', items: ['React 19', 'TypeScript 5.9', 'TanStack Query v5', 'Zustand v5', 'Recharts', 'Docker', 'AWS S3', 'Vercel'] }
    ],
    architecture: {
      description: 'Clean Architecture Go monolith (internal/domain -> repository -> usecase -> GORM/infra -> Gin HTTP delivery) paired with a feature-modular React 19 TypeScript SPA on Vercel. Designed for predictable single-instance deployment over AWS S3 and PostgreSQL without extra Redis or message broker hops.',
      diagramFlow: [
        'SPA / Browser Client',
        'Gin REST & JWT/RBAC',
        '60s Cache / CAS Hold (1m TTL)',
        'Razorpay & Wallet FOR UPDATE',
        'QR Check-In & AES Payouts',
        'Cron Reconcilers (10m / 30m / 45m)'
      ],
      components: [
        {
          step: 1,
          name: 'HTTP Delivery & In-Memory Cache',
          role: 'Go · Gin · Middleware · sync.RWMutex',
          details: '10 Gin REST handlers with JWT/RBAC middleware, IP token-bucket rate limiters, Zerolog error logging, pprof routes, and a 60s TTL cache invalidated on organizer updates.'
        },
        {
          step: 2,
          name: 'Booking & QR Check-In Engine',
          role: 'Go · Optimistic CAS & FOR UPDATE',
          details: 'Executes compare-and-swap ticket_type_models reservations (1-minute TTL, 3 retries), enforces RefundWindowDays cancellations, and locks CheckInTicket rows against double entry.'
        },
        {
          step: 3,
          name: 'Payment & Late-Capture Recovery',
          role: 'Razorpay SDK · HMAC · Wallet Rail',
          details: 'Handles free tickets, Razorpay signature verification, FetchOrder top-up verification, split-fee refunds, and automatic RefundPayment calls on late captures.'
        },
        {
          step: 4,
          name: 'Escrow Wallet & Treasury Ledger',
          role: 'PostgreSQL ACID · AES-256-GCM',
          details: 'Maintains available/pending/reserve organizer buckets plus a singleton platform treasury wallet with append-only transaction trails and AES-GCM encrypted payout info.'
        },
        {
          step: 5,
          name: 'Cron Reconcilers & Funnel DB',
          role: 'robfig/cron · AWS S3 · Engagement',
          details: 'Runs 2m-timeout cron jobs (3 retries -> job_log_models), upserts anonymous-to-booking funnel metrics via ON CONFLICT, and abstracts local/S3 storage.'
        },
        {
          step: 6,
          name: 'React 19 Feature SPA',
          role: 'React 19 · TS · TanStack Query · Vercel',
          details: 'Role-segmented modules (goer, organizer, admin) with Axios refresh interceptors, Razorpay checkout, Recharts funnel reports, RFC-4180 CSV export, and html5-qrcode scanner.'
        }
      ]
    },
    decisions: [
      {
        title: 'Hybrid Locking: Optimistic CAS on Inventory vs. FOR UPDATE on Wallets & Check-In',
        why: 'ReserveTickets performs compare-and-swap updates on ticket_type_models.version with 3 retries to eliminate lock contention on concurrent browsers, whereas PayWithWallet, ApplyPlatformTransaction, and CheckInTicket acquire PostgreSQL FOR UPDATE row locks so ledger balances and one-time QR scans never read stale state.',
        rejected: 'Pessimistic FOR UPDATE locks on browsed ticket tiers (bottlenecks concurrent buyers) or lock-free optimistic retries on interdependent multi-wallet debits.'
      },
      {
        title: 'In-Process Cache, IP Token Buckets & Embedded Cron over Redis/Brokers',
        why: 'Consolidating the 60s event cache (sync.RWMutex), per-IP auth rate limiters, and robfig/cron reconcilers inside one Go monolith minimizes EC2 operational surface down to Go + PostgreSQL + S3.',
        rejected: 'Running extra Redis and queue broker infrastructure on a single-instance deployment (acknowledged trade-off: requires externalizing state before multi-replica horizontal scaling).'
      },
      {
        title: 'Escrow Settlement (pending_balance) & Split-Fee Reserve Tracking',
        why: 'Booking proceeds enter pending_balance until SettleEventEarnings releases funds after event completion (deducting a 5% platform fee). Buyer cancellations calculate ticket-only refunds (payment.Amount - booking.TotalAmount) and record non-refundable fee obligations in reserve_balance, blocking payouts below zero withdrawable funds.',
        rejected: 'Allowing immediate organizer withdrawals before event completion or ignoring retained fee deficits during partial cancellations.'
      },
      {
        title: 'Automatic Razorpay Source Refunds on Expired Hold Captures',
        why: 'When a user finishes Razorpay payment after the 1-minute booking hold expired (ErrBookingExpiredPaymentSuccess / EVT_015), VerifyPayment automatically invokes RazorpayService.RefundPayment directly to the source method.',
        rejected: 'Keeping a manual admin refund queue (replaced in commit 38991b6) or stranding expired payments for support escalation.'
      }
    ],
    evidence: {
      p99Latency: '14.0% usecase cov',
      sustainedLoad: '60s RWMutex Cache',
      failureTests: '6/6 -race unit pass',
      benchmarkSnippet: `# Verified Go Race-Detector Unit Suite (internal/usecase/...)
$ go test -race -v ./internal/usecase/...
ok    evntx/internal/usecase    5.757s    6 top-level tests (11 subtests) PASS

# Integration & E2E Suites (require TEST_DB_DSN PostgreSQL instance)
- tests/integration/{auth,booking,wallet}_int_test.go (AutoMigrate + TRUNCATE CASCADE)
- tests/e2e/workflow_e2e_test.go (/health, reserve -> bookings, approve -> live event)
# Note: benchmark_test.go defines 4 HTTP benchmarks without checked-in run logs.`
    },
    whatWentWrong: {
      title: 'Expired-Hold Razorpay Captures & Split-Fee Organizer Reserve Deficits',
      story: 'Earlier builds used a manual admin refund queue when payments cleared after BookingExpirationJob freed inventory, and cancellations did not account for non-refundable platform fees in organizer balances. Refactoring VerifyPayment to trigger automatic Razorpay refunds on ErrBookingExpiredPaymentSuccess and tracking reserve_balance prevented unbacked withdrawals and manual refund queues.',
      learned: 'Automate late-capture gateway refunds right inside payment verification and explicitly model retained fee deficits inside escrow wallet accounting.'
    }
  },
  {
    id: 'tenome',
    number: 'PROJECT 03',
    name: 'Tenome Micro',
    tagline: 'Event-Driven Crawler, Search & Local-LLM Summarization Microservices',
    status: 'Completed',
    shortDescription: 'A 4-service event-driven Go platform (tenome-gateway, tenome-search, tenome-ai, tenome-notify) keeping synchronous Gin REST/gRPC search & crawl endpoints responsive while offloading HTML scraping, claim-check retrieval, local Ollama inference, DLT retries, and full OpenTelemetry tracing across Apache Kafka.',
    technologies: ['Go', 'Gin', 'gRPC', 'Kafka', 'Dragonfly', 'SQLite', 'Ollama', 'OpenTelemetry', 'Kubernetes', 'Docker'],
    githubUrl: 'https://github.com/aswinsreeraj/tenome-micro',
    videoUrl: '/projects/tenome.mp4',
    screenshotUrl: '/projects/tenome-architecture.jpg',
    screenshotFit: 'cover',
    screenshotBg: 'light',
    screenshotLabel: 'crawler · search, local llm & otel traces',
    gallery: [
      {
        src: '/projects/tenome-architecture.jpg',
        title: 'System Architecture & Event Flow',
        badge: 'System Architecture',
        caption: 'Fig. 1 · High-level service topology across API Gateway (tenome-gateway), Search Service (tenome-search), AI Service (tenome-ai + Ollama), Notify Worker (tenome-notify), Apache Kafka claim-check event streaming, SQLite/Dragonfly persistence, and OpenTelemetry/Grafana observability.'
      }
    ],
    metrics: [
      { label: 'GO MICROSERVICES', value: '4 standalone mods' },
      { label: 'CRAWL BACKPRESSURE', value: '100-slot / 4 workers' },
      { label: 'CACHE & EVENTS', value: 'Dragonfly + Kafka DLT' }
    ],
    overview: 'Tenome Micro separates API ingress, concurrent HTML crawling, full-text inverted-index search, local Ollama AI summarization, and fault-isolated notifications across four standalone Go modules (tenome-gateway, tenome-search, tenome-ai, and tenome-notify). Gin handles external REST traffic and translates it to internal gRPC calls with OpenTelemetry trace propagation; tenome-search maintains a startup-rehydrated in-memory inverted index fronted by Dragonfly cache and idempotent SQLite storage; tenome-ai hydrates lightweight Kafka page-processed claim-checks over gRPC for Ollama summarization; and tenome-notify handles retry backoff and Dead Letter Topic isolation alongside full Kubernetes/Helm and Docker Compose observability stacks.',
    constraints: 'Crawl ingestion enforces non-blocking bounded backpressure via a 100-job buffered channel returning ErrQueueFull (gRPC ResourceExhausted -> HTTP 429) rather than blocking callers; SQLite persistence enforces url UNIQUE + ON CONFLICT(url) DO UPDATE ... RETURNING id; per-hop deadlines bound execution (15s crawl, 5s Kafka publish, 10s gRPC GetPage, 60s Ollama HTTP, 120s gateway timeout); tenome-ai handles producer type/casing skew via FlexString; tenome-notify isolates poison pills immediately and routes exhausted retries to summary-generated-dlt; and active engineering gaps (0 automated tests, stubbed JWT auth, CrawlBatch drift, and ReadWriteOnce SQLite vs HPA limits) are tracked explicitly.',
    features: [
      'API Gateway & Trace Ingress (tenome-gateway): Gin middleware stack running otelgin, RequestID propagation (HTTP + gRPC metadata), structured Zap request logging, CORS, panic recovery, 120s timeout tolerating CPU LLM inference, gRPC status mapping, and aggregated health checks.',
      'Bounded Crawl Pool & Embedded Search Engine (tenome-search): 100-slot buffered channel -> 4 worker goroutines (15s timeout), pure-Go modernc.org/sqlite ON CONFLICT upserts, startup-rehydrated InvertedIndex, and Dragonfly 5m TTL cache-aside reads.',
      'Kafka Claim-Check Choreography & Local Ollama AI (tenome-ai): Consumes lightweight page-processed events, calls SearchService.GetPage via gRPC with 3x exponential retries, prompts self-hosted Ollama (qwen2.5:0.5b), and persists summaries to GORM SQLite via unique page_id indexes.',
      'Poison-Pill Isolation & Dead Letter Topics (tenome-notify): Consumes summary-generated with upfront schema validation committing malformed offsets safely, plus jittered (±20%) exponential backoff forwarding failures to summary-generated-dlt.',
      'Full Observability & Kubernetes/Helm Deployment: Exports OTLP spans across otelgin, otelgrpc, kafkaHeadersCarrier, and otelhttp into Grafana Tempo, collects structured logs via Grafana Alloy into Loki, scrapes Prometheus ServiceMonitors, and deploys via NGINX Gateway Fabric & Helm.'
    ],
    techStackDetailed: [
      { category: 'Go Services & RPC', items: ['Go 1.26', 'Gin v1.12', 'gRPC & Protobuf', 'grpc_health_v1', 'Zap Logging'] },
      { category: 'Messaging, Cache & DB', items: ['Apache Kafka (KRaft / kafka-go)', 'Dragonfly DB (go-redis/v9)', 'Pure-Go SQLite (modernc + GORM)'] },
      { category: 'Local LLM & Resilience', items: ['Ollama (qwen2.5:0.5b)', '100-slot Bounded Pool', 'Jittered Backoff & DLT', 'Graceful Drain'] },
      { category: 'Infra & Observability', items: ['OpenTelemetry (OTLP)', 'Tempo / Prometheus / Loki / Alloy', 'Kubernetes + Helm', 'NGINX Gateway Fabric'] }
    ],
    architecture: {
      description: 'Event-driven & gRPC-bridged microservices across 4 independent Go modules. Synchronous client commands/queries travel HTTP -> Gin Gateway -> gRPC; slow HTML crawling, local Ollama summarization, and notifications execute asynchronously over Kafka with OTel trace headers. Known open work includes unit/integration test suites, full JWT signature enforcement in Gateway auth, aligning CrawlBatch/query-param contracts, and migrating SQLite PVCs before multi-pod HPA scaling.',
      diagramFlow: [
        'HTTP Request / Query',
        'tenome-gateway (gRPC)',
        'tenome-search (4 Workers & Cache)',
        'Kafka (page-processed)',
        'tenome-ai (gRPC + Ollama)',
        'tenome-notify (Retries & DLT)'
      ],
      components: [
        {
          step: 1,
          name: 'tenome-gateway',
          role: 'Go · Gin HTTP Ingress · gRPC Client',
          details: 'Terminates public HTTP/REST traffic with RequestID, 120s timeout, gRPC-to-HTTP error mapping, aggregated /health checks, Prometheus /metrics, and Helm deployment templates.'
        },
        {
          step: 2,
          name: 'tenome-search',
          role: 'Go · gRPC/HTTP · SQLite · Dragonfly',
          details: 'Owns the 4-worker crawl engine, 100-slot backpressure queue, pure-Go SQLite ON CONFLICT persistence, in-memory InvertedIndex, Dragonfly 5m cache, and Kafka page-processed producer.'
        },
        {
          step: 3,
          name: 'tenome-ai',
          role: 'Go · Kafka Consumer · Ollama · gRPC',
          details: 'Hydrates claim-check pages via SearchService.GetPage, parses schema variants with FlexString, generates summaries with self-hosted Ollama (qwen2.5:0.5b), and persists GORM summary records.'
        },
        {
          step: 4,
          name: 'tenome-notify',
          role: 'Go · Kafka Worker · Retries & DLT',
          details: 'Consumes summary-generated with upfront poison-pill offset commits, jittered exponential backoff retries, atomic health/readiness probes, and Dead Letter Topic (summary-generated-dlt) routing.'
        },
        {
          step: 5,
          name: 'Observability Stack',
          role: 'OTel · Tempo · Prometheus · Loki/Alloy',
          details: 'Propagates W3C TraceContext across Gin, gRPC, HTTP, and Kafka headers; feeds service-graphs and span-metrics in Tempo, 15s Prometheus ServiceMonitor scrapes, and Alloy/Loki logs.'
        },
        {
          step: 6,
          name: 'Kubernetes & Local Infra',
          role: 'NGINX Gateway Fabric · Helm · PVCs',
          details: 'Deploys Kafka KRaft, Dragonfly DB, 20Gi Ollama PVC, SQLite PVCs, HPAs, and NGINX HTTPRoute via Minikube/K8s manifests (with Compose Stack for local runs).'
        }
      ]
    },
    decisions: [
      {
        title: 'Gin REST API Gateway Externally + Typed gRPC/Protobuf Internally',
        why: 'Centralizes cross-cutting HTTP edge concerns (RequestID, CORS, timeout, gRPC status mapping, unified /metrics) behind Gin while keeping inter-service calls strongly typed over HTTP/2 Protobuf and standard grpc_health_v1 probes.',
        rejected: 'Directly exposing tenome-search raw net/http endpoints or untyped internal REST calls (acknowledged learning: duplicating .proto files across Go modules caused CrawlBatch schema drift).'
      },
      {
        title: 'Kafka Claim-Check Pattern (page-processed Metadata -> gRPC GetPage) over Fat Payloads',
        why: 'Emitting lightweight pageId/url references instead of raw scraped HTML keeps Kafka topics lean and decouples 4 crawl workers cleanly from slow 60s Ollama LLM inference in tenome-ai.',
        rejected: 'Synchronous HTTP/gRPC chains to tenome-ai at crawl time (blocks crawl workers on LLM latency) or streaming full HTML blobs directly through Kafka brokers.'
      },
      {
        title: 'Pure-Go SQLite + Startup Inverted Index + Dragonfly over Postgres & Elasticsearch',
        why: 'Enables CGO_ENABLED=0 static Alpine containers with zero external RDBMS servers, automatic boot index rehydration, and fast Dragonfly search:<term> (5m TTL) cache reads inside a 6GiB Minikube memory envelope.',
        rejected: 'Deploying heavy PostgreSQL + OpenSearch clusters locally (documented trade-off: ReadWriteOnce SQLite PVCs and process-local InvertedIndex state require shared DB migration before multi-pod HPA scaling).'
      },
      {
        title: 'Self-Hosted Local Ollama Inference (qwen2.5:0.5b) Behind llm.Provider',
        why: 'Runs LLM summarization inside the cluster on a dedicated 20Gi PVC with zero external API keys or billing, wrapped in an interface so providers stay swappable; downsized from 14b to 0.5b (with 120s gateway timeout) to run reliably under 6GiB Minikube RAM.',
        rejected: 'Cloud inference APIs requiring secrets or 14b weights that OOM-constrained local Kubernetes nodes (fixed in commit cd7b81b).'
      }
    ],
    evidence: {
      p99Latency: '4 Go Services',
      sustainedLoad: '100-slot / 4 workers',
      failureTests: '0 unit tests yet',
      benchmarkSnippet: `# Verified Codebase & Test Inventory
- Modules: tenome-gateway, tenome-search, tenome-ai, tenome-notify (Go 1.26)
- Automated tests: 0 *_test.go files currently in repository (open engineering item)
- Backpressure: ErrQueueFull at 100 buffered CrawlJobs -> gRPC ResourceExhausted -> HTTP 429
- Observability: W3C OTel traceparent propagated across HTTP -> gRPC -> Kafka -> Ollama`
    },
    whatWentWrong: {
      title: 'Single-Node KRaft Quorum, Ollama Memory Exhaustion & Duplicate URL Constraint Failures',
      story: 'During Minikube rollouts, Kafka KRaft stalled when KAFKA_CONTROLLER_QUORUM_VOTERS pointed to 1@kafka:9093 instead of 1@localhost:9093, Ollama qwen2.5-coder:14b exceeded 8GiB node memory while gateway 15s timeouts cut off long generations, and SQLite re-crawls failed on UNIQUE(url). Fixing quorum voters, downsizing to qwen2.5:0.5b with 120s gateway timeouts, and switching to ON CONFLICT(url) DO UPDATE ... RETURNING id stabilized end-to-end flows.',
      learned: 'Bind KRaft local quorums accurately, size local LLM weights and upstream gateway timeouts jointly to CPU inference realities, and make crawler storage writes idempotent by default.'
    }
  }
];
