import React, { useState, useMemo } from 'react';
import { 
  ArrowUpRight, 
  ArrowRight,
  Sparkles, 
  Workflow, 
  Code2, 
  Layers, 
  PlusCircle, 
  Trash2, 
  Check, 
  X, 
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import TechIcon from './TechIcon';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin } from '../context/AdminContext';

export default function ProjectsSection({ onOpenProject }) {
  const { t, language } = useLanguage();
  const isPt = language === 'pt';
  const { isAdmin, customProjects, addCustomProject, deleteCustomProject } = useAdmin();

  const [activeCategory, setActiveCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const [isAddingProject, setIsAddingProject] = useState(false);

  // Lista unificada de projetos
  const baseProjects = t.projects?.list || [];
  const allProjects = useMemo(() => {
    return [...(customProjects || []), ...baseProjects];
  }, [customProjects, baseProjects]);

  // Categorias disponíveis
  const categories = useMemo(() => {
    const cats = [{ id: 'all', label: isPt ? 'Todos' : 'All', count: allProjects.length }];
    const set = new Set();
    allProjects.forEach((p) => {
      if (p.category && !set.has(p.category)) {
        set.add(p.category);
        const count = allProjects.filter((item) => item.category === p.category).length;
        cats.push({ id: p.category, label: p.category, count });
      }
    });
    return cats;
  }, [allProjects, isPt]);

  // Filtragem de projetos
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return allProjects;
    return allProjects.filter((p) => p.category === activeCategory);
  }, [allProjects, activeCategory]);

  // Exibição de 3 projetos simultâneos
  const itemsPerPage = 3;
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage) || 1;
  const safePage = Math.min(currentPage, totalPages - 1);
  const currentProjects = filteredProjects.slice(safePage * itemsPerPage, (safePage + 1) * itemsPerPage);

  const visibleProjects = useMemo(() => {
    if (currentProjects.length >= 3 || filteredProjects.length <= 3) {
      return currentProjects;
    }
    const needed = 3 - currentProjects.length;
    return [...currentProjects, ...filteredProjects.slice(0, needed)];
  }, [currentProjects, filteredProjects]);

  const selectedIndex = Math.min(hoveredIndex, visibleProjects.length - 1);
  const activeProject = visibleProjects[selectedIndex] || visibleProjects[0] || allProjects[0];

  // Form de criação para o administrador
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
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
    setHoveredIndex(0);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
    setHoveredIndex(0);
  };

  return (
    <section 
      id="projetos" 
      className="snap-section w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-[#f0f7ff] bg-dot-pattern text-zinc-950 relative z-20 border-t-2 border-zinc-950/10"
    >
      <div className="max-w-7xl mx-auto w-full">
        
        {/* ===================================================================== */}
        {/* 1. HEADER COM A IDENTIDADE VISUAL EDITORIAL / NEO-BRUTALISTA          */}
        {/* ===================================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 text-left">
          <div className="max-w-xl">
            {/* Badge de Topo com sombra dura */}
            <div className="motion-entry delay-0 inline-flex items-center gap-2 px-3.5 py-1 rounded-full border-2 border-zinc-900 bg-white shadow-[2px_2px_0px_rgba(24,24,27,1)] text-[11px] font-mono font-bold text-zinc-900 mb-3 animate-pop-in">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{t.projects?.badge || (isPt ? 'Estudos de Caso & Repositórios' : 'Case Studies & Repositories')}</span>
            </div>

            {/* Título com Destaque Editorial Rotacionado (Identidade do Portfólio) */}
            <h2 className="motion-entry delay-75 text-3xl sm:text-4xl md:text-5xl font-black text-zinc-950 tracking-tight leading-[1.08]">
              {t.projects?.titleMain || (isPt ? 'Engenharia na' : 'Engineering in')}{' '}
              <span className="font-serif italic font-normal bg-[#fef08a] px-3 py-0.5 rounded-lg border-2 border-zinc-900 shadow-[2.5px_2.5px_0px_rgba(24,24,27,1)] inline-block -rotate-1.5 hover:rotate-0 transition-transform text-zinc-950">
                {t.projects?.titleItalic || (isPt ? 'Prática' : 'Action')}
              </span>
            </h2>
          </div>

          <div className="motion-entry delay-150 max-w-md text-zinc-600 text-xs sm:text-sm leading-relaxed font-medium">
            <p>
              {t.projects?.subtitle || (isPt 
                ? 'Aplicações reais desenvolvidas de ponta a ponta, com foco em arquitetura robusta, automação e alto impacto.' 
                : 'Production-ready software built end-to-end with high scalability, automation, and real-world impact.')}
            </p>

            {/* Botão de Criação In-Place (Modo Admin) */}
            {isAdmin && (
              <div className="mt-3">
                <button
                  onClick={() => setIsAddingProject(!isAddingProject)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-zinc-950 bg-emerald-300 hover:bg-emerald-400 text-zinc-950 text-xs font-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>{isAddingProject ? 'Fechar Formulário' : '+ Novo Projeto (ADM)'}</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ===================================================================== */}
        {/* 2. BARRA DE FILTROS & INDICADORES DE CONTAGEM                         */}
        {/* ===================================================================== */}
        <div className="motion-entry delay-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-3 border-b-2 border-zinc-950/10">
          
          {/* Pílulas de Categorias no estilo Neo-Brutalista do Portfólio */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setCurrentPage(0);
                  setHoveredIndex(0);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 border-zinc-900 transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeCategory === cat.id
                    ? 'bg-zinc-900 text-white shadow-[2px_2px_0px_rgba(24,24,27,1)] -translate-y-0.5'
                    : 'bg-white text-zinc-700 hover:bg-zinc-100 shadow-[1px_1px_0px_rgba(24,24,27,1)]'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded ${
                  activeCategory === cat.id ? 'bg-zinc-800 text-yellow-300 font-bold' : 'bg-zinc-100 text-zinc-600'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Contador de Projetos */}
          <div className="text-xs font-mono font-bold text-zinc-600 self-end sm:self-center">
            {String(safePage * itemsPerPage + 1).padStart(2, '0')} — {String(Math.min((safePage + 1) * itemsPerPage, filteredProjects.length)).padStart(2, '0')} / {String(filteredProjects.length).padStart(2, '0')}
          </div>

        </div>

        {/* Sub-barra: Página X de Y + Botão 'Mais projetos para explorar >>' */}
        <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-4 px-1">
          <span className="font-bold text-zinc-700">
            {isPt ? `Página ${safePage + 1} de ${totalPages}` : `Page ${safePage + 1} of ${totalPages}`}
          </span>

          <div className="flex items-center gap-2.5">
            {totalPages > 1 && (
              <button 
                onClick={handlePrevPage}
                className="p-1 rounded-lg border-2 border-zinc-900 bg-white hover:bg-zinc-100 text-zinc-900 shadow-2xs transition-colors cursor-pointer"
                title="Página anterior"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              onClick={handleNextPage}
              className="flex items-center gap-1 text-zinc-800 hover:text-zinc-950 font-bold transition-colors cursor-pointer"
            >
              <span>{isPt ? 'Mais projetos para explorar' : 'More projects to explore'}</span>
              <span>&gt;&gt;</span>
            </button>

            {/* Tracinhos indicadores de página */}
            <div className="hidden sm:flex items-center gap-1 ml-1">
              {Array.from({ length: totalPages }).map((_, i) => (
                <div 
                  key={i} 
                  onClick={() => setCurrentPage(i)}
                  className={`h-1 rounded-full cursor-pointer transition-all ${
                    i === safePage ? 'w-5 bg-zinc-950' : 'w-2 bg-zinc-300 hover:bg-zinc-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Formulário Admin in-place para cadastro de projeto */}
        {isAdmin && isAddingProject && (
          <div className="w-full mb-8 p-6 sm:p-8 rounded-3xl border-3 border-zinc-950 bg-white shadow-[6px_6px_0px_rgba(0,0,0,1)] text-left animate-pop-in">
            <div className="flex items-center justify-between border-b-2 border-zinc-200 pb-3 mb-4">
              <h3 className="text-sm font-black text-zinc-950 flex items-center gap-2">
                <PlusCircle className="w-4 h-4 text-emerald-600" />
                <span>Novo Projeto no Portfólio (Editor In-Place)</span>
              </h3>
              <button
                onClick={() => setIsAddingProject(false)}
                className="p-1.5 rounded-xl border border-zinc-300 hover:bg-zinc-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-mono font-bold text-zinc-700 uppercase mb-1">Título *</label>
                  <input
                    type="text"
                    required
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    placeholder="Ex: SalvaDocs"
                    className="w-full px-3 py-1.5 rounded-xl border-2 border-zinc-950 text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-bold text-zinc-700 uppercase mb-1">Categoria</label>
                  <input
                    type="text"
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                    placeholder="Ex: Automação & IA"
                    className="w-full px-3 py-1.5 rounded-xl border-2 border-zinc-950 text-xs font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold text-zinc-700 uppercase mb-1">Descrição</label>
                <textarea
                  rows={2}
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  placeholder="Resumo do projeto..."
                  className="w-full px-3 py-1.5 rounded-xl border-2 border-zinc-950 text-xs font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono font-bold text-zinc-700 uppercase mb-1">Tags (vírgula)</label>
                  <input
                    type="text"
                    value={projectForm.tags}
                    onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })}
                    placeholder="React, Python, FastAPI, Docker"
                    className="w-full px-3 py-1.5 rounded-xl border-2 border-zinc-950 text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-bold text-zinc-700 uppercase mb-1">URL Imagem Capa</label>
                  <input
                    type="text"
                    value={projectForm.coverImage}
                    onChange={(e) => setProjectForm({ ...projectForm, coverImage: e.target.value })}
                    placeholder="/assets/images/salva1.jpeg"
                    className="w-full px-3 py-1.5 rounded-xl border-2 border-zinc-950 text-xs font-medium"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-zinc-200">
                <button
                  type="button"
                  onClick={() => setIsAddingProject(false)}
                  className="px-3.5 py-1.5 rounded-xl border border-zinc-300 text-xs font-bold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl border-2 border-zinc-950 bg-emerald-300 hover:bg-emerald-400 text-zinc-950 text-xs font-black shadow-[2px_2px_0px_rgba(0,0,0,1)] cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Publicar</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ===================================================================== */}
        {/* 3. OS 3 CARDS LADO A LADO — SOMENTE A IMAGEM DO PROJETO               */}
        {/* ===================================================================== */}
        <div className="motion-entry delay-250 flex flex-col md:flex-row gap-4 sm:gap-5 w-full items-stretch mb-8">
          {visibleProjects.map((project, idx) => {
            const isHovered = hoveredIndex === idx;
            const isCustom = Boolean(project.createdAt || project.id?.startsWith('custom-'));

            return (
              <div
                key={project.id || idx}
                onMouseEnter={() => setHoveredIndex(idx)}
                onClick={() => {
                  setHoveredIndex(idx);
                  onOpenProject(project.id);
                }}
                className={`group relative rounded-xl border-2 border-zinc-950 overflow-hidden cursor-pointer transition-all duration-300 ease-out bg-zinc-950 ${
                  isHovered 
                    ? 'md:flex-[1.5] shadow-[6px_6px_0px_rgba(24,24,27,1)] -translate-y-1' 
                    : 'md:flex-1 shadow-[3px_3px_0px_rgba(24,24,27,1)] hover:shadow-[5px_5px_0px_rgba(24,24,27,1)] hover:-translate-y-0.5 opacity-90 hover:opacity-100'
                }`}
              >
                {/* Botão de Excluir Projeto Customizado (Modo Admin) */}
                {isAdmin && isCustom && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteCustomProject(project.id);
                    }}
                    className="absolute top-3 right-3 p-1 rounded bg-red-100 hover:bg-red-200 text-red-700 border border-red-300 cursor-pointer z-30 shadow-xs"
                    title="Excluir projeto"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}

                {/* Número do Projeto Discreto no Canto */}
                <div className="absolute top-3 left-3 z-20 pointer-events-none">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-black bg-white/95 border border-zinc-950 text-zinc-950 shadow-xs">
                    #{String(safePage * itemsPerPage + idx + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Apenas a Imagem Principal do Projeto */}
                <div className="w-full h-56 sm:h-64 md:h-72 overflow-hidden bg-zinc-950 relative flex items-center justify-center">
                  {project.coverImage ? (
                    <img 
                      src={project.coverImage} 
                      alt={project.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 filter contrast-[1.02]"
                    />
                  ) : (
                    <div className="p-4 text-center">
                      <span className="font-mono text-xs font-bold text-white">
                        {project.title}
                      </span>
                    </div>
                  )}

                  {/* Overlay sutil no hover que dá profundidade e convite ao clique */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3.5 pointer-events-none">
                    <span className="text-[11px] font-mono font-bold text-white bg-zinc-900/80 px-2 py-0.5 rounded border border-zinc-700">
                      {project.title}
                    </span>
                    <span className="text-[11px] font-mono font-black text-zinc-950 bg-[#fef08a] px-2 py-0.5 rounded border border-zinc-950 flex items-center gap-1 shadow-2xs">
                      <span>{isPt ? 'Inspecionar' : 'Inspect'}</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* ===================================================================== */}
        {/* 4. PAINEL INFERIOR DE DETALHES DO PROJETO SELECIONADO                 */}
        {/* ===================================================================== */}
        {activeProject && (
          <div className="pt-6 border-t-2 border-zinc-950/15 text-left animate-pop-in">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              
              {/* Esquerda: Nome do Projeto + Badge + Descrição + Tags com TechIcon */}
              <div className="max-w-3xl">
                
                <div className="flex flex-wrap items-center gap-2.5 mb-2">
                  <h3 className="text-xl sm:text-2xl font-black text-zinc-950 tracking-tight">
                    {activeProject.title}
                  </h3>
                  
                  {activeProject.category && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-zinc-900 bg-[#fef08a] px-2.5 py-0.5 rounded-md border border-zinc-900 shadow-2xs">
                      <Sparkles className="w-3 h-3 text-purple-700" />
                      <span>{activeProject.category}</span>
                    </span>
                  )}

                  {activeProject.impact && (
                    <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300 hidden sm:inline">
                      {activeProject.impact}
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-zinc-700 font-medium leading-relaxed mb-3.5">
                  {activeProject.description || activeProject.subtitle}
                </p>

                {/* Tags com os ícones técnicos do portfólio (TechIcon) */}
                <div className="flex flex-wrap items-center gap-1.5">
                  {activeProject.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono font-bold text-zinc-800 bg-white px-2 py-0.5 rounded border border-zinc-300 shadow-2xs flex items-center gap-1.5"
                    >
                      <TechIcon name={tag} className="w-3 h-3 shrink-0" />
                      <span>{tag}</span>
                    </span>
                  ))}
                  {activeProject.period && (
                    <span className="text-[11px] font-mono text-zinc-500 px-2 py-0.5 font-bold">
                      {activeProject.period}
                    </span>
                  )}
                </div>

              </div>

              {/* Direita: Ações & 'Quem construiu' */}
              <div className="flex flex-col sm:items-end justify-between gap-3 shrink-0">
                
                <div className="flex items-center gap-2">
                  {activeProject.github && (
                    <a
                      href={activeProject.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-zinc-950 bg-white hover:bg-zinc-100 text-zinc-950 text-xs font-mono font-bold shadow-[1.5px_1.5px_0px_rgba(24,24,27,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>{isPt ? 'Ver código ↗' : 'View code ↗'}</span>
                    </a>
                  )}

                  <button
                    onClick={() => onOpenProject(activeProject.id)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border-2 border-zinc-950 bg-[#fef08a] hover:bg-[#fde047] text-zinc-950 text-xs font-black shadow-[2px_2px_0px_rgba(24,24,27,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer"
                  >
                    <span>{isPt ? 'Estudo de Caso Completo' : 'Full Case Study'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-zinc-600">
                  <span>{isPt ? 'Quem construiu' : 'Built by'}:</span>
                  <span className="font-bold text-zinc-950 bg-white px-2 py-0.5 rounded border border-zinc-300 shadow-2xs">
                    {activeProject.collaborators || 'Matheus Szervinsk'}
                  </span>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}