import React, { useState, useMemo } from 'react';
import { Flame, Info, Sparkles } from 'lucide-react';

const MONTH_NAMES_PT = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
const MONTH_NAMES_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const WEEKDAYS_FULL_PT = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
const WEEKDAYS_FULL_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS_FULL_PT = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
const MONTHS_FULL_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export default function GitHubHeatmap({ contributionsList = [], totalsByYear = {}, isPt = true, loading = false }) {
  const availableYears = useMemo(() => {
    const years = Object.keys(totalsByYear).sort((a, b) => Number(b) - Number(a));
    return years.length > 0 ? years : ['2026', '2025', '2024'];
  }, [totalsByYear]);

  const [selectedYear, setSelectedYear] = useState('2026');
  const [hoveredDay, setHoveredDay] = useState(null);

  // Hoje no formato YYYY-MM-DD
  const todayStr = useMemo(() => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }, []);

  // Filtra dias do ano selecionado garantindo ordem cronológica
  const daysOfYear = useMemo(() => {
    if (!contributionsList || contributionsList.length === 0) return [];
    return contributionsList
      .filter((d) => d.date?.startsWith(selectedYear))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [contributionsList, selectedYear]);

  // Agrupa os dias em 52/53 colunas de semanas (Domingo a Sábado) com alinhamento milimétrico
  const { weeks, monthHeaders } = useMemo(() => {
    if (daysOfYear.length === 0) return { weeks: [], monthHeaders: [] };

    const weeksArr = [];
    let currentWeek = [];

    // Primeiro dia do ano: calcula o dia da semana seguro ao meio-dia
    const [firstY, firstM, firstD] = daysOfYear[0].date.split('-').map(Number);
    const firstDate = new Date(firstY, firstM - 1, firstD, 12, 0, 0);
    const firstDayOfWeek = firstDate.getDay(); // 0 = Dom, 6 = Sáb

    // Preenche dias nulos na primeira semana antes do dia 1 de janeiro
    for (let i = 0; i < firstDayOfWeek; i++) {
      currentWeek.push(null);
    }

    const mHeaders = [];

    daysOfYear.forEach((day) => {
      const [dy, dm, dd] = day.date.split('-').map(Number);

      // Marca o início de cada mês na coluna exata
      if (dd === 1) {
        mHeaders.push({
          weekIndex: weeksArr.length,
          name: isPt ? MONTH_NAMES_PT[dm - 1] : MONTH_NAMES_EN[dm - 1]
        });
      }

      currentWeek.push(day);

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

  // Total de contribuições do ano selecionado
  const yearTotal = totalsByYear[selectedYear] || daysOfYear.reduce((acc, d) => acc + (d.count || 0), 0);

  // Cor por nível de contribuição
  const getLevelClasses = (level, count, isFuture) => {
    if (isFuture) {
      return 'bg-zinc-50 border-dashed border-zinc-200 opacity-35';
    }
    if (count === 0 || level === 0) {
      return 'bg-zinc-100 hover:bg-zinc-200 border-zinc-200';
    }
    if (level === 1) {
      return 'bg-[#9be9a8] hover:bg-[#82d68f] border-[#72c77f] shadow-2xs';
    }
    if (level === 2) {
      return 'bg-[#40c463] hover:bg-[#34ab54] border-[#2ea043] shadow-2xs';
    }
    if (level === 3) {
      return 'bg-[#30a14e] hover:bg-[#238636] border-[#1b6b29] shadow-2xs text-white';
    }
    return 'bg-[#216e39] hover:bg-[#19572c] border-[#134421] shadow-2xs text-white';
  };

  // Formata o texto do dia em hover com dia da semana por extenso
  const formatDayTooltip = (day) => {
    if (!day) return '';
    const [y, m, d] = day.date.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d, 12, 0, 0);
    const weekday = isPt ? WEEKDAYS_FULL_PT[dateObj.getDay()] : WEEKDAYS_FULL_EN[dateObj.getDay()];
    const month = isPt ? MONTHS_FULL_PT[m - 1] : MONTHS_FULL_EN[m - 1];

    if (isPt) {
      const countText = day.count === 1 ? '1 contribuição' : `${day.count} contribuições`;
      return `${weekday}, ${d} de ${month} de ${y} • ${countText}`;
    } else {
      const countText = day.count === 1 ? '1 contribution' : `${day.count} contributions`;
      return `${weekday}, ${month} ${d}, ${y} • ${countText}`;
    }
  };

  return (
    <div className="w-full bg-white rounded-3xl border-2 sm:border-3 border-zinc-950 p-5 sm:p-7 md:p-8 shadow-[7px_7px_0px_rgba(24,24,27,1)] relative overflow-hidden">
      
      {/* Top Header do Heatmap em Destaque */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b-2 border-zinc-100">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 border-2 border-zinc-950 flex items-center justify-center text-emerald-700 shadow-[3px_3px_0px_rgba(0,0,0,1)] shrink-0">
            <Flame className="w-6 h-6 fill-emerald-500 text-emerald-700" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg sm:text-xl md:text-2xl font-black text-zinc-950 tracking-tight">
                {isPt ? 'Calendário de Contribuições' : 'Contribution Heatmap'}
              </h3>
              <span className="font-mono text-[10px] font-bold bg-emerald-500 text-white px-2 py-0.5 rounded-full border border-emerald-600 shadow-2xs">
                {isPt ? 'EM DESTAQUE' : 'FEATURED'}
              </span>
              <span className="font-mono text-[10px] font-bold bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded-full border border-zinc-300">
                LIVE GITHUB
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs sm:text-sm font-mono text-zinc-600">
                <span className="font-black text-zinc-950 font-sans text-base">{yearTotal}</span>{' '}
                {isPt ? `contribuições registradas em ${selectedYear}` : `contributions recorded in ${selectedYear}`}
              </span>
            </div>
          </div>
        </div>

        {/* Seletor de Ano */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto bg-zinc-100 p-1 rounded-xl border-2 border-zinc-950 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
          {availableYears.map((year) => {
            const isSelected = selectedYear === year;
            const count = totalsByYear[year];
            return (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-zinc-950 text-white shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200'
                }`}
              >
                <span>{year}</span>
                {count !== undefined && (
                  <span className={`ml-1.5 text-[10px] font-normal ${isSelected ? 'text-emerald-300' : 'text-zinc-500'}`}>
                    ({count})
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid do Heatmap com Scroll Horizontal (Caixa Maior & Tiles Maiores) */}
      <div className="relative overflow-x-auto pb-3 scrollbar-thin">
        <div className="min-w-[940px] select-none py-1">
          
          {/* Linha com Nomes dos Meses Alinhados com Precisão de Coluna (14px tile + 3px gap = 17px) */}
          <div className="relative h-5 mb-1.5">
            {monthHeaders.map((m, idx) => (
              <span
                key={idx}
                className="absolute text-[11px] font-mono font-bold text-zinc-500"
                style={{ left: `${m.weekIndex * 17 + 36}px` }}
              >
                {m.name}
              </span>
            ))}
          </div>

          <div className="flex items-start">
            
            {/* Legenda dos Dias da Semana (Seg, Qua, Sex perfeitamente alinhados às linhas de 14px) */}
            <div className="flex flex-col gap-[3px] text-[10px] font-mono font-bold text-zinc-400 w-9 text-right pr-2.5">
              <span className="h-3.5 leading-3.5 opacity-0 select-none">Dom</span>
              <span className="h-3.5 leading-3.5">{isPt ? 'Seg' : 'Mon'}</span>
              <span className="h-3.5 leading-3.5 opacity-0 select-none">Ter</span>
              <span className="h-3.5 leading-3.5">{isPt ? 'Qua' : 'Wed'}</span>
              <span className="h-3.5 leading-3.5 opacity-0 select-none">Qui</span>
              <span className="h-3.5 leading-3.5">{isPt ? 'Sex' : 'Fri'}</span>
              <span className="h-3.5 leading-3.5 opacity-0 select-none">Sáb</span>
            </div>

            {/* Colunas de Semanas: 14px por quadrado (w-3.5 h-3.5) + 3px gap = 17px por coluna */}
            <div className="flex gap-[3px]">
              {weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-[3px]">
                  {week.map((day, dIdx) => {
                    if (!day) {
                      return (
                        <div
                          key={`empty-${dIdx}`}
                          className="w-3.5 h-3.5 rounded-[3px] bg-transparent pointer-events-none"
                        />
                      );
                    }

                    const isToday = day.date === todayStr;
                    const isFuture = selectedYear === '2026' && day.date > todayStr;
                    const isHovered = hoveredDay?.date === day.date;
                    const levelClass = getLevelClasses(day.level, day.count, isFuture);

                    return (
                      <div
                        key={day.date}
                        title={formatDayTooltip(day)}
                        onMouseEnter={() => setHoveredDay(day)}
                        onMouseLeave={() => setHoveredDay(null)}
                        className={`w-3.5 h-3.5 rounded-[3px] border transition-transform ${levelClass} ${
                          isToday ? 'ring-2 ring-emerald-600 ring-offset-1 z-10' : ''
                        } ${
                          isHovered 
                            ? 'scale-150 z-20 shadow-md ring-2 ring-zinc-950 !opacity-100' 
                            : isFuture ? '' : 'hover:scale-125 hover:z-10'
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

      {/* Barra Inferior: Tooltip dinâmico ou Legenda */}
      <div className="mt-5 pt-3.5 border-t-2 border-zinc-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
        
        {/* Detalhe do dia sob hover */}
        <div className="text-zinc-700 min-h-[26px] flex items-center gap-2">
          {hoveredDay ? (
            <span className="inline-flex items-center gap-2 font-bold text-zinc-950 bg-zinc-100 px-3 py-1 rounded-lg border-2 border-zinc-950 shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>{formatDayTooltip(hoveredDay)}</span>
            </span>
          ) : (
            <span className="text-zinc-500 text-xs flex items-center gap-1.5">
              <Info className="w-4 h-4 text-emerald-600" />
              <span>{isPt ? 'Passe o cursor sobre os quadradinhos para inspecionar cada dia' : 'Hover over tiles to inspect date and counts'}</span>
            </span>
          )}
        </div>

        {/* Legenda de Níveis */}
        <div className="flex items-center gap-2 text-xs text-zinc-600 self-end sm:self-auto font-bold">
          <span>{isPt ? 'Menos' : 'Less'}</span>
          <div className="w-3.5 h-3.5 rounded-[3px] bg-zinc-100 border border-zinc-300" title="0" />
          <div className="w-3.5 h-3.5 rounded-[3px] bg-[#9be9a8] border border-[#72c77f]" title="1-2" />
          <div className="w-3.5 h-3.5 rounded-[3px] bg-[#40c463] border border-[#2ea043]" title="3-5" />
          <div className="w-3.5 h-3.5 rounded-[3px] bg-[#30a14e] border border-[#1b6b29]" title="6-9" />
          <div className="w-3.5 h-3.5 rounded-[3px] bg-[#216e39] border border-[#134421]" title="10+" />
          <span>{isPt ? 'Mais' : 'More'}</span>
        </div>

      </div>

    </div>
  );
}
