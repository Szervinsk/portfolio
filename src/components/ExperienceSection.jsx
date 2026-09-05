import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  BookOpen, 
  Terminal, 
  Code2, 
  Cpu,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  X,
  MapPin,
  Calendar,
  CheckCircle2,
  Camera
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ExperienceSection() {
  const { t, language } = useLanguage();
  const isPt = language === 'pt';
  const [activeNodeId, setActiveNodeId] = useState('ailab');
  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const milestones = [
    {
      id: 'unb',
      year: '2023 - 2028',
      shortYear: '2023',
      openSide: 'right', // Abre na direita para não tapar o card da esquerda
      role: isPt ? 'Graduando em Engenharia de Software' : 'B.S. in Software Engineering',
      company: 'Universidade de Brasília (UnB)',
      location: 'Campus Gama (FGA) • Brasília, DF',
      badge: isPt ? 'Formação Acadêmica' : 'Academic Degree',
      shortDesc: isPt 
        ? 'Base sólida em modelagem de sistemas, microsserviços, requisitos e algoritmos na FGA.'
        : 'Solid foundation in systems modeling, microservices, requirements, and algorithms at FGA.',
      fullDesc: isPt
        ? 'Desenvolvimento de uma formação científica e prática profunda em Engenharia de Software no campus FGA da UnB. O curso enfatiza a construção de software sustentável através do ciclo de vida completo: especificação formal de requisitos, modelagem arquitetural, implementação orientada a objetos, banco de dados relacionais e testes automatizados.'
        : 'Deep scientific and practical training in Software Engineering at UnB FGA campus. The degree focuses on sustainable software architecture across the full lifecycle: formal requirements, architectural modeling, OOP implementation, relational databases, and automated testing.',
      highlights: isPt ? [
        'Modelagem e arquitetura de sistemas orientados a serviços (SOA)',
        'Simulação de ciclos corporativos reais com Scrum, Kanban e Git Flow',
        'Conteinerização de ambientes de desenvolvimento com Docker',
        'Resolução de problemas algorítmicos complexos e estruturas de dados'
      ] : [
        'Service-Oriented Architecture (SOA) and systems modeling',
        'Real-world software engineering lifecycles using Scrum, Kanban & Git Flow',
        'Environment containerization and reproducibility with Docker',
        'Complex algorithmic problem solving and advanced data structures'
      ],
      skills: ['Eng. de Software', 'PostgreSQL', 'Docker', 'Scrum & Jira', 'Git Flow', 'Arquitetura SOA', 'Algoritmos'],
      icon: BookOpen,
      iconColor: '#10b981',
      badgeBg: 'bg-emerald-100 text-emerald-950 border-emerald-300',
      glow: 'shadow-[3px_3px_0px_rgba(16,185,129,1)]',
      position: 'top',
      photos: [
        {
          url: '/assets/images/unbook1.jpeg',
          caption: isPt ? 'Projetos e vivência prática na Engenharia de Software • UnB' : 'Engineering projects and practical work at UnB'
        }
      ]
    },
    {
      id: 'caesb',
      year: '2024 - 2025',
      shortYear: '2024 - 2025',
      openSide: 'right', // Abre na direita para não tapar o card da esquerda
      role: isPt ? 'Dev / Automação Python' : 'Python Automation Dev',
      company: 'Caesb',
      location: 'Brasília, DF',
      badge: isPt ? 'Inovação & IA' : 'Innovation & AI',
      shortDesc: isPt
        ? 'Rotinas em Python para OCR, triagem de dados e extração estruturada de documentos sob a LGPD.'
        : 'Python routines for OCR, data triage, and structured document parsing under LGPD compliance.',
      fullDesc: isPt
        ? 'Liderei a orquestração e implementação de scripts avançados em Python focados na automação de triagem massiva de documentos. O projeto transformou processos burocráticos manuais que levavam dias em rotinas automáticas executadas em segundos, aplicando OCR de alta precisão e conformidade irrestrita à LGPD (Privacy by Design).'
        : 'Led the orchestration and deployment of advanced Python automations for massive document triage. Transformed manual processes that took days into automated routines running in seconds, integrating high-accuracy OCR and strict compliance with privacy standards (LGPD / Privacy by Design).',
      highlights: isPt ? [
        'Automação de triagem e indexação de milhares de documentos via OCR',
        'Estruturação de pipelines de dados em conformidade absoluta com a LGPD',
        'Sanitização e mascaramento automático de dados sensíveis (PII)',
        'Construção de APIs e microsserviços em FastAPI para integração interna'
      ] : [
        'Automated document indexing and extraction via OCR pipelines',
        'Built secure data pipelines under strict privacy compliance (LGPD)',
        'Automated PII data masking and sanitization routines',
        'Engineered lightweight FastAPI microservices for internal system integration'
      ],
      skills: ['Python', 'OCR & Extração', 'FastAPI', 'LGPD & Compliance', 'Automação', 'Pandas', 'Pipelines'],
      icon: Terminal,
      iconColor: '#f43f5e',
      badgeBg: 'bg-rose-100 text-rose-950 border-rose-300',
      glow: 'shadow-[3px_3px_0px_rgba(244,63,94,1)]',
      position: 'bottom',
      photos: [
        {
          url: '/assets/images/salva1.jpeg',
          caption: isPt ? 'Rotinas automatizadas de processamento e sanitização de dados' : 'Automated data processing and sanitization routines'
        }
      ]
    },
    {
      id: 'transoft',
      year: '2025 - Presente',
      shortYear: '2025 - Hoje',
      openSide: 'right', // Abre na direita para manter o card visível
      role: isPt ? 'Desenvolvedor Full Stack' : 'Full Stack Developer',
      company: 'Transoft',
      location: 'Brasília, DF',
      badge: isPt ? 'Atuação Profissional' : 'Professional Role',
      shortDesc: isPt
        ? 'Sustentação de módulos ERP corporativos, Webhooks assíncronos e otimização de queries relacionais.'
        : 'Enterprise ERP modules, asynchronous Webhooks, and relational query optimizations.',
      fullDesc: isPt
        ? 'Atuação como Desenvolvedor Full Stack na sustentação e evolução contínua de módulos centrais de um ERP corporativo de alta criticidade. Foco especial no desacoplamento de rotinas síncronas pesadas utilizando Webhooks assíncronos e filas de mensagens, desenvolvimento de APIs RESTful robustas em PHP/Laravel e modernização da interface em AngularJS.'
        : 'Full Stack Developer sustaining and evolving core modules of an enterprise ERP system. Focused on decoupling heavy synchronous routines using asynchronous Webhooks and message queues, developing robust RESTful APIs in PHP/Laravel, and modernizing user workflows with AngularJS and React.',
      highlights: isPt ? [
        'Sustentação e evolução de módulos ERP corporativos com alta volumetria',
        'Desacoplamento de rotinas síncronas via Webhooks assíncronos e filas',
        'Refatoração e otimização de consultas pesadas em bancos MySQL/PostgreSQL',
        'Desenvolvimento de endpoints RESTful seguros e documentados'
      ] : [
        'Sustained and evolved mission-critical enterprise ERP modules',
        'Decoupled synchronous business logic using asynchronous Webhooks',
        'Refactored and optimized complex relational queries in MySQL/PostgreSQL',
        'Developed clean, secure, and documented RESTful API endpoints'
      ],
      skills: ['PHP (Laravel)', 'AngularJS', 'REST APIs', 'Webhooks', 'MySQL', 'PostgreSQL', 'Otimização SQL'],
      icon: Code2,
      iconColor: '#8b5cf6',
      badgeBg: 'bg-violet-100 text-violet-950 border-violet-300',
      glow: 'shadow-[3px_3px_0px_rgba(139,92,246,1)]',
      position: 'top',
      photos: [
        {
          url: '/assets/images/part1.jpeg',
          caption: isPt ? 'Sustentação de módulos corporativos de faturamento e mensageria' : 'Enterprise ERP modules and asynchronous communication'
        }
      ]
    },
    {
      id: 'ailab',
      year: '2026 - Presente',
      shortYear: '2026',
      openSide: 'left', // Abre na esquerda para não tapar o card da direita!
      role: isPt ? 'Pesquisador / Desenvolvedor de IA' : 'AI Researcher & Developer',
      company: 'AI LAB • UnB',
      location: 'Laboratório de IA • UnB',
      badge: isPt ? 'Laboratório de IA' : 'AI Laboratory',
      shortDesc: isPt
        ? 'Pesquisa e desenvolvimento de soluções baseadas em IA generativa, NLP e automação voltadas ao impacto social e comunitário.'
        : 'R&D of generative AI, NLP, and automation tools engineered for community assistance and public social impact.',
      fullDesc: isPt
        ? 'Pesquisa aplicada e desenvolvimento de agentes e ferramentas de software baseadas em Modelos de Linguagem de Grande Porte (LLMs), NLP e automações generativas. As iniciativas têm forte ênfase no desenvolvimento ético, acessibilidade, suporte comunitário e impacto social em soluções abertas.'
        : 'Applied research and engineering of software agents and systems powered by Large Language Models (LLMs), NLP, and generative automations. Projects emphasize ethical AI development, community assistance, open-source technology, and public social impact.',
      highlights: isPt ? [
        'Engenharia de prompts estruturados e orquestração de LLMs via LangChain',
        'Pesquisa aplicada em NLP e sumarização inteligente de dados comunitários',
        'Desenvolvimento de agentes conversacionais com contexto e memória vetorial',
        'Contribuição ativa para iniciativas open-source de tecnologia social'
      ] : [
        'Structured prompt engineering and LLM orchestration with LangChain',
        'Applied NLP research for intelligent text summarization and categorization',
        'Engineering conversational agents with retrieval augmented generation (RAG)',
        'Active development in open-source social impact technology'
      ],
      skills: ['LLMs & NLP', 'Python', 'LangChain', 'Open Source', 'Social Impact', 'RAG & Vetores', 'FastAPI'],
      icon: Cpu,
      iconColor: '#0ea5e9',
      badgeBg: 'bg-sky-100 text-sky-950 border-sky-300',
      glow: 'shadow-[3px_3px_0px_rgba(14,165,233,1)]',
      position: 'bottom',
      photos: [
        {
          url: '/assets/images/part3.jpeg',
          caption: isPt ? 'Exploração prática de modelos generativos e agentes no AI LAB' : 'Hands-on experimentation with generative models at AI LAB'
        }
      ]
    },
    {
      id: 'future',
      year: '2026+',
      shortYear: 'Futuro',
      openSide: 'left', // Abre na esquerda para não tapar o card da direita!
      role: isPt ? 'Novas Oportunidades' : 'Open to Opportunities',
      company: isPt ? 'Próximos Desafios' : 'Next Chapter',
      location: isPt ? 'Remoto / Híbrido / Brasília' : 'Remote / Hybrid / Relocation',
      badge: isPt ? 'Disponível' : 'Available',
      shortDesc: isPt
        ? 'Pronto para atuar em times de engenharia, sistemas em Cloud, microsserviços e desenvolvimento de alto impacto.'
        : 'Ready to contribute in high-performance software engineering teams, Cloud systems, and backend development.',
      fullDesc: isPt
        ? 'Buscando integrar equipes de engenharia de software focadas em excelência técnica, código limpo e arquiteturas modernas escaláveis. Aberto a posições como Desenvolvedor Full Stack, Backend Engineer ou Engenheiro de Software Júnior/Pleno.'
        : 'Looking to join high-caliber software engineering teams focused on technical excellence, clean code, and scalable modern architectures. Open to Full Stack Developer, Backend Engineer, or Junior/Mid-level Software Engineer roles.',
      highlights: isPt ? [
        'Disponibilidade para início imediato e rápida curva de aprendizado',
        'Foco em arquitetura limpa, testes e documentação de software',
        'Facilidade para trabalhar com metodologias ágeis em squads multidisciplinares',
        'Grande motivação para aprender novas linguagens, clouds e ferramentas'
      ] : [
        'Available for immediate start with rapid onboarding capacity',
        'Core focus on clean architecture, automated testing, and documentation',
        'Thrives in agile multidisciplinary squads and cross-functional teams',
        'High enthusiasm to master new stacks, cloud ecosystems, and tools'
      ],
      skills: ['Cloud & Linux', 'Microsserviços', 'Arquitetura', 'Docker', 'Clean Code', 'Trabalho em Equipe'],
      icon: Sparkles,
      iconColor: '#eab308',
      badgeBg: 'bg-yellow-100 text-yellow-950 border-yellow-300',
      glow: 'shadow-[3px_3px_0px_rgba(234,179,8,1)]',
      position: 'top',
      photos: []
    }
  ];

  // Trava o scroll do body enquanto a sidediv estiver aberta
  useEffect(() => {
    if (!selectedNode) return;
    const prevBody = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleCloseDetail();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevBody || '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedNode]);

  const handleOpenDetail = (node) => {
    setSelectedNode(node);
    setActiveNodeId(node.id);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsOpen(true);
      });
    });
  };

  const handleCloseDetail = () => {
    setIsOpen(false);
    setTimeout(() => {
      setSelectedNode(null);
    }, 300);
  };

  const currentIndex = selectedNode ? milestones.findIndex((m) => m.id === selectedNode.id) : -1;
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < milestones.length - 1;

  const handlePrevNode = () => {
    if (!hasPrev) return;
    const prevNode = milestones[currentIndex - 1];
    setSelectedNode(prevNode);
    setActiveNodeId(prevNode.id);
  };

  const handleNextNode = () => {
    if (!hasNext) return;
    const nextNode = milestones[currentIndex + 1];
    setSelectedNode(nextNode);
    setActiveNodeId(nextNode.id);
  };

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
              const isSelected = activeNodeId === node.id || (selectedNode && selectedNode.id === node.id);
              const isHovered = hoveredNodeId === node.id;
              const isHighlighted = isSelected || isHovered;

              return (
                <div 
                  key={node.id} 
                  className="flex flex-col items-center justify-center min-h-[420px] group cursor-pointer"
                  onClick={() => handleOpenDetail(node)}
                  onMouseEnter={() => setHoveredNodeId(node.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                >
                  
                  {/* Card no Topo (se position === 'top') */}
                  <div className={`w-full flex flex-col justify-end transition-all duration-200 ${isTop ? 'opacity-100 pointer-events-auto mb-2' : 'opacity-0 pointer-events-none'}`}>
                    <div 
                      className={`bg-white p-3.5 rounded-xl border-2 transition-all text-left flex flex-col justify-between min-h-[155px] ${
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

                        <h3 className="text-xs sm:text-[13px] font-black text-zinc-950 leading-tight mb-0.5 line-clamp-2">
                          {node.role}
                        </h3>
                        <p className="text-[11px] font-bold text-zinc-600 mb-2 truncate">
                          {node.company}
                        </p>

                        <div className="flex flex-wrap gap-1">
                          {node.skills.slice(0, 3).map((s) => (
                            <span key={s} className="text-[8.5px] font-mono font-bold bg-zinc-100 text-zinc-700 px-1 py-0.5 rounded border border-zinc-200">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Botão de Ver Mais com Seta */}
                      <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-[10.5px] font-bold text-zinc-900 group-hover:text-amber-700 transition-colors">
                        <span className="flex items-center gap-1">
                          <span>{isPt ? 'Ver detalhes' : 'View details'}</span>
                          {/* {node.photos && node.photos.length > 0 && (
                            <span className="text-[8.5px] font-mono bg-zinc-100 text-zinc-600 px-1 rounded border border-zinc-200 flex items-center gap-0.5">
                              <Camera className="w-2.5 h-2.5" />
                              {node.photos.length}
                            </span>
                          )} */}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
                      className={`bg-white p-3.5 rounded-xl border-2 transition-all text-left flex flex-col justify-between min-h-[155px] ${
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

                        <h3 className="text-xs sm:text-[13px] font-black text-zinc-950 leading-tight mb-0.5 line-clamp-2">
                          {node.role}
                        </h3>
                        <p className="text-[11px] font-bold text-zinc-600 mb-2 truncate">
                          {node.company}
                        </p>

                        <div className="flex flex-wrap gap-1">
                          {node.skills.slice(0, 3).map((s) => (
                            <span key={s} className="text-[8.5px] font-mono font-bold bg-zinc-100 text-zinc-700 px-1 py-0.5 rounded border border-zinc-200">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Botão de Ver Mais com Seta */}
                      <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-[10.5px] font-bold text-zinc-900 group-hover:text-amber-700 transition-colors">
                        <span className="flex items-center gap-1">
                          <span>{isPt ? 'Ver detalhes' : 'View details'}</span>
                          {node.photos && node.photos.length > 0 && (
                            <span className="text-[8.5px] font-mono bg-zinc-100 text-zinc-600 px-1 rounded border border-zinc-200 flex items-center gap-0.5">
                              <Camera className="w-2.5 h-2.5" />
                              {node.photos.length}
                            </span>
                          )}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* --- MOBILE / TABLET: TIMELINE VERTICAL COM BOTÃO VER DETALHES --- */}
        <div className="block lg:hidden relative pl-6 space-y-4">
          <div className="absolute left-2 top-2 bottom-2 w-2.5 bg-zinc-950 rounded-full" />

          {milestones.map((node) => (
            <div key={node.id} className="relative pl-5">
              <div className="absolute -left-4.5 top-3 w-8 h-8 rounded-xl bg-white border-2 border-zinc-950 flex items-center justify-center shadow-xs">
                <node.icon className="w-4 h-4" style={{ color: node.iconColor }} />
              </div>

              <div 
                className="bg-white p-4 rounded-xl border-2 border-zinc-950 shadow-[3px_3px_0px_rgba(24,24,27,1)] text-left cursor-pointer hover:bg-amber-50/15 transition-all"
                onClick={() => handleOpenDetail(node)}
              >
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

                <div className="flex flex-wrap gap-1 mb-3">
                  {node.skills.slice(0, 3).map((s) => (
                    <span key={s} className="text-[9px] font-mono font-bold bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded border border-zinc-200">
                      {s}
                    </span>
                  ))}
                </div>

                <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-xs font-bold text-zinc-900">
                  <span className="flex items-center gap-1.5">
                    <span>{isPt ? 'Ver detalhes e fotos' : 'View details & photos'}</span>
                    {node.photos && node.photos.length > 0 && (
                      <span className="text-[9px] font-mono bg-zinc-100 text-zinc-600 px-1.5 py-0.2 rounded border border-zinc-200 flex items-center gap-1">
                        <Camera className="w-2.5 h-2.5" />
                        {node.photos.length}
                      </span>
                    )}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ========================================================================= */}
      {/* --- SIDEDIV / SIDEBAR LATERAL DINÂMICA (ESQUERDA ⇄ DIREITA) --- */}
      {/* ========================================================================= */}
      {selectedNode && (
        <>
          {/* Backdrop suave sem blur pesado para manter a linha do tempo legível */}
          <div 
            className={`fixed inset-0 bg-black/15 z-50 transition-opacity duration-300 ${
              isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
            onClick={handleCloseDetail}
          />

          {/* Gaveta Lateral (Sidediv) com animação suave de deslizar para o lado e borda na cor do card */}
          <aside
            role="dialog"
            aria-label={selectedNode.role}
            style={{
              borderColor: selectedNode.iconColor,
              boxShadow: selectedNode.openSide === 'left'
                ? `8px 0px 0px ${selectedNode.iconColor}33, 4px 0px 24px rgba(0,0,0,0.12)`
                : `-8px 0px 0px ${selectedNode.iconColor}33, -4px 0px 24px rgba(0,0,0,0.12)`
            }}
            className={`fixed z-50 bg-[#faf8f5] text-zinc-950 flex flex-col border-2 transition-transform duration-300 ease-in-out will-change-transform
              /* Mobile: Bottom Sheet */
              inset-x-0 bottom-0 max-h-[88vh] rounded-t-3xl border-b-0
              /* Desktop: Sidediv */
              lg:bottom-0 lg:top-0 lg:max-h-screen lg:rounded-none lg:w-[600px] lg:border-t-0 lg:border-b-0
              ${
                selectedNode.openSide === 'left'
                  ? 'lg:left-0 lg:right-auto lg:border-r-4 lg:border-l-0'
                  : 'lg:right-0 lg:left-auto lg:border-l-4 lg:border-r-0'
              }
              ${
                !isOpen
                  ? (selectedNode.openSide === 'left'
                      ? 'translate-y-full lg:translate-y-0 lg:-translate-x-full'
                      : 'translate-y-full lg:translate-y-0 lg:translate-x-full')
                  : 'translate-y-0 lg:translate-x-0'
              }
            `}
          >

            {/* Puxador de arrasto no Mobile */}
            <div className="w-10 h-1 bg-zinc-300 rounded-full mx-auto mt-2.5 mb-1 lg:hidden" />

            {/* Top Header da Gaveta */}
            <div className="px-5 py-4 border-b-2 border-zinc-950/10 flex items-center justify-between bg-white">
              <div className="flex items-center gap-2">
                <span 
                  className="text-[10px] font-mono font-bold px-2 py-0.5 rounded border"
                  style={{ borderColor: selectedNode.iconColor, color: selectedNode.iconColor }}
                >
                  {selectedNode.badge}
                </span>
                <span className="text-[11px] font-mono font-bold text-zinc-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-zinc-400" />
                  {selectedNode.year}
                </span>
              </div>

              <button
                onClick={handleCloseDetail}
                className="p-1.5 rounded-xl border border-zinc-300 hover:bg-zinc-100 text-zinc-600 hover:text-zinc-950 transition-colors cursor-pointer flex items-center gap-1"
                title="Fechar (Esc)"
                aria-label="Fechar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Conteúdo com Scroll */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
              
              {/* Título do Cargo & Empresa */}
              <div>
                <div className="flex items-center gap-2.5 mb-1">
                  <div 
                    className="w-9 h-9 rounded-xl border-2 flex items-center justify-center bg-white shadow-2xs shrink-0 transition-colors duration-300"
                    style={{ borderColor: selectedNode.iconColor }}
                  >
                    <selectedNode.icon className="w-4.5 h-4.5" style={{ color: selectedNode.iconColor }} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-zinc-950 leading-tight">
                    {selectedNode.role}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm font-bold text-zinc-700 ml-11 flex items-center gap-1.5">
                  <span>{selectedNode.company}</span>
                  {selectedNode.location && (
                    <>
                      <span className="text-zinc-400">•</span>
                      <span className="text-zinc-500 font-medium flex items-center gap-0.5">
                        <MapPin className="w-3 h-3 text-emerald-500" />
                        {selectedNode.location}
                      </span>
                    </>
                  )}
                </p>
              </div>

              {/* Sobre a Atuação */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500">
                  {isPt ? 'Visão Geral' : 'Overview'}
                </span>
                <div className="bg-white p-3.5 rounded-xl border border-zinc-300 shadow-2xs text-xs text-zinc-800 leading-relaxed font-medium">
                  {selectedNode.fullDesc}
                </div>
              </div>

              {/* Principais Atividades & Impactos */}
              {selectedNode.highlights && selectedNode.highlights.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500">
                    {isPt ? 'Principais Atividades & Impactos' : 'Key Responsibilities & Impact'}
                  </span>
                  <div className="space-y-1.5">
                    {selectedNode.highlights.map((h, i) => (
                      <div 
                        key={i} 
                        className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-zinc-200 text-xs text-zinc-800 font-medium"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Stack & Tecnologias */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500">
                  {isPt ? 'Tecnologias & Ferramentas' : 'Technologies & Tools'}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedNode.skills.map((s) => (
                    <span 
                      key={s} 
                      className="text-[10px] font-mono font-bold bg-white text-zinc-900 px-2.5 py-1 rounded-lg border border-zinc-950 shadow-2xs"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* mais posteriormente eu coloco fotos... */}
              {/* <div className="space-y-2 w-full">
                    {selectedNode.photos.map((photo, idx) => (
                      <div 
                        key={idx} 
                        className="bg-white p-2 rounded-2xl border-2 shadow-[3px_3px_0px_rgba(0,0,0,1)] transition-colors duration-300"
                        style={{ borderColor: selectedNode.iconColor }}
                      >
                        <div className="overflow-hidden rounded-xl bg-zinc-100 max-h-48 flex items-center justify-center">
                          <img 
                            src={photo.url} 
                            alt={photo.caption || selectedNode.role} 
                            className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        {photo.caption && (
                          <p className="mt-1.5 text-[11px] font-medium text-zinc-600 italic px-1">
                            {photo.caption}
                          </p>
                        )}
                      </div>
                    ))}
                  </div> */}

            </div>

            {/* Footer da Gaveta: Navegação Anterior / Próximo */}
            <div className="px-5 py-3 border-t-2 border-zinc-950/10 bg-white flex items-center justify-between text-xs font-mono font-bold">
              <button
                onClick={handlePrevNode}
                disabled={!hasPrev}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                  hasPrev 
                    ? 'border-zinc-950 bg-zinc-50 hover:bg-zinc-100 text-zinc-950 shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none' 
                    : 'border-zinc-200 text-zinc-300 opacity-50 cursor-not-allowed'
                }`}
              >
                <ArrowLeft className="w-3 h-3" />
                <span>{isPt ? 'Anterior' : 'Previous'}</span>
              </button>

              <span className="text-[11px] text-zinc-400">
                {currentIndex + 1} / {milestones.length}
              </span>

              <button
                onClick={handleNextNode}
                disabled={!hasNext}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                  hasNext 
                    ? 'border-zinc-950 bg-yellow-300 hover:bg-yellow-400 text-zinc-950 shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none' 
                    : 'border-zinc-200 text-zinc-300 opacity-50 cursor-not-allowed'
                }`}
              >
                <span>{isPt ? 'Próximo' : 'Next'}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

          </aside>
        </>
      )}

    </section>
  );
}