import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { profile } from '../data/profile';

interface NavbarProps {
  onOpenAskModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAskModal }) => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Projects', path: '/projects' },
    { name: 'About', path: '/about' },
    { name: 'Skills', path: '/skills' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-[#0A171D] border-b border-[#D6E7EE] dark:border-[#1E3A47] transition-colors">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16 py-4 flex items-center justify-between gap-4">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3 text-[#101820] dark:text-white group">
          <span
            aria-hidden="true"
            className="flex items-center justify-center w-9 h-9 rounded-md bg-[#00ADD8] text-white font-mono font-bold text-base shadow-sm transition-transform group-hover:scale-105"
          >
            {'{'}{'}'}
          </span>
          <span className="font-mono font-bold text-base tracking-tight">
            aswinsreeraj<span className="text-[#00708C] dark:text-[#00ADD8]">.online</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-7 text-[15px] font-medium">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `transition-colors ${isActive
                  ? 'text-[#00536A] dark:text-[#00ADD8] font-bold'
                  : 'text-[#101820] dark:text-[#E6F4F8] hover:text-[#00708C] dark:hover:text-[#00ADD8]'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          {/* Resume link matching reference */}
          <a
            href={profile.resumeUrl}
            download="Aswin_Sreeraj.pdf"
            className="text-[#101820] dark:text-[#E6F4F8] hover:text-[#00708C] dark:hover:text-[#00ADD8] transition-colors"
          >
            Resume ↓
          </a>

          {/* Dark Mode Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            className="p-2 rounded-md border border-[#D6E7EE] dark:border-[#1E3A47] text-[#101820] dark:text-[#E6F4F8] hover:bg-[#F3FAFD] dark:hover:bg-[#0E1F27] transition-colors"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4 text-[#3C4C57]" />
            ) : (
              <Sun className="w-4 h-4 text-[#FDDD00]" />
            )}
          </button>

          {/* Ask about me CTA matching reference */}
          <button
            onClick={onOpenAskModal}
            className="inline-flex items-center gap-2 min-h-[44px] box-border px-4 py-2 border border-[#00ADD8] rounded-md text-[#00708C] dark:text-[#00ADD8] hover:bg-[#E1F6FB] dark:hover:bg-[#0E1F27] font-semibold text-[14px] transition-colors"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-5.4A8 8 0 1 1 21 12z"></path>
            </svg>
            <span>Ask about me</span>
          </button>
        </nav>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-md border border-[#D6E7EE] dark:border-[#1E3A47] text-[#101820] dark:text-white"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-[#FDDD00]" />}
          </button>

          <button
            onClick={onOpenAskModal}
            className="px-2.5 py-1.5 rounded-md border border-[#00ADD8] text-[#00708C] dark:text-[#00ADD8] text-xs font-semibold"
          >
            Ask
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#101820] dark:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#D6E7EE] dark:border-[#1E3A47] bg-white dark:bg-[#0A171D] px-5 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#101820] dark:text-white hover:text-[#00ADD8] py-1"
            >
              {link.name}
            </Link>
          ))}
          <a
            href={profile.resumeUrl}
            download="Aswin_Sreeraj.pdf"
            className="block text-sm font-medium text-[#101820] dark:text-white py-1"
          >
            Resume ↓
          </a>
        </div>
      )}
    </header>
  );
};
