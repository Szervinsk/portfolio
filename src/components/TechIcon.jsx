import React from 'react';
import { 
  Code2, 
  Database, 
  Server, 
  Workflow, 
  GitBranch, 
  Smartphone, 
  Sparkles
} from 'lucide-react';

export default function TechIcon({ name, className = "w-3.5 h-3.5" }) {
  if (!name) return <Code2 className={className} />;
  const lower = name.toLowerCase().trim();

  // React / React Native
  if (lower.includes('react') || lower.includes('native')) {
    return (
      <svg className={`${className} text-[#0284c7]`} viewBox="-11.5 -10.23174 23 20.46348" fill="currentColor">
        <circle cx="0" cy="0" r="2.05" fill="currentColor" />
        <g stroke="currentColor" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    );
  }

  // Python
  if (lower.includes('python')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.006 2.752h5.808v.826H3.85S0 5.767 0 11.904c0 6.14 3.376 5.925 3.376 5.925h2.013v-2.822s-.11-3.377 3.318-3.377h5.688v-.853h-5.69s-2.485.087-2.485-2.484c0-2.571 2.22-2.529 2.22-2.529h8.922s3.155.335 3.155-3.377c0-3.712-2.73-2.387-2.73-2.387H11.914zm-1.638 1.677c.504 0 .914.41.914.914 0 .505-.41.915-.914.915a.914.914 0 01-.914-.915c0-.504.41-.914.914-.914z" fill="#0284c7" />
        <path d="M12.086 24c6.094 0 5.714-2.656 5.714-2.656l-.006-2.752h-5.808v-.826h8.164S24 18.233 24 12.096c0-6.14-3.376-5.925-3.376-5.925h-2.013v2.822s.11 3.377-3.318 3.377H9.569v.853h5.69s2.485-.087 2.485 2.484c0 2.571-2.22 2.529-2.22 2.529H6.602S3.447 21.879 3.447 25.59c0 3.712 2.73 2.387 2.73 2.387h5.909zm1.638-1.677a.914.914 0 01-.914-.914c0-.505.41-.915.914-.915.504 0 .914.41.914.915 0 .504-.41.914-.914.914z" fill="#eab308" />
      </svg>
    );
  }

  // Node.js
  if (lower.includes('node')) {
    return (
      <svg className={`${className} text-[#16a34a]`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l9 5.2v10.4L12 23l-9-5.4V7.2L12 2zm0 2.3L5 8.3v7.4l7 4 7-4V8.3l-7-4z" />
      </svg>
    );
  }

  // Docker
  if (lower.includes('docker') || lower.includes('container')) {
    return (
      <svg className={`${className} text-[#0284c7]`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186m-2.954 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.145a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186m5.884 2.714h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186H8.1a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H5.145a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185M23.99 11.7c-.12-.83-.73-1.48-1.54-1.68-.53-.14-1.25-.09-1.87.16-.32-.7-.91-1.22-1.65-1.47l-.54-.18-.32.48c-.5.73-.78 1.6-.82 2.52-.4-.06-.8-.09-1.21-.09H1.47c-.24 0-.46.06-.67.17-.48.24-.76.73-.75 1.27.04 1.83.67 3.55 1.76 4.88 1.43 1.75 3.39 2.84 5.6 3.12.5.06 1.01.1 1.52.1 4.54 0 8.78-1.99 11.53-5.4 1.74-2.15 2.5-4.14 2.53-4.24.09-.34.09-.64 0-.92" />
      </svg>
    );
  }

  // PostgreSQL
  if (lower.includes('postgres') || lower.includes('sql') || lower.includes('database')) {
    return (
      <svg className={`${className} text-[#2563eb]`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 4.02 2 6.5s4.48 4.5 10 4.5 10-2.02 10-4.5S17.52 2 12 2zm0 6C7.58 8 4 6.66 4 6.5S7.58 5 12 5s8 1.34 8 1.5S16.42 8 12 8zm8 3.5c0 .24-.42.7-1.23 1.15-1.52.84-3.92 1.35-6.77 1.35s-5.25-.51-6.77-1.35C4.42 12.2 4 11.74 4 11.5V9.22c1.86 1.25 4.79 1.78 8 1.78s6.14-.53 8-1.78v2.28zm0 5c0 .24-.42.7-1.23 1.15-1.52.84-3.92 1.35-6.77 1.35s-5.25-.51-6.77-1.35C4.42 17.2 4 16.74 4 16.5v-2.28c1.86 1.25 4.79 1.78 8 1.78s6.14-.53 8-1.78v2.28z" />
      </svg>
    );
  }

  // Tailwind CSS
  if (lower.includes('tailwind')) {
    return (
      <svg className={`${className} text-[#06b6d4]`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
      </svg>
    );
  }

  // FastAPI
  if (lower.includes('fastapi')) {
    return (
      <svg className={`${className} text-[#059669]`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-.5 4.5l5 7h-4.5l1.5 8-6-8h4.5l-0.5-7z" />
      </svg>
    );
  }

  // Django
  if (lower.includes('django')) {
    return (
      <svg className={`${className} text-[#047857]`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.146 0h3.325v16.143c-.886.136-1.748.204-2.585.204-4.148 0-6.19-1.92-6.19-5.748 0-3.784 2.115-6.046 5.45-6.046.75 0 1.348.069 1.83.205V0h-.83zm0 7.42c-.368-.07-.777-.103-1.226-.103-1.635 0-2.617 1.056-2.617 2.827 0 1.84.982 2.827 2.617 2.827.449 0 .858-.034 1.226-.103V7.42z" />
      </svg>
    );
  }

  // Electron
  if (lower.includes('electron')) {
    return (
      <svg className={`${className} text-[#38bdf8]`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm0 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9z" />
      </svg>
    );
  }

  // AI / Gemini / LLM / NLP / LangChain / FAISS
  if (lower.includes('gemini') || lower.includes('ia') || lower.includes('ai') || lower.includes('langchain') || lower.includes('faiss') || lower.includes('nlp')) {
    return <Sparkles className={`${className} text-amber-500`} />;
  }

  // Socket.io / Webhooks
  if (lower.includes('socket') || lower.includes('webhook') || lower.includes('rest')) {
    return <Workflow className={`${className} text-violet-600`} />;
  }

  // Mobile / NativeWind
  if (lower.includes('mobile') || lower.includes('nativewind')) {
    return <Smartphone className={`${className} text-indigo-600`} />;
  }

  // Express / Server / Backend
  if (lower.includes('express') || lower.includes('backend') || lower.includes('server')) {
    return <Server className={`${className} text-zinc-700`} />;
  }

  // Git / CI/CD
  if (lower.includes('git')) {
    return <GitBranch className={`${className} text-orange-600`} />;
  }

  // Fallback
  return <Code2 className={`${className} text-zinc-700`} />;
}
