/**
 * Serviço de Integração com a API Pública do GitHub
 * Usuário: Szervinsk
 * 
 * Inclui:
 * - Cache resiliente em localStorage com TTL (Time-to-Live) para respeitar o limite de 60 req/h
 * - Fallback offline com dados reais pré-carregados
 * - Cálculo de métricas (total de estrelas, forks, porcentagens de linguagens)
 * - Calendário de contribuições (Heatmap)
 */

const GITHUB_USERNAME = 'Szervinsk';
const CACHE_PREFIX = 'sz_gh_cache_';
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutos

export const LANGUAGE_COLORS = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  C: '#555555',
  'C++': '#f34b7d',
  PHP: '#4F5D95',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Vue: '#41b883',
  Java: '#b07219',
  Go: '#00ADD8',
  Rust: '#dea584'
};

// Dados de fallback caso ocorra rate limit (403) ou offline
const FALLBACK_PROFILE = {
  login: 'Szervinsk',
  name: 'Matheus',
  bio: 'Software Engineer',
  avatar_url: 'https://avatars.githubusercontent.com/u/165739040?v=4',
  html_url: 'https://github.com/Szervinsk',
  public_repos: 12,
  followers: 8,
  following: 18,
  location: 'Brasil',
  blog: 'https://portfolio-szervinsk.vercel.app/'
};

const FALLBACK_REPOS = [
  {
    name: 'portfolio',
    description: 'Repositório destinado ao portfólio de projetos com arquitetura neo-brutalista.',
    html_url: 'https://github.com/Szervinsk/portfolio',
    language: 'JavaScript',
    stargazers_count: 1,
    forks_count: 0,
    topics: ['react', 'portfolio', 'vite', 'tailwind'],
    updated_at: '2026-09-24T22:06:52Z'
  },
  {
    name: 'SalvaDocs',
    description: 'Analisador de documentos com IA integrada, projetado para otimizar extração de dados e gestão documental dinâmica.',
    html_url: 'https://github.com/Szervinsk/SalvaDocs',
    language: 'JavaScript',
    stargazers_count: 2,
    forks_count: 1,
    topics: ['ai', 'document-analysis', 'react', 'nodejs'],
    updated_at: '2025-12-11T14:31:17Z'
  },
  {
    name: 'eda2-g20-classificador-sinopses',
    description: 'Classificador de sinopses desenvolvido para a disciplina de Estruturas de Dados 2 (EDA2) - FGA/UnB.',
    html_url: 'https://github.com/Szervinsk/eda2-g20-classificador-sinopses',
    language: 'Python',
    stargazers_count: 1,
    forks_count: 0,
    topics: ['python', 'nlp', 'data-structures', 'unb'],
    updated_at: '2026-07-09T18:12:18Z'
  },
  {
    name: 'MyStuffs',
    description: 'Aplicação web dinâmica para gerenciar notas, tarefas e ideias em blocos inteligentes com arrastar e soltar.',
    html_url: 'https://github.com/Szervinsk/MyStuffs',
    language: 'Python',
    stargazers_count: 1,
    forks_count: 0,
    topics: ['python', 'web', 'kanban', 'tasks'],
    updated_at: '2025-11-01T01:21:02Z'
  },
  {
    name: 'im-not-paying-for-adobe-acrobat',
    description: 'Conversor de PDFs open-source para manipulação e junção rápida de documentos sem cobranças de ferramentas proprietárias.',
    html_url: 'https://github.com/Szervinsk/im-not-paying-for-adobe-acrobat',
    language: 'Python',
    stargazers_count: 1,
    forks_count: 0,
    topics: ['python', 'pdf-converter', 'utility'],
    updated_at: '2025-11-04T02:22:43Z'
  },
  {
    name: 'md2_atividade_20252',
    description: 'Implementações em C/C++ para criptografia RSA e problemas de teoria dos números (FGA/UnB).',
    html_url: 'https://github.com/Szervinsk/md2_atividade_20252',
    language: 'C',
    stargazers_count: 0,
    forks_count: 0,
    topics: ['c', 'rsa', 'cryptography', 'unb'],
    updated_at: '2025-10-18T14:42:25Z'
  },
  {
    name: 'Sortly',
    description: 'Classificador automático de emails e ordenação inteligente para triagem de mensagens.',
    html_url: 'https://github.com/Szervinsk/Sortly',
    language: 'HTML',
    stargazers_count: 0,
    forks_count: 0,
    topics: ['email-classifier', 'frontend'],
    updated_at: '2026-01-16T22:05:43Z'
  },
  {
    name: 'crud-php',
    description: 'Sistema de CRUD robusto em PHP estruturado para gestão de entidades com persistência relacional.',
    html_url: 'https://github.com/Szervinsk/crud-php',
    language: 'PHP',
    stargazers_count: 0,
    forks_count: 0,
    topics: ['php', 'crud', 'mysql'],
    updated_at: '2025-12-12T17:30:32Z'
  }
];

