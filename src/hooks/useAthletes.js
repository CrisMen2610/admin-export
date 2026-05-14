import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const DEFAULT_AVATAR =
  'https://images.unsplash.com/photo-1644492097455-d5f39f458fcd?w=200&h=200&fit=crop';

function mapAthlete(a, careerMap) {
  return {
    id:            a.id,
    name:          a.full_name,
    age:           a.age,
    sport:         a.sport || a.category || '—',
    position:      a.position || '—',
    club:          careerMap[a.id]?.current_club || '—',
    nationality:   a.country,
    location:      a.country,
    currentRating: a.points ?? 0,
    potential:     null,
    avatar:        a.avatar_url || DEFAULT_AVATAR,
    status:        a.profile_complete ? 'ACTIVO' : 'PENDIENTE',
  };
}

export function useAthletes() {
  const [athletes, setAthletes] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [{ data: raw, error: e1 }, { data: careers, error: e2 }] =
          await Promise.all([
            supabase.from('v_scouting_athletes').select('*'),
            supabase.from('athlete_career').select('athlete_id, current_club'),
          ]);
        if (e1) throw e1;
        if (e2) throw e2;
        if (cancelled) return;
        const careerMap = Object.fromEntries(
          (careers || []).map((c) => [c.athlete_id, c])
        );
        setAthletes((raw || []).map((a) => mapAthlete(a, careerMap)));
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  return { athletes, loading, error };
}
