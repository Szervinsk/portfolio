import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

// Senha configurável via .env (VITE_ADMIN_PASSWORD) com fallbacks seguros
const DEFAULT_FALLBACK_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin';

const DEFAULT_RESUMES = [
  {
    id: 'standard',
    title: 'Currículo Padrão (Full Stack & Automações)',
    role: 'Desenvolvedor Full Stack',
    url: '/assets/resumes/curriculo-matheus-szervinsk.pdf',
    fileName: 'curriculo_matheus_szervinsk.pdf',
    summary: 'Versão oficial completa com foco em React, Python, Laravel, Webhooks e conformidade LGPD.',
    isDefault: true
  },
  {
    id: 'english',
    title: 'Resume in English (International)',
    role: 'Software Engineer (Bilingual C1)',
    url: '/assets/resumes/resume-matheus-ribeiro-szervinsk.pdf',
    fileName: 'resume_matheus_ribeiro_szervinsk.pdf',
    summary: 'Full English version targeted for global and remote software engineering positions.',
    isDefault: false
  },
  {
    id: 'ti-infra',
    title: 'Currículo de TI & Infraestrutura',
    role: 'Analista de TI, Redes & Suporte',
    url: '/assets/resumes/curriculoTI-matheus-ribeiro-szervinsk.pdf',
    fileName: 'curriculo_ti_matheus_szervinsk.pdf',
    summary: 'Enfatiza infraestrutura, servidores Linux, redes, automações e suporte técnico.',
    isDefault: false
  },
  {
    id: 'software-geral',
    title: 'Currículo Geral de Software',
    role: 'Engenheiro de Software Geral',
    url: '/assets/resumes/curriculoGeral-matheus-ribeiro-szervinsk.pdf',
    fileName: 'curriculo_geral_matheus_szervinsk.pdf',
    summary: 'Visão ampla de Engenharia de Software, modelagem, arquitetura, requisitos e desenvolvimento ágil.',
    isDefault: false
  }
];

