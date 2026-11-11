export interface FAQItem {
  id: string;
  triggers: string[];
  question: string;
  answer: string;
  citations: string[];
}

export const knowledgeBase: FAQItem[] = [
  {
    id: 'self-intro',
    triggers: ['tell me about yourself', 'introduce yourself', 'self intro', 'who are you', 'summary', 'executive summary'],
    question: "Tell me about yourself",
    answer: "I'm Aswin Sreeraj, a backend engineer based in Kerala, India focused on Go microservices, transactional integrity, and distributed systems. I hold a B.Tech in ECE (GGSIPU), worked 3+ years at NatWest Group (Operations Analyst handling financial reconciliations and fraud investigation) and Amazon (Sr. Product Compliance Associate), and graduated on the President's & Dean's Honour Roll at Fanshawe College in Canada (GPA 4.04/4.2). Since August 2025, I've focused on Go & backend systems at Brototype (named Overall Best Performer for June 2026), building ARDA, EVNTX, and Tenome Micro.",
    citations: ['profile · Overview', 'about · Roadmap']
  },
  {
    id: 'backend-fit',
    triggers: ['suitable for a backend', 'fit for a backend', 'why hire', 'backend developer role', 'backend engineer role', 'strengths'],
    question: "What makes you suitable for a Backend Developer role?",
    answer: "I pair idiomatic Go systems engineering with 3+ years of operational audit and compliance rigor. Across ARDA, EVNTX, and Tenome Micro, I built Clean Architecture REST and gRPC services, hybrid concurrency controls (optimistic CAS + PostgreSQL FOR UPDATE wallets), bounded worker pools, fail-closed security gates (Vault KV v2, AES-256-GCM, HS256 JWT/RBAC, HMAC-SHA256 interop, SSRF guards), and durable event pipelines (Temporal, Kafka/Redpanda). Backed by 272 Go tests & 219 Python tests in ARDA plus `go test -race` and `pprof` tuning in EVNTX.",
    citations: ['skills · Technical Stack', 'arda · README', 'evntx · Architecture']
  },
  {
    id: 'what-built',
    triggers: ['what did you build', 'what have you built', 'projects', 'overview of projects', 'showcase'],
    question: "What did you build?",
    answer: "I built ARDA (a multi-tenant AI agent control plane and governance platform across Go and Python using Temporal durable workflows, Vault KV v2 BYOK custody, 10-step MCP tool guardrails, and pgvector HNSW precedent gating), EVNTX (a multi-role event ticketing and escrow wallet platform with optimistic CAS reservations, FOR UPDATE ledgers, and late-capture Razorpay auto-refunds), and Tenome Micro (a 4-service event-driven Go platform combining Gin/gRPC, bounded crawl workers, SQLite/Dragonfly search, Kafka claim-check events, local Ollama inference, DLT retries, and full OpenTelemetry tracing).",
    citations: ['resume · Projects', 'arda · README', 'evntx · README', 'tenome-micro · README']
  },
  {
    id: 'go-experience',
    triggers: ['go experience', 'golang experience', 'why go', 'how long go', 'go proficiency'],
    question: "What's your Go experience?",
    answer: "Go is my primary language. I focus on concurrency control (goroutines, channels, sync primitives, errgroup), gRPC/protobuf service boundaries, Clean Architecture, and high-performance I/O. Across ARDA and EVNTX, I engineered a bounded agent runtime across 6 LLM providers, 10-step tool governance with SHA-256 idempotency locking, optimistic concurrency version checks, and table-driven test suites with `-race` detection.",
    citations: ['resume · Skills', 'arda · pkg/agentruntime', 'arda · pkg/toolgateway']
  },
  {
    id: 'which-project-first',
    triggers: ['which project', 'read first', 'where to start', 'where should i start', 'how did you build your projects', 'best project', 'recommendation'],
    question: "Which project should I read first?",
    answer: "If you're interested in AI infrastructure, governance, and durable orchestration, start with ARDA—it spans Go (Gateway, Registry, Temporal, Vault KV v2, 10-step ToolGateway/MCP) and Python (pgvector HNSW reliability gate and HMAC-verified Redpanda feedback pipeline). If you want to evaluate flash-sale concurrency and transactional ledgers, read EVNTX (Go Clean Architecture + React/TS), or inspect Tenome Micro for 4-service Go/gRPC/Kafka/Ollama microservices.",
    citations: ['projects · Overview', 'arda · Architecture', 'evntx · Architecture']
  },
  {
    id: 'background-transition',
    triggers: ['background', 'education', 'how you got here', 'transition', 'brototype', 'embedded', 'fanshawe', 'amazon', 'natwest'],
    question: "What is your engineering journey and background?",
    answer: "I graduated with a B.Tech in Electronics & Communication Engineering from GGSIPU Delhi, then worked as an Operations Analyst at NatWest Group (handling financial reconciliation and fraud investigation) and Senior Product Compliance Associate at Amazon. I then earned an Ontario College Graduate Certificate in Electronics & Embedded Systems from Fanshawe College in Canada (President's & Dean's Honour Roll, GPA 4.04/4.2). Returning to India, I enrolled in the ongoing Software Engineering Program (Go & Backend) at Brototype in August 2025, where I was recognized as Overall Best Performer for June 2026 and built ARDA, EVNTX, and Tenome Micro.",
    citations: ['resume · Education', 'resume · Experience', 'about · Roadmap']
  },
  {
    id: 'concurrency-locks',
    triggers: ['distributed lock', 'locking', 'concurrency', 'double booking', 'oversell', 'race condition', 'optimistic', 'for update'],
    question: "How do you handle concurrency and prevent overselling?",
    answer: "In EVNTX, I combined optimistic and pessimistic concurrency control cleanly: ReserveTickets updates `ticket_type_models` using compare-and-swap on the `version` column (`WHERE id = ? AND version = ? AND available_quantity >= ?`) with up to 3 retry attempts for a 1-minute hold, while `PayWithWallet`, `ApplyPlatformTransaction`, and `CheckInTicket` acquire PostgreSQL `FOR UPDATE` row locks inside ACID transactions so balances and single-use QR tickets cannot diverge.",
    citations: ['evntx · booking_gorm.go', 'evntx · Architecture']
  },
  {
    id: 'hardest-bug',
    triggers: ['hardest bug', 'difficult bug', 'production bugs', 'failures & production bugs', 'challenge', 'debugging', 'refund', 'reserve', 'hnsw', 'iterative_scan', 'hmac'],
    question: "What were the hardest bugs you investigated and fixed?",
    answer: "In EVNTX, when Razorpay payments completed after the 1-minute hold expired (or when attendees cancelled), earlier flows risked stranded holds or organizer reserve deficits; I refactored `VerifyPayment` to issue automatic Razorpay API source refunds on `ErrBookingExpiredPaymentSuccess` and tracked non-refundable platform fees via `reserve_balance`. In ARDA, I resolved silent 0-row filtered `pgvector` HNSW scans using `SET LOCAL hnsw.iterative_scan = strict_order` and fixed cross-language Go/Python HMAC signature mismatches caused by HTML-escaping `<`/`>`/`&` in JSON serialization.",
    citations: ['evntx · payment_usecase.go', 'arda-reliability-service · hnsw_methodology_audit.md']
  },
  {
    id: 'availability-location',
    triggers: ['availability', 'location', 'relocate', 'remote', 'hire', 'kerala', 'india', 'collaborate', 'team', 'adapt'],
    question: "How do you collaborate with teams and what is your availability?",
    answer: "I bring structured cross-functional experience from collaborating with legal, QA, operations, and compliance teams at Amazon and authoring audit resolutions at NatWest Group—reflected in my ADRs, API docs, and honest architecture gap tracking across ARDA and Tenome Micro. I am based in Kerala, India (aswinsreeraj96@gmail.com) and immediately available for full-time Backend / Go Engineer roles, open to remote work or relocation.",
    citations: ['profile · Availability', 'soft_skills · Proof', 'about · Roadmap']
  }
];

