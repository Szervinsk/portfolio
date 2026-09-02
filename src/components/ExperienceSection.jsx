import React, { useState } from 'react';
import { 
  Briefcase, 
  BookOpen, 
  Terminal, 
  Code2, 
  Cpu,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ExperienceSection() {
  const { t, language } = useLanguage();
  const isPt = language === 'pt';
  const [activeNodeId, setActiveNodeId] = useState('ailab');
  const [hoveredNodeId, setHoveredNodeId] = useState(null);

  const milestones = [
    {
      id: 'unb',
      year: '2023 - 2028',
      shortYear: '2023',
      role: isPt ? 'Graduando em Engenharia de Software' : 'B.S. in Software Engineering',
      company: 'Universidade de Brasília (UnB)',
      badge: isPt ? 'Formação Acadêmica' : 'Academic Degree',
      desc: isPt 
        ? 'Base sólida em modelagem de sistemas, microsserviços, requisitos e algoritmos na FGA.'
        : 'Solid foundation in systems modeling, microservices, requirements, and algorithms at FGA.',
      skills: ['Eng. de Software', 'PostgreSQL', 'Docker', 'Scrum & Jira'],
      icon: BookOpen,
      iconColor: '#10b981',
      badgeBg: 'bg-emerald-100 text-emerald-950 border-emerald-300',
      glow: 'shadow-[3px_3px_0px_rgba(16,185,129,1)]',
      position: 'top'
    },
    {
      id: 'caesb',
      year: '2024 - 2025',
      shortYear: '2024 - 2025',
      role: isPt ? 'Dev / Automação Python' : 'Python Automation Dev',
      company: 'Caesb',
      badge: isPt ? 'Inovação & IA' : 'Innovation & AI',
      desc: isPt
        ? 'Rotinas em Python para OCR, triagem de dados e extração estruturada de documentos sob a LGPD.'
        : 'Python routines for OCR, data triage, and structured document parsing under LGPD compliance.',
      skills: ['Python', 'OCR & Extração', 'Automação', 'LGPD', 'FastAPI'],
      icon: Terminal,
      iconColor: '#f43f5e',
      badgeBg: 'bg-rose-100 text-rose-950 border-rose-300',
      glow: 'shadow-[3px_3px_0px_rgba(244,63,94,1)]',
      position: 'bottom'
    },
    {
      id: 'transoft',
      year: '2025 - Presente',
      shortYear: '2025 - Hoje',
      role: isPt ? 'Desenvolvedor Full Stack' : 'Full Stack Developer',
      company: 'Transoft',
      badge: isPt ? 'Atuação Profissional' : 'Professional Role',
      desc: isPt
        ? 'Sustentação de módulos ERP corporativos, Webhooks assíncronos e otimização de queries relacionais.'
        : 'Enterprise ERP modules, asynchronous Webhooks, and relational query optimizations.',
      skills: ['PHP (Laravel)', 'AngularJS', 'REST APIs', 'Webhooks', 'MySQL'],
      icon: Code2,
      iconColor: '#8b5cf6',
      badgeBg: 'bg-violet-100 text-violet-950 border-violet-300',
      glow: 'shadow-[3px_3px_0px_rgba(139,92,246,1)]',
      position: 'top'
    },
    {
      id: 'ailab',
      year: '2026 - Presente',
      shortYear: '2026',
      role: isPt ? 'Pesquisador / Desenvolvedor de IA' : 'AI Researcher & Developer',
      company: 'AI LAB • UnB',
      badge: isPt ? 'Laboratório de IA' : 'AI Laboratory',
      desc: isPt
        ? 'Pesquisa e desenvolvimento de soluções baseadas em IA generativa, NLP e automação voltadas ao impacto social e comunitário.'
        : 'R&D of generative AI, NLP, and automation tools engineered for community assistance and public social impact.',
      skills: ['LLMs & NLP', 'Python', 'LangChain', 'Open Source', 'Social Impact'],
      icon: Cpu,
      iconColor: '#0ea5e9',
      badgeBg: 'bg-sky-100 text-sky-950 border-sky-300',
      glow: 'shadow-[3px_3px_0px_rgba(14,165,233,1)]',
      position: 'bottom'
    },
    {
      id: 'future',
      year: '2026+',
      shortYear: 'Futuro',
      role: isPt ? 'Novas Oportunidades' : 'Open to Opportunities',
      company: isPt ? 'Próximos Desafios' : 'Next Chapter',
      badge: isPt ? 'Disponível' : 'Available',
      desc: isPt
        ? 'Pronto para atuar em times de engenharia, sistemas em Cloud, microsserviços e desenvolvimento de alto impacto.'
        : 'Ready to contribute in high-performance software engineering teams, Cloud systems, and backend development.',
      skills: ['Cloud & Linux', 'Microsserviços', 'Arquitetura', 'Docker'],
      icon: Sparkles,
      iconColor: '#eab308',
      badgeBg: 'bg-yellow-100 text-yellow-950 border-yellow-300',
      glow: 'shadow-[3px_3px_0px_rgba(234,179,8,1)]',
      position: 'top'
    }
  ];

  return (
    <section 
      id="trajetoria" 
      className="snap-section min-h-screen py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-[#faf8f5] relative z-20 border-t-2 border-zinc-950/10 flex flex-col justify-center items-center"
    >
      <div className="max-w-[90rem] mx-auto w-full">
        
        {/* Header Centralizado */}
        <div className="w-full flex flex-col items-center justify-center text-center max-w-2xl mx-auto mb-8 sm:mb-10 relative z-30 px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-zinc-900 bg-white shadow-[2px_2px_0px_rgba(24,24,27,1)] text-[11px] font-black uppercase tracking-widest text-zinc-900 mb-3">
            <Briefcase className="w-3.5 h-3.5 text-zinc-900" />
            <span>{t.experience?.badge || 'Carreira & Formação'}</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight leading-tight mb-2">
            {isPt ? 'Linha do' : 'Career'}{' '}
            <span className="bg-[#fef08a] px-2.5 py-0.5 rounded-xl border-2 border-zinc-900 shadow-[2.5px_2.5px_0px_rgba(24,24,27,1)] inline-block -rotate-1.5 hover:rotate-0 transition-transform">
              {isPt ? 'Tempo' : 'Timeline'}
            </span>
          </h2>
          
          <p className="text-zinc-600 font-medium text-xs sm:text-sm max-w-lg leading-relaxed">
            {isPt 
              ? 'Marcos contínuos ao longo da minha trajetória na Engenharia de Software, automações e pesquisa em IA.' 
              : 'Milestones across Software Engineering, automations, and applied AI research.'}
          </p>
        </div>

        {/* --- DESKTOP: TIMELINE CENTRAL COM CARDS ALTERNADOS (TOP / BOTTOM) --- */}
        <div className="hidden lg:block relative w-full my-4">
          
          {/* Linha Central Contínua */}
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-3.5 bg-zinc-950 rounded-full border-2 border-zinc-950 shadow-[2px_2px_0px_rgba(0,0,0,0.15)] z-10 flex items-center">
            <div className="w-full h-1 bg-gradient-to-r from-emerald-400 via-sky-400 to-yellow-400 rounded-full mx-1 opacity-80" />
          </div>

          {/* Grid de 5 colunas */}
          <div className="grid grid-cols-5 gap-3 relative z-20 items-center">
            {milestones.map((node) => {
              const isTop = node.position === 'top';
              const isSelected = activeNodeId === node.id;
              const isHovered = hoveredNodeId === node.id;
              const isHighlighted = isSelected || isHovered;

              return (
                <div 
                  key={node.id} 
                  className="flex flex-col items-center justify-center min-h-[460px] group cursor-pointer"
                  onClick={() => setActiveNodeId(node.id)}
                  onMouseEnter={() => setHoveredNodeId(node.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                >
                  
                  {/* Card no Topo (se position === 'top') */}
                  <div className={`w-full flex flex-col justify-end transition-all duration-200 ${isTop ? 'opacity-100 pointer-events-auto mb-2' : 'opacity-0 pointer-events-none'}`}>
                    <div 
                      className={`bg-white p-3.5 rounded-xl border-2 transition-all text-left flex flex-col justify-between h-[195px] ${
                        isHighlighted && isTop
                          ? `border-zinc-950 ${node.glow} -translate-y-1 bg-amber-50/15`
                          : 'border-zinc-300 shadow-[2px_2px_0px_rgba(24,24,27,0.08)] group-hover:border-zinc-950 group-hover:shadow-[3px_3px_0px_rgba(0,0,0,1)]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-1.5">
                          <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${node.badgeBg}`}>
                            {node.badge}
                          </span>
                          <span className="text-[10px] font-mono font-bold text-zinc-500">
                            {node.year}
                          </span>
                        </div>

                        <h3 className="text-xs font-black text-zinc-950 leading-tight mb-0.5 truncate">
                          {node.role}
                        </h3>
                        <p className="text-[11px] font-bold text-zinc-600 mb-1.5 truncate">
                          {node.company}
                        </p>

                        <p className="text-[11px] text-zinc-600 leading-snug line-clamp-3">
                          {node.desc}
                        </p>
                      </div>

                      <div className="pt-1.5 border-t border-zinc-100 flex flex-wrap gap-1">
                        {node.skills.slice(0, 3).map((s) => (
                          <span key={s} className="text-[8.5px] font-mono font-bold bg-zinc-100 text-zinc-700 px-1 py-0.5 rounded border border-zinc-200">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Nó / Marcador Central sobre a linha */}
                  <div className="relative z-30 flex flex-col items-center my-1">
                    <div 
                      className={`w-11 h-11 rounded-xl border-2 border-zinc-950 flex items-center justify-center transition-all duration-200 ${
                        isHighlighted 
                          ? 'bg-yellow-300 shadow-[3px_3px_0px_rgba(0,0,0,1)] scale-110' 
                          : 'bg-white shadow-[2px_2px_0px_rgba(0,0,0,1)] group-hover:scale-105'
                      }`}
                    >
                      <node.icon className="w-5 h-5" style={{ color: node.iconColor }} />
                    </div>

                    <span className="mt-1 text-[10px] font-mono font-black text-zinc-900 bg-white px-1.5 py-0.2 rounded border border-zinc-300 shadow-xs">
                      {node.shortYear}
                    </span>
                  </div>

                  {/* Card Embaixo (se position === 'bottom') */}
                  <div className={`w-full flex flex-col justify-start transition-all duration-200 ${!isTop ? 'opacity-100 pointer-events-auto mt-2' : 'opacity-0 pointer-events-none'}`}>
                    <div 
                      className={`bg-white p-3.5 rounded-xl border-2 transition-all text-left flex flex-col justify-between h-[195px] ${
                        isHighlighted && !isTop
                          ? `border-zinc-950 ${node.glow} translate-y-1 bg-amber-50/15`
                          : 'border-zinc-300 shadow-[2px_2px_0px_rgba(24,24,27,0.08)] group-hover:border-zinc-950 group-hover:shadow-[3px_3px_0px_rgba(0,0,0,1)]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-1.5">
                          <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${node.badgeBg}`}>
                            {node.badge}
                          </span>
                          <span className="text-[10px] font-mono font-bold text-zinc-500">
                            {node.year}
                          </span>
                        </div>

                        <h3 className="text-xs font-black text-zinc-950 leading-tight mb-0.5 truncate">
                          {node.role}
                        </h3>
                        <p className="text-[11px] font-bold text-zinc-600 mb-1.5 truncate">
                          {node.company}
                        </p>

                        <p className="text-[11px] text-zinc-600 leading-snug line-clamp-3">
                          {node.desc}
                        </p>
                      </div>

                      <div className="pt-1.5 border-t border-zinc-100 flex flex-wrap gap-1">
                        {node.skills.slice(0, 3).map((s) => (
                          <span key={s} className="text-[8.5px] font-mono font-bold bg-zinc-100 text-zinc-700 px-1 py-0.5 rounded border border-zinc-200">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* --- MOBILE / TABLET: TIMELINE VERTICAL --- */}
        <div className="block lg:hidden relative pl-6 space-y-4">
          <div className="absolute left-2 top-2 bottom-2 w-2.5 bg-zinc-950 rounded-full" />

          {milestones.map((node) => (
            <div key={node.id} className="relative pl-5">
              <div className="absolute -left-4.5 top-3 w-8 h-8 rounded-xl bg-white border-2 border-zinc-950 flex items-center justify-center shadow-xs">
                <node.icon className="w-4 h-4" style={{ color: node.iconColor }} />
              </div>

              <div className="bg-white p-4 rounded-xl border-2 border-zinc-950 shadow-[3px_3px_0px_rgba(24,24,27,1)] text-left">
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-md border ${node.badgeBg}`}>
                    {node.badge}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-zinc-500">
                    {node.year}
                  </span>
                </div>

                <h3 className="text-xs sm:text-sm font-black text-zinc-950 leading-snug">
                  {node.role}
                </h3>
                <p className="text-xs font-bold text-zinc-600 mb-1.5">
                  {node.company}
                </p>

                <p className="text-xs text-zinc-600 leading-relaxed mb-3">
                  {node.desc}
                </p>

                <div className="flex flex-wrap gap-1 pt-2 border-t border-zinc-100">
                  {node.skills.map((s) => (
                    <span key={s} className="text-[9px] font-mono font-bold bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded border border-zinc-200">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}