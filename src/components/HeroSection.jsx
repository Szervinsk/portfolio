import React, { useState } from 'react';
import { ArrowDown, ArrowUpRight, Mail } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { siteConfig } from '../content/siteConfig';
import { useLanguage } from '../context/LanguageContext';

export default function HeroSection({ onSelectProject, onOpenProject }) {
  const { language } = useLanguage();
  const isPt = language === 'pt';
  const [hoveredBook, setHoveredBook] = useState(null);

  const handleBookClick = (projectId) => {
    const handler = onSelectProject || onOpenProject;
    if (handler && projectId) {
      handler(projectId);
    } else {
      document.getElementById('projetos')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="snap-section relative min-h-screen w-full flex flex-col justify-center items-center bg-emerald-300 text-zinc-950 select-none overflow-hidden mb-0"
      style={{
        backgroundColor: '#5ee9b040',
        backgroundImage: `
          radial-gradient(ellipse 60% 40% at 50% 25%, rgba(250, 204, 21, 0.08) 0%, transparent 70%),
          linear-gradient(rgba(24, 24, 27, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(24, 24, 27, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '100% 100%, 32px 32px, 32px 32px'
      }}
    >
      {/* ======================================================================= */}
      {/* 1. ELEMENTOS CENTRALIZADOS NO TOPO / MEIO (ATÉ ~70% DA PÁGINA)          */}
      {/* ======================================================================= */}
      <div className="relative z-20 w-full max-w-3xl mx-auto text-center flex flex-col items-center pt-40 sm:pt-24 md:pt-28 px-4">
        
        {/* Badge Superior: Promovendo o Repositório do GitHub */}
        <a
          href={siteConfig.socials.github}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border-2 border-zinc-950 bg-white hover:bg-zinc-50 transition-all text-zinc-900 mb-4 shadow-[2px_2px_0px_rgba(24,24,27,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_rgba(24,24,27,1)] cursor-pointer"
        >
          <GithubIcon className="w-3.5 h-3.5 text-zinc-950 group-hover:scale-110 transition-transform" />
          <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-wider uppercase">
            github.com/szervinsk
          </span>
          <ArrowUpRight className="w-3 h-3 text-zinc-400 group-hover:text-zinc-950 transition-colors" />
        </a>

        {/* Título Principal Editorial Fiel à Estrutura da Referência */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-zinc-950 tracking-tight leading-[1.12]">
          <div>{isPt ? 'One Stop Software' : 'One Stop Software'}</div>
          <div className="flex items-center justify-center gap-2 sm:gap-3.5 mt-0.5 sm:mt-1">
            <span>{isPt ? 'Repository' : 'Repository'}</span>
            <span className="text-zinc-700 font-medium">
              {isPt ? 'for Engineers.' : 'for Engineers.'}
            </span>
          </div>
        </h1>

        {/* Subtítulo Promovendo os Repositórios e Códigos */}
        <p className="mt-3.5 text-xs sm:text-sm text-zinc-600 font-medium max-w-lg mx-auto leading-relaxed">
          {isPt 
            ? 'Coleção open-source de sistemas full stack, automações de dados em Python e arquiteturas com IA na UnB.' 
            : 'Open-source collection of production full stack apps, Python data pipelines, and AI engineering architectures.'}
        </p>

        {/* Botões de Ação para Explorar Repositórios */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#projetos"
            className="inline-flex items-center gap-2 bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-full shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>{isPt ? 'Explorar Repositórios' : 'View Repositories'}</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </a>

          <a
            href="#contato"
            className="inline-flex items-center gap-2 bg-white hover:bg-zinc-50 text-zinc-950 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full border-2 border-zinc-950 shadow-[2px_2px_0px_rgba(24,24,27,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_rgba(24,24,27,1)] transition-all cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5 text-zinc-950" />
            <span>{isPt ? 'Entrar em Contato' : 'Contact Me'}</span>
            <ArrowUpRight className="w-3 h-3 text-zinc-400" />
          </a>
        </div>

      </div>

      {/* ======================================================================= */}
      {/* 2. BLOCO INFERIOR: LEQUE DE LIVROS + BORDA + DIV BRANCA DE TRANSIÇÃO    */}
      {/* ======================================================================= */}
      <div className="w-full flex flex-col items-center mt-auto">
        <div className="relative w-full flex items-end justify-center pointer-events-auto overflow-hidden border-b-2 border-black">
        
        {/* Container das Capas dos Repositórios Sobrepostas */}
        <div className="relative flex items-end justify-center -space-x-8 sm:-space-x-12 md:-space-x-14 translate-y-12 sm:translate-y-16 md:translate-y-20">
          
          {/* ------------------------------------------------------------- */}
          {/* LIVRO 1: BLACK VINYL & GRAPHIC (ETL / DATA ENGINE)           */}
          {/* ------------------------------------------------------------- */}
          <div
            onMouseEnter={() => setHoveredBook('core-data')}
            onMouseLeave={() => setHoveredBook(null)}
            onClick={() => handleBookClick('salvadocs')}
            className={`relative shrink-0 w-38 sm:w-46 md:w-52 h-64 sm:h-74 md:h-84 bg-zinc-950 text-white rounded-xl p-3.5 sm:p-4 shadow-xl border-2 border-zinc-800 flex flex-col justify-between cursor-pointer transition-all duration-300 ease-out -rotate-12 ${
              hoveredBook === 'core-data' ? 'z-40 -translate-y-12 !rotate-[-4deg] shadow-2xl !scale-105' : 'z-10'
            }`}
          >
            {/* Header Técnico */}
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] font-bold tracking-widest text-zinc-400">REPO / 01</span>
              <div className="flex gap-0.5">
                <div className="w-1.5 h-3 bg-white rounded-xs" />
                <div className="w-1.5 h-3 bg-zinc-600 rounded-xs" />
              </div>
            </div>

            {/* Arte Central de Círculos / Discos de Dados */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-full border-2 border-zinc-700 flex items-center justify-center my-auto">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-zinc-600 flex items-center justify-center">
                <div className="w-5 h-5 rounded-full bg-white" />
              </div>
            </div>

            {/* Rodapé do Livro com Repositório */}
            <div className="pt-2 border-t border-zinc-800 flex items-center justify-between">
              <div>
                <span className="block font-mono text-[10px] sm:text-[11px] font-black uppercase tracking-tight">
                  DATA & ETL ENGINE
                </span>
                <span className="block font-mono text-[8px] text-zinc-500">
                  PYTHON • SCRAPING
                </span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* LIVRO 2: CEMENT GREY "The Engineering Act" (Rick Rubin Style) */}
          {/* ------------------------------------------------------------- */}
          <div
            onMouseEnter={() => setHoveredBook('creative-act')}
            onMouseLeave={() => setHoveredBook(null)}
            onClick={() => handleBookClick('salvadocs')}
            className={`relative shrink-0 w-40 sm:w-48 md:w-54 h-68 sm:h-78 md:h-88 bg-[#d8dce2] text-zinc-900 rounded-xl p-3.5 sm:p-4 shadow-xl border-2 border-zinc-300 flex flex-col justify-between cursor-pointer transition-all duration-300 ease-out -rotate-6 ${
              hoveredBook === 'creative-act' ? 'z-40 -translate-y-12 !rotate-[-1deg] shadow-2xl !scale-105' : 'z-20'
            }`}
          >
            {/* Tipografia Editorial Inspirada no Livro de Rick Rubin */}
            <div className="space-y-0.5 font-serif font-black text-xs sm:text-sm text-zinc-800 leading-tight">
              <div>The</div>
              <div>Engineering</div>
              <div>Act:</div>
              <div className="font-normal italic text-zinc-600">A Way</div>
              <div className="font-normal italic text-zinc-600">of Building</div>
            </div>

            {/* Círculo Central Minimalista */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full border-2 border-zinc-900 flex items-center justify-center my-auto">
              <div className="w-2 h-2 rounded-full bg-zinc-900" />
            </div>

            {/* Identificação do Autor */}
            <div className="pt-2 border-t border-zinc-400/30 flex items-center justify-between text-[10px] font-mono font-bold text-zinc-700">
              <span>CLEAN ARCHITECTURE</span>
              <span>UnB</span>
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* LIVRO 3: YELLOW "Designing Brand Identity" (PARTICIPE+)       */}
          {/* ------------------------------------------------------------- */}
          <div
            onMouseEnter={() => setHoveredBook('participemais')}
            onMouseLeave={() => setHoveredBook(null)}
            onClick={() => handleBookClick('participemais')}
            className={`relative shrink-0 w-42 sm:w-50 md:w-56 h-72 sm:h-82 md:h-92 bg-[#fde047] text-zinc-950 rounded-xl p-4 sm:p-5 shadow-xl border-2 border-amber-400 flex flex-col justify-between cursor-pointer transition-all duration-300 ease-out -rotate-2 ${
              hoveredBook === 'participemais' ? 'z-40 -translate-y-12 !rotate-[0deg] shadow-2xl !scale-105' : 'z-30'
            }`}
          >
            {/* Título do Livro Amarelo */}
            <div className="space-y-0.5">
              <h3 className="text-sm sm:text-base md:text-lg font-black tracking-tight leading-none">
                Designing
              </h3>
              <h3 className="text-sm sm:text-base md:text-lg font-black tracking-tight leading-none">
                Civic AI &
              </h3>
              <h3 className="text-sm sm:text-base md:text-lg font-black tracking-tight leading-none text-zinc-800">
                Identity
              </h3>
            </div>

            {/* Padrão Halftone / Círculo Circular da Capa */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto my-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-black/20 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full border border-black/30 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-black/10" />
                </div>
              </div>
              <span className="font-mono text-[9px] font-bold text-zinc-800 z-10 bg-yellow-300/90 px-1.5 py-0.5 rounded border border-black/10">
                PARTICIPE+
              </span>
            </div>

            {/* Rodapé do Repositório */}
            <div className="pt-2 border-t border-black/15 flex items-center justify-between text-[10px] font-mono font-bold">
              <div>
                <span className="block">CIVIC NLP & GOVTECH</span>
                <span className="block text-[8px] text-zinc-700">DJANGO • LANGCHAIN</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* LIVRO 4: WHITE "how to" (SALVADOCS - O MAIS ALTO / CENTRO)    */}
          {/* ------------------------------------------------------------- */}
          <div
            onMouseEnter={() => setHoveredBook('salvadocs')}
            onMouseLeave={() => setHoveredBook(null)}
            onClick={() => handleBookClick('salvadocs')}
            className={`relative shrink-0 w-44 sm:w-52 md:w-58 h-76 sm:h-86 md:h-96 bg-white text-zinc-950 rounded-xl p-4 sm:p-5 shadow-2xl border-2 border-zinc-200 flex flex-col justify-between cursor-pointer transition-all duration-300 ease-out rotate-1 ${
              hoveredBook === 'salvadocs' ? 'z-40 -translate-y-12 !rotate-[0deg] shadow-2xl !scale-105' : 'z-40'
            }`}
          >
            {/* Tipografia Massiva "how to" (Estilo Michael Bierut) */}
            <div className="space-y-0">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter leading-[0.88] text-zinc-950">
                how
              </h2>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter leading-[0.88] text-zinc-950">
                to
              </h2>
            </div>

            {/* Subtítulo Descritivo da Aplicação */}
            <p className="text-[10px] sm:text-[11px] font-medium text-zinc-600 leading-tight pr-2 my-auto">
              use AI & Python to automate complex document pipelines, extract data and streamline operations.
            </p>

            {/* Rodapé da Capa com Identificação do Repositório */}
            <div className="pt-2.5 border-t border-zinc-200 flex items-center justify-between">
              <div>
                <span className="block font-mono text-[10px] sm:text-[11px] font-black tracking-tight">
                  SALVADOCS
                </span>
                <span className="block font-mono text-[8px] text-zinc-400">
                  GEMINI API • ELECTRON
                </span>
              </div>
              <div className="w-6 h-6 rounded-full bg-zinc-950 text-white flex items-center justify-center shadow-xs">
                <ArrowUpRight className="w-3 h-3" />
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* LIVRO 5: GREEN "VIRGIL ABLOH" (Atrás do Centro-Direita)       */}
          {/* ------------------------------------------------------------- */}
          <div
            onMouseEnter={() => setHoveredBook('virgil-card')}
            onMouseLeave={() => setHoveredBook(null)}
            className={`relative shrink-0 w-36 sm:w-42 md:w-46 h-56 sm:h-64 md:h-72 bg-[#22c55e] text-white rounded-xl p-3.5 shadow-lg flex flex-col justify-between cursor-pointer transition-all duration-300 ease-out rotate-8 ${
              hoveredBook === 'virgil-card' ? 'z-40 -translate-y-12 !rotate-[2deg] shadow-2xl !scale-105' : 'z-20'
            }`}
          >
            <div className="space-y-1 font-mono text-[10px] sm:text-[11px] font-black uppercase tracking-wider">
              <div>UNB 2026</div>
              <div className="bg-black/25 px-1 py-0.5 rounded inline-block">"OPEN SOURCE"</div>
              <div>FULL STACK</div>
              <div className="text-[8px] opacity-80">VIRGIL ABLOH STYLE</div>
            </div>

            <div className="font-mono text-[9px] font-bold opacity-80 pt-2 border-t border-white/20 flex items-center justify-between">
              <span>GITHUB PROFILE</span>
              <ArrowUpRight className="w-3 h-3" />
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* LIVRO 6: FUCHSIA / PINK "Paula Scher: Works" (UNBOOK)         */}
          {/* ------------------------------------------------------------- */}
          <div
            onMouseEnter={() => setHoveredBook('unbook')}
            onMouseLeave={() => setHoveredBook(null)}
            onClick={() => handleBookClick('unbook')}
            className={`relative shrink-0 w-40 sm:w-48 md:w-54 h-66 sm:h-76 md:h-86 bg-[#ec4899] text-white rounded-xl p-3.5 sm:p-4 shadow-xl border-2 border-pink-400 flex flex-col justify-between cursor-pointer transition-all duration-300 ease-out rotate-14 ${
              hoveredBook === 'unbook' ? 'z-40 -translate-y-12 !rotate-[5deg] shadow-2xl !scale-105' : 'z-15'
            }`}
          >
            {/* Header do Livro Rosa */}
            <div>
              <span className="font-mono text-[9px] sm:text-[10px] font-bold tracking-wider opacity-90 block">
                Paula Scher: Works
              </span>
              <span className="font-black text-xs sm:text-sm tracking-tight block mt-0.5">
                UnBook Marketplace
              </span>
            </div>

            {/* Ondas / Anéis Concêntricos em SVG Fiel à Imagem de Referência */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto my-auto flex items-center justify-center opacity-85">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-white" strokeWidth="2.5">
                <circle cx="50" cy="50" r="15" />
                <circle cx="50" cy="50" r="28" />
                <circle cx="50" cy="50" r="40" />
                <circle cx="50" cy="50" r="48" opacity="0.6" />
              </svg>
            </div>

            {/* Rodapé do Livro */}
            <div className="pt-2 border-t border-white/20 flex items-center justify-between text-[10px] font-mono font-bold">
              <div>
                <span className="block">SOCKET.IO REALTIME</span>
                <span className="block text-[8px] opacity-80">REACT & NODE.JS</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>

        </div>

      </div>

        {/* Div Branca imediatamente colada na borda preta (sem gap / sem margin) */}
        <div className="w-full bg-white py-6 sm:py-8 md:py-10 px-4 sm:px-8">
          <div className="max-w-5xl mx-auto flex items-center justify-between font-mono text-xs text-zinc-900">
            <div className="flex items-center gap-2 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-zinc-700">
                {isPt ? '• 06 Repositórios & Estudos' : '• 06 Repositories & Studies'}
              </span>
            </div>

            <a 
              href="#sobre" 
              className="flex items-center gap-1.5 font-bold text-[11px] text-zinc-500 hover:text-zinc-950 transition-colors cursor-pointer group"
            >
              <span>{isPt ? 'Conhecer Trajetória' : 'Explore Journey'}</span>
              <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
            </a>

            <span className="text-[10px] sm:text-xs font-bold text-zinc-400">
              #00_INDEX
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}