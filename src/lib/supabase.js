import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
const missingSupabaseEnvMessage =
  'Faltan VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY en .env';
export const isSupabaseConfigured = Boolean(url && key);

function createDisabledQuery() {
  const result = {
    data: null,
    error: { message: missingSupabaseEnvMessage },
  };
  const query = {
    select: () => query,
    limit: () => query,
    eq: () => query,
    in: () => query,
    order: () => query,
    upsert: () => query,
    update: () => query,
    then: (onFulfilled, onRejected) => Promise.resolve(result).then(onFulfilled, onRejected),
    catch: (onRejected) => Promise.resolve(result).catch(onRejected),
    finally: (onFinally) => Promise.resolve(result).finally(onFinally),
  };
  return query;
}

if (!isSupabaseConfigured) {
  console.error(`[supabase] ${missingSupabaseEnvMessage}`);
}

export const supabase = isSupabaseConfigured
  ? createClient(url, key)
  : {
      from: () => createDisabledQuery(),
    };
