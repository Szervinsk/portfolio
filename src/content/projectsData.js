import { translations } from './translations';

/**
 * Mapeamento dos projetos indexados por ID nos idiomas suportados.
 */
export const getProjectsList = (lang = 'pt') => {
  return (translations[lang] || translations.pt).projects.list;
};

export const getProjectById = (id, lang = 'pt') => {
  const list = getProjectsList(lang);
  return list.find((p) => p.id === id) || null;
};

// Dicionário de projetos padrão em PT (com suporte retrocompatível)
export const PROJECTS_DATA = translations.pt.projects.list.reduce((acc, project) => {
  acc[project.id] = project;
  return acc;
}, {});

export default PROJECTS_DATA;
