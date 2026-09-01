import React, { useState, useEffect } from 'react';
import { Sparkles, LogOut, Lock, LayoutDashboard, ArrowRight } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export default function EditorToolbar() {
  const { isAdmin, setIsLoginModalOpen, logout } = useAdmin();
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 1. Detecta se o Footer (#contato) está visível na tela para visitantes normais
  useEffect(() => {
    const footerElement = document.getElementById('contato');
    if (!footerElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(footerElement);
    return () => observer.disconnect();
  }, []);

  // 2. Detecta se qualquer modal está aberta (overflow: hidden no body)
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

  // Se não for admin, esconde quando o footer estiver na tela. Se for admin, esconde apenas se modal estiver aberta.
  const shouldHide = isModalOpen || (!isAdmin && isFooterVisible);

  return (
    <div 
      className={`fixed bottom-4 right-4 z-40 pointer-events-auto transition-all duration-300 ${
        shouldHide ? 'opacity-0 translate-y-6 pointer-events-none' : 'opacity-100 translate-y-0'
      }`}
    >
      {!isAdmin ? (
        
        /* BOTÃO FIXO DE ACESSO AO MODO ADM */
        <button
          onClick={() => setIsLoginModalOpen(true)}
          className="bg-white/90 hover:bg-white text-zinc-500 hover:text-zinc-950 backdrop-blur-md px-3.5 py-1.5 rounded-full border-2 border-zinc-900 shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 italic cursor-pointer underline text-[11px] font-medium transition-all opacity-70 hover:opacity-100 flex items-center gap-1.5"
          title="Acessar modo de administração / edição"
        >
          <Lock className="w-3 h-3 text-zinc-700" />
          <span>Se você for o adm clica aqui</span>
        </button>

      ) : (

        /* BARRA FLUTUANTE DO MODO EDITOR ATIVO */
        <div className="bg-zinc-950 text-white border-2 border-yellow-400 rounded-2xl px-3.5 py-2 shadow-[4px_4px_0px_rgba(0,0,0,1)] flex items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-black text-yellow-300">Modo Editor Ativo</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 border-l border-zinc-800 pl-3 text-zinc-400 text-[11px]">
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
            <span>•</span>
            <a href="#projetos" className="hover:text-white transition-colors">Projetos</a>
            <span>•</span>
            <a href="#carta" className="hover:text-white transition-colors">Currículo</a>
            <span>•</span>
            <a 
              href="#admin-hub" 
              className="bg-yellow-300 hover:bg-yellow-400 text-zinc-950 px-2 py-0.5 rounded font-black transition-colors flex items-center gap-1 shadow-xs"
            >
              <LayoutDashboard className="w-3 h-3" />
              <span>Central de Atividades</span>
            </a>
          </div>

          <button
            onClick={logout}
            className="ml-1 p-1 px-2.5 rounded-lg bg-zinc-800 hover:bg-red-900/80 text-zinc-300 hover:text-white text-[10px] font-bold border border-zinc-700 transition-colors cursor-pointer flex items-center gap-1"
            title="Desativar modo editor"
          >
            <LogOut className="w-3 h-3" />
            <span>Sair</span>
          </button>
        </div>

      )}
    </div>
  );
}
