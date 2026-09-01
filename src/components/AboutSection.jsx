import React from 'react';
import { ShieldCheck, Cpu, Code2, Sparkles, ArrowUpRight } from 'lucide-react';
import { useTiltCard } from '../hooks/useParallax';
import { useLanguage } from '../context/LanguageContext';

function AboutCard({ icon: Icon, title, desc, tag, colorBg, footerText }) {
  const { cardRef, tilt, handleMouseMove, handleMouseLeave } = useTiltCard(5);

  const style = {
    transform: tilt.isHovered
      ? `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(1.01, 1.01, 1.01)`
      : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    transition: 'transform 0.15s ease-out',
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={`p-5 sm:p-6 rounded-3xl border-2 border-zinc-950 ${colorBg} shadow-[4px_4px_0px_rgba(24,24,27,1)] relative flex flex-col justify-between group`}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-xl bg-white border border-zinc-950 shadow-[2px_2px_0px_rgba(24,24,27,1)] flex items-center justify-center text-zinc-950 group-hover:rotate-6 transition-transform">
            <Icon className="w-4.5 h-4.5" />
          </div>
          <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-white/90 border border-zinc-950/30 text-zinc-900 shadow-2xs">
            {tag}
          </span>
        </div>

        <h3 className="text-lg sm:text-xl font-black text-zinc-950 mb-2 tracking-tight">
          {title}
        </h3>
        <p className="text-zinc-800 text-xs sm:text-sm leading-relaxed font-medium">
          {desc}
        </p>
      </div>

      <div className="mt-5 pt-3 border-t border-zinc-950/10 flex items-center text-[11px] font-bold text-zinc-950">
        <span className="group-hover:translate-x-1 transition-transform flex items-center gap-1">
          {footerText} <ArrowUpRight className="w-3 h-3" />
        </span>
      </div>
    </div>
  );
}

export default function AboutSection() {
  const { t } = useLanguage();
  const content = t.atuacoes || t.about;
  const icons = [Code2, Cpu, ShieldCheck];
  const bgColors = ['bg-[#e0f2fe]', 'bg-[#dcfce7]', 'bg-[#ffedd5]'];

  return (
    <section id="atuacoes" className="snap-section min-h-screen py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#fdfbf7] relative z-20 border-t-2 border-zinc-950/10 flex flex-col justify-center">
      <div className="max-w-5xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-zinc-900 bg-yellow-200 shadow-[2.5px_2.5px_0px_rgba(24,24,27,1)] text-[11px] font-bold text-zinc-900 mb-3">
            <Sparkles className="w-3 h-3 fill-zinc-900" />
            <span>{content.badge}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-zinc-950 leading-[1.08] tracking-tight">
            {content.titleMain} <br />
            {content.titleSub} <span className="font-serif italic font-normal text-zinc-800 bg-[#a4c9ff] px-2.5 py-0.5 rounded-2xl border-2 border-zinc-900 shadow-[2.5px_2.5px_0px_rgba(24,24,27,1)] inline-block -rotate-1">{content.titleItalic}</span>
          </h2>

          <p className="mt-3.5 text-xs sm:text-sm text-zinc-700 font-medium leading-relaxed max-w-xl mx-auto">
            {content.description}
          </p>
        </div>

        {/* 3-Column Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {content.cards?.map((card, idx) => (
            <AboutCard
              key={card.title}
              icon={icons[idx]}
              title={card.title}
              desc={card.desc}
              tag={card.tag}
              colorBg={bgColors[idx]}
              footerText={content.cardFooter}
            />
          ))}
        </div>

        {/* Metrics Banner */}
        <div className="mt-8 bg-white border-2 border-zinc-950 rounded-2xl p-5 sm:p-6 shadow-[4px_4px_0px_rgba(24,24,27,1)] grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {content.metrics?.map((m) => (
            <div key={m.label}>
              <div className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight">
                {m.value}
              </div>
              <div className="text-[11px] sm:text-xs font-bold text-zinc-600 mt-0.5">
                {m.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
