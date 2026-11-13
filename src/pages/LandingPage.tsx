import React from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { profile } from '../data/profile';
import { projectsData } from '../data/projects';
import { ProjectCard } from '../components/ProjectCard';
import { HeroAskWidget } from '../components/HeroAskWidget';
import { Footer } from '../components/Footer';
import {
  LinkedinOutlineIcon,
  GithubOutlineIcon,
  YoutubeOutlineIcon,
  LeetcodeOutlineIcon
} from '../components/SocialIcons';

interface LandingPageProps {
  onOpenAskModal: (initialQuery?: string) => void;
  onSelectTech: (techName: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onOpenAskModal,
  onSelectTech
}) => {
  const heroTechnologies = [
    'PostgreSQL',
    'Redis',
    'Kafka',
    'Temporal',
    'Docker',
    'Kubernetes',
    'gRPC',
    'Python',
    'AWS',
    'OpenTelemetry',
    'pgvector',
    'Gin',
    'GraphQL',
    'Vault'
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0A171D] text-[#101820] dark:text-[#E6F4F8] transition-colors">
      {/* Hero Section matching landing.html */}
      <section className="w-full py-16 lg:py-24 bg-[#F5F8FA] dark:bg-[#0E1F27] border-b border-[#E3EBEF] dark:border-[#1E3A47]">
        <div className="max-w-[1440px] mx-auto w-full px-5 sm:px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column */}
          <div className="lg:col-span-6 flex flex-col gap-7 pt-1">
            {/* Main Headline */}
            <h1 className="m-0 text-[38px] sm:text-[54px] lg:text-[64px] font-bold tracking-tight leading-[1.04] text-[#101820] dark:text-white">
              Backend engineer building reliable services.
            </h1>

            {/* Subtitle */}
            <p className="m-0 text-[18px] sm:text-[20px] text-[#3C4C57] dark:text-[#B9D3DC] leading-relaxed max-w-[540px]">
              {profile.shortBio}
            </p>

            {/* CTAs matching reference */}
            <div className="flex flex-wrap gap-4 pt-1">
              <a
                href="#projects"
                className="inline-flex items-center justify-center min-h-[48px] px-6 bg-[#FDDD00] hover:bg-[#ebd000] text-[#101820] border border-[#101820] rounded-md shadow-yellow-solid font-bold text-[16px] transition-transform active:translate-x-0.5 active:translate-y-0.5"
              >
                View projects
              </a>
              <a
                href={profile.resumeUrl}
                download="Aswin_Sreeraj.pdf"
                className="inline-flex items-center justify-center min-h-[48px] px-6 bg-white dark:bg-[#0A171D] hover:bg-slate-50 dark:hover:bg-[#12242D] text-[#101820] dark:text-white border border-[#101820] dark:border-[#1E3A47] rounded-md font-semibold text-[16px] transition-colors"
              >
                Resume ↓
              </a>
            </div>

              {/* Social Profile Links (Icon outlines, no button box, scales up on hover) */}
              <div className="flex items-center gap-5 pt-0.5">
                {profile.linkedin && (
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    title="LinkedIn"
                    className="text-[#3C4C57] dark:text-[#B9D3DC] hover:text-[#00ADD8] dark:hover:text-[#00ADD8] transition-all duration-200 ease-out transform hover:scale-125 focus:outline-none focus-visible:text-[#00ADD8]"
                  >
                    <LinkedinOutlineIcon className="w-6 h-6" />
                  </a>
                )}
                {profile.github && (
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    title="GitHub"
                    className="text-[#3C4C57] dark:text-[#B9D3DC] hover:text-[#00ADD8] dark:hover:text-[#00ADD8] transition-all duration-200 ease-out transform hover:scale-125 focus:outline-none focus-visible:text-[#00ADD8]"
                  >
                    <GithubOutlineIcon className="w-6 h-6" />
                  </a>
                )}
                {profile.youtube && (
                  <a
                    href={profile.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    title="YouTube"
                    className="text-[#3C4C57] dark:text-[#B9D3DC] hover:text-[#00ADD8] dark:hover:text-[#00ADD8] transition-all duration-200 ease-out transform hover:scale-125 focus:outline-none focus-visible:text-[#00ADD8]"
                  >
                    <YoutubeOutlineIcon className="w-6 h-6" />
                  </a>
                )}
                {profile.email && (
                  <a
                    href={`mailto:${profile.email}`}
                    aria-label="Email"
                    title="Email"
                    className="text-[#3C4C57] dark:text-[#B9D3DC] hover:text-[#00ADD8] dark:hover:text-[#00ADD8] transition-all duration-200 ease-out transform hover:scale-125 focus:outline-none focus-visible:text-[#00ADD8]"
                  >
                    <Mail className="w-6 h-6" strokeWidth={1.8} />
                  </a>
                )}
              </div>

              {/* Works with pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-[14px]">
                <span className="text-[#4A5B66] dark:text-[#8DB1BE] mr-1">Works with</span>
                <button
                  type="button"
                  onClick={() => onSelectTech('Go')}
                  className="font-mono font-medium text-[12px] px-2.5 py-1 rounded-full border border-[#00ADD8] bg-[#E1F6FB] dark:bg-[#16303B] text-[#00536A] dark:text-[#00ADD8] cursor-pointer"
                >
                  Go
                </button>
                {heroTechnologies.map((tech) => (
                  <button
                    key={tech}
                    type="button"
                    onClick={() => onSelectTech(tech)}
                    className="font-mono font-medium text-[12px] px-2.5 py-1 rounded-full border border-[#C9DCE4] dark:border-[#1E3A47] bg-white dark:bg-[#0A171D] text-[#00536A] dark:text-[#8DB1BE] hover:border-[#00ADD8] cursor-pointer transition-colors"
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Interactive Ask Widget */}
            <div className="lg:col-span-6">
              <HeroAskWidget onOpenFullChat={onOpenAskModal} />
            </div>
          </div>
      </section>

      {/* Selected Work Section matching landing.html */}
      <section id="projects" className="w-full py-20 lg:py-24 bg-white dark:bg-[#0A171D]">
        <div className="max-w-[1440px] mx-auto w-full px-5 sm:px-8 lg:px-16 flex flex-col gap-11">
          <div className="flex flex-col gap-3">
            <div className="font-mono font-medium text-[13px] tracking-wide text-[#00708C] dark:text-[#00ADD8]">
              // projects.featured()
            </div>
            <h2 className="m-0 text-[36px] sm:text-[42px] font-bold tracking-tight text-[#101820] dark:text-white leading-tight">
              Projects, in depth
            </h2>
            <p className="m-0 text-[#3C4C57] dark:text-[#B9D3DC] text-[18px] leading-relaxed max-w-[640px]">
              Each one has an architecture diagram, system screenshots, the trade-offs I weighed, and the numbers.
            </p>
          </div>

          {/* Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelectTech={onSelectTech}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer variant="home" />
    </div>
  );
};
