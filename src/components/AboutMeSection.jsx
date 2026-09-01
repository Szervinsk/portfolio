import React from 'react';
import { 
  ArrowUpRight, 
  FileText, 
  ShieldCheck, 
  GraduationCap, 
  Terminal, 
  Sparkles 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function AboutMeSection() {
  const { t } = useLanguage();
  const content = t.aboutMe || t.about;

  return (
    <section id="sobre" className="snap-section relative min-h-screen w-full flex items-center justify-center py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#f5f3ff] overflow-hidden border-t-2 border-zinc-950/10">
      
      {/* Grid decorativo de fundo estilo scrapbook */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-dot-pattern" />
      <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center relative z-10">
        
        {/* --- COLUNA ESQUERDA: APRESENTAÇÃO & TEXTOS --- */}
        <div className="lg:col-span-6 flex flex-col items-start text-left">
          
          {/* Badge de Topo */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-zinc-900 bg-white shadow-[2.5px_2.5px_0px_rgba(24,24,27,1)] text-[11px] font-mono font-bold text-zinc-900 mb-4 animate-pop-in">
            <Terminal className="w-3.5 h-3.5 text-purple-600" />
            <span>{content.badge}</span>
          </div>

          {/* Título Editorial com Destaque Fluido */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-zinc-950 tracking-tight leading-[1.04] mb-4">
            {content.titleMain}{' '}
            <span className="font-serif italic font-normal bg-[#bef264] px-2.5 py-0.5 rounded-2xl border-2 border-zinc-900 shadow-[2.5px_2.5px_0px_rgba(24,24,27,1)] inline-block -rotate-1">
              {content.titleHighlight}
            </span>{' '}
            <br className="hidden sm:inline" />
            {content.titleEnd}
          </h2>

          {/* Descrição Principal */}
          <p className="text-sm sm:text-base text-zinc-700 font-medium leading-relaxed max-w-lg mb-6">
            {content.description}
          </p>

          {/* Ações / Botões */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <a
              href="#contato"
              className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl border-2 border-zinc-900 shadow-[3px_3px_0px_rgba(24,24,27,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_rgba(24,24,27,1)] transition-all"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{content.btnPrimary}</span>
            </a>

            <a
              href="#trajetoria"
              className="flex items-center gap-2 bg-white hover:bg-zinc-50 text-zinc-900 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl border-2 border-zinc-900 shadow-[3px_3px_0px_rgba(24,24,27,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_rgba(24,24,27,1)] transition-all"
            >
              <span>{content.btnSecondary}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Micro-Card Inferior com Métrica */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/90 border-2 border-zinc-900 shadow-[2.5px_2.5px_0px_rgba(24,24,27,1)] max-w-sm">
            <div className="w-9 h-9 rounded-xl bg-purple-200 border-2 border-zinc-900 flex items-center justify-center font-black text-xs text-zinc-900">
              <Sparkles className="w-4 h-4 text-purple-700" />
            </div>
            <div>
              <p className="font-black text-xs sm:text-sm text-zinc-950 leading-tight">
                {content.metricStat}
              </p>
              <p className="text-[11px] font-mono text-zinc-600 font-medium">
                {content.metricLabel}
              </p>
            </div>
          </div>

        </div>

        {/* --- COLUNA DIREITA: COMPOSIÇÃO VISUAL COM FOTO E CARDS --- */}
        <div className="lg:col-span-6 relative flex items-center justify-center mt-4 lg:mt-0">
          
          {/* Selo Circular Giratório */}
          <div className="absolute -top-6 -right-2 sm:-right-4 w-20 h-20 z-30 pointer-events-none hidden sm:flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-purple-300 border-2 border-zinc-950 flex items-center justify-center relative shadow-[2.5px_2.5px_0px_rgba(24,24,27,1)] animate-[spin_16s_linear_infinite]">
              <svg className="w-full h-full absolute inset-0" viewBox="0 0 100 100">
                <path
                  id="circlePath"
                  d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                  fill="none"
                />
                <text className="text-[9.5px] font-black uppercase tracking-widest fill-zinc-950">
                  <textPath href="#circlePath" startOffset="0%">
                    {content.stampText}
                  </textPath>
                </text>
              </svg>
              <div className="w-7 h-7 rounded-full bg-white border-2 border-zinc-950 flex items-center justify-center text-[10px] font-black text-zinc-900">
                MS
              </div>
            </div>
          </div>

          {/* --- MOLDURA PRINCIPAL COM EFEITO POP-OUT --- */}
          <div className="relative w-64 sm:w-72 md:w-80 h-80 sm:h-[370px] rounded-[2rem] border-3 border-zinc-950 shadow-[6px_6px_0px_rgba(24,24,27,1)] bg-gradient-to-b from-[#bef264] to-[#d8b4fe] flex items-end justify-center group">
            
            {/* Foto vazando para fora do topo (Pop-Out) */}
            <img 
              src="/assets/images/eu.png" 
              alt="Foto de Matheus Szervinsk" 
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-auto h-[115%] sm:h-[122%] max-w-none object-contain pointer-events-none filter drop-shadow-[0_10px_16px_rgba(0,0,0,0.18)] group-hover:scale-105 transition-transform duration-500 ease-out z-10"
            />

            <div className="absolute inset-0 rounded-[1.8rem] overflow-hidden pointer-events-none" />
          </div>

          {/* --- CARD FLUTUANTE 1: Topo Esquerdo (Métricas / Impacto) --- */}
          <div className="absolute -left-2 sm:-left-12 top-2 bg-white p-3 rounded-2xl border-2 border-zinc-950 shadow-[4px_4px_0px_rgba(24,24,27,1)] z-20 flex items-center gap-2.5 animate-float-slow">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 border border-zinc-900 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <p className="font-black text-xs text-zinc-950 leading-tight">
                {content.badgeLgpdTitle}
              </p>
              <p className="text-[10px] font-mono text-zinc-500 font-medium">
                {content.badgeLgpdDesc}
              </p>
            </div>
          </div>

          {/* --- CARD FLUTUANTE 2: Meio Direito (Formação Acadêmica) --- */}
          <div className="absolute -right-2 sm:-right-6 top-1/2 -translate-y-1/2 bg-white p-3 rounded-2xl border-2 border-zinc-950 shadow-[4px_4px_0px_rgba(24,24,27,1)] z-20 max-w-[190px] animate-float-fast">
            <div className="flex items-center gap-1.5 mb-1">
              <GraduationCap className="w-3.5 h-3.5 text-purple-600" />
              <span className="font-black text-[11px] text-zinc-950">{content.badgeCardTitle}</span>
            </div>
            <p className="text-[10px] text-zinc-600 font-medium leading-tight">
              {content.badgeCardDesc}
            </p>
          </div>

          {/* --- CARD FLUTUANTE 3: Rodapé Centro/Direita --- */}
          <div className="absolute -bottom-4 sm:-bottom-6 left-4 sm:left-8 bg-white p-3.5 rounded-2xl border-2 border-zinc-950 shadow-[5px_5px_0px_rgba(24,24,27,1)] z-20 flex items-center justify-between gap-4 min-w-[200px] animate-float-slow">
            <div>
              <p className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider">
                {content.badgeExpDesc}
              </p>
              <p className="text-base sm:text-lg font-black text-zinc-950">
                Full Stack & Python
              </p>
            </div>
            <span className="text-xl font-black text-amber-500 font-mono">
              {content.badgeExp}
            </span>
          </div>

        </div>

      </div>

    </section>
  );
}