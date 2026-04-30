// Datos de ejemplo para el dashboard de fitness

export const userProfile = {
  name: "Mike",
  level: "Avanzado",
  points: 14750,
  weight: 75,
  height: 175,
  age: 29,
  sport: "Ciclismo",
  position: "Ciclista de Ruta",
  avatar: "https://images.unsplash.com/photo-1644492097455-d5f39f458fcd?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
};

export const heartRateData = {
  current: 110,
  average: 95,
  yesterday: 108,
  history: [
    { time: "00:00", value: 65 },
    { time: "04:00", value: 58 },
    { time: "08:00", value: 85 },
    { time: "12:00", value: 110 },
    { time: "16:00", value: 95 },
    { time: "20:00", value: 75 },
    { time: "24:00", value: 68 }
  ]
};

export const stepsData = {
  current: 1050,
  yesterday: 980,
  goal: 10000,
  history: [
    { day: "Lun", steps: 8500 },
    { day: "Mar", steps: 9200 },
    { day: "Mié", steps: 7800 },
    { day: "Jue", steps: 10500 },
    { day: "Vie", steps: 8900 },
    { day: "Sáb", steps: 12000 },
    { day: "Dom", steps: 6500 }
  ]
};

export const caloriesData = {
  consumed: 520,
  remaining: 480,
  goal: 1000,
  history: [
    { meal: "Desayuno", calories: 180, protein: 15, carbs: 20, fat: 8 },
    { meal: "Almuerzo", calories: 220, protein: 25, carbs: 30, fat: 12 },
    { meal: "Cena", calories: 120, protein: 18, carbs: 15, fat: 6 }
  ]
};

export const sleepData = {
  hours: 7.5,
  deepSleep: 2.2,
  efficiency: 85,
  history: [
    { day: "Lun", hours: 7.2, efficiency: 82 },
    { day: "Mar", hours: 8.1, efficiency: 88 },
    { day: "Mié", hours: 6.8, efficiency: 75 },
    { day: "Jue", hours: 7.5, efficiency: 85 },
    { day: "Vie", hours: 7.9, efficiency: 87 },
    { day: "Sáb", hours: 8.5, efficiency: 92 },
    { day: "Dom", hours: 7.0, efficiency: 78 }
  ]
};

export const injuryRiskData = {
  risk: 15,
  factors: [
    { factor: "Fatiga muscular", risk: 20 },
    { factor: "Recuperación", risk: 10 },
    { factor: "Técnica", risk: 15 },
    { factor: "Carga de trabajo", risk: 25 }
  ]
};

export const progressData = {
  goalCompletion: 75,
  cardio: { progress: 83, sets: 5, total: 6, type: "Sesión HIT" },
  strength: { progress: 80, sets: 4, total: 5, type: "Circuito de fuerza cuerpo completo" },
  flexibility: { progress: 75, sets: 3, total: 4, type: "Circuito de fuerza cuerpo completo" }
};

export const activityData = {
  dailyProgress: 82,
  calories: 150,
  history: [
    { date: "5 Ago", activity: 65 },
    { date: "6 Ago", activity: 78 },
    { date: "7 Ago", activity: 82 },
    { date: "8 Ago", activity: 91 },
    { date: "9 Ago", activity: 95 },
    { date: "10 Ago", activity: 88 },
    { date: "11 Ago", activity: 76 },
    { date: "12 Ago", activity: 85 },
    { date: "13 Ago", activity: 82 }
  ]
};

export const scheduleData = [
  {
    time: "6:30 AM",
    activity: "Cardio Matutino Explosivo",
    type: "Entrenamiento de Intervalos de Alta Intensidad (HIIT)",
    completed: false
  },
  {
    time: "12:00 PM",
    activity: "Circuito de Fuerza",
    type: "Entrenamiento de Fuerza",
    completed: false
  },
  {
    time: "1:30 PM",
    activity: "Cardio Matutino Explosivo",
    type: "Entrenamiento de Intervalos de Alta Intensidad (HIIT)",
    completed: false
  },
  {
    time: "4:30 PM",
    activity: "Cardio Matutino Explosivo",
    type: "Entrenamiento de Intervalos de Alta Intensidad (HIIT)",
    completed: false
  }
];

