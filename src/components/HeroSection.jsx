import React, { useState } from 'react';
import { 
  ArrowDown, 
  ArrowUpRight, 
  Sparkles,
  FileText
} from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { siteConfig } from '../content/siteConfig';
import { useMouseParallax, useScrollProgress } from '../hooks/useParallax';
import { useLanguage } from '../context/LanguageContext';

export default function HeroSection() {
  const mousePosition = useMouseParallax(0.03);
  const { scrollY } = useScrollProgress();
  const { t, language } = useLanguage();
  const isPt = language === 'pt';

  const [hoveredFolder, setHoveredFolder] = useState(null);

  const calcParallax = (depthX, depthY, scrollFactor = 0) => {
    const x = mousePosition.x * depthX;
    const y = mousePosition.y * depthY - scrollY * scrollFactor;
    return `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
  };

  const handleOpenProject = (projectId) => {
    if (projectId) {
      window.location.hash = `#/projeto/${projectId}`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.getElementById('projetos')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Dados das Pastas Estilizadas com Acabamento Suave
  const foldersData = [
    {
      id: 'core-data',
      projectId: 'salvadocs',
      year: '2024',
      tabLabel: '2024',
      title: 'Data & Automação',
      category: 'PIPELINES & ETL',
      colorName: 'orange',
      bgFolder: 'bg-[#fb923c]', // Laranja suave
      tabBg: 'bg-[#fb923c] text-orange-950',
      watermarkColor: 'text-orange-950/20',
      stickerBg: 'bg-white/95 text-orange-950 border-orange-950/15',
      rotation: '-rotate-12',
      hoverRotation: '-rotate-4',
      translateY: 'translate-y-7 sm:translate-y-8',
      zIndex: 'z-10',
      docHeader: 'ETL ARCHIVE',
      docColor: 'text-amber-800',
      bullets: [
        'Web Scraping & OCR',
        'Orquestração Assíncrona',
        'Processamento de Lotes'
      ],
      tags: ['Python', 'FastAPI', 'Pandas']
    },
    {
      id: 'erp-legacy',
      projectId: 'salvadocs',
      year: '2024',
      tabLabel: '2024',
      title: 'Sistemas Corporativos',
      category: 'CORE ERP & APIS',
      colorName: 'yellow',
      bgFolder: 'bg-[#fde047]', // Amarelo suave
      tabBg: 'bg-[#fde047] text-amber-950',
      watermarkColor: 'text-amber-950/20',
      stickerBg: 'bg-white/95 text-amber-950 border-amber-950/15',
      rotation: '-rotate-6',
      hoverRotation: '-rotate-1',
      translateY: 'translate-y-3 sm:translate-y-4',
      zIndex: 'z-20',
      docHeader: 'BACKEND CORE',
      docColor: 'text-yellow-800',
      bullets: [
        'Refatoração MVC Segura',
        'Queries SQL Otimizadas',
        'Autenticação JWT HttpOnly'
      ],
      tags: ['PHP', 'PostgreSQL', 'Docker']
    },
    {
      id: 'salvadocs',
      projectId: 'salvadocs',
      year: '2025',
      tabLabel: '2025',
      title: 'SalvaDocs • IA & OCR',
      category: 'DESKTOP & AI PIPELINE',
      colorName: 'royal-blue',
      isHeroFolder: true,
      bgFolder: 'bg-[#2563eb]', // Azul royal sofisticado
      tabBg: 'bg-[#2563eb] text-white',
      watermarkColor: 'text-white/25',
      stickerBg: 'bg-white text-zinc-950 border-blue-950/20',
      rotation: '-rotate-1',
      hoverRotation: 'rotate-0',
      translateY: '-translate-y-1 sm:-translate-y-2',
      zIndex: 'z-30',
      docHeader: 'PART PROJECTS',
      docColor: 'text-blue-800',
      bullets: [
        'Google Gemini API + Regex',
        'Desktop Electron Offline-First',
        'Redução drástica de 94% lead time'
      ],
      tags: ['React.js', 'Electron', 'Gemini API']
    },
    {
      id: 'participemais',
      projectId: 'participemais',
      year: '2025',
      tabLabel: '2025',
      title: 'Participe+ • GovTech',
      category: 'MOBILE & CIVIC NLP',
      colorName: 'cyan',
      bgFolder: 'bg-[#38bdf8]', // Ciano suave
      tabBg: 'bg-[#38bdf8] text-sky-950',
      watermarkColor: 'text-sky-950/20',
      stickerBg: 'bg-white/95 text-sky-950 border-sky-950/15',
      rotation: 'rotate-6',
      hoverRotation: 'rotate-2',
      translateY: 'translate-y-2 sm:translate-y-3',
      zIndex: 'z-20',
      docHeader: 'CIVIC AI PLATFORM',
      docColor: 'text-cyan-800',
      bullets: [
        'Clusterização Semântica NLP',
        'Anonimização de PII (LGPD)',
        'Respostas em Tempo sub-100ms'
      ],
      tags: ['React Native', 'Django', 'LangChain']
    },
    {
      id: 'cloud-infra',
      projectId: 'salvadocs',
      year: '2026',
      tabLabel: '2026',
      title: 'Cloud & Resiliência',
      category: 'DEVOPS & METODOLOGIA',
      colorName: 'slate',
      bgFolder: 'bg-[#cbd5e1]', // Cinza ardósia suave
      tabBg: 'bg-[#cbd5e1] text-zinc-800',
      watermarkColor: 'text-zinc-700/20',
      stickerBg: 'bg-white/95 text-zinc-900 border-zinc-700/15',
      rotation: 'rotate-12',
      hoverRotation: 'rotate-5',
      translateY: 'translate-y-7 sm:translate-y-8',
      zIndex: 'z-10',
      docHeader: 'ARCHITECTURE LAB',
      docColor: 'text-slate-800',
      bullets: [
        'CI/CD Pipelines Automatizados',
        'Ambientes Conteinerizados',
        'Design Systems Acessíveis'
      ],
      tags: ['Docker', 'Linux', 'Tailwind CSS']
    }
  ];

  return (
    <section 
      id="hero" 
      className="snap-section relative min-h-screen w-full flex flex-col justify-center pt-24 sm:pt-28 px-4 sm:px-6 lg:px-8 bg-[#09090b] text-white overflow-hidden selection:bg-yellow-300"
      style={{
        backgroundColor: '#09090b',
        backgroundImage: `
          radial-gradient(ellipse 85% 60% at 50% 32%, rgba(215, 250, 95, 0.32) 0%, rgba(148, 232, 133, 0.18) 42%, rgba(9, 9, 11, 0.95) 78%, #09090b 100%),
          linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
        `,
        backgroundSize: '100% 100%, 32px 32px, 32px 32px'
      }}
    >
      <div className="absolute bottom-0 left-0 right-0 h-44 sm:h-52 md:h-60 bg-[#f5f3ff] border-t-2 border-zinc-950/20 z-10 pointer-events-none">
        <div className="absolute inset-0 bg-dot-pattern opacity-40" />
      </div>

      {/* ======================================================================= */}
      {/* 2. CABEÇALHO EDITORIAL CENTRALIZADO COM CORES DE DESTAQUE               */}
      {/* ======================================================================= */}
      <div 
        className="relative z-20 w-full max-w-3xl mx-auto text-center flex flex-col items-center pt-2 sm:pt-4"
        style={{ transform: calcParallax(-4, -4, 0.04) }}
      >
        
        {/* Barra Superior Mínima: Pill de Coleção com Cores Verde, Branco e Preto */}
        <div className="motion-entry delay-0 w-full flex items-center justify-center text-xs font-mono mb-3 px-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#94e885]/40 bg-zinc-950/70 backdrop-blur-md text-[10px] sm:text-xs font-mono font-bold shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d7fa5f] animate-pulse" />
            <span className="text-[#d7fa5f]">2024 – 2026</span>
            <span className="text-[#94e885]/60">•</span>
            <span className="text-white">WORK COLLECTION</span>
          </div>
        </div>

        {/* Título Principal com Caligrafia & Card 'Szervinsk' com Variações de Branco, Verde e Preto */}
        <h1 className="motion-entry delay-75 text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight select-none flex flex-col items-center justify-center">
          {/* Linha 1: Matheus (Branco) + Ribeiro (Verde Limão Caligráfico) */}
          <div className="flex flex-wrap items-baseline justify-center gap-x-2 sm:gap-x-2.5">
            <span className="relative inline-block tracking-tight text-white drop-shadow-sm">
              Matheus
            </span>
            <span className="font-serif italic font-normal text-2xl sm:text-4xl md:text-5xl text-[#d7fa5f] transform -translate-y-0.5 drop-shadow-sm">
              Ribeiro
            </span>
          </div>

          {/* Linha 2: Szervinsk em card Verde Limão Neo-Brutalista com Texto Preto */}
          <div className="mt-1.5 sm:mt-2.5 inline-block">
            <span className="font-serif italic font-normal bg-[#d7fa5f] text-zinc-950 px-4 sm:px-6 py-0.5 sm:py-1 rounded-2xl border-2 border-zinc-950 shadow-[3.5px_3.5px_0px_#000000] inline-block -rotate-1 text-2xl sm:text-4xl md:text-5xl hover:rotate-0 transition-transform">
              Szervinsk
            </span>
          </div>
        </h1>

        {/* Subtítulo com Variações de Verde e Branco em Contraste no Fundo Preto */}
        <p className="motion-entry delay-150 mt-5 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1">
          <span className="text-[#d7fa5f]">
            {isPt ? 'Engenharia de Software' : 'Software Engineering'}
          </span>
          <span className="text-zinc-600">•</span>
          <span className="text-white">
            {isPt ? 'Arquitetura Full Stack' : 'Full Stack Architecture'}
          </span>
          <span className="text-zinc-600">•</span>
          <span className="text-[#94e885]">
            {isPt ? 'IA & Automações' : 'AI & Automations'}
          </span>
        </p>

        {/* Descrição com Largura Calibrada e Texto Fluido */}
        <p className="motion-entry delay-200 mt-2.5 text-xs sm:text-sm text-zinc-300 font-medium mx-auto leading-relaxed px-4">
          {t.hero.description}
        </p>

        {/* Botões de Ação: Preto, Verde e Branco */}
        <div className="motion-entry delay-250 mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-3.5">
          <a
            href="#projetos"
            className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl border-2 border-zinc-700 shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
          >
            <span>{isPt ? 'Explorar Projetos' : 'Explore Projects'}</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </a>

          <a
            href="#contato"
            className="flex items-center gap-2 bg-[#d7fa5f] hover:bg-[#b2f252] text-zinc-950 font-black text-xs sm:text-sm px-5 py-2.5 rounded-xl border-2 border-zinc-950 shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
          >
            <span>{isPt ? 'Falar Comigo' : 'Contact Me'}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          <a
            href={siteConfig.socials.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-white hover:bg-zinc-50 text-zinc-950 font-bold text-xs sm:text-sm px-4.5 py-2.5 rounded-xl border-2 border-zinc-950 shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
        </div>

      </div>

      {/* ======================================================================= */}
      {/* 3. SEQUÊNCIA DE PASTAS COM MARGEM SUPERIOR AMPLIADA                     */}
      {/* ======================================================================= */}
      <div className="motion-entry delay-300 relative z-20 w-full max-w-5xl mx-auto mt-10 sm:mt-14 md:mt-16 pt-2 pb-0">
        
        {/* Container das Pastas Sobrepostas */}
        <div className="relative flex items-end justify-center -space-x-8 sm:-space-x-12 md:-space-x-14 overflow-x-auto sm:overflow-visible no-scrollbar px-4 sm:px-0 py-6">
          
          {foldersData.map((folder) => {
            const isHovered = hoveredFolder === folder.id;

            return (
              <div
                key={folder.id}
                onMouseEnter={() => setHoveredFolder(folder.id)}
                onMouseLeave={() => setHoveredFolder(null)}
                onClick={() => handleOpenProject(folder.projectId)}
                className={`relative group cursor-pointer transition-all duration-300 ease-out select-none shrink-0 ${folder.zIndex} ${
                  isHovered ? 'z-50 !scale-105' : ''
                }`}
                style={{
                  transform: isHovered 
                    ? `translateY(-20px) rotate(0deg)` 
                    : undefined
                }}
              >
                
                {/* ESTRUTURA DA PASTA */}
                <div 
                  className={`relative w-48 sm:w-56 md:w-64 h-56 sm:h-60 md:h-68 transition-all duration-300 ${
                    !isHovered ? `${folder.rotation} ${folder.translateY}` : ''
                  }`}
                >
                  
                  {/* 1. ABA SUPERIOR DA PASTA (BORDER SUAVE 1PX) */}
                  <div 
                    className={`absolute -top-5 left-3 sm:left-4 h-6 px-3 sm:px-3.5 rounded-t-lg border-b border-b-black border-black/25 ${folder.tabBg} flex items-center justify-center font-mono font-bold text-[10px] sm:text-[11px] shadow-2xs z-0`}
                  >
                    <span>{folder.tabLabel}</span>
                  </div>

                  {/* 2. FUNDO / COSTAS DA PASTA (BORDAS SUAVES & AMBIENT SHADOW) */}
                  <div 
                    className={`absolute inset-0 rounded-xl rounded-tl-none border border-white/15 ${folder.bgFolder} shadow-xl shadow-black/60 group-hover:shadow-2xl transition-shadow z-0 overflow-hidden`}
                  >
                    {/* Brilho interno suave */}
                    <div className="absolute top-0 right-0 w-28 h-28 bg-white/20 rounded-full pointer-events-none" />
                  </div>

                  {/* 3. CARTÃO DE PAPEL / FICHA TÉCNICA SAINDO DE DENTRO (BORDA SUAVE) */}
                  <div 
                    className={`absolute top-2 left-2.5 right-2.5 sm:left-3 sm:right-3 bg-white rounded-lg border border-zinc-200/90 p-2.5 sm:p-3 shadow-md z-10 transition-transform duration-300 ease-out ${
                      isHovered ? '-translate-y-11 sm:-translate-y-13 shadow-lg' : '-translate-y-4 sm:-translate-y-5'
                    }`}
                  >
                    
                    {/* Header do Cartão */}
                    <div className="flex items-center justify-between pb-1 mb-1 border-b border-zinc-150">
                      <span className={`text-[9px] font-mono font-bold uppercase tracking-wider ${folder.docColor}`}>
                        {folder.docHeader}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    </div>

                    {/* Título do Projeto no Documento */}
                    <h4 className="text-xs font-bold text-zinc-950 leading-tight mb-1 truncate">
                      {folder.title}
                    </h4>

                    {/* Linhas com tópicos / bullets */}
                    <div className="space-y-1 my-1">
                      {folder.bullets.map((bullet, bIdx) => (
                        <div 
                          key={bIdx} 
                          className="text-[9px] sm:text-[10px] font-mono text-zinc-600 flex items-start gap-1 leading-tight border-b border-zinc-100 pb-0.5"
                        >
                          <span className="text-zinc-400 font-bold">•</span>
                          <span className="line-clamp-1">{bullet}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tags da Stack do Cartão */}
                    <div className="flex flex-wrap gap-1 mt-1">
                      {folder.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="text-[8px] sm:text-[9px] font-mono font-medium px-1.5 py-0.5 rounded bg-zinc-100/80 border border-zinc-200 text-zinc-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Chamada para Ação no Hover */}
                    <div className={`mt-1.5 pt-1 border-t border-zinc-100 flex items-center justify-between text-[9px] font-mono font-bold text-emerald-700 transition-opacity ${
                      isHovered ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <span>{isPt ? 'Inspecionar Projeto' : 'Inspect Case'}</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </div>

                  </div>

                  {/* 4. ABA FRONTAL DA PASTA (FRONT FLAP COM BORDAS SUAVES) */}
                  <div 
                    className={`absolute bottom-0 left-0 right-0 h-[62%] sm:h-[65%] rounded-b-xl border-t border-black/15 ${folder.bgFolder} z-20 p-2.5 sm:p-3.5 flex flex-col justify-between overflow-hidden`}
                  >
                    
                    {/* Número do Ano como Marca d'Água Suave */}
                    <div className="absolute right-3 bottom-2 select-none pointer-events-none">
                      <span className={`text-4xl sm:text-5xl font-black font-mono tracking-tighter ${folder.watermarkColor}`}>
                        {folder.year}
                      </span>
                    </div>

                    {/* Etiqueta / Adesivo Frontal */}
                    <div className={`relative z-10 self-start px-2 py-0.5 rounded-md border text-[9px] sm:text-[10px] font-mono font-bold shadow-2xs ${folder.stickerBg}`}>
                      <span>#{folder.tabLabel} • {folder.category}</span>
                    </div>

                    {/* Título e Ícone no Rodapé da Capa */}
                    <div className="relative z-10 flex items-center justify-between text-xs font-bold text-zinc-900 pt-1.5 border-t border-black/10">
                      <span className="truncate pr-2 font-mono text-[10px] sm:text-[11px] font-bold">
                        {folder.title}
                      </span>
                      <div className="w-5 h-5 rounded bg-white/80 border border-black/10 flex items-center justify-center shrink-0 group-hover:bg-yellow-300 transition-colors shadow-2xs">
                        <ArrowUpRight className="w-3 h-3 text-zinc-800" />
                      </div>
                    </div>

                  </div>

                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}