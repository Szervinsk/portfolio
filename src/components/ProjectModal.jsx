import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ExternalLink, 
  Target, 
  Zap, 
  Trophy, 
  Layers, 
  CheckCircle2, 
  Cpu, 
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Image as ImageIcon,
  Edit3,
  Check,
  Save
} from 'lucide-react';
import { FigmaIcon, GithubIcon } from './SocialIcons';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin } from '../context/AdminContext';

export default function ProjectModal({ project, onClose }) {
  const { language } = useLanguage();
  const { isAdmin, updateProject, projectOverrides } = useAdmin();
  const isPt = language === 'pt';

  // Aplica overrides de edição do admin se existirem
  const currentProject = project
    ? {
        ...project,
        ...((projectOverrides && project?.id && projectOverrides[project.id]) || {})
      }
    : null;

  const images = currentProject?.galleryImages || [];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  const handleStageMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setZoomPos({ x, y });
  };

  // Estados de Edição In-Place (Modo Editor)
  const [editForm, setEditForm] = useState({
    title: currentProject?.title || '',
    subtitle: currentProject?.subtitle || '',
    category: currentProject?.category || '',
    period: currentProject?.period || '',
    description: currentProject?.description || '',
    tags: (currentProject?.tags || []).join(', '),
    coverImage: currentProject?.coverImage || '',
    github: currentProject?.github || '',
    figma: currentProject?.figma || '',
    challenge: currentProject?.star?.challenge?.text || '',
    solution: currentProject?.star?.solution?.text || '',
    impact: currentProject?.star?.impact?.text || currentProject?.impact || ''
  });

  // Atualiza form se o projeto mudar
  useEffect(() => {
    if (!currentProject) return;
    setEditForm({
      title: currentProject?.title || '',
      subtitle: currentProject?.subtitle || '',
      category: currentProject?.category || '',
      period: currentProject?.period || '',
      description: currentProject?.description || '',
      tags: (currentProject?.tags || []).join(', '),
      coverImage: currentProject?.coverImage || '',
      github: currentProject?.github || '',
      figma: currentProject?.figma || '',
      challenge: currentProject?.star?.challenge?.text || '',
      solution: currentProject?.star?.solution?.text || '',
      impact: currentProject?.star?.impact?.text || currentProject?.impact || ''
    });
  }, [currentProject?.id]);

  // Navegação do Mural de Imagens
  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  // Trava scroll do body e escuta teclas
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isLightboxOpen) {
          setIsLightboxOpen(false);
        } else if (isEditing) {
          setIsEditing(false);
        } else {
          onClose();
        }
      } else if (e.key === 'ArrowLeft' && images.length > 1) {
        handlePrevImage();
      } else if (e.key === 'ArrowRight' && images.length > 1) {
        handleNextImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, isLightboxOpen, isEditing, images.length]);

  const handleSaveEdit = (e) => {
    e.preventDefault();
    const tagsArray = editForm.tags.split(',').map((t) => t.trim()).filter(Boolean);

    updateProject(currentProject.id, {
      title: editForm.title,
      subtitle: editForm.subtitle,
      category: editForm.category,
      period: editForm.period,
      description: editForm.description,
      tags: tagsArray,
      coverImage: editForm.coverImage || currentProject.coverImage,
      github: editForm.github,
      figma: editForm.figma,
      star: {
        ...currentProject.star,
        challenge: {
          title: currentProject.star?.challenge?.title || 'O Desafio (Situation & Task)',
          text: editForm.challenge
        },
        solution: {
          title: currentProject.star?.solution?.title || 'A Solução (Action & Architecture)',
          text: editForm.solution,
          highlights: currentProject.star?.solution?.highlights || []
        },
        impact: {
          title: currentProject.star?.impact?.title || 'O Impacto (Result & Metrics)',
          text: editForm.impact
        }
      }
    });

    setIsEditing(false);
  };

  if (!currentProject) return null;

  const currentImage = images[activeImageIndex] || images[0];

  return (
    <>
      <div 
        className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950/85 backdrop-blur-md p-3 sm:p-6 lg:p-8 animate-pop-in"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        
        {/* Container Principal da Modal */}
        <div 
          className="relative w-[96vw] h-[92vh] bg-[#faf8f5] border-2 sm:border-3 border-zinc-950 rounded-2xl sm:rounded-[2rem] shadow-[8px_8px_0px_rgba(0,0,0,1)] sm:shadow-[12px_12px_0px_rgba(0,0,0,1)] flex flex-col overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
        >
          
          {/* --- HEADER FIXO --- */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3.5 sm:px-8 sm:py-4 border-b-2 sm:border-b-3 border-zinc-950 bg-white z-10 shrink-0">
            
            <div className="flex items-center gap-2">
              <button 
                onClick={onClose}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl border-2 border-zinc-950 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-bold text-xs sm:text-sm shadow-[2px_2px_0px_rgba(24,24,27,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{isPt ? 'Voltar' : 'Back'}</span>
              </button>

              {/* Botão de Edição no Modo Editor (Admin) */}
              {isAdmin && (
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border-2 border-zinc-950 text-xs font-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer ${
                    isEditing ? 'bg-yellow-300 text-zinc-950' : 'bg-emerald-200 hover:bg-emerald-300 text-emerald-950'
                  }`}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{isEditing ? 'Visualizar' : 'Editar Projeto (ADM)'}</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              {currentProject.figma && (
                <a 
                  href={currentProject.figma} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 border-zinc-950 bg-[#fef08a] hover:bg-[#fde047] text-zinc-900 font-bold text-xs shadow-[2px_2px_0px_rgba(24,24,27,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
                >
                  <FigmaIcon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">UX Prototype</span>
                </a>
              )}

              {currentProject.github && (
                <a 
                  href={currentProject.github} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 border-zinc-950 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs shadow-[2px_2px_0px_rgba(24,24,27,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Repository</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              )}

              <button
                onClick={onClose}
                aria-label={isPt ? 'Fechar modal' : 'Close modal'}
                className="p-1.5 rounded-xl border-2 border-zinc-950 bg-white hover:bg-zinc-100 text-zinc-900 shadow-[2px_2px_0px_rgba(24,24,27,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* --- CORPO ROLÁVEL --- */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-8 lg:p-10 no-scrollbar">
            
            {/* Se estiver em MODO DE EDIÇÃO */}
            {isEditing ? (
              <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-3xl border-3 border-zinc-950 shadow-[6px_6px_0px_rgba(0,0,0,1)] animate-pop-in">
                <div className="flex items-center justify-between border-b-2 border-zinc-200 pb-3 mb-5">
                  <h2 className="text-lg font-black text-zinc-950 flex items-center gap-2">
                    <Edit3 className="w-5 h-5 text-purple-600" />
                    <span>Editando: {currentProject.title}</span>
                  </h2>
                  <span className="text-xs font-mono bg-yellow-200 px-2 py-0.5 rounded border border-zinc-800 font-bold">
                    Modo Editor Ativo
                  </span>
                </div>

                <form onSubmit={handleSaveEdit} className="space-y-4 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-mono font-bold text-zinc-700 uppercase mb-1">Título</label>
                      <input
                        type="text"
                        required
                        value={editForm.title}
                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-xl border-2 border-zinc-950 text-xs font-medium focus:ring-2 focus:ring-yellow-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono font-bold text-zinc-700 uppercase mb-1">Categoria / Badge</label>
                      <input
                        type="text"
                        value={editForm.category}
                        onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-xl border-2 border-zinc-950 text-xs font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-mono font-bold text-zinc-700 uppercase mb-1">Período / Ano</label>
                      <input
                        type="text"
                        value={editForm.period}
                        onChange={(e) => setEditForm({ ...editForm, period: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-xl border-2 border-zinc-950 text-xs font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono font-bold text-zinc-700 uppercase mb-1">Tags (separadas por vírgula)</label>
                      <input
                        type="text"
                        value={editForm.tags}
                        onChange={(e) => setEditForm({ ...editForm, tags: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-xl border-2 border-zinc-950 text-xs font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono font-bold text-zinc-700 uppercase mb-1">Subtítulo / Tagline</label>
                    <input
                      type="text"
                      value={editForm.subtitle}
                      onChange={(e) => setEditForm({ ...editForm, subtitle: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-xl border-2 border-zinc-950 text-xs font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono font-bold text-zinc-700 uppercase mb-1">Descrição Geral</label>
                    <textarea
                      rows={2}
                      value={editForm.description}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-xl border-2 border-zinc-950 text-xs font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-mono font-bold text-zinc-700 uppercase mb-1">URL Imagem de Capa</label>
                      <input
                        type="text"
                        value={editForm.coverImage}
                        onChange={(e) => setEditForm({ ...editForm, coverImage: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-xl border-2 border-zinc-950 text-xs font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono font-bold text-zinc-700 uppercase mb-1">Repositório GitHub</label>
                      <input
                        type="url"
                        value={editForm.github}
                        onChange={(e) => setEditForm({ ...editForm, github: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-xl border-2 border-zinc-950 text-xs font-medium"
                      />
                    </div>
                  </div>

                  {/* Campos STAR */}
                  <div className="space-y-3 pt-2 border-t border-zinc-200">
                    <h4 className="text-xs font-mono font-black text-zinc-900 uppercase">Metodologia STAR</h4>
                    
                    <div>
                      <label className="block text-[10px] font-mono font-bold text-zinc-700 uppercase mb-0.5">1. O Desafio (Challenge)</label>
                      <textarea
                        rows={2}
                        value={editForm.challenge}
                        onChange={(e) => setEditForm({ ...editForm, challenge: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-xl border-2 border-zinc-950 text-xs font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono font-bold text-zinc-700 uppercase mb-0.5">2. A Solução & Arquitetura (Solution)</label>
                      <textarea
                        rows={2}
                        value={editForm.solution}
                        onChange={(e) => setEditForm({ ...editForm, solution: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-xl border-2 border-zinc-950 text-xs font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono font-bold text-zinc-700 uppercase mb-0.5">3. O Impacto & Métricas (Impact)</label>
                      <textarea
                        rows={2}
                        value={editForm.impact}
                        onChange={(e) => setEditForm({ ...editForm, impact: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-xl border-2 border-zinc-950 text-xs font-medium"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-4 border-t border-zinc-200">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 rounded-xl border border-zinc-300 text-zinc-700 text-xs font-bold cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl border-2 border-zinc-950 bg-yellow-300 hover:bg-yellow-400 text-zinc-950 text-xs font-black shadow-[3px_3px_0px_rgba(0,0,0,1)] cursor-pointer flex items-center gap-1.5"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Salvar Alterações</span>
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              
              /* VISUALIZAÇÃO PADRÃO DA MODAL (GRID 2:1) */
              <div className="max-w-[78rem] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                  
                  {/* COLUNA ESQUERDA: HEADER E METODOLOGIA STAR */}
                  <div className="lg:col-span-8 flex flex-col gap-8">
                    
                    {/* Cabeçalho do Projeto */}
                    <div className="border-b-2 border-zinc-200 pb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2.5 py-0.5 rounded-md border-2 border-zinc-900 bg-[#7dd3fc] text-zinc-950 text-[10px] font-black uppercase tracking-widest shadow-xs">
                          {currentProject.category}
                        </span>
                        <span className="text-xs font-mono font-bold text-zinc-500 uppercase">
                          {currentProject.period}
                        </span>
                      </div>

                      <h1 id="modal-project-title" className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-950 tracking-tight leading-tight mb-3">
                        {currentProject.title}
                      </h1>

                      <p className="text-sm sm:text-base text-zinc-700 font-medium max-w-2xl leading-relaxed">
                        {currentProject.subtitle || currentProject.description}
                      </p>
                    </div>

                    {/* Metodologia STAR */}
                    <div className="flex flex-col gap-6">
                      {/* 1. O Desafio */}
                      {currentProject.star?.challenge && (
                        <div className="bg-white p-5 sm:p-6 rounded-2xl border-2 border-zinc-950 shadow-[3px_3px_0px_rgba(24,24,27,1)] relative">
                          <div className="flex items-center gap-2.5 mb-3 border-b-2 border-zinc-100 pb-2.5">
                            <div className="w-7 h-7 rounded-lg bg-amber-200 border-2 border-zinc-950 flex items-center justify-center">
                              <Target className="w-3.5 h-3.5 text-zinc-950" />
                            </div>
                            <h3 className="text-sm font-black text-zinc-950 uppercase tracking-wide">
                              {currentProject.star.challenge.title}
                            </h3>
                          </div>
                          <p className="text-zinc-700 font-medium text-xs sm:text-sm leading-relaxed">
                            {currentProject.star.challenge.text}
                          </p>
                        </div>
                      )}

                      {/* 2. A Solução */}
                      {currentProject.star?.solution && (
                        <div className="bg-white p-5 sm:p-6 rounded-2xl border-2 border-zinc-950 shadow-[3px_3px_0px_rgba(24,24,27,1)] relative">
                          <div className="flex items-center gap-2.5 mb-3 border-b-2 border-zinc-100 pb-2.5">
                            <div className="w-7 h-7 rounded-lg bg-[#cffafe] border-2 border-zinc-950 flex items-center justify-center">
                              <Zap className="w-3.5 h-3.5 text-zinc-950" />
                            </div>
                            <h3 className="text-sm font-black text-zinc-950 uppercase tracking-wide">
                              {currentProject.star.solution.title}
                            </h3>
                          </div>
                          <p className="text-zinc-700 font-medium text-xs sm:text-sm leading-relaxed mb-4">
                            {currentProject.star.solution.text}
                          </p>

                          {currentProject.star.solution.highlights && currentProject.star.solution.highlights.length > 0 && (
                            <ul className="space-y-3 pt-2">
                              {currentProject.star.solution.highlights.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2.5 bg-zinc-50 p-3 rounded-xl border border-zinc-200">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                  <span className="text-zinc-700 text-xs font-medium leading-snug">
                                    <strong className="text-zinc-950 block mb-0.5">{item.title}</strong>
                                    {item.desc}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}

                      {/* 3. O Impacto */}
                      {currentProject.star?.impact && (
                        <div className="bg-[#fef08a] p-5 sm:p-6 rounded-2xl border-2 border-zinc-950 shadow-[3px_3px_0px_rgba(24,24,27,1)] relative">
                          <div className="flex items-center gap-2.5 mb-3 border-b-2 border-yellow-400 pb-2.5">
                            <div className="w-7 h-7 rounded-lg bg-white border-2 border-zinc-950 flex items-center justify-center">
                              <Trophy className="w-3.5 h-3.5 text-zinc-950" />
                            </div>
                            <h3 className="text-sm font-black text-zinc-950 uppercase tracking-wide">
                              {currentProject.star.impact.title}
                            </h3>
                          </div>
                          <p className="text-zinc-900 font-bold text-xs sm:text-sm leading-relaxed">
                            {currentProject.star.impact.text}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* COLUNA DIREITA: MURAL DE IMAGENS E TECH STACK */}
                  <div className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-0">
                    
                    {/* MURAL DE IMAGENS */}
                    <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-zinc-950 shadow-[3px_3px_0px_rgba(24,24,27,1)] space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-zinc-100 pb-2.5">
                        <div className="flex items-center gap-1.5">
                          <ImageIcon className="w-4 h-4 text-zinc-800" />
                          <h3 className="text-xs font-black text-zinc-950 uppercase tracking-wide">
                            {isPt ? 'Interface & Telas' : 'UI Showcase'}
                          </h3>
                        </div>
                        
                        {images.length > 0 && (
                          <button
                            onClick={() => setIsLightboxOpen(true)}
                            className="flex items-center gap-1 px-2 py-1 rounded-lg border-2 border-zinc-900 bg-white hover:bg-zinc-100 text-zinc-900 text-[10px] font-bold shadow-xs hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
                          >
                            <Maximize2 className="w-3 h-3" />
                            <span>{isPt ? 'Expandir' : 'Fullscreen'}</span>
                          </button>
                        )}
                      </div>

                      {/* Palco Principal de Imagem */}
                      {images.length > 0 ? (
                        <div className="space-y-2.5">
                          <div 
                            onClick={() => setIsLightboxOpen(true)}
                            className="relative w-full h-48 sm:h-56 bg-zinc-950 rounded-xl overflow-hidden border-2 border-zinc-950 flex items-center justify-center group/stage cursor-pointer"
                          >
                            <img
                              src={currentImage.url}
                              alt={currentImage.caption || `${currentProject.title} screenshot`}
                              className="w-full h-full object-contain filter contrast-105 group-hover/stage:scale-105 transition-transform duration-300"
                            />

                            {/* Overlay no hover com botão de expansão */}
                            <div className="absolute inset-0 bg-zinc-950/40 backdrop-blur-[1.5px] opacity-0 group-hover/stage:opacity-100 transition-opacity flex items-center justify-center p-3 pointer-events-none">
                              <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-zinc-950 font-black text-xs border-2 border-zinc-950 shadow-[3px_3px_0px_rgba(0,0,0,1)]">
                                <Maximize2 className="w-3.5 h-3.5" />
                                <span>{isPt ? 'Expandir Imagem' : 'Expand Image'}</span>
                              </div>
                            </div>

                            {/* Setas de navegação */}
                            {images.length > 1 && (
                              <>
                                <button
                                  onClick={handlePrevImage}
                                  className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/90 hover:bg-white text-zinc-950 border border-zinc-950 shadow-md cursor-pointer hover:scale-110 transition-transform"
                                  aria-label="Imagem anterior"
                                >
                                  <ChevronLeft className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={handleNextImage}
                                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/90 hover:bg-white text-zinc-950 border border-zinc-950 shadow-md cursor-pointer hover:scale-110 transition-transform"
                                  aria-label="Próxima imagem"
                                >
                                  <ChevronRight className="w-3.5 h-3.5" />
                                </button>
                              </>
                            )}

                            {/* Badge do índice */}
                            <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-zinc-900/90 text-white font-mono text-[10px] font-bold border border-zinc-700">
                              {activeImageIndex + 1} / {images.length}
                            </span>
                          </div>

                          {/* Miniaturas */}
                          {images.length > 1 && (
                            <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                              {images.map((img, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => setActiveImageIndex(idx)}
                                  className={`relative w-12 h-10 rounded-lg overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                                    idx === activeImageIndex
                                      ? 'border-yellow-400 ring-2 ring-zinc-950 scale-105'
                                      : 'border-zinc-300 opacity-60 hover:opacity-100'
                                  }`}
                                >
                                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="w-full h-36 bg-zinc-100 rounded-xl border border-dashed border-zinc-300 flex flex-col items-center justify-center text-center p-4">
                          <ImageIcon className="w-6 h-6 text-zinc-400 mb-1" />
                          <span className="text-xs text-zinc-500 font-medium">Imagens em desenvolvimento</span>
                        </div>
                      )}
                    </div>

                    {/* TECH STACK */}
                    <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-zinc-950 shadow-[3px_3px_0px_rgba(24,24,27,1)] space-y-3">
                      <div className="flex items-center gap-1.5 border-b-2 border-zinc-100 pb-2">
                        <Layers className="w-4 h-4 text-zinc-800" />
                        <h3 className="text-xs font-black text-zinc-950 uppercase tracking-wide">
                          Stack Técnica
                        </h3>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {currentProject.tags?.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-mono font-bold text-zinc-800 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            )}

          </div>

        </div>
      </div>

      {/* LIGHTBOX FULLSCREEN */}
      {isLightboxOpen && images.length > 0 && (
        <div 
          className="fixed inset-0 z-[120] bg-zinc-950/95 flex flex-col items-center justify-between p-4 animate-pop-in"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div className="w-full flex items-center justify-between text-white px-4 py-2 border-b border-zinc-800" onClick={(e) => e.stopPropagation()}>
            <span className="text-xs font-mono font-bold">{currentProject.title} • Tela {activeImageIndex + 1} de {images.length}</span>
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 w-full flex items-center justify-center p-4 relative" onClick={(e) => e.stopPropagation()}>
            <img
              src={currentImage.url}
              alt=""
              className="max-h-[82vh] max-w-[92vw] object-contain rounded-xl shadow-2xl"
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white text-white hover:text-zinc-950 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white text-white hover:text-zinc-950 transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}