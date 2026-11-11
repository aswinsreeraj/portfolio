import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowDown,
  Server,
  Database,
  Radio,
  Cpu,
  ShieldCheck,
  Cloud,
  Code2,
  Compass,
  Sparkles,
} from 'lucide-react';
import { skillsData, softSkillsData, skillCategories } from '../data/skills';
import { Footer } from '../components/Footer';
import { FormattedText } from '../components/FormattedText';

type SkillCategory = (typeof skillCategories)[number];

interface SkillsPageProps {
  onSelectTech: (techName: string) => void;
}

export const SkillsPage: React.FC<SkillsPageProps> = ({ onSelectTech }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const renderCategoryIcon = (category: SkillCategory, isActive = false) => {
    const colorClass = isActive
      ? 'text-white dark:text-[#101820]'
      : 'text-[#00708C] dark:text-[#00ADD8]';
    const cls = `w-3.5 h-3.5 shrink-0 ${colorClass}`;

    switch (category) {
      case 'Backend & APIs':
        return <Server className={cls} />;
      case 'AI, ML & Agentic Systems':
        return <Sparkles className={cls} />;
      case 'Architecture & Concurrency':
        return <Cpu className={cls} />;
      case 'Databases & Caching':
        return <Database className={cls} />;
      case 'Messaging & Workflows':
        return <Radio className={cls} />;
      case 'Security & Testing':
        return <ShieldCheck className={cls} />;
      case 'Cloud, K8s & OTel':
        return <Cloud className={cls} />;
      case 'Frontend':
        return <Code2 className={cls} />;
    }
  };

  const filteredSkills =
    selectedCategory === 'All'
      ? skillsData
      : skillsData.filter((s) => s.category === selectedCategory);

  const scrollToSoftSkills = () => {
    const el = document.getElementById('soft-skills');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0A171D] text-[#101820] dark:text-[#E6F4F8] transition-colors">
      {/* Top Banner */}
      <section className="w-full py-12 sm:py-14 bg-[#F3FAFD] dark:bg-[#0E1F27] border-b border-[#D6E7EE] dark:border-[#1E3A47]">
        <div className="max-w-[1440px] mx-auto w-full px-5 sm:px-8 lg:px-16 flex flex-col gap-4">
          <div className="font-mono text-[13px] text-[#00708C] dark:text-[#00ADD8]">
            // package skills (backend.go)
          </div>
          <h1 className="m-0 text-[36px] sm:text-[46px] font-bold tracking-tight text-[#101820] dark:text-white leading-[1.08]">
            Backend Engineering Stack
          </h1>
          <p className="m-0 text-[16px] sm:text-[18px] text-[#3C4C57] dark:text-[#B9D3DC] leading-relaxed max-w-[760px]">
            Core languages, distributed infrastructure, and engineering habits used across{' '}
            <span className="font-mono text-[#00536A] dark:text-[#00ADD8]">ARDA</span>,{' '}
            <span className="font-mono text-[#00536A] dark:text-[#00ADD8]">EVNTX</span>, and{' '}
            <span className="font-mono text-[#00536A] dark:text-[#00ADD8]">Tenome Micro</span>.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white dark:bg-[#0A171D] border border-[#D6E7EE] dark:border-[#1E3A47] text-[12.5px] font-mono text-[#4A5B66] dark:text-[#8DB1BE]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ADD8]" />
              Select any skill for project context
            </span>
            <button
              type="button"
              onClick={scrollToSoftSkills}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-[#101820] dark:bg-[#00ADD8] text-white dark:text-[#101820] font-mono text-[12.5px] font-semibold hover:opacity-90 transition-opacity cursor-pointer"
            >
              <span>Working Style ({softSkillsData.length})</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16 py-12 w-full flex-1 flex flex-col gap-16">
        {/* Technical Skills Section */}
        <section aria-labelledby="technical-skills-heading" className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <div className="font-mono text-[13px] tracking-wide text-[#00708C] dark:text-[#00ADD8]">
                // [01] stack.technical()
              </div>
              <h2
                id="technical-skills-heading"
                className="m-0 mt-1 text-[26px] sm:text-[32px] font-bold text-[#101820] dark:text-white tracking-tight"
              >
                Technical Skills
              </h2>
            </div>
            <span className="font-mono text-[12px] text-[#4A5B66] dark:text-[#8DB1BE]">
              {filteredSkills.length} of {skillsData.length} skills
            </span>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedCategory('All')}
              className={`min-h-[34px] px-3.5 rounded-full text-[12.5px] font-mono transition-all cursor-pointer ${
                selectedCategory === 'All'
                  ? 'bg-[#101820] dark:bg-[#00ADD8] text-white dark:text-[#101820] font-bold shadow-sm'
                  : 'bg-[#F5F8FA] dark:bg-[#0E1F27] border border-[#D6E7EE] dark:border-[#1E3A47] text-[#3C4C57] dark:text-[#8DB1BE] hover:border-[#00ADD8]'
              }`}
            >
              All ({skillsData.length})
            </button>
            {skillCategories.map((cat) => {
              const isActive = selectedCategory === cat;
              const count = skillsData.filter((s) => s.category === cat).length;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`min-h-[34px] flex items-center gap-1.5 px-3.5 rounded-full text-[12.5px] font-mono transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#00ADD8] text-white dark:text-[#101820] font-bold shadow-sm'
                      : 'bg-[#F5F8FA] dark:bg-[#0E1F27] border border-[#D6E7EE] dark:border-[#1E3A47] text-[#3C4C57] dark:text-[#8DB1BE] hover:border-[#00ADD8]'
                  }`}
                >
                  {renderCategoryIcon(cat, isActive)}
                  <span>{cat}</span>
                  <span className={`text-[11px] ${isActive ? 'opacity-80' : 'text-[#4A5B66] dark:text-[#8DB1BE]/70'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Clean Streamlined Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredSkills.map((skill) => (
              <button
                key={skill.id}
                type="button"
                onClick={() => onSelectTech(skill.name)}
                className="text-left cursor-pointer group rounded-xl bg-white dark:bg-[#0E1F27] border border-[#D6E7EE] dark:border-[#1E3A47] hover:border-[#00ADD8] dark:hover:border-[#00ADD8] hover:bg-[#F3FAFD]/40 dark:hover:bg-[#122630] p-5 transition-all flex flex-col justify-between gap-4"
              >
                <div className="flex flex-col gap-2.5">
                  {/* Top Row: Category & Tier */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono text-[#00708C] dark:text-[#00ADD8] flex items-center gap-1.5 truncate">
                      {renderCategoryIcon(skill.category, false)}
                      <span className="truncate">{skill.category}</span>
                    </span>
                    <span
                      className={`shrink-0 text-[10.5px] font-mono px-2 py-0.5 rounded-full font-semibold ${
                        skill.tier === 'Daily'
                          ? 'bg-[#E1F6FB] dark:bg-[#16303B] text-[#00536A] dark:text-[#00ADD8]'
                          : 'bg-[#F5F8FA] dark:bg-[#0A171D] text-[#4A5B66] dark:text-[#8DB1BE] border border-[#E3EBEF] dark:border-[#1E3A47]'
                      }`}
                    >
                      {skill.tier}
                    </span>
                  </div>

                  {/* Skill Name + Hover Arrow */}
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="m-0 text-[17.5px] font-bold font-mono text-[#101820] dark:text-white group-hover:text-[#00708C] dark:group-hover:text-[#00ADD8] transition-colors">
                      {skill.name}
                    </h3>
                    <ArrowRight className="w-4 h-4 shrink-0 text-[#C9DCE4] dark:text-[#2B4E5E] group-hover:text-[#00ADD8] group-hover:translate-x-0.5 transition-all" />
                  </div>

                  {/* Short Crisp Summary */}
                  <p className="m-0 text-[13.5px] text-[#3C4C57] dark:text-[#B9D3DC] leading-relaxed">
                    <FormattedText text={skill.summary} />
                  </p>
                </div>

                {/* Compact Project Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {skill.usedInProjects.map((p) => (
                    <span
                      key={p.id}
                      className="px-2 py-0.5 rounded bg-[#F5F8FA] dark:bg-[#0A171D] border border-[#E3EBEF] dark:border-[#1E3A47] font-mono text-[11px] text-[#4A5B66] dark:text-[#8DB1BE]"
                    >
                      {p.name}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Working Style / Soft Skills Section */}
        <section
          id="soft-skills"
          aria-labelledby="soft-skills-heading"
          className="pt-10 border-t border-[#D6E7EE] dark:border-[#1E3A47] flex flex-col gap-6"
        >
          <div className="flex flex-col gap-2 max-w-[760px]">
            <div className="font-mono text-[13px] tracking-wide text-[#00708C] dark:text-[#00ADD8]">
              // [02] skills.habits()
            </div>
            <h2
              id="soft-skills-heading"
              className="m-0 text-[26px] sm:text-[32px] font-bold text-[#101820] dark:text-white tracking-tight"
            >
              How I Work &amp; Collaborate
            </h2>
            <p className="m-0 text-[15px] sm:text-[16px] text-[#3C4C57] dark:text-[#B9D3DC] leading-relaxed">
              Engineering habits shaped by compliance and fraud investigation at NatWest Group &amp; Amazon, honours study at Fanshawe College, and backend builds at Brototype.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {softSkillsData.map((item) => (
              <article
                key={item.id}
                className="rounded-xl bg-white dark:bg-[#0E1F27] border border-[#D6E7EE] dark:border-[#1E3A47] p-5 flex flex-col justify-between gap-4"
              >
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-[#00708C] dark:text-[#00ADD8] font-semibold">
                      {item.category}
                    </span>
                    <Compass className="w-4 h-4 text-[#00ADD8] shrink-0" />
                  </div>

                  <h3 className="m-0 text-[17.5px] font-bold text-[#101820] dark:text-white leading-snug">
                    {item.title}
                  </h3>

                  <p className="m-0 text-[13.5px] text-[#3C4C57] dark:text-[#B9D3DC] leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E3EBEF] dark:border-[#1E3A47] flex items-center justify-between gap-2 font-mono text-[11.5px] text-[#4A5B66] dark:text-[#8DB1BE]">
                  <span className="truncate">{item.context}</span>
                  {item.route && (
                    <Link
                      to={item.route}
                      className="shrink-0 inline-flex items-center gap-1 text-[#00708C] dark:text-[#00ADD8] hover:underline font-semibold"
                    >
                      <span>View</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer variant="about" />
    </div>
  );
};
