const STORAGE_KEY = 'athletain:sportFieldConfig:v1';

export const sportFieldConfigEventName = 'sportFieldConfigUpdated';

export function getDefaultSportFieldConfig() {
  return {
    version: 1,
    sports: {
      Natación: {
        trainingFields: [
          { id: 'velocidad50m', title: 'Velocidad 50m', subtitle: 'Sprint de velocidad', unit: 'Seg', inputType: 'number', required: false },
          { id: 'sprint25m', title: 'Sprint 25m', subtitle: 'Velocidad explosiva', unit: 'Seg', inputType: 'number', required: false },
          { id: 'resistencia12min', title: 'Resistencia 12min', subtitle: 'Test de Cooper acuático', unit: 'Metros', inputType: 'number', required: false },
          { id: 'seriesLargas', title: 'Series largas', subtitle: 'Resistencia en series', unit: 'Min', inputType: 'number', required: false },
          { id: 'salidaViraje', title: 'Salida/Viraje', subtitle: 'Técnica de salida y viraje', unit: 'Metros', inputType: 'number', required: false },
          { id: 'ralliesBrazadas', title: 'Rallies de brazadas', subtitle: 'Consistencia en brazadas', unit: 'Min', inputType: 'number', required: false },
        ],
      },
      Ciclismo: {
        trainingFields: [
          { id: 'velocidadMaxima', title: 'Velocidad Máxima', subtitle: 'Velocidad pico alcanzada', unit: 'km/h', inputType: 'number', required: false },
          { id: 'potenciaPromedio', title: 'Potencia Promedio', subtitle: 'Potencia media en entrenamiento', unit: 'W', inputType: 'number', required: false },
          { id: 'distanciaRecorrida', title: 'Distancia Recorrida', subtitle: 'Distancia total del entrenamiento', unit: 'km', inputType: 'number', required: false },
          { id: 'tiempoTotal', title: 'Tiempo Total', subtitle: 'Duración del entrenamiento', unit: 'Min', inputType: 'number', required: false },
          { id: 'cadenciaPromedio', title: 'Cadencia Promedio', subtitle: 'RPM promedio', unit: 'RPM', inputType: 'number', required: false },
          { id: 'elevacionGanada', title: 'Elevación Ganada', subtitle: 'Desnivel acumulado', unit: 'm', inputType: 'number', required: false },
        ],
      },
      Fútbol: {
        trainingFields: [
          { id: 'velocidadSprint', title: 'Velocidad Sprint', subtitle: 'Velocidad máxima en sprint', unit: 'km/h', inputType: 'number', required: false },
          { id: 'distanciaRecorrida', title: 'Distancia Recorrida', subtitle: 'Distancia total en partido', unit: 'km', inputType: 'number', required: false },
          { id: 'sprintsRealizados', title: 'Sprints Realizados', subtitle: 'Número de sprints', unit: 'unidades', inputType: 'number', required: false },
          { id: 'tiempoActivo', title: 'Tiempo Activo', subtitle: 'Tiempo en movimiento', unit: 'Min', inputType: 'number', required: false },
          { id: 'aceleraciones', title: 'Aceleraciones', subtitle: 'Número de aceleraciones', unit: 'unidades', inputType: 'number', required: false },
          { id: 'pasesCompletados', title: 'Pases Completados', subtitle: 'Precisión de pases', unit: '%', inputType: 'number', required: false },
        ],
      },
      Atletismo: {
        trainingFields: [
          { id: 'tiempo100m', title: '100m', subtitle: 'Tiempo en 100 metros', unit: 'Seg', inputType: 'number', required: false },
          { id: 'tiempo400m', title: '400m', subtitle: 'Tiempo en 400 metros', unit: 'Seg', inputType: 'number', required: false },
          { id: 'tiempo1500m', title: '1500m', subtitle: 'Tiempo en 1500 metros', unit: 'Min', inputType: 'number', required: false },
          { id: 'saltoLongitud', title: 'Salto de Longitud', subtitle: 'Distancia alcanzada', unit: 'm', inputType: 'number', required: false },
          { id: 'lanzamientoPeso', title: 'Lanzamiento de Peso', subtitle: 'Distancia alcanzada', unit: 'm', inputType: 'number', required: false },
          { id: 'resistenciaVO2', title: 'VO2 Máximo', subtitle: 'Consumo máximo de oxígeno', unit: 'ml/kg/min', inputType: 'number', required: false },
        ],
      },
      Baloncesto: {
        trainingFields: [
          { id: 'tirosLibres', title: 'Tiros Libres', subtitle: 'Porcentaje de acierto', unit: '%', inputType: 'number', required: false },
          { id: 'tiros3Puntos', title: 'Tiros de 3 Puntos', subtitle: 'Porcentaje de acierto', unit: '%', inputType: 'number', required: false },
          { id: 'rebotes', title: 'Rebotes', subtitle: 'Rebotes capturados', unit: 'unidades', inputType: 'number', required: false },
          { id: 'asistencias', title: 'Asistencias', subtitle: 'Número de asistencias', unit: 'unidades', inputType: 'number', required: false },
          { id: 'robos', title: 'Robos', subtitle: 'Robos de balón', unit: 'unidades', inputType: 'number', required: false },
          { id: 'tiempoJugado', title: 'Tiempo Jugado', subtitle: 'Minutos en cancha', unit: 'Min', inputType: 'number', required: false },
        ],
      },
      Tenis: {
        trainingFields: [
          { id: 'velocidadServicio', title: 'Velocidad de Servicio', subtitle: 'Velocidad máxima del servicio', unit: 'km/h', inputType: 'number', required: false },
          { id: 'aces', title: 'Aces', subtitle: 'Número de aces', unit: 'unidades', inputType: 'number', required: false },
          { id: 'winners', title: 'Winners', subtitle: 'Golpes ganadores', unit: 'unidades', inputType: 'number', required: false },
          { id: 'erroresNoForzados', title: 'Errores No Forzados', subtitle: 'Errores cometidos', unit: 'unidades', inputType: 'number', required: false },
          { id: 'puntosGanados', title: 'Puntos Ganados', subtitle: 'Porcentaje de puntos ganados', unit: '%', inputType: 'number', required: false },
          { id: 'tiempoPartido', title: 'Tiempo de Partido', subtitle: 'Duración del partido', unit: 'Min', inputType: 'number', required: false },
        ],
      },
      Voleibol: {
        trainingFields: [
          { id: 'ataquesExitosos', title: 'Ataques Exitosos', subtitle: 'Porcentaje de ataques exitosos', unit: '%', inputType: 'number', required: false },
          { id: 'bloqueos', title: 'Bloqueos', subtitle: 'Número de bloqueos', unit: 'unidades', inputType: 'number', required: false },
          { id: 'saques', title: 'Saques', subtitle: 'Porcentaje de saques exitosos', unit: '%', inputType: 'number', required: false },
          { id: 'defensas', title: 'Defensas', subtitle: 'Número de defensas exitosas', unit: 'unidades', inputType: 'number', required: false },
          { id: 'alturaSalto', title: 'Altura de Salto', subtitle: 'Altura máxima alcanzada', unit: 'cm', inputType: 'number', required: false },
          { id: 'setsGanados', title: 'Sets Ganados', subtitle: 'Número de sets ganados', unit: 'unidades', inputType: 'number', required: false },
        ],
      },
      Rugby: {
        trainingFields: [
          { id: 'placajes', title: 'Placajes', subtitle: 'Número de placajes exitosos', unit: 'unidades', inputType: 'number', required: false },
          { id: 'metrosAvanzados', title: 'Metros Avanzados', subtitle: 'Distancia con balón', unit: 'm', inputType: 'number', required: false },
          { id: 'pases', title: 'Pases', subtitle: 'Número de pases completados', unit: 'unidades', inputType: 'number', required: false },
          { id: 'conversiones', title: 'Conversiones', subtitle: 'Porcentaje de conversiones', unit: '%', inputType: 'number', required: false },
          { id: 'lineouts', title: 'Lineouts', subtitle: 'Lineouts ganados', unit: 'unidades', inputType: 'number', required: false },
          { id: 'tiempoJugado', title: 'Tiempo Jugado', subtitle: 'Minutos en campo', unit: 'Min', inputType: 'number', required: false },
        ],
      },
      Boxeo: {
        trainingFields: [
          { id: 'golpesConectados', title: 'Golpes Conectados', subtitle: 'Número de golpes efectivos', unit: 'unidades', inputType: 'number', required: false },
          { id: 'precisionGolpes', title: 'Precisión de Golpes', subtitle: 'Porcentaje de precisión', unit: '%', inputType: 'number', required: false },
          { id: 'roundsGanados', title: 'Rounds Ganados', subtitle: 'Número de rounds ganados', unit: 'unidades', inputType: 'number', required: false },
          { id: 'defensasExitosas', title: 'Defensas Exitosas', subtitle: 'Número de defensas', unit: 'unidades', inputType: 'number', required: false },
          { id: 'potenciaPromedio', title: 'Potencia Promedio', subtitle: 'Potencia media de golpes', unit: 'kg', inputType: 'number', required: false },
          { id: 'tiempoEntrenamiento', title: 'Tiempo de Entrenamiento', subtitle: 'Duración del entrenamiento', unit: 'Min', inputType: 'number', required: false },
        ],
      },
      Triatlón: {
        trainingFields: [
          { id: 'tiempoNatacion', title: 'Tiempo Natación', subtitle: 'Tiempo en segmento de natación', unit: 'Min', inputType: 'number', required: false },
          { id: 'tiempoCiclismo', title: 'Tiempo Ciclismo', subtitle: 'Tiempo en segmento de ciclismo', unit: 'Min', inputType: 'number', required: false },
          { id: 'tiempoCarrera', title: 'Tiempo Carrera', subtitle: 'Tiempo en segmento de carrera', unit: 'Min', inputType: 'number', required: false },
          { id: 'tiempoTransicion', title: 'Tiempo Transición', subtitle: 'Tiempo total en transiciones', unit: 'Seg', inputType: 'number', required: false },
          { id: 'velocidadPromedio', title: 'Velocidad Promedio', subtitle: 'Velocidad media total', unit: 'km/h', inputType: 'number', required: false },
          { id: 'tiempoTotal', title: 'Tiempo Total', subtitle: 'Tiempo total de competencia', unit: 'Min', inputType: 'number', required: false },
        ],
      },
      Crossfit: {
        trainingFields: [
          { id: 'rmSentadilla', title: 'RM Sentadilla', subtitle: 'Repetición máxima en sentadilla', unit: 'kg', inputType: 'number', required: false },
          { id: 'rmPressBanca', title: 'RM Press Banca', subtitle: 'Repetición máxima en press banca', unit: 'kg', inputType: 'number', required: false },
          { id: 'rmPesoMuerto', title: 'RM Peso Muerto', subtitle: 'Repetición máxima en peso muerto', unit: 'kg', inputType: 'number', required: false },
          { id: 'tiempoFran', title: 'Tiempo Fran', subtitle: 'Tiempo en WOD Fran', unit: 'Min', inputType: 'number', required: false },
          { id: 'tiempoMurph', title: 'Tiempo Murph', subtitle: 'Tiempo en WOD Murph', unit: 'Min', inputType: 'number', required: false },
          { id: 'caloriasQuemadas', title: 'Calorías Quemadas', subtitle: 'Calorías totales quemadas', unit: 'kcal', inputType: 'number', required: false },
        ],
      },
      Otro: {
        trainingFields: [
          { id: 'metrica1', title: 'Métrica 1', subtitle: 'Indicador personalizado 1', unit: 'unidades', inputType: 'text', required: false },
          { id: 'metrica2', title: 'Métrica 2', subtitle: 'Indicador personalizado 2', unit: 'unidades', inputType: 'text', required: false },
          { id: 'metrica3', title: 'Métrica 3', subtitle: 'Indicador personalizado 3', unit: 'unidades', inputType: 'text', required: false },
          { id: 'metrica4', title: 'Métrica 4', subtitle: 'Indicador personalizado 4', unit: 'unidades', inputType: 'text', required: false },
          { id: 'metrica5', title: 'Métrica 5', subtitle: 'Indicador personalizado 5', unit: 'unidades', inputType: 'text', required: false },
          { id: 'metrica6', title: 'Métrica 6', subtitle: 'Indicador personalizado 6', unit: 'unidades', inputType: 'text', required: false },
        ],
      },
    },
  };
}

function safeParse(json) {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function loadSportFieldConfig() {
  if (typeof window === 'undefined') return getDefaultSportFieldConfig();
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return getDefaultSportFieldConfig();
  const parsed = safeParse(raw);
  if (!parsed || typeof parsed !== 'object') return getDefaultSportFieldConfig();
  if (!parsed.sports || typeof parsed.sports !== 'object') return getDefaultSportFieldConfig();
  return parsed;
}

export function saveSportFieldConfig(config) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  // storage event no se dispara en el mismo tab, por eso disparamos evento propio
  window.dispatchEvent(new Event(sportFieldConfigEventName));
}

export function resetSportFieldConfig() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event(sportFieldConfigEventName));
}

