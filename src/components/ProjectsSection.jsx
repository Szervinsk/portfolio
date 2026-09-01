import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  FolderOpen,
  Image as ImageIcon,
  PlusCircle,
  Trash2,
  Check,
  X
} from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { useTiltCard } from '../hooks/useParallax';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin } from '../context/AdminContext';
import ProjectModal from './ProjectModal';

function ProjectCard({ project, index, onOpenDetails, onDelete, isAdmin }) {
  const { cardRef, tilt, handleMouseMove, handleMouseLeave } = useTiltCard(3);
  const { language } = useLanguage();
  const isPt = language === 'pt';

  const style = {
    transform: tilt.isHovered
      ? `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(1.01, 1.01, 1.01)`
      : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    transition: 'transform 0.15s ease-out',
  };

  const isReversed = index % 2 === 1;
  const coverImage = project.coverImage;
  const galleryCount = project.galleryImages?.length || 0;
  const isCustom = Boolean(project.createdAt || project.id?.startsWith('custom-'));

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={`p-5 sm:p-6 rounded-[1.8rem] border-2 border-zinc-950 ${project.bgCard || 'bg-white'} shadow-[4px_4px_0px_rgba(24,24,27,1)] relative flex flex-col ${
        isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
      } gap-6 lg:gap-8 items-center group transition-all`}
    >
      {/* Badge index sticker */}
      <div 
        className={`absolute -top-3.5 ${
          isReversed ? '-left-2.5 sm:-left-3.5' : '-right-2.5 sm:-right-3.5'
        } ${project.badgeBg || 'bg-yellow-300'} border-2 border-zinc-950 rounded-full w-10 h-10 flex items-center justify-center font-black text-base shadow-[2.5px_2.5px_0px_rgba(24,24,27,1)] group-hover:rotate-6 transition-transform z-20`}
      >
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Botão de Exclusão in-place em Modo Editor */}
      {isAdmin && isCustom && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(project.id);
          }}
          className="absolute top-4 right-4 p-1.5 rounded-xl bg-red-100 hover:bg-red-200 text-red-700 border border-red-300 shadow-sm cursor-pointer z-30 transition-colors"
          title="Excluir projeto do portfólio"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}

      {/* Informações e Textos do Card */}
      <div className="flex-1 w-full text-left">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white border border-zinc-300 text-zinc-700 shadow-2xs">
            {project.category}
          </span>
          <span className="text-[10px] font-mono text-zinc-500 font-semibold">
            {project.period}
          </span>
          {isCustom && (
            <span className="text-[9px] font-mono bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded border border-emerald-300 font-bold">
              ● publicado via ADM
            </span>
          )}
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-zinc-950 tracking-tight mb-1">
          {project.title}
        </h3>

        <p className="text-xs sm:text-sm font-bold text-zinc-700 mb-2">
          {project.subtitle}
        </p>

        <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-4 font-medium line-clamp-2">
          {project.description}
        </p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags?.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono font-bold text-zinc-800 bg-white/80 px-2 py-0.5 rounded border border-zinc-200 shadow-2xs"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Botões de Ação */}
        <div className="flex flex-wrap items-center gap-2.5">
          
          {/* Botão Principal: Abrir Modal com Detalhes Completos */}
          <button
            type="button"
            onClick={() => onOpenDetails(project.id)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs border-2 border-zinc-900 shadow-[2.5px_2.5px_0px_rgba(24,24,27,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_rgba(24,24,27,1)] transition-all cursor-pointer"
          >
            <FolderOpen className="w-3.5 h-3.5 text-yellow-300" />
            <span>{isPt ? 'Ver Detalhes' : 'View Details'}</span>
            <ArrowUpRight className="w-3 h-3 opacity-70" />
          </button>

          {/* Botão Secundário: GitHub */}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-zinc-50 text-zinc-800 font-bold text-xs border-2 border-zinc-900 shadow-[2.5px_2.5px_0px_rgba(24,24,27,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_rgba(24,24,27,1)] transition-all"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>{isPt ? 'Repositório' : 'Repository'}</span>
            </a>
          )}
        </div>
      </div>

      {/* Visual Mockup Container com Foto Real do Projeto */}
      <div 
        onClick={() => onOpenDetails(project.id)}
        className="w-full lg:w-5/12 h-52 sm:h-56 rounded-2xl border-2 border-zinc-950 shadow-[3px_3px_0px_rgba(24,24,27,1)] overflow-hidden group-hover:-translate-y-0.5 transition-transform relative bg-zinc-900 flex flex-col items-center justify-center cursor-pointer group/mockup"
      >
        {coverImage ? (
          <>
            <img 
              src={coverImage} 
              alt={`${project.title} Preview`}
              className="w-full h-full object-cover object-top filter contrast-105 group-hover/mockup:scale-105 transition-transform duration-500" 
            />
            <div className="absolute inset-0 bg-zinc-950/20 group-hover/mockup:bg-zinc-950/40 transition-colors flex items-end p-3 justify-between">
              {galleryCount > 0 && (
                <span className="bg-white/95 text-zinc-950 font-mono text-[10px] font-black px-2 py-0.5 rounded-lg border border-zinc-950 shadow-[1.5px_1.5px_0px_rgba(24,24,27,1)] flex items-center gap-1">
                  <ImageIcon className="w-3 h-3 text-purple-600" />
                  {isPt ? `${galleryCount} telas` : `${galleryCount} screens`}
                </span>
              )}
              <span className="bg-zinc-900/90 text-white font-mono text-[9px] font-bold px-1.5 py-0.5 rounded border border-zinc-700 ml-auto">
                {isPt ? 'Ver Mural ↗' : 'View Mural ↗'}
              </span>
            </div>
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-950 flex flex-col items-center justify-center p-4 text-center">
            <span className="text-4xl mb-2">⚡📦</span>
            <span className="bg-white text-zinc-950 font-mono text-xs font-bold px-2.5 py-1 rounded-xl border-2 border-zinc-950 shadow-[1.5px_1.5px_0px_rgba(24,24,27,1)]">
              {project.title} • {isPt ? 'Módulos & APIs' : 'Modules & APIs'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const { t } = useLanguage();
  const { isAdmin, customProjects, addCustomProject, deleteCustomProject } = useAdmin();
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  
  // Estado do formulário in-place de criação de projeto
  const [isAddingProject, setIsAddingProject] = useState(false);
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
  const selectedProject = allProjects.find((p) => p?.id === selectedProjectId);

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!projectForm.title) return;

    const tagsArray = projectForm.tags.split(',').map((t) => t.trim()).filter(Boolean);

    addCustomProject({
      title: projectForm.title,
      emoji: '🚀',
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

  return (
    <section id="projetos" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white relative z-20 border-t-2 border-zinc-950/10">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 mb-2.5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-800 bg-zinc-100 px-3 py-1 rounded-full border border-dashed border-zinc-400">
              {t.projects?.badge || 'Curated Work & Engineering'}
            </span>

            {/* Ação rápida para Admin */}
            {isAdmin && (
              <button
                onClick={() => setIsAddingProject(!isAddingProject)}
                className="flex items-center gap-1 px-3 py-1 rounded-full border-2 border-zinc-950 bg-yellow-300 hover:bg-yellow-400 text-zinc-950 text-xs font-bold shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>{isAddingProject ? 'Fechar Formulário' : '+ Adicionar Projeto (ADM)'}</span>
              </button>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-zinc-950 tracking-tight">
            {t.projects?.titleMain || 'Destaques de'}{' '}
            <span className="italic font-serif font-normal bg-yellow-200 px-2 rounded-lg border border-zinc-900">
              {t.projects?.titleItalic || 'Código'}
            </span>
          </h2>

          <p className="mt-2.5 text-zinc-600 text-xs sm:text-sm font-medium">
            {t.projects?.subtitle || 'Projetos reais com foco em automação de ponta a ponta, segurança de dados e arquitetura desacoplada.'}
          </p>
        </div>

        {/* Formulário In-Place de Criação de Projeto (Modo Editor) */}
        {isAdmin && isAddingProject && (
          <div className="mb-10 p-6 bg-[#faf8f5] rounded-3xl border-3 border-zinc-950 shadow-[6px_6px_0px_rgba(0,0,0,1)] animate-pop-in">
            <div className="flex items-center justify-between border-b-2 border-zinc-200 pb-3 mb-5">
              <h3 className="text-base font-black text-zinc-950 flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-emerald-600" />
                <span>Novo Projeto no Portfólio (Editor In-Place)</span>
              </h3>
              <button
                onClick={() => setIsAddingProject(false)}
                className="p-1 rounded-lg border border-zinc-300 hover:bg-zinc-200 text-zinc-600 cursor-pointer"
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
                  rows={2}
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
                    placeholder="Ex: /assets/projects/images/salva1.jpeg"
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
                  <span>Publicar Projeto no Portfólio</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Project Cards Stack */}
        <div className="space-y-8">
          {allProjects.map((proj, idx) => (
            <ProjectCard 
              key={proj.id} 
              project={proj} 
              index={idx} 
              onOpenDetails={(id) => setSelectedProjectId(id)}
              onDelete={(id) => deleteCustomProject(id)}
              isAdmin={isAdmin}
            />
          ))}
        </div>

      </div>

      {/* Modal de Detalhes do Projeto com Mural de Imagens */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProjectId(null)} 
        />
      )}
    </section>
  );
}