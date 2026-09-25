import React, { useState } from 'react';
import { 
  Flame, 
  RotateCw, 
  Code2, 
  ArrowUpRight, 
  BarChart3, 
  Sparkles,
  GitCommit,
  CheckCircle2
} from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { useGitHubData } from '../hooks/useGitHubData';
import { useLanguage } from '../context/LanguageContext';
import GitHubHeatmap from './github/GitHubHeatmap';

export default function StatsSection() {
  const { language } = useLanguage();
  const isPt = language === 'pt';
  const { data, loading, refresh } = useGitHubData();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedLang, setSelectedLang] = useState(null);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refresh();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const languages = data?.languages || [];
  const totalContributions = data?.totalAllTimeContributions || 935;
  const currentYearContributions = data?.totalContributionsThisYear || 419;

  return (
    <section 
      id="stats" 
      className="snap-section min-h-screen py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#ecfdf5] bg-dot-pattern relative z-20 border-t-2 border-zinc-950/10 flex flex-col justify-center items-center"
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col items-center">
        
        {/* ===================================================================== */}
        {/* 1. CABEÇALHO DA SEÇÃO (COMPACTO)                                      */}
        {/* ===================================================================== */}
        <div className="text-center max-w-2xl mx-auto mb-5 sm:mb-6">
          <div className="motion-entry delay-0 inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-zinc-900 bg-white shadow-[2px_2px_0px_rgba(24,24,27,1)] text-[11px] font-mono font-bold text-emerald-950 mb-2">
            <BarChart3 className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isPt ? 'GITHUB STATS & CODE METRICS' : 'GITHUB STATS & CODE METRICS'}</span>
          </div>

          <h2 className="motion-entry delay-75 text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight leading-tight">
            {isPt ? 'Atividade no GitHub &' : 'GitHub Activity &'}{' '}
            <span className="font-serif italic font-normal bg-emerald-300 px-2.5 py-0.5 rounded-xl border-2 border-zinc-900 shadow-[2px_2px_0px_rgba(24,24,27,1)] inline-block -rotate-1 text-zinc-950">
              {isPt ? 'Estatísticas' : 'Statistics'}
            </span>
          </h2>

          <p className="motion-entry delay-150 mt-1.5 text-zinc-600 text-xs sm:text-sm font-medium max-w-xl mx-auto leading-relaxed">
            {isPt 
              ? 'Dados em tempo real da API do GitHub: total de contribuições, distribuição das linguagens e mapa de calor.' 
              : 'Real-time metrics fetched from GitHub API: contribution counts, top languages breakdown, and activity heatmap.'}
          </p>
        </div>

        {/* ===================================================================== */}
        {/* 2. GRID COMPACTO EM ALTURA: RESUMO + LINGUAGENS (SLIM BANNER)          */}
        {/* ===================================================================== */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-4 mb-5 sm:mb-6">
          
          {/* Card Resumo de Contribuições (lg:col-span-5) - Compacto em Altura */}
          <div className="motion-entry delay-200 lg:col-span-5 bg-white rounded-2xl border-2 sm:border-3 border-zinc-950 p-4 sm:p-4.5 shadow-[4px_4px_0px_rgba(24,24,27,1)] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2 pb-1 border-b border-zinc-100">
              <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{isPt ? 'Contribuições' : 'Contributions'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  title={isPt ? 'Atualizar estatísticas' : 'Refresh stats'}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-zinc-950 bg-zinc-100 hover:bg-zinc-200 text-[10px] font-mono font-bold text-zinc-800 shadow-[1px_1px_0px_rgba(0,0,0,1)] transition-all cursor-pointer active:translate-y-0.5"
                >
                  <RotateCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin text-emerald-600' : ''}`} />
                  <span>{isPt ? 'Atualizar' : 'Refresh'}</span>
                </button>

                <a
                  href="https://github.com/Szervinsk"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-zinc-950 bg-zinc-950 hover:bg-zinc-800 text-white text-[10px] font-mono font-bold shadow-[1px_1px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
                >
                  <GithubIcon className="w-3 h-3" />
                  <span>@Szervinsk</span>
                  <ArrowUpRight className="w-2.5 h-2.5 text-zinc-400" />
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3.5 my-auto py-1">
              <div className="w-11 h-11 rounded-xl bg-emerald-100 border-2 border-zinc-950 flex items-center justify-center text-emerald-700 shadow-[2px_2px_0px_rgba(0,0,0,1)] shrink-0">
                <Flame className="w-5.5 h-5.5 fill-emerald-500 text-emerald-700" />
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-black text-zinc-950 leading-none">
                    {totalContributions}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                    +{currentYearContributions} {isPt ? 'em 2026' : 'in 2026'}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-zinc-500 block mt-1 leading-tight">
                  {isPt ? 'Commits, pull requests & code reviews' : 'Commits, pull requests & code reviews'}
                </span>
              </div>
            </div>
          </div>

          {/* Card Gráfico de Linguagens Mais Usadas (lg:col-span-7) - Compacto em Altura */}
          {languages.length > 0 && (
            <div className="motion-entry delay-250 lg:col-span-7 bg-white rounded-2xl border-2 sm:border-3 border-zinc-950 p-4 sm:p-4.5 shadow-[4px_4px_0px_rgba(24,24,27,1)] flex flex-col justify-between">
              
              {/* Topo do Card de Linguagens */}
              <div className="flex items-center justify-between gap-2 mb-2 pb-1 border-b border-zinc-100">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-purple-100 border border-zinc-950 flex items-center justify-center text-purple-700 shadow-[1px_1px_0px_rgba(0,0,0,1)] shrink-0">
                    <Code2 className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-black text-zinc-950 tracking-tight leading-none">
                    {isPt ? 'Linguagens Mais Usadas' : 'Most Used Languages'}
                  </h3>
                </div>

                <div className="font-mono text-[9px] font-bold text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200 shrink-0">
                  ⚡ {languages.length} {isPt ? 'langs' : 'langs'}
                </div>
              </div>

              {/* Barra de Progresso Segmentada Multi-Cor */}
              <div className="w-full mb-2">
                <div className="h-2.5 w-full rounded-md border border-zinc-950 overflow-hidden flex shadow-inner bg-zinc-100 p-0.5 gap-0.5">
                  {languages.map((lang) => (
                    <div
                      key={lang.name}
                      style={{
                        width: `${Math.max(lang.percentage, 4)}%`,
                        backgroundColor: lang.color
                      }}
                      className={`h-full rounded-xs transition-all duration-300 hover:opacity-80 cursor-pointer ${
                        selectedLang === lang.name ? 'ring-2 ring-zinc-950 scale-y-125 z-10' : ''
                      }`}
                      title={`${lang.name}: ${lang.percentage}% (${lang.count} repos)`}
                      onClick={() => setSelectedLang(selectedLang === lang.name ? null : lang.name)}
                    />
                  ))}
                </div>
              </div>

              {/* Grid Compacto das Linguagens (3 colunas, 1 linha/2 linhas ultra-slim) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {languages.slice(0, 6).map((lang) => {
                  const isSelected = selectedLang === lang.name;
                  return (
                    <div
                      key={lang.name}
                      onClick={() => setSelectedLang(isSelected ? null : lang.name)}
                      className={`px-2 py-1 rounded-md border text-[11px] font-mono transition-all cursor-pointer flex items-center justify-between gap-1.5 ${
                        isSelected
                          ? 'border-zinc-950 bg-zinc-900 text-white shadow-[1.5px_1.5px_0px_rgba(24,24,27,1)]'
                          : 'border-zinc-200 bg-zinc-50 hover:bg-zinc-100 hover:border-zinc-400'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 truncate">
                        <span
                          className="w-2 h-2 rounded-full shrink-0 border border-black/20"
                          style={{ backgroundColor: lang.color }}
                        />
                        <span className={`font-black truncate text-[10px] ${isSelected ? 'text-white' : 'text-zinc-900'}`}>
                          {lang.name}
                        </span>
                      </div>
                      <span className={`font-black text-[10px] shrink-0 ${isSelected ? 'text-yellow-300' : 'text-zinc-600'}`}>
                        {lang.percentage}%
                      </span>
                    </div>
                  );
                })}
              </div>

            </div>
          )}

        </div>

        {/* ===================================================================== */}
        {/* 3. MAPA DE CALOR (HEATMAP) DO GITHUB EM DESTAQUE COM CAIXA MAIOR      */}
        {/* ===================================================================== */}
        <div className="motion-entry delay-300 w-full">
          <GitHubHeatmap
            contributionsList={data?.contributionsList}
            totalsByYear={data?.contributionTotals}
            isPt={isPt}
            loading={loading}
          />
        </div>

      </div>
    </section>
  );
}
