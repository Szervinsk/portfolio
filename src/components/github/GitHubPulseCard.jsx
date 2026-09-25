import React, { useState, useMemo } from 'react';
import { Flame, FolderGit2, Star, GitCommit, ArrowUpRight, Sparkles, Info } from 'lucide-react';
import { GithubIcon } from '../SocialIcons';

const MONTH_NAMES_PT = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
const MONTH_NAMES_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function GitHubPulseCard({ githubData, isPt = true, onSelectReposFilter }) {
  const [hoveredDay, setHoveredDay] = useState(null);
  const [selectedYear, setSelectedYear] = useState('2026');

  const totalsByYear = githubData?.contributionTotals || { '2026': 419, '2025': 157, '2024': 359 };
  const contributionsList = githubData?.contributionsList || [];

  // Filtra dias do ano selecionado
  const daysOfYear = useMemo(() => {
    if (!contributionsList || contributionsList.length === 0) return [];
    return contributionsList.filter((d) => d.date?.startsWith(selectedYear));
  }, [contributionsList, selectedYear]);

  // Agrupa semanas (domingo a sábado)
  const { weeks, monthHeaders } = useMemo(() => {
    if (daysOfYear.length === 0) return { weeks: [], monthHeaders: [] };

    const weeksArr = [];
    let currentWeek = [];

    const firstDay = new Date(daysOfYear[0].date + 'T00:00:00').getDay();
    for (let i = 0; i < firstDay; i++) {
      currentWeek.push(null);
    }

    const mHeaders = [];
    let lastMonth = -1;

    daysOfYear.forEach((day) => {
      currentWeek.push(day);
      const mIdx = new Date(day.date + 'T00:00:00').getMonth();
      if (mIdx !== lastMonth) {
        lastMonth = mIdx;
        mHeaders.push({
          name: isPt ? MONTH_NAMES_PT[mIdx] : MONTH_NAMES_EN[mIdx],
          weekIdx: weeksArr.length
        });
      }

      if (currentWeek.length === 7) {
        weeksArr.push(currentWeek);
        currentWeek = [];
      }
    });

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      weeksArr.push(currentWeek);
    }

    return { weeks: weeksArr, monthHeaders: mHeaders };
  }, [daysOfYear, isPt]);

  const getLevelColor = (level, count) => {
    if (count === 0 || level === 0) return 'bg-zinc-100 hover:bg-zinc-200 border-zinc-200';
    if (level === 1) return 'bg-[#9be9a8] hover:bg-[#82d68f] border-[#72c77f]';
    if (level === 2) return 'bg-[#40c463] hover:bg-[#34ab54] border-[#2ea043]';
    if (level === 3) return 'bg-[#30a14e] hover:bg-[#238636] border-[#1b6b29]';
    return 'bg-[#216e39] hover:bg-[#19572c] border-[#134421]';
  };

  const currentYearTotal = totalsByYear[selectedYear] || 419;

  return (
    <div className="w-full bg-white rounded-2xl border-2 sm:border-3 border-zinc-950 p-4 sm:p-5 shadow-[4px_4px_0px_rgba(24,24,27,1)] mb-8">
      
      {/* Grid: Métricas Resumidas à Esquerda + Heatmap Compacto à Direita */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        
        {/* =================================================================== */}
        {/* COLUNA ESQUERDA: MÉTRICAS-CHAVE DO GITHUB (4 cols)                 */}
        {/* =================================================================== */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-3 border-b lg:border-b-0 lg:border-r border-zinc-200 pb-4 lg:pb-0 lg:pr-4">
          
          {/* Badge de Status Vivo */}
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-950 text-[10px] font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>GITHUB LIVE PULSE</span>
            </div>

            <a
              href="https://github.com/Szervinsk"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-zinc-600 hover:text-zinc-950 transition-colors"
            >
              <span>@Szervinsk</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>

          {/* Métricas em Pílulas Compactas */}
          <div className="grid grid-cols-2 gap-2 mt-1">
            
            {/* Contribuições */}
            <div className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-200">
              <span className="font-mono text-[9px] font-bold text-zinc-500 uppercase block">
                {isPt ? 'Contribuições' : 'Contributions'}
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-lg font-black text-zinc-950">
                  {githubData?.totalAllTimeContributions || 935}
                </span>
                <span className="text-[10px] font-mono font-bold text-emerald-600">
                  (+{githubData?.totalContributionsThisYear || 419})
                </span>
              </div>
            </div>

            {/* Repositórios & Estrelas */}
            <div className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-200">
              <span className="font-mono text-[9px] font-bold text-zinc-500 uppercase block">
                {isPt ? 'Repositórios' : 'Repositories'}
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-lg font-black text-zinc-950">
                  {githubData?.totalRepos || 12}
                </span>
                <span className="text-[10px] font-mono text-amber-600 font-bold">
                  ★ {githubData?.totalStars || 4}
                </span>
              </div>
            </div>

          </div>

          {/* Último commit realizado */}
          <div className="bg-zinc-900 text-white p-2.5 rounded-xl border border-zinc-950 flex items-center justify-between gap-2 text-xs font-mono">
            <div className="flex items-center gap-2 truncate">
              <GitCommit className="w-3.5 h-3.5 text-yellow-300 shrink-0" />
              <div className="truncate">
                <span className="text-yellow-300 font-bold text-[11px]">
                  {githubData?.latestActivity?.repoName || 'portfolio'}
                </span>
                <span className="text-zinc-400 text-[10px] block truncate">
                  "{githubData?.latestActivity?.message || 'feat: atualizações e métricas'}"
                </span>
              </div>
            </div>
            {onSelectReposFilter && (
              <button
                onClick={onSelectReposFilter}
                className="shrink-0 px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-[10px] font-bold text-zinc-200 cursor-pointer transition-colors"
                title={isPt ? 'Ver repositórios' : 'View repos'}
              >
                {isPt ? 'Ver Repos' : 'View Repos'}
              </button>
            )}
          </div>

        </div>

        {/* =================================================================== */}
        {/* COLUNA DIREITA: HEATMAP COMPACTO INTERATIVO (8 cols)               */}
        {/* =================================================================== */}
        <div className="lg:col-span-8 flex flex-col justify-between overflow-hidden">
          
          {/* Header do Heatmap: Seletor de Ano + Total */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-1.5 font-mono text-xs">
              <Flame className="w-3.5 h-3.5 text-emerald-600 fill-emerald-500" />
              <span className="font-bold text-zinc-950">
                {currentYearTotal} {isPt ? 'contribuições em' : 'contributions in'} {selectedYear}
              </span>
            </div>

            {/* Abas dos Anos */}
            <div className="flex items-center gap-1 bg-zinc-100 p-0.5 rounded-lg text-[10px] font-mono font-bold">
              {['2026', '2025', '2024'].map((y) => (
                <button
                  key={y}
                  onClick={() => setSelectedYear(y)}
                  className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                    selectedYear === y
                      ? 'bg-zinc-950 text-white'
                      : 'text-zinc-600 hover:text-zinc-950'
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>

          {/* Grid de Semanas (Scroll horizontal em telas pequenas) */}
          <div className="overflow-x-auto pb-1 select-none scrollbar-thin">
            <div className="min-w-[560px]">
              
              {/* Linha dos Meses */}
              <div className="flex text-[9px] font-mono text-zinc-400 mb-0.5 pl-5">
                {monthHeaders.map((m, idx) => (
                  <div
                    key={idx}
                    className="truncate"
                    style={{
                      width: `${(100 / (weeks.length || 52)) * 4.2}%`,
                      minWidth: '32px'
                    }}
                  >
                    {m.name}
                  </div>
                ))}
              </div>

              {/* Grid 7 linhas x N semanas */}
              <div className="flex items-start gap-1">
                <div className="flex flex-col justify-between text-[8px] font-mono text-zinc-400 pr-1 h-[76px]">
                  <span>{isPt ? 'Seg' : 'Mon'}</span>
                  <span>{isPt ? 'Qua' : 'Wed'}</span>
                  <span>{isPt ? 'Sex' : 'Fri'}</span>
                </div>

                <div className="flex gap-[2.5px]">
                  {weeks.map((week, wIdx) => (
                    <div key={wIdx} className="flex flex-col gap-[2.5px]">
                      {week.map((day, dIdx) => {
                        if (!day) {
                          return <div key={`empty-${dIdx}`} className="w-2.5 h-2.5 rounded-[2px]" />;
                        }
                        const isHovered = hoveredDay?.date === day.date;
                        const levelClass = getLevelColor(day.level, day.count);
                        return (
                          <div
                            key={day.date}
                            onMouseEnter={() => setHoveredDay(day)}
                            onMouseLeave={() => setHoveredDay(null)}
                            className={`w-2.5 h-2.5 rounded-[2px] border cursor-pointer transition-transform ${levelClass} ${
                              isHovered ? 'scale-150 z-20 ring-1 ring-zinc-950 shadow-xs' : 'hover:scale-125'
                            }`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Rodapé: Tooltip Dinâmico + Legenda */}
          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 pt-1 border-t border-zinc-100 mt-1 min-h-[18px]">
            <div>
              {hoveredDay ? (
                <span className="font-bold text-zinc-900 bg-zinc-100 px-1.5 py-0.5 rounded border border-zinc-200">
                  {hoveredDay.count} {isPt ? 'commits' : 'commits'} em {hoveredDay.date.split('-').reverse().join('/')}
                </span>
              ) : (
                <span className="text-[10px] text-zinc-400 hidden sm:inline">
                  {isPt ? 'Passe o cursor para ver os commits' : 'Hover over tiles for commits'}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1">
              <span>{isPt ? 'Menos' : 'Less'}</span>
              <div className="w-2 h-2 rounded-[1.5px] bg-zinc-100 border border-zinc-200" />
              <div className="w-2 h-2 rounded-[1.5px] bg-[#9be9a8]" />
              <div className="w-2 h-2 rounded-[1.5px] bg-[#40c463]" />
              <div className="w-2 h-2 rounded-[1.5px] bg-[#30a14e]" />
              <div className="w-2 h-2 rounded-[1.5px] bg-[#216e39]" />
              <span>{isPt ? 'Mais' : 'More'}</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