export function queryAssistant(userInput: string): {
  answer: string;
  citations: string[];
} {
  const clean = userInput.toLowerCase().trim();
  if (!clean) {
    return {
      answer: "Please ask a question about Aswin Sreeraj's Go projects, architecture decisions, concurrency patterns, or experience.",
      citations: ['resume · Overview']
    };
  }

  let bestMatch: FAQItem | null = null;
  let highestScore = 0;

  for (const item of knowledgeBase) {
    let score = 0;
    for (const trigger of item.triggers) {
      if (clean.includes(trigger)) {
        score += 10;
      }
      const words = trigger.split(' ');
      for (const word of words) {
        if (word.length > 2 && clean.includes(word)) {
          score += 2;
        }
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
  }

  if (bestMatch && highestScore >= 4) {
    return {
      answer: bestMatch.answer,
      citations: bestMatch.citations
    };
  }

  if (clean.includes('kafka') || clean.includes('redpanda')) {
    return {
      answer: "Aswin uses Apache Kafka (KRaft) in Tenome Micro for event choreography (`page-processed` claim-check references -> `tenome-ai` -> `summary-generated` -> `tenome-notify` with jittered backoff retries and `summary-generated-dlt` Dead Letter Topic + W3C OTel trace headers) and Redpanda (`aiokafka`) in ARDA Reliability Service to consume `arda.human-resolutions.v1` events with canonical HMAC-SHA256 verification and synchronous DLQ safety.",
      citations: ['resume · Skills', 'tenome-micro · consumer.go', 'arda-reliability-service · consumer.py']
    };
  }

  if (clean.includes('database') || clean.includes('postgres') || clean.includes('sql')) {
    return {
      answer: "Aswin designs normalized PostgreSQL schemas, enforces row-level pessimistic locks and optimistic concurrency versioning, tunes pgxpool connection pools, and uses pgvector for dense embedding similarity search.",
      citations: ['resume · Skills', 'evntx · Architecture', 'arda · Database']
    };
  }

  return {
    answer: "If it isn't in Aswin Sreeraj's resume or project docs, I say so instead of guessing. I can answer questions regarding his Go projects (ARDA, EVNTX, Tenome), his education at Brototype and Fanshawe College, his compliance experience at Amazon/NatWest, or his availability.",
    citations: ['resume · Scope Verification']
  };
}