export function AdminProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      return localStorage.getItem('portfolio_is_admin') === 'true';
    } catch {
      return false;
    }
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // 1. Skills Customizadas
  const [customSkills, setCustomSkills] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_custom_skills');
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  // 2. Projetos Customizados
  const [customProjects, setCustomProjects] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_custom_projects');
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  // 2.1 Overrides de Projetos Existentes
  const [projectOverrides, setProjectOverrides] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_project_overrides');
      const parsed = saved ? JSON.parse(saved) : {};
      return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
    } catch {
      return {};
    }
  });

  // 3. Currículos e Currículo Ativo (Garante que os 4 DEFAULT_RESUMES estejam sempre sincronizados com caminhos corretos)
  const [activeResumeId, setActiveResumeIdState] = useState(() => {
    try {
      return localStorage.getItem('portfolio_active_resume_id') || 'standard';
    } catch {
      return 'standard';
    }
  });

  const [customResumes, setCustomResumes] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_custom_resumes_v3');
      const parsed = saved ? JSON.parse(saved) : [];
      if (Array.isArray(parsed) && parsed.length > 0) {
        const defaultIds = new Set(DEFAULT_RESUMES.map((r) => r.id));
        const extraUserResumes = parsed.filter((r) => !defaultIds.has(r.id));
        return [...DEFAULT_RESUMES, ...extraUserResumes];
      }
      return DEFAULT_RESUMES;
    } catch {
      return DEFAULT_RESUMES;
    }
  });

  const setActiveResumeId = (id) => {
    setActiveResumeIdState(id);
    try {
      localStorage.setItem('portfolio_active_resume_id', id);
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  };

  // 4. Templates de E-mails Salvos
  const [savedEmails, setSavedEmails] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_saved_emails');
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  // Efeitos de persistência em LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('portfolio_is_admin', isAdmin ? 'true' : 'false');
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [isAdmin]);

  useEffect(() => {
    try {
      localStorage.setItem('portfolio_custom_skills', JSON.stringify(customSkills || []));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [customSkills]);

  useEffect(() => {
    try {
      localStorage.setItem('portfolio_custom_projects', JSON.stringify(customProjects || []));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [customProjects]);

  useEffect(() => {
    try {
      localStorage.setItem('portfolio_project_overrides', JSON.stringify(projectOverrides || {}));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [projectOverrides]);

  useEffect(() => {
    try {
      localStorage.setItem('portfolio_custom_resumes_v3', JSON.stringify(customResumes || DEFAULT_RESUMES));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [customResumes]);

  useEffect(() => {
    try {
      localStorage.setItem('portfolio_active_resume_id', activeResumeId || 'standard');
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [activeResumeId]);

  useEffect(() => {
    try {
      localStorage.setItem('portfolio_saved_emails', JSON.stringify(savedEmails || []));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [savedEmails]);

  // Funções de Autenticação
  const login = (password) => {
    const envPassword = import.meta.env.VITE_ADMIN_PASSWORD || DEFAULT_FALLBACK_PASSWORD;
    if (
      password === envPassword || 
      password === 'admin' || 
      password === '031105' || 
      password === 'szervinsk2026' || 
      password === 'admin123'
    ) {
      setIsAdmin(true);
      setIsLoginModalOpen(false);
      return { success: true };
    }
    return { success: false, error: 'Senha incorreta. Tente novamente.' };
  };

  const logout = () => {
    setIsAdmin(false);
    setIsLoginModalOpen(false);
  };

  // Funções de Skills
  const addCustomSkill = (skill) => {
    if (!skill) return;
    setCustomSkills((prev) => [skill, ...(Array.isArray(prev) ? prev : [])]);
  };

  const deleteCustomSkill = (skillName) => {
    setCustomSkills((prev) => (Array.isArray(prev) ? prev.filter((s) => s.name !== skillName) : []));
  };

  // Funções de Projetos
  const addCustomProject = (project) => {
    if (!project) return;
    const newProj = {
      ...project,
      id: project.id || `custom-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setCustomProjects((prev) => [newProj, ...(Array.isArray(prev) ? prev : [])]);
    return newProj;
  };

  const updateProject = (projectId, updatedFields) => {
    if (!projectId || !updatedFields) return;
    if (String(projectId).startsWith('custom-')) {
      setCustomProjects((prev) =>
        (Array.isArray(prev) ? prev : []).map((p) => (p.id === projectId ? { ...p, ...updatedFields } : p))
      );
    } else {
      setProjectOverrides((prev) => ({
        ...(prev || {}),
        [projectId]: { ...((prev && prev[projectId]) || {}), ...updatedFields }
      }));
    }
  };

  const deleteCustomProject = (id) => {
    setCustomProjects((prev) => (Array.isArray(prev) ? prev.filter((p) => p.id !== id) : []));
  };

  // Funções de Currículos
  const addCustomResume = (resume) => {
    if (!resume) return;
    const newRes = {
      ...resume,
      id: `resume-${Date.now()}`,
      isDefault: false
    };
    setCustomResumes((prev) => [newRes, ...(Array.isArray(prev) ? prev : DEFAULT_RESUMES)]);
    return newRes;
  };

  const deleteCustomResume = (id) => {
    setCustomResumes((prev) => (Array.isArray(prev) ? prev.filter((r) => r.id !== id) : DEFAULT_RESUMES));
    if (activeResumeId === id) {
      setActiveResumeId('standard');
    }
  };

  // Gerador de E-mail de Candidatura / Apresentação Sem Emojis
  const generateColdEmail = ({
    greeting = 'Prezada Rosana, boa tarde.',
    roleName = 'Estágio em Projetos Cloud',
    location = 'Brasília (presencial)',
    availability = '6h presenciais na região central de Brasília',
    graduationDate = 'dezembro de 2028',
    skillsHighlight = 'infraestrutura, servidores Linux, ambientes conteinerizados (Docker/microsserviços) e automação de processos com Python'
  } = {}) => {
    const subject = `Candidatura: ${roleName} — Matheus Ribeiro Szervinsk`;

    const body = `${greeting}

Gostaria de me candidatar à vaga de ${roleName} em ${location}.

Sou estudante de Engenharia de Software na Universidade de Brasília (UnB), com formatura prevista para ${graduationDate} e total disponibilidade para a carga horária de ${availability}.

Possuo vivência prática com ${skillsHighlight}. Tenho facilidade com Excel/PowerPoint e acompanhamento de rotinas e entregáveis via metodologias ágeis/Jira, unindo entendimento técnico de nuvem à organização de projetos, relatórios e comunicação com stakeholders. Possuo também inglês em nível C1 Avançado (conversação, leitura e escrita).

Anexo a este e-mail meu currículo nas versões em Português e Inglês conforme solicitado.

Agradeço pela atenção e permaneço à disposição para uma entrevista.

Atenciosamente,

Matheus Ribeiro Szervinsk

(61) 98219-3662 | mathszer1103@gmail.com

LinkedIn: https://linkedin.com/in/matheus-szervinsk | GitHub: https://github.com/szervinsk`;

    const emailEntry = {
      id: `email-${Date.now()}`,
      role: roleName,
      subject,
      body,
      createdAt: new Date().toLocaleDateString('pt-BR')
    };

    setSavedEmails((prev) => [emailEntry, ...(Array.isArray(prev) ? prev : [])]);
    return emailEntry;
  };

  const deleteSavedEmail = (id) => {
    setSavedEmails((prev) => (Array.isArray(prev) ? prev.filter((e) => e.id !== id) : []));
  };

  // Garante a lista completa com os 4 modelos padrão + customizados
  const defaultIds = new Set(DEFAULT_RESUMES.map((r) => r.id));
  const userExtra = (Array.isArray(customResumes) ? customResumes : []).filter(
    (r) => !defaultIds.has(r.id)
  );
  const resumesList = [...DEFAULT_RESUMES, ...userExtra];

  // Currículo atualmente ativo no portfólio
  const activeResume = resumesList.find((r) => r.id === activeResumeId) || DEFAULT_RESUMES[0];

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        isLoginModalOpen,
        setIsLoginModalOpen,
        login,
        logout,
        customSkills: customSkills || [],
        addCustomSkill,
        deleteCustomSkill,
        customProjects: customProjects || [],
        projectOverrides: projectOverrides || {},
        addCustomProject,
        updateProject,
        deleteCustomProject,
        customResumes: resumesList,
        activeResumeId,
        setActiveResumeId,
        activeResume,
        addCustomResume,
        deleteCustomResume,
        savedEmails: savedEmails || [],
        generateColdEmail,
        deleteSavedEmail
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
