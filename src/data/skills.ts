export interface TechSkill {
  id: string;
  name: string;
  aliases?: string[];
  category:
    | 'Backend & APIs'
    | 'AI, ML & Agentic Systems'
    | 'Architecture & Concurrency'
    | 'Databases & Caching'
    | 'Messaging & Workflows'
    | 'Security & Testing'
    | 'Cloud, K8s & OTel'
    | 'Frontend';
  tier: 'Daily' | 'Comfortable' | 'Exploring';
  summary: string;
  whatBuilt: string;
  usedInProjects: {
    id: string;
    name: string;
    roleInProject: string;
    route?: string;
  }[];
  concepts: string[];
}

export interface SoftSkill {
  id: string;
  title: string;
  category: string;
  summary: string;
  context: string;
  route?: string;
}

export const skillsData: TechSkill[] = [
  // Backend & APIs
  {
    id: 'go',
    name: 'Go',
    aliases: ['golang'],
    category: 'Backend & APIs',
    tier: 'Daily',
    summary: 'Primary language for multi-tenant control planes, transactional APIs, and gRPC services.',
    whatBuilt:
      'Engineered ARDA\'s control plane, Temporal workers, and 10-step ToolGateway; EVNTX\'s 29-table Clean Architecture monolith; and all 4 standalone Go modules in Tenome Micro.',
    usedInProjects: [
      { id: 'arda', name: 'ARDA', roleInProject: 'Gateway, gRPC Registry, Temporal workflows, Vault BYOK, runtime & ToolGateway' },
      { id: 'evntx', name: 'EVNTX', roleInProject: 'Clean Architecture REST monolith, escrow wallets, Razorpay & cron reconcilers' },
      { id: 'tenome', name: 'Tenome Micro', roleInProject: '4 Go 1.26 modules (gateway, search, ai, notify) wired via gRPC, Kafka & OTel' }
    ],
    concepts: [
      'Goroutines, bounded buffered channels, sync.Mutex/RWMutex & errgroup coordination',
      'Clean interface segregation and dependency inversion across handlers/usecases/repos',
      'Context deadline propagation, io/http cleanup, and graceful server draining',
      'Structured logging (slog, zerolog, zap) and pprof runtime diagnostics'
    ]
  },
  {
    id: 'python',
    name: 'Python',
    aliases: ['py', 'asyncio', 'python3'],
    category: 'Backend & APIs',
    tier: 'Comfortable',
    summary: 'Async microservices, embedding pipelines, vector retrieval, and calibration evaluation.',
    whatBuilt:
      'Built `arda-reliability-service`—an async Python 3.15 hexagonal service hosting BAAI/bge-small-en-v1.5 embeddings, pgvector HNSW retrieval over gRPC, and an aiokafka feedback consumer.',
    usedInProjects: [
      { id: 'arda', name: 'ARDA (Reliability Service)', roleInProject: 'Hexagonal domain/application core, async gRPC gate, BGE embeddings & Redpanda consumer' }
    ],
    concepts: [
      'Hexagonal Architecture isolating scoring/decision domain from asyncpg & grpcio adapters',
      'asyncio task management, ThreadPoolExecutor offloading, and clean shutdown disposal',
      'SentenceTransformer inference, NumPy cosine math & scikit-learn Platt/Isotonic diagnostics',
      'Static typing with mypy, ruff formatting, and SQLAlchemy async sessions'
    ]
  },
  {
    id: 'gin',
    name: 'Gin & REST APIs',
    aliases: ['gin', 'rest apis', 'rest', 'graphql'],
    category: 'Backend & APIs',
    tier: 'Daily',
    summary: 'HTTP gateways, middleware pipelines, request validation, and REST-to-gRPC translation.',
    whatBuilt:
      'Built public REST API Gateways in ARDA and Tenome Micro, EVNTX\'s multi-role 10-handler backend (plus Ollama HTTP inference integration and Brototype Gin/gqlgen GraphQL training).',
    usedInProjects: [
      { id: 'evntx', name: 'EVNTX', roleInProject: '10 Gin handlers for booking, Razorpay verification, organizer payouts & admin funnels' },
      { id: 'arda', name: 'ARDA', roleInProject: 'Edge Gin Gateway stripping X-Tenant-ID, checking HS256 JWTs & forwarding via gRPC' },
      { id: 'tenome', name: 'Tenome Micro', roleInProject: '`tenome-gateway` mapping REST requests -> gRPC codes, RequestID & 120s LLM timeouts' }
    ],
    concepts: [
      'Ordered middleware pipelines (RequestID -> Logger -> RateLimit -> Auth -> RBAC)',
      'gRPC-to-HTTP error code mapping & consistent structured error envelopes (`EVT_*`)',
      'Graceful HTTP draining, Read/Write timeout sizing, and CORS origin enforcement',
      'External API/LLM HTTP integrations (Razorpay SDK & Ollama `/api/generate` with `otelhttp`)'
    ]
  },
  {
    id: 'grpc',
    name: 'gRPC & Protobuf',
    aliases: ['grpc', 'protobuf', 'protocol buffers'],
    category: 'Backend & APIs',
    tier: 'Comfortable',
    summary: 'Typed inter-service RPC contracts across Go services and Go-to-Python boundaries.',
    whatBuilt:
      'Defined `.proto` contracts and implemented `AgentRegistryService` + `ReliabilityService` (Go <-> Python) in ARDA alongside `SearchService`/`SummaryService` + `grpc_health_v1` probes in Tenome Micro.',
    usedInProjects: [
      { id: 'arda', name: 'ARDA', roleInProject: 'Typed Go <-> Python Reliability gate, bufconn local RPC mode & InternalAuthInterceptor' },
      { id: 'tenome', name: 'Tenome Micro', roleInProject: 'Gateway -> Search -> AI internal HTTP/2 gRPC transport with otelgrpc spans' }
    ],
    concepts: [
      'Proto3 schema evolution (`optional` fields, backward-compatible contract design)',
      'gRPC metadata propagation (`x-tenant-id`, `x-request-id`) and auth interceptors',
      'In-process `bufconn` listeners testing real serialization in single-binary mode',
      'Mapping gRPC status codes to HTTP responses cleanly'
    ]
  },

  // AI, ML & Agentic Systems
  {
    id: 'mcp',
    name: 'MCP (Model Context Protocol)',
    aliases: ['mcp', 'model context protocol', 'tool gateway', 'mcp-go'],
    category: 'AI, ML & Agentic Systems',
    tier: 'Comfortable',
    summary: 'Sandboxed AI tool discovery backed by allowlists, schemas, and SSRF guardrails.',
    whatBuilt:
      'Integrated `mcp-go` into ARDA\'s `ConnectionManager` supporting in-process `TransactionSimulator` and external `cmd/mcp-server` transports gated behind the 10-step `ToolGateway`.',
    usedInProjects: [
      { id: 'arda', name: 'ARDA', roleInProject: 'Pooled MCP client manager, SSRF URL validator & 10-step governance dispatcher' }
    ],
    concepts: [
      'JSON-RPC MCP transport adapters (`inprocess`, `sse`, `streamable_http`)',
      'Per-agent tool allowlisting before dispatching any external model action',
      'Outbound SSRF validation blocking cloud metadata & link-local addresses',
      'Redacted tool invocation audit trails and SHA-256 argument deduplication'
    ]
  },
  {
    id: 'agentic-ai',
    name: 'Agentic AI & Bounded Execution',
    aliases: ['agentic ai', 'agent runtime', 'durable agents', 'agentic workflows', 'agents'],
    category: 'AI, ML & Agentic Systems',
    tier: 'Comfortable',
    summary: 'Bounded LLM tool loops with token budgets, Temporal workflows, and safety gates.',
    whatBuilt:
      'Engineered ARDA\'s shared `AgentRuntime` (`pkg/agentruntime`), pairing bounded autonomous tool loops with Temporal durable workflows (`AgentExecutionWorkflow`), custom Draft-07 schema checks, and escalation into the 6-stage Reliability Gate.',
    usedInProjects: [
      { id: 'arda', name: 'ARDA', roleInProject: 'Bounded AgentRuntime loops, BudgetTracker safety limits & fail-closed HUMAN_REVIEW gating' }
    ],
    concepts: [
      'Isolating non-deterministic LLM/tool steps cleanly inside crash-resilient Temporal activities',
      'Preventing infinite loops and token exhaustion (`40k` prompt / `10k` completion / `256 KB` context caps)',
      'ReDoS/SSRF-safe Draft-07 `OutputSchema` & `input_schema` bounds (`64 KB`, depth `10`, no remote `$ref`s)',
      'Decoupling autonomous agent orchestration cleanly from zero-trust tool execution'
    ]
  },
  {
    id: 'llm-engineering',
    name: 'LLM Orchestration & Inference',
    aliases: ['llm', 'llms', 'large language models', 'openai', 'anthropic', 'gemini', 'groq', 'grok', 'openrouter', 'ollama', 'qwen2.5', 'byok'],
    category: 'AI, ML & Agentic Systems',
    tier: 'Comfortable',
    summary: 'Multi-provider BYOK adapters, structured JSON validation, and local Ollama inference.',
    whatBuilt:
      'Built 6 hosted LLM `ProviderAdapter` implementations (OpenAI, Anthropic, Gemini, Groq, Grok, OpenRouter) with HashiCorp Vault per-call BYOK custody in ARDA, plus Tenome Micro\'s self-hosted Ollama (`qwen2.5:0.5b`) summarization worker.',
    usedInProjects: [
      { id: 'arda', name: 'ARDA', roleInProject: '6 Vault-backed BYOK adapters (`GenerateWithCredential`) & Draft-07 `OutputSchema` enforcement' },
      { id: 'tenome', name: 'Tenome Micro', roleInProject: 'Local Ollama (`qwen2.5:0.5b`) inference behind pluggable `llm.Provider` with `60s` timeout' }
    ],
    concepts: [
      'Vendor-agnostic `llm.Provider` interfaces isolating workflows from hosted vs self-hosted model runtimes',
      'Per-call BYOK credential injection & outbound `[REDACTED]` error scrubbing',
      'Structured JSON generation contracts verified against strict schema rules',
      'Right-sizing local LLM memory footprint (`qwen2.5:0.5b`) and upstream RPC/HTTP timeout budgets'
    ]
  },
  {
    id: 'knn-retrieval',
    name: 'kNN & Semantic Retrieval',
    aliases: ['knn', 'k-nn', 'k nearest neighbors', 'nearest neighbors', 'embeddings', 'sentence-transformers', 'baai/bge-small-en-v1.5', 'cosine similarity', 'vector retrieval'],
    category: 'AI, ML & Agentic Systems',
    tier: 'Comfortable',
    summary: 'Sentence-transformer embeddings, cosine precedent search, and decomposed confidence scoring.',
    whatBuilt:
      'Implemented the semantic kNN retrieval engine in `arda-reliability-service` embedding strictly factual `case_description` text via `BAAI/bge-small-en-v1.5` (384-d), retrieving top-k cosine neighbors, and scoring `Agreement × Density × Coverage`.',
    usedInProjects: [
      { id: 'arda', name: 'ARDA (Reliability Service)', roleInProject: '384-d `BAAI/bge-small-en-v1.5` embeddings, top-k cosine search & multiplicative reliability scoring' }
    ],
    concepts: [
      'Top-k cosine nearest-neighbor retrieval (`1 - (embedding <=> query)`) over normalized 384-d vectors',
      'Decomposed `Agreement × Density × Coverage` scoring causing zero-collapse vetoes on cold-start or conflict',
      'Preventing target leakage by embedding only neutral case facts rather than human outcomes',
      'Selecting 384-d (`BAAI/bge-small-en-v1.5`) over 768-d (`e5-base-v2`) to halve HNSW index memory without recall loss'
    ]
  },
  {
    id: 'ml-fundamentals',
    name: 'Fundamentals of ML & Calibration',
    aliases: ['fundamentals of ml', 'machine learning', 'ml', 'calibration', 'scikit-learn', 'sklearn', 'platt scaling', 'isotonic regression', 'roc-auc', 'cross-validation'],
    category: 'AI, ML & Agentic Systems',
    tier: 'Comfortable',
    summary: 'Leak-free cross-validation, ROC-AUC auditing, and fail-closed uncertainty handling.',
    whatBuilt:
      'Built evaluation and calibration diagnostics in `arda-reliability-service` using `scikit-learn` & `NumPy`—creating `ConnectedGroupAssigner` for leak-free 5-fold CV and gating calibration behind `UnavailableCalibrator` (`CalibratorPort`).',
    usedInProjects: [
      { id: 'arda', name: 'ARDA (Reliability Service)', roleInProject: '5-fold ConnectedGroupAssigner CV, ROC-AUC / Platt / Isotonic evaluation & deferred calibration gate' }
    ],
    concepts: [
      'Grouped K-Fold CV isolating contrastive/near-duplicate pairs (`cosine >= 0.95`) across folds',
      'Separating ranking metrics (`ROC-AUC`) from probability calibration (`Platt scaling`, `Isotonic regression`)',
      'Detecting low-sample calibration collapse (`[0.4813, 0.5465]`) instead of shipping fake confidence probabilities',
      'Enforcing explicit `raw_score` vs optional `calibrated_confidence` contracts across `.proto` boundaries'
    ]
  },

  // Architecture & Concurrency
  {
    id: 'clean-architecture',
    name: 'Clean Architecture',
    aliases: ['clean architecture', 'design patterns'],
    category: 'Architecture & Concurrency',
    tier: 'Daily',
    summary: 'Decoupling pure domain rules from HTTP handlers, SQL drivers, and external SDKs.',
    whatBuilt:
      'Structured EVNTX across `domain -> repository -> usecase -> infrastructure -> delivery/http`, ARDA across layered Go services + hexagonal Python ports, and Tenome Micro across 4 modular Go repos.',
    usedInProjects: [
      { id: 'evntx', name: 'EVNTX', roleInProject: 'Pure domain structs decoupled from 29 GORM persistence models & mockable repos' },
      { id: 'arda', name: 'ARDA', roleInProject: 'Service boundaries + Python domain/application ports independent of asyncpg/grpcio' },
      { id: 'tenome', name: 'Tenome Micro', roleInProject: 'Pluggable `llm.Provider`, `storage`, `cache`, and `notification.Sender` interfaces' }
    ],
    concepts: [
      'Dependency Inversion: domain models contain zero SQL or framework imports',
      'Explicit DTO/persistence mapping separating API contracts from DB schemas',
      'Port-and-adapter isolation allowing in-process `bufconn`, S3/local disk, or mock swaps',
      'Modular monolith vs bounded-context microservice trade-off analysis'
    ]
  },
  {
    id: 'concurrency',
    name: 'Concurrency & Locking',
    aliases: ['concurrency', 'optimistic locking', 'for update', 'systems programming'],
    category: 'Architecture & Concurrency',
    tier: 'Daily',
    summary: 'Optimistic CAS, SQL row locks, bounded worker pools, and deadlock prevention.',
    whatBuilt:
      'Paired 3-attempt optimistic CAS tier reservations with PostgreSQL `FOR UPDATE` escrow/QR locks in EVNTX, built 100-slot/4-worker crawl pools in Tenome Micro, and added `IdempotencyLockManager` + `BudgetTracker` in ARDA.',
    usedInProjects: [
      { id: 'evntx', name: 'EVNTX', roleInProject: 'Optimistic CAS `ReserveTickets` + `FOR UPDATE` wallet & single-use QR `CheckInTicket`' },
      { id: 'tenome', name: 'Tenome Micro', roleInProject: '4-worker HTML pool, buffered channel backpressure & `sync/atomic` health state' },
      { id: 'arda', name: 'ARDA', roleInProject: '`sync.RWMutex` provider/handler registries & per-key mutex idempotency locks' }
    ],
    concepts: [
      'Optimistic Compare-And-Swap (`WHERE version = ? AND available_quantity >= ?`) with bounded retries',
      'Pessimistic `SELECT ... FOR UPDATE` inside ACID multi-table wallet transactions',
      'Bounded worker pools & non-blocking `select` default backpressure',
      'Lock-scope hygiene, deterministic transaction ordering & race detection (`-race`)'
    ]
  },

  // Databases & Caching
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    aliases: ['postgresql', 'postgres', 'sql', 'gorm', 'pgx'],
    category: 'Databases & Caching',
    tier: 'Daily',
    summary: 'Relational modeling, ACID multi-table transactions, triggers, and pool tuning.',
    whatBuilt:
      'Built EVNTX\'s 29-table ledger/ticketing schema (with `PrepareStmt: true`, 25-conn pools & `ON CONFLICT` funnel rollups) and ARDA\'s multi-tenant registry & immutability trigger suite.',
    usedInProjects: [
      { id: 'evntx', name: 'EVNTX', roleInProject: '29-table schema, multi-bucket escrow ledgers, `FOR UPDATE` locks & `pgx/v5` pooling' },
      { id: 'arda', name: 'ARDA', roleInProject: 'SQL immutability trigger (`P0001`), unique indexes, Vault refs & HNSW tables' }
    ],
    concepts: [
      'Row-level locking (`FOR UPDATE`), optimistic version counters & state constraints',
      'PL/pgSQL `BEFORE UPDATE OR DELETE` immutability triggers & atomic `ON CONFLICT` upserts',
      'B-Tree / composite indexing, `EXPLAIN ANALYZE`, CTEs, window functions & sharding concepts',
      'Versioned schema migrations (`golang-migrate`, Alembic) vs GORM `AutoMigrate`'
    ]
  },
  {
    id: 'pgvector',
    name: 'pgvector & Vector Search',
    aliases: ['pgvector'],
    category: 'Databases & Caching',
    tier: 'Comfortable',
    summary: 'In-database HNSW cosine retrieval and filtered multi-tenant vector scans.',
    whatBuilt:
      'Implemented `reference_examples` (`Vector(384)`, `m=16, ef_construction=64`) in ARDA Reliability Service with `SET LOCAL hnsw.iterative_scan = strict_order` to fix multi-tenant filtered recall truncation.',
    usedInProjects: [
      { id: 'arda', name: 'ARDA (Reliability Service)', roleInProject: 'Tenant-scoped HNSW cosine retrieval, twin CV & multiplicative Agreement×Density×Coverage scoring' }
    ],
    concepts: [
      'HNSW tuning (`m`, `ef_construction`, `ef_search`) vs exact sequential cosine scans',
      'Filtered HNSW pitfalls on shared multi-tenant tables (`hnsw.iterative_scan = strict_order`)',
      'Colocating `vector(384)` with relational ACID idempotency & conflict quarantine tables',
      'Preventing retrieval bias by embedding case narratives separately from decisions'
    ]
  },
  {
    id: 'sqlite',
    name: 'SQLite & MongoDB',
    aliases: ['sqlite', 'mongodb', 'modernc.org/sqlite'],
    category: 'Databases & Caching',
    tier: 'Comfortable',
    summary: 'Zero-CGO embedded SQLite storage and MongoDB document modeling & aggregations.',
    whatBuilt:
      'Implemented pure-Go `modernc.org/sqlite` storage in `tenome-search` (`ON CONFLICT(url) DO UPDATE ... RETURNING id`) and GORM SQLite `summaries` in `tenome-ai`; studied MongoDB pipelines, CAP & replica sets at Brototype.',
    usedInProjects: [
      { id: 'tenome', name: 'Tenome Micro', roleInProject: '`CGO_ENABLED=0` Alpine containers backed by SQLite PVCs & boot-time InvertedIndex rehydration' },
      { id: 'brototype', name: 'Brototype Curriculum', roleInProject: 'MongoDB CRUD, BSON indexing, aggregation pipelines & schema validation', route: '/about#roadmap' }
    ],
    concepts: [
      'Pure-Go `modernc.org/sqlite` enabling static zero-CGO Docker images',
      'Conflict-safe `ON CONFLICT DO UPDATE` upserts & unique constraints (`idx_summaries_page_id`)',
      'Understanding `ReadWriteOnce` stateful volume trade-offs under Kubernetes HPA scaling',
      'MongoDB document modeling, aggregation stages & NoSQL store trade-offs'
    ]
  },
  {
    id: 'dragonfly-redis',
    name: 'Dragonfly & Redis',
    aliases: ['dragonfly', 'redis', 'caching'],
    category: 'Databases & Caching',
    tier: 'Comfortable',
    summary: 'Cache-aside query acceleration with TTL expiration and graceful DB fallback.',
    whatBuilt:
      'Integrated Dragonfly DB (`go-redis/v9`) in `tenome-search` (`search:<term>`, `5m` TTL) with graceful DB fallback, plus engineered EVNTX\'s zero-dependency `60s` `sync.RWMutex` event cache.',
    usedInProjects: [
      { id: 'tenome', name: 'Tenome Micro', roleInProject: 'Dragonfly Redis-compatible cache-aside tier accelerating search term lookups (5m TTL)' },
      { id: 'evntx', name: 'EVNTX', roleInProject: 'In-process `sync.RWMutex` 60s event cache invalidated atomically on organizer updates' }
    ],
    concepts: [
      'Cache-Aside pattern with explicit TTL expiration and graceful cache-miss fallback',
      'Active invalidation hooks on write mutations (EVNTX organizer updates)',
      'Trade-offs between external Redis/Dragonfly clusters vs process-local `sync.RWMutex` maps',
      'Keyspace naming conventions (`search:<term>`, `event:<slug>`)'
    ]
  },

  // Messaging & Workflows
  {
    id: 'kafka-redpanda',
    name: 'Apache Kafka & Redpanda',
    aliases: ['kafka', 'redpanda', 'apache kafka', 'aiokafka'],
    category: 'Messaging & Workflows',
    tier: 'Comfortable',
    summary: 'Event choreography, claim-check payloads, retries, and dead-letter topics.',
    whatBuilt:
      'Engineered Tenome Micro\'s Kafka KRaft event pipeline (`page-processed` -> `summary-generated` -> `summary-generated-dlt`) and ARDA Reliability Service\'s `aiokafka` consumer on `arda.human-resolutions.v1`.',
    usedInProjects: [
      { id: 'tenome', name: 'Tenome Micro', roleInProject: 'Claim-check `PageIndexedEvent`, W3C `traceparent` headers & ±20% jittered retry DLT consumer' },
      { id: 'arda', name: 'ARDA (Reliability Service)', roleInProject: 'Verified `aiokafka` feedback consumer with conflict quarantine & synchronous DLQ commit guard' }
    ],
    concepts: [
      'Claim-check messaging keeping heavy HTML/text payloads out of Kafka topics',
      'At-least-once consumption, explicit manual offset commits & DB-level `event_id` idempotency',
      'Poison-pill schema screening, jittered exponential backoff & synchronous DLQ routing',
      'W3C OpenTelemetry trace header injection/extraction (`kafkaHeadersCarrier`)'
    ]
  },
  {
    id: 'temporal',
    name: 'Temporal',
    aliases: ['temporal', 'workers', 'cron'],
    category: 'Messaging & Workflows',
    tier: 'Comfortable',
    summary: 'Crash-resilient workflow orchestration alongside scheduled cron background jobs.',
    whatBuilt:
      'Implemented `AgentExecutionWorkflow` and `AgentExecutionActivity` in ARDA on `arda-v1-task-queue`, paired with `robfig/cron/v3` background lifecycle jobs (10m/30m/45m) in EVNTX.',
    usedInProjects: [
      { id: 'arda', name: 'ARDA', roleInProject: 'Deterministic Temporal workflows (`StartToCloseTimeout: 30s`, max 3 attempts, non-retryable error classification)' },
      { id: 'evntx', name: 'EVNTX', roleInProject: '`robfig/cron` background reconcilers (booking expiry, event settlement, payout completion)' }
    ],
    concepts: [
      'Deterministic workflow code vs side-effectful Temporal activities',
      'Dual async durable (`202`) vs realtime synchronous (`200`) execution modes',
      'Retry policies distinguishing `CategoryTransient` vs `PermanentExecutionError`',
      'Embedded cron timeout contexts (`2m`) with execution telemetry (`job_log_models`)'
    ]
  },

  // Security & Testing
  {
    id: 'security-vault',
    name: 'Vault, JWT, Crypto & Guardrails',
    aliases: ['vault', 'hashicorp vault', 'jwt', 'rbac', 'oauth', 'security', 'aes', 'hmac', 'razorpay'],
    category: 'Security & Testing',
    tier: 'Daily',
    summary: 'Secret custody, JWT/RBAC auth, AES-256-GCM encryption, and HMAC signatures.',
    whatBuilt:
      'Built HashiCorp Vault KV v2 client (`DestroySecret`), `[REDACTED]` audit masking & SSRF/Draft-07 DoS limits in ARDA; canonical Go/Python HMAC checks in Reliability Service; and bcrypt OTP, OAuth, Razorpay late auto-refunds & AES-GCM payouts in EVNTX.',
    usedInProjects: [
      { id: 'arda', name: 'ARDA', roleInProject: 'Vault KV v2 BYOK custody, JWT/RBAC, SSRF metadata blocking, bounded Draft-07 & ToolGateway guardrails' },
      { id: 'evntx', name: 'EVNTX', roleInProject: 'AES-256-GCM bank/UPI encryption, bcrypt OTP, SHA-256 sessions & Razorpay HMAC auto-refunds' }
    ],
    concepts: [
      'Anti-spoofing: stripping client `X-Tenant-ID` headers & re-validating JWT/metadata claims',
      'HashiCorp Vault KV v2 path isolation & `DestroySecret` metadata purging',
      'AES-256-GCM encryption at rest, SHA-256 hashed refresh tokens & bcrypt 6-digit OTPs',
      'Canonical JSON HMAC-SHA256 signatures (`300s` replay window) & Draft-07 regex/depth DoS caps'
    ]
  },
  {
    id: 'testing-profiling',
    name: 'Testing, -race & pprof',
    aliases: ['testing', 'benchmarks', 'pprof', 'ci'],
    category: 'Security & Testing',
    tier: 'Daily',
    summary: 'Unit, integration, and E2E test suites alongside `-race` checks and `pprof` profiling.',
    whatBuilt:
      'Authored 272 Go test/benchmark funcs + 219 Python pytest cases across ARDA & Reliability Service, plus EVNTX mock unit tests, live Postgres integration/E2E suites, and `pprof`-driven DB/cache tuning.',
    usedInProjects: [
      { id: 'arda', name: 'ARDA', roleInProject: '272 Go tests/benchmarks (`bufconn`, Temporal suite) + 219 Python pytest specs + HNSW benchmarks' },
      { id: 'evntx', name: 'EVNTX', roleInProject: 'Unit `-race` tests (6/6 pass), Postgres integration/E2E tests & `pprof` optimization' }
    ],
    concepts: [
      'Table-driven unit tests with `testify/mock` and `httptest` router E2E verification',
      'Race condition checks with `go test -race` and Go `net/http/pprof` bottleneck analysis',
      'In-process `bufconn` RPC tests & subprocess cross-language interop suites',
      'Honest evaluation audits (Connected-Group CV & recall partition checks)'
    ]
  },

  // Cloud, K8s & OTel
  {
    id: 'docker',
    name: 'Docker & Compose',
    aliases: ['docker', 'containerfile', 'docker compose'],
    category: 'Cloud, K8s & OTel',
    tier: 'Daily',
    summary: 'Multi-stage non-root Alpine builds and multi-service Docker Compose stacks.',
    whatBuilt:
      'Authored multi-stage `Dockerfile`/`Containerfile` builds (`CGO_ENABLED=0`, non-root UID `10001`) for all 4 Tenome Micro services + full Compose observability stack, plus EVNTX and ARDA local infrastructure stacks.',
    usedInProjects: [
      { id: 'tenome', name: 'Tenome Micro', roleInProject: 'Static Alpine images + Compose stack (Kafka KRaft, Dragonfly, Ollama, OTel/Tempo/Loki/Prom/Grafana)' },
      { id: 'evntx', name: 'EVNTX', roleInProject: 'Containerized Go API builds (`Dockerfile` / `Containerfile`) deployed to EC2' },
      { id: 'arda', name: 'ARDA', roleInProject: 'Compose orchestration for PostgreSQL/`pgvector`, Temporal, Redpanda & HashiCorp Vault' }
    ],
    concepts: [
      'Multi-stage `CGO_ENABLED=0` static builds stripping compiler toolchains',
      'Least-privilege non-root container execution (`appuser` / UID `10001`)',
      'Docker Compose service health checks, volume persistence & bridge networking'
    ]
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes & Helm',
    aliases: ['kubernetes', 'k8s', 'helm', 'nginx gateway fabric', 'hpa'],
    category: 'Cloud, K8s & OTel',
    tier: 'Comfortable',
    summary: 'Kubernetes workloads, NGINX Gateway routes, PVCs, HPAs, and Helm packaging.',
    whatBuilt:
      'Authored Minikube/K8s manifests (`gateway.yaml`, `infra.yaml`, `ollama.yaml`, `pvcs.yaml`, `hpa.yaml`, `servicemonitors.yaml`) and a Helm chart for `tenome-gateway`; designed ARDA\'s stateless Kubernetes HPA scaling blueprint.',
    usedInProjects: [
      { id: 'tenome', name: 'Tenome Micro', roleInProject: 'NGINX Gateway Fabric HTTPRoute, Helm chart, 20Gi Ollama PVC, KRaft infra & ServiceMonitors' },
      { id: 'arda', name: 'ARDA', roleInProject: 'Target stateless Kubernetes HPA isolation plan separating Go pods from Python vector pods' }
    ],
    concepts: [
      'NGINX Gateway Fabric (`Gateway` / `HTTPRoute`), CoreDNS & ConfigMap/Secret injection',
      'PersistentVolumeClaims (`20Gi` Ollama weights, SQLite storage) & `ReadWriteOnce` HPA trade-offs',
      'Helm Charts (`Chart.yaml`, `values.yaml`, `_helpers.tpl`) & Minikube cluster debugging'
    ]
  },
  {
    id: 'opentelemetry',
    name: 'OpenTelemetry & Observability',
    aliases: ['opentelemetry', 'otel', 'prometheus', 'grafana', 'tempo', 'loki', 'alloy'],
    category: 'Cloud, K8s & OTel',
    tier: 'Comfortable',
    summary: 'Distributed tracing across HTTP, gRPC, and Kafka into Tempo, Loki & Grafana.',
    whatBuilt:
      'Instrumented Tenome Micro end-to-end with `otelgin`, `otelgrpc`, `otelhttp`, `otlptracehttp` (:4318), custom Kafka `traceparent` headers, Zap JSON log correlation via Grafana Alloy -> Loki, Tempo service-graphs & Prometheus scrapes.',
    usedInProjects: [
      { id: 'tenome', name: 'Tenome Micro', roleInProject: 'Full OTel tracing (`otelgin` -> `otelgrpc` -> Kafka -> `otelhttp`) + Tempo/Prometheus/Loki/Alloy stack' },
      { id: 'evntx', name: 'EVNTX', roleInProject: '`zerolog` structured failure logging (`status >= 400`) & `/debug/pprof` HTTP profiling' }
    ],
    concepts: [
      'W3C `TraceContext`/`Baggage` propagation across HTTP, gRPC metadata & Kafka headers',
      'Log-to-trace correlation linking structured Zap/Zerolog JSON `TraceID` fields to Tempo spans',
      'Prometheus RED metrics, `ServiceMonitor` CRDs & span-metrics/service-graph processors'
    ]
  },
  {
    id: 'aws-cicd',
    name: 'AWS & CI/CD Pipelines',
    aliases: ['aws', 'aws s3', 'ec2', 'github actions', 'ci/cd', 'jenkins'],
    category: 'Cloud, K8s & OTel',
    tier: 'Comfortable',
    summary: 'AWS S3 storage integration, EC2 container deploys, and automated GitHub Actions.',
    whatBuilt:
      'Integrated pluggable AWS SDK v2 S3 storage + GitHub Actions test/Docker/EC2 deploy workflows in EVNTX and Docker/Helm pipelines in Tenome Micro (alongside Jenkins/SonarQube training at Brototype).',
    usedInProjects: [
      { id: 'evntx', name: 'EVNTX', roleInProject: 'AWS S3 `Uploader` interface (`internal/infrastructure/storage`), GitHub Actions (`tests.yml`, `docker.yml`, `deploy.yml`)' },
      { id: 'tenome', name: 'Tenome Micro', roleInProject: 'CI workflows (`deploy.yml`, `production-deploy.yml`) building multi-service images & Helm charts' }
    ],
    concepts: [
      'Pluggable AWS S3 SDK v2 storage adapters with graceful local filesystem fallback',
      'Automated test pipelines with ephemeral PostgreSQL containers in GitHub Actions',
      'Container image publishing, EC2 deployment automation, EC2/VPC/IAM/Nginx & Jenkins concepts'
    ]
  },

  // Supporting Frontend
  {
    id: 'react-ts',
    name: 'React & TypeScript',
    aliases: ['react', 'typescript', 'tanstack query', 'zustand', 'tailwind'],
    category: 'Frontend',
    tier: 'Comfortable',
    summary: 'Modular SPAs with TanStack Query and Zustand paired cleanly to Go REST APIs.',
    whatBuilt:
      'Built EVNTX\'s React 19 + TypeScript 5.9 SPA (TanStack Query, Zustand, Axios 401 refresh interceptor, Razorpay checkout, Recharts funnels, `html5-qrcode` scanner) on Vercel plus this portfolio.',
    usedInProjects: [
      { id: 'evntx', name: 'EVNTX', roleInProject: 'Feature-modular Attendee/Organizer/Admin React 19 + TypeScript SPA' }
    ],
    concepts: [
      'Server-state caching with TanStack Query & persistent client auth state via Zustand',
      'Axios response interceptors transparently retrying requests after `/auth/refresh`',
      'Strict TypeScript domain interfaces matching Go REST JSON contracts'
    ]
  }
];

