import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, 
  FolderOpen, 
  Image as ImageIcon, 
  PlusCircle, 
  Trash2, 
  Check, 
  X, 
  Sparkles, 
  Maximize2,
  ChevronRight
} from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import TechIcon from './TechIcon';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin } from '../context/AdminContext';
import ProjectModal from './ProjectModal';

function ProjectCard({ 
  project, 
  index, 
  onOpenDetails, 
  onDelete, 
  isAdmin 
}) {
  const { language } = useLanguage();
  const isPt = language === 'pt';
  const isCustom = Boolean(project.createdAt || project.id?.startsWith('custom-'));
  const galleryCount = project.galleryImages?.length || 0;

  return (
    <div 
      className={`group relative rounded-2xl border-2 sm:border-3 border-zinc-950 ${
        project.bgCard || 'bg-white'
      } p-4 sm:p-5 shadow-[4px_4px_0px_rgba(24,24,27,1)] hover:shadow-[7px_7px_0px_rgba(24,24,27,1)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden text-left`}
    >

      {/* Botão de Excluir in-place (Modo Admin) */}
      {isAdmin && isCustom && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(project.id);
          }}
          className="absolute top-3.5 right-9 p-1 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 border border-red-300 shadow-sm cursor-pointer z-30 transition-colors"
          title="Excluir projeto"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      )}

      {/* Conteúdo Superior: Categoria, Imagem com Grande Ênfase, Título e Descrição */}
      <div>
        {/* Header do Card: Categoria & Período */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span className="text-[10px] font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-white border border-zinc-300 text-zinc-800 shadow-2xs">
            {project.category}
          </span>
          <span className="text-[11px] font-mono text-zinc-500 font-bold mr-6">
            {project.period}
          </span>
        </div>

        {/* Ênfase na Imagem / Visual Mockup (Tamanho Ajustado ao Padrão) */}
        <div 
          onClick={() => onOpenDetails(project.id)}
          className="relative w-full h-36 sm:h-40 mb-3 rounded-xl border-2 border-zinc-950 overflow-hidden bg-zinc-950 cursor-pointer shadow-[2.5px_2.5px_0px_rgba(24,24,27,1)] group/mockup"
        >
          {project.coverImage ? (
            <>
              <img 
                src={project.coverImage} 
                alt={`${project.title} Preview`}
                className="w-full h-full object-cover object-top group-hover/mockup:scale-105 transition-transform duration-500 filter contrast-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/75 via-transparent to-transparent opacity-80 group-hover/mockup:opacity-95 transition-opacity flex items-end justify-between p-2.5">
                {galleryCount > 0 && (
                  <span className="bg-white/95 text-zinc-950 font-mono text-[9px] font-black px-1.5 py-0.5 rounded border border-zinc-950 shadow-xs flex items-center gap-1">
                    <ImageIcon className="w-2.5 h-2.5 text-purple-600" />
                    {isPt ? `${galleryCount} telas` : `${galleryCount} screens`}
                  </span>
                )}
                <span className="bg-zinc-900/90 text-white font-mono text-[9px] font-bold px-1.5 py-0.5 rounded border border-zinc-700 ml-auto flex items-center gap-1 group-hover/mockup:bg-yellow-400 group-hover/mockup:text-zinc-950 transition-colors">
                  <Maximize2 className="w-2.5 h-2.5" />
                  <span>{isPt ? 'Ver' : 'Inspect'}</span>
                </span>
              </div>
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-950 flex flex-col items-center justify-center p-3 text-center text-white">
              <span className="bg-white text-zinc-950 font-mono text-xs font-bold px-2.5 py-1 rounded-lg border border-zinc-950">
                {project.title}
              </span>
            </div>
          )}
        </div>

        {/* Título, Subtítulo e Descrição Compactados */}
        <h3 className="text-lg sm:text-xl font-black text-zinc-950 tracking-tight leading-tight mb-0.5">
          {project.title}
        </h3>

        <p className="text-xs font-bold text-zinc-800 mb-1 line-clamp-1">
          {project.subtitle}
        </p>

        <p className="text-xs text-zinc-600 leading-relaxed font-medium mb-3 line-clamp-2">
          {project.description}
        </p>

        {/* Tech Stack Pills com Ícones das Tecnologias */}
        <div className="flex flex-wrap gap-1.5 mb-3.5">
          {project.tags?.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono font-bold text-zinc-800 bg-white px-2 py-0.5 rounded-md border border-zinc-300 shadow-2xs flex items-center gap-1.5"
            >
              <TechIcon name={tag} className="w-3 h-3 shrink-0" />
              <span>{tag}</span>
            </span>
          ))}
          {project.tags?.length > 4 && (
            <span className="text-[10px] font-mono text-zinc-500 font-bold self-center px-1">
              +{project.tags.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Ações no Rodapé do Card */}
      <div className="flex items-center gap-2 pt-2.5 border-t border-zinc-950/10 mt-auto">
        <button
          type="button"
          onClick={() => onOpenDetails(project.id)}
          className="flex-1 py-2 px-3 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-black text-xs border-2 border-zinc-950 shadow-[2px_2px_0px_rgba(24,24,27,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <FolderOpen className="w-3.5 h-3.5 text-yellow-300" />
          <span>{isPt ? 'Ver Caso de Estudo' : 'View Case Study'}</span>
          <ArrowUpRight className="w-3 h-3 opacity-70" />
        </button>

        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-xl bg-white hover:bg-zinc-100 text-zinc-900 border-2 border-zinc-950 shadow-[2px_2px_0px_rgba(24,24,27,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all flex items-center justify-center cursor-pointer"
            title={isPt ? 'Ver Repositório' : 'View Repository'}
          >
            <GithubIcon className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const { t, language } = useLanguage();
  const isPt = language === 'pt';
  const { isAdmin, customProjects, addCustomProject, deleteCustomProject } = useAdmin();
  
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [isAddingProject, setIsAddingProject] = useState(false);

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

  return (
    <section 
      id="projetos" 
      className="snap-section min-h-screen py-10 sm:py-14 px-4 sm:px-6 lg:px-8 bg-designer-grid relative z-20 border-t-2 border-zinc-950/10 flex flex-col justify-center items-center"
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col items-center">
        
        {/* Header Centralizado Padronizado (igual Experience e Skills) */}
        <div className="w-full flex flex-col items-center justify-center text-center max-w-3xl mx-auto mb-6 sm:mb-8 relative z-30 px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-zinc-900 bg-white shadow-[2px_2px_0px_rgba(24,24,27,1)] text-[11px] font-black uppercase tracking-widest text-zinc-900 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{t.projects?.badge || (isPt ? 'Estudos de Caso & Repositórios' : 'Case Studies & Repositories')}</span>
          </div>
          
          <h2 className="text-3xl sm:text-3xl lg:text-4xl font-black text-zinc-950 tracking-tight leading-tight mb-3">
            {t.projects?.titleMain || (isPt ? 'Engenharia na' : 'Engineering in')}{' '}
            <span className="bg-[#fef08a] px-2.5 py-0.5 rounded-xl border-2 border-zinc-900 shadow-[2.5px_2.5px_0px_rgba(24,24,27,1)] inline-block -rotate-1.5 hover:rotate-0 transition-transform">
              {t.projects?.titleItalic || (isPt ? 'Prática' : 'Action')}
            </span>
          </h2>
          
          <p className="text-zinc-600 font-medium text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            {t.projects?.subtitle || (isPt 
              ? 'Aplicações reais desenvolvidas de ponta a ponta, com foco em arquitetura robusta, automação e alto impacto.' 
              : 'Production-ready software built end-to-end with high scalability, automation, and real-world impact.')}
          </p>

          {/* Botão de Criação In-Place (Modo Admin) */}
          {isAdmin && (
            <div className="mt-4">
              <button
                onClick={() => setIsAddingProject(!isAddingProject)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-300 hover:bg-emerald-400 text-zinc-950 text-xs font-black border-2 border-zinc-950 shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>
                  {isAddingProject 
                    ? (isPt ? 'Fechar Formulário' : 'Close Form') 
                    : (isPt ? '+ Novo Projeto (ADM)' : '+ Add Project (Admin)')}
                </span>
              </button>
            </div>
          )}
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
        {/* GRID EM COLUNAS LADO A LADO COM DESTAQUE VISUAL NAS IMAGENS             */}
        {/* ======================================================================= */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5.5 relative z-20">
          {allProjects.map((project, idx) => (
            <ProjectCard 
              key={project.id || idx}
              project={project} 
              index={idx} 
              onOpenDetails={(id) => setSelectedProjectId(id)}
              onDelete={(id) => deleteCustomProject(id)}
              isAdmin={isAdmin}
            />
          ))}
        </div>

        {/* --- RODAPÉ DE NAVEGAÇÃO RÁPIDA --- */}
        <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row items-center justify-between gap-3 w-full text-xs font-mono text-zinc-500 px-2 relative z-30">
          <span className="text-center sm:text-left">
            {isPt 
              ? 'Clique em "Ver Caso de estudo" ou na imagem para abrir o case study completo e galeria.' 
              : 'Click "View Case Study" or the image to open the full STAR case and gallery.'}
          </span>
          <a 
            href="#skills" 
            className="font-bold text-zinc-800 hover:text-zinc-950 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>{isPt ? 'Avançar para Habilidades' : 'Next: Skills'}</span>
            <ChevronRight className="w-3.5 h-3.5 rotate-90 sm:rotate-0" />
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