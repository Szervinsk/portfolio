import React, { useState } from 'react';
import { 
  Mail, 
  Copy, 
  Check, 
  Sparkles, 
  ExternalLink, 
  FileText, 
  PlusCircle, 
  Bot, 
  Send,
  Code2,
  CheckCheck,
  Trash2,
  Link2,
  Lock,
  Layers
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export default function AdminCareerHubSection() {
  const { 
    isAdmin, 
    customResumes, 
    addCustomResume, 
    deleteCustomResume, 
    activeResumeId, 
    setActiveResumeId 
  } = useAdmin();

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

  // 2. Estados do Cadastro de Novo Currículo
  const [newResumeForm, setNewResumeForm] = useState({
    title: '',
    role: 'Engenheiro de Software',
    url: '/assets/curriculo-matheus-szervinsk.pdf',
    fileName: 'curriculo_matheus_szervinsk_novo.pdf',
    summary: ''
  });
  const [resumeSuccess, setResumeSuccess] = useState(false);

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

  // Prompt de IA pronto para tailoring de currículo
  const aiPromptText = `Você é um especialista em recrutamento técnico e engenharia de software.
Abaixo estão os dados reais de Matheus Ribeiro Szervinsk (estudante de Engenharia de Software na UnB, desenvolvedor Full Stack com foco em Python, Laravel, Webhooks, Docker e conformidade LGPD):

[DADOS DO CANDIDATO]
- Nome: Matheus Ribeiro Szervinsk
- Formação: Bacharelado em Engenharia de Software - Universidade de Brasília (UnB) | Previsão: 12/2028
- Experiências Reais:
  1. Transoft (2025 - Presente): Desenvolvedor Full Stack | PHP (Laravel), AngularJS, PostgreSQL, Webhooks assíncronos, mensageria.
  2. Caesb (2024 - 2025): Automação com Python | Pipelines de OCR, extração de relatórios via API, redução de 94% de tempo manual, conformidade rigorosa à LGPD.
- Stacks: Python (FastAPI, Django), PHP (Laravel), React.js, Node.js, PostgreSQL, Docker, Git Flow, Jira/Scrum.
- Idiomas: Inglês C1 Avançado.

[INSTRUÇÕES]
Analise a seguinte descrição de vaga:
"""
[COLE OS REQUISITOS DA VAGA AQUI]
"""

Por favor, adapte e reestruture o currículo de Matheus para esta vaga em formato Markdown / LaTeX (Overleaf), destacando os verbos de ação, métricas de impacto e palavras-chave mais relevantes para os sistemas ATS (Applicant Tracking Systems).`;

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  const handleAddResume = (e) => {
    e.preventDefault();
    if (!newResumeForm.title) return;

    addCustomResume({
      title: newResumeForm.title,
      role: newResumeForm.role || 'Engenharia de Software',
      url: newResumeForm.url || '/assets/curriculo-matheus-szervinsk.pdf',
      fileName: newResumeForm.fileName || 'curriculo_matheus_szervinsk.pdf',
      summary: newResumeForm.summary || 'Versão personalizada cadastrada via Painel ADM.'
    });

    setResumeSuccess(true);
    setTimeout(() => setResumeSuccess(false), 3000);
    setNewResumeForm({
      title: '',
      role: 'Engenheiro de Software',
      url: '/assets/curriculo-matheus-szervinsk.pdf',
      fileName: 'curriculo_matheus_szervinsk_novo.pdf',
      summary: ''
    });
  };

  return (
    <section 
      id="admin-hub" 
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#faf8f5] text-zinc-950 relative z-20 border-t-3 border-zinc-950 animate-pop-in"
    >
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Cabeçalho da Seção Exclusiva em Cores Claras */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-zinc-200 pb-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-300 border-2 border-zinc-950 text-zinc-950 text-xs font-mono font-black shadow-[2px_2px_0px_rgba(0,0,0,1)] mb-3">
              <Lock className="w-3.5 h-3.5" />
              <span>CENTRAL PRIVADA DE CANDIDATURAS & IA (MODO ADM)</span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-zinc-950">
              Painel de Vagas, Prompts & Templates de E-mail
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 font-medium mt-1">
              Esta seção é uma central exclusiva, posicionada após o rodapé, visível somente quando o Modo Editor está ativado.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono bg-white text-zinc-800 px-3.5 py-1.5 rounded-xl border-2 border-zinc-950 shadow-[2px_2px_0px_rgba(0,0,0,1)] font-bold">
              ⚡ Status: Editor Conectado
            </span>
          </div>
        </div>

        {/* Grid Principal de Ferramentas em Fundo Claro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* =========================================================
              COLUNA ESQUERDA (6 Colunas): GERADOR DE E-MAIL PARA VAGAS
          ========================================================= */}
          <div className="lg:col-span-6 bg-white border-2 border-zinc-950 p-5 sm:p-7 rounded-3xl shadow-[5px_5px_0px_rgba(24,24,27,1)] space-y-4">
            <div className="flex items-center justify-between border-b-2 border-zinc-100 pb-3">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-purple-700" />
                <h3 className="text-sm font-black text-zinc-950 uppercase tracking-wide">
                  1. Modelo de E-mail para Empresas (Sem Emojis)
                </h3>
              </div>

              <button
                onClick={() => handleCopy(emailBody, 'email')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-yellow-300 hover:bg-yellow-400 text-zinc-950 text-xs font-black border-2 border-zinc-950 shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-0.5 hover:translate-y-0.5 cursor-pointer"
              >
                {copiedSection === 'email' ? <CheckCheck className="w-3.5 h-3.5 text-emerald-800" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSection === 'email' ? 'Copiado!' : 'Copiar E-mail'}</span>
              </button>
            </div>

            {/* Formulário de customização rápida */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-[10px] font-mono font-bold text-zinc-700 uppercase mb-1">Saudação & Destinatário</label>
                <input
                  type="text"
                  value={greeting}
                  onChange={(e) => setGreeting(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-zinc-50 border-2 border-zinc-950 text-zinc-900 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold text-zinc-700 uppercase mb-1">Vaga / Cargo</label>
                <input
                  type="text"
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-zinc-50 border-2 border-zinc-950 text-zinc-900 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold text-zinc-700 uppercase mb-1">Localização</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-zinc-50 border-2 border-zinc-950 text-zinc-900 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold text-zinc-700 uppercase mb-1">Disponibilidade</label>
                <input
                  type="text"
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-zinc-50 border-2 border-zinc-950 text-zinc-900 focus:bg-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[10px] font-mono font-bold text-zinc-700 uppercase mb-1">Habilidades Chave a Enfatizar</label>
                <textarea
                  rows={2}
                  value={skillsHighlight}
                  onChange={(e) => setSkillsHighlight(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-xl bg-zinc-50 border-2 border-zinc-950 text-zinc-900 focus:bg-white"
                />
              </div>
            </div>

            {/* Prévia do E-mail */}
            <div className="p-4 bg-zinc-50 rounded-2xl border-2 border-zinc-200">
              <pre className="text-xs font-mono text-zinc-800 whitespace-pre-wrap leading-relaxed max-h-56 overflow-y-auto no-scrollbar select-all">
                {emailBody}
              </pre>
            </div>
          </div>

          {/* =========================================================
              COLUNA DIREITA (6 Colunas): PROMPT DE IA + LINKS + CADASTRO
          ========================================================= */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* CARD 2: PROMPT DE IA OTIMIZADO PARA GERAR CURRÍCULOS */}
            <div className="bg-white border-2 border-zinc-950 p-5 sm:p-6 rounded-3xl shadow-[5px_5px_0px_rgba(24,24,27,1)] space-y-3">
              <div className="flex items-center justify-between border-b-2 border-zinc-100 pb-3">
                <div className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-violet-600" />
                  <h3 className="text-sm font-black text-zinc-950 uppercase tracking-wide">
                    2. Prompt de IA para Tailoring de Currículo
                  </h3>
                </div>

                <button
                  onClick={() => handleCopy(aiPromptText, 'prompt')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-200 hover:bg-violet-300 text-zinc-950 text-xs font-black border-2 border-zinc-950 shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-0.5 hover:translate-y-0.5 cursor-pointer"
                >
                  {copiedSection === 'prompt' ? <CheckCheck className="w-3.5 h-3.5 text-emerald-800" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSection === 'prompt' ? 'Copiado!' : 'Copiar Prompt'}</span>
                </button>
              </div>

              <p className="text-xs text-zinc-600 font-medium">
                Copie este prompt pré-formatado, cole no ChatGPT / Claude / Gemini com a descrição da vaga para gerar o currículo ajustado sob medida:
              </p>

              <div className="p-3.5 bg-zinc-50 rounded-2xl border-2 border-zinc-200">
                <pre className="text-[11px] font-mono text-zinc-800 whitespace-pre-wrap leading-relaxed max-h-36 overflow-y-auto no-scrollbar">
                  {aiPromptText}
                </pre>
              </div>
            </div>

            {/* CARD 3: LINKS ÚTEIS DE PRODUÇÃO (OVERLEAF, LATEX, DRIVE) */}
            <div className="bg-white border-2 border-zinc-950 p-5 rounded-3xl shadow-[5px_5px_0px_rgba(24,24,27,1)] space-y-3">
              <div className="flex items-center gap-2 border-b-2 border-zinc-100 pb-2.5">
                <Link2 className="w-4 h-4 text-emerald-600" />
                <h3 className="text-xs font-black text-zinc-950 uppercase tracking-wide">
                  3. Links Rápidos para Geração de PDF (Overleaf / LaTeX)
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                <a
                  href="https://www.overleaf.com/project"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-zinc-50 hover:bg-emerald-50 rounded-xl border-2 border-zinc-950 flex items-center justify-between transition-colors group shadow-xs"
                >
                  <span className="font-bold text-zinc-950 group-hover:text-emerald-950">Overleaf LaTeX Editor</span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-950" />
                </a>

                <a
                  href="https://github.com/szervinsk"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-zinc-50 hover:bg-emerald-50 rounded-xl border-2 border-zinc-950 flex items-center justify-between transition-colors group shadow-xs"
                >
                  <span className="font-bold text-zinc-950 group-hover:text-emerald-950">GitHub (Repositórios)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-950" />
                </a>
              </div>
            </div>

            {/* CARD 4: CADASTRAR NOVA VERSÃO DE CURRÍCULO DIRETAMENTE NO SITE */}
            <div className="bg-white border-2 border-zinc-950 p-5 rounded-3xl shadow-[5px_5px_0px_rgba(24,24,27,1)] space-y-3">
              <div className="flex items-center gap-2 border-b-2 border-zinc-100 pb-2.5">
                <PlusCircle className="w-4 h-4 text-yellow-600" />
                <h3 className="text-xs font-black text-zinc-950 uppercase tracking-wide">
                  4. Cadastrar Novo Currículo no Portfólio
                </h3>
              </div>

              {resumeSuccess && (
                <div className="p-3 rounded-xl bg-emerald-100 border-2 border-emerald-500 text-emerald-950 text-xs font-bold flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-700" />
                  <span>Currículo cadastrado e disponibilizado no seletor de modelos da LetterSection!</span>
                </div>
              )}

              <form onSubmit={handleAddResume} className="space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono font-bold text-zinc-700 uppercase mb-1">Título da Versão *</label>
                    <input
                      type="text"
                      required
                      value={newResumeForm.title}
                      onChange={(e) => setNewResumeForm({ ...newResumeForm, title: e.target.value })}
                      placeholder="Ex: Versão Cloud & DevOps"
                      className="w-full px-3 py-1.5 rounded-xl bg-zinc-50 border-2 border-zinc-950 text-zinc-900"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono font-bold text-zinc-700 uppercase mb-1">Foco / Cargo</label>
                    <input
                      type="text"
                      value={newResumeForm.role}
                      onChange={(e) => setNewResumeForm({ ...newResumeForm, role: e.target.value })}
                      placeholder="Ex: Cloud Engineer"
                      className="w-full px-3 py-1.5 rounded-xl bg-zinc-50 border-2 border-zinc-950 text-zinc-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono font-bold text-zinc-700 uppercase mb-1">Caminho do PDF (/assets/...)</label>
                    <input
                      type="text"
                      value={newResumeForm.url}
                      onChange={(e) => setNewResumeForm({ ...newResumeForm, url: e.target.value })}
                      placeholder="/assets/curriculo-matheus-szervinsk.pdf"
                      className="w-full px-3 py-1.5 rounded-xl bg-zinc-50 border-2 border-zinc-950 text-zinc-900"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono font-bold text-zinc-700 uppercase mb-1">Nome do Arquivo</label>
                    <input
                      type="text"
                      value={newResumeForm.fileName}
                      onChange={(e) => setNewResumeForm({ ...newResumeForm, fileName: e.target.value })}
                      placeholder="curriculo_matheus_szervinsk_cloud.pdf"
                      className="w-full px-3 py-1.5 rounded-xl bg-zinc-50 border-2 border-zinc-950 text-zinc-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-bold text-zinc-700 uppercase mb-1">Resumo Curto das Competências</label>
                  <input
                    type="text"
                    value={newResumeForm.summary}
                    onChange={(e) => setNewResumeForm({ ...newResumeForm, summary: e.target.value })}
                    placeholder="Enfatiza Docker, microsserviços, Linux e automações em Python."
                    className="w-full px-3 py-1.5 rounded-xl bg-zinc-50 border-2 border-zinc-950 text-zinc-900"
                  />
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-yellow-300 hover:bg-yellow-400 text-zinc-950 font-black text-xs border-2 border-zinc-950 shadow-[2px_2px_0px_rgba(0,0,0,1)] cursor-pointer flex items-center gap-1.5"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Adicionar Modelo à Plataforma</span>
                  </button>
                </div>
              </form>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
