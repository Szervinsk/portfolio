import React, { useState, useEffect, useCallback } from 'react';
import { useScrollProgress } from './hooks/useParallax';
import { useSectionNavigation } from './hooks/useSectionNavigation';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AdminProvider, useAdmin } from './context/AdminContext';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutMeSection from './components/AboutMeSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ExperienceSection from './components/ExperienceSection';
import LetterSection from './components/LetterSection';
import ContactSection from './components/ContactSection';
import AdminCareerHubSection from './components/admin/AdminCareerHubSection';
import AdminLoginModal from './components/admin/AdminLoginModal';
import EditorToolbar from './components/admin/EditorToolbar';

function getProjectIdFromHash() {
  if (typeof window === 'undefined') return null;
  const hash = window.location.hash;
  const match = hash.match(/^#\/?projeto[-/]([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

function PortfolioApp() {
  const initialProjectId = getProjectIdFromHash();
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(initialProjectId);

  const { scrollProgress } = useScrollProgress();
  const { currentSection } = useSectionNavigation(preloaderDone);
  const { isAdmin } = useAdmin();
  const { t } = useLanguage();

  // Monitora alterações na URL (#/projeto/:id ou #projetos)
  useEffect(() => {
    const handleHashChange = () => {
      const pid = getProjectIdFromHash();
      if (pid) {
        setSelectedProjectId(pid);
        const el = document.getElementById('projetos');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Chamado quando o zoom do preloader atinge o ápice
  const handlePreloaderComplete = useCallback(() => {
    setPreloaderDone(true);
  }, []);

  // Chamado no exato instante em que o zoom começa
  const handleZoomStart = useCallback(() => {
    setShowContent(true);
  }, []);

  // Seleciona o projeto e rola suavemente até a seção de projetos
  const handleSelectProject = useCallback((projectId) => {
    setSelectedProjectId(projectId);
    const el = document.getElementById('projetos');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  return (
    <>
      {/* O Preloader só executa se o usuário entrar na home e ainda não tiver concluído */}
      {!preloaderDone && (
        <Preloader 
          onZoomStart={handleZoomStart}
          onComplete={handlePreloaderComplete} 
        />
      )}

      {/* PORTFÓLIO SINGLE-PAGE INTEGRADO */}
      <div className={`relative min-h-screen bg-[#faf8f5] text-zinc-950 font-sans selection:bg-yellow-300 selection:text-zinc-950 ${!showContent ? 'h-screen overflow-hidden' : ''}`}>
        
        {/* Barra de Progresso do Scroll */}
        <div className="fixed top-0 left-0 right-0 h-1.5 bg-transparent z-50 pointer-events-none">
          <div
            className="h-full bg-gradient-to-r from-yellow-400 via-amber-400 to-purple-600 transition-all duration-75"
            style={{ width: `${(scrollProgress * 100).toFixed(1)}%` }}
          />
        </div>

        {/* Navbar da Home */}
        {preloaderDone && <Navbar activeSection={currentSection} />}

        {/* Seções Públicas */}
        <HeroSection onSelectProject={handleSelectProject} />
        <AboutMeSection />
        <ExperienceSection />
        <ProjectsSection 
          selectedProjectId={selectedProjectId} 
          onSelectProject={handleSelectProject} 
        />
        <SkillsSection />
        <LetterSection />

        <ContactSection />

        {/* Seção Exclusiva de Vagas & Prompts de IA (Visível apenas em Modo ADM) */}
        {isAdmin && <AdminCareerHubSection />}

      </div>

      {/* Modal de Login do ADM e Toolbar Global */}
      <AdminLoginModal />
      <EditorToolbar />
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