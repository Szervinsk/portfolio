import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { siteConfig } from '../content/siteConfig';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar({ activeSection }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  // Detecta automaticamente se qualquer modal está aberta (overflow: hidden no body)
  useEffect(() => {
    const checkModal = () => {
      const isLocked = document.body.style.overflow === 'hidden';
      setIsModalOpen(isLocked);
    };

    checkModal();

    const observer = new MutationObserver(checkModal);
    observer.observe(document.body, { attributes: true, attributeFilter: ['style'] });

    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { label: t.nav.about, href: '#sobre', id: 'sobre' },
    { label: t.nav.experience, href: '#trajetoria', id: 'trajetoria' },
    { label: t.nav.projects, href: '#projetos', id: 'projetos' },
    { label: t.nav.skills, href: '#skills', id: 'skills' },
    { label: t.nav.atuacoes, href: '#atuacoes', id: 'atuacoes' },
    { label: t.nav.contact, href: '#contato', id: 'contato' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-4 pointer-events-none transition-all duration-300 flex flex-col items-center ${
        isModalOpen ? 'opacity-0 -translate-y-12 pointer-events-none' : 'opacity-100 translate-y-0'
      }`}
    >
      
      {/* Navbar flutuante (Pill) */}
      <div className="w-full max-w-5xl bg-white border-2 border-zinc-900 rounded-full px-4 sm:px-5 py-2 shadow-[3px_3px_0px_rgba(24,24,27,1)] flex items-center justify-between pointer-events-auto">
        
        {/* Logo / Identifier */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-6 h-6 rounded-full bg-zinc-900 text-[#fef08a] flex items-center justify-center font-black text-[11px] group-hover:-rotate-12 transition-transform shadow-inner">
            MS
          </div>
          <div className="flex flex-col">
            <span className="font-black text-xs sm:text-sm tracking-tight text-zinc-900 leading-none">
              Matheus Szervinsk
            </span>
            <span className="text-[9px] font-mono text-zinc-500 hidden sm:block leading-none mt-0.5">
              Software Engineer
            </span>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-0.5">
          {navLinks.map((item) => {
            const isActive = activeSection === item.id || (item.id === 'projetos' && String(activeSection).startsWith('projeto'));
            return (
              <a
                key={item.href}
                href={item.href}
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                  isActive
                    ? 'bg-zinc-900 text-white shadow-[1.5px_1.5px_0px_rgba(0,0,0,0.2)]'
                    : 'text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right side: Language Switcher & CTA */}
        <div className="hidden md:flex items-center gap-2.5">
          
          {/* Language Toggle */}
          <div className="flex items-center bg-zinc-100 p-0.5 rounded-full border border-zinc-200 text-[10px] font-mono font-bold">
            <button
              onClick={() => setLanguage('pt')}
              className={`px-2.5 py-0.5 rounded-full transition-all cursor-pointer text-sm ${
                language === 'pt' ? 'bg-green-600 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              🇧🇷
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-0.5 rounded-full transition-all cursor-pointer text-sm ${
                language === 'en' ? 'bg-zinc-900 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-900'
              }`}
            >
              🇺🇸
            </button>
          </div>

          {/* CTA Button */}
          <a
            href="#contato"
            className="flex items-center gap-1 bg-[#fef08a] hover:bg-[#fde047] text-zinc-900 font-black text-[11px] uppercase tracking-wider px-3.5 py-1.5 rounded-full border-2 border-zinc-900 shadow-[2px_2px_0px_rgba(24,24,27,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[0px_0px_0px_rgba(24,24,27,1)] transition-all"
          >
            <span>{t.nav.cta}</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>

        {/* Mobile menu triggers */}
        <div className="md:hidden flex items-center gap-2">
          {/* Mobile Language Button */}
          <button
            onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
            className="px-2.5 py-0.5 rounded-full bg-zinc-100 border border-zinc-300 font-mono text-[10px] font-bold text-zinc-900"
          >
            {language.toUpperCase()}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menu"
            className="p-1.5 rounded-full bg-zinc-900 text-white shadow-[2px_2px_0px_rgba(0,0,0,0.2)] hover:scale-105 transition-transform"
          >
            {mobileMenuOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden w-full max-w-sm mt-3 bg-white border-2 border-zinc-900 rounded-3xl p-5 shadow-[5px_5px_0px_rgba(24,24,27,1)] pointer-events-auto animate-pop-in">
          <div className="flex items-center gap-2 pb-3 border-b border-zinc-200 mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[11px] font-mono text-zinc-600 font-bold">{t.nav.status}</span>
          </div>

          <div className="flex flex-col gap-1">
            {navLinks.map((item) => {
              const isActive = activeSection === item.id || (item.id === 'projetos' && String(activeSection).startsWith('projeto'));
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-xl text-sm font-black transition-transform ${
                    isActive
                      ? 'bg-zinc-900 text-white translate-x-1'
                      : 'text-zinc-800 hover:bg-zinc-100 hover:translate-x-2'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-zinc-200 flex flex-col gap-3">
            <a
              href="#contato"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center px-4 py-2.5 rounded-xl bg-[#fef08a] text-zinc-900 font-black text-xs uppercase border-2 border-zinc-900 shadow-[2px_2px_0px_rgba(24,24,27,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_rgba(24,24,27,1)] transition-all"
            >
              {t.nav.cta}
            </a>
            
            <div className="flex justify-center gap-3 mt-1">
              <a href={siteConfig.socials.github} target="_blank" rel="noreferrer" className="p-2.5 rounded-full bg-zinc-100 hover:bg-zinc-200 border-2 border-zinc-900 text-zinc-800 transition-colors">
                <GithubIcon className="w-4 h-4" />
              </a>
              <a href={siteConfig.socials.linkedin} target="_blank" rel="noreferrer" className="p-2.5 rounded-full bg-zinc-100 hover:bg-zinc-200 border-2 border-zinc-900 text-zinc-800 transition-colors">
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}