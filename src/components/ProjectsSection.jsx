import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowUpRight, 
  FolderOpen, 
  Image as ImageIcon, 
  PlusCircle, 
  Trash2, 
  Check, 
  X, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Zap, 
  Layers
} from 'lucide-react';
import { GithubIcon, FigmaIcon } from './SocialIcons';
import { useTiltCard } from '../hooks/useParallax';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin } from '../context/AdminContext';
import ProjectModal from './ProjectModal';

function ProjectCarouselCard({ 
  project, 
  index, 
  total, 
  offset, 
  onSelect,
  onOpenDetails, 
  onDelete, 
  isAdmin 
}) {
  const isCenter = offset === 0;
  const { cardRef, tilt, handleMouseMove, handleMouseLeave } = useTiltCard(isCenter ? 3 : 0);
  const { language } = useLanguage();
  const isPt = language === 'pt';

  const isReversed = index % 2 === 1;
  const coverImage = project.coverImage;
  const galleryCount = project.galleryImages?.length || 0;
  const isCustom = Boolean(project.createdAt || project.id?.startsWith('custom-'));

  // Estilos de transição e posicionamento Coverflow 3D / Side-Peek
  let transformStyle = '';
  let opacityStyle = 0;
  let zIndexStyle = 10;
  let pointerEvents = 'none';

  if (isCenter) {
    transformStyle = tilt.isHovered
      ? `translateX(0%) perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(1.008)`
      : 'translateX(0%) scale(1)';
    opacityStyle = 1;
    zIndexStyle = 30;
    pointerEvents = 'auto';
  } else if (offset === -1) {
    transformStyle = 'translateX(-70%) scale(0.90)';
    opacityStyle = 0.4;
    zIndexStyle = 20;
    pointerEvents = 'auto';
  } else if (offset === 1) {
    transformStyle = 'translateX(70%) scale(0.90)';
    opacityStyle = 0.4;
    zIndexStyle = 20;
    pointerEvents = 'auto';
  } else {
    transformStyle = offset < 0 ? 'translateX(-130%) scale(0.8)' : 'translateX(130%) scale(0.8)';
    opacityStyle = 0;
    zIndexStyle = 10;
    pointerEvents = 'none';
  }

  const handleCardClick = (e) => {
    if (!isCenter) {
      e.stopPropagation();
      onSelect(index);
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={isCenter ? handleMouseMove : undefined}
      onMouseLeave={isCenter ? handleMouseLeave : undefined}
      onClick={handleCardClick}
      style={{
        transform: transformStyle,
        opacity: opacityStyle,
        zIndex: zIndexStyle,
        pointerEvents: pointerEvents,
        transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.45s ease-out',
      }}
      className={`absolute w-full max-w-4xl p-6 sm:p-8 lg:p-9 rounded-[2rem] border-2 sm:border-3 border-zinc-950 ${
        project.bgCard || 'bg-white'
      } ${
        isCenter 
          ? 'shadow-[8px_8px_0px_rgba(24,24,27,1)] cursor-default' 
          : 'shadow-[4px_4px_0px_rgba(24,24,27,0.6)] cursor-pointer hover:opacity-75'
      } flex flex-col ${
        isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
      } gap-6 lg:gap-8 items-stretch group select-none`}
    >
      {/* Badge index sticker */}
      <div 
        className={`absolute -top-4 sm:-top-5 ${
          isReversed ? '-left-3 sm:-left-4' : '-right-3 sm:-right-4'
        } ${project.badgeBg || 'bg-yellow-300'} border-2 sm:border-3 border-zinc-950 rounded-full w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center font-black text-sm text-zinc-950 shadow-[3px_3px_0px_rgba(24,24,27,1)] group-hover:rotate-6 transition-transform z-20`}
      >
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Botão de Exclusão in-place em Modo Editor */}
      {isAdmin && isCustom && isCenter && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(project.id);
          }}
          className="absolute top-4 right-4 p-2 rounded-xl bg-red-100 hover:bg-red-200 text-red-700 border border-red-300 shadow-sm cursor-pointer z-30 transition-colors"
          title="Excluir projeto do portfólio"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}

      {/* COLUNA 1: Informações e Metodologia STAR */}
      <div className="flex-1 w-full text-left flex flex-col justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2.5">
            <span className="text-[10px] sm:text-[11px] font-mono font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-white border border-zinc-300 text-zinc-800 shadow-2xs">
              {project.category}
            </span>
            <span className="text-xs font-mono text-zinc-500 font-bold">
              {project.period}
            </span>
            <span className="text-[11px] font-mono text-zinc-400 font-bold ml-auto hidden sm:inline">
              PROJETO {index + 1} DE {total}
            </span>
            {isCustom && (
              <span className="text-[9px] font-mono bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded border border-emerald-300 font-bold">
                ● custom
              </span>
            )}
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight mb-1">
            {project.title}
          </h3>

          <p className="text-xs sm:text-sm font-bold text-zinc-800 mb-2.5 leading-snug">
            {project.subtitle}
          </p>

          <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-3.5 font-medium line-clamp-3">
            {project.description}
          </p>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tags?.map((tag) => (
              <span
                key={tag}
                className="text-[10px] sm:text-[11px] font-mono font-bold text-zinc-800 bg-white px-2.5 py-0.5 rounded-md border border-zinc-300 shadow-2xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Botões de Ação (Apenas interativos se for o card do meio) */}
        <div className="flex flex-wrap items-center gap-2.5 pt-2.5 border-t border-zinc-950/10">
          <button
            type="button"
            disabled={!isCenter}
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails(project.id);
            }}
            className="flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-black text-xs sm:text-sm border-2 border-zinc-950 shadow-[3px_3px_0px_rgba(24,24,27,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_rgba(24,24,27,1)] transition-all cursor-pointer disabled:cursor-pointer"
          >
            <FolderOpen className="w-4 h-4 text-yellow-300" />
            <span>{isPt ? 'Ver Detalhes no Modal (STAR)' : 'Open STAR Modal'}</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
          </button>

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-white hover:bg-zinc-50 text-zinc-900 font-bold text-xs sm:text-sm border-2 border-zinc-950 shadow-[3px_3px_0px_rgba(24,24,27,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_rgba(24,24,27,1)] transition-all"
            >
              <GithubIcon className="w-4 h-4" />
              <span>{isPt ? 'Repositório' : 'Repository'}</span>
            </a>
          )}
        </div>
      </div>

      {/* COLUNA 2: Visual Mockup Container com Foto Real do Projeto */}
      <div 
        onClick={(e) => {
          if (isCenter) {
            e.stopPropagation();
            onOpenDetails(project.id);
          }
        }}
        className="w-full lg:w-5/12 h-60 sm:h-72 lg:h-auto min-h-[240px] rounded-2xl border-2 sm:border-2.5 border-zinc-950 shadow-[4px_4px_0px_rgba(24,24,27,1)] overflow-hidden transition-transform relative bg-zinc-950 flex flex-col items-center justify-center cursor-pointer group/mockup"
      >
        {coverImage ? (
          <>
            <img 
              src={coverImage} 
              alt={`${project.title} Preview`}
              className="w-full h-full object-cover object-top filter contrast-105 group-hover/mockup:scale-105 transition-transform duration-500" 
            />
            <div className="absolute inset-0 bg-zinc-950/20 group-hover/mockup:bg-zinc-950/40 transition-colors flex items-end p-3.5 justify-between">
              {galleryCount > 0 && (
                <span className="bg-white/95 text-zinc-950 font-mono text-[11px] font-black px-2.5 py-1 rounded-lg border border-zinc-950 shadow-[1.5px_1.5px_0px_rgba(24,24,27,1)] flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-purple-600" />
                  {isPt ? `${galleryCount} telas no dossiê` : `${galleryCount} screens`}
                </span>
              )}
              <span className="bg-zinc-900/90 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-zinc-700 ml-auto flex items-center gap-1">
                <Maximize2 className="w-3 h-3" />
                <span>{isPt ? 'Expandir' : 'Expand'}</span>
              </span>
            </div>
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-950 flex flex-col items-center justify-center p-6 text-center text-white">
            <span className="bg-white text-zinc-950 font-mono text-xs font-bold px-3 py-1.5 rounded-xl border-2 border-zinc-950 shadow-[2px_2px_0px_rgba(24,24,27,1)]">
              {project.title} • {isPt ? 'Módulos & APIs' : 'Modules & APIs'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const { t, language } = useLanguage();
  const isPt = language === 'pt';
  const { isAdmin, customProjects, addCustomProject, deleteCustomProject } = useAdmin();
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [isAddingProject, setIsAddingProject] = useState(false);

  const touchStartXRef = useRef(null);

  // Trava scroll ao abrir modal de adicionar projeto
  useEffect(() => {
    if (!isAddingProject) return;
    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = prevBody || '';
      document.documentElement.style.overflow = prevHtml || '';
    };
  }, [isAddingProject]);

  const [projectForm, setProjectForm] = useState({
    title: '',
    category: 'Automação & IA',
    period: '2026',
    subtitle: '',
    description: '',
    tags: 'React, Python, FastAPI, Docker',
    coverImage: '',
    github: '',
    figma: '',
    challenge: '',
    solution: '',
    result: ''
  });

  const baseProjects = t.projects?.list || [];
  const allProjects = [...(customProjects || []), ...baseProjects];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : allProjects.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < allProjects.length - 1 ? prev + 1 : 0));
  };

  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext(); 
      } else {
        handlePrev(); 
      }
    }
    touchStartXRef.current = null;
  };

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!projectForm.title) return;

    const tagsArray = projectForm.tags.split(',').map((t) => t.trim()).filter(Boolean);

    addCustomProject({
      title: projectForm.title,
      category: projectForm.category || 'Full Stack',
      period: projectForm.period || '2026',
      subtitle: projectForm.subtitle || projectForm.description,
      description: projectForm.description,
      impact: projectForm.result || 'Melhoria de arquitetura e entrega contínua.',
      tags: tagsArray,
      bgCard: 'bg-[#f0fdf4]',
      badgeBg: 'bg-[#86efac]',
      coverImage: projectForm.coverImage || null,
      galleryImages: projectForm.coverImage ? [{ url: projectForm.coverImage, caption: projectForm.title }] : [],
      github: projectForm.github || '',
      figma: projectForm.figma || '',
      collaborators: 'Matheus Szervinsk',
      techStack: {
        frontend: tagsArray.slice(0, 3),
        backend: tagsArray.slice(3, 6),
        infraAi: tagsArray.slice(6)
      },
      star: {
        challenge: {
          title: 'O Desafio (Situation & Task)',
          text: projectForm.challenge || projectForm.description
        },
        solution: {
          title: 'A Solução (Action & Architecture)',
          text: projectForm.solution || projectForm.description,
          highlights: []
        },
        impact: {
          title: 'O Impacto (Result & Metrics)',
          text: projectForm.result || 'Entrega com alta confiabilidade e conformidade.'
        }
      }
    });

    setProjectForm({
      title: '',
      category: 'Automação & IA',
      period: '2026',
      subtitle: '',
      description: '',
      tags: 'React, Python, FastAPI, Docker',
      coverImage: '',
      github: '',
      figma: '',
      challenge: '',
      solution: '',
      result: ''
    });
    setIsAddingProject(false);
    setActiveIndex(0);
  };

  return (
    <section 
      id="projetos" 
      className="snap-section min-h-screen py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-designer-grid relative z-20 border-t-2 border-zinc-950/10 flex flex-col justify-center items-center overflow-hidden"
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col items-center">
        
        {/* Section Header */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 sm:mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-zinc-900 bg-yellow-300 shadow-[2px_2px_0px_rgba(24,24,27,1)] text-[11px] font-mono font-black text-zinc-950 self-start sm:self-auto">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.projects?.badge || 'CURATED WORK & CASES'}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-zinc-950 tracking-tight">
              {t.projects?.titleMain || 'Engenharia na'}{' '}
              <span className="italic font-serif font-normal bg-yellow-200 px-2.5 py-0.5 rounded-lg border border-zinc-900 shadow-2xs">
                {t.projects?.titleItalic || 'Prática'}
              </span>
            </h2>
          </div>

          {/* Controles do Carrossel e Botão ADM */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border-2 border-zinc-950 shadow-[2px_2px_0px_rgba(0,0,0,1)] text-xs font-mono font-bold text-zinc-800">
              <Layers className="w-3.5 h-3.5 text-amber-700" />
              <span>
                {activeIndex + 1} / {allProjects.length}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                aria-label="Projeto anterior"
                className="p-2.5 rounded-xl border-2 border-zinc-950 bg-white hover:bg-yellow-300 text-zinc-950 shadow-[2.5px_2.5px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer"
                title={isPt ? "Projeto anterior" : "Previous project"}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Próximo projeto"
                className="p-2.5 rounded-xl border-2 border-zinc-950 bg-white hover:bg-yellow-300 text-zinc-950 shadow-[2.5px_2.5px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer"
                title={isPt ? "Próximo projeto" : "Next project"}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {isAdmin && (
              <button
                onClick={() => setIsAddingProject(!isAddingProject)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-300 hover:bg-emerald-400 text-zinc-950 text-xs font-black border-2 border-zinc-950 shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">+ Novo Projeto</span>
              </button>
            )}
          </div>
        </div>

        {/* Formulário In-Place de Criação de Projeto (Modo Editor) */}
        {isAdmin && isAddingProject && (
          <div className="w-full mb-10 p-6 sm:p-8 bg-[#faf8f5] rounded-3xl border-3 border-zinc-950 shadow-[8px_8px_0px_rgba(0,0,0,1)] animate-pop-in text-left relative z-40">
            <div className="flex items-center justify-between border-b-2 border-zinc-200 pb-3 mb-5">
              <h3 className="text-base font-black text-zinc-950 flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-emerald-600" />
                <span>Novo Projeto no Portfólio (Editor In-Place)</span>
              </h3>
              <button
                onClick={() => setIsAddingProject(false)}
                className="p-1.5 rounded-xl border border-zinc-300 hover:bg-zinc-200 text-zinc-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-mono font-bold text-zinc-700 uppercase mb-1">
                    Título do Projeto *
                  </label>
                  <input
                    type="text"
                    required
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    placeholder="Ex: AutoPipeline OCR"
                    className="w-full px-3 py-2 rounded-xl border-2 border-zinc-950 text-xs font-medium focus:ring-2 focus:ring-yellow-400 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-bold text-zinc-700 uppercase mb-1">
                    Categoria
                  </label>
                  <input
                    type="text"
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                    placeholder="Ex: Automação & IA"
                    className="w-full px-3 py-2 rounded-xl border-2 border-zinc-950 text-xs font-medium bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono font-bold text-zinc-700 uppercase mb-1">
                    Subtítulo / Tagline
                  </label>
                  <input
                    type="text"
                    value={projectForm.subtitle}
                    onChange={(e) => setProjectForm({ ...projectForm, subtitle: e.target.value })}
                    placeholder="Resumo em uma frase..."
                    className="w-full px-3 py-2 rounded-xl border-2 border-zinc-950 text-xs font-medium bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-bold text-zinc-700 uppercase mb-1">
                    Tags (separadas por vírgula)
                  </label>
                  <input
                    type="text"
                    value={projectForm.tags}
                    onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })}
                    placeholder="Python, FastAPI, Docker, PostgreSQL"
                    className="w-full px-3 py-2 rounded-xl border-2 border-zinc-950 text-xs font-medium bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold text-zinc-700 uppercase mb-1">
                  Descrição Completa
                </label>
                <textarea
                  rows={3}
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  placeholder="Explicação do propósito, desafios e arquitetura..."
                  className="w-full px-3 py-2 rounded-xl border-2 border-zinc-950 text-xs font-medium bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono font-bold text-zinc-700 uppercase mb-1">
                    URL da Imagem de Capa (opcional)
                  </label>
                  <input
                    type="text"
                    value={projectForm.coverImage}
                    onChange={(e) => setProjectForm({ ...projectForm, coverImage: e.target.value })}
                    placeholder="Ex: /assets/images/salva1.jpeg"
                    className="w-full px-3 py-2 rounded-xl border-2 border-zinc-950 text-xs font-medium bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-bold text-zinc-700 uppercase mb-1">
                    Link do GitHub
                  </label>
                  <input
                    type="url"
                    value={projectForm.github}
                    onChange={(e) => setProjectForm({ ...projectForm, github: e.target.value })}
                    placeholder="https://github.com/szervinsk/..."
                    className="w-full px-3 py-2 rounded-xl border-2 border-zinc-950 text-xs font-medium bg-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-zinc-200">
                <button
                  type="button"
                  onClick={() => setIsAddingProject(false)}
                  className="px-4 py-2 rounded-xl border border-zinc-300 text-zinc-700 text-xs font-bold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl border-2 border-zinc-950 bg-emerald-300 hover:bg-emerald-400 text-zinc-950 text-xs font-black shadow-[3px_3px_0px_rgba(0,0,0,1)] cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Publicar Projeto</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ======================================================================= */}
        {/* PALCO COVERFLOW: PROJETO DO MEIO EM DESTAQUE + LATERAIS VISÍVEIS         */}
        {/* ======================================================================= */}
        <div 
          className="w-full relative flex items-center justify-center min-h-[580px] sm:min-h-[500px] lg:min-h-[460px] my-2"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Seta Lateral Esquerda */}
          <button
            onClick={handlePrev}
            aria-label="Projeto anterior"
            className="absolute -left-2 sm:left-2 lg:left-4 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-white border-2 sm:border-3 border-zinc-950 shadow-[4px_4px_0px_rgba(24,24,27,1)] hover:bg-yellow-300 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_rgba(24,24,27,1)] transition-all cursor-pointer flex items-center justify-center text-zinc-950 shrink-0"
            title={isPt ? "Projeto anterior" : "Previous project"}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Cards Renderizados em Coverflow */}
          <div className="relative w-full max-w-4xl h-[560px] sm:h-[480px] lg:h-[440px] flex items-center justify-center">
            {allProjects.map((project, idx) => {
              // Calcular offset circular
              let offset = idx - activeIndex;
              if (offset > allProjects.length / 2) offset -= allProjects.length;
              if (offset < -allProjects.length / 2) offset += allProjects.length;

              return (
                <ProjectCarouselCard 
                  key={project.id || idx}
                  project={project} 
                  index={idx} 
                  total={allProjects.length}
                  offset={offset}
                  onSelect={(newIdx) => setActiveIndex(newIdx)}
                  onOpenDetails={(id) => setSelectedProjectId(id)}
                  onDelete={(id) => deleteCustomProject(id)}
                  isAdmin={isAdmin}
                />
              );
            })}
          </div>

          {/* Seta Lateral Direita */}
          <button
            onClick={handleNext}
            aria-label="Próximo projeto"
            className="absolute -right-2 sm:right-2 lg:right-4 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-white border-2 sm:border-3 border-zinc-950 shadow-[4px_4px_0px_rgba(24,24,27,1)] hover:bg-yellow-300 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_rgba(24,24,27,1)] transition-all cursor-pointer flex items-center justify-center text-zinc-950 shrink-0"
            title={isPt ? "Próximo projeto" : "Next project"}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* ======================================================================= */}
        {/* BARRA INFERIOR DE NAVEGAÇÃO & PILLS DO CARROSSEL                       */}
        {/* ======================================================================= */}
        <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-2 w-full relative z-30">
          {allProjects.map((proj, idx) => (
            <button
              key={proj.id || idx}
              onClick={() => setActiveIndex(idx)}
              className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-mono font-bold border-2 border-zinc-950 transition-all cursor-pointer flex items-center gap-1.5 ${
                activeIndex === idx
                  ? 'bg-yellow-300 text-zinc-950 shadow-[3px_3px_0px_rgba(24,24,27,1)] -translate-y-0.5 scale-105'
                  : 'bg-white hover:bg-zinc-100 text-zinc-700 shadow-xs opacity-70 hover:opacity-100'
              }`}
            >
              <span className="font-black">{String(idx + 1).padStart(2, '0')}.</span>
              <span className="truncate max-w-[100px] sm:max-w-[150px]">{proj.title}</span>
            </button>
          ))}
        </div>

        {/* --- RODAPÉ DE NAVEGAÇÃO RÁPIDA --- */}
        <div className="mt-8 flex items-center justify-between w-full text-xs font-mono text-zinc-500 px-2 relative z-30">
          <span>
            {isPt 
              ? 'Use as setas laterais, clique nos cards adjacentes ou arraste para navegar' 
              : 'Use the side arrows, click adjacent cards or swipe to navigate'}
          </span>
          <a 
            href="#trajetoria" 
            className="font-bold text-zinc-800 hover:text-zinc-950 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>{isPt ? 'Avançar para Trajetória' : 'Next: Experience'}</span>
            <span>↓</span>
          </a>
        </div>

      </div>

      {/* Modal de Detalhes do Projeto com Mural de Imagens e Metodologia STAR */}
      {selectedProjectId && (
        <ProjectModal 
          project={allProjects.find((p) => p?.id === selectedProjectId)} 
          onClose={() => setSelectedProjectId(null)} 
        />
      )}
    </section>
  );
}