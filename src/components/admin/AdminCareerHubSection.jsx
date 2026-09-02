import React, { useState } from 'react';
import { 
  Mail, 
  Copy, 
  Bot, 
  Code2, 
  CheckCheck, 
  ExternalLink, 
  Lock, 
  Sparkles,
  ArrowDown,
  FileText
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export default function AdminCareerHubSection() {
  const { isAdmin } = useAdmin();
  const [copiedSection, setCopiedSection] = useState(null);

  // 1. Estados do Formulário de E-mail de Candidatura
  const [greeting, setGreeting] = useState('Prezada Rosana, boa tarde.');
  const [roleName, setRoleName] = useState('Estágio em Projetos Cloud');
  const [location, setLocation] = useState('Brasília (presencial)');
  const [availability, setAvailability] = useState('6h presenciais na região central de Brasília');
  const [graduationDate, setGraduationDate] = useState('dezembro de 2028');
  const [skillsHighlight, setSkillsHighlight] = useState(
    'infraestrutura, servidores Linux, ambientes conteinerizados (Docker/microsserviços) e automação de processos com Python'
  );

  // 2. Estado da Descrição de Vaga para o Prompt de IA
  const [jobDescription, setJobDescription] = useState('');

  if (!isAdmin) return null;

  // E-mail de candidatura formatado sem emojis
  const emailBody = `${greeting}

Gostaria de me candidatar à vaga de ${roleName} em ${location}.

Sou estudante de Engenharia de Software na Universidade de Brasília (UnB), com formatura prevista para ${graduationDate} e total disponibilidade para a carga horária de ${availability}.

Possuo vivência prática com ${skillsHighlight}. Tenho facilidade com Excel/PowerPoint e acompanhamento de rotinas e entregáveis via metodologias ágeis/Jira, unindo entendimento técnico de nuvem à organização de projetos, relatórios e comunicação com stakeholders. Possuo também inglês em nível C1 Avançado (conversação, leitura e escrita).

Anexo a este e-mail meu currículo nas versões em Português e Inglês conforme solicitado.

Agradeço pela atenção e permaneço à disposição para uma entrevista.

Atenciosamente,

Matheus Ribeiro Szervinsk

(61) 98219-3662 | mathszer1103@gmail.com

LinkedIn: https://linkedin.com/in/matheus-szervinsk | GitHub: https://github.com/szervinsk`;

  // Prompt de IA pronto para tailoring de currículo reativo
  const aiPromptText = `Você é um especialista em recrutamento técnico e engenharia de software de alto nível.
Abaixo estão os dados reais e validados de Matheus Ribeiro Szervinsk (estudante de Engenharia de Software na UnB, desenvolvedor Full Stack com foco em Python, Laravel, Webhooks, Docker e conformidade LGPD):

[DADOS OFICIAIS DO CANDIDATO]
- Nome Completo: Matheus Ribeiro Szervinsk
- Formação Acadêmica: Bacharelado em Engenharia de Software - Universidade de Brasília (UnB) | Previsão: 12/2028
- Experiências Reais de Mercado:
  1. Transoft (2025 - Presente): Desenvolvedor Full Stack | PHP (Laravel), AngularJS, PostgreSQL, Webhooks assíncronos, mensageria e otimização de queries relacionais.
  2. Caesb (2024 - 2025): Automação com Python & OCR | Pipelines de OCR, extração e estruturação de documentos sob conformidade estrita da LGPD, redução de 94% do tempo operacional manual.
  3. AI LAB • UnB (2026 - Presente): Pesquisador / Desenvolvedor de IA | Soluções baseadas em IA generativa, LLMs, NLP e automações open source de impacto comunitário.
- Competências Técnicas: Python (FastAPI, Django), PHP (Laravel), React.js, Node.js, PostgreSQL, Docker, Linux, Git Flow, CI/CD, Metodologias Ágeis (Jira/Scrum), Conformidade LGPD.
- Idiomas: Inglês C1 Avançado (fluência para reuniões globais, documentação e escrita técnica).

[REQUISITOS DA VAGA ANALISADA]
"""
${jobDescription.trim() || '[COLE A DESCRIÇÃO DA VAGA / REQUISITOS AQUI]'}
"""

[INSTRUÇÕES DE ENGENHARIA DE PROMPT PARA ATS]
1. Analise profundamente os requisitos, stacks e palavras-chave da vaga descrita acima.
2. Reestruture e personalize o currículo de Matheus para esta oportunidade em formato Markdown / LaTeX (Overleaf).
3. Destaque verbos de ação mensuráveis no padrão STAR (Situação, Tarefa, Ação, Resultado) nos projetos e experiências correspondentes.
4. Mantenha 100% de veracidade com base estrita no perfil de Matheus, priorizando as tecnologias que maximizam o índice de aprovação nos sistemas ATS (Applicant Tracking Systems).`;

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. SEÇÃO SNAP: GERADOR DE E-MAILS DE CANDIDATURA (MODO ADM)               */}
      {/* ========================================================================= */}
      <section 
        id="admin-email" 
        className="snap-section min-h-screen py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-[#faf8f5] text-zinc-950 relative z-20 border-t-3 border-zinc-950 flex flex-col justify-center items-center"
      >
        <div className="max-w-6xl mx-auto w-full">
          
          {/* Cabeçalho */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-zinc-200 pb-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-300 border-2 border-zinc-950 text-zinc-950 text-[11px] font-mono font-black shadow-[2px_2px_0px_rgba(0,0,0,1)] mb-2">
                <Lock className="w-3.5 h-3.5" />
                <span>CENTRAL DE CANDIDATURAS • MODO ADM</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-950">
                Gerador de E-mail para Vagas & Apresentação
              </h2>
            </div>

            <button
              onClick={() => handleCopy(emailBody, 'email')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-yellow-300 hover:bg-yellow-400 text-zinc-950 text-xs font-black border-2 border-zinc-950 shadow-[3px_3px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-0.5 hover:translate-y-0.5 cursor-pointer"
            >
              {copiedSection === 'email' ? <CheckCheck className="w-4 h-4 text-emerald-800" /> : <Copy className="w-4 h-4" />}
              <span>{copiedSection === 'email' ? 'Copiado para Transferência!' : 'Copiar E-mail Formatado'}</span>
            </button>
          </div>

          {/* Grid do Formulário e Prévia */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Coluna Esquerda: Configuração dos Parâmetros */}
            <div className="lg:col-span-5 bg-white border-2 border-zinc-950 p-5 rounded-3xl shadow-[4px_4px_0px_rgba(24,24,27,1)] space-y-3">
              <div className="flex items-center gap-2 border-b border-zinc-100 pb-2">
                <Mail className="w-4 h-4 text-purple-700" />
                <h3 className="text-xs font-mono font-black uppercase text-zinc-950">Parâmetros da Vaga</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                <div>
                  <label className="block text-[10px] font-mono font-bold text-zinc-700 uppercase mb-1">Saudação</label>
                  <input
                    type="text"
                    value={greeting}
                    onChange={(e) => setGreeting(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl bg-zinc-50 border-2 border-zinc-950 text-zinc-900 focus:bg-white text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-bold text-zinc-700 uppercase mb-1">Cargo / Vaga</label>
                  <input
                    type="text"
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl bg-zinc-50 border-2 border-zinc-950 text-zinc-900 focus:bg-white text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-bold text-zinc-700 uppercase mb-1">Localização</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl bg-zinc-50 border-2 border-zinc-950 text-zinc-900 focus:bg-white text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-bold text-zinc-700 uppercase mb-1">Carga Horária</label>
                  <input
                    type="text"
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl bg-zinc-50 border-2 border-zinc-950 text-zinc-900 focus:bg-white text-xs font-medium"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-mono font-bold text-zinc-700 uppercase mb-1">Habilidades Principais</label>
                  <textarea
                    rows={2}
                    value={skillsHighlight}
                    onChange={(e) => setSkillsHighlight(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl bg-zinc-50 border-2 border-zinc-950 text-zinc-900 focus:bg-white text-xs font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Coluna Direita: Prévia Visual Formatada */}
            <div className="lg:col-span-7 bg-white border-2 border-zinc-950 p-5 rounded-3xl shadow-[4px_4px_0px_rgba(24,24,27,1)] flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-2 mb-3">
                <span className="text-[11px] font-mono font-bold text-zinc-500">
                  Prévia em Tempo Real (Tom Executivo / Sem Emojis)
                </span>
                <span className="text-[10px] font-mono bg-emerald-100 text-emerald-900 font-black px-2 py-0.5 rounded border border-emerald-300">
                  ● Pronto para Envio
                </span>
              </div>

              <div className="p-3.5 bg-zinc-50 rounded-2xl border-2 border-zinc-200 overflow-hidden">
                <pre className="text-[11px] font-mono text-zinc-800 whitespace-pre-wrap leading-relaxed max-h-56 overflow-y-auto select-all">
                  {emailBody}
                </pre>
              </div>
            </div>

          </div>

          {/* Hint para a Próxima Seção */}
          <div className="w-full text-center mt-6">
            <a 
              href="#admin-prompt"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-zinc-500 hover:text-zinc-950 transition-colors"
            >
              <span>Avançar para: Central de IA (Tailoring de Currículo)</span>
              <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            </a>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. SEÇÃO SNAP: PROMPT DE IA DEDICADO PARA TAILORING DE CURRÍCULO          */}
      {/* ========================================================================= */}
      <section 
        id="admin-prompt" 
        className="snap-section min-h-screen py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-[#090d16] text-white relative z-20 border-t-3 border-zinc-950 flex flex-col justify-center items-center"
      >
        <div className="max-w-6xl mx-auto w-full">
          
          {/* Cabeçalho da Central de IA */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-400 text-zinc-950 text-[11px] font-mono font-black border-2 border-zinc-950 shadow-[2px_2px_0px_rgba(255,255,255,0.2)] mb-2">
                <Bot className="w-3.5 h-3.5 text-zinc-950" />
                <span>INTELIGÊNCIA ARTIFICIAL & ATS • MODO ADM</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                Tailoring & Otimização de Currículo com IA
              </h2>
            </div>

            {/* Links Rápidos e Ação de Cópia */}
            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href="https://www.overleaf.com/project"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold border border-zinc-700 transition-colors"
              >
                <span>Overleaf LaTeX</span>
                <ExternalLink className="w-3 h-3 text-zinc-400" />
              </a>

              <button
                onClick={() => handleCopy(aiPromptText, 'prompt')}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-300 hover:bg-violet-400 text-zinc-950 text-xs font-black border-2 border-zinc-950 shadow-[3px_3px_0px_rgba(255,255,255,0.2)] transition-all hover:translate-x-0.5 hover:translate-y-0.5 cursor-pointer"
              >
                {copiedSection === 'prompt' ? <CheckCheck className="w-4 h-4 text-emerald-800" /> : <Copy className="w-4 h-4 text-zinc-950" />}
                <span>{copiedSection === 'prompt' ? 'Prompt Copiado!' : 'Copiar Prompt Completo'}</span>
              </button>
            </div>
          </div>

          {/* Grid Principal Dedicado com Área de Entrada e Saída */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Coluna 1: Entrada da Vaga (Job Description) */}
            <div className="lg:col-span-5 bg-zinc-900/90 border-2 border-zinc-800 p-5 rounded-3xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5 mb-3">
                  <h3 className="text-xs font-mono font-black uppercase text-violet-400">
                    1. Requisitos da Vaga (Cole aqui)
                  </h3>
                  <span className="text-[10px] font-mono text-zinc-500">Live Embedding</span>
                </div>

                <p className="text-xs text-zinc-400 mb-3 font-medium">
                  Cole o texto ou requisitos da vaga abaixo para embutir instantaneamente no prompt formatado ao lado:
                </p>

                <textarea
                  rows={8}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Exemplo: Procuramos Desenvolvedor Python com vivência em FastAPI, Docker, microsserviços, PostgreSQL e conformidade com a LGPD..."
                  className="w-full p-3.5 rounded-2xl bg-zinc-950 border-2 border-zinc-700 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-violet-400 font-sans leading-relaxed"
                />
              </div>

              <div className="mt-4 p-3 bg-zinc-950/60 rounded-xl border border-zinc-800/80 text-[11px] text-zinc-400 font-mono">
                💡 <strong>Dica ATS:</strong> O prompt ajusta métricas STAR e tags automaticamente no padrão de aprovação de recrutadores.
              </div>
            </div>

            {/* Coluna 2: Prompt Gerado em Tempo Real (Grande e Destacado) */}
            <div className="lg:col-span-7 bg-zinc-900 border-2 border-zinc-800 p-5 rounded-3xl flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5 mb-3">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-xs font-mono font-black uppercase text-emerald-400">
                    2. Prompt Otimizado para IA (Pronto para Uso)
                  </h3>
                </div>
                <span className="text-[10px] font-mono bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded border border-zinc-700 font-bold">
                  ChatGPT • Claude • Gemini
                </span>
              </div>

              <div className="p-4 bg-zinc-950 rounded-2xl border-2 border-zinc-800 overflow-hidden flex-1">
                <pre className="text-[11px] font-mono text-zinc-300 whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto select-all">
                  {aiPromptText}
                </pre>
              </div>

              <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-zinc-500 pt-2 border-t border-zinc-800">
                <span>Clique no botão superior para copiar e enviar ao seu modelo de preferência.</span>
              </div>
            </div>

          </div>

        </div>
      </section>
    </>
  );
}
