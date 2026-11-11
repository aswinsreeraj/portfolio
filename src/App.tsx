import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { AskAboutMeModal } from './components/AskAboutMeModal';
import { TechProficiencyDrawer } from './components/TechProficiencyDrawer';
import { GopherPet } from './components/GopherPet';
import { LandingPage } from './pages/LandingPage';
import { AboutPage } from './pages/AboutPage';
import { SkillsPage } from './pages/SkillsPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { skillsData, TechSkill } from './data/skills';

// Helper component to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function App() {
  const [askModalOpen, setAskModalOpen] = useState(false);
  const [initialAskQuery, setInitialAskQuery] = useState<string | undefined>(undefined);
  const [selectedSkill, setSelectedSkill] = useState<TechSkill | null>(null);
  const [techDrawerOpen, setTechDrawerOpen] = useState(false);

  const handleOpenAskModal = (query?: string) => {
    setInitialAskQuery(query);
    setAskModalOpen(true);
  };

  const handleSelectTech = (techName: string) => {
    // Case-insensitive lookup in skillsData (exact name, id, aliases, then partial)
    const cleanName = techName.toLowerCase().replace(/[^a-z0-9]/g, '');
    const found =
      skillsData.find((s) => {
        const sName = s.name.toLowerCase().replace(/[^a-z0-9]/g, '');
        const sId = s.id.toLowerCase().replace(/[^a-z0-9]/g, '');
        const aliasMatch = s.aliases?.some(
          (a) => a.toLowerCase().replace(/[^a-z0-9]/g, '') === cleanName
        );
        return sName === cleanName || sId === cleanName || Boolean(aliasMatch);
      }) ||
      skillsData.find(
        (s) =>
          s.name.toLowerCase().includes(techName.toLowerCase()) ||
          s.aliases?.some((a) => a.toLowerCase().includes(techName.toLowerCase()))
      );

    if (found) {
      setSelectedSkill(found);
      setTechDrawerOpen(true);
    } else {
      // Default to Go if not found or create minimal context
      setSelectedSkill(skillsData[0]);
      setTechDrawerOpen(true);
    }
  };

  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen text-[#101820] dark:text-[#E6F4F8] bg-white dark:bg-[#0A171D] transition-colors">
          <Navbar onOpenAskModal={() => handleOpenAskModal()} />

          <div className="flex-1">
            <Routes>
              <Route
                path="/"
                element={
                  <LandingPage
                    onOpenAskModal={handleOpenAskModal}
                    onSelectTech={handleSelectTech}
                  />
                }
              />
              <Route
                path="/about"
                element={<AboutPage onSelectTech={handleSelectTech} />}
              />
              <Route
                path="/skills"
                element={<SkillsPage onSelectTech={handleSelectTech} />}
              />
              <Route
                path="/projects"
                element={<ProjectsPage onSelectTech={handleSelectTech} />}
              />
              <Route
                path="/projects/:id"
                element={<ProjectDetailPage onSelectTech={handleSelectTech} />}
              />
              <Route path="/open-source" element={<Navigate to="/projects" replace />} />
              <Route path="/interests" element={<Navigate to="/about" replace />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>

          {/* Global Ask About Me Modal */}
          <AskAboutMeModal
            isOpen={askModalOpen}
            onClose={() => setAskModalOpen(false)}
            initialQuery={initialAskQuery}
          />

          {/* Global Technology Proficiency Context Drawer */}
          <TechProficiencyDrawer
            skill={selectedSkill}
            isOpen={techDrawerOpen}
            onClose={() => setTechDrawerOpen(false)}
          />

          {/* Interactive Go Gopher Pet Companion */}
          <GopherPet onOpenAskModal={handleOpenAskModal} />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

