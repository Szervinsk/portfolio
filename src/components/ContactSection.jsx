import React, { useState, useEffect } from 'react';
import { Mail, Copy, CheckCircle2, ArrowUpRight, MapPin, ArrowUp, Lock } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { siteConfig } from '../content/siteConfig';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin } from '../context/AdminContext';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState('');
  const [brandClicks, setBrandClicks] = useState(0);
  const { t } = useLanguage();
  const { isAdmin, setIsLoginModalOpen } = useAdmin();

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

  return (
    <footer id="contato" className="snap-section relative z-20 bg-[#07120a] w-[100%] text-zinc-100 overflow-hidden border-t-2 border-emerald-900/40 min-h-screen flex flex-col justify-between">
      <div className="relative flex-1 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-cutting-mat overflow-hidden border-b border-emerald-900/50 flex flex-col justify-center">
        
        {/* Ambient Dark Vignette around edges */}
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.6)]" />

        {/* --- MAIN CENTER CTA CARD --- */}
        <div className="relative z-20 max-w-2xl mx-auto text-center flex flex-col items-center px-4">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/40 bg-emerald-950/80 backdrop-blur-md text-[11px] font-mono text-emerald-300 mb-4 shadow-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{t.contact.statusBadge}</span>
          </div>

          {/* Big Editorial Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.06]">
            {t.contact.titleMain} <br />
            <span className="font-serif italic font-normal text-emerald-300">{t.contact.titleItalic}</span> {t.contact.titleEnd}
          </h2>

          {/* Subtitle */}
          <p className="mt-4 text-xs sm:text-sm text-emerald-100/90 font-medium max-w-lg mx-auto leading-relaxed">
            {t.contact.subtitle}
          </p>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleCopyEmail}
              className="flex items-center gap-2 bg-white hover:bg-zinc-100 text-zinc-950 font-black text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-[0_6px_20px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-zinc-950" />}
              <span>{copied ? t.contact.btnCopied : t.contact.btnCopy}</span>
            </button>

            <a
              href={siteConfig.socials.email}
              className="flex items-center gap-2 bg-emerald-950/90 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm px-4.5 py-2.5 rounded-full border border-emerald-500/50 shadow-md hover:scale-105 transition-all"
            >
              <Mail className="w-4 h-4 text-emerald-300" />
              <span>{t.contact.btnDirect}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
            </a>
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* 2. MINIMALIST DARK FOOTER BAR */}
      {/* ========================================================================= */}
      <div className="bg-[#050b07] py-5 px-4 sm:px-6 lg:px-8 border-t border-zinc-800/80 relative">
        {/* Informações Centralizadas */}
        <div className="max-w-full mx-auto flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6 text-[11px] font-mono text-zinc-400">
          
          {/* Links de Navegação */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 font-bold">
            <a href="#sobre" className="hover:text-white transition-colors">{t.contact.footerLinks.about}</a>
            <a href="#atuacoes" className="hover:text-white transition-colors">{t.contact.footerLinks.atuacoes}</a>
            <a href="#skills" className="hover:text-white transition-colors">{t.contact.footerLinks.skills}</a>
            <a href="#projetos" className="hover:text-white transition-colors">{t.contact.footerLinks.projects}</a>
            <a href="#trajetoria" className="hover:text-white transition-colors">{t.contact.footerLinks.experience}</a>
            <a href={siteConfig.socials.github} target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
              <GithubIcon className="w-3 h-3" />
              <span>{t.contact.footerLinks.github}</span>
            </a>
            <a href={siteConfig.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
              <LinkedinIcon className="w-3 h-3" />
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
            <div className="w-4.5 h-4.5 rounded-full bg-emerald-500 text-zinc-950 flex items-center justify-center text-[9px] font-black">
              MS
            </div>
            <span>Matheus Szervinsk</span>
          </div>

          <span className="hidden md:inline text-zinc-700">|</span>

          {/* Localização, Horário & Retornar ao Topo */}
          <div className="flex items-center gap-2.5 text-zinc-400">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-emerald-400" />
              {t.contact.location}
            </span>
            <span className="text-zinc-600">|</span>
            <span className="font-bold text-zinc-200">{time || '18:00:00'}</span>

            <button
              onClick={scrollToTop}
              aria-label="Voltar ao topo"
              className="ml-1.5 p-1 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowUp className="w-3 h-3" />
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
