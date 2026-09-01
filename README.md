<div align="center">

# ⚡ Matheus Ribeiro Szervinsk • Portfolio & Career Hub

<p align="center">
  <strong>Engenharia de Software (UnB) • Full Stack Developer • Automações & Cloud</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS v4" />
  <img src="https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="License MIT" />
</p>

<p align="center">
  Um portfólio interativo de alta conversão desenvolvido com estética <strong>Neo-Brutalist Scrapbook</strong>, integrando showcase detalhado de projetos com metodologia STAR, linha do tempo contínua, seletor dinâmico de 4 modelos de currículo e uma <strong>Central Privada de Candidaturas & IA (Modo Editor)</strong>.
</p>

---

</div>

## 📑 Sumário

- [✨ Destaques e Funcionalidades](#-destaques-e-funcionalidades)
- [🛠️ Stack Tecnológica](#️-stack-tecnológica)
- [🧱 Arquitetura e Seções](#-arquitetura-e-seções)
- [⚡ Modo Editor & Painel Administrativo](#-modo-editor--painel-administrativo)
- [🚀 Como Rodar Localmente](#-como-rodar-localmente)
- [🔑 Variáveis de Ambiente](#-variáveis-de-ambiente)
- [🌐 Guia de Deploy (Vercel)](#-guia-de-deploy-vercel)
- [👤 Autor & Contato](#-autor--contato)

---

## ✨ Destaques e Funcionalidades

- **🎨 Design System Neo-Brutalist Scrapbook**: Bordas marcantes (`border-2 / border-3`), sombras de alto contraste (`shadow-[4px_4px_0px]`), paleta viva com tons pastéis e texturas de grid/caderno.
- **🌐 Internacionalização Nativa (i18n)**: Alternância em tempo real entre **Português (PT-BR)** e **Inglês (EN)**.
- **📂 Modal Interativo de Projetos (Metodologia STAR)**:
  - Detalhamento de **Situação, Desafio, Solução & Arquitetura e Resultados/Métricas**.
  - Mural de telas e interfaces com botão de expansão no hover e **Lightbox em Tela Cheia**.
  - Links diretos para protótipos no Figma e repositórios no GitHub.
- **🛣️ Linha do Tempo Horizontal Contínua**: Barra sólida reta e grossa conectando os marcos da UnB (2023), Caesb (2024-2025), Transoft (2025-Hoje) e o nó de *Aguardando novas oportunidades (2026+)* com cards interativos.
- **📄 Seletor Reativo de 4 Modelos de Currículo**:
  - *Currículo Padrão (Full Stack & Automações)*
  - *Resume in English (International)*
  - *Currículo de TI & Infraestrutura*
  - *Currículo Geral de Software*
  - Troca instantânea da versão ativa no site, prévia e PDF de download com 1 clique na caixa amarela.
- **🔒 Central Privada de Candidaturas & IA (Pós-Footer)**:
  - Gerador de **Cold Email sem emojis** no formato executivo com botão de cópia instantânea.
  - **Prompt de IA Otimizado para ATS** (ChatGPT/Claude/Gemini) para tailoring de currículo por vaga.
  - Links rápidos para o **Overleaf LaTeX Editor** e repositórios.
  - Formulário para cadastrar novos modelos de currículo diretamente no site.

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologia | Descrição |
| :--- | :--- | :--- |
| **Frontend** | React 19 + JSX | Componentização moderna e hooks customizados |
| **Build Tool** | Vite 6 | Bundling ultra-rápido com HMR instantâneo |
| **Estilização** | Tailwind CSS v4 | Utilitários modernos com variáveis CSS nativas |
| **Ícones** | Lucide React | Conjunto consistente de ícones vetoriais |
| **Estado Global** | Context API | Gestão de internacionalização e Modo Editor |
| **Deploy & CD** | Vercel | Hospedagem em Edge CDN com deploy contínuo via GitHub |

---

## 🧱 Arquitetura e Seções

```
portfolio/
├── public/
│   └── assets/
│       ├── images/          # Imagens de perfil e screenshots dos projetos (SalvaDocs, Participe+, etc.)
│       └── resumes/         # 4 versões em PDF do currículo oficial
├── src/
│   ├── components/
│   │   ├── admin/           # Ferramentas exclusivas do Modo ADM (Login, Toolbar, Career Hub)
│   │   ├── Navbar.jsx       # Barra de navegação responsiva com auto-ocultação em modais
│   │   ├── HeroSection.jsx  # Apresentação principal com badges interativos e parallax
│   │   ├── AboutMeSection.jsx # Perfil pessoal e foto scrapbook
│   │   ├── AboutSection.jsx # Pilares de atuação e stack corporativa
│   │   ├── SkillsSection.jsx # Matriz de habilidades categorizada (Backend, Frontend, etc.)
│   │   ├── ProjectsSection.jsx # Showcase de projetos corporativos
│   │   ├── ProjectModal.jsx # Modal com metodologia STAR e galeria de telas
│   │   ├── ExperienceSection.jsx # Linha do tempo horizontal contínua
│   │   ├── LetterSection.jsx # Prancheta A4 de currículo + Seletor lateral de modelos
│   │   └── ContactSection.jsx # Rodapé com contatos, relógio de Brasília e links sociais
│   ├── context/
│   │   ├── LanguageContext.jsx # Gestão de idioma (PT / EN)
│   │   └── AdminContext.jsx    # Gestão de estado do Modo Editor, currículos e overrides
│   ├── content/
│   │   ├── translations.js  # Textos e conteúdos bilíngues
│   │   └── projectsData.js  # Metadados e estruturação STAR dos projetos
│   └── styles/
│       └── globals.css      # Configurações do Tailwind, fontes e animações
├── .env.example             # Modelo de variáveis de ambiente
├── vercel.json              # Configuração de SPA rewrites para a Vercel
└── vite.config.js           # Configuração de build do Vite
```

---

## ⚡ Modo Editor & Painel Administrativo

O portfólio possui um **Modo Editor In-Place** acessível pelo botão flutuante fixado no canto inferior direito (*"Se você for o adm clica aqui"*):

1. **Autenticação Segura**: Validação de senha via variável de ambiente `VITE_ADMIN_PASSWORD` ou senha local.
2. **Edição In-Place**:
   - Adicionar ou remover habilidades diretamente na `SkillsSection`.
   - Adicionar novos projetos ou editar projetos existentes direto dentro do `ProjectModal`.
   - Alternar qual versão de currículo é exibida e baixada pelos visitantes na `LetterSection`.
3. **Central Privada de Vagas (Após o Footer)**: Área restrita para geração de e-mails formais, prompts de IA e atalhos para LaTeX no Overleaf.

---

## 🚀 Como Rodar Localmente

### Pré-requisitos
- **Node.js** (v18 ou superior)
- **npm** ou **pnpm / yarn**

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Szervinsk/portfolio.git
   cd portfolio
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure o arquivo de ambiente:**
   ```bash
   cp .env.example .env.local
   ```

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   Acesse a aplicação no navegador em: `http://localhost:5173`.

5. **Para gerar a build de produção:**
   ```bash
   npm run build
   npm run preview
   ```

---

## 🔑 Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes chaves:

```env
# Senha de Acesso ao Painel e Modo Editor (Admin)
VITE_ADMIN_PASSWORD=sua_senha_secreta_aqui

# Informações de Contato e URLs
VITE_SITE_URL=http://localhost:5173
VITE_CONTACT_EMAIL=mathszer1103@gmail.com
VITE_PHONE=(61) 98219-3662
```

---

## 🌐 Guia de Deploy (Vercel)

A **Vercel** é a plataforma recomendada para este projeto devido ao suporte nativo a Single Page Applications (SPAs), build automático a cada `git push` e gerenciamento simples de variáveis de ambiente.

### Passo a Passo para Deploy na Vercel:

1. Suba suas alterações para o GitHub:
   ```bash
   git push origin main
   ```
2. Acesse [vercel.com](https://vercel.com) e faça login com sua conta do GitHub.
3. Clique em **"Add New..."** > **"Project"**.
4. Importe o repositório `portfolio`.
5. Em **Build and Output Settings**, o Vite será detectado automaticamente:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Em **Environment Variables**, adicione sua variável:
   - `VITE_ADMIN_PASSWORD` = *(sua senha administrativa desejada)*
7. Clique em **"Deploy"**.

Em menos de 1 minuto seu site estará no ar com HTTPS gratuito e domínio `.vercel.app`!

---

## 👤 Autor & Contato

**Matheus Ribeiro Szervinsk**  
*Estudante de Engenharia de Software — Universidade de Brasília (UnB)*  
*Brasília, DF • Brasil*

- 💼 **LinkedIn**: [linkedin.com/in/matheus-szervinsk](https://linkedin.com/in/matheus-szervinsk)
- 🐙 **GitHub**: [github.com/szervinsk](https://github.com/szervinsk)
- 📧 **E-mail**: [mathszer1103@gmail.com](mailto:mathszer1103@gmail.com)
- 📱 **Telefone/WhatsApp**: (61) 98219-3662

---

<div align="center">
  <sub>Desenvolvido com carinho e café por Matheus Ribeiro Szervinsk. © 2026</sub>
</div>
