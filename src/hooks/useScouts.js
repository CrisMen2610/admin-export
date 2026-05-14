import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const DEFAULT_AVATAR =
  'https://images.unsplash.com/photo-1644492097455-d5f39f458fcd?w=200&h=200&fit=crop';

export function useScouts() {
  const [scouts,  setScouts]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [{ data: raw, error: e1 }, { data: links, error: e2 }] =
          await Promise.all([
            supabase.from('scouts').select('*'),
            supabase.from('scout_athletes').select('scout_id'),
          ]);
        if (e1) throw e1;
        if (e2) throw e2;
        if (cancelled) return;

        const countMap = {};
        (links || []).forEach((l) => {
          countMap[l.scout_id] = (countMap[l.scout_id] || 0) + 1;
        });

        setScouts(
          (raw || []).map((s) => ({
            id:           s.id,
            name:         s.full_name || s.email,
            position:     s.details?.position || s.organization_name || 'Scout',
            region:       s.details?.region   || '—',
            activeScouts: countMap[s.id] || 0,
            avatar:       s.details?.avatar_url || DEFAULT_AVATAR,
          }))
        );
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  return { scouts, loading, error };
}
