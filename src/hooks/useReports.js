import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { scoutingMetrics } from '../data/mockData';
import { talentExposureData as adminTalentExposureData } from '../data/adminMockData';

const DAYS_ES = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'];

export function useReports() {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        if (!isSupabaseConfigured) {
          if (!cancelled) {
            setData({
              scoutingMetrics,
              talentExposureData: adminTalentExposureData.map((row) => ({
                day: row.day,
                value: row.value,
              })),
            });
          }
          return;
        }

        const [
          { data: scouts,       error: e1 },
          { data: links,        error: e2 },
          { data: actLog,       error: e3 },
          { data: viewAthletes, error: e4 },
        ] = await Promise.all([
          supabase.from('scouts').select('id'),
          supabase.from('scout_athletes').select('scout_id, athlete_id'),
          supabase.from('scout_activity_log').select('id, created_at'),
          supabase.from('v_scouting_athletes').select(
            'id, country, position, points, profile_complete'
          ),
        ]);
        [e1, e2, e3, e4].forEach((e) => { if (e) throw e; });
        if (cancelled) return;

        const totalScouts     = (scouts || []).length;
        const scoutsWithLink  = new Set((links || []).map((l) => l.scout_id)).size;
        const playersScouted  = new Set((links || []).map((l) => l.athlete_id)).size;
        const potentialSignings = (viewAthletes || []).filter((a) => a.profile_complete).length;

        // Jugadores por región (country)
        const regionCount = {};
        (viewAthletes || []).forEach((a) => {
          const r = a.country || 'Otro';
          regionCount[r] = (regionCount[r] || 0) + 1;
        });
        const regions = Object.entries(regionCount)
          .map(([name, players]) => ({ name, players }))
          .sort((a, b) => b.players - a.players)
          .slice(0, 8);

        // Valoración media por posición
        const posMap = {};
        (viewAthletes || []).forEach((a) => {
          const p = a.position || 'Sin posición';
          if (!posMap[p]) posMap[p] = { total: 0, count: 0 };
          posMap[p].total += a.points || 0;
          posMap[p].count++;
        });
        const positions = Object.entries(posMap)
          .map(([position, { total, count }]) => ({
            position,
            avgRating: Math.round(total / count),
          }))
          .sort((a, b) => b.avgRating - a.avgRating)
          .slice(0, 8);

        // Exposición por día de la semana
        const dayBuckets = Object.fromEntries(DAYS_ES.map((d) => [d, 0]));
        (actLog || []).forEach((r) => {
          const label = DAYS_ES[new Date(r.created_at).getDay()];
          dayBuckets[label]++;
        });
        const talentExposureData = DAYS_ES.map((d) => ({ day: d, value: dayBuckets[d] }));

        setData({
          scoutingMetrics: {
            totalScouts,
            activeScouts: scoutsWithLink,
            playersScouted,
            potentialSignings,
            regions,
            positions,
          },
          talentExposureData,
        });
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          console.error('[useReports]', err);
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
