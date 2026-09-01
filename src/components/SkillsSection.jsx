import React, { useState } from 'react';
import { 
  Terminal, 
  Code2, 
  Database, 
  ShieldCheck, 
  Workflow, 
  Boxes, 
  Server, 
  Cpu, 
  GitBranch, 
  FileCode2, 
  Layers,
  PlusCircle,
  Trash2,
  Check
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin } from '../context/AdminContext';

const SKILL_ICONS = {
  'Python': Terminal,
  'FastAPI / Django': Server,
  'PHP (Laravel)': FileCode2,
  'Node.js & Express': Cpu,
  'REST APIs & Webhooks': Workflow,
  'React.js': Code2,
  'JavaScript (ES6+)': Code2,
  'Tailwind CSS': Layers,
  'HTML5 & CSS3': Code2,
  'PostgreSQL': Database,
  'MySQL / SQL Server': Database,
  'Docker & Containers': Boxes,
  'Git & CI/CD Pipelines': GitBranch,
  'Conformidade LGPD': ShieldCheck,
  'Data Compliance (LGPD)': ShieldCheck,
  'Segurança de APIs': ShieldCheck,
  'API Security': ShieldCheck,
  'Metodologias Ágeis (Scrum/Jira)': Workflow,
  'Agile (Scrum / Jira)': Workflow,
};

