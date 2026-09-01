import React from 'react';

/**
 * Realistic Red Metal Binder Clip
 */
export function BinderClip({ className = "w-10 h-10", color = "#ef4444" }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e2e8f0" />
          <stop offset="50%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
        <filter id="clipShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.35" />
        </filter>
      </defs>
      <g filter="url(#clipShadow)">
        {/* Metal Arms */}
        <path d="M22 8 L22 28 M42 8 L42 28" stroke="url(#metalGrad)" strokeWidth="3" strokeLinecap="round" />
        <path d="M22 8 Q32 2 42 8" stroke="url(#metalGrad)" strokeWidth="3" fill="none" />
        {/* Clip Body */}
        <rect x="14" y="24" width="36" height="24" rx="3" fill={color} stroke="#18181b" strokeWidth="1.5" />
        <rect x="18" y="28" width="28" height="3" rx="1.5" fill="#ffffff" fillOpacity="0.4" />
        <rect x="14" y="44" width="36" height="4" rx="1" fill="#991b1b" />
      </g>
    </svg>
  );
}

/**
 * Metallic Silver Paperclip
 */
export function PaperClip({ className = "w-8 h-12" }) {
  return (
    <svg className={className} viewBox="0 0 32 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="silverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="40%" stopColor="#cbd5e1" />
          <stop offset="70%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
        <filter id="wireShadow" x="-30%" y="-20%" width="160%" height="140%">
          <feDropShadow dx="1.5" dy="3" stdDeviation="2" floodOpacity="0.3" />
        </filter>
      </defs>
      <path
        d="M10 24 V44 C10 52 22 52 22 44 V14 C22 4 4 4 4 16 V48 C4 60 28 60 28 46 V18"
        stroke="url(#silverGrad)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        filter="url(#wireShadow)"
      />
    </svg>
  );
}

/**
 * Frosted Adhesive Washi Tape
 */
export function WashiTape({ className = "w-28 h-7", color = "rgba(254, 240, 138, 0.65)" }) {
  return (
    <div
      className={`rounded-sm pointer-events-none backdrop-blur-[2px] border border-white/40 shadow-sm ${className}`}
      style={{
        backgroundColor: color,
        transform: 'rotate(-2deg)',
      }}
    />
  );
}

/**
 * Yellow Post-it Sticky Note
 */
export function StickyNote({ title, subtitle, note, rotate = "rotate-[-3deg]", className = "" }) {
  return (
    <div
      className={`relative bg-[#fef08a] text-zinc-950 p-5 rounded-sm sticky-shadow border border-yellow-300/60 flex flex-col justify-between font-sans ${rotate} ${className}`}
    >
      {/* Top Tape */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/60 backdrop-blur-xs border border-white/50 shadow-xs rotate-[1deg] pointer-events-none" />

      <div>
        {title && (
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-amber-900/80 mb-1.5">
            {title}
          </div>
        )}
        <div className="font-bold text-sm sm:text-base leading-snug tracking-tight text-zinc-900">
          {note}
        </div>
      </div>

      {subtitle && (
        <div className="mt-4 pt-2 border-t border-amber-900/20 text-[11px] font-mono text-amber-900/90 font-medium">
          {subtitle}
        </div>
      )}
    </div>
  );
}

/**
 * Modern Chat / Notification Pill (Scattered on desk)
 */
export function NotificationBubble({ avatarText, name, time, message, badge, isDark = false, className = "" }) {
  return (
    <div
      className={`p-3.5 sm:p-4 rounded-2xl border shadow-xl flex items-start gap-3 max-w-xs transition-transform duration-200 hover:scale-105 pointer-events-auto ${
        isDark
          ? 'bg-[#181a20]/95 border-zinc-700/80 text-zinc-100'
          : 'bg-white/95 border-zinc-200 text-zinc-900'
      } ${className}`}
    >
      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-amber-500 text-zinc-950 font-black text-xs flex items-center justify-center shrink-0 shadow-sm">
        {avatarText || 'MS'}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1 mb-1">
          <span className="text-xs font-bold truncate">{name}</span>
          <span className="text-[10px] font-mono text-zinc-400 shrink-0">{time || 'Agora'}</span>
        </div>
        <p className="text-xs leading-relaxed opacity-90 font-medium">
          {message}
        </p>
        {badge && (
          <span className="inline-block mt-2 text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}

/**
 * Tech Shiny Coin / Token Badge
 */
export function TechCoin({ label, symbol = "⚡", color = "from-emerald-400 to-teal-600", className = "" }) {
  return (
    <div
      className={`w-12 h-12 rounded-full bg-gradient-to-tr ${color} border-2 border-white/80 shadow-[0_6px_16px_rgba(0,0,0,0.35)] flex items-center justify-center text-white font-black text-sm select-none ${className}`}
      title={label}
    >
      <div className="w-9 h-9 rounded-full border border-white/40 flex items-center justify-center bg-black/10">
        {symbol}
      </div>
    </div>
  );
}
