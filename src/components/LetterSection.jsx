import React, { useState, useEffect } from 'react';
import { 
  Download, 
  Eye, 
  ExternalLink, 
  FileText, 
  CheckCircle2, 
  Sliders,
  Check
} from 'lucide-react';
import { StickyNote } from './ScrapbookElements';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin } from '../context/AdminContext';

export default function ResumeHubSection() {
  const { language } = useLanguage();
  const { 
    isAdmin, 
    customResumes, 
    activeResumeId, 
    setActiveResumeId, 
    activeResume
  } = useAdmin();

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // O PDF e dados exibidos refletem o currículo ativo escolhido pelo admin
  const currentResumeUrl = activeResume?.url || "/assets/resumes/curriculo-matheus-szervinsk.pdf";
  const currentFileName = activeResume?.fileName || "curriculo_matheus_szervinsk.pdf";

  // Trava scroll ao abrir preview
  useEffect(() => {
    if (isPreviewOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isPreviewOpen]);

  return (
    <section id="carta" className="snap-section min-h-screen py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-letter-board text-white relative z-20 overflow-hidden border-t-2 border-zinc-800 flex flex-col justify-center items-center">
      
      <div className={`mx-auto w-full flex flex-col items-center ${isAdmin ? 'max-w-5xl' : 'max-w-4xl'}`}>
        
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-lg mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-700 bg-zinc-900 text-[11px] font-mono font-bold text-yellow-300 mb-2.5">
            <FileText className="w-3.5 h-3.5" />
            <span>RESUME & CREDENTIALS</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white">
            {language === 'pt' ? 'Currículo' : 'Official'}{' '}
            <span className="bg-[#fef08a] font-serif italic font-normal text-zinc-950 px-2.5 py-0.5 rounded-xl border border-zinc-900 inline-block -rotate-1">
              {language === 'pt' ? 'Profissional' : 'Resume'}
            </span>
          </h2>
          
          <p className="mt-2 text-zinc-400 text-xs sm:text-sm">
            {language === 'pt' 
              ? 'Visualize a versão atualizada em tela cheia ou baixe o PDF para compartilhamento direto.' 
              : 'Inspect the up-to-date document in fullscreen or download the PDF directly.'}
          </p>
        </div>

        {/* --- LAYOUT DO MODO EDITOR vs VISITANTE --- */}
        {isAdmin ? (
          
          /* LAYOUT NO MODO EDITOR (SELETOR LATERAL AMARELO + PRANCHETA CENTRAL) */
          <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-start animate-pop-in">
            
            {/* 1. SELETOR LATERAL DE MODELOS (CAIXA AMARELA) */}
            <div className="md:col-span-5 bg-[#fef08a] text-zinc-950 border-3 border-zinc-950 p-5 rounded-3xl shadow-[6px_6px_0px_rgba(0,0,0,1)] space-y-3.5">
              <div className="flex items-center justify-between border-b-2 border-zinc-950/20 pb-2.5">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-zinc-950" />
                  <h3 className="text-xs font-mono font-black uppercase text-zinc-950">Modelos de Currículo</h3>
                </div>
                <span className="text-[10px] font-mono bg-zinc-950 text-yellow-300 font-bold px-2 py-0.5 rounded-md">
                  {(customResumes || []).length} opções
                </span>
              </div>

              <p className="text-[11px] font-bold text-zinc-800 leading-snug">
                Escolha o modelo ativo que será exibido no site e baixado pelos visitantes:
              </p>

              <div className="space-y-2.5">
                {(customResumes || []).map((res) => {
                  const isSelected = res?.id === activeResumeId;
                  return (
                    <div
                      key={res?.id || Math.random()}
                      onClick={() => res?.id && setActiveResumeId(res.id)}
                      className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between text-left ${
                        isSelected
                          ? 'bg-zinc-950 text-white border-zinc-950 shadow-[4px_4px_0px_rgba(0,0,0,1)] -translate-y-0.5'
                          : 'bg-white hover:bg-zinc-50 text-zinc-950 border-zinc-950 shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <h4 className={`text-xs font-black ${isSelected ? 'text-yellow-300' : 'text-zinc-950'}`}>
                            {res?.title || 'Currículo'}
                          </h4>
                          {isSelected && (
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                          )}
                        </div>
                        <p className={`text-[10px] line-clamp-2 leading-relaxed ${isSelected ? 'text-zinc-300' : 'text-zinc-600 font-medium'}`}>
                          {res?.summary || ''}
                        </p>
                      </div>

                      <div className={`mt-2.5 pt-2 border-t flex items-center justify-between text-[9px] font-mono ${
                        isSelected ? 'border-zinc-800' : 'border-zinc-200'
                      }`}>
                        <span className={isSelected ? 'text-zinc-400 font-bold' : 'text-zinc-500 font-bold'}>{res?.role || ''}</span>
                        <span className={isSelected ? 'text-emerald-400 font-bold' : 'text-zinc-900 font-black'}>
                          {isSelected ? '● ATIVO NO SITE' : 'Selecionar'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. PRANCHETA CENTRAL DA VERSÃO ATIVA (7 colunas) */}
            <div className="md:col-span-7 flex flex-col items-center">
              <div className="relative w-full bg-white text-zinc-900 p-5 sm:p-7 rounded-3xl paper-shadow border-2 border-zinc-300 z-10">
                
                {/* Barra de controle da folha */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-mono font-bold text-zinc-800 uppercase tracking-wide truncate max-w-[240px]">
                      {currentFileName}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono bg-yellow-300 text-zinc-950 font-black px-2.5 py-0.5 rounded-md border border-zinc-950 shadow-2xs">
                    ● {activeResume?.title || 'Versão Ativa'}
                  </span>
                </div>

                {/* Preview do Documento / Miniatura clicável */}
                <div className="relative w-full h-72 rounded-xl border-2 border-dashed border-zinc-300 bg-zinc-50 overflow-hidden flex flex-col justify-between p-5 group">
                  
                  <div className="space-y-2.5 opacity-70">
                    <div className="h-4 bg-zinc-300 rounded w-2/5" />
                    <div className="h-2.5 bg-zinc-200 rounded w-4/5" />
                    <div className="h-2.5 bg-zinc-200 rounded w-3/4" />
                    <div className="h-px bg-zinc-200 my-3" />
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <div className="h-3 bg-zinc-300 rounded w-1/2" />
                        <div className="h-2 bg-zinc-200 rounded w-full" />
                        <div className="h-2 bg-zinc-200 rounded w-5/6" />
                      </div>
                      <div className="space-y-1.5">
                        <div className="h-3 bg-zinc-300 rounded w-1/2" />
                        <div className="h-2 bg-zinc-200 rounded w-full" />
                        <div className="h-2 bg-zinc-200 rounded w-5/6" />
                      </div>
                    </div>
                  </div>

                  {/* Overlay interativo sobre a miniatura */}
                  <div className="absolute inset-0 bg-zinc-950/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 p-4">
                    <button
                      onClick={() => setIsPreviewOpen(true)}
                      className="flex items-center gap-1.5 bg-white text-zinc-950 font-bold text-xs px-4 py-2 rounded-xl shadow-lg hover:scale-105 transition-transform cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Visualizar Página</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-xs text-zinc-600 font-mono pt-3 border-t border-zinc-200">
                    <span className="font-bold">{activeResume?.role || 'Engenharia de Software'}</span>
                    <span>Brasília, DF</span>
                  </div>
                </div>

                {/* Ações de Download e Tela Cheia */}
                <div className="mt-5 pt-4 border-t border-zinc-200 flex flex-wrap items-center justify-between gap-3">
                  <button
                    onClick={() => setIsPreviewOpen(true)}
                    className="flex items-center gap-1 px-4 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-bold text-xs transition-colors border border-zinc-300 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Inspecionar</span>
                  </button>

                  <a
                    href={currentResumeUrl}
                    download={currentFileName}
                    className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#fef08a] hover:bg-[#fde047] text-zinc-950 font-black text-xs uppercase border-2 border-zinc-900 shadow-[2px_2px_0px_rgba(24,24,27,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Baixar PDF</span>
                  </a>
                </div>

              </div>
            </div>

          </div>

        ) : (
          
          /* LAYOUT PADRÃO PARA VISITANTES */
          <div className="relative w-full max-w-xl my-2">
            {/* Sticky Note lateral direito */}
            <div className="absolute -right-4 sm:-right-0 sm:-top-0 bottom-6 hidden md:block z-30 pointer-events-none">
              <StickyNote
                title="recruiter note"
                note={language === 'pt' ? 'Disponível para posições presenciais e remotas.' : 'Available for full-time on-site & remote roles.'}
                subtitle="Brasília, DF • UTC-3"
                rotate="rotate-[5deg]"
                className="w-40"
              />
            </div>

            {/* Prancheta Central (Folha A4 simulada) */}
            <div className="relative bg-white text-zinc-900 p-5 sm:p-7 rounded-2xl paper-shadow border-2 border-zinc-300 z-10">
              {/* Barra de controle da folha */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-mono font-bold text-zinc-700 uppercase tracking-wide">
                    {currentFileName}
                  </span>
                </div>
                <span className="text-[10px] font-mono bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded border border-zinc-200">
                  A4 • PDF
                </span>
              </div>

              {/* Preview do Documento / Miniatura clicável */}
              <div className="relative w-full h-64 sm:h-72 rounded-xl border-2 border-dashed border-zinc-300 bg-zinc-50 overflow-hidden flex flex-col justify-between p-5 group">
                
                <div className="space-y-2.5 opacity-70">
                  <div className="h-4 bg-zinc-300 rounded w-2/5" />
                  <div className="h-2.5 bg-zinc-200 rounded w-4/5" />
                  <div className="h-2.5 bg-zinc-200 rounded w-3/4" />
                  <div className="h-px bg-zinc-200 my-3" />
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <div className="h-3 bg-zinc-300 rounded w-1/2" />
                      <div className="h-2 bg-zinc-200 rounded w-full" />
                      <div className="h-2 bg-zinc-200 rounded w-5/6" />
                    </div>
                    <div className="space-y-1.5">
                      <div className="h-3 bg-zinc-300 rounded w-1/2" />
                      <div className="h-2 bg-zinc-200 rounded w-full" />
                      <div className="h-2 bg-zinc-200 rounded w-5/6" />
                    </div>
                  </div>
                </div>

                {/* Overlay interativo sobre a miniatura */}
                <div className="absolute inset-0 bg-zinc-950/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 p-4">
                  <button
                    onClick={() => setIsPreviewOpen(true)}
                    className="flex items-center gap-1.5 bg-white text-zinc-950 font-bold text-xs px-3.5 py-2 rounded-xl shadow-lg hover:scale-105 transition-transform cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{language === 'pt' ? 'Visualizar Página' : 'Inspect'}</span>
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] text-zinc-500 font-mono pt-3 border-t border-zinc-200">
                  <span>Engenharia de Software • UnB</span>
                  <span>Brasília, DF</span>
                </div>
              </div>

              {/* Ações de Download e Tela Cheia */}
              <div className="mt-5 pt-4 border-t border-zinc-200 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{language === 'pt' ? 'Assinado e validado' : 'Verified document'}</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => setIsPreviewOpen(true)}
                    className="flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-bold text-xs transition-colors border border-zinc-300 cursor-pointer"
                  >
                    <Eye className="w-3 h-3" />
                    <span>{language === 'pt' ? 'Abrir Prévia' : 'Preview'}</span>
                  </button>

                  <a
                    href={currentResumeUrl}
                    download={currentFileName}
                    className="flex items-center gap-1 px-4 py-1.5 rounded-xl bg-[#fef08a] hover:bg-[#fde047] text-zinc-950 font-black text-xs uppercase border-2 border-zinc-900 shadow-[2px_2px_0px_rgba(24,24,27,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
                  >
                    <Download className="w-3 h-3" />
                    <span>{language === 'pt' ? 'Baixar PDF' : 'Download'}</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* Modal / Iframe para Inspeção em Tela Cheia */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-[100] bg-zinc-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-pop-in">
          <div className="relative w-full max-w-4xl h-[85vh] bg-zinc-900 border-2 border-zinc-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            
            {/* Barra do Modal */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-950">
              <span className="font-mono text-xs text-zinc-300 font-bold">
                {currentFileName}
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={currentResumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-zinc-400 hover:text-white p-1"
                  title="Abrir em nova aba"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  onClick={() => setIsPreviewOpen(false)}
                  className="text-xs font-mono font-bold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-3 py-1 rounded-lg border border-zinc-700 transition-colors cursor-pointer"
                >
                  ESC / Fechar
                </button>
              </div>
            </div>

            {/* Iframe Real em tela cheia controlada */}
            <div className="flex-1 bg-zinc-800 w-full h-full">
              <iframe
                src={`${currentResumeUrl}#toolbar=0`}
                title="Prévia do Currículo"
                className="w-full h-full border-none"
              />
            </div>
          </div>
        </div>
      )}

    </section>
  );
}