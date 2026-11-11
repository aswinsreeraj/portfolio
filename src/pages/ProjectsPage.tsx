import React from 'react';
import { projectsData } from '../data/projects';
import { ProjectCard } from '../components/ProjectCard';
import { Footer } from '../components/Footer';
import { GithubOutlineIcon } from '../components/SocialIcons';

interface ProjectsPageProps {
  onSelectTech: (techName: string) => void;
}

const OPEN_SOURCE_CONTRIBUTIONS = [
  {
    repo: 'oras-project/oras-go',
    repoUrl: 'https://github.com/oras-project/oras-go',
    prTitle: 'Go Client SDK Implementation, Tests & Documentation Enhancements',
    prUrl: 'https://github.com/oras-project/oras-go/pulls?q=is%3Apr+state%3Aclosed+author%3Aaswinsreeraj',
    status: 'merged upstream',
    summary:
      'Contributed Go code, unit/integration test coverage, and documentation updates to the CNCF ORAS (OCI Registry As Storage) Go client library, navigating upstream maintainer review and CI workflows.',
    impact: 'Reviewed and merged upstream in CNCF / ORAS Go client.',
    tags: ['Go', 'OCI', 'ORAS', 'Cloud-Native'],
  },
];

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onSelectTech }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0A171D] text-[#101820] dark:text-[#E6F4F8] transition-colors">
      {/* Top Banner */}
      <section className="w-full py-14 bg-[#F3FAFD] dark:bg-[#0E1F27] border-b border-[#D6E7EE] dark:border-[#1E3A47]">
        <div className="max-w-[1440px] mx-auto w-full px-5 sm:px-8 lg:px-16 flex flex-col gap-4">
          <div className="font-mono text-[13px] text-[#00708C] dark:text-[#00ADD8]">
            // package projects (showcase.go)
          </div>
          <h1 className="m-0 text-[36px] sm:text-[48px] font-bold tracking-tight text-[#101820] dark:text-white leading-[1.05]">
            Engineering Projects Showcase
          </h1>
          <p className="m-0 text-[17px] sm:text-[18px] text-[#3C4C57] dark:text-[#B9D3DC] leading-relaxed max-w-[760px]">
            Production-oriented distributed systems and AI platforms built in Go &amp; Python. Each case study covers architecture boundaries, system diagrams, schema &amp; security constraints, and engineering trade-offs.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <main className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16 py-14 w-full flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelectTech={onSelectTech}
            />
          ))}
        </div>
      </main>

      {/* Open Source Contributions Section */}
      <section id="open-source" className="w-full py-16 bg-[#F5F8FA] dark:bg-[#0E1F27] border-t border-[#D6E7EE] dark:border-[#1E3A47]">
        <div className="max-w-[1440px] mx-auto w-full px-5 sm:px-8 lg:px-16 flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex flex-col gap-2">
              <div className="font-mono font-medium text-[13px] tracking-wide text-[#00708C] dark:text-[#00ADD8]">
                // oss.contributions()
              </div>
              <h2 className="m-0 text-[30px] sm:text-[36px] font-bold tracking-tight text-[#101820] dark:text-white">
                Open Source Work
              </h2>
              <p className="m-0 text-[16px] text-[#3C4C57] dark:text-[#B9D3DC] max-w-[620px] leading-relaxed">
                Upstream pull requests, bug fixes, and library enhancements contributed to the Go and cloud-native ecosystem.
              </p>
            </div>

            <a
              href="https://github.com/aswinsreeraj"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 self-start font-mono text-[13px] font-bold text-[#00708C] dark:text-[#00ADD8] hover:text-[#00536A] dark:hover:text-[#7FDCF3] transition-colors"
            >
              <GithubOutlineIcon className="w-4 h-4" />
              <span>View GitHub profile ↗</span>
            </a>
          </div>

          <div className={`grid gap-6 ${OPEN_SOURCE_CONTRIBUTIONS.length === 1 ? 'grid-cols-1 max-w-[760px]' : 'grid-cols-1 md:grid-cols-3'}`}>
            {OPEN_SOURCE_CONTRIBUTIONS.map((item) => (
              <div
                key={item.repo + item.prTitle}
                className="flex flex-col justify-between p-6 rounded-[14px] bg-white dark:bg-[#0A171D] border border-[#D6E7EE] dark:border-[#1E3A47] hover:border-[#00ADD8] dark:hover:border-[#00ADD8] shadow-sm transition-all group"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-2">
                    <a
                      href={item.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[13px] font-bold text-[#00708C] dark:text-[#00ADD8] hover:underline truncate"
                    >
                      {item.repo}
                    </a>
                    <span className="font-mono text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                      merged
                    </span>
                  </div>

                  <h3 className="m-0 text-[16px] font-bold text-[#101820] dark:text-white leading-snug">
                    {item.prTitle}
                  </h3>

                  <p className="m-0 text-[13.5px] text-[#3C4C57] dark:text-[#B9D3DC] leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                <div className="flex flex-col gap-3 pt-4 mt-4 border-t border-[#D6E7EE]/60 dark:border-[#1E3A47]">
                  <div className="text-[12px] font-mono text-emerald-600 dark:text-emerald-400">
                    ✓ {item.impact}
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[11px] px-2 py-0.5 rounded-md bg-[#F3FAFD] dark:bg-[#16303B] text-[#00536A] dark:text-[#8DB1BE] border border-[#D6E7EE] dark:border-[#1E3A47]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <a
                      href={item.prUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-[12px] font-semibold text-[#00708C] dark:text-[#00ADD8] hover:underline"
                    >
                      <span>PRs</span>
                      <span>↗</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer variant="home" />
    </div>
  );
};