export const todayActivity = {
  distance: 5,
  distanceKm: 8,
  time: 50,
  steps: 10500,
  calories: 450,
  pace: 10,
  route: "Ruta del Parque"
};

export const mealPlan = [
  {
    meal: "Desayuno",
    name: "Proteína Potente",
    size: "Mediano",
    calories: 1800,
    image: "https://images.unsplash.com/photo-1494859802809-d069c3b71a8a?w=200&h=150&fit=crop"
  },
  {
    meal: "Almuerzo",
    name: "Energía Vegana",
    size: "Mediano",
    calories: 1500,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&h=150&fit=crop"
  }
];

export const recentActivity = [
  {
    time: "6:30 AM",
    activity: "Completado Cardio Matutino",
    type: "HIIT"
  }
];

export const calendarData = {
  month: "Agosto 2028",
  highlights: [
    { day: 13, type: "workout", color: "yellow" },
    { day: 22, type: "milestone", color: "blue" },
    { day: 25, type: "event", color: "blue" }
  ]
};

// Datos para CazaTalentos - Dashboard de Scouts
export const talentScouts = [
  {
    id: 1,
    name: "Carlos Rodríguez",
    position: "Scout Principal",
    region: "América Latina",
    activeScouts: 12,
    avatar: "https://images.unsplash.com/photo-1644492097455-d5f39f458fcd?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 2,
    name: "María González",
    position: "Scout Senior",
    region: "Europa",
    activeScouts: 8,
    avatar: "https://images.unsplash.com/photo-1644492097455-d5f39f458fcd?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 3,
    name: "David Silva",
    position: "Scout Junior",
    region: "África",
    activeScouts: 5,
    avatar: "https://images.unsplash.com/photo-1644492097455-d5f39f458fcd?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
];

export const talentPlayers = [
  {
    id: 1,
    name: "Diego Morales",
    age: 18,
    position: "Delantero",
    sport: "Fútbol",
    club: "Real Madrid Juvenil",
    nationality: "España",
    height: 182,
    weight: 75,
    potential: 92,
    currentRating: 78,
    avatar: "https://images.unsplash.com/photo-1644492097455-d5f39f458fcd?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    stats: {
      pace: 85,
      shooting: 78,
      passing: 72,
      dribbling: 88,
      defending: 45,
      physical: 76
    },
    performance: {
      maxSpeed: 32.5,
      acceleration: 8.2,
      endurance: 85,
      strength: 78,
      agility: 92,
      lastTestDate: "2024-01-15"
    },
    strengths: ["Velocidad", "Regate", "Finalización"],
    weaknesses: ["Defensa", "Juego aéreo"],
    scoutNotes: "Jugador con gran potencial ofensivo. Necesita mejorar en aspectos defensivos y juego de cabeza."
  },
  {
    id: 2,
    name: "Lucas Fernández",
    age: 19,
    position: "Centrocampista",
    sport: "Fútbol",
    club: "Manchester City U21",
    nationality: "Argentina",
    height: 175,
    weight: 70,
    potential: 89,
    currentRating: 82,
    avatar: "https://images.unsplash.com/photo-1644492097455-d5f39f458fcd?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    stats: {
      pace: 72,
      shooting: 75,
      passing: 88,
      dribbling: 82,
      defending: 78,
      physical: 70
    },
    performance: {
      maxSpeed: 28.8,
      acceleration: 7.5,
      endurance: 92,
      strength: 72,
      agility: 85,
      lastTestDate: "2024-01-12"
    },
    strengths: ["Pase", "Visión de juego", "Control de balón"],
    weaknesses: ["Velocidad", "Fuerza física"],
    scoutNotes: "Excelente vision de juego y capacidad de pase. Líder natural en el mediocampo."
  },
  {
    id: 3,
    name: "Santiago Herrera",
    age: 17,
    position: "Defensa",
    sport: "Fútbol",
    club: "Bayern Munich II",
    nationality: "Colombia",
    height: 188,
    weight: 82,
    potential: 94,
    currentRating: 75,
    avatar: "https://images.unsplash.com/photo-1644492097455-d5f39f458fcd?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    stats: {
      pace: 68,
      shooting: 45,
      passing: 72,
      dribbling: 58,
      defending: 88,
      physical: 85
    },
    performance: {
      maxSpeed: 26.2,
      acceleration: 6.8,
      endurance: 78,
      strength: 95,
      agility: 72,
      lastTestDate: "2024-01-18"
    },
    strengths: ["Marcaje", "Juego aéreo", "Liderazgo"],
    weaknesses: ["Velocidad", "Técnica ofensiva"],
    scoutNotes: "Defensa sólido con gran presencia física. Futuro líder de la zaga defensiva."
  },
  {
    id: 4,
    name: "Andrés Castro",
    age: 20,
    position: "Portero",
    sport: "Fútbol",
    club: "PSG U21",
    nationality: "México",
    height: 190,
    weight: 85,
    potential: 87,
    currentRating: 80,
    avatar: "https://images.unsplash.com/photo-1644492097455-d5f39f458fcd?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    stats: {
      pace: 45,
      shooting: 25,
      passing: 65,
      dribbling: 30,
      defending: 85,
      physical: 88
    },
    performance: {
      maxSpeed: 22.1,
      acceleration: 5.2,
      endurance: 82,
      strength: 88,
      agility: 78,
      lastTestDate: "2024-01-10"
    },
    strengths: ["Reflejos", "Juego aéreo", "Comunicación"],
    weaknesses: ["Juego con los pies", "Salidas"],
    scoutNotes: "Portero con excelentes reflejos y presencia en el área. Necesita mejorar el juego con los pies."
  },
  {
    id: 5,
    name: "Emma Johnson",
    age: 19,
    position: "Base",
    sport: "Baloncesto",
    club: "Duke Blue Devils",
    nationality: "Estados Unidos",
    height: 168,
    weight: 65,
    potential: 91,
    currentRating: 84,
    avatar: "https://images.unsplash.com/photo-1644492097455-d5f39f458fcd?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    stats: {
      pace: 88,
      shooting: 92,
      passing: 85,
      dribbling: 90,
      defending: 78,
      physical: 72
    },
    performance: {
      maxSpeed: 29.5,
      acceleration: 8.8,
      endurance: 88,
      strength: 68,
      agility: 95,
      lastTestDate: "2024-01-14"
    },
    strengths: ["Tiro exterior", "Velocidad", "Liderazgo"],
    weaknesses: ["Fuerza física", "Juego interior"],
    scoutNotes: "Base excepcional con gran capacidad de tiro y liderazgo natural en la cancha."
  },
  {
    id: 6,
    name: "Marcus Thompson",
    age: 18,
    position: "Pívot",
    sport: "Baloncesto",
    club: "Kentucky Wildcats",
    nationality: "Estados Unidos",
    height: 208,
    weight: 110,
    potential: 93,
    currentRating: 79,
    avatar: "https://images.unsplash.com/photo-1644492097455-d5f39f458fcd?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    stats: {
      pace: 65,
      shooting: 45,
      passing: 58,
      dribbling: 42,
      defending: 92,
      physical: 95
    },
    performance: {
      maxSpeed: 24.8,
      acceleration: 6.2,
      endurance: 75,
      strength: 98,
      agility: 68,
      lastTestDate: "2024-01-16"
    },
    strengths: ["Defensa", "Rebotes", "Presencia física"],
    weaknesses: ["Velocidad", "Tiro exterior"],
    scoutNotes: "Pívot dominante en la pintura con gran capacidad defensiva y de rebote."
  }
];

export const scoutingMetrics = {
  totalScouts: 25,
  activeScouts: 18,
  playersScouted: 156,
  potentialSignings: 23,
  regions: [
    { name: "América Latina", players: 45, scouts: 8 },
    { name: "Europa", players: 67, scouts: 12 },
    { name: "África", players: 23, scouts: 3 },
    { name: "Asia", players: 21, scouts: 2 }
  ],
  positions: [
    { position: "Delantero", count: 38, avgRating: 79.2 },
    { position: "Centrocampista", count: 42, avgRating: 81.5 },
    { position: "Defensa", count: 35, avgRating: 77.8 },
    { position: "Portero", count: 41, avgRating: 78.9 }
  ]
};
