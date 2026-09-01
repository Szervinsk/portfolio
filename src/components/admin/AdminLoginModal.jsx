import React, { useState } from 'react';
import { Lock, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export default function AdminLoginModal() {
  const { isAdmin, isLoginModalOpen, setIsLoginModalOpen, login } = useAdmin();
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  if (!isLoginModalOpen || isAdmin) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = login(password);
    if (res.success) {
      setPassword('');
      setLoginError('');
    } else {
      setLoginError(res.error);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[110] flex items-center justify-center bg-zinc-950/80 backdrop-blur-sm p-4 animate-pop-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsLoginModalOpen(false);
      }}
    >
      <div 
        className="relative w-full max-w-sm bg-[#faf8f5] border-3 border-zinc-950 p-6 sm:p-7 rounded-3xl shadow-[8px_8px_0px_rgba(0,0,0,1)] text-center"
        role="dialog"
      >
        <button
          onClick={() => setIsLoginModalOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-xl border border-zinc-300 hover:bg-zinc-100 text-zinc-600 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-12 h-12 bg-yellow-300 border-2 border-zinc-950 rounded-2xl mx-auto flex items-center justify-center mb-3 shadow-[2.5px_2.5px_0px_rgba(0,0,0,1)]">
          <Lock className="w-6 h-6 text-zinc-950" />
        </div>

        <h3 className="text-xl font-black text-zinc-950 mb-1">Modo Editor / ADM</h3>
        <p className="text-xs text-zinc-600 font-medium mb-5">
          Insira sua senha para desbloquear as ferramentas de edição diretamente nas seções do site.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-left">
          <div>
            <label className="block text-[11px] font-mono font-bold text-zinc-700 uppercase tracking-wider mb-1">
              Senha de Acesso
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite a senha..."
              className="w-full px-3.5 py-2 rounded-xl border-2 border-zinc-950 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-white"
              autoFocus
            />
            {loginError && (
              <p className="text-[11px] text-red-600 font-bold mt-1">{loginError}</p>
            )}
            <p className="text-[10px] font-mono text-zinc-400 mt-1">
              Dica padrão: <code>admin</code>
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl border-2 border-zinc-950 bg-yellow-300 hover:bg-yellow-400 text-zinc-950 font-black text-xs shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>Ativar Modo Editor</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
