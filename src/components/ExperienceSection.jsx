import React, { useState } from 'react';
import { 
  Briefcase, 
  BookOpen, 
  Terminal, 
  Code2, 
  Sparkles, 
  Layers,
  CheckCircle2,
  Calendar,
  Zap,
  ArrowRight,
  Info
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ExperienceSection() {
  const { t, language } = useLanguage();
  const isPt = language === 'pt';
  const [activeNodeId, setActiveNodeId] = useState('transoft');
  const [hoveredNodeId, setHoveredNodeId] = useState(null);

  const milestones = [
    {
      id: 'unb',
      year: '2023 - 2028',
      shortYear: '2023',
      role: isPt ? 'Graduando em Engenharia de Software' : 'B.S. in Software Engineering',
      company: 'Universidade de Brasília (UnB)',
      badge: isPt ? 'Formação Acadêmica' : 'Academic Education',
      desc: isPt 
        ? 'Jornada na UnB (FGA) focada em modelagem de sistemas, arquitetura de microsserviços, requisitos e algoritmos.'
        : 'Software Engineering degree at UnB focusing on microservices, requirements, and clean algorithms.',
      skills: ['Eng. de Software', 'Docker', 'PostgreSQL', 'Scrum & Jira'],
      icon: BookOpen,
      iconColor: '#10b981',
      badgeBg: 'bg-emerald-100 text-emerald-950 border-emerald-300',
      dotColor: 'bg-emerald-500',
      cardBorder: 'hover:border-emerald-500',
      glow: 'shadow-[4px_4px_0px_rgba(16,185,129,1)]'
    },
    {
      id: 'caesb',
      year: '2024 - 2025',
      shortYear: '2024 - 2025',
      role: isPt ? 'Desenvolvedor / Automação Python' : 'Python Automation Developer',
      company: 'Caesb',
      badge: isPt ? 'Inovação & IA' : 'Innovation & AI',
      desc: isPt
        ? 'Scripts em Python para automação, triagem e extração OCR via API sob estrita conformidade com a LGPD (redução de 94% de tempo).'
        : 'Python automation for OCR document parsing and API batching under strict data privacy compliance.',
      skills: ['Python', 'OCR & Extração', 'Automação', 'LGPD', 'FastAPI'],
      icon: Terminal,
      iconColor: '#f43f5e',
      badgeBg: 'bg-rose-100 text-rose-950 border-rose-300',
      dotColor: 'bg-rose-500',
      cardBorder: 'hover:border-rose-500',
      glow: 'shadow-[4px_4px_0px_rgba(244,63,94,1)]'
    },
    {
      id: 'transoft',
      year: '2025 - Presente',
      shortYear: '2025 - Hoje',
      role: isPt ? 'Desenvolvedor Full Stack' : 'Full Stack Developer',
      company: 'Transoft',
      badge: isPt ? 'Atuação Atual' : 'Current Role',
      desc: isPt
        ? 'Sustentação e criação de módulos corporativos com PHP (Laravel), AngularJS, Webhooks assíncronos e PostgreSQL.'
        : 'Developing enterprise modules with PHP (Laravel), AngularJS, asynchronous Webhooks, and PostgreSQL.',
      skills: ['PHP (Laravel)', 'AngularJS', 'REST APIs', 'Webhooks', 'PostgreSQL'],
      icon: Code2,
      iconColor: '#8b5cf6',
      badgeBg: 'bg-violet-100 text-violet-950 border-violet-300',
      dotColor: 'bg-violet-500',
      cardBorder: 'hover:border-violet-500',
      glow: 'shadow-[4px_4px_0px_rgba(139,92,246,1)]'
    },
    {
      id: 'future',
      year: '2026+',
      shortYear: '2026+',
      role: isPt ? 'Aguardando por novas oportunidades' : 'Open to New Opportunities',
      company: isPt ? 'Novos Desafios' : 'Next Chapter',
      badge: isPt ? 'Disponível para Contratação' : 'Available for Hire',
      desc: isPt
        ? 'Pronto para atuar em times de engenharia, projetos Cloud (AWS/GCP), microsserviços, automações e desenvolvimento de alto impacto.'
        : 'Ready to contribute in high-performance software engineering teams, Cloud systems, and backend development.',
      skills: ['Cloud & Linux', 'Microsserviços', 'Backend Python/Laravel', 'Docker'],
      icon: Sparkles,
      iconColor: '#eab308',
      badgeBg: 'bg-yellow-100 text-yellow-950 border-yellow-300',
      dotColor: 'bg-yellow-400',
      cardBorder: 'hover:border-yellow-500',
      glow: 'shadow-[4px_4px_0px_rgba(234,179,8,1)]'
    }
  ];

  const currentDisplayNode = milestones.find((m) => m.id === (hoveredNodeId || activeNodeId)) || milestones[2];

  return (
    <section 
      id="trajetoria" 
      className="snap-section min-h-screen py-16 sm:py-24 px-4 sm:px-6 lg:px-10 bg-[#faf8f5] relative z-20 border-t-2 border-zinc-950/10 flex flex-col justify-center items-center"
    >
      <div className="max-w-[86rem] mx-auto w-full">
        
        {/* Header Centralizado */}
        <div className="w-full flex flex-col items-center justify-center text-center max-w-2xl mx-auto mb-10 sm:mb-12 relative z-30 px-4">
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
              ? 'Marcos contínuos ao longo da minha trajetória na Engenharia de Software, automações e desenvolvimento.' 
              : 'Continuous milestones along my Software Engineering, automations, and development path.'}
          </p>
        </div>

        {/* --- TIMELINE HORIZONTAL COM LINHA RETA GROSSA (DESKTOP) --- */}
        <div className="hidden lg:block relative my-6">
          
          {/* 1. LINHA RETA GROSSA (Barra horizontal contínua de ponta a ponta) */}
          <div className="relative w-full h-4 bg-zinc-950 rounded-full border-2 border-zinc-950 shadow-[3px_3px_0px_rgba(0,0,0,0.2)] mb-8 flex items-center">
            {/* Faixa decorativa interna */}
            <div className="w-full h-1.5 bg-gradient-to-r from-emerald-400 via-violet-400 to-yellow-400 rounded-full mx-1 opacity-75" />
          </div>

          {/* 2. GRADE DE 4 MARCOS ALINHADOS HORIZONTALMENTE COM NÓS E CARDS */}
          <div className="grid grid-cols-4 gap-5 items-start">
            {milestones.map((node) => {
              const isSelected = activeNodeId === node.id;
              const isHovered = hoveredNodeId === node.id;
              const isHighlighted = isSelected || isHovered;

              return (
                <div 
                  key={node.id} 
                  className="flex flex-col items-center group cursor-pointer"
                  onClick={() => setActiveNodeId(node.id)}
                  onMouseEnter={() => setHoveredNodeId(node.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                >
                  
                  {/* Nó / Ponto Central da Linha */}
                  <div className="relative -mt-12 mb-5 z-20 flex flex-col items-center">
                    <div 
                      className={`w-12 h-12 rounded-2xl border-2 border-zinc-950 flex items-center justify-center transition-all ${
                        isHighlighted 
                          ? 'bg-yellow-300 shadow-[4px_4px_0px_rgba(0,0,0,1)] scale-110 -translate-y-1' 
                          : 'bg-white shadow-[2px_2px_0px_rgba(0,0,0,1)] group-hover:scale-105'
                      }`}
                    >
                      <node.icon className="w-5 h-5" style={{ color: node.iconColor }} />
                    </div>

                    {/* Badge de Ano logo abaixo do Nó */}
                    <span className="mt-2 text-[11px] font-mono font-black text-zinc-900 bg-zinc-100 px-2 py-0.5 rounded-md border border-zinc-300">
                      {node.shortYear}
                    </span>
                  </div>

                  {/* Card / Tooltip com Dados do Marco */}
                  <div 
                    className={`w-full bg-white p-4 sm:p-5 rounded-2xl border-2 transition-all text-left flex flex-col justify-between min-h-[260px] ${
                      isHighlighted
                        ? `border-zinc-950 ${node.glow} -translate-y-1 bg-amber-50/20`
                        : 'border-zinc-300 shadow-[2px_2px_0px_rgba(24,24,27,0.1)] group-hover:border-zinc-950 group-hover:shadow-[3px_3px_0px_rgba(0,0,0,1)]'
                    }`}
                  >
                    <div>
                      {/* Top Bar do Card */}
                      <div className="flex items-center justify-between gap-1.5 mb-2.5">
                        <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border ${node.badgeBg}`}>
                          {node.badge}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-zinc-500">
                          {node.year}
                        </span>
                      </div>

                      {/* Cargo e Empresa */}
                      <h3 className="text-xs font-black text-zinc-950 leading-snug mb-0.5">
                        {node.role}
                      </h3>
                      <p className="text-[11px] font-bold text-zinc-600 mb-2">
                        {node.company}
                      </p>

                      {/* Descrição Curta */}
                      <p className="text-[11px] text-zinc-600 leading-relaxed line-clamp-3 mb-3">
                        {node.desc}
                      </p>
                    </div>

                    {/* Tags / Stack */}
                    <div className="pt-2 border-t border-zinc-100 flex flex-wrap gap-1">
                      {node.skills.map((s) => (
                        <span 
                          key={s} 
                          className="text-[9px] font-mono font-bold bg-zinc-100 text-zinc-700 px-1.5 py-0.5 rounded border border-zinc-200"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

        {/* --- VERSÃO MOBILE / TABLET (EMPILHAMENTO COM LINHA LATERAL GROSSA) --- */}
        <div className="block lg:hidden relative pl-6 space-y-6">
          {/* Linha grossa vertical para mobile */}
          <div className="absolute left-2 top-2 bottom-2 w-2.5 bg-zinc-950 rounded-full" />

          {milestones.map((node) => (
            <div key={node.id} className="relative pl-5">
              {/* Ponto central */}
              <div className="absolute -left-4.5 top-3 w-8 h-8 rounded-xl bg-white border-2 border-zinc-950 flex items-center justify-center shadow-xs">
                <node.icon className="w-4 h-4" style={{ color: node.iconColor }} />
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-zinc-950 shadow-[3px_3px_0px_rgba(24,24,27,1)] text-left">
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
                <p className="text-xs font-bold text-zinc-600 mb-2">
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