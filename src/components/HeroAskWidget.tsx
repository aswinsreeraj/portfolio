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
    question: "What are your flagship projects and what real-world problems do they solve?",
    answer:
      "ARDA tackles autonomous AI agent reliability in high-stakes domains through durable Temporal workflows, Vault BYOK credential custody, and deterministic pgvector guardrails. EVNTX solves ticket overselling, concurrency conflicts, and financial transaction integrity using optimistic locking, row-level locks, and multi-party escrow ledgers. Tenome Micro explores scalable distributed systems, decoupling concurrent web crawling, Kafka event streams, and local LLM summarization across gRPC services.",
  },
  {
    question:
      "How does your background in banking operations and compliance influence how you build backends?",
    answer:
      "At NatWest Group and Amazon, I handled financial reconciliations, fraud investigations, and compliance SOPs. That experience taught me that in production, financial edge cases and silent data corruption are critical risks. As a backend engineer, I translate that discipline directly into code: designing failure recovery first, enforcing strict transactional consistency (optimistic locking and multi-party escrow ledgers in EVNTX), validating all inputs (Draft-07 schemas, Vault BYOK custody, and SSRF guardrails in ARDA), and ensuring every critical workflow is auditable, idempotent, and resilient against crashes.",
  },
  {
    question: "What is your current availability, and are you open to relocation or remote roles?",
    answer:
      "I am immediately available to join full-time Backend Developer roles. Based in Kerala, India, I am fully open to remote opportunities globally, as well as relocation for on-site or hybrid positions across major tech hubs (such as Bangalore, Hyderabad, Pune, and Delhi NCR) or internationally.",
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
        Hi, I'm Aswin Sreeraj. Here are answers to the questions I'm frequently asked.
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
