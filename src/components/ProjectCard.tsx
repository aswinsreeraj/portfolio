import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProjectData } from '../data/projects';

interface ProjectCardProps {
  project: ProjectData;
  onSelectTech?: (techName: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelectTech }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  return (
    <article
      onMouseEnter={project.videoUrl ? handleMouseEnter : undefined}
      onMouseLeave={project.videoUrl ? handleMouseLeave : undefined}
      className="flex-1 min-w-[320px] max-w-full flex flex-col bg-white dark:bg-[#0E1F27] border border-[#C9DCE4] dark:border-[#1E3A47] rounded-[14px] overflow-hidden transition-all hover:border-[#00ADD8] dark:hover:border-[#00ADD8]"
    >
      {/* Project Media Box */}
      <Link
        to={`/projects/${project.id}`}
        aria-label={`Open ${project.name} case study and architecture`}
        className={`relative block aspect-video w-full overflow-hidden group cursor-pointer border-b border-[#C9DCE4] dark:border-[#1E3A47] ${
          project.screenshotBg === 'light' ? 'bg-[#F3FAFD]' : 'bg-[#0A171D]'
        }`}
      >
        {project.videoUrl ? (
          <video
            ref={videoRef}
            src={project.videoUrl}
            aria-label={`${project.name} animated project overview`}
            loop
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            className={`w-full h-full pointer-events-none transition-transform duration-300 group-hover:scale-[1.03] ${
              project.screenshotFit === 'contain' ? 'object-contain p-2' : 'object-cover object-center'
            }`}
          />
        ) : (
          <img
            src={project.screenshotUrl}
            alt={`${project.name} project screenshot and system preview`}
            className={`w-full h-full transition-transform duration-300 group-hover:scale-105 ${
              project.screenshotFit === 'contain' ? 'object-contain p-2' : 'object-cover object-center'
            }`}
            loading="lazy"
          />
        )}
        {!project.videoUrl && (
          <div
            className={`absolute inset-0 pointer-events-none ${
              project.screenshotBg === 'light'
                ? 'bg-gradient-to-t from-[#101820]/20 via-transparent to-transparent'
                : 'bg-gradient-to-t from-[#0A171D]/80 via-transparent to-transparent'
            }`}
          />
        )}
      </Link>

      {/* Subtle Media Caption Strip */}
      {project.screenshotLabel && (
        <div className="px-5 py-2 bg-[#F5F8FA] dark:bg-[#0A171D] border-b border-[#E3EBEF] dark:border-[#1E3A47] flex items-center justify-between gap-2 font-mono text-[11px] text-[#4A5B66] dark:text-[#8DB1BE]">
          <span className="truncate">{project.screenshotLabel}</span>
          {project.videoUrl && (
            <span className="inline-flex items-center gap-1.5 flex-shrink-0 text-[#00708C] dark:text-[#00ADD8]">
              {isHovered ? (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00ADD8] animate-pulse" />
                  playing
                </>
              ) : (
                <>
                  <span aria-hidden="true">▶</span>
                  hover
                </>
              )}
            </span>
          )}
        </div>
      )}

      {/* Card Details */}
      <div className="flex flex-col gap-3.5 p-7 flex-1 justify-between">
        <div className="flex flex-col gap-3.5">
          <div className="flex items-center justify-between gap-2">
            <div className="font-mono font-medium text-[12px] tracking-wider text-[#00708C] dark:text-[#00ADD8]">
              {project.number}
            </div>
            <span className="font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#FDDD00] text-[#101820] border border-[#101820]">
              {project.status}
            </span>
          </div>
          <h3 className="m-0 text-[26px] font-bold tracking-tight text-[#101820] dark:text-white">
            <Link to={`/projects/${project.id}`} className="text-[#101820] dark:text-white hover:text-[#00708C]">
              {project.name}
            </Link>
          </h3>
          <p className="m-0 text-[#3C4C57] dark:text-[#B9D3DC] text-[16px] leading-relaxed">
            {project.shortDescription}
          </p>
        </div>

        <div className="flex flex-col gap-4 pt-2">
          {/* Tech Pills */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => {
              const isGo = tech.toLowerCase() === 'go';
              return (
                <button
                  key={tech}
                  type="button"
                  onClick={() => onSelectTech && onSelectTech(tech)}
                  className={`font-mono font-medium text-[12px] px-2.5 py-1 rounded-full transition-colors cursor-pointer border ${
                    isGo
                      ? 'border-[#00ADD8] bg-[#E1F6FB] dark:bg-[#16303B] text-[#00536A] dark:text-[#00ADD8]'
                      : 'border-[#BFD8E1] dark:border-[#2B4E5E] bg-white dark:bg-[#0A171D] text-[#00536A] dark:text-[#8DB1BE] hover:border-[#00ADD8]'
                  }`}
                >
                  {tech}
                </button>
              );
            })}
          </div>

          {/* Case Study Link */}
          <Link
            to={`/projects/${project.id}`}
            className="font-semibold text-[16px] text-[#00708C] dark:text-[#00ADD8] hover:text-[#004F63] dark:hover:text-[#7FDCF3] transition-colors"
          >
            Read the case study →
          </Link>
        </div>
      </div>
    </article>
  );
};
