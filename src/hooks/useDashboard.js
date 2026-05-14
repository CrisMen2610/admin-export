import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const DAYS_ES   = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'];
const MONTHS_ES = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
const SPORT_COLORS = ['#3b82f6','#f59e0b','#22c55e','#8b5cf6','#ef4444','#ec4899'];
const DEFAULT_AVATAR =
  'https://images.unsplash.com/photo-1644492097455-d5f39f458fcd?w=200&h=200&fit=crop';

function groupByDayOfWeek(rows, dateKey, valueKey) {
  const buckets = Object.fromEntries(DAYS_ES.map((d) => [d, 0]));
  rows.forEach((r) => {
    const label = DAYS_ES[new Date(r[dateKey]).getDay()];
    buckets[label]++;
  });
  return DAYS_ES.map((d) => ({ day: d, [valueKey]: buckets[d] }));
}

function groupByMonth(rows, dateKey) {
  const buckets = MONTHS_ES.map((m) => ({ month: m, atletas: 0 }));
  rows.forEach((r) => {
    const idx = new Date(r[dateKey]).getMonth();
    if (buckets[idx]) buckets[idx].atletas++;
  });
  return buckets.slice(0, 6);
}

export function useDashboard() {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [
          { data: athletes,     error: e1 },
          { data: scouts,       error: e2 },
          { data: actLog,       error: e3 },
          { data: careers,      error: e4 },
          { data: viewAthletes, error: e5 },
        ] = await Promise.all([
          supabase.from('athletes').select('id, created_at'),
          supabase.from('scouts').select('id'),
          supabase.from('scout_activity_log').select('id, created_at'),
          supabase.from('athlete_career').select('athlete_id, current_club'),
          supabase.from('v_scouting_athletes').select(
            'id, full_name, sport, country, points, avatar_url, profile_complete, position'
          ).limit(100),
        ]);
        [e1, e2, e3, e4, e5].forEach((e) => { if (e) throw e; });
        if (cancelled) return;

        const now       = new Date();
        const yesterday = new Date(now - 24 * 60 * 60 * 1000);
        const newIn24h  = (athletes || []).filter(
          (a) => new Date(a.created_at) > yesterday
        ).length;

        const adminMetrics = {
          totalAthletes:         athletes?.length || 0,
          athletesGrowthPercent: 0,
          activeScouts:          scouts?.length   || 0,
          scoutsPendingApproval: 0,
          monthlyRevenue:        0,
          revenueGrowthPercent:  0,
          newRegistrations24h:   newIn24h,
        };

        const newRegistrationsByDay  = groupByDayOfWeek(athletes || [], 'created_at', 'registros');
        const consultedByScoutsData  = groupByDayOfWeek(actLog   || [], 'created_at', 'consulted');
        const newAthletesByMonth     = groupByMonth(athletes || [], 'created_at');

        const totalV    = (viewAthletes || []).length || 1;
        const complete  = (viewAthletes || []).filter((a) => a.profile_complete).length;
        const pct       = Math.round((complete / totalV) * 100);
        const athletesDataCompletionByDay = DAYS_ES.map((d) => ({ day: d, percent: pct }));

        const sportCount = {};
        (viewAthletes || []).forEach((a) => {
          const s = a.sport || 'Otro';
          sportCount[s] = (sportCount[s] || 0) + 1;
        });
        const athletesBySport = Object.entries(sportCount)
          .map(([name, value], i) => ({ name, value, color: SPORT_COLORS[i % SPORT_COLORS.length] }))
          .sort((a, b) => b.value - a.value)
          .slice(0, 6);

        const careerMap = Object.fromEntries(
          (careers || []).map((c) => [c.athlete_id, c])
        );
        const pendingAthletes = (viewAthletes || []).slice(0, 5).map((a) => ({
          id:            a.id,
          name:          a.full_name,
          sport:         a.sport || '—',
          location:      a.country || '—',
          status:        a.profile_complete ? 'ACTIVO' : 'PENDIENTE',
          currentRating: a.points ?? 0,
          avatar:        a.avatar_url || DEFAULT_AVATAR,
        }));

        setData({
          adminMetrics,
          consultedByScoutsData,
          newRegistrationsByDay,
          newAthletesByMonth,
          athletesDataCompletionByDay,
          athletesBySport,
          pendingAthletes,
        });
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          console.error('[useDashboard]', err);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  return { data, loading, error };
}
