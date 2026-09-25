import { useState, useEffect, useCallback } from 'react';
import { getCompleteGitHubStats } from '../services/githubService';

export function useGitHubData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = useCallback(async (forceRefresh = false) => {
    if (forceRefresh) {
      try {
        Object.keys(localStorage)
          .filter((k) => k.startsWith('sz_gh_cache_'))
          .forEach((k) => localStorage.removeItem(k));
      } catch (e) {
        // ignore
      }
    }

    try {
      setLoading(true);
      const stats = await getCompleteGitHubStats();
      setData(stats);
      setError(null);
    } catch (err) {
      console.error('[useGitHubData] Erro ao carregar dados do GitHub:', err);
      setError(err?.message || 'Falha ao sincronizar com GitHub');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    data,
    loading,
    error,
    refresh: () => loadData(true)
  };
}
