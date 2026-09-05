import React, { useState, useCallback } from 'react';
import { useScrollProgress } from './hooks/useParallax';
import { useSectionNavigation } from './hooks/useSectionNavigation';
import { LanguageProvider } from './context/LanguageContext';
import { AdminProvider, useAdmin } from './context/AdminContext';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import AboutMeSection from './components/AboutMeSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ExperienceSection from './components/ExperienceSection';
import LetterSection from './components/LetterSection';
import ContactSection from './components/ContactSection';
import AdminCareerHubSection from './components/admin/AdminCareerHubSection';
import AdminLoginModal from './components/admin/AdminLoginModal';
import EditorToolbar from './components/admin/EditorToolbar';

function PortfolioApp() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const { scrollProgress } = useScrollProgress();
  const { currentSection } = useSectionNavigation(preloaderDone);
  const { isAdmin } = useAdmin();

  // Chamado quando o zoom atinge o ápice
  const handlePreloaderComplete = useCallback(() => {
    setPreloaderDone(true);
  }, []);

  // Chamado no exato instante em que o zoom começa, para revelar o site por baixo
  const handleZoomStart = useCallback(() => {
    setShowContent(true);
  }, []);

  return (
    <>
      {/* O Preloader só sai da árvore após o zoom completar */}
      {!preloaderDone && (
        <Preloader 
          onZoomStart={handleZoomStart}
          onComplete={handlePreloaderComplete} 
        />
      )}

      <div className={`relative min-h-screen bg-[#faf8f5] text-zinc-950 font-sans selection:bg-yellow-300 selection:text-zinc-950 ${!showContent ? 'h-screen overflow-hidden' : ''}`}>
        
        {/* Barra de Progresso do Scroll */}
        <div className="fixed top-0 left-0 right-0 h-1.5 bg-transparent z-50 pointer-events-none">
          <div
            className="h-full bg-gradient-to-r from-yellow-400 via-amber-400 to-purple-600 transition-all duration-75"
            style={{ width: `${(scrollProgress * 100).toFixed(1)}%` }}
          />
        </div>

        {/* Navbar */}
        {preloaderDone && <Navbar activeSection={currentSection} />}

        {/* Seções Públicas */}
        <HeroSection />
        <AboutMeSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <AboutSection />
        <LetterSection />

        {/* Seção Exclusiva de Vagas & Prompts de IA (Visível apenas em Modo ADM) */}

        <ContactSection />

        {/* Modal de Login do ADM (quando não autenticado) */}
        <AdminLoginModal />

        {/* Barra Flutuante de Modo Editor Ativo */}
        {isAdmin && <AdminCareerHubSection />}
        <EditorToolbar />

      </div>
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AdminProvider>
        <PortfolioApp />
      </AdminProvider>
    </LanguageProvider>
  );
}