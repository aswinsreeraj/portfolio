import React, { useState } from 'react';

interface HeroAskWidgetProps {
  onOpenFullChat: (initialQuery?: string) => void;
}

interface IntroQuestion {
  question: string;
  answer: string;
}

const INTRO_QUESTIONS: IntroQuestion[] = [
  {
    question: "Tell me about yourself",
    answer:
      "I'm a backend engineer from Kerala, India specializing in Go microservices, transactional data integrity, and distributed systems. My path started with a B.Tech in ECE (GGSIPU), followed by 3+ years as an Operations Analyst at NatWest Group (account reconciliation & fraud investigation) and Sr. Product Compliance Associate at Amazon (SOP risk classification), before graduating on the Honour Roll at Fanshawe College in Canada (GPA 4.04/4.2). Since August 2025, I've focused on Go & backend engineering at Brototype (June 2026 Overall Best Performer), building ARDA, EVNTX, and Tenome Micro.",
  },
  {
    question: "What makes you suitable for a Backend Developer role?",
    answer:
      "I combine idiomatic Go architecture with enterprise audit and risk discipline. Across EVNTX, ARDA, and Tenome Micro, I built Clean Architecture REST/gRPC APIs, concurrency-safe locking (optimistic CAS + PostgreSQL FOR UPDATE wallets), bounded worker pools, fail-closed security gates (Vault KV v2, AES-256-GCM, HS256 JWT/RBAC, HMAC-SHA256 interop, SSRF guards), and durable event workflows (Temporal & Kafka/Redpanda). Backed by verifiable suites—272 Go tests & 219 Python tests in ARDA plus -race verification and pprof DB tuning in EVNTX.",
  },
  {
    question: "How do you handle concurrency, failures & production bugs?",
    answer:
      "I design failure recovery first. In EVNTX, I eliminated ticket overselling via 3-attempt optimistic CAS + FOR UPDATE row locks and handled late Razorpay captures past the 1-minute hold by automatically triggering source refunds with reserve_balance tracking. In Tenome Micro, I isolated slow Ollama inference behind bounded 100-slot crawl channels, Kafka claim-checks, jittered backoff, and DLTs. In ARDA, I debugged silent 0% recall multi-tenant pgvector HNSW scans (iterative_scan = strict_order) and resolved cross-language Go/Python HMAC canonicalization mismatches.",
  },
  {
    question: "How did you build your projects—and where should I start?",
    answer:
      "Each system isolates domain logic behind clean interfaces and explicit trade-offs. Start with ARDA for multi-tenant AI governance (Go Gateway/Registry, Temporal durable workflows, Vault BYOK, 10-step MCP ToolGateway, and Python pgvector HNSW gating)—or inspect EVNTX (Go Clean Architecture + React/TS) for transactional ticketing, escrow ledgers, and Razorpay flows. Tenome Micro demonstrates 4 Go modules bridged by gRPC, Kafka, Dragonfly cache, local Ollama, and full OpenTelemetry tracing.",
  },
  {
    question: "How do you collaborate with teams & what is your availability?",
    answer:
      "At NatWest Group and Amazon, I worked daily with legal, QA, operations, and audit teams—habits I carry into clear ADRs, API docs, honest gap tracking, and structured PR/code reviews. I adapt fast across stacks (from finance ops and low-level C to Go, async Python, and Kubernetes/Helm) and am immediately available for full-time Backend / Go Engineer roles (open to remote or relocation).",
  },
];

export const HeroAskWidget: React.FC<HeroAskWidgetProps> = ({ onOpenFullChat }) => {
  // Item 0 ("Tell me about yourself") open by default for recruiters/managers/tech leads
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full flex flex-col bg-white dark:bg-[#0E1F27] border border-[#101820] dark:border-[#1E3A47] rounded-[14px] shadow-cyan-solid-8 p-6 sm:p-8 transition-all">
      {/* Heading
      <h2 className="m-0 text-[28px] sm:text-[32px] font-bold tracking-tight text-[#101820] dark:text-white leading-tight">
        Hi...
      </h2> */}

      {/* Subtitle */}
      <p className="m-0 text-[15px] sm:text-[16px] text-[#4A5B66] dark:text-[#8DB1BE] mt-1.5 mb-5 leading-normal">
        Hi. I am Aswin Sreeraj. These are the questions that I am frequenlty asked.
      </p>

      {/* Questions Accordion */}
      <div className="flex flex-col gap-2.5">
        {INTRO_QUESTIONS.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={item.question}
              className={`rounded-lg border transition-all duration-150 overflow-hidden ${isOpen
                ? 'border-[#00ADD8] bg-[#E1F6FB]/50 dark:bg-[#16303B]/60'
                : 'border-[#D6E7EE] dark:border-[#1E3A47] bg-white dark:bg-[#0A171D] hover:border-[#00ADD8] dark:hover:border-[#00ADD8]'
                }`}
            >
              < button
                type="button"
                onClick={() => toggleQuestion(idx)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-3 px-4 py-3 sm:py-3.5 text-left cursor-pointer select-none"
              >
                <span
                  className={`font-semibold text-[15px] sm:text-[15.5px] transition-colors ${isOpen
                    ? 'text-[#00708C] dark:text-[#00ADD8]'
                    : 'text-[#101820] dark:text-[#E6F4F8]'
                    }`}
                >
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className="font-mono text-[14px] text-[#4A5B66] dark:text-[#8DB1BE] flex-shrink-0"
                >
                  →
                </span>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pt-0">
                  <p className="m-0 text-[14px] sm:text-[14.5px] leading-relaxed text-[#2C3840] dark:text-[#D1E7F0]">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          );
        })
        }
      </div >

      {/* Bottom Prompt Note */}
      <p className="m-0 text-[13.5px] sm:text-[14px] text-[#4A5B66] dark:text-[#8DB1BE] leading-relaxed mt-5 mb-4">
        Want to know more? Ask my chatbot. It's RAG-powered and answers only from my resume and project docs.
      </p>

      {/* Action Button */}
      < button
        type="button"
        onClick={() => {
          const initialQuery = openIndex !== null ? INTRO_QUESTIONS[openIndex].question : undefined;
          onOpenFullChat(initialQuery);
        }}
        className="inline-flex items-center justify-center min-h-[44px] px-5 bg-[#FDDD00] hover:bg-[#ebd000] text-[#101820] border border-[#101820] rounded-md shadow-yellow-solid font-bold text-[14px] sm:text-[15px] transition-transform active:translate-x-0.5 active:translate-y-0.5 cursor-pointer self-start"
      >
        Ask about me →
      </button >
    </div >
  );
};