export default function SkillsSection() {
  const { t } = useLanguage();
  const { isAdmin, customSkills, addCustomSkill, deleteCustomSkill } = useAdmin();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeSkill, setActiveSkill] = useState(null);
  
  // Estado do formulário in-place de criação de skill
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [newSkill, setNewSkill] = useState({
    name: '',
    category: 'backend',
    level: 'Avançado',
    desc: ''
  });

  const categoriesList = [
    { id: 'all', label: t.skills.categories.all },
    { id: 'backend', label: t.skills.categories.backend },
    { id: 'frontend', label: t.skills.categories.frontend },
    { id: 'database', label: t.skills.categories.database },
    { id: 'security', label: t.skills.categories.security },
  ];

  // Combina skills padrão com skills adicionadas pelo admin
  const allSkills = [...(customSkills || []), ...(t.skills?.items || [])];

  const filteredSkills = selectedCategory === 'all'
    ? allSkills
    : allSkills.filter((s) => s?.category === selectedCategory);

  const handleCreateSkill = (e) => {
    e.preventDefault();
    if (!newSkill.name) return;

    addCustomSkill({
      name: newSkill.name,
      category: newSkill.category,
      level: newSkill.level,
      desc: newSkill.desc || `Experiência prática em desenvolvimento e arquitetura com ${newSkill.name}.`,
      isCustom: true
    });

    setNewSkill({ name: '', category: 'backend', level: 'Avançado', desc: '' });
    setIsAddingSkill(false);
  };

  return (
    <section id="skills" className="snap-section min-h-screen py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#faf8f5] relative z-20 flex flex-col justify-center">
      <div className="max-w-5xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-zinc-900 bg-white shadow-[2.5px_2.5px_0px_rgba(24,24,27,1)] text-[11px] font-bold text-zinc-900 mb-2.5">
            <Boxes className="w-3.5 h-3.5 text-purple-600" />
            <span>{t.skills.badge}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-zinc-950 tracking-tight">
            {t.skills.titleMain} <span className="font-serif italic font-normal text-purple-700">{t.skills.titleItalic}</span>
          </h2>
          
          <p className="mt-2.5 text-zinc-700 text-xs sm:text-sm">
            {t.skills.subtitle}
          </p>
        </div>

        {/* Category Filters + Botão de Adicionar Skill (se Admin) */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          {categoriesList.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border-2 border-zinc-900 transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-zinc-900 text-white shadow-[2.5px_2.5px_0px_rgba(24,24,27,1)] -translate-y-0.5'
                  : 'bg-white text-zinc-700 hover:bg-zinc-100 shadow-[1px_1px_0px_rgba(24,24,27,1)]'
              }`}
            >
              {cat.label}
            </button>
          ))}

          {/* Botão Admin para adicionar nova skill in-place */}
          {isAdmin && (
            <button
              onClick={() => setIsAddingSkill(!isAddingSkill)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border-2 border-zinc-900 bg-yellow-300 hover:bg-yellow-400 text-zinc-950 text-xs font-bold shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>{isAddingSkill ? 'Fechar Formulário' : '+ Adicionar Skill (ADM)'}</span>
            </button>
          )}
        </div>

        {/* Formulário In-Place de Adicionar Skill (Expandível no Modo Editor) */}
        {isAdmin && isAddingSkill && (
          <div className="mb-8 p-5 bg-white rounded-2xl border-3 border-zinc-950 shadow-[5px_5px_0px_rgba(0,0,0,1)] animate-pop-in">
            <h3 className="text-sm font-black text-zinc-950 mb-3 flex items-center gap-2">
              <PlusCircle className="w-4 h-4 text-emerald-600" />
              <span>Cadastrar Nova Habilidade no Portfólio</span>
            </h3>

            <form onSubmit={handleCreateSkill} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-[10px] font-mono font-bold text-zinc-700 uppercase mb-1">
                  Nome da Tecnologia *
                </label>
                <input
                  type="text"
                  required
                  value={newSkill.name}
                  onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                  placeholder="Ex: GraphQL, Next.js, Redis"
                  className="w-full px-3 py-1.5 rounded-xl border-2 border-zinc-950 text-xs font-medium focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold text-zinc-700 uppercase mb-1">
                  Categoria
                </label>
                <select
                  value={newSkill.category}
                  onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-xl border-2 border-zinc-950 text-xs font-medium bg-white"
                >
                  <option value="backend">Backend & APIs</option>
                  <option value="frontend">Frontend & UI</option>
                  <option value="database">Bancos de Dados</option>
                  <option value="security">Segurança & Metodologia</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold text-zinc-700 uppercase mb-1">
                  Nível
                </label>
                <input
                  type="text"
                  value={newSkill.level}
                  onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
                  placeholder="Avançado / Intermediário"
                  className="w-full px-3 py-1.5 rounded-xl border-2 border-zinc-950 text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold text-zinc-700 uppercase mb-1">
                  Descrição Curta
                </label>
                <input
                  type="text"
                  value={newSkill.desc}
                  onChange={(e) => setNewSkill({ ...newSkill, desc: e.target.value })}
                  placeholder="Breve resumo da aplicação..."
                  className="w-full px-3 py-1.5 rounded-xl border-2 border-zinc-950 text-xs font-medium"
                />
              </div>

              <div className="sm:col-span-4 flex justify-end gap-2 mt-1">
                <button
                  type="button"
                  onClick={() => setIsAddingSkill(false)}
                  className="px-3 py-1.5 rounded-xl border border-zinc-300 text-zinc-600 text-xs font-bold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl border-2 border-zinc-950 bg-emerald-300 hover:bg-emerald-400 text-zinc-950 text-xs font-black shadow-[2px_2px_0px_rgba(0,0,0,1)] cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Publicar Habilidade</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {filteredSkills.map((skill) => {
            const Icon = SKILL_ICONS[skill.name] || Terminal;
            const isSelected = activeSkill?.name === skill.name;
            const isCustom = Boolean(skill.isCustom || (customSkills || []).some((cs) => cs?.name === skill?.name));

            return (
              <div
                key={skill.name}
                onClick={() => setActiveSkill(isSelected ? null : skill)}
                className={`p-4 rounded-2xl border-2 border-zinc-950 bg-white shadow-[3px_3px_0px_rgba(24,24,27,1)] hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_rgba(24,24,27,1)] transition-all cursor-pointer flex flex-col justify-between group relative ${
                  isSelected ? 'ring-2 ring-purple-600 bg-purple-50/50' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-900/30 flex items-center justify-center text-zinc-900 group-hover:bg-yellow-200 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-zinc-100 border border-zinc-300 text-zinc-800">
                        {skill.level}
                      </span>
                      
                      {/* Botão de excluir skill customizada em Modo Editor */}
                      {isAdmin && isCustom && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteCustomSkill(skill.name);
                          }}
                          className="p-1 rounded-md bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 cursor-pointer"
                          title="Remover habilidade customizada"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>

                  <h3 className="font-bold text-sm text-zinc-950 mb-1 group-hover:text-purple-700 transition-colors flex items-center gap-1.5">
                    <span>{skill.name}</span>
                    {isCustom && (
                      <span className="text-[9px] font-mono bg-yellow-200 text-zinc-900 px-1.5 py-0.2 rounded border border-zinc-800">
                        custom
                      </span>
                    )}
                  </h3>

                  <p className="text-zinc-600 text-[11px] leading-relaxed font-medium">
                    {skill.desc}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-zinc-100 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                  <span className="capitalize">{skill.category}</span>
                  <span className="text-zinc-950 group-hover:translate-x-0.5 transition-transform font-bold">
                    {t.skills?.activeLabel || 'Ver Detalhes'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-8 p-5 rounded-2xl bg-zinc-900 text-white border-2 border-zinc-950 shadow-[4px_4px_0px_rgba(24,24,27,1)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-9 h-9 rounded-xl bg-yellow-400 text-zinc-950 flex items-center justify-center font-black shrink-0">
              <Code2 className="w-4 h-4 text-zinc-950" />
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm">
                {t.skills.bannerTitle}
              </h4>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                {t.skills.bannerDesc}
              </p>
            </div>
          </div>

          <a
            href="#contato"
            className="px-4 py-2 rounded-xl bg-white hover:bg-yellow-300 text-zinc-900 font-bold text-xs border-2 border-zinc-900 shadow-[2px_2px_0px_rgba(255,255,255,1)] shrink-0 transition-colors"
          >
            {t.skills.bannerBtn}
          </a>
        </div>

      </div>
    </section>
  );
}