export const softSkillsData: SoftSkill[] = [
  {
    id: 'investigation-rigor',
    title: 'Root-Cause Investigation',
    category: 'Debugging & Analysis',
    summary: 'Tracing multi-variable issues across logs, state transitions, and ledger records instead of patching symptoms.',
    context: 'NatWest Group · ARDA · EVNTX',
    route: '/about#roadmap'
  },
  {
    id: 'cross-functional',
    title: 'Cross-Functional Alignment',
    category: 'Collaboration',
    summary: 'Translating technical, legal, and operational constraints clearly across engineering, QA, and compliance teams.',
    context: 'Amazon Sr. Product Compliance',
    route: '/about#roadmap'
  },
  {
    id: 'risk-fail-closed',
    title: 'Fail-Closed Risk Thinking',
    category: 'Safety & Governance',
    summary: 'Designing conservative safety checks that hold uncertain actions for review instead of failing open.',
    context: 'ARDA Reliability & Tool Gates',
    route: '/projects/arda'
  },
  {
    id: 'technical-docs',
    title: 'Architecture & Writing',
    category: 'Documentation',
    summary: 'Authoring clear ADRs, API contracts, scalability notes, and honest gap tracking.',
    context: 'ARDA & Portfolio Docs',
    route: '/projects/arda'
  },
  {
    id: 'consistency-mentorship',
    title: 'Consistency & Ownership',
    category: 'Execution',
    summary: 'Sustaining high engineering standards while supporting peer cohorts through reviews and debugging.',
    context: 'Brototype & Fanshawe College',
    route: '/about#roadmap'
  },
  {
    id: 'adaptability',
    title: 'Rapid Adaptability',
    category: 'Learning Agility',
    summary: 'Picking up unfamiliar stacks from first principles and shaping them into clean backend systems.',
    context: 'Embedded C → Go & Python',
    route: '/projects'
  }
];

export const skillCategories = [
  'Backend & APIs',
  'AI, ML & Agentic Systems',
  'Architecture & Concurrency',
  'Databases & Caching',
  'Messaging & Workflows',
  'Security & Testing',
  'Cloud, K8s & OTel',
  'Frontend'
] as const;
