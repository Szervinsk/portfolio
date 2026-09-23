import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ExternalLink, 
  Target, 
  Zap, 
  Trophy, 
  CheckCircle2, 
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Image as ImageIcon,
  Edit3,
  Save,
  Calendar,
  Layers,
  Users,
  Code2,
  Sparkles,
  ArrowRight,
  Globe
} from 'lucide-react';
import { FigmaIcon, GithubIcon } from './SocialIcons';
import TechIcon from './TechIcon';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin } from '../context/AdminContext';

export default function ProjectPage({ 
  project, 
  allProjects = [], 
  onBack, 
  onNavigateProject 
}) {
  const { language, setLanguage } = useLanguage();
  const { isAdmin, updateProject, projectOverrides } = useAdmin();
  const isPt = language === 'pt';

  // Aplica overrides de edição do admin se existirem
  const currentProject = project
    ? {
        ...project,
        ...((projectOverrides && project?.id && projectOverrides[project.id]) || {})
      }
    : null;

  const rawImages = currentProject?.galleryImages || [];
  const images = rawImages.length > 0 
    ? rawImages 
    : (currentProject?.coverImage ? [{ url: currentProject.coverImage, caption: currentProject.title }] : []);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Encontra projetos anterior e próximo na lista
  const currentIndex = allProjects.findIndex((p) => p?.id === currentProject?.id);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : allProjects[allProjects.length - 1];
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : allProjects[0];

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
    demo: currentProject?.demo || '',
    challenge: currentProject?.star?.challenge?.text || '',
    solution: currentProject?.star?.solution?.text || '',
    impact: currentProject?.star?.impact?.text || currentProject?.impact || ''
  });

  // Atualiza form se o projeto mudar
  useEffect(() => {
    if (!currentProject) return;
    setActiveImageIndex(0);
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
      demo: currentProject?.demo || '',
      challenge: currentProject?.star?.challenge?.text || '',
      solution: currentProject?.star?.solution?.text || '',
      impact: currentProject?.star?.impact?.text || currentProject?.impact || ''
    });
  }, [currentProject?.id]);

  // Teclas de atalho para lightbox e navegação
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isLightboxOpen) {
          setIsLightboxOpen(false);
        } else if (isEditing) {
          setIsEditing(false);
        } else {
          onBack();
        }
      } else if (e.key === 'ArrowLeft' && images.length > 1) {
        setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
      } else if (e.key === 'ArrowRight' && images.length > 1) {
        setActiveImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBack, isLightboxOpen, isEditing, images.length]);

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

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
      demo: editForm.demo,
      impact: editForm.impact,
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

  if (!currentProject) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-black text-zinc-950 mb-3">
          {isPt ? 'Projeto não encontrado' : 'Project not found'}
        </h2>
        <button
          onClick={onBack}
          className="px-5 py-2.5 rounded-lg bg-zinc-900 text-white font-bold text-sm border-2 border-zinc-950 shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
        >
          {isPt ? 'Voltar para o Portfólio' : 'Back to Portfolio'}
        </button>
      </div>
    );
  }

  const currentImage = images[activeImageIndex] || images[0];

  return (
    <div className="min-h-screen bg-[#faf8f5] text-zinc-950 font-sans selection:bg-yellow-300 selection:text-zinc-950 pb-20">
      
      {/* ========================================================================= */}
      {/* 1. TOP BAR / HEADER COMPACTO E FIXO                                       */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-zinc-950 px-4 sm:px-8 py-3 shadow-xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          
          {/* Botão de Retorno */}
          <button 
            onClick={onBack}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 border-zinc-950 bg-white hover:bg-zinc-100 text-zinc-950 font-bold text-xs sm:text-sm shadow-[2px_2px_0px_rgba(24,24,27,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isPt ? 'Voltar aos Projetos' : 'Back to Projects'}</span>
          </button>

          {/* Breadcrumb Central (Desktop) */}
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-zinc-600 font-bold">
            <span className="text-zinc-950 font-black">M. Szervinsk</span>
            <span>/</span>
            <span className="text-zinc-500">{isPt ? 'Projetos' : 'Projects'}</span>
            <span>/</span>
            <span className="text-purple-700 font-black">{currentProject.title}</span>
          </div>

          {/* Ações Rápidas & Idioma */}
          <div className="flex items-center gap-2">
            {/* Modo Admin Toggle */}
            {isAdmin && (
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-2 border-zinc-950 text-xs font-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer ${
                  isEditing ? 'bg-yellow-300 text-zinc-950' : 'bg-emerald-200 hover:bg-emerald-300 text-emerald-950'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isEditing ? (isPt ? 'Fechar Edição' : 'Close Editor') : (isPt ? 'Editar (ADM)' : 'Edit (Admin)')}</span>
              </button>
            )}

            {currentProject.figma && (
              <a 
                href={currentProject.figma} 
                target="_blank" 
                rel="noreferrer"
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border-2 border-zinc-950 bg-[#fef08a] hover:bg-[#fde047] text-zinc-900 font-bold text-xs shadow-[2px_2px_0px_rgba(24,24,27,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
                title="Figma Prototype"
              >
                <FigmaIcon className="w-3.5 h-3.5" />
                <span>Figma</span>
              </a>
            )}

            {currentProject.github && (
              <a 
                href={currentProject.github} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border-2 border-zinc-950 bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-xs shadow-[2px_2px_0px_rgba(24,24,27,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
                title="GitHub Repository"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>
            )}

            {/* Language Switcher */}
            <div className="flex items-center bg-zinc-100 p-0.5 rounded-md border border-zinc-300 text-xs font-mono font-bold ml-1">
              <button
                onClick={() => setLanguage('pt')}
                className={`px-1.5 py-0.5 rounded transition-all cursor-pointer ${
                  language === 'pt' ? 'bg-emerald-600 text-white shadow-2xs' : 'text-zinc-500 hover:text-zinc-900'
                }`}
                title="Português"
              >
                🇧🇷
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-1.5 py-0.5 rounded transition-all cursor-pointer ${
                  language === 'en' ? 'bg-zinc-900 text-white shadow-2xs' : 'text-zinc-500 hover:text-zinc-900'
                }`}
                title="English"
              >
                🇺🇸
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. CONTEÚDO PRINCIPAL DO ESTUDO DE CASO                                   */}
      {/* ========================================================================= */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
        
        {/* FORMULÁRIO DE EDIÇÃO IN-PLACE (Se ativo pelo admin) */}
        {isEditing && (
          <div className="mb-10 p-5 sm:p-7 bg-white rounded-xl border-2 border-zinc-950 shadow-[5px_5px_0px_rgba(0,0,0,1)] animate-pop-in text-left">
            <div className="flex items-center justify-between border-b-2 border-zinc-200 pb-3 mb-5">
              <h2 className="text-base font-black text-zinc-950 flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-purple-600" />
                <span>Painel de Edição: {currentProject.title}</span>
              </h2>
              <span className="text-xs font-mono bg-yellow-200 px-2 py-0.5 rounded border border-zinc-800 font-bold">
                Modo Editor Ativo
              </span>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-mono font-bold text-zinc-700 uppercase mb-1">Título</label>
                  <input
                    type="text"
                    required
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border-2 border-zinc-950 text-xs font-medium focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-bold text-zinc-700 uppercase mb-1">Categoria</label>
                  <input
                    type="text"
                    value={editForm.category}
                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border-2 border-zinc-950 text-xs font-medium"
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
                    className="w-full px-3 py-2 rounded-lg border-2 border-zinc-950 text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-bold text-zinc-700 uppercase mb-1">Tags (separadas por vírgula)</label>
                  <input
                    type="text"
                    value={editForm.tags}
                    onChange={(e) => setEditForm({ ...editForm, tags: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border-2 border-zinc-950 text-xs font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold text-zinc-700 uppercase mb-1">Subtítulo / Tagline</label>
                <input
                  type="text"
                  value={editForm.subtitle}
                  onChange={(e) => setEditForm({ ...editForm, subtitle: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border-2 border-zinc-950 text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold text-zinc-700 uppercase mb-1">Descrição Completa</label>
                <textarea
                  rows={3}
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border-2 border-zinc-950 text-xs font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] font-mono font-bold text-zinc-700 uppercase mb-1">URL Imagem Capa</label>
                  <input
                    type="text"
                    value={editForm.coverImage}
                    onChange={(e) => setEditForm({ ...editForm, coverImage: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border-2 border-zinc-950 text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-bold text-zinc-700 uppercase mb-1">Link GitHub</label>
                  <input
                    type="url"
                    value={editForm.github}
                    onChange={(e) => setEditForm({ ...editForm, github: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border-2 border-zinc-950 text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-bold text-zinc-700 uppercase mb-1">Link Figma</label>
                  <input
                    type="url"
                    value={editForm.figma}
                    onChange={(e) => setEditForm({ ...editForm, figma: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border-2 border-zinc-950 text-xs font-medium"
                  />
                </div>
              </div>

              {/* Metodologia STAR */}
              <div className="space-y-3 pt-3 border-t border-zinc-200">
                <h4 className="text-xs font-mono font-black text-zinc-900 uppercase">Metodologia STAR</h4>
                
                <div>
                  <label className="block text-[10px] font-mono font-bold text-zinc-700 uppercase mb-1">1. O Desafio (Situation & Task)</label>
                  <textarea
                    rows={2}
                    value={editForm.challenge}
                    onChange={(e) => setEditForm({ ...editForm, challenge: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border-2 border-zinc-950 text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-bold text-zinc-700 uppercase mb-1">2. A Solução (Action & Architecture)</label>
                  <textarea
                    rows={2}
                    value={editForm.solution}
                    onChange={(e) => setEditForm({ ...editForm, solution: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border-2 border-zinc-950 text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-bold text-zinc-700 uppercase mb-1">3. O Impacto & Métrica Chave</label>
                  <textarea
                    rows={2}
                    value={editForm.impact}
                    onChange={(e) => setEditForm({ ...editForm, impact: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border-2 border-zinc-950 text-xs font-medium"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-zinc-200">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-lg border border-zinc-300 text-zinc-700 text-xs font-bold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg border-2 border-zinc-950 bg-yellow-300 hover:bg-yellow-400 text-zinc-950 text-xs font-black shadow-[2.5px_2.5px_0px_rgba(0,0,0,1)] cursor-pointer flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Salvar Alterações</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* HERO & METADADOS PRINCIPAIS DO PROJETO                                    */}
        {/* ========================================================================= */}
        <div className="mb-8 text-left">
          
          {/* Badges superiores */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-2.5 py-0.5 rounded-md border-2 border-zinc-950 bg-[#7dd3fc] text-zinc-950 text-xs font-mono font-black uppercase tracking-wider shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]">
              {currentProject.category}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md border border-zinc-300 bg-white text-zinc-700 text-xs font-mono font-bold shadow-2xs">
              <Calendar className="w-3 h-3 text-zinc-500" />
              <span>{currentProject.period}</span>
            </span>
            {currentProject.collaborators && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md border border-zinc-300 bg-white text-zinc-700 text-xs font-mono font-medium shadow-2xs">
                <Users className="w-3 h-3 text-purple-600" />
                <span>{currentProject.collaborators}</span>
              </span>
            )}
          </div>

          {/* Título Principal */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-zinc-950 tracking-tight leading-tight mb-2">
            {currentProject.title}
          </h1>

          {/* Tagline / Subtítulo */}
          <p className="text-base sm:text-lg text-zinc-700 font-medium leading-relaxed max-w-4xl">
            {currentProject.subtitle || currentProject.description}
          </p>

          {/* Destaque de Impacto / Métrica Chave em Callout Banner */}
          {(currentProject.impact || currentProject.star?.impact?.text) && (
            <div className="mt-4 p-3.5 sm:p-4 rounded-xl border-2 border-zinc-950 bg-[#fef08a] shadow-[3px_3px_0px_rgba(24,24,27,1)] flex items-start sm:items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white border-2 border-zinc-950 flex items-center justify-center shrink-0 shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]">
                <Trophy className="w-4 h-4 text-zinc-950" />
              </div>
              <div className="flex-1">
                <span className="text-[10px] font-mono font-black uppercase tracking-wider text-yellow-950 block">
                  {isPt ? 'Métrica & Resultado Chave' : 'Key Metric & Outcome'}
                </span>
                <p className="text-xs sm:text-sm font-bold text-zinc-950 leading-snug">
                  {currentProject.impact || currentProject.star?.impact?.text}
                </p>
              </div>
            </div>
          )}

        </div>

        {/* ========================================================================= */}
        {/* 3. SHOWCASE VISUAL — MURAL COM DESIGN DE JANELA DE APLICAÇÃO              */}
        {/* ========================================================================= */}
        <section className="mb-12 text-left">
          <div className="rounded-xl border-2 border-zinc-950 bg-white overflow-hidden shadow-[5px_5px_0px_rgba(24,24,27,1)] flex flex-col">
            
            {/* Barra de Janela / Window Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-zinc-100 border-b-2 border-zinc-950">
              
              {/* Controles de Janela & Caminho */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400 border border-zinc-950/40" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400 border border-zinc-950/40" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400 border border-zinc-950/40" />
                </div>
                <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white border border-zinc-300 text-[11px] font-mono font-bold text-zinc-600 shadow-2xs">
                  <span>app://case-study/{currentProject.id}</span>
                </div>
              </div>

              {/* Status da Tela & Botão Fullscreen */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-zinc-700 bg-white px-2 py-0.5 rounded-md border border-zinc-300 shadow-2xs">
                  {images.length > 0 
                    ? (isPt ? `Tela ${activeImageIndex + 1} de ${images.length}` : `Screen ${activeImageIndex + 1} of ${images.length}`) 
                    : (isPt ? 'Preview do Sistema' : 'System Preview')}
                </span>

                {images.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setIsLightboxOpen(true)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-md border-2 border-zinc-950 bg-yellow-300 hover:bg-yellow-400 text-zinc-950 text-xs font-mono font-black shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{isPt ? 'Expandir' : 'Fullscreen'}</span>
                  </button>
                )}
              </div>

            </div>

            {/* Canvas de Exibição da Imagem */}
            <div className="relative w-full min-h-[300px] sm:min-h-[440px] max-h-[560px] flex items-center justify-center bg-zinc-900 p-3 sm:p-6 group/stage select-none">
              {images.length > 0 ? (
                <>
                  <img
                    src={currentImage.url}
                    alt={currentImage.caption || `${currentProject.title} screenshot`}
                    onClick={() => setIsLightboxOpen(true)}
                    className="max-h-[500px] w-auto max-w-full object-contain rounded-lg border border-zinc-700 shadow-xl filter contrast-[1.02] cursor-pointer hover:scale-[1.008] transition-transform duration-300"
                  />

                  {/* Setas de Navegação */}
                  {images.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={handlePrevImage}
                        aria-label="Imagem anterior"
                        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-white/95 hover:bg-yellow-300 text-zinc-950 border-2 border-zinc-950 shadow-[2px_2px_0px_rgba(0,0,0,1)] cursor-pointer hover:scale-105 transition-all z-20"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={handleNextImage}
                        aria-label="Próxima imagem"
                        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-white/95 hover:bg-yellow-300 text-zinc-950 border-2 border-zinc-950 shadow-[2px_2px_0px_rgba(0,0,0,1)] cursor-pointer hover:scale-105 transition-all z-20"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center text-zinc-400">
                  <ImageIcon className="w-10 h-10 mb-2 opacity-50" />
                  <span className="text-sm font-bold">{isPt ? 'Imagem em processamento' : 'Image processing'}</span>
                </div>
              )}
            </div>

            {/* Rodapé da Janela: Legenda & Strip de Miniaturas */}
            <div className="p-3 sm:p-4 bg-white border-t-2 border-zinc-950 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              
              {/* Legenda contextual */}
              <div className="flex-1">
                {currentImage?.caption ? (
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-zinc-800 bg-zinc-100 px-3 py-1 rounded-md border border-zinc-300">
                    <span>💡</span>
                    <span>{currentImage.caption}</span>
                  </div>
                ) : (
                  <span className="text-xs font-mono text-zinc-500">
                    {currentProject.title} • {isPt ? 'Mural de Interface' : 'Interface Showcase'}
                  </span>
                )}
              </div>

              {/* Strip de Miniaturas */}
              {images.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-0.5 no-scrollbar shrink-0">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-16 h-11 sm:w-20 sm:h-13 rounded-lg overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                        idx === activeImageIndex
                          ? 'border-zinc-950 ring-2 ring-yellow-400 scale-105 shadow-[2px_2px_0px_rgba(0,0,0,1)] opacity-100'
                          : 'border-zinc-300 opacity-60 hover:opacity-100 hover:border-zinc-800'
                      }`}
                      title={img.caption || `Foto ${idx + 1}`}
                    >
                      <img src={img.url} alt="" className="w-full h-full object-cover" />
                      <span className="absolute bottom-0 right-0 bg-zinc-950 text-white font-mono text-[8px] px-1 py-0.2 rounded-tl font-bold">
                        {idx + 1}
                      </span>
                    </button>
                  ))}
                </div>
              )}

            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. DISPOSIÇÃO EM 2 COLUNAS: ESTUDO DE CASO + FICHA TÉCNICA               */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16 text-left">
          
          {/* ======================================================================= */}
          {/* COLUNA ESQUERDA (8 COLS): METODOLOGIA STAR & DECISÕES DE ENGENHARIA      */}
          {/* ======================================================================= */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* 1. O Cenário & O Desafio */}
            {currentProject.star?.challenge && (
              <div className="p-6 sm:p-7 rounded-xl border-2 border-zinc-950 bg-white shadow-[4px_4px_0px_rgba(24,24,27,1)]">
                <div className="flex items-center gap-3 mb-3 pb-3 border-b-2 border-zinc-100">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 border-2 border-zinc-950 flex items-center justify-center shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] shrink-0">
                    <Target className="w-4 h-4 text-zinc-950" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-800 block">
                      01 • Situation & Task
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-zinc-950">
                      {isPt ? '1. O Cenário & O Desafio' : '1. The Situation & Challenge'}
                    </h3>
                  </div>
                </div>
                <p className="text-zinc-700 font-medium text-sm sm:text-base leading-relaxed">
                  {currentProject.star.challenge.text}
                </p>
              </div>
            )}

            {/* 2. Engenharia & Arquitetura */}
            {currentProject.star?.solution && (
              <div className="p-6 sm:p-7 rounded-xl border-2 border-zinc-950 bg-white shadow-[4px_4px_0px_rgba(24,24,27,1)]">
                <div className="flex items-center gap-3 mb-3 pb-3 border-b-2 border-zinc-100">
                  <div className="w-8 h-8 rounded-lg bg-[#cffafe] border-2 border-zinc-950 flex items-center justify-center shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] shrink-0">
                    <Zap className="w-4 h-4 text-zinc-950" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-800 block">
                      02 • Action & Engineering
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-zinc-950">
                      {isPt ? '2. A Engenharia & Arquitetura' : '2. Engineering & Architecture'}
                    </h3>
                  </div>
                </div>
                
                <p className="text-zinc-700 font-medium text-sm sm:text-base leading-relaxed mb-4">
                  {currentProject.star.solution.text}
                </p>

                {/* Destaques Técnicos de Implementação */}
                {currentProject.star.solution.highlights && currentProject.star.solution.highlights.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-zinc-100">
                    {currentProject.star.solution.highlights.map((item, idx) => (
                      <div 
                        key={idx} 
                        className="p-3.5 rounded-lg bg-zinc-50 border-2 border-zinc-200 flex flex-col justify-between hover:border-zinc-950 transition-colors"
                      >
                        <div className="flex items-start gap-2 mb-1">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <h4 className="font-bold text-xs sm:text-sm text-zinc-950 leading-snug">
                            {item.title}
                          </h4>
                        </div>
                        <p className="text-zinc-600 text-xs font-medium leading-relaxed pl-6">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 3. Resultado & Métricas de Sucesso */}
            {currentProject.star?.impact && (
              <div className="p-6 sm:p-7 rounded-xl border-2 border-zinc-950 bg-[#fefce8] shadow-[4px_4px_0px_rgba(24,24,27,1)]">
                <div className="flex items-center gap-3 mb-3 pb-3 border-b-2 border-yellow-300">
                  <div className="w-8 h-8 rounded-lg bg-white border-2 border-zinc-950 flex items-center justify-center shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] shrink-0">
                    <Trophy className="w-4 h-4 text-zinc-950" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-yellow-900 block">
                      03 • Result & Metrics
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-zinc-950">
                      {isPt ? '3. O Impacto & Métricas de Sucesso' : '3. Impact & Success Metrics'}
                    </h3>
                  </div>
                </div>
                <p className="text-zinc-950 font-bold text-sm sm:text-base leading-relaxed">
                  {currentProject.star.impact.text}
                </p>
              </div>
            )}

          </div>

          {/* ======================================================================= */}
          {/* COLUNA DIREITA (4 COLS): FICHA TÉCNICA, LINKS & ARQUITETURA DE STACK    */}
          {/* ======================================================================= */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-20">
            
            {/* Card de Ficha Técnica & Links Diretos */}
            <div className="p-5 rounded-xl border-2 border-zinc-950 bg-white shadow-[4px_4px_0px_rgba(24,24,27,1)]">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-zinc-100">
                <Layers className="w-4 h-4 text-purple-600" />
                <h3 className="text-xs font-mono font-black uppercase text-zinc-800 tracking-wider">
                  {isPt ? 'Ficha Técnica do Caso' : 'Case Specifications'}
                </h3>
              </div>

              {/* Informações Estruturadas */}
              <div className="space-y-3 text-xs mb-5 font-mono">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
                  <span className="text-zinc-500 font-bold">{isPt ? 'Categoria:' : 'Category:'}</span>
                  <span className="font-bold text-zinc-950 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200">
                    {currentProject.category}
                  </span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
                  <span className="text-zinc-500 font-bold">{isPt ? 'Período:' : 'Timeline:'}</span>
                  <span className="font-bold text-zinc-950">
                    {currentProject.period}
                  </span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
                  <span className="text-zinc-500 font-bold">{isPt ? 'Engenheiro:' : 'Author:'}</span>
                  <span className="font-bold text-zinc-950 text-right">
                    {currentProject.collaborators || 'Matheus Szervinsk'}
                  </span>
                </div>
              </div>

              {/* Botões de Ação Direta */}
              <div className="space-y-2">
                {currentProject.github && (
                  <a
                    href={currentProject.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-lg border-2 border-zinc-950 bg-zinc-950 hover:bg-zinc-800 text-white font-mono font-bold text-xs shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>{isPt ? 'Inspecionar Código (GitHub)' : 'Inspect Code (GitHub)'}</span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                )}

                {currentProject.figma && (
                  <a
                    href={currentProject.figma}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-lg border-2 border-zinc-950 bg-[#fef08a] hover:bg-[#fde047] text-zinc-950 font-mono font-bold text-xs shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
                  >
                    <FigmaIcon className="w-4 h-4" />
                    <span>{isPt ? 'Ver Arquitetura UX (Figma)' : 'UX Prototype (Figma)'}</span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                )}

                {currentProject.demo && (
                  <a
                    href={currentProject.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-lg border-2 border-zinc-950 bg-emerald-300 hover:bg-emerald-400 text-zinc-950 font-mono font-bold text-xs shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
                  >
                    <Globe className="w-4 h-4" />
                    <span>{isPt ? 'Acessar Aplicação Live' : 'Open Live Demo'}</span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                )}
              </div>
            </div>

            {/* Card de Divisão de Tecnologias */}
            <div className="p-5 rounded-xl border-2 border-zinc-950 bg-white shadow-[4px_4px_0px_rgba(24,24,27,1)]">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-zinc-100">
                <Code2 className="w-4 h-4 text-emerald-600" />
                <h3 className="text-xs font-mono font-black uppercase text-zinc-800 tracking-wider">
                  {isPt ? 'Divisão Tecnológica' : 'Technology Stack'}
                </h3>
              </div>

              {currentProject.techStack ? (
                <div className="space-y-4">
                  {/* Front-end */}
                  {currentProject.techStack.frontend && (
                    <div>
                      <span className="text-[10px] font-mono font-black text-purple-800 uppercase block mb-1.5">
                        Front-end & UI
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {currentProject.techStack.frontend.map((t) => (
                          <span key={t} className="text-xs font-mono font-bold px-2 py-1 bg-zinc-50 border border-zinc-300 rounded-md text-zinc-800 shadow-2xs flex items-center gap-1.5 hover:border-zinc-950 transition-colors">
                            <TechIcon name={t} className="w-3.5 h-3.5 shrink-0" />
                            <span>{t}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Back-end */}
                  {currentProject.techStack.backend && (
                    <div>
                      <span className="text-[10px] font-mono font-black text-emerald-800 uppercase block mb-1.5">
                        Back-end & APIs
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {currentProject.techStack.backend.map((t) => (
                          <span key={t} className="text-xs font-mono font-bold px-2 py-1 bg-zinc-50 border border-zinc-300 rounded-md text-zinc-800 shadow-2xs flex items-center gap-1.5 hover:border-zinc-950 transition-colors">
                            <TechIcon name={t} className="w-3.5 h-3.5 shrink-0" />
                            <span>{t}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Infra / AI */}
                  {currentProject.techStack.infraAi && (
                    <div>
                      <span className="text-[10px] font-mono font-black text-amber-800 uppercase block mb-1.5">
                        Infra, DevOps & IA
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {currentProject.techStack.infraAi.map((t) => (
                          <span key={t} className="text-xs font-mono font-bold px-2 py-1 bg-zinc-50 border border-zinc-300 rounded-md text-zinc-800 shadow-2xs flex items-center gap-1.5 hover:border-zinc-950 transition-colors">
                            <TechIcon name={t} className="w-3.5 h-3.5 shrink-0" />
                            <span>{t}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {currentProject.tags?.map((t) => (
                    <span key={t} className="text-xs font-mono font-bold px-2.5 py-1 bg-zinc-50 border border-zinc-300 rounded-md text-zinc-800 shadow-2xs flex items-center gap-1.5 hover:border-zinc-950 transition-colors">
                      <TechIcon name={t} className="w-3.5 h-3.5 shrink-0" />
                      <span>{t}</span>
                    </span>
                  ))}
                </div>
              )}

            </div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* 5. NAVEGAÇÃO ENTRE ESTUDOS DE CASO (RODAPÉ)                                */}
        {/* ========================================================================= */}
        <section className="pt-8 border-t-2 border-zinc-950/15">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Projeto Anterior */}
            {prevProject && (
              <button
                type="button"
                onClick={() => onNavigateProject(prevProject.id)}
                className="p-4 sm:p-5 rounded-xl border-2 border-zinc-950 bg-white shadow-[3px_3px_0px_rgba(24,24,27,1)] hover:shadow-[5px_5px_0px_rgba(24,24,27,1)] hover:-translate-y-0.5 transition-all text-left flex flex-col justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-zinc-500 mb-2">
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                  <span>{isPt ? 'Caso Anterior' : 'Previous Project'}</span>
                </div>
                <div>
                  <h4 className="font-black text-base sm:text-lg text-zinc-950 group-hover:text-purple-700 transition-colors">
                    {prevProject.title}
                  </h4>
                  <p className="text-xs text-zinc-600 line-clamp-1 mt-0.5">
                    {prevProject.subtitle || prevProject.description}
                  </p>
                </div>
              </button>
            )}

            {/* Próximo Projeto */}
            {nextProject && (
              <button
                type="button"
                onClick={() => onNavigateProject(nextProject.id)}
                className="p-4 sm:p-5 rounded-xl border-2 border-zinc-950 bg-white shadow-[3px_3px_0px_rgba(24,24,27,1)] hover:shadow-[5px_5px_0px_rgba(24,24,27,1)] hover:-translate-y-0.5 transition-all text-right flex flex-col justify-between group cursor-pointer"
              >
                <div className="flex items-center justify-end gap-1.5 text-xs font-mono font-bold text-zinc-500 mb-2">
                  <span>{isPt ? 'Próximo Caso' : 'Next Project'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
                <div>
                  <h4 className="font-black text-base sm:text-lg text-zinc-950 group-hover:text-purple-700 transition-colors">
                    {nextProject.title}
                  </h4>
                  <p className="text-xs text-zinc-600 line-clamp-1 mt-0.5">
                    {nextProject.subtitle || nextProject.description}
                  </p>
                </div>
              </button>
            )}

          </div>

          {/* Botão de Retorno Central */}
          <div className="mt-8 text-center">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-sm border-2 border-zinc-950 shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{isPt ? 'Voltar para a Página Inicial' : 'Back to Home Portfolio'}</span>
            </button>
          </div>
        </section>

      </main>

      {/* ========================================================================= */}
      {/* 6. LIGHTBOX FULLSCREEN                                                    */}
      {/* ========================================================================= */}
      {isLightboxOpen && images.length > 0 && (
        <div 
          className="fixed inset-0 z-[120] bg-zinc-950/95 backdrop-blur-sm flex flex-col items-center justify-between p-4 animate-pop-in"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div className="w-full flex items-center justify-between text-white px-4 py-2 border-b border-zinc-800" onClick={(e) => e.stopPropagation()}>
            <span className="text-xs font-mono font-bold">
              {currentProject.title} • {isPt ? `Tela ${activeImageIndex + 1} de ${images.length}` : `Screen ${activeImageIndex + 1} of ${images.length}`}
            </span>
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="p-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 w-full flex items-center justify-center p-4 relative" onClick={(e) => e.stopPropagation()}>
            <img
              src={currentImage.url}
              alt=""
              className="max-h-[82vh] max-w-[92vw] object-contain rounded-lg shadow-2xl"
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-lg bg-white/20 hover:bg-white text-white hover:text-zinc-950 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-lg bg-white/20 hover:bg-white text-white hover:text-zinc-950 transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
