import { supabase } from '../lib/supabase';
import { getDefaultSportFieldConfig } from '../config/sportFieldConfig';

function normalizeConfig(input) {
  const cfg = input && typeof input === 'object' ? input : getDefaultSportFieldConfig();
  const sports = cfg.sports && typeof cfg.sports === 'object' ? cfg.sports : {};
  const other = sports.Otro && typeof sports.Otro === 'object' ? sports.Otro : { trainingFields: [] };
  const trainingFields = Array.isArray(other.trainingFields) ? other.trainingFields : [];

  return {
    ...cfg,
    version: 1,
    sports: {
      ...sports,
      Otro: {
        ...other,
        trainingFields,
      },
    },
  };
}

function mapRowsToConfig(sportsRows, fieldRows) {
  const sports = {};

  (sportsRows || []).forEach((sport) => {
    sports[sport.name] = { trainingFields: [] };
  });

  (fieldRows || []).forEach((field) => {
    const sportName = field.sport_field_sports?.name;
    if (!sportName) return;
    if (!sports[sportName]) {
      sports[sportName] = { trainingFields: [] };
    }
    sports[sportName].trainingFields.push({
      id: field.field_key,
      title: field.title || '',
      subtitle: field.subtitle || '',
      unit: field.unit || '',
      inputType: field.input_type || 'text',
      required: Boolean(field.required),
    });
  });

  Object.values(sports).forEach((sportCfg) => {
    sportCfg.trainingFields = sportCfg.trainingFields || [];
  });

  return normalizeConfig({ version: 1, sports });
}

function mergeDefaultsIntoConfig(existingConfig, defaultConfig) {
  const existing = normalizeConfig(existingConfig);
  const defaults = normalizeConfig(defaultConfig);

  const next = {
    ...existing,
    sports: { ...(existing.sports || {}) },
  };

  const sportNames = Object.keys(defaults.sports || {});
  sportNames.forEach((sportName) => {
    const existingSport = next.sports[sportName] || { trainingFields: [] };
    const existingFields = Array.isArray(existingSport.trainingFields)
      ? existingSport.trainingFields
      : [];

    const defaultFields = Array.isArray(defaults.sports[sportName]?.trainingFields)
      ? defaults.sports[sportName].trainingFields
      : [];

    const fieldById = new Map(existingFields.map((field) => [field.id, field]));

    defaultFields.forEach((defaultField) => {
      if (!fieldById.has(defaultField.id)) {
        existingFields.push({ ...defaultField });
      }
    });

    next.sports[sportName] = {
      ...existingSport,
      trainingFields: existingFields,
    };
  });

  return normalizeConfig(next);
}

export async function loadSportFieldConfigFromSupabase() {
  const { data: sportsRows, error: sportsError } = await supabase
    .from('sport_field_sports')
    .select('id,name,is_active')
    .eq('is_active', true)
    .order('name', { ascending: true });

  if (sportsError) {
    throw new Error(sportsError.message || 'No se pudo cargar deportes');
  }

  if (!sportsRows || sportsRows.length === 0) {
    return null;
  }

  const sportIds = sportsRows.map((s) => s.id);

  const { data: fieldRows, error: fieldsError } = await supabase
    .from('sport_training_fields')
    .select('id, sport_id, field_key, title, subtitle, unit, input_type, required, sort_order, sport_field_sports!inner(name)')
    .eq('is_active', true)
    .in('sport_id', sportIds)
    .order('sort_order', { ascending: true })
    .order('id', { ascending: true });

  if (fieldsError) {
    throw new Error(fieldsError.message || 'No se pudo cargar campos');
  }

  return mapRowsToConfig(sportsRows, fieldRows);
}

