import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { projectsData } from '../data/projects';
import { Footer } from '../components/Footer';

interface ProjectDetailPageProps {
  onSelectTech: (techName: string) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ onSelectTech }) => {
  const { id } = useParams<{ id: string }>();
  const project = projectsData.find((p) => p.id === id);

  const SECTIONS = [
    { id: 'overview', label: 'Overview' },
    { id: 'preview', label: 'System Preview' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'decisions', label: 'Decisions' },
  ];

  const [activeSection, setActiveSection] = React.useState<string>('overview');
  const [lightboxItem, setLightboxItem] = React.useState<{
    src: string;
    title: string;
    caption: string;
    cropPreview?: boolean;
  } | null>(null);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(SECTIONS[i].id);
            return;
          }
        }
      }
      setActiveSection('overview');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [id]);

  React.useEffect(() => {
    if (!lightboxItem) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxItem(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxItem]);

  if (!project) {
    return <Navigate to="/404" replace />;
  }

  // Find next project for bottom link
  const currentIndex = projectsData.findIndex((p) => p.id === id);
  const nextProject = projectsData[(currentIndex + 1) % projectsData.length];

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0A171D] text-[#101820] dark:text-[#E6F4F8] transition-colors">
      <div className="flex flex-wrap gap-12 items-start py-12 px-5 sm:px-8 lg:px-16 max-w-[1440px] mx-auto w-full flex-1">
        {/* Left Sticky Index Sidebar matching reference */}
        <aside className="w-full lg:w-[220px] flex-shrink-0 flex flex-col gap-5 relative lg:sticky lg:top-24">
          <div className="font-mono font-medium text-[12px] tracking-wide text-[#4A5B66] dark:text-[#8DB1BE] flex items-center justify-between">
            <span>// nav.index</span>
            <span className="text-[11px] font-semibold text-[#00708C] dark:text-[#00ADD8]">
              {SECTIONS.findIndex((s) => s.id === activeSection) + 1} / {SECTIONS.length}
            </span>
          </div>
          <nav className="flex lg:flex-col flex-wrap gap-1.5 text-[15px]" aria-label="Page sections">
            {SECTIONS.map((s) => {
              const isActive = activeSection === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => scrollToSection(s.id)}
                  aria-current={isActive ? 'location' : undefined}
                  className={`text-left px-3 py-2 rounded-md transition-all flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'bg-[#E1F6FB] dark:bg-[#16303B] text-[#00536A] dark:text-[#00ADD8] font-bold border-l-[3px] border-[#00ADD8] shadow-sm'
                      : 'text-[#4A5B66] dark:text-[#8DB1BE] hover:text-[#101820] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#12242D]'
                  }`}
                >
                  <span>{s.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00ADD8]" aria-hidden="true" />
                  )}
                </button>
              );
            })}
          </nav>
          <Link
            to="/projects"
            className="text-[14px] font-semibold text-[#00708C] dark:text-[#00ADD8] pt-2 hover:underline"
          >
            ← All projects
          </Link>
        </aside>

        {/* Main Content Column matching project_case_study.html */}
        <main className="flex-1 min-w-0 max-w-[960px] flex flex-col gap-16">
          {/* Section: Overview */}
          <section id="overview" className="flex flex-col gap-5">
            <div className="font-mono text-[13px] text-[#00708C] dark:text-[#00ADD8]">
              // package projects ({project.id}.go)
            </div>

            <h1 className="m-0 text-[36px] sm:text-[48px] font-bold tracking-tight text-[#101820] dark:text-white leading-[1.06]">
              {project.name}: {project.tagline}
            </h1>

            {/* Tech badges + Status badge */}
            <div className="flex flex-wrap gap-2 items-center">
              {project.technologies.map((t) => {
                const isGo = t.toLowerCase() === 'go';
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => onSelectTech(t)}
                    className={`font-mono font-medium text-[12px] px-2.5 py-1 rounded-full cursor-pointer border ${
                      isGo
                        ? 'border-[#00ADD8] bg-[#E1F6FB] dark:bg-[#16303B] text-[#00536A] dark:text-[#00ADD8]'
                        : 'border-[#BFD8E1] dark:border-[#2B4E5E] bg-white dark:bg-[#0A171D] text-[#00536A] dark:text-[#8DB1BE]'
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
              <span className="font-mono font-bold text-[12px] px-2.5 py-1 rounded-full border border-[#101820] bg-[#FDDD00] text-[#101820]">
                Status: {project.status}
              </span>
            </div>

            <p className="m-0 text-[19px] leading-relaxed text-[#3C4C57] dark:text-[#B9D3DC] max-w-[760px]">
              {project.overview}
            </p>

            <div className="flex flex-wrap gap-3 mt-1">
              {project.repositories && project.repositories.length > 0 ? (
                project.repositories.map((repo, idx) => (
                  <a
                    key={repo.url}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center min-h-[44px] px-5 rounded-md font-semibold text-[15px] transition-opacity ${
                      idx === 0
                        ? 'bg-[#101820] dark:bg-white text-white dark:text-[#101820] hover:opacity-90'
                        : 'border border-[#101820] dark:border-white text-[#101820] dark:text-white hover:bg-slate-100 dark:hover:bg-[#12242D] transition-colors'
                    }`}
                  >
                    {repo.label} ↗
                  </a>
                ))
              ) : (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center min-h-[44px] px-5 bg-[#101820] dark:bg-white text-white dark:text-[#101820] rounded-md font-semibold text-[15px] hover:opacity-90 transition-opacity"
                >
                  Source on GitHub ↗
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center min-h-[44px] px-5 border border-[#101820] dark:border-white text-[#101820] dark:text-white rounded-md font-semibold text-[15px] hover:bg-slate-100 dark:hover:bg-[#12242D] transition-colors"
                >
                  Live demo ↗
                </a>
              )}
            </div>

            {/* Problem & Constraints matching reference */}
            <div className="flex flex-wrap gap-6 mt-3">
              <div className="flex-1 min-w-[280px] flex flex-col gap-2 p-5 border border-[#D6E7EE] dark:border-[#1E3A47] rounded-xl bg-[#F3FAFD] dark:bg-[#0E1F27]">
                <div className="font-mono font-medium text-[12px] tracking-wide text-[#00708C] dark:text-[#00ADD8]">
                  // spec.problem
                </div>
                <p className="m-0 text-[16px] leading-relaxed text-[#3C4C57] dark:text-[#B9D3DC]">
                  {project.shortDescription}
                </p>
              </div>
              <div className="flex-1 min-w-[280px] flex flex-col gap-2 p-5 border border-[#D6E7EE] dark:border-[#1E3A47] rounded-xl bg-[#F3FAFD] dark:bg-[#0E1F27]">
                <div className="font-mono font-medium text-[12px] tracking-wide text-[#00708C] dark:text-[#00ADD8]">
                  // spec.constraints
                </div>
                <p className="m-0 text-[16px] leading-relaxed text-[#3C4C57] dark:text-[#B9D3DC]">
                  {project.constraints}
                </p>
              </div>
            </div>
          </section>

          {/* Section: Project Screenshot & System Preview */}
          <section id="preview" className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="m-0 text-[30px] font-bold text-[#101820] dark:text-white tracking-tight">
                System Preview
              </h2>
              <span className="font-mono text-[12px] text-[#00708C] dark:text-[#00ADD8] bg-[#E1F6FB] dark:bg-[#16303B] px-3 py-1 rounded-full border border-[#BFD8E1] dark:border-[#2B4E5E]">
                {project.gallery && project.gallery.length > 1 ? 'Architecture & Blueprints' : 'Project Screenshot'}
              </span>
            </div>

            {project.gallery && project.gallery.length > 0 ? (
              <div className="flex flex-col gap-8">
                {project.gallery.map((item) => (
                  <div
                    key={item.src}
                    className="relative w-full max-w-[920px] rounded-[10px] overflow-hidden border border-[#101820] dark:border-[#00ADD8] shadow-cyan-solid-8 bg-white dark:bg-[#0E1F27]"
                  >
                    <button
                      type="button"
                      onClick={() => setLightboxItem(item)}
                      aria-label={`Zoom ${item.title}`}
                      className="w-full block bg-white cursor-zoom-in group relative focus:outline-none overflow-hidden"
                    >
                      <img
                        src={item.src}
                        alt={item.title}
                        className={`w-full block transition-transform duration-200 group-hover:scale-[1.01] ${
                          item.cropPreview ? 'max-h-[520px] object-cover object-top' : 'h-auto'
                        }`}
                      />
                      <span className="absolute right-3 bottom-3 font-mono text-[11px] bg-[#101820]/85 text-white px-2.5 py-1 rounded border border-white/15 opacity-90 group-hover:opacity-100">
                        {item.cropPreview ? 'Click to view full page ↗' : 'Click to enlarge ↗'}
                      </span>
                    </button>
                    <div className="p-4 bg-[#0A171D] border-t border-[#1E3A47] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[12px] font-mono text-[#8DB1BE]">
                      <span>{item.caption}</span>
                      {item.badge && (
                        <span className="text-[#00ADD8] flex-shrink-0">{item.badge}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="relative w-full max-w-[920px] rounded-[10px] overflow-hidden border border-[#101820] dark:border-[#00ADD8] shadow-cyan-solid-8 bg-[#0E1F27]">
                <img
                  src={project.screenshotUrl}
                  alt={`${project.name} system preview and interface screenshot`}
                  className="w-full h-auto block"
                />
                <div className="p-3.5 bg-[#0A171D] border-t border-[#1E3A47] flex items-center justify-between text-[12px] font-mono text-[#8DB1BE]">
                  <span>Fig. 1 · {project.name} system architecture &amp; interface preview</span>
                  <span className="text-[#00ADD8]">High Resolution</span>
                </div>
              </div>
            )}

            <div className="text-[15px] text-[#3C4C57] dark:text-[#B9D3DC]">
              Jump to the <a href="#architecture" className="font-semibold text-[#00708C] dark:text-[#00ADD8]">system architecture breakdown</a> below.
            </div>
          </section>

          {/* Section: Architecture */}
          <section id="architecture" className="flex flex-col gap-5">
            <h2 className="m-0 text-[30px] font-bold text-[#101820] dark:text-white tracking-tight">
              Architecture
            </h2>
            <p className="m-0 text-[17px] leading-relaxed text-[#3C4C57] dark:text-[#B9D3DC] max-w-[680px]">
              {project.architecture.description}
            </p>

            {/* End-to-End Request & Event Flow */}
            <div className="border border-[#D6E7EE] dark:border-[#1E3A47] rounded-[10px] bg-[#F3FAFD] dark:bg-[#0E1F27] p-5">
              <div className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#00708C] dark:text-[#00ADD8] mb-3">
                Request &amp; Event Flow
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {project.architecture.diagramFlow.map((stage, idx) => (
                  <React.Fragment key={idx}>
                    <span className="px-3 py-1.5 bg-white dark:bg-[#0A171D] border border-[#BFD8E1] dark:border-[#1E3A47] rounded-lg text-[13px] font-mono font-medium text-[#101820] dark:text-[#E6F4F8]">
                      {stage}
                    </span>
                    {idx < project.architecture.diagramFlow.length - 1 && (
                      <span className="font-mono text-[#00ADD8] font-bold text-[14px] select-none" aria-hidden="true">
                        →
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Component Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-1">
              {project.architecture.components.map((comp) => (
                <div
                  key={comp.step}
                  className="flex gap-3 items-start p-4 bg-white dark:bg-[#0E1F27] border border-[#D6E7EE] dark:border-[#1E3A47] rounded-xl"
                >
                  <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-[#FDDD00] border border-[#101820] font-mono font-bold text-xs text-[#101820]">
                    {comp.step}
                  </span>
                  <div className="text-[15px] leading-relaxed text-[#3C4C57] dark:text-[#B9D3DC]">
                    <strong className="text-[#101820] dark:text-white block font-sans">{comp.name} ({comp.role})</strong>
                    <span>{comp.details}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Decisions matching reference */}
          <section id="decisions" className="flex flex-col gap-5">
            <h2 className="m-0 text-[30px] font-bold text-[#101820] dark:text-white tracking-tight">
              Decisions
            </h2>
            <p className="m-0 text-[17px] leading-relaxed text-[#3C4C57] dark:text-[#B9D3DC] max-w-[680px]">
              The choices that mattered, and what I turned down.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {project.decisions.map((dec, idx) => (
                <article
                  key={idx}
                  className="flex flex-col border border-[#C9DCE4] dark:border-[#1E3A47] rounded-[10px] overflow-hidden bg-white dark:bg-[#0E1F27]"
                >
                  <div className="px-5 py-3 bg-[#F3FAFD] dark:bg-[#16303B] border-b border-[#C9DCE4] dark:border-[#1E3A47] font-mono font-medium text-[13px] text-[#00536A] dark:text-[#00ADD8]">
                    {dec.title}
                  </div>
                  <div className="flex flex-col gap-3 p-5 text-[15px] leading-relaxed text-[#3C4C57] dark:text-[#B9D3DC]">
                    <p className="m-0">
                      <strong className="text-[#101820] dark:text-white">Why. </strong>
                      {dec.why}
                    </p>
                    <p className="m-0">
                      <strong className="text-[#101820] dark:text-white">Rejected. </strong>
                      {dec.rejected}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Navigation Bar */}
          <div className="flex flex-wrap gap-4 justify-between items-center pt-8 border-t border-[#D6E7EE] dark:border-[#1E3A47]">
            <Link
              to="/projects"
              className="font-semibold text-[16px] text-[#00708C] dark:text-[#00ADD8]"
            >
              ← All projects
            </Link>
            <Link
              to={`/projects/${nextProject.id}`}
              className="font-semibold text-[16px] text-[#00708C] dark:text-[#00ADD8]"
            >
              Next: {nextProject.name} →
            </Link>
          </div>
        </main>
      </div>

      {lightboxItem && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={lightboxItem.title}
          onClick={() => setLightboxItem(null)}
        >
          <div
            className="relative max-w-[1200px] w-full max-h-[92vh] flex flex-col rounded-xl overflow-hidden bg-white dark:bg-[#0E1F27] border border-[#1E3A47] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3 bg-[#0A171D] text-white border-b border-[#1E3A47]">
              <span className="font-mono text-[13px] font-semibold">{lightboxItem.title}</span>
              <button
                type="button"
                onClick={() => setLightboxItem(null)}
                aria-label="Close enlarged diagram"
                className="font-mono text-[13px] px-2.5 py-1 rounded bg-[#16303B] hover:bg-[#1E3A47] text-[#E6F4F8] cursor-pointer"
              >
                Close [ESC]
              </button>
            </div>
            <div
              className={`overflow-auto bg-white p-3 flex justify-center max-h-[76vh] ${
                lightboxItem.cropPreview ? 'items-start' : 'items-center'
              }`}
            >
              <img
                src={lightboxItem.src}
                alt={lightboxItem.title}
                className={
                  lightboxItem.cropPreview
                    ? 'w-full max-w-[760px] h-auto block'
                    : 'max-w-full max-h-[72vh] object-contain'
                }
              />
            </div>
            <div className="px-5 py-3 bg-[#0A171D] text-[#8DB1BE] font-mono text-[12px] border-t border-[#1E3A47]">
              {lightboxItem.caption}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};