function getFromCache(key) {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return null;
    const { timestamp, data } = JSON.parse(raw);
    if (Date.now() - timestamp < CACHE_TTL_MS) {
      return data;
    }
  } catch (e) {
    // Falha silenciosa em caso de storage bloqueado
  }
  return null;
}

function setToCache(key, data) {
  try {
    localStorage.setItem(
      CACHE_PREFIX + key,
      JSON.stringify({ timestamp: Date.now(), data })
    );
  } catch (e) {
    // Ignora quota cheia
  }
}

/**
 * Busca perfil do usuário
 */
export async function getProfile() {
  const cached = getFromCache('profile');
  if (cached) return cached;

  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
    if (res.ok) {
      const data = await res.json();
      setToCache('profile', data);
      return data;
    }
  } catch (err) {
    console.warn('[GitHub API] Falha ao buscar perfil, usando fallback:', err);
  }

  return FALLBACK_PROFILE;
}

/**
 * Busca repositórios públicos
 */
export async function getRepos() {
  const cached = getFromCache('repos');
  if (cached) return cached;

  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
    if (res.ok) {
      const data = await res.json();
      setToCache('repos', data);
      return data;
    }
  } catch (err) {
    console.warn('[GitHub API] Falha ao buscar repos, usando fallback:', err);
  }

  return FALLBACK_REPOS;
}

/**
 * Busca eventos recentes (PushEvent)
 */
export async function getRecentEvents() {
  const cached = getFromCache('events');
  if (cached) return cached;

  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=30`);
    if (res.ok) {
      const data = await res.json();
      setToCache('events', data);
      return data;
    }
  } catch (err) {
    console.warn('[GitHub API] Falha ao buscar eventos:', err);
  }

  return [];
}

/**
 * Busca dados do Heatmap (Contribuições)
 */
export async function getContributions() {
  const cached = getFromCache('contributions');
  if (cached) return cached;

  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}`);
    if (res.ok) {
      const data = await res.json();
      setToCache('contributions', data);
      return data;
    }
  } catch (err) {
    console.warn('[GitHub API] Falha ao buscar heatmap externo:', err);
  }

  return null;
}

/**
 * Agrega e calcula todas as métricas para a interface
 */
export async function getCompleteGitHubStats() {
  const [profileResult, reposResult, eventsResult, contributionsResult] = await Promise.allSettled([
    getProfile(),
    getRepos(),
    getRecentEvents(),
    getContributions()
  ]);

  const profile = profileResult.status === 'fulfilled' ? profileResult.value : FALLBACK_PROFILE;
  const repos = reposResult.status === 'fulfilled' && Array.isArray(reposResult.value) ? reposResult.value : FALLBACK_REPOS;
  const events = eventsResult.status === 'fulfilled' && Array.isArray(eventsResult.value) ? eventsResult.value : [];
  const contributions = contributionsResult.status === 'fulfilled' ? contributionsResult.value : null;

  // 1. Métricas de Estrelas e Forks
  const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
  const totalForks = repos.reduce((sum, r) => sum + (r.forks_count || 0), 0);

  // 2. Distribuição de Tecnologias / Linguagens
  const languageCounts = {};
  let totalWithLang = 0;

  repos.forEach((r) => {
    if (r.language) {
      languageCounts[r.language] = (languageCounts[r.language] || 0) + 1;
      totalWithLang++;
    }
  });

  const languages = Object.entries(languageCounts)
    .map(([lang, count]) => ({
      name: lang,
      count,
      percentage: totalWithLang > 0 ? Math.round((count / totalWithLang) * 100) : 0,
      color: LANGUAGE_COLORS[lang] || '#a1a1aa'
    }))
    .sort((a, b) => b.count - a.count);

  // 3. Última atividade / Último Commit
  let latestActivity = null;
  const pushEvents = events.filter((e) => e.type === 'PushEvent');
  if (pushEvents.length > 0) {
    const firstPush = pushEvents[0];
    const commits = firstPush.payload?.commits || [];
    const latestCommitMessage = commits.length > 0 ? commits[commits.length - 1].message : 'Atualização de código';
    latestActivity = {
      repoName: firstPush.repo?.name?.replace(`${GITHUB_USERNAME}/`, '') || firstPush.repo?.name,
      message: latestCommitMessage.split('\n')[0],
      createdAt: firstPush.created_at,
      commitCount: commits.length
    };
  }

  // 4. Totais de Contribuição por Ano
  const contributionTotals = contributions?.total || {
    2026: 419,
    2025: 157,
    2024: 359
  };
  const totalAllTimeContributions = Object.values(contributionTotals).reduce((a, b) => a + b, 0);

  return {
    profile,
    repos,
    totalRepos: profile.public_repos || repos.length,
    totalStars,
    totalForks,
    totalContributionsThisYear: contributionTotals['2026'] || 419,
    totalAllTimeContributions,
    contributionTotals,
    contributionsList: contributions?.contributions || [],
    languages,
    latestActivity
  };
}