export async function saveSportFieldConfigToSupabase(inputConfig) {
  const config = normalizeConfig(inputConfig);
  const sportNames = Object.keys(config.sports || {});
  const now = new Date().toISOString();

  const { data: existingSports, error: existingSportsError } = await supabase
    .from('sport_field_sports')
    .select('id,name,is_active');

  if (existingSportsError) {
    throw new Error(existingSportsError.message || 'No se pudo leer deportes existentes');
  }

  const { error: upsertSportsError } = await supabase
    .from('sport_field_sports')
    .upsert(
      sportNames.map((name) => ({ name, is_active: true, updated_at: now })),
      { onConflict: 'name' }
    );

  if (upsertSportsError) {
    throw new Error(upsertSportsError.message || 'No se pudieron guardar deportes');
  }

  const missingSports = (existingSports || [])
    .filter((sport) => sport.is_active && !sportNames.includes(sport.name) && sport.name !== 'Otro')
    .map((sport) => sport.id);

  if (missingSports.length > 0) {
    const { error: disableSportsError } = await supabase
      .from('sport_field_sports')
      .update({ is_active: false, updated_at: now })
      .in('id', missingSports);

    if (disableSportsError) {
      throw new Error(disableSportsError.message || 'No se pudieron desactivar deportes eliminados');
    }
  }

  const { data: activeSports, error: activeSportsError } = await supabase
    .from('sport_field_sports')
    .select('id,name')
    .in('name', sportNames);

  if (activeSportsError) {
    throw new Error(activeSportsError.message || 'No se pudieron mapear deportes activos');
  }

  const sportByName = Object.fromEntries((activeSports || []).map((sport) => [sport.name, sport]));

  for (const sportName of sportNames) {
    const sport = sportByName[sportName];
    if (!sport) continue;

    const fields = Array.isArray(config.sports[sportName]?.trainingFields)
      ? config.sports[sportName].trainingFields
      : [];

    const prepared = fields.map((field, index) => ({
      sport_id: sport.id,
      field_key: field.id,
      title: field.title || '',
      subtitle: field.subtitle || '',
      unit: field.unit || '',
      input_type: field.inputType || 'text',
      required: Boolean(field.required),
      sort_order: index,
      is_active: true,
      updated_at: now,
    }));

    if (prepared.length > 0) {
      const { error: upsertFieldsError } = await supabase
        .from('sport_training_fields')
        .upsert(prepared, { onConflict: 'sport_id,field_key' });

      if (upsertFieldsError) {
        throw new Error(upsertFieldsError.message || `No se pudieron guardar campos para ${sportName}`);
      }
    }

    const { data: existingFields, error: existingFieldsError } = await supabase
      .from('sport_training_fields')
      .select('id,field_key')
      .eq('sport_id', sport.id)
      .eq('is_active', true);

    if (existingFieldsError) {
      throw new Error(existingFieldsError.message || `No se pudieron leer campos de ${sportName}`);
    }

    const keepIds = new Set(fields.map((field) => field.id));
    const toDisableIds = (existingFields || [])
      .filter((field) => !keepIds.has(field.field_key))
      .map((field) => field.id);

    if (toDisableIds.length > 0) {
      const { error: disableFieldsError } = await supabase
        .from('sport_training_fields')
        .update({ is_active: false, updated_at: now })
        .in('id', toDisableIds);

      if (disableFieldsError) {
        throw new Error(disableFieldsError.message || `No se pudieron desactivar campos de ${sportName}`);
      }
    }
  }

  const refreshed = await loadSportFieldConfigFromSupabase();
  return normalizeConfig(refreshed || config);
}

export async function ensureSportFieldDefaultsInSupabase() {
  const existing = await loadSportFieldConfigFromSupabase();
  const defaults = normalizeConfig(getDefaultSportFieldConfig());

  if (!existing) {
    await saveSportFieldConfigToSupabase(defaults);
    return defaults;
  }

  const merged = mergeDefaultsIntoConfig(existing, defaults);
  const hasChanges = JSON.stringify(merged) !== JSON.stringify(normalizeConfig(existing));

  if (hasChanges) {
    const persisted = await saveSportFieldConfigToSupabase(merged);
    return normalizeConfig(persisted);
  }

  return normalizeConfig(existing);
}

export async function getTrainingFieldsBySportFromSupabase(sportName) {
  const targetSport = String(sportName || '').trim();
  if (!targetSport) return [];

  const { data: fieldsForSport, error: primaryError } = await supabase
    .from('v_sport_training_fields')
    .select('id,title,subtitle,unit,inputType,required,sort_order')
    .eq('sport', targetSport)
    .order('sort_order', { ascending: true });

  if (primaryError) {
    throw new Error(primaryError.message || 'No se pudieron cargar campos del deporte');
  }

  if (fieldsForSport && fieldsForSport.length > 0) {
    return fieldsForSport;
  }

  const { data: fallbackFields, error: fallbackError } = await supabase
    .from('v_sport_training_fields')
    .select('id,title,subtitle,unit,inputType,required,sort_order')
    .eq('sport', 'Otro')
    .order('sort_order', { ascending: true });

  if (fallbackError) {
    throw new Error(fallbackError.message || 'No se pudieron cargar campos fallback');
  }

  return fallbackFields || [];
}
