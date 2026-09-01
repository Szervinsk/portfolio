import React, { useState } from 'react';
import { 
  Lock, 
  X, 
  PlusCircle, 
  Sparkles, 
  FileText, 
  Trash2, 
  Copy, 
  Check, 
  LogOut, 
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Briefcase,
  Layers,
  CheckCircle2,
  FolderPlus
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export default function AdminModal() {
  const { 
    isAdmin, 
    isAdminModalOpen, 
    setIsAdminModalOpen, 
    activeTab, 
    setActiveTab, 
    login, 
    logout,
    customProjects,
    addCustomProject,
    deleteCustomProject,
    tailoredResumes,
    generateTailoredResume,
    deleteTailoredResume
  } = useAdmin();

  // Estados do Login
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Estados do Formulário de Projeto
  const [projectForm, setProjectForm] = useState({
    title: '',
    emoji: '🚀',
    category: 'Engenharia de Software',
    period: '2026',
    subtitle: '',
    description: '',
    impact: '',
    tags: 'React, Python, FastAPI, Docker',
    coverImage: '',
    github: '',
    figma: '',
    collaborators: 'Matheus Szervinsk',
    challenge: '',
    solution: '',
    result: ''
  });
  const [projectSuccess, setProjectSuccess] = useState(false);

  // Estados do Gerador de Currículo
  const [jobRole, setJobRole] = useState('');
  const [jobCompany, setJobCompany] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [generatedResume, setGeneratedResume] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  if (!isAdminModalOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const result = login(password);
    if (result.success) {
      setPassword('');
      setLoginError('');
    } else {
      setLoginError(result.error);
    }
  };

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    if (!projectForm.title) return;

    const tagsArray = projectForm.tags.split(',').map((t) => t.trim()).filter(Boolean);

    addCustomProject({
      title: projectForm.title,
      emoji: projectForm.emoji || '🚀',
      category: projectForm.category || 'Full Stack',
      period: projectForm.period || '2026',
      subtitle: projectForm.subtitle || projectForm.description,
      description: projectForm.description,
      impact: projectForm.impact,
      tags: tagsArray,
      bgCard: 'bg-[#f0fdf4]',
      badgeBg: 'bg-[#86efac]',
      coverImage: projectForm.coverImage || null,
      galleryImages: projectForm.coverImage ? [{ url: projectForm.coverImage, caption: projectForm.title }] : [],
      github: projectForm.github || '',
      figma: projectForm.figma || '',
      collaborators: projectForm.collaborators || 'Matheus Szervinsk',
      techStack: {
        frontend: tagsArray.slice(0, 3),
        backend: tagsArray.slice(3, 6),
        infraAi: tagsArray.slice(6)
      },
      star: {
        challenge: {
          title: 'O Desafio (Situation & Task)',
          text: projectForm.challenge || projectForm.description
        },
        solution: {
          title: 'A Solução (Action & Architecture)',
          text: projectForm.solution || projectForm.description,
          highlights: []
        },
        impact: {
          title: 'O Impacto (Result & Metrics)',
          text: projectForm.result || projectForm.impact
        }
      }
    });

    setProjectSuccess(true);
    setTimeout(() => setProjectSuccess(false), 3000);
    setProjectForm({
      title: '',
      emoji: '🚀',
      category: 'Engenharia de Software',
      period: '2026',
      subtitle: '',
      description: '',
      impact: '',
      tags: 'React, Python, FastAPI, Docker',
      coverImage: '',
      github: '',
      figma: '',
      collaborators: 'Matheus Szervinsk',
      challenge: '',
      solution: '',
      result: ''
    });
  };

  const handleGenerateResume = (e) => {
    e.preventDefault();
    if (!jobDescription) return;

    const resume = generateTailoredResume({
      jobRole,
      jobCompany,
      jobDescription
    });
    setGeneratedResume(resume);
  };

  const handleCopyResume = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div 
      className="fixed inset-0 z-[110] flex items-center justify-center bg-zinc-950/85 backdrop-blur-md p-3 sm:p-6 animate-pop-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsAdminModalOpen(false);
      }}
    >
      <div 
        className="relative w-full max-w-5xl h-full max-h-[92vh] bg-[#faf8f5] border-3 border-zinc-950 rounded-[2rem] shadow-[12px_12px_0px_rgba(0,0,0,1)] flex flex-col overflow-hidden"
        role="dialog"
      >
        
        {/* --- CABEÇALHO DO PAINEL --- */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:px-8 sm:py-5 border-b-3 border-zinc-950 bg-white z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-yellow-300 border-2 border-zinc-950 flex items-center justify-center font-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">
              ⚡
            </div>
            <div>
              <h2 className="text-lg font-black text-zinc-950 leading-tight">
                Painel Administrativo
              </h2>
              <p className="text-xs font-mono text-zinc-500 font-bold">
                {isAdmin ? 'Sessão Ativa • Matheus Szervinsk' : 'Autenticação Necessária'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdmin && (
              <button
                onClick={logout}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border-2 border-zinc-950 bg-red-100 hover:bg-red-200 text-red-900 text-xs font-bold shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sair</span>
              </button>
            )}
            <button
              onClick={() => setIsAdminModalOpen(false)}
              className="p-2 rounded-xl border-2 border-zinc-950 bg-white hover:bg-zinc-100 text-zinc-900 shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* --- CONTEÚDO PRINCIPAL --- */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 no-scrollbar">
          
          {/* TELA DE LOGIN (Se não autenticado) */}
          {!isAdmin ? (
            <div className="max-w-md mx-auto my-12 bg-white p-6 sm:p-8 rounded-3xl border-3 border-zinc-950 shadow-[8px_8px_0px_rgba(0,0,0,1)] text-center">
              <div className="w-14 h-14 bg-amber-200 border-2 border-zinc-950 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-[3px_3px_0px_rgba(0,0,0,1)]">
                <Lock className="w-7 h-7 text-zinc-950" />
              </div>
              <h3 className="text-2xl font-black text-zinc-950 mb-2">Acesso Restrito</h3>
              <p className="text-xs text-zinc-600 font-medium mb-6">
                Informe a senha mestra para desbloquear a adição de projetos e gerador de currículos.
              </p>

              <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-mono font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                    Senha de Administrador
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Digite a senha..."
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-zinc-950 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    autoFocus
                  />
                  {loginError && (
                    <p className="text-xs text-red-600 font-bold mt-1.5">{loginError}</p>
                  )}
                  <p className="text-[11px] font-mono text-zinc-400 mt-1">
                    Dica padrão: <code>admin</code>
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl border-2 border-zinc-950 bg-yellow-300 hover:bg-yellow-400 text-zinc-950 font-black text-sm shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Entrar no Painel</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          ) : (
            
            /* TELA DO DASHBOARD ADMINISTRATIVO */
            <div className="space-y-8">
              
              {/* Abas de Navegação */}
              <div className="flex flex-wrap items-center gap-2 border-b-2 border-zinc-200 pb-4">
                <button
                  onClick={() => setActiveTab('projects')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-zinc-950 text-xs sm:text-sm font-black transition-all cursor-pointer ${
                    activeTab === 'projects'
                      ? 'bg-yellow-300 shadow-[3px_3px_0px_rgba(0,0,0,1)] -translate-y-0.5'
                      : 'bg-white hover:bg-zinc-100'
                  }`}
                >
                  <FolderPlus className="w-4 h-4" />
                  <span>Cadastrar Projeto ({customProjects.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('resume-generator')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-zinc-950 text-xs sm:text-sm font-black transition-all cursor-pointer ${
                    activeTab === 'resume-generator'
                      ? 'bg-[#cffafe] shadow-[3px_3px_0px_rgba(0,0,0,1)] -translate-y-0.5'
                      : 'bg-white hover:bg-zinc-100'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-cyan-800" />
                  <span>Gerador de Currículo por Vaga</span>
                </button>

                <button
                  onClick={() => setActiveTab('resume-list')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-zinc-950 text-xs sm:text-sm font-black transition-all cursor-pointer ${
                    activeTab === 'resume-list'
                      ? 'bg-[#dcfce7] shadow-[3px_3px_0px_rgba(0,0,0,1)] -translate-y-0.5'
                      : 'bg-white hover:bg-zinc-100'
                  }`}
                >
                  <FileText className="w-4 h-4 text-emerald-800" />
                  <span>Meus Currículos Salvos ({tailoredResumes.length})</span>
                </button>
              </div>

              {/* ABA 1: CADASTRAR NOVO PROJETO */}
              {activeTab === 'projects' && (
                <div className="space-y-8">
                  <div className="bg-white p-6 sm:p-8 rounded-3xl border-3 border-zinc-950 shadow-[6px_6px_0px_rgba(0,0,0,1)]">
                    <h3 className="text-xl font-black text-zinc-950 mb-1 flex items-center gap-2">
                      <PlusCircle className="w-5 h-5 text-emerald-600" />
                      <span>Adicionar Novo Projeto ao Portfólio</span>
                    </h3>
                    <p className="text-xs text-zinc-600 mb-6 font-medium">
                      O projeto cadastrado aqui será inserido dinamicamente na seção de projetos do seu site.
                    </p>

                    {projectSuccess && (
                      <div className="mb-6 p-4 rounded-xl bg-emerald-100 border-2 border-emerald-600 text-emerald-900 text-sm font-bold flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                        <span>Projeto publicado com sucesso no portfólio!</span>
                      </div>
                    )}

                    <form onSubmit={handleProjectSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-mono font-bold text-zinc-700 uppercase mb-1">
                            Título do Projeto *
                          </label>
                          <input
                            type="text"
                            required
                            value={projectForm.title}
                            onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                            placeholder="Ex: API FastGateway"
                            className="w-full px-3.5 py-2 rounded-xl border-2 border-zinc-950 text-sm font-medium focus:ring-2 focus:ring-yellow-400"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono font-bold text-zinc-700 uppercase mb-1">
                            Emoji
                          </label>
                          <input
                            type="text"
                            value={projectForm.emoji}
                            onChange={(e) => setProjectForm({ ...projectForm, emoji: e.target.value })}
                            placeholder="🚀"
                            className="w-full px-3.5 py-2 rounded-xl border-2 border-zinc-950 text-sm font-medium"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono font-bold text-zinc-700 uppercase mb-1">
                            Categoria / Badge
                          </label>
                          <input
                            type="text"
                            value={projectForm.category}
                            onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                            placeholder="Ex: Automação & IA"
                            className="w-full px-3.5 py-2 rounded-xl border-2 border-zinc-950 text-sm font-medium"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono font-bold text-zinc-700 uppercase mb-1">
                            Período / Ano
                          </label>
                          <input
                            type="text"
                            value={projectForm.period}
                            onChange={(e) => setProjectForm({ ...projectForm, period: e.target.value })}
                            placeholder="Ex: 2026"
                            className="w-full px-3.5 py-2 rounded-xl border-2 border-zinc-950 text-sm font-medium"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold text-zinc-700 uppercase mb-1">
                          Subtítulo / Tagline
                        </label>
                        <input
                          type="text"
                          value={projectForm.subtitle}
                          onChange={(e) => setProjectForm({ ...projectForm, subtitle: e.target.value })}
                          placeholder="Ex: Plataforma de microsserviços assíncronos com tolerância a falhas..."
                          className="w-full px-3.5 py-2 rounded-xl border-2 border-zinc-950 text-sm font-medium"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold text-zinc-700 uppercase mb-1">
                          Descrição Completa
                        </label>
                        <textarea
                          rows={2}
                          value={projectForm.description}
                          onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                          placeholder="Detalhes sobre a arquitetura e objetivo do projeto..."
                          className="w-full px-3.5 py-2 rounded-xl border-2 border-zinc-950 text-sm font-medium"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono font-bold text-zinc-700 uppercase mb-1">
                            Tags / Tecnologias (separadas por vírgula)
                          </label>
                          <input
                            type="text"
                            value={projectForm.tags}
                            onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })}
                            placeholder="React, FastAPI, PostgreSQL, Docker"
                            className="w-full px-3.5 py-2 rounded-xl border-2 border-zinc-950 text-sm font-medium"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono font-bold text-zinc-700 uppercase mb-1">
                            URL da Imagem de Capa (opcional)
                          </label>
                          <input
                            type="text"
                            value={projectForm.coverImage}
                            onChange={(e) => setProjectForm({ ...projectForm, coverImage: e.target.value })}
                            placeholder="Ex: /assets/projects/images/salva1.jpeg"
                            className="w-full px-3.5 py-2 rounded-xl border-2 border-zinc-950 text-sm font-medium"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono font-bold text-zinc-700 uppercase mb-1">
                            Repositório GitHub
                          </label>
                          <input
                            type="url"
                            value={projectForm.github}
                            onChange={(e) => setProjectForm({ ...projectForm, github: e.target.value })}
                            placeholder="https://github.com/szervinsk/..."
                            className="w-full px-3.5 py-2 rounded-xl border-2 border-zinc-950 text-sm font-medium"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono font-bold text-zinc-700 uppercase mb-1">
                            Link Figma / Protótipo
                          </label>
                          <input
                            type="url"
                            value={projectForm.figma}
                            onChange={(e) => setProjectForm({ ...projectForm, figma: e.target.value })}
                            placeholder="https://figma.com/..."
                            className="w-full px-3.5 py-2 rounded-xl border-2 border-zinc-950 text-sm font-medium"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="px-6 py-3 rounded-xl border-2 border-zinc-950 bg-emerald-300 hover:bg-emerald-400 text-zinc-950 font-black text-sm shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer flex items-center gap-2"
                      >
                        <PlusCircle className="w-4 h-4" />
                        <span>Publicar Projeto</span>
                      </button>
                    </form>
                  </div>

                  {/* Lista de Projetos Customizados */}
                  {customProjects.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-sm font-mono font-black text-zinc-900 uppercase">
                        Projetos Adicionados ({customProjects.length})
                      </h4>
                      <div className="space-y-3">
                        {customProjects.map((p) => (
                          <div key={p.id} className="bg-white p-4 rounded-2xl border-2 border-zinc-950 shadow-[3px_3px_0px_rgba(0,0,0,1)] flex items-center justify-between gap-4">
                            <div>
                              <p className="font-black text-zinc-950 text-sm flex items-center gap-2">
                                <span>{p.emoji}</span>
                                <span>{p.title}</span>
                                <span className="text-[11px] font-mono font-normal bg-zinc-100 px-2 py-0.5 rounded border border-zinc-300">{p.category}</span>
                              </p>
                              <p className="text-xs text-zinc-600 truncate max-w-lg mt-0.5">{p.subtitle}</p>
                            </div>
                            <button
                              onClick={() => deleteCustomProject(p.id)}
                              className="p-2 rounded-xl border border-red-300 bg-red-50 hover:bg-red-100 text-red-700 transition-colors cursor-pointer"
                              title="Excluir projeto"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ABA 2: GERADOR DE CURRÍCULO POR VAGA */}
              {activeTab === 'resume-generator' && (
                <div className="space-y-8">
                  <div className="bg-white p-6 sm:p-8 rounded-3xl border-3 border-zinc-950 shadow-[6px_6px_0px_rgba(0,0,0,1)]">
                    <h3 className="text-xl font-black text-zinc-950 mb-1 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-cyan-600" />
                      <span>Gerador de Currículo Sob Medida para Vaga</span>
                    </h3>
                    <p className="text-xs text-zinc-600 mb-6 font-medium">
                      Cole os requisitos da vaga abaixo para sintetizar um currículo otimizado com as competências e palavras-chave de Matheus Szervinsk.
                    </p>

                    <form onSubmit={handleGenerateResume} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono font-bold text-zinc-700 uppercase mb-1">
                            Título da Vaga / Cargo
                          </label>
                          <input
                            type="text"
                            value={jobRole}
                            onChange={(e) => setJobRole(e.target.value)}
                            placeholder="Ex: Desenvolvedor Python / Full Stack"
                            className="w-full px-3.5 py-2 rounded-xl border-2 border-zinc-950 text-sm font-medium"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono font-bold text-zinc-700 uppercase mb-1">
                            Empresa Alvo
                          </label>
                          <input
                            type="text"
                            value={jobCompany}
                            onChange={(e) => setJobCompany(e.target.value)}
                            placeholder="Ex: Nubank, Tech Corp..."
                            className="w-full px-3.5 py-2 rounded-xl border-2 border-zinc-950 text-sm font-medium"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold text-zinc-700 uppercase mb-1">
                          Descrição / Requisitos da Vaga *
                        </label>
                        <textarea
                          required
                          rows={6}
                          value={jobDescription}
                          onChange={(e) => setJobDescription(e.target.value)}
                          placeholder="Cole aqui a descrição completa da vaga do LinkedIn / Gupy / E-mail..."
                          className="w-full px-3.5 py-2.5 rounded-xl border-2 border-zinc-950 text-sm font-medium focus:ring-2 focus:ring-cyan-400"
                        />
                      </div>

                      <button
                        type="submit"
                        className="px-6 py-3 rounded-xl border-2 border-zinc-950 bg-cyan-300 hover:bg-cyan-400 text-zinc-950 font-black text-sm shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer flex items-center gap-2"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>Gerar Currículo Otimizado</span>
                      </button>
                    </form>
                  </div>

                  {/* Visualizador do Currículo Gerado */}
                  {generatedResume && (
                    <div className="bg-white p-6 sm:p-8 rounded-3xl border-3 border-zinc-950 shadow-[6px_6px_0px_rgba(0,0,0,1)] space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-zinc-100 pb-3">
                        <div>
                          <h4 className="text-lg font-black text-zinc-950">{generatedResume.title}</h4>
                          <span className="text-xs font-mono text-emerald-600 font-bold">● Otimizado e salvo automaticamente</span>
                        </div>
                        <button
                          onClick={() => handleCopyResume(generatedResume.content, 'generated')}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-zinc-950 bg-yellow-300 hover:bg-yellow-400 text-zinc-950 font-bold text-xs shadow-[2px_2px_0px_rgba(0,0,0,1)] cursor-pointer"
                        >
                          {copiedId === 'generated' ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4" />}
                          <span>{copiedId === 'generated' ? 'Copiado para a Área de Transferência!' : 'Copiar Markdown'}</span>
                        </button>
                      </div>

                      <pre className="p-4 bg-zinc-900 text-zinc-100 rounded-2xl text-xs font-mono overflow-x-auto whitespace-pre-wrap max-h-96 leading-relaxed border border-zinc-700">
                        {generatedResume.content}
                      </pre>
                    </div>
                  )}
                </div>
              )}

              {/* ABA 3: MEUS CURRÍCULOS SALVOS */}
              {activeTab === 'resume-list' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black text-zinc-950">
                      Versões de Currículo Cadastradas ({tailoredResumes.length})
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {tailoredResumes.map((resume) => (
                      <div key={resume.id} className="bg-white p-6 rounded-3xl border-3 border-zinc-950 shadow-[5px_5px_0px_rgba(0,0,0,1)] space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-zinc-100 pb-3">
                          <div>
                            <h4 className="text-base font-black text-zinc-950">{resume.title}</h4>
                            <p className="text-xs font-mono text-zinc-500">Criado em: {resume.createdAt}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleCopyResume(resume.content, resume.id)}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 border-zinc-950 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-bold text-xs shadow-[2px_2px_0px_rgba(0,0,0,1)] cursor-pointer"
                            >
                              {copiedId === resume.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                              <span>{copiedId === resume.id ? 'Copiado!' : 'Copiar'}</span>
                            </button>
                            {resume.id !== 'standard-fullstack' && (
                              <button
                                onClick={() => deleteTailoredResume(resume.id)}
                                className="p-2 rounded-xl border border-red-300 bg-red-50 hover:bg-red-100 text-red-700 cursor-pointer"
                                title="Excluir currículo"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>

                        <pre className="p-4 bg-zinc-50 text-zinc-800 rounded-xl text-xs font-mono overflow-x-auto whitespace-pre-wrap max-h-48 leading-relaxed border border-zinc-200">
                          {resume.content}
                        </pre>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
