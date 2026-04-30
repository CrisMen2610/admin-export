import { useEffect, useMemo, useState } from 'react';
import {
  loadSportFieldConfig,
  saveSportFieldConfig,
  sportFieldConfigEventName,
} from '../config/sportFieldConfig';
import {
  ensureSportFieldDefaultsInSupabase,
  getTrainingFieldsBySportFromSupabase,
} from '../services/sportFieldSupabaseService';

export function useSportFieldConfig() {
  const [config, setConfig] = useState(() => loadSportFieldConfig());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reload = async () => {
    setLoading(true);
    setError(null);
    try {
      const remoteConfig = await ensureSportFieldDefaultsInSupabase();
      setConfig(remoteConfig);
      saveSportFieldConfig(remoteConfig);
    } catch (err) {
      setError(err.message || 'No se pudo cargar configuración de campos');
      setConfig(loadSportFieldConfig());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handle = () => setConfig(loadSportFieldConfig());
    window.addEventListener('storage', handle);
    window.addEventListener(sportFieldConfigEventName, handle);

    reload();

    return () => {
      window.removeEventListener('storage', handle);
      window.removeEventListener(sportFieldConfigEventName, handle);
    };
  }, []);

  const sports = useMemo(() => Object.keys(config?.sports || {}), [config]);

  const getFieldsBySport = async (sportName) => {
    return getTrainingFieldsBySportFromSupabase(sportName);
  };

  return { config, sports, loading, error, reload, getFieldsBySport };
}

