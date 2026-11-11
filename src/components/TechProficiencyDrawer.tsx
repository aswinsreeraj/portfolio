import React from 'react';
import { Link } from 'react-router-dom';
import { X, CheckCircle2, FolderGit2, ArrowRight, Code2 } from 'lucide-react';
import { TechSkill } from '../data/skills';
import { FormattedText } from './FormattedText';

interface TechProficiencyDrawerProps {
  skill: TechSkill | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TechProficiencyDrawer: React.FC<TechProficiencyDrawerProps> = ({
  skill,
  isOpen,
  onClose
}) => {
  if (!isOpen || !skill) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end transition-opacity animate-in fade-in duration-200">
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer content */}
      <div className="relative w-full max-w-xl bg-white dark:bg-[#0E1F27] text-[#101820] dark:text-[#E6F4F8] h-full shadow-2xl flex flex-col z-10 border-l border-[#D6E7EE] dark:border-[#1E3A47] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#D6E7EE] dark:border-[#1E3A47] bg-[#F3FAFD] dark:bg-[#0A171D] flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#00708C] dark:text-[#00ADD8] font-bold bg-[#E1F6FB] dark:bg-[#16303B] px-2.5 py-0.5 rounded-full border border-[#00ADD8]/40">
                {skill.category}
              </span>
              <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full font-bold ${
                skill.tier === 'Daily'
                  ? 'bg-[#E1F6FB] dark:bg-[#16303B] text-[#00536A] dark:text-[#00ADD8] border border-[#00ADD8]'
                  : skill.tier === 'Comfortable'
                  ? 'bg-white dark:bg-[#0A171D] text-[#3C4C57] dark:text-[#B9D3DC] border border-[#BFD8E1] dark:border-[#2B4E5E]'
                  : 'bg-[#FDDD00]/15 dark:bg-[#FDDD00]/10 text-[#101820] dark:text-[#FDDD00] border border-[#FDDD00]'
              }`}>
                {skill.tier}
              </span>
            </div>
            <h2 className="text-[24px] font-bold text-[#101820] dark:text-white font-mono flex items-center gap-2 m-0">
              <span>{skill.name}</span>
            </h2>
            <p className="text-[14px] text-[#3C4C57] dark:text-[#B9D3DC] mt-1 leading-relaxed">
              <FormattedText text={skill.summary} />
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-md text-[#4A5B66] dark:text-[#8DB1BE] hover:text-[#101820] dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-[#12242D] transition-colors cursor-pointer"
            aria-label="Close panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-7">
          {/* Section: What I have built with it */}
          <div>
            <h3 className="text-[12px] font-mono font-semibold uppercase tracking-wider text-[#00708C] dark:text-[#00ADD8] mb-2.5 flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-[#00ADD8]" />
              <span>What I have built with it</span>
            </h3>
            <div className="p-4 rounded-xl bg-[#F5F8FA] dark:bg-[#0A171D] border border-[#D6E7EE] dark:border-[#1E3A47] text-[14px] text-[#101820] dark:text-[#E6F4F8] leading-relaxed">
              <FormattedText text={skill.whatBuilt} />
            </div>
          </div>

          {/* Section: Projects & Education */}
          <div>
            <h3 className="text-[12px] font-mono font-semibold uppercase tracking-wider text-[#00708C] dark:text-[#00ADD8] mb-2.5 flex items-center gap-1.5">
              <FolderGit2 className="w-4 h-4 text-[#00ADD8]" />
              <span>Projects &amp; background</span>
            </h3>
            <div className="space-y-2.5">
              {skill.usedInProjects.map((p) => (
                <Link
                  key={p.id}
                  to={p.route || `/projects/${p.id}`}
                  onClick={onClose}
                  className="group block p-4 rounded-xl border border-[#C9DCE4] dark:border-[#1E3A47] hover:border-[#00ADD8] bg-white dark:bg-[#0A171D] hover:bg-[#F3FAFD] dark:hover:bg-[#16303B]/40 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[14px] font-bold text-[#101820] dark:text-white group-hover:text-[#00708C] dark:group-hover:text-[#00ADD8] transition-colors">
                      {p.name}
                    </span>
                    <span className="text-[12px] font-mono text-[#00708C] dark:text-[#00ADD8] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      <span>{p.route ? 'View background' : 'View case study'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  <p className="text-[13px] text-[#3C4C57] dark:text-[#B9D3DC] mt-1 m-0">
                    <FormattedText text={p.roleInProject} />
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Section: What concepts I understand */}
          <div>
            <h3 className="text-[12px] font-mono font-semibold uppercase tracking-wider text-[#00708C] dark:text-[#00ADD8] mb-2.5 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#00ADD8]" />
              <span>Core concepts & patterns understood</span>
            </h3>
            <ul className="space-y-2 m-0 p-0 list-none">
              {skill.concepts.map((concept, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-[14px] text-[#3C4C57] dark:text-[#B9D3DC]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00ADD8] mt-2 flex-shrink-0" />
                  <span><FormattedText text={concept} /></span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer info */}
        <div className="px-6 py-4 border-t border-[#D6E7EE] dark:border-[#1E3A47] bg-[#F3FAFD] dark:bg-[#0A171D] flex items-center justify-between text-[12px] text-[#4A5B66] dark:text-[#8DB1BE] font-mono">
          <span>Click any project above for its case study</span>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 bg-[#FDDD00] hover:bg-[#ebd000] text-[#101820] border border-[#101820] rounded-md font-bold text-[12px] shadow-sm cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
