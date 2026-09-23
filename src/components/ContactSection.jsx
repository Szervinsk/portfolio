import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Copy, 
  CheckCircle2, 
  ArrowUpRight, 
  MapPin, 
  ArrowUp, 
  Lock, 
  Send,
  Sparkles,
  Check
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { siteConfig } from '../content/siteConfig';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin } from '../context/AdminContext';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState('');
  const [brandClicks, setBrandClicks] = useState(0);
  const { t, language } = useLanguage();
  const isPt = language === 'pt';
  const { isAdmin, setIsLoginModalOpen } = useAdmin();

  // Estados do Formulário de Contato
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: isPt ? 'Projeto Full-Stack / Arquitetura' : 'Full-Stack Project / Architecture',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleBrandClick = () => {
    setBrandClicks((prev) => {
      const next = prev + 1;
      if (next >= 3) {
        setIsLoginModalOpen(true);
        return 0;
      }
      return next;
    });
  };

  useEffect(() => {
    if (brandClicks > 0) {
      const timer = setTimeout(() => setBrandClicks(0), 1000);
      return () => clearTimeout(timer);
    }
  }, [brandClicks]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: 'America/Sao_Paulo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setTime(new Intl.DateTimeFormat('pt-BR', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('mathszer1103@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    const emailSubject = encodeURIComponent(`[Portfólio] ${form.subject} — ${form.name}`);
    const emailBody = encodeURIComponent(
      `Nome: ${form.name}\nE-mail: ${form.email}\nDemanda: ${form.subject}\n\nMensagem:\n${form.message}`
    );

    // Abre o cliente de e-mail com os dados preenchidos
    window.location.href = `mailto:mathszer1103@gmail.com?subject=${emailSubject}&body=${emailBody}`;
    setIsSubmitted(true);
  };

  return (
    <footer id="contato" className="snap-section relative z-20 w-full text-zinc-100 flex flex-col justify-between">
      
      {/* ========================================================================= */}
      {/* 1. SEÇÃO DE CONTATO: FUNDO BLUEPRINT AZUL + LAYOUT 2 COLUNAS (TEXTO/FORM) */}
      {/* ========================================================================= */}
      <div 
        className="relative min-h-screen py-28 sm:py-36 lg:py-44 px-4 sm:px-6 lg:px-8 overflow-hidden flex flex-col justify-center"
        style={{
          backgroundColor: '#1d4ed8',
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.16) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.16) 1px, transparent 1px),
            linear-gradient(rgba(255, 255, 255, 0.06) 5px, transparent 5px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.06) 5px, transparent 5px)
          `,
          backgroundSize: '24px 24px, 24px 24px, 120px 120px, 120px 120px'
        }}
      >
        
        {/* Vinheta ambiente nas bordas */}
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_140px_rgba(10,25,60,0.7)]" />

        {/* Glow central suave em ciano */}
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-400/20 rounded-full blur-[140px] pointer-events-none" />

        {/* CONTAINER EM 2 COLUNAS: TEXTO À ESQUERDA + FORMULÁRIO À DIREITA */}
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-20">
          
          {/* ===================================================================== */}
          {/* COLUNA ESQUERDA (6 COLS): TEXTOS & BOTÕES DIRETOS                     */}
          {/* ===================================================================== */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            
            {/* Badge de Status */}
            <div className="motion-entry delay-0 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-[11px] font-mono text-cyan-200 mb-4 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{t.contact.statusBadge}</span>
            </div>

            {/* Título Editorial de Contato */}
            <h2 className="motion-entry delay-75 text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.06] mb-4">
              {t.contact.titleMain} <br />
              <span className="font-serif italic font-normal text-cyan-200">
                {t.contact.titleItalic}
              </span>{' '}
              {t.contact.titleEnd}
            </h2>

            {/* Subtítulo */}
            <p className="motion-entry delay-150 text-sm sm:text-base text-blue-100 font-medium leading-relaxed max-w-lg mb-6">
              {t.contact.subtitle}
            </p>

            {/* Botões Rápidos de Ação com Padrão do Projeto */}
            <div className="motion-entry delay-200 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 w-full sm:w-auto mb-6">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="flex items-center justify-center gap-2 bg-white hover:bg-zinc-100 text-zinc-950 font-black text-xs sm:text-sm px-4.5 py-2.5 rounded-xl border-2 border-zinc-950 shadow-[3px_3px_0px_rgba(0,0,0,0.3)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-zinc-950" />}
                <span>{copied ? (isPt ? 'E-mail Copiado!' : 'Copied!') : 'Copiar mathszer1103@gmail.com'}</span>
              </button>

              <a
                href={siteConfig.socials.email}
                className="flex items-center justify-center gap-2 bg-[#fef08a] hover:bg-[#fde047] text-zinc-950 font-black text-xs sm:text-sm px-4.5 py-2.5 rounded-xl border-2 border-zinc-950 shadow-[3px_3px_0px_rgba(0,0,0,0.3)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              >
                <Mail className="w-4 h-4 text-zinc-950" />
                <span>{t.contact.btnDirect}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-950" />
              </a>
            </div>

            {/* Ficha Técnica Rápida no Rodapé da Coluna */}
            <div className="motion-entry delay-250 flex flex-wrap items-center gap-4 text-xs font-mono text-blue-200/90 pt-2 border-t border-white/20 w-full">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>{isPt ? 'Resposta média: < 2 horas' : 'Avg reply: < 2h'}</span>
              </span>
              <span>•</span>
              <span>{isPt ? 'Brasília, DF (UTC-3) • Atuação Remota' : 'Brasília, Brazil • Remote Friendly'}</span>
            </div>

          </div>

          {/* ===================================================================== */}
          {/* COLUNA DIREITA (6 COLS): FORMULÁRIO DE TRANSMISSÃO DE MENSAGEM        */}
          {/* ===================================================================== */}
          <div className="motion-entry delay-200 lg:col-span-6 w-full">
            <div className="bg-white rounded-xl border-2 border-zinc-950 p-6 sm:p-7 shadow-[6px_6px_0px_rgba(0,0,0,0.3)] text-zinc-950 text-left relative overflow-hidden">
              
              {/* Header do Card / Ticket Blueprint */}
              <div className="flex items-center justify-between pb-3 border-b-2 border-zinc-150 mb-5">
                <div>
                  <h3 className="text-xs sm:text-sm font-black text-zinc-950 uppercase tracking-wide">
                    {isPt ? 'Formulário de Contato Direto' : 'Direct Message Dispatch'}
                  </h3>
                  <span className="text-[10px] font-mono text-zinc-500 font-bold">
                    {isPt ? 'Dispare uma mensagem diretamente para mim' : 'Send an inquiry directly to my inbox'}
                  </span>
                </div>
                <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded border border-emerald-300">
                  {isPt ? 'ONLINE' : 'ACTIVE'}
                </span>
              </div>

              {isSubmitted ? (
                /* Estado de Confirmação */
                <div className="py-8 text-center flex flex-col items-center animate-pop-in">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 border-2 border-emerald-600 flex items-center justify-center text-emerald-700 mb-3 shadow-[2px_2px_0px_rgba(0,0,0,0.1)]">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <h4 className="text-base font-black text-zinc-950 mb-1">
                    {isPt ? 'Mensagem Formatada com Sucesso!' : 'Message Formatted Successfully!'}
                  </h4>
                  <p className="text-xs text-zinc-600 font-medium max-w-xs mb-4">
                    {isPt 
                      ? 'Seu cliente de e-mail foi acionado com todos os parâmetros preenchidos.' 
                      : 'Your email client has been opened with your inquiry pre-filled.'}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setForm({ name: '', email: '', subject: 'Projeto Full-Stack / Arquitetura', message: '' });
                    }}
                    className="text-xs font-mono font-bold text-zinc-800 underline hover:text-zinc-950 cursor-pointer"
                  >
                    {isPt ? 'Enviar outra mensagem' : 'Send another message'}
                  </button>
                </div>
              ) : (
                /* Formulário */
                <form onSubmit={handleFormSubmit} className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-mono font-bold text-zinc-700 uppercase mb-1">
                        {isPt ? 'Seu Nome / Empresa *' : 'Name / Company *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder={isPt ? 'Ex: Lucas Alencar' : 'e.g. Alex Johnson'}
                        className="w-full px-3 py-2 rounded-lg border-2 border-zinc-950 text-xs font-medium focus:ring-2 focus:ring-yellow-400 bg-zinc-50/50"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono font-bold text-zinc-700 uppercase mb-1">
                        {isPt ? 'Seu E-mail *' : 'Email Address *'}
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="contato@empresa.com"
                        className="w-full px-3 py-2 rounded-lg border-2 border-zinc-950 text-xs font-medium focus:ring-2 focus:ring-yellow-400 bg-zinc-50/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono font-bold text-zinc-700 uppercase mb-1">
                      {isPt ? 'Tipo de Demanda / Contexto' : 'Project Category / Context'}
                    </label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border-2 border-zinc-950 text-xs font-medium bg-zinc-50/50 cursor-pointer"
                    >
                      <option value="Projeto Full-Stack / Arquitetura">{isPt ? 'Engenharia & Arquitetura Full-Stack' : 'Full-Stack Architecture'}</option>
                      <option value="Automação & IA Generativa">{isPt ? 'Automação Python & IA Generativa' : 'Python Automation & GenAI'}</option>
                      <option value="Oportunidade Profissional">{isPt ? 'Oportunidade Profissional (CLT / PJ)' : 'Career Opportunity'}</option>
                      <option value="Modernização de Legado">{isPt ? 'Modernização / Refatoração de Legado' : 'Legacy System Modernization'}</option>
                      <option value="Outro assunto">{isPt ? 'Outro assunto' : 'Other inquiries'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono font-bold text-zinc-700 uppercase mb-1">
                      {isPt ? 'Mensagem / Escopo *' : 'Message / Scope *'}
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder={isPt ? 'Descreva o desafio, escopo ou detalhes da oportunidade...' : 'Describe the project scope or opportunity details...'}
                      className="w-full px-3 py-2 rounded-lg border-2 border-zinc-950 text-xs font-medium focus:ring-2 focus:ring-yellow-400 bg-zinc-50/50 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-lg border-2 border-zinc-950 bg-[#fef08a] hover:bg-[#fde047] text-zinc-950 font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <span>{isPt ? 'Transmitir Mensagem' : 'Dispatch Message'}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* 2. DIV DE TRANSIÇÃO EM ARCO / CURVA (BLUEPRINT AZUL -> DARK FOOTER)      */}
      {/* ========================================================================= */}
      <div className="w-full overflow-hidden leading-none -mt-12 sm:-mt-16 md:-mt-24 lg:-mt-28 relative z-20 bg-transparent pointer-events-none">
        <svg 
          viewBox="0 0 1440 90" 
          fill="none" 
          className="w-full h-14 sm:h-20 md:h-28 lg:h-32 text-[#07101e] block" 
          preserveAspectRatio="none"
        >
          {/* Curva idêntica à referência: laterais iniciam altas e o centro mergulha suavemente */}
          <path d="M0,0 Q720,80 1440,0 L1440,90 L0,90 Z" fill="currentColor" />
        </svg>
      </div>

      {/* ========================================================================= */}
      {/* 3. FOOTER DARK (#07101e) COM INFORMAÇÕES DO PORTFÓLIO                    */}
      {/* ========================================================================= */}
      <div className="bg-[#07101e] pt-3 pb-6 px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Informações Centralizadas */}
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-mono text-zinc-400">
          
          {/* Links de Navegação */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 font-bold">
            <a href="#sobre" className="hover:text-white transition-colors">{t.contact.footerLinks.about}</a>
            <a href="#trajetoria" className="hover:text-white transition-colors">{t.contact.footerLinks.experience}</a>
            <a href="#projetos" className="hover:text-white transition-colors">{t.contact.footerLinks.projects}</a>
            <a href="#skills" className="hover:text-white transition-colors">{t.contact.footerLinks.skills}</a>
            <a href={siteConfig.socials.github} target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
              <GithubIcon className="w-3.5 h-3.5" />
              <span>{t.contact.footerLinks.github}</span>
            </a>
            <a href={siteConfig.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
              <LinkedinIcon className="w-3.5 h-3.5" />
              <span>{t.contact.footerLinks.linkedin}</span>
            </a>
          </div>

          <span className="hidden md:inline text-zinc-700">|</span>

          {/* Identidade / Marca (com easter egg de 3 cliques) */}
          <div 
            onClick={handleBrandClick}
            className="flex items-center gap-1.5 text-white font-black tracking-tight text-xs cursor-default select-none"
            title="Matheus Szervinsk"
          >
            <div className="w-4.5 h-4.5 rounded-full bg-[#fef08a] text-zinc-950 flex items-center justify-center text-[9px] font-black">
              MS
            </div>
            <span>Matheus Szervinsk</span>
          </div>

          <span className="hidden md:inline text-zinc-700">|</span>

          {/* Localização, Horário & Retornar ao Topo */}
          <div className="flex items-center gap-2.5 text-zinc-400">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-cyan-400" />
              <span>{t.contact.location}</span>
            </span>
            
            <span className="text-zinc-600">|</span>
            
            <span className="font-bold text-zinc-200">{time || '18:00:00'}</span>

            <button
              onClick={scrollToTop}
              aria-label="Voltar ao topo"
              className="ml-1.5 p-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Botão Secreto de ADM: Isolado totalmente no canto direito */}
        {!isAdmin && (
          <div className="absolute right-3 sm:right-6 bottom-3 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2">
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity duration-300 p-2 rounded text-zinc-600 hover:text-white cursor-pointer"
              title="Admin (Ctrl+Shift+A)"
              aria-label="Admin"
            >
              <Lock className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

    </footer>
  );
}
