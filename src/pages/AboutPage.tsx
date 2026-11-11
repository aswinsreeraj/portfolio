import React from 'react';
import { profile } from '../data/profile';
import { timelineData } from '../data/timeline';
import { techInterestsData } from '../data/interests';
import { Footer } from '../components/Footer';

interface AboutPageProps {
  onSelectTech: (techName: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onSelectTech }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0A171D] text-[#101820] dark:text-[#E6F4F8] transition-colors">
      {/* Top Banner matching about_and_contact.html */}
      <section className="w-full py-16 lg:py-20 bg-[#F3FAFD] dark:bg-[#0E1F27] border-b border-[#D6E7EE] dark:border-[#1E3A47]">
        <div className="max-w-[1440px] mx-auto w-full px-5 sm:px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Bio Paragraphs */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-4">
            <div className="font-mono text-[13px] text-[#00708C] dark:text-[#00ADD8]">
              // package about (profile.go)
            </div>
            <h1 className="m-0 text-[40px] sm:text-[54px] font-bold tracking-tight text-[#101820] dark:text-white leading-[1.05]">
              About
            </h1>
            <div className="m-0 text-[17px] sm:text-[18px] leading-[1.65] text-[#3C4C57] dark:text-[#B9D3DC] space-y-4">
              <p>
                I am a backend engineer from <strong>Kerala, India</strong>, focused on building reliable REST and gRPC services, concurrent workflows, and database-backed platforms in <strong>Go</strong> and <strong>Python</strong>.
              </p>
              <p>
                My path began in Electronics &amp; Communication Engineering (GGSIPU, Delhi), followed by financial account reconciliation, bookkeeping audits, and fraud investigation at <strong>NatWest Group</strong> (Jan 2019 – Feb 2022) and product compliance and risk mitigation at <strong>Amazon</strong> (Mar 2022 – Dec 2022). I went on to graduate on the President's and Dean's Honour Roll in Electronics &amp; Embedded Systems at <strong>Fanshawe College</strong>, Canada (PIC microcontrollers &amp; Embedded C; GPA 4.04 / 4.2), before transitioning into full-time backend engineering through <strong>Brototype</strong> (Aug 2025 – Present), where I was recognized as <strong>Overall Best Performer for June 2026</strong>.
              </p>
              <p>
                Within my projects, I focus on concurrency safety, escrow &amp; wallet integrity, fail-closed agent governance, and distributed observability—building <strong>ARDA</strong> (Temporal, Vault KV v2 BYOK, 10-step MCP ToolGateway &amp; pgvector HNSW gating), <strong>EVNTX</strong> (optimistic CAS reservations, FOR UPDATE escrow wallets &amp; automatic Razorpay refunds), and <strong>Tenome Micro</strong> (4-service Kafka claim-check, local Ollama &amp; OpenTelemetry stack).
              </p>
            </div>
          </div>

          {/* Right Column: Larger Portrait Photo Card */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col items-center lg:items-end gap-3">
            <div className="relative w-[280px] sm:w-[320px] lg:w-[340px] h-[360px] sm:h-[400px] lg:h-[420px] rounded-[18px] overflow-hidden border-2 border-[#00ADD8] shadow-cyan-solid-8 bg-white dark:bg-[#0A171D] group">
              <img
                src="/profile.jpg"
                alt={profile.name}
                className="w-full h-full object-cover object-top zoom-75"
              />
            </div>
            <div className="flex flex-col items-center lg:items-end text-center lg:text-right pr-1">
              <span className="font-mono font-bold text-[15px] text-[#101820] dark:text-white">{profile.name}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap: How I got here (Reverse Chronological: Latest to Oldest) */}
      <section id="roadmap" className="w-full py-20 bg-white dark:bg-[#0A171D]">
        <div className="max-w-[1440px] mx-auto w-full px-5 sm:px-8 lg:px-16 flex flex-col gap-12">
          <div className="flex flex-col gap-3">
            <div className="font-mono font-medium text-[13px] tracking-wide text-[#00708C] dark:text-[#00ADD8]">
              // career.roadmap()
            </div>
            <h2 className="m-0 text-[36px] sm:text-[42px] font-bold tracking-tight text-[#101820] dark:text-white leading-tight">
              How I got here
            </h2>
            <p className="m-0 text-[18px] text-[#3C4C57] dark:text-[#B9D3DC] leading-relaxed max-w-[640px]">
              Education and work, phase by phase (reverse chronological from current focus to foundations), and what I picked up in each one.
            </p>
          </div>

          {/* Vertical Timeline */}
          <div className="flex flex-col max-w-[920px]">
            {timelineData.map((item, idx) => {
              const isNow = item.type === 'NOW';
              const isCurrent = isNow || Boolean(item.isCurrent);
              const isNext = item.type === 'NEXT';
              const isLast = idx === timelineData.length - 1;

              return (
                <div key={item.id} className="flex gap-6 items-stretch">
                  {/* Node Line Column */}
                  <div className="flex-shrink-0 w-6 flex flex-col items-center">
                    {isCurrent ? (
                      <span className="flex-shrink-0 w-[18px] h-[18px] mt-[28px] box-border rounded-full bg-[#FDDD00] border-2 border-[#101820]"></span>
                    ) : isNext ? (
                      <span className="flex-shrink-0 w-4 h-4 mt-[29px] box-border rounded-full bg-[#F5F8FA] dark:bg-[#0A171D] border-2 border-dashed border-[#6E8B99]"></span>
                    ) : (
                      <span className="flex-shrink-0 w-4 h-4 mt-[29px] box-border rounded-full bg-white dark:bg-[#0A171D] border-[3px] border-[#00ADD8]"></span>
                    )}
                    {!isLast && (
                      <span
                        className={`flex-1 w-[2px] ${isCurrent || isNext ? 'border-l-2 border-dashed border-[#9DBBC8]' : 'bg-[#BFD8E1] dark:bg-[#1E3A47]'
                          }`}
                      ></span>
                    )}
                  </div>

                  {/* Card Column */}
                  <div className="flex-1 min-w-0 pb-8">
                    <div
                      className={`flex flex-col gap-3 p-6 rounded-xl transition-all ${isCurrent
                        ? 'bg-white dark:bg-[#0E1F27] border border-[#101820] dark:border-[#00ADD8] shadow-cyan-solid-6'
                        : isNext
                          ? 'bg-[#F5F8FA] dark:bg-[#0E1F27] border border-dashed border-[#6E8B99] dark:border-[#2B4E5E]'
                          : 'bg-white dark:bg-[#0E1F27] border border-[#C9DCE4] dark:border-[#1E3A47]'
                        }`}
                    >
                      {/* Badge & Period Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`font-mono font-bold text-[12px] tracking-wider px-2.5 py-1 rounded-full ${isNow
                              ? 'bg-[#FDDD00] text-[#101820] border border-[#101820]'
                              : isNext
                                ? 'border border-dashed border-[#3C4C57] text-[#3C4C57] dark:text-[#B9D3DC]'
                                : item.type === 'EDUCATION'
                                  ? 'bg-[#E1F6FB] dark:bg-[#16303B] text-[#00536A] dark:text-[#00ADD8]'
                                  : 'bg-[#101820] dark:bg-white text-white dark:text-[#101820]'
                              }`}
                          >
                            {item.type}
                          </span>
                          {item.isCurrent && !isNow && (
                            <span className="font-mono font-bold text-[11px] tracking-wider px-2.5 py-0.5 rounded-full bg-[#FDDD00] text-[#101820] border border-[#101820]">
                              ONGOING
                            </span>
                          )}
                        </div>
                        <span className="font-mono font-medium text-[13px] text-[#4A5B66] dark:text-[#8DB1BE]">
                          [{item.period}]
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="m-0 text-[22px] font-bold text-[#101820] dark:text-white tracking-tight">
                        {item.title} {item.organization && <span className="font-normal text-[#3C4C57] dark:text-[#B9D3DC]">· {item.organization}</span>}
                      </h3>

                      {/* Summary */}
                      <p className="m-0 text-[16px] leading-relaxed text-[#3C4C57] dark:text-[#B9D3DC]">
                        {item.summary}
                      </p>

                      {/* Bullet Points */}
                      {item.details && item.details.length > 0 && (
                        <ul className="space-y-1.5 text-[14px] text-[#3C4C57] dark:text-[#B9D3DC] mt-1 list-disc list-inside">
                          {item.details.map((d, i) => (
                            <li key={i}>{d}</li>
                          ))}
                        </ul>
                      )}

                      {/* Skills pills */}
                      {item.skills && item.skills.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2 mt-2 pt-2 border-t border-[#D6E7EE]/60 dark:border-[#1E3A47]">
                          <span className="text-[13px] text-[#4A5B66] dark:text-[#8DB1BE] mr-1">
                            {item.skillsLabel}
                          </span>
                          {item.skills.map((skill) => (
                            <button
                              key={skill}
                              type="button"
                              onClick={() => onSelectTech(skill)}
                              className="font-mono font-medium text-[12px] px-2.5 py-1 rounded-full border border-[#BFD8E1] dark:border-[#2B4E5E] bg-white dark:bg-[#0A171D] text-[#00536A] dark:text-[#8DB1BE] hover:border-[#00ADD8] cursor-pointer"
                            >
                              {skill}
                            </button>
                          ))}
                        </div>
                      )}

                      {isNext && (
                        <a href="#contact" className="font-semibold text-[15px] text-[#00708C] dark:text-[#00ADD8] mt-1">
                          Get in touch →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sources I Frequently Follow to Keep Up to Date */}
      <section id="sources" className="w-full py-20 bg-[#F5F8FA] dark:bg-[#0E1F27] border-t border-[#D6E7EE] dark:border-[#1E3A47]">
        <div className="max-w-[1440px] mx-auto w-full px-5 sm:px-8 lg:px-16 flex flex-col gap-10">
          {/* Header */}
          <div className="flex flex-col gap-2.5">
            <div className="font-mono text-[13px] text-[#00708C] dark:text-[#00ADD8]">
              // feed.sources()
            </div>
            <h2 className="m-0 text-[36px] font-bold text-[#101820] dark:text-white tracking-tight">
              Sources I frequently use to keep up to date
            </h2>
            <p className="m-0 text-[17px] text-[#3C4C57] dark:text-[#B9D3DC] max-w-[720px] leading-relaxed">
              YouTube channels, AI newsletters, and official engineering blogs I follow to stay informed across software engineering, AI developments, business, and current affairs.
            </p>
          </div>

          {/* Frequently Referenced Learning Sources */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {techInterestsData.sources.map((src) => (
              <a
                key={src.name}
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col justify-between p-5 rounded-[12px] bg-white dark:bg-[#0A171D] border border-[#D6E7EE] dark:border-[#1E3A47] hover:border-[#00ADD8] dark:hover:border-[#00ADD8] shadow-sm transition-all group"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-[#16303B] text-[#4A5B66] dark:text-[#8DB1BE]">
                      {src.type}
                    </span>
                    <span className="text-[#00708C] dark:text-[#00ADD8] text-[12px] font-mono group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                      ↗
                    </span>
                  </div>

                  <h4 className="m-0 text-[16px] font-bold text-[#101820] dark:text-white group-hover:text-[#00708C] dark:group-hover:text-[#00ADD8] transition-colors">
                    {src.name}
                  </h4>
                  <span className="text-[12px] font-mono text-[#00708C] dark:text-[#00ADD8]">
                    {src.creator}
                  </span>

                  <p className="m-0 text-[13px] leading-relaxed text-[#3C4C57] dark:text-[#B9D3DC] mt-1">
                    {src.focus}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer matching reference */}
      <Footer variant="about" />
    </div>
  );
};
