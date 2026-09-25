import React, { useState, useMemo } from 'react';
import { 
  GitBranch, 
  Star, 
  FolderGit2, 
  Flame, 
  Search, 
  RotateCw, 
  Terminal, 
  ArrowUpRight, 
  Sparkles,
  Code2
} from 'lucide-react';
import { GithubIcon } from '../SocialIcons';
import { useGitHubData } from '../../hooks/useGitHubData';
import GitHubHeatmap from './GitHubHeatmap';
import GitHubRepoCard from './GitHubRepoCard';

export default function GitHubProjectsHub({ isPt = true }) {
  const { data, loading, refresh } = useGitHubData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refresh();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  // Repositórios filtrados por busca e linguagem
  const filteredRepos = useMemo(() => {
    if (!data?.repos) return [];
    return data.repos.filter((repo) => {
      const matchesSearch =
        searchTerm === '' ||
        repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (repo.description && repo.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (Array.isArray(repo.topics) && repo.topics.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase())));

      const matchesLang =
        selectedLanguage === 'all' ||
        (repo.language && repo.language.toLowerCase() === selectedLanguage.toLowerCase());

      return matchesSearch && matchesLang;
    });
  }, [data?.repos, searchTerm, selectedLanguage]);

  // Lista de linguagens disponíveis para o filtro
  const availableLanguages = useMemo(() => {
    if (!data?.languages) return [];
    return data.languages.slice(0, 6);
  }, [data?.languages]);

  return (
    <div className="w-full flex flex-col gap-8 animate-pop-in">
      
      {/* ======================================================================= */}
      {/* 1. CARDS DE MÉTRICAS DO GITHUB (GRID SUPERIOR)                           */}
      {/* ======================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Métrica 1: Contribuições */}
        <div className="bg-white rounded-2xl border-2 border-zinc-950 p-4 shadow-[4px_4px_0px_rgba(24,24,27,1)] flex items-center justify-between">
          <div>
            <span className="font-mono text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">
              {isPt ? 'Contribuições Totais' : 'Total Contributions'}
            </span>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-2xl sm:text-3xl font-black text-zinc-950">
                {data?.totalAllTimeContributions || 935}
              </span>
              <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                +{data?.totalContributionsThisYear || 419} em 2026
              </span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-100 border-2 border-zinc-950 flex items-center justify-center text-emerald-700 shadow-xs">
            <Flame className="w-5 h-5 fill-emerald-500" />
          </div>
        </div>

        {/* Métrica 2: Repositórios Públicos */}
        <div className="bg-white rounded-2xl border-2 border-zinc-950 p-4 shadow-[4px_4px_0px_rgba(24,24,27,1)] flex items-center justify-between">
          <div>
            <span className="font-mono text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">
              {isPt ? 'Repositórios Públicos' : 'Public Repositories'}
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl sm:text-3xl font-black text-zinc-950">
                {data?.totalRepos || 12}
              </span>
              <span className="text-xs font-mono text-zinc-500">
                {isPt ? 'ativos no GitHub' : 'active on GitHub'}
              </span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-amber-100 border-2 border-zinc-950 flex items-center justify-center text-amber-800 shadow-xs">
            <FolderGit2 className="w-5 h-5" />
          </div>
        </div>

        {/* Métrica 3: Estrelas & Forks Acumulados */}
        <div className="bg-white rounded-2xl border-2 border-zinc-950 p-4 shadow-[4px_4px_0px_rgba(24,24,27,1)] flex items-center justify-between">
          <div>
            <span className="font-mono text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">
              {isPt ? 'Estrelas & Forks' : 'Stars & Forks'}
            </span>
            <div className="flex items-center gap-3 mt-1.5">
              <span className="flex items-center gap-1 font-mono font-bold text-sm text-zinc-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                <span>{data?.totalStars || 4} stars</span>
              </span>
              <span className="flex items-center gap-1 font-mono font-bold text-sm text-zinc-700 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-300">
                <GitBranch className="w-3.5 h-3.5" />
                <span>{data?.totalForks || 1} forks</span>
              </span>
            </div>
          </div>
          <div className="w-11 h-11 rounded-xl bg-yellow-200 border-2 border-zinc-950 flex items-center justify-center text-zinc-950 shadow-xs">
            <Sparkles className="w-5 h-5 text-amber-700" />
          </div>
        </div>

        {/* Métrica 4: Último Commit ao Vivo */}
        <div className="bg-zinc-900 text-white rounded-2xl border-2 border-zinc-950 p-4 shadow-[4px_4px_0px_rgba(24,24,27,1)] flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                {isPt ? 'Último Commit' : 'Latest Push'}
              </span>
            </div>

            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              title={isPt ? 'Atualizar dados do GitHub' : 'Refresh GitHub data'}
              className="text-zinc-400 hover:text-white transition-colors cursor-pointer p-1"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-emerald-400' : ''}`} />
            </button>
          </div>

          <div className="my-1.5">
            <p className="font-mono text-xs font-bold text-yellow-300 truncate">
              {data?.latestActivity?.repoName || 'portfolio'}
            </p>
            <p className="font-mono text-[11px] text-zinc-300 truncate opacity-90 mt-0.5">
              "{data?.latestActivity?.message || 'feat: novas integrações e design neo-brutalista'}"
            </p>
          </div>

          <div className="text-[10px] font-mono text-zinc-400 flex items-center justify-between pt-1 border-t border-zinc-800">
            <span>szervinsk / main</span>
            <span className="text-emerald-400 font-bold">LIVE API</span>
          </div>
        </div>

      </div>

      {/* ======================================================================= */}
      {/* 2. DISTRIBUIÇÃO DE LINGUAGENS (TECH STACK REAL)                          */}
      {/* ======================================================================= */}
      {data?.languages && data.languages.length > 0 && (
        <div className="bg-white rounded-2xl border-2 border-zinc-950 p-4 sm:p-5 shadow-[4px_4px_0px_rgba(24,24,27,1)]">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-purple-600" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-900">
                {isPt ? 'Distribuição de Tecnologias (Repositórios Reais)' : 'Real Stack Distribution (Public Repos)'}
              </span>
            </div>
            <span className="font-mono text-[11px] text-zinc-500">
              {isPt ? 'Calculado a partir de 12 repositórios' : 'Calculated from 12 public repos'}
            </span>
          </div>

          {/* Barra de Progresso Segmentada */}
          <div className="h-4 w-full rounded-lg border-2 border-zinc-950 overflow-hidden flex shadow-xs mb-3 bg-zinc-100">
            {data.languages.map((lang) => (
              <div
                key={lang.name}
                style={{
                  width: `${lang.percentage}%`,
                  backgroundColor: lang.color
                }}
                className="h-full transition-all duration-500 hover:brightness-110"
                title={`${lang.name}: ${lang.percentage}% (${lang.count} repos)`}
              />
            ))}
          </div>

          {/* Legenda com Tags Clicáveis */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {data.languages.map((lang) => (
              <button
                key={lang.name}
                onClick={() => setSelectedLanguage(selectedLanguage === lang.name ? 'all' : lang.name)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-bold border transition-all cursor-pointer ${
                  selectedLanguage === lang.name
                    ? 'border-zinc-950 bg-zinc-950 text-white shadow-xs'
                    : 'border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-zinc-800'
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full border border-black/10 shrink-0"
                  style={{ backgroundColor: lang.color }}
                />
                <span>{lang.name}</span>
                <span className="text-[10px] text-zinc-500">{lang.percentage}%</span>
              </button>
            ))}
          </div>

        </div>
      )}

      {/* ======================================================================= */}
      {/* 3. HEATMAP DE CONTRIBUIÇÕES GITHUB                                      */}
      {/* ======================================================================= */}
      <GitHubHeatmap
        contributionsList={data?.contributionsList}
        totalsByYear={data?.contributionTotals}
        isPt={isPt}
        loading={loading}
      />

      {/* ======================================================================= */}
      {/* 4. REPOSITÓRIOS PÚBLICOS AO VIVO                                        */}
      {/* ======================================================================= */}
      <div className="flex flex-col gap-4">
        
        {/* Barra de Ações: Busca + Filtro de Linguagem + Link de Perfil */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border-2 border-zinc-950 shadow-[3px_3px_0px_rgba(24,24,27,1)]">
          
          {/* Campo de Busca com Ícone */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={isPt ? 'Buscar por nome, tag ou assunto...' : 'Search repos by name, tag or topic...'}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-zinc-50 border border-zinc-200 focus:bg-white focus:border-zinc-950 text-xs sm:text-sm font-medium text-zinc-900 outline-none transition-all placeholder:text-zinc-400"
            />
          </div>

          {/* Filtros Rápidos de Linguagem */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            <button
              onClick={() => setSelectedLanguage('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold whitespace-nowrap border transition-all cursor-pointer ${
                selectedLanguage === 'all'
                  ? 'bg-zinc-950 text-white border-zinc-950 shadow-xs'
                  : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border-zinc-300'
              }`}
            >
              {isPt ? 'Todos' : 'All'} ({data?.repos?.length || 0})
            </button>

            {availableLanguages.map((l) => (
              <button
                key={l.name}
                onClick={() => setSelectedLanguage(l.name)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold whitespace-nowrap border transition-all cursor-pointer ${
                  selectedLanguage === l.name
                    ? 'bg-zinc-950 text-white border-zinc-950 shadow-xs'
                    : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border-zinc-300'
                }`}
              >
                {l.name} ({l.count})
              </button>
            ))}
          </div>

          {/* Botão de Link para o Perfil GitHub */}
          <a
            href="https://github.com/Szervinsk"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-mono font-bold text-xs shadow-xs transition-all hover:scale-102 shrink-0"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>@Szervinsk ↗</span>
          </a>

        </div>

        {/* Grid de Repositórios */}
        {filteredRepos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRepos.map((repo) => (
              <GitHubRepoCard key={repo.name} repo={repo} isPt={isPt} />
            ))}
          </div>
        ) : (
          <div className="w-full bg-white rounded-2xl border-2 border-dashed border-zinc-300 p-8 text-center text-zinc-500 font-mono text-xs">
            <p className="font-bold text-zinc-800 text-sm mb-1">
              {isPt ? 'Nenhum repositório encontrado' : 'No repositories found'}
            </p>
            <p>
              {isPt
                ? 'Tente ajustar os termos de busca ou selecionar outra tecnologia.'
                : 'Try adjusting your search terms or picking another technology.'}
            </p>
          </div>
        )}

      </div>

    </div>
  );
}
