import React from 'react';
import { Star, GitFork, ArrowUpRight, FolderGit2 } from 'lucide-react';
import { LANGUAGE_COLORS } from '../../services/githubService';

export default function GitHubRepoCard({ repo, isPt = true }) {
  const languageColor = LANGUAGE_COLORS[repo.language] || '#a1a1aa';

  // Formatação de data
  const updatedDate = repo.updated_at
    ? new Date(repo.updated_at).toLocaleDateString(isPt ? 'pt-BR' : 'en-US', {
        month: 'short',
        year: 'numeric'
      })
    : '';

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      className="group relative bg-white rounded-xl border-2 border-zinc-950 p-4 shadow-[3px_3px_0px_rgba(24,24,27,1)] hover:-translate-y-1 hover:shadow-[5px_5px_0px_rgba(24,24,27,1)] transition-all duration-200 flex flex-col justify-between"
    >
      <div>
        {/* Topo: Ícone de repositório + Estrelas / Forks + Link */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-zinc-100 border border-zinc-900 flex items-center justify-center text-zinc-900 group-hover:bg-[#fef08a] transition-colors">
              <FolderGit2 className="w-3.5 h-3.5" />
            </div>
            <h4 className="font-mono font-bold text-sm text-zinc-950 tracking-tight group-hover:text-blue-600 transition-colors truncate max-w-[200px]">
              {repo.name}
            </h4>
          </div>

          <div className="flex items-center gap-1 text-zinc-400 group-hover:text-zinc-950 transition-colors">
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>

        {/* Descrição */}
        <p className="text-xs text-zinc-600 line-clamp-2 font-medium mb-3 min-h-[32px]">
          {repo.description || (isPt ? 'Repositório público no GitHub.' : 'Public repository on GitHub.')}
        </p>

        {/* Tópicos/Tags */}
        {Array.isArray(repo.topics) && repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {repo.topics.slice(0, 3).map((topic) => (
              <span
                key={topic}
                className="text-[9px] font-mono font-bold bg-zinc-100 text-zinc-700 px-1.5 py-0.5 rounded border border-zinc-200"
              >
                #{topic}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Rodapé: Linguagem + Estrelas + Data */}
      <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-[11px] font-mono text-zinc-500">
        
        {/* Linguagem Principal */}
        <div className="flex items-center gap-1.5">
          {repo.language ? (
            <>
              <span
                className="w-2.5 h-2.5 rounded-full border border-black/10 shrink-0"
                style={{ backgroundColor: languageColor }}
              />
              <span className="font-bold text-zinc-700">{repo.language}</span>
            </>
          ) : (
            <span className="text-zinc-400">Doc/Config</span>
          )}
        </div>

        {/* Estrelas e Forks */}
        <div className="flex items-center gap-2.5">
          {(repo.stargazers_count > 0 || repo.forks_count > 0) && (
            <div className="flex items-center gap-2">
              {repo.stargazers_count > 0 && (
                <span className="flex items-center gap-0.5 text-amber-600 font-bold">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                  <span>{repo.stargazers_count}</span>
                </span>
              )}
              {repo.forks_count > 0 && (
                <span className="flex items-center gap-0.5 text-zinc-600">
                  <GitFork className="w-3 h-3 text-zinc-500" />
                  <span>{repo.forks_count}</span>
                </span>
              )}
            </div>
          )}

          {updatedDate && (
            <span className="text-[10px] text-zinc-400 hidden sm:inline">
              {updatedDate}
            </span>
          )}
        </div>

      </div>
    </a>
  );
}
