import React, { useState, useEffect } from 'react';
import { ArrowDown, ArrowUpRight, Mail, Package, Sparkles, Flame, BarChart3 } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { siteConfig } from '../content/siteConfig';
import { useLanguage } from '../context/LanguageContext';

export default function HeroSection({ onSelectProject, onOpenProject, isReady = true }) {
  const { language } = useLanguage();
  const isPt = language === 'pt';
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isEntered, setIsEntered] = useState(false);

  useEffect(() => {
    if (isReady) {
      const timer = setTimeout(() => {
        setIsEntered(true);
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [isReady]);

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `#${sectionId}`);
    }
  };

  return (
    <section 
      id="hero" 
      className="snap-section relative min-h-screen w-full flex flex-col justify-between items-center bg-linear-to-b from-[#bef264] to-[#d8b4fe] text-zinc-950 select-none overflow-hidden mb-0"
      style={{
        background: 'linear-gradient(to bottom, #bef264 0%, #d8b4fe 100%)'
      }}
    >
      {/* ======================================================================= */}
      {/* 0. PADRÃO QUADRICULADO + ILUMINAÇÃO SUAVE                               */}
      {/* ======================================================================= */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 animate-grid-hero"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(24, 24, 27, 0.085) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(24, 24, 27, 0.085) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px'
        }}
      />
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: 'radial-gradient(ellipse 75% 45% at 50% 20%, rgba(255, 255, 255, 0.28) 0%, transparent 70%)'
        }}
      />

      {/* ======================================================================= */}
      {/* 1. ELEMENTOS CENTRALIZADOS NO TOPO / MEIO (TÍTULO, SUBTÍTULO, ALERTAS)  */}
      {/* ======================================================================= */}
      <div className="relative z-20 w-full max-w-3xl mx-auto mt-10 text-center flex flex-col items-center pt-24 sm:pt-20 md:pt-22 px-4">
        
        {/* Badge Superior: Promovendo o Repositório do GitHub */}
        <div className={`hero-pop delay-75 ${isEntered ? 'is-entered' : ''}`}>
          <a
            href={siteConfig.socials.github}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border-2 border-zinc-950 bg-white hover:bg-zinc-50 transition-all text-zinc-900 mb-3 shadow-[2px_2px_0px_rgba(24,24,27,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_rgba(24,24,27,1)] cursor-pointer"
          >
            <GithubIcon className="w-3.5 h-3.5 text-zinc-950 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-wider uppercase">
              github.com/szervinsk
            </span>
            <ArrowUpRight className="w-3 h-3 text-zinc-400 group-hover:text-zinc-950 transition-colors" />
          </a>
        </div>

        {/* Título Principal Editorial */}
        <h1 className={`hero-pop delay-150 ${isEntered ? 'is-entered' : ''} text-3xl sm:text-5xl md:text-6xl font-black text-zinc-950 tracking-tight leading-[1.1]`}>
          <div>{isPt ? 'One Stop Software' : 'One Stop Software'}</div>
          <div className="flex items-center justify-center gap-2 sm:gap-3.5 mt-0.5 sm:mt-1">
            <span>{isPt ? 'Repository' : 'Repository'}</span>
            <span className="text-zinc-700 font-medium">
              {isPt ? 'for Engineers.' : 'for Engineers.'}
            </span>
          </div>
        </h1>

        {/* Subtítulo */}
        <p className={`hero-pop delay-250 ${isEntered ? 'is-entered' : ''} mt-2.5 sm:mt-3 text-xs sm:text-sm text-zinc-700 font-medium max-w-md sm:max-w-lg mx-auto leading-relaxed`}>
          {isPt 
            ? 'Coleção open-source de sistemas full stack, automações de dados em Python e arquiteturas com IA na UnB.' 
            : 'Open-source collection of production full stack apps, Python data pipelines, and AI engineering architectures.'}
        </p>

        {/* Botões de Ação para Explorar */}
        <div className={`hero-pop delay-350 ${isEntered ? 'is-entered' : ''} mt-4 sm:mt-5 flex flex-wrap items-center justify-center gap-3`}>
          <a
            href="#projetos"
            onClick={(e) => handleNavClick(e, 'projetos')}
            className="inline-flex items-center gap-2 bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-xs sm:text-sm px-5 sm:px-6 py-2 sm:py-2.5 rounded-full shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>{isPt ? 'Explorar Repositórios' : 'View Repositories'}</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </a>

          <a
            href="#contato"
            onClick={(e) => handleNavClick(e, 'contato')}
            className="inline-flex items-center gap-2 bg-white hover:bg-zinc-50 text-zinc-950 font-bold text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border-2 border-zinc-950 shadow-[2px_2px_0px_rgba(24,24,27,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_rgba(24,24,27,1)] transition-all cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5 text-zinc-950" />
            <span>{isPt ? 'Entrar em Contato' : 'Contact Me'}</span>
            <ArrowUpRight className="w-3 h-3 text-zinc-400" />
          </a>
        </div>
      </div>

      {/* ======================================================================= */}
      {/* 2. BLOCO DA CAIXA DE PAPELÃO COM OS CARDS + DIV BRANCA ATÉ O FINAL     */}
      {/* ======================================================================= */}
      <div className="relative w-full flex flex-col items-center pointer-events-auto z-10 pb-8 sm:pb-12">
        
        {/* ------------------------------------------------------------------- */}
        {/* A. DIV BRANCA ATRÁS DA CAIXA: DO MEIO DA CAIXA ATÉ EMBAIXO (SEM TEXTO) */}
        {/* ------------------------------------------------------------------- */}
        <div className="absolute top-[62%] sm:top-[58%] md:top-[54%] inset-x-0 bottom-0 w-full bg-white border-t-2 sm:border-t-[3px] border-zinc-950 z-0 pointer-events-none" />

        {/* ------------------------------------------------------------- */}
        {/* B. ESTRUTURA DA CAIXA DE PAPELÃO COM OS CARDS JUNTOS E COMPACTOS */}
        {/* ------------------------------------------------------------- */}
        <div className={`hero-pop delay-450 ${isEntered ? 'is-entered' : ''} relative w-full max-w-[96%] sm:max-w-[760px] md:max-w-[880px] lg:max-w-[980px] flex flex-col items-center`}>
          
          {/* ABAS / ALÇAS LATERAIS DA CAIXA (NA FRENTE DO FUNDO EM Z-INDEX) */}
          
          {/* Aba Esquerda Externa Aberta */}
          <div 
            className="absolute top-24 sm:top-28 -left-3 sm:-left-5 md:-left-7 w-16 sm:w-22 md:w-28 h-12 sm:h-16 md:h-20 bg-[#c49662] border-2 sm:border-[3px] border-zinc-950 rounded-tl-xl -rotate-[50deg] sm:-rotate-[58deg] origin-bottom-right shadow-[3px_3px_0px_rgba(24,24,27,1)] z-[5] pointer-events-none overflow-hidden"
            style={{
              backgroundImage: 'linear-gradient(135deg, #d8ac78 0%, #b88a55 100%)'
            }}
          >
            <div className="absolute right-0 inset-y-0 w-2 border-r-2 border-dashed border-zinc-950/30" />
            <span className="absolute bottom-1 left-2 font-mono text-[7px] sm:text-[8px] font-black text-amber-950/50 -rotate-90 uppercase tracking-widest">
              FLAP // L
            </span>
          </div>

          {/* Aba Direita Externa Aberta */}
          <div 
            className="absolute top-24 sm:top-28 -right-3 sm:-right-5 md:-right-7 w-16 sm:w-22 md:w-28 h-12 sm:h-16 md:h-20 bg-[#c49662] border-2 sm:border-[3px] border-zinc-950 rounded-tr-xl rotate-[50deg] sm:rotate-[58deg] origin-bottom-left shadow-[3px_3px_0px_rgba(24,24,27,1)] z-[5] pointer-events-none overflow-hidden"
            style={{
              backgroundImage: 'linear-gradient(225deg, #d8ac78 0%, #b88a55 100%)'
            }}
          >
            <div className="absolute left-0 inset-y-0 w-2 border-l-2 border-dashed border-zinc-950/30" />
            <span className="absolute bottom-1 right-2 font-mono text-[7px] sm:text-[8px] font-black text-amber-950/50 rotate-90 uppercase tracking-widest">
              FLAP // R
            </span>
          </div>

          {/* Aba Traseira Superior Dobrada para Trás (Na frente do fundo em z-index) */}
          <div 
            className="absolute top-16 sm:top-18 inset-x-6 sm:inset-x-12 md:inset-x-16 h-7 sm:h-9 bg-[#b07f4b] border-2 sm:border-[3px] border-zinc-950 rounded-t-lg z-[5] pointer-events-none shadow-xs"
            style={{
              backgroundImage: 'linear-gradient(180deg, #b88651 0%, #9e6d3a 100%)'
            }}
          />

          {/* Fundo Interno / Parede Traseira da Caixa de Papelão (Z-0) */}
          <div 
            className="absolute top-20 sm:top-22 md:top-50 inset-x-0 bottom-0 bg-[#ab7a47] border-x-2 sm:border-x-[3px] border-t-2 sm:border-t-[3px] border-zinc-950 rounded-t-xl z-0 pointer-events-none overflow-hidden"
            style={{
              backgroundImage: `
                linear-gradient(180deg, #966533 0%, #b88651 40%, #a06e3b 100%),
                repeating-linear-gradient(90deg, rgba(0, 0, 0, 0.07) 0px, rgba(0, 0, 0, 0.07) 2px, transparent 2px, transparent 6px)
              `
            }}
          >
            {/* Sombra de profundidade e oclusão na cavidade da caixa */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/15 to-transparent pointer-events-none" />
          </div>

          {/* ----------------------------------------------------------------- */}
          {/* C. OS 7 CARDS COM TAMANHO AJUSTADO DENTRO DA CAIXA                */}
          {/* ----------------------------------------------------------------- */}
          <div className="relative z-10 w-full flex items-end justify-center -space-x-10 sm:-space-x-13 md:-space-x-16 lg:-space-x-19 translate-y-6 sm:translate-y-8">
            
            {/* ------------------------------------------------------------- */}
            {/* CARD 1: SOBRE MIM (#sobre) - BRANCO                           */}
            {/* ------------------------------------------------------------- */}
            <a
              href="#sobre"
              onClick={(e) => handleNavClick(e, 'sobre')}
              onMouseEnter={() => setHoveredCard('sobre')}
              onMouseLeave={() => setHoveredCard(null)}
              className={`relative shrink-0 w-30 sm:w-36 md:w-40 lg:w-44 h-54 sm:h-62 md:h-70 lg:h-78 bg-white text-zinc-950 rounded-xl p-3 sm:p-3.5 md:p-4 shadow-xl border-2 border-zinc-950 flex flex-col justify-between cursor-pointer transition-all duration-300 ease-out origin-bottom -rotate-9 sm:-rotate-10 ${
                hoveredCard === 'sobre' ? 'z-25 !-translate-y-14 sm:!-translate-y-18 !-rotate-2 shadow-2xl !scale-100' : 'z-10'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[8px] sm:text-[9px] font-bold tracking-widest text-zinc-500">01 // SOBRE</span>
                <div className="w-2.5 h-2.5 rounded-full bg-purple-600 border border-zinc-900" />
              </div>

              <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-22 md:h-22 mx-auto my-auto rounded-xl bg-zinc-50 border border-zinc-900 flex flex-col items-center justify-center p-1.5 shadow-inner">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-purple-600 text-white font-black text-xs sm:text-sm flex items-center justify-center mb-0.5 shadow-xs">
                  MS
                </div>
                <span className="font-mono text-[7px] sm:text-[8px] font-bold text-zinc-600 uppercase tracking-tight">UNB • DEV</span>
              </div>

              <div className="pt-2 border-t border-zinc-200 flex items-center justify-between">
                <div>
                  <span className="block font-mono text-[9px] sm:text-[10px] font-black uppercase tracking-tight">
                    {isPt ? 'SOBRE MIM' : 'ABOUT ME'}
                  </span>
                  <span className="block font-mono text-[7px] sm:text-[8px] text-zinc-500">
                    BIO & FOCO
                  </span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
              </div>
            </a>

            {/* ------------------------------------------------------------- */}
            {/* CARD 2: TRAJETÓRIA (#trajetoria) - CINZA CIMENTO              */}
            {/* ------------------------------------------------------------- */}
            <a
              href="#trajetoria"
              onClick={(e) => handleNavClick(e, 'trajetoria')}
              onMouseEnter={() => setHoveredCard('trajetoria')}
              onMouseLeave={() => setHoveredCard(null)}
              className={`relative shrink-0 w-32 sm:w-38 md:w-42 lg:w-46 h-56 sm:h-64 md:h-72 lg:h-80 bg-[#d8dce2] text-zinc-900 rounded-xl p-3 sm:p-3.5 md:p-4 shadow-xl border-2 border-zinc-400 flex flex-col justify-between cursor-pointer transition-all duration-300 ease-out origin-bottom -rotate-6 sm:-rotate-7 ${
                hoveredCard === 'trajetoria' ? 'z-25 !-translate-y-14 sm:!-translate-y-18 !-rotate-1 shadow-2xl !scale-100' : 'z-12'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[8px] sm:text-[9px] font-bold tracking-widest text-zinc-600">02 // CARREIRA</span>
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
              </div>

              <div className="space-y-0.5 font-serif font-black text-xs sm:text-sm text-zinc-800 leading-tight">
                <div>The</div>
                <div>Career</div>
                <div>Timeline:</div>
                <div className="font-normal italic text-zinc-600">A Journey</div>
              </div>

              <div className="w-14 h-14 sm:w-18 sm:h-18 mx-auto rounded-full border border-zinc-900 flex items-center justify-center my-auto">
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-900" />
              </div>

              <div className="pt-2 border-t border-zinc-400/30 flex items-center justify-between text-[9px] sm:text-[10px] font-mono font-bold text-zinc-700">
                <div>
                  <span className="block font-black uppercase">{isPt ? 'TRAJETÓRIA' : 'EXPERIENCE'}</span>
                  <span className="block text-[7px] sm:text-[8px] text-zinc-600">UNB & TRABALHOS</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600" />
              </div>
            </a>

            {/* ------------------------------------------------------------- */}
            {/* CARD 3: PROJETOS (#projetos) - VERDE ESMERALDA VIBRANTE       */}
            {/* ------------------------------------------------------------- */}
            <a
              href="#projetos"
              onClick={(e) => handleNavClick(e, 'projetos')}
              onMouseEnter={() => setHoveredCard('projetos')}
              onMouseLeave={() => setHoveredCard(null)}
              className={`relative shrink-0 w-32 sm:w-38 md:w-44 lg:w-48 h-58 sm:h-68 md:h-76 lg:h-84 bg-[#22c55e] text-white rounded-xl p-3 sm:p-3.5 md:p-4 shadow-xl border-2 border-emerald-600 flex flex-col justify-between cursor-pointer transition-all duration-300 ease-out origin-bottom -rotate-3 sm:-rotate-3.5 ${
                hoveredCard === 'projetos' ? 'z-25 !-translate-y-14 sm:!-translate-y-18 !rotate-0 shadow-2xl !scale-100' : 'z-14'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[8px] sm:text-[9px] font-bold tracking-widest text-emerald-100">03 // PROJETOS</span>
                <span className="font-mono text-[8px] bg-black/25 px-1 py-0.5 rounded font-black">6x REPOS</span>
              </div>

              <div className="space-y-0.5">
                <h3 className="text-xs sm:text-sm md:text-base font-black tracking-tight leading-tight">
                  Projetos &
                </h3>
                <h3 className="text-xs sm:text-sm md:text-base font-black tracking-tight leading-tight">
                  Repositórios
                </h3>
              </div>

              <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto my-auto flex items-center justify-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-white/50 flex items-center justify-center bg-black/15">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>

              <div className="pt-2 border-t border-white/20 flex items-center justify-between text-[9px] sm:text-[10px] font-mono font-bold">
                <div>
                  <span className="block font-black uppercase">{isPt ? 'REPOSITÓRIOS' : 'PROJECTS'}</span>
                  <span className="block text-[7px] sm:text-[8px] text-emerald-100">CÓDIGO & DEMOS</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-white" />
              </div>
            </a>

            {/* ------------------------------------------------------------- */}
            {/* CARD 4: ECOSSISTEMA / SKILLS (#skills) - AMARELO (CENTRO)     */}
            {/* ------------------------------------------------------------- */}
            <a
              href="#skills"
              onClick={(e) => handleNavClick(e, 'skills')}
              onMouseEnter={() => setHoveredCard('skills')}
              onMouseLeave={() => setHoveredCard(null)}
              className={`relative shrink-0 w-34 sm:w-40 md:w-46 lg:w-50 h-60 sm:h-70 md:h-78 lg:h-86 bg-[#fef08a] text-zinc-950 rounded-xl p-3 sm:p-3.5 md:p-4 shadow-2xl border-2 border-amber-400 flex flex-col justify-between cursor-pointer transition-all duration-300 ease-out origin-bottom rotate-0 ${
                hoveredCard === 'skills' ? 'z-25 !-translate-y-10 sm:!-translate-y-14 shadow-2xl !scale-100' : 'z-16'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[8px] sm:text-[9px] font-bold tracking-widest text-amber-900">04 // ECOSSISTEMA</span>
                <span className="font-mono text-[8px] bg-amber-400/60 px-1 py-0.5 rounded font-bold text-amber-950 border border-amber-500/30">
                  STACK
                </span>
              </div>

              <div className="space-y-0.5">
                <h3 className="text-xs sm:text-sm md:text-base font-black tracking-tight leading-none text-zinc-950">
                  Ecossistema
                </h3>
                <h3 className="text-xs sm:text-sm md:text-base font-black tracking-tight leading-none text-zinc-800">
                  & Tech Stack
                </h3>
              </div>

              <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto my-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-black/20 flex items-center justify-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-black/30 flex items-center justify-center">
                    <span className="font-mono text-[8px] sm:text-[9px] font-black text-amber-950">
                      ⚡ TECH
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-black/15 flex items-center justify-between text-[9px] sm:text-[10px] font-mono font-bold">
                <div>
                  <span className="block font-black uppercase">{isPt ? 'SKILLS & TECH' : 'SKILLS'}</span>
                  <span className="block text-[7px] sm:text-[8px] text-zinc-700">PYTHON • REACT • IA</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-900" />
              </div>
            </a>

            {/* ------------------------------------------------------------- */}
            {/* CARD 5: STATS & GITHUB (#stats) - VERDE MENTA / ESMERALDA      */}
            {/* ------------------------------------------------------------- */}
            <a
              href="#stats"
              onClick={(e) => handleNavClick(e, 'stats')}
              onMouseEnter={() => setHoveredCard('stats')}
              onMouseLeave={() => setHoveredCard(null)}
              className={`relative shrink-0 w-32 sm:w-38 md:w-44 lg:w-48 h-58 sm:h-68 md:h-76 lg:h-84 bg-[#a7f3d0] text-zinc-950 rounded-xl p-3 sm:p-3.5 md:p-4 shadow-xl border-2 border-emerald-600 flex flex-col justify-between cursor-pointer transition-all duration-300 ease-out origin-bottom rotate-3 sm:rotate-3.5 ${
                hoveredCard === 'stats' ? 'z-25 !-translate-y-14 sm:!-translate-y-18 !rotate-0 shadow-2xl !scale-100' : 'z-14'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[8px] sm:text-[9px] font-bold tracking-widest text-emerald-950">05 // STATS</span>
                <span className="font-mono text-[7px] sm:text-[8px] bg-emerald-600/20 px-1 py-0.5 rounded text-emerald-950 border border-emerald-600/40 font-bold">
                  GITHUB
                </span>
              </div>

              <div className="space-y-0.5">
                <div className="font-mono text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-emerald-950">
                  {isPt ? 'STATS & HEATMAP' : 'STATS & HEATMAP'}
                </div>
                <p className="text-[8px] sm:text-[9px] font-medium text-emerald-900/80 leading-tight">
                  {isPt ? 'Métricas & Atividade' : 'Metrics & Activity'}
                </p>
              </div>

              {/* Mini Heatmap Grid Visual */}
              <div className="w-16 h-14 sm:w-20 sm:h-16 mx-auto rounded-lg border border-emerald-600/35 bg-white/70 p-1.5 flex flex-col justify-center gap-1 my-auto shadow-inner">
                <div className="grid grid-cols-4 gap-1">
                  <div className="w-2.5 h-2.5 rounded-xs bg-emerald-200" />
                  <div className="w-2.5 h-2.5 rounded-xs bg-emerald-500" />
                  <div className="w-2.5 h-2.5 rounded-xs bg-emerald-400 animate-pulse" />
                  <div className="w-2.5 h-2.5 rounded-xs bg-emerald-600" />
                </div>
                <div className="grid grid-cols-4 gap-1">
                  <div className="w-2.5 h-2.5 rounded-xs bg-emerald-500" />
                  <div className="w-2.5 h-2.5 rounded-xs bg-emerald-700" />
                  <div className="w-2.5 h-2.5 rounded-xs bg-emerald-400" />
                  <div className="w-2.5 h-2.5 rounded-xs bg-emerald-300" />
                </div>
                <div className="grid grid-cols-4 gap-1">
                  <div className="w-2.5 h-2.5 rounded-xs bg-emerald-600" />
                  <div className="w-2.5 h-2.5 rounded-xs bg-emerald-400" />
                  <div className="w-2.5 h-2.5 rounded-xs bg-emerald-500" />
                  <div className="w-2.5 h-2.5 rounded-xs bg-emerald-200" />
                </div>
              </div>

              <div className="pt-2 border-t border-emerald-900/20 flex items-center justify-between text-[9px] sm:text-[10px] font-mono font-bold">
                <div>
                  <span className="block font-black uppercase text-emerald-950">{isPt ? 'ESTATÍSTICAS' : 'STATISTICS'}</span>
                  <span className="block text-[7px] sm:text-[8px] text-emerald-800">COMMITS & LANGS</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-emerald-950" />
              </div>
            </a>

            {/* ------------------------------------------------------------- */}
            {/* CARD 6: CURRÍCULO (#carta) - PRETO                             */}
            {/* ------------------------------------------------------------- */}
            <a
              href="#carta"
              onClick={(e) => handleNavClick(e, 'carta')}
              onMouseEnter={() => setHoveredCard('carta')}
              onMouseLeave={() => setHoveredCard(null)}
              className={`relative shrink-0 w-32 sm:w-38 md:w-42 lg:w-46 h-56 sm:h-64 md:h-72 lg:h-80 bg-[#18181b] text-white rounded-xl p-3 sm:p-3.5 md:p-4 shadow-xl border-2 border-zinc-700 flex flex-col justify-between cursor-pointer transition-all duration-300 ease-out origin-bottom rotate-6 sm:rotate-7 ${
                hoveredCard === 'carta' ? 'z-25 !-translate-y-14 sm:!-translate-y-18 !rotate-1 shadow-2xl !scale-100' : 'z-12'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[8px] sm:text-[9px] font-bold tracking-widest text-zinc-400">06 // CURRÍCULO</span>
                <span className="font-mono text-[7px] sm:text-[8px] bg-white/10 px-1 py-0.5 rounded text-zinc-300">
                  PDF / CARTA
                </span>
              </div>

              <div className="space-y-0.5">
                <div className="font-mono text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-yellow-300">
                  {isPt ? 'CURRÍCULO & CARTA' : 'RESUME & LETTER'}
                </div>
                <p className="text-[8px] sm:text-[9px] font-medium text-zinc-400 leading-tight">
                  Formação UnB & carta.
                </p>
              </div>

              <div className="w-14 h-14 sm:w-18 sm:h-18 mx-auto rounded-xl border border-zinc-700 bg-zinc-900 flex flex-col items-center justify-center my-auto p-1 shadow-inner">
                <div className="w-5 h-6 sm:w-6 sm:h-7 border border-zinc-500 rounded-xs flex flex-col items-center justify-center mb-0.5">
                  <span className="font-mono text-[6px] sm:text-[7px] font-bold text-zinc-300">DOC</span>
                </div>
                <span className="font-mono text-[6px] sm:text-[7px] text-zinc-400 font-bold uppercase">VER / BAIXAR</span>
              </div>

              <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-[9px] sm:text-[10px] font-mono font-bold">
                <div>
                  <span className="block font-black uppercase">{isPt ? 'CURRÍCULO' : 'RESUME'}</span>
                  <span className="block text-[7px] sm:text-[8px] text-zinc-500">EXPERIÊNCIA</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
              </div>
            </a>

            {/* ------------------------------------------------------------- */}
            {/* CARD 7: CONTATO (#contato) - AZUL ROYAL                        */}
            {/* ------------------------------------------------------------- */}
            <a
              href="#contato"
              onClick={(e) => handleNavClick(e, 'contato')}
              onMouseEnter={() => setHoveredCard('contato')}
              onMouseLeave={() => setHoveredCard(null)}
              className={`relative shrink-0 w-30 sm:w-36 md:w-40 lg:w-44 h-54 sm:h-62 md:h-70 lg:h-78 bg-[#1d4ed8] text-white rounded-xl p-3 sm:p-3.5 md:p-4 shadow-xl border-2 border-blue-400 flex flex-col justify-between cursor-pointer transition-all duration-300 ease-out origin-bottom rotate-9 sm:rotate-10 ${
                hoveredCard === 'contato' ? 'z-25 !-translate-y-14 sm:!-translate-y-18 !rotate-2 shadow-2xl !scale-100' : 'z-10'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[8px] sm:text-[9px] font-bold tracking-widest text-blue-200">07 // CONTATO</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              <div>
                <span className="font-mono text-[8px] sm:text-[9px] font-bold tracking-wider text-blue-200 block uppercase">
                  {isPt ? 'Fale Comigo' : 'Get in Touch'}
                </span>
                <span className="font-black text-xs sm:text-sm tracking-tight block mt-0.5">
                  {isPt ? 'Contato Direto' : 'Contact'}
                </span>
              </div>

              <div className="relative w-14 h-14 sm:w-18 sm:h-18 mx-auto my-auto flex items-center justify-center opacity-90">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-blue-200" strokeWidth="2.5">
                  <circle cx="50" cy="50" r="14" />
                  <circle cx="50" cy="50" r="26" />
                  <circle cx="50" cy="50" r="38" />
                </svg>
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-white absolute" />
              </div>

              <div className="pt-2 border-t border-white/20 flex items-center justify-between text-[9px] sm:text-[10px] font-mono font-bold">
                <div>
                  <span className="block font-black uppercase">{isPt ? 'CONTATO' : 'CONTACT'}</span>
                  <span className="block text-[7px] sm:text-[8px] text-blue-200">DISPONÍVEL</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-white" />
              </div>
            </a>

          </div>

          {/* ------------------------------------------------------------- */}
          {/* D. FRENTE DA CAIXA DE PAPELÃO (COBRINDO A BASE DOS CARDS Z-20)*/}
          {/* ------------------------------------------------------------- */}
          <div 
            className="relative z-20 w-full -mt-14 sm:-mt-18 md:-mt-22 bg-[#cca070] border-2 sm:border-[3px] border-zinc-950 rounded-b-xl shadow-[5px_5px_0px_rgba(24,24,27,1)] sm:shadow-[8px_8px_0px_rgba(24,24,27,1)] overflow-hidden"
            style={{
              backgroundImage: 'linear-gradient(178deg, #d4a775 0%, #c49662 45%, #b2834f 100%)'
            }}
          >
            {/* Textura de Linhas de Corrugação do Papelão */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage: 'repeating-linear-gradient(90deg, rgba(0, 0, 0, 0.08) 0px, rgba(0, 0, 0, 0.08) 2px, transparent 2px, transparent 6px)'
              }}
            />

            {/* Fita Adesiva Kraft Reforçada Transversal */}
            <div 
              className="absolute -top-3 right-6 sm:right-14 w-32 sm:w-44 h-6 sm:h-7 bg-amber-100/40 backdrop-blur-[1px] border-y border-amber-900/25 rotate-2 shadow-xs pointer-events-none flex items-center justify-center overflow-hidden z-10"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(45deg, rgba(146, 64, 14, 0.07) 0px, rgba(146, 64, 14, 0.07) 1px, transparent 1px, transparent 8px),
                  repeating-linear-gradient(-45deg, rgba(146, 64, 14, 0.07) 0px, rgba(146, 64, 14, 0.07) 1px, transparent 1px, transparent 8px)
                `
              }}
            >
              <span className="font-mono text-[8px] sm:text-[9px] font-black tracking-widest uppercase text-amber-950/70">
                SZERVINSK LABS • INSPECTED
              </span>
            </div>

            {/* Aba Frontal Dobrada para Frente/Baixo */}
            <div className="relative w-full bg-[#bf8e59] border-b-2 sm:border-b-[3px] border-zinc-950 px-3 sm:px-5 py-1.5 sm:py-2 flex items-center justify-between shadow-[0_3px_5px_rgba(0,0,0,0.12)]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse border border-zinc-950" />
                <span className="font-mono text-[9px] sm:text-[11px] font-black tracking-wider uppercase text-amber-950">
                  {isPt ? 'REMESSA DE SEÇÕES // ATALHOS INTERATIVOS' : 'SECTION DISPATCH // INTERACTIVE SHORTCUTS'}
                </span>
              </div>
              <div className="font-mono text-[9px] sm:text-[10px] font-black text-amber-950/80 tracking-widest">
                BOX #01
              </div>
            </div>

            {/* Painel Frontal Principal da Caixa */}
            <div className="relative p-3 sm:p-4 md:p-5 flex flex-col gap-3">
              
              {/* Alça Recortada Central da Caixa de Papelão (Die-cut handle) */}
              <div className="w-18 sm:w-24 h-4.5 sm:h-5.5 rounded-full bg-gradient-to-b from-[#180b03] to-[#2d1508] border-2 border-zinc-950 mx-auto shadow-[inset_0_3px_6px_rgba(0,0,0,0.85)] flex items-center justify-center">
                <div className="w-12 sm:w-16 h-1 rounded-full bg-zinc-800/40" />
              </div>

              {/* Grid Interno: Etiqueta de Envio + Carimbos Postais */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-1">
                
                {/* Etiqueta de Envio Postal Neo-Brutalista */}
                <div className="w-full sm:w-auto bg-white border-2 border-zinc-950 p-2 sm:p-2.5 rounded-md shadow-[2px_2px_0px_rgba(24,24,27,1)] -rotate-1 flex items-center gap-3">
                  {/* Código de Barras SVG */}
                  <svg viewBox="0 0 100 32" className="w-18 sm:w-22 h-6 text-zinc-950 fill-current shrink-0">
                    <rect x="0" y="0" width="3" height="32" />
                    <rect x="5" y="0" width="1" height="32" />
                    <rect x="8" y="0" width="4" height="32" />
                    <rect x="15" y="0" width="2" height="32" />
                    <rect x="19" y="0" width="1" height="32" />
                    <rect x="23" y="0" width="4" height="32" />
                    <rect x="30" y="0" width="2" height="32" />
                    <rect x="34" y="0" width="1" height="32" />
                    <rect x="38" y="0" width="3" height="32" />
                    <rect x="44" y="0" width="2" height="32" />
                    <rect x="48" y="0" width="4" height="32" />
                    <rect x="55" y="0" width="1" height="32" />
                    <rect x="58" y="0" width="3" height="32" />
                    <rect x="64" y="0" width="2" height="32" />
                    <rect x="68" y="0" width="5" height="32" />
                    <rect x="76" y="0" width="1" height="32" />
                    <rect x="80" y="0" width="3" height="32" />
                    <rect x="86" y="0" width="2" height="32" />
                    <rect x="91" y="0" width="4" height="32" />
                    <rect x="97" y="0" width="3" height="32" />
                  </svg>
                  
                  {/* Dados da Remessa */}
                  <div className="font-mono text-[9px] leading-tight text-zinc-900 border-l border-zinc-200 pl-2">
                    <div className="font-black uppercase tracking-wider text-[10px]">
                      TRACKING: #SZ-2026-DEV
                    </div>
                    <div className="text-zinc-600 font-medium">
                      FROM: szervinsk • UnB Lab
                    </div>
                    <div className="text-zinc-500 font-medium text-[8px]">
                      DEST: 7 Seções do Portfólio
                    </div>
                  </div>
                </div>

                {/* Carimbos Postais no Papelão */}
                <div className="flex flex-wrap items-center justify-center sm:justify-end gap-1.5 sm:gap-2">
                  {/* Carimbo Vermelho FRÁGIL */}
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 border-2 border-red-700/85 text-red-700 font-mono font-black text-[9px] tracking-wider uppercase -rotate-2 bg-red-700/5 rounded shadow-xs select-none">
                    <span>⚠️</span>
                    <span>FRÁGIL // HANDLE WITH CARE</span>
                  </div>

                  {/* Carimbo Este Lado para Cima */}
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 border border-amber-950/70 text-amber-950 font-mono font-bold text-[8px] tracking-wider uppercase bg-amber-950/5 rounded select-none">
                    <span>⬆️ ⬆️</span>
                    <span>ESTE LADO P/ CIMA</span>
                  </div>

                  {/* Carimbo 100% Reciclado */}
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 border border-amber-950/70 text-amber-950 font-mono font-bold text-[8px] tracking-wider uppercase bg-amber-950/5 rounded select-none">
                    <span>♻️</span>
                    <span>100% OPEN SOURCE</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Sombra de Contato da Caixa no Chão */}
          <div className="w-[80%] h-3.5 bg-zinc-950/20 blur-md rounded-full -mt-2 z-10" />

        </div>

      </div>
    </section>
  );
}