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
import ProjectPage from './components/ProjectPage';
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
  const [preloaderDone, setPreloaderDone] = useState(() => Boolean(initialProjectId));
  const [showContent, setShowContent] = useState(() => Boolean(initialProjectId));
  const [activeProjectId, setActiveProjectId] = useState(initialProjectId);

  const { scrollProgress } = useScrollProgress();
  const { currentSection } = useSectionNavigation(preloaderDone && !activeProjectId);
  const { isAdmin, customProjects, projectOverrides } = useAdmin();
  const { t } = useLanguage();

  // Monitora alterações na URL (#/projeto/:id ou #projetos)
  useEffect(() => {
    const handleHashChange = () => {
      const pid = getProjectIdFromHash();
      setActiveProjectId(pid);
      if (pid) {
        window.scrollTo({ top: 0, behavior: 'instant' });
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

  // Navega para a página dedicada do projeto
  const handleOpenProject = useCallback((projectId) => {
    setActiveProjectId(projectId);
    window.location.hash = `/projeto/${projectId}`;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Retorna para o portfólio principal
  const handleBackToHome = useCallback(() => {
    setActiveProjectId(null);
    window.location.hash = '#projetos';
    setTimeout(() => {
      const el = document.getElementById('projetos');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  }, []);

  // Lista unificada de projetos com overrides do admin aplicados
  const baseProjects = t.projects?.list || [];
  const allProjects = [...(customProjects || []), ...baseProjects].map((p) => ({
    ...p,
    ...((projectOverrides && p?.id && projectOverrides[p.id]) || {})
  }));

  const activeProject = activeProjectId 
    ? allProjects.find((p) => p.id === activeProjectId) 
    : null;

  return (
    <>
      {/* O Preloader só executa se o usuário entrar na home e ainda não tiver concluído */}
      {!preloaderDone && !activeProjectId && (
        <Preloader 
          onZoomStart={handleZoomStart}
          onComplete={handlePreloaderComplete} 
        />
      )}

      {/* RENDERIZAÇÃO CONDICIONAL: PÁGINA DEDICADA DE PROJETO VS HOME PAGE */}
      {activeProjectId && activeProject ? (
        <ProjectPage 
          project={activeProject} 
          allProjects={allProjects}
          onBack={handleBackToHome}
          onNavigateProject={handleOpenProject}
        />
      ) : (
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
          <HeroSection />
          <AboutMeSection />
          <ExperienceSection />
          <ProjectsSection onOpenProject={handleOpenProject} />
          <SkillsSection />
          <LetterSection />

          <ContactSection />

          {/* Seção Exclusiva de Vagas & Prompts de IA (Visível apenas em Modo ADM) */}
          {isAdmin && <AdminCareerHubSection />}

        </div>
      )}

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