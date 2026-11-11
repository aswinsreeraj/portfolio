import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { profile } from '../data/profile';

interface FooterProps {
  variant?: 'home' | 'about';
}

export const Footer: React.FC<FooterProps> = ({ variant = 'home' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="w-full">
      {/* Contact Section matching reference */}
      <section id="contact" className="w-full py-20 bg-[#0E1F27] text-[#E6F4F8] border-t border-[#1E3A47]">
        <div className="max-w-[1440px] mx-auto w-full px-5 sm:px-8 lg:px-16 flex flex-wrap gap-12 items-center justify-between">
          {/* Left Column */}
          <div className="flex-1 min-w-[320px] max-w-[560px] flex flex-col gap-5">
            <div className="font-mono text-[13px] text-[#FDDD00]">
              {variant === 'about' ? '// func contact() error' : '// package contact (open.go)'}
            </div>
            <h2 className="m-0 text-[36px] sm:text-[46px] font-bold leading-tight tracking-tight text-white">
              {variant === 'about' ? "Let's talk." : "Open to backend roles."}
            </h2>
            <p className="m-0 text-[18px] text-[#B9D3DC] leading-relaxed">
              Email is the fastest way to reach me.
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <a
                href={profile.resumeUrl}
                download="Aswin_Sreeraj.pdf"
                className="inline-flex items-center min-h-[48px] px-6 bg-[#FDDD00] hover:bg-[#ebd000] text-[#101820] rounded-md font-bold text-[16px] transition-transform active:scale-95 shadow-sm"
              >
                Download resume
              </a>
              {variant === 'home' ? (
                <Link
                  to="/about"
                  className="inline-flex items-center min-h-[48px] px-6 border border-[#E6F4F8] text-white hover:bg-white/10 rounded-md font-semibold text-[16px] transition-colors"
                >
                  More about me →
                </Link>
              ) : (
                <Link
                  to="/projects"
                  className="inline-flex items-center min-h-[48px] px-6 border border-[#E6F4F8] text-white hover:bg-white/10 rounded-md font-semibold text-[16px] transition-colors"
                >
                  ← Back to projects
                </Link>
              )}
            </div>
          </div>

          {/* Right Column: Contact Card */}
          <div className="flex-1 min-w-[320px] max-w-[500px] flex flex-col bg-[#0A171D] border border-[#1E3A47] rounded-[14px] overflow-hidden">
            {/* Email */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-5 sm:p-6 border-b border-[#1E3A47]">
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[12px] tracking-wider text-[#8DB1BE]">EMAIL</span>
                <span className="font-mono text-[15px] sm:text-[16px] text-white font-medium">{profile.email}</span>
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                aria-label="Copy email address"
                className="inline-flex items-center gap-2 min-h-[40px] px-4 bg-transparent text-[#FDDD00] border border-[#FDDD00] hover:bg-[#FDDD00]/10 rounded-md font-mono font-bold text-[13px] cursor-pointer transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="9" y="9" width="12" height="12" rx="2"></rect>
                  <path d="M5 15V5a2 2 0 0 1 2-2h10"></path>
                </svg>
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            {/* GitHub */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-5 sm:p-6 border-b border-[#1E3A47]">
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[12px] tracking-wider text-[#8DB1BE]">GITHUB</span>
                <span className="font-mono text-[15px] sm:text-[16px] text-white">github.com/{profile.handle}</span>
              </div>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00ADD8] hover:text-[#7FDCF3] font-semibold text-[15px] transition-colors"
              >
                Open ↗
              </a>
            </div>

            {/* LinkedIn */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-5 sm:p-6">
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[12px] tracking-wider text-[#8DB1BE]">LINKEDIN</span>
                <span className="font-mono text-[15px] sm:text-[16px] text-white">linkedin.com/in/{profile.handle}</span>
              </div>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00ADD8] hover:text-[#7FDCF3] font-semibold text-[15px] transition-colors"
              >
                Open ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Sub-footer */}
      <div className="w-full py-6 bg-[#0A171D] text-[#8DB1BE] text-[13px] border-t border-[#1E3A47]/60">
        <div className="max-w-[1440px] mx-auto w-full px-5 sm:px-8 lg:px-16 flex flex-wrap gap-4 items-center justify-between">
          <span>© 2026 {profile.name}</span>
          <span className="font-mono">last updated {profile.lastUpdated}</span>
        </div>
      </div>
    </footer>
  );
};
