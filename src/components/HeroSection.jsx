import React from 'react';
import { ArrowDown, ArrowUpRight, ShieldCheck, Cpu, Code2 } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { siteConfig } from '../content/siteConfig';
import { useMouseParallax, useScrollProgress } from '../hooks/useParallax';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin } from '../context/AdminContext';

export default function HeroSection() {
  const mousePosition = useMouseParallax(0.06);
  const { scrollY } = useScrollProgress();
  const { t } = useLanguage();
  const { isAdmin, setIsLoginModalOpen } = useAdmin();

  const calcParallax = (depthX, depthY, scrollFactor = 0) => {
    const x = mousePosition.x * depthX;
    const y = mousePosition.y * depthY - scrollY * scrollFactor;
    return `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
  };

  return (
    <section id="hero" className="snap-section relative min-h-screen w-full flex flex-col items-center justify-center pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-designer-grid overflow-hidden">
      
      {/* --- BLURRED DYNAMIC GRADIENT BACKGROUND BLOBS --- */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-0">
        
        {/* Glow Central Verde-Limão (Morph + Ciclo de Cores) */}
        <div 
          className="absolute transition-transform duration-500 ease-out will-change-transform"
          style={{ transform: calcParallax(16, 16, 0.12) }}
        >
          <div className="w-[420px] h-[420px] sm:w-[600px] sm:h-[600px] lg:w-[750px] lg:h-[750px] bg-[#bef264] opacity-75 blur-[100px] animate-blob-morph-1 will-change-transform" />
        </div>

        {/* Glow Superior Ciano / Menta */}
        <div 
          className="absolute -top-16 -right-20 transition-transform duration-300 ease-out will-change-transform"
          style={{ transform: calcParallax(-20, -20, 0.18) }}
        >
          <div className="w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] bg-[#a5f3fc] opacity-65 blur-[90px] animate-blob-morph-2 will-change-transform" />
        </div>

        {/* Glow Inferior Amarelo / Destaque Quente */}
        <div 
          className="absolute -bottom-20 -left-16 transition-transform duration-400 ease-out will-change-transform"
          style={{ transform: calcParallax(22, 22, 0.08) }}
        >
          <div className="w-[340px] h-[340px] sm:w-[460px] sm:h-[460px] bg-[#fef08a] opacity-80 blur-[90px] animate-blob-morph-3 will-change-transform" />
        </div>
      </div>

      {/* --- HERO MAIN CONTENT --- */}
      <div 
        className="relative z-10 w-full max-w-3xl mx-auto text-center flex flex-col items-center transition-transform duration-200 ease-out px-4"
        style={{ transform: calcParallax(-8, -8, 0.08) }}
      >
        
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border-2 border-zinc-900 bg-white/95 backdrop-blur-sm shadow-[2.5px_2.5px_0px_rgba(24,24,27,1)] text-[11px] font-mono text-zinc-800 mb-5 animate-pop-in">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>{t.hero.statusBadge}</span>
          <span className="text-zinc-300">|</span>
          <span className="text-zinc-600">{t.hero.statusLoc}</span>
        </div>

        {/* High-Impact Editorial Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-zinc-950 leading-[0.96] select-none">
          {t.hero.titleWhat} <br />
          <span className="font-serif italic font-normal text-3xl sm:text-4xl md:text-5xl text-zinc-800">
            {t.hero.titleMyPortfolio}
          </span> <br />
          <span className="relative inline-block mt-2.5 group">
            <span className="absolute inset-0 bg-zinc-900 rounded-2xl translate-x-1 translate-y-1"></span>
            <span className="relative z-10 block rounded-2xl border-2 border-zinc-950 bg-[#cffafe] px-5 sm:px-8 py-1 sm:py-1.5 text-3xl sm:text-5xl md:text-6xl tracking-tighter text-zinc-950 group-hover:-rotate-1 group-hover:-translate-y-0.5 transition-all cursor-crosshair">
              {t.hero.titleReallyIs}
            </span>
          </span>
        </h1>

        {/* Subtitle / Value Proposition */}
        <p className="mt-5 sm:mt-6 text-sm sm:text-base text-zinc-800 font-medium max-w-xl mx-auto leading-relaxed">
          {t.hero.description}
        </p>

        {/* Action Buttons */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:gap-3.5">
          <a
            href="#projetos"
            className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl border-2 border-zinc-900 shadow-[3px_3px_0px_rgba(24,24,27,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_rgba(24,24,27,1)] transition-all"
          >
            <span>{t.hero.btnProjects}</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </a>

          <a
            href="#contato"
            className="flex items-center gap-2 bg-[#fef08a] hover:bg-[#fde047] text-zinc-900 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl border-2 border-zinc-900 shadow-[3px_3px_0px_rgba(24,24,27,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_rgba(24,24,27,1)] transition-all"
          >
            <span>{t.hero.btnContact}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          <a
            href={siteConfig.socials.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-white hover:bg-zinc-50 text-zinc-900 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl border-2 border-zinc-900 shadow-[3px_3px_0px_rgba(24,24,27,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_rgba(24,24,27,1)] transition-all"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>{t.hero.btnGithub}</span>
          </a>
        </div>

        {/* Highlights micro-pills */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-[11px] font-mono text-zinc-900">
          <span className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-zinc-900/30 shadow-2xs font-medium">
            <Code2 className="w-3 h-3 text-zinc-900" />
            {t.hero.pill1}
          </span>
          <span className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-zinc-900/30 shadow-2xs font-medium">
            <Cpu className="w-3 h-3 text-zinc-900" />
            {t.hero.pill2}
          </span>
          <span className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-zinc-900/30 shadow-2xs font-medium">
            <ShieldCheck className="w-3 h-3 text-zinc-900" />
            {t.hero.pill3}
          </span>
        </div>

      </div>

      {/* Floating Scroll Down Indicator */}
      <div 
        className="mt-8 flex flex-col items-center gap-1 cursor-pointer z-10 transition-opacity duration-300"
        style={{ opacity: Math.max(1 - scrollY / 200, 0) }}
        onClick={() => {
          document.getElementById('sobre')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-600 font-bold">
          {t.hero.scrollPrompt}
        </span>
        <div className="w-4 h-7 rounded-full border-2 border-zinc-800 flex items-start justify-center p-0.5 shadow-[1.5px_1.5px_0px_rgba(24,24,27,1)] bg-white">
          <div className="w-1 h-1.5 bg-zinc-800 rounded-full animate-bounce mt-0.5" />
        </div>
      </div>
    </section>
  );
}