import React, { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Save,
  Trash2,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  ListChecks,
} from "lucide-react";
import {
  getDefaultSportFieldConfig,
  loadSportFieldConfig,
  resetSportFieldConfig,
  saveSportFieldConfig,
} from "../../config/sportFieldConfig";
import {
  ensureSportFieldDefaultsInSupabase,
  saveSportFieldConfigToSupabase,
} from "../../services/sportFieldSupabaseService";

function normalizeConfig(input) {
  const cfg =
    input && typeof input === "object" ? input : getDefaultSportFieldConfig();
  const sports = cfg.sports && typeof cfg.sports === "object" ? cfg.sports : {};
  const other =
    sports.Otro && typeof sports.Otro === "object"
      ? sports.Otro
      : { trainingFields: [] };
  const trainingFields = Array.isArray(other.trainingFields)
    ? other.trainingFields
    : [];
  return {
    ...cfg,
    sports: {
      ...sports,
      Otro: {
        ...other,
        trainingFields,
      },
    },
  };
}

function slugifyId(input) {
  return String(input || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 32);
}

function moveItem(arr, fromIndex, toIndex) {
  const copy = [...arr];
  const [item] = copy.splice(fromIndex, 1);
  copy.splice(toIndex, 0, item);
  return copy;
}

const AdminSportFields = () => {
  const [config, setConfig] = useState(() =>
    normalizeConfig(loadSportFieldConfig()),
  );
  const sportNames = useMemo(() => Object.keys(config?.sports || {}), [config]);
  const [selectedSport, setSelectedSport] = useState(
    () => sportNames[0] || "Fútbol",
  );
  const [newSportName, setNewSportName] = useState("");
  const [dirty, setDirty] = useState(false);
  const [loadingConfig, setLoadingConfig] = useState(true);
  const [savingConfig, setSavingConfig] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    if (!sportNames.includes(selectedSport)) {
      setSelectedSport(sportNames[0] || "");
    }
  }, [sportNames, selectedSport]);

  useEffect(() => {
    let cancelled = false;

    async function loadFromSupabase() {
      setLoadingConfig(true);
      setStatusMessage("");
      try {
        const remoteConfig = await ensureSportFieldDefaultsInSupabase();
        if (cancelled) return;

        const normalized = normalizeConfig(remoteConfig);
        setConfig(normalized);
        setSelectedSport((prev) =>
          Object.keys(normalized.sports || {}).includes(prev)
            ? prev
            : Object.keys(normalized.sports || {})[0] || "",
        );
        saveSportFieldConfig(normalized);
      } catch (error) {
        if (cancelled) return;
        setStatusMessage(
          `No se pudo cargar desde Supabase: ${error.message}. Se usará el respaldo local.`,
        );
      } finally {
        if (!cancelled) setLoadingConfig(false);
      }
    }

    loadFromSupabase();
    return () => {
      cancelled = true;
    };
  }, []);

  const selectedTrainingFields =
    config?.sports?.[selectedSport]?.trainingFields || [];

  const updateSportTrainingFields = (fields) => {
    setConfig((prev) => ({
      ...normalizeConfig(prev),
      sports: {
        ...(prev?.sports || {}),
        [selectedSport]: {
          ...(prev?.sports?.[selectedSport] || {}),
          trainingFields: fields,
        },
      },
    }));
    setDirty(true);
  };

  const addSport = () => {
    const name = newSportName.trim();
    if (!name) return;
    setConfig((prev) => {
      const normalized = normalizeConfig(prev);
      const exists = Boolean(normalized?.sports?.[name]);
      if (exists) return prev;
      return {
        ...normalized,
        sports: {
          ...(normalized?.sports || {}),
          [name]: { trainingFields: [] },
        },
      };
    });
    setSelectedSport(name);
    setNewSportName("");
    setDirty(true);
  };

  const deleteSport = () => {
    if (!selectedSport) return;
    if (selectedSport === "Otro") return; // se usa como fallback
    setConfig((prev) => {
      const normalized = normalizeConfig(prev);
      const nextSports = { ...(normalized?.sports || {}) };
      delete nextSports[selectedSport];
      return { ...normalized, sports: nextSports };
    });
    setDirty(true);
  };

  const addField = () => {
    const base =
      slugifyId(`campo_${selectedTrainingFields.length + 1}`) ||
      `campo_${selectedTrainingFields.length + 1}`;
    let nextId = base;
    const existingIds = new Set(selectedTrainingFields.map((f) => f.id));
    let i = 2;
    while (existingIds.has(nextId)) {
      nextId = `${base}_${i}`;
      i += 1;
    }
    updateSportTrainingFields([
      ...selectedTrainingFields,
      {
        id: nextId,
        title: "Nuevo campo",
        subtitle: "",
        unit: "",
        inputType: "number",
        required: false,
      },
    ]);
  };

  const updateField = (index, patch) => {
    const updated = selectedTrainingFields.map((f, i) =>
      i === index ? { ...f, ...patch } : f,
    );
    updateSportTrainingFields(updated);
  };

  const deleteField = (index) => {
    updateSportTrainingFields(
      selectedTrainingFields.filter((_, i) => i !== index),
    );
  };

  const moveFieldUp = (index) => {
    if (index <= 0) return;
    updateSportTrainingFields(
      moveItem(selectedTrainingFields, index, index - 1),
    );
  };

  const moveFieldDown = (index) => {
    if (index >= selectedTrainingFields.length - 1) return;
    updateSportTrainingFields(
      moveItem(selectedTrainingFields, index, index + 1),
    );
  };

  const onSave = async () => {
    const normalized = normalizeConfig(config);
    setSavingConfig(true);
    setStatusMessage("");

    try {
      const persisted = await saveSportFieldConfigToSupabase(normalized);
      const safeConfig = normalizeConfig(persisted);
      setConfig(safeConfig);
      saveSportFieldConfig(safeConfig);
      setDirty(false);
      setStatusMessage("Cambios guardados en Supabase.");
    } catch (error) {
      setStatusMessage(`No se pudo guardar en Supabase: ${error.message}`);
    } finally {
      setSavingConfig(false);
    }
  };

  const onRestoreDefaults = async () => {
    const defaults = normalizeConfig(getDefaultSportFieldConfig());
    setSavingConfig(true);
    setStatusMessage("");

    try {
      const persisted = await saveSportFieldConfigToSupabase(defaults);
      const safeConfig = normalizeConfig(persisted);
      setConfig(safeConfig);
      setSelectedSport(Object.keys(safeConfig.sports || {})[0] || "");
      resetSportFieldConfig();
      saveSportFieldConfig(safeConfig);
      setDirty(false);
      setStatusMessage("Predeterminados restaurados y guardados en Supabase.");
    } catch (error) {
      setStatusMessage(
        `No se pudieron restaurar predeterminados: ${error.message}`,
      );
    } finally {
      setSavingConfig(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Campos por deporte</h1>
        <p className="text-gray-400 mt-1">
          Define qué datos se pedirán a los deportistas según su deporte. Estos
          campos se reflejan en el formulario de atletas.
        </p>
      </div>

      {loadingConfig ? (
        <div className="px-4 py-16 rounded-xl border border-[#2d3239] bg-[#1e2228] text-center text-gray-300">
          Cargando configuración de campos desde Supabase...
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Selector de deporte */}
          <div className="bg-[#1e2228] rounded-xl border border-[#2d3239] p-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <ListChecks size={20} className="text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Deportes</h3>
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Selecciona un deporte
              </label>
              <select
                value={selectedSport}
                onChange={(e) => setSelectedSport(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#252930] border border-[#2d3239] rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              >
                {sportNames.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-2">
              <input
                value={newSportName}
                onChange={(e) => setNewSportName(e.target.value)}
                placeholder="Nuevo deporte (ej: Pádel)"
                className="flex-1 px-4 py-2.5 bg-[#252930] border border-[#2d3239] rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              />
              <button
                type="button"
                onClick={addSport}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500 text-white font-medium hover:bg-amber-600"
              >
                <Plus size={18} />
                Añadir
              </button>
            </div>

            <button
              type="button"
              onClick={deleteSport}
              disabled={!selectedSport || selectedSport === "Otro"}
              className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg border border-[#2d3239] text-gray-300 hover:bg-[#252930] disabled:opacity-50 disabled:cursor-not-allowed"
              title={
                selectedSport === "Otro"
                  ? 'El deporte "Otro" funciona como fallback'
                  : "Eliminar deporte"
              }
            >
              <Trash2 size={18} />
              Eliminar deporte
            </button>
          </div>

          {/* Editor de campos */}
          <div className="xl:col-span-2 bg-[#1e2228] rounded-xl border border-[#2d3239] p-5">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Campos de entrenamiento{" "}
                  {selectedSport ? `— ${selectedSport}` : ""}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Consejo: usa IDs estables para no perder datos guardados por
                  el atleta.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={addField}
                  disabled={!selectedSport}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#2d3239] text-gray-200 hover:bg-[#252930] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus size={18} />
                  Añadir campo
                </button>
                <button
                  type="button"
                  onClick={onSave}
                  disabled={savingConfig || !dirty}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500 text-white font-medium hover:bg-amber-600"
                >
                  <Save size={18} />
                  {savingConfig ? "Guardando..." : "Guardar"}
                </button>
              </div>
            </div>

            {dirty && (
              <div className="mb-4 px-4 py-3 rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-200 text-sm">
                Hay cambios sin guardar.
              </div>
            )}

            <div className="space-y-3">
              {selectedTrainingFields.length === 0 ? (
                <div className="px-4 py-10 rounded-lg border border-[#2d3239] bg-[#252930]/40 text-center text-gray-400">
                  Este deporte no tiene campos aún. Añade uno para empezar.
                </div>
              ) : (
                selectedTrainingFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="rounded-xl border border-[#2d3239] bg-[#252930]/40 p-4"
                  >
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div className="text-sm text-gray-300">
                        <span className="font-medium text-white">ID:</span>{" "}
                        {field.id}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => moveFieldUp(index)}
                          className="p-2 rounded-lg border border-[#2d3239] text-gray-300 hover:bg-[#1e2228]"
                          title="Subir"
                        >
                          <ArrowUp size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveFieldDown(index)}
                          className="p-2 rounded-lg border border-[#2d3239] text-gray-300 hover:bg-[#1e2228]"
                          title="Bajar"
                        >
                          <ArrowDown size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteField(index)}
                          className="p-2 rounded-lg border border-[#2d3239] text-red-300 hover:bg-[#1e2228]"
                          title="Eliminar"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">
                          Título
                        </label>
                        <input
                          value={field.title || ""}
                          onChange={(e) =>
                            updateField(index, { title: e.target.value })
                          }
                          className="w-full px-3 py-2.5 bg-[#1e2228] border border-[#2d3239] rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">
                          Subtítulo
                        </label>
                        <input
                          value={field.subtitle || ""}
                          onChange={(e) =>
                            updateField(index, { subtitle: e.target.value })
                          }
                          className="w-full px-3 py-2.5 bg-[#1e2228] border border-[#2d3239] rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">
                          Unidad
                        </label>
                        <input
                          value={field.unit || ""}
                          onChange={(e) =>
                            updateField(index, { unit: e.target.value })
                          }
                          placeholder="Ej: km/h, %, Min"
                          className="w-full px-3 py-2.5 bg-[#1e2228] border border-[#2d3239] rounded-lg text-gray-200 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">
                            Tipo
                          </label>
                          <select
                            value={field.inputType || "text"}
                            onChange={(e) =>
                              updateField(index, { inputType: e.target.value })
                            }
                            className="w-full px-3 py-2.5 bg-[#1e2228] border border-[#2d3239] rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                          >
                            <option value="number">Número</option>
                            <option value="text">Texto</option>
                          </select>
                        </div>
                        <div className="flex items-end">
                          <label className="flex items-center gap-2 text-gray-300 text-sm cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={Boolean(field.required)}
                              onChange={(e) =>
                                updateField(index, {
                                  required: e.target.checked,
                                })
                              }
                              className="w-5 h-5 rounded border-[#2d3239] bg-[#1e2228] text-amber-500 focus:ring-amber-500/50"
                            />
                            Requerido
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-5 flex justify-between items-center gap-3 pt-4 border-t border-[#2d3239]">
              <button
                type="button"
                onClick={onRestoreDefaults}
                disabled={savingConfig}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#2d3239] text-gray-300 hover:bg-[#252930]"
              >
                <RotateCcw size={18} />
                Restaurar predeterminados
              </button>
              <div className="text-xs text-gray-500">
                Guardado persistente en Supabase con historial de campos por
                deporte.
              </div>
            </div>

            {statusMessage && (
              <div className="mt-3 text-xs text-gray-400">{statusMessage}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSportFields;
