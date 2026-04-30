// Datos mock para el panel de administración

export const adminMetrics = {
  totalAthletes: 1284,
  athletesGrowthPercent: 12,
  activeScouts: 156,
  scoutsPendingApproval: 4,
  monthlyRevenue: 24500,
  revenueGrowthPercent: 8,
  newRegistrations24h: 42,
};

export const talentExposureData = [
  { day: 'LUN', value: 124, fullDay: 'Lunes' },
  { day: 'MAR', value: 189, fullDay: 'Martes' },
  { day: 'MIÉ', value: 156, fullDay: 'Miércoles' },
  { day: 'JUE', value: 203, fullDay: 'Jueves' },
  { day: 'VIE', value: 267, fullDay: 'Viernes' },
  { day: 'SÁB', value: 198, fullDay: 'Sábado' },
  { day: 'DOM', value: 145, fullDay: 'Domingo' },
];

// Consultados por cazatalentos (scouts) por día
export const consultedByScoutsData = [
  { day: 'LUN', consulted: 89, fullDay: 'Lunes' },
  { day: 'MAR', consulted: 112, fullDay: 'Martes' },
  { day: 'MIÉ', consulted: 98, fullDay: 'Miércoles' },
  { day: 'JUE', consulted: 145, fullDay: 'Jueves' },
  { day: 'VIE', consulted: 178, fullDay: 'Viernes' },
  { day: 'SÁB', consulted: 134, fullDay: 'Sábado' },
  { day: 'DOM', consulted: 87, fullDay: 'Domingo' },
];

// % de atletas que han completado sus datos por día
export const athletesDataCompletionByDay = [
  { day: 'LUN', percent: 42, fullDay: 'Lunes' },
  { day: 'MAR', percent: 48, fullDay: 'Martes' },
  { day: 'MIÉ', percent: 51, fullDay: 'Miércoles' },
  { day: 'JUE', percent: 55, fullDay: 'Jueves' },
  { day: 'VIE', percent: 62, fullDay: 'Viernes' },
  { day: 'SÁB', percent: 58, fullDay: 'Sábado' },
  { day: 'DOM', percent: 65, fullDay: 'Domingo' },
];

// Distribución de atletas por deporte (para métrica en dashboard admin)
export const athletesBySport = [
  { name: 'Fútbol', value: 684, color: '#3b82f6' },
  { name: 'Baloncesto', value: 312, color: '#f59e0b' },
  { name: 'Tenis', value: 154, color: '#22c55e' },
  { name: 'Atletismo', value: 134, color: '#8b5cf6' },
];

// Atletas con estado para revisión (combinamos talentPlayers con estado admin)
export const getPendingAthletes = (talentPlayers) =>
  talentPlayers.slice(0, 5).map((p, i) => ({
    ...p,
    status: i % 3 === 0 ? 'PENDIENTE' : 'ACTIVO',
    location: p.nationality === 'España' ? 'Valencia, ES' : p.nationality === 'Argentina' ? 'Buenos Aires, AR' : p.club?.split(' ')[0] + ', ' + (p.nationality?.slice(0, 2) || 'ES'),
  }));

// Nuevos registros de atletas por día (últimos 7 días)
export const newRegistrationsByDay = [
  { day: 'LUN', registros: 18, fullDay: 'Lunes' },
  { day: 'MAR', registros: 24, fullDay: 'Martes' },
  { day: 'MIÉ', registros: 21, fullDay: 'Miércoles' },
  { day: 'JUE', registros: 31, fullDay: 'Jueves' },
  { day: 'VIE', registros: 28, fullDay: 'Viernes' },
  { day: 'SÁB', registros: 19, fullDay: 'Sábado' },
  { day: 'DOM', registros: 15, fullDay: 'Domingo' },
];

// Nuevos atletas registrados por mes (últimos 6 meses)
export const newAthletesByMonth = [
  { month: 'Ene', atletas: 98 },
  { month: 'Feb', atletas: 112 },
  { month: 'Mar', atletas: 134 },
  { month: 'Abr', atletas: 145 },
  { month: 'May', atletas: 158 },
  { month: 'Jun', atletas: 167 },
];

