import React, { useState } from "react";
import {
  Users,
  Search,
  DollarSign,
  UserPlus,
  MoreVertical,
  Filter,
  Download,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { useDashboard } from "../../hooks/useDashboard";

const AdminDashboard = () => {
  const { data, loading, error } = useDashboard();
  const [dateRange, setDateRange] = useState("7");

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-400 animate-pulse">Cargando panel…</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-red-400 text-sm">Error al cargar datos: {error}</p>
      </div>
    );
  }

  const {
    adminMetrics,
    consultedByScoutsData,
    newRegistrationsByDay,
    newAthletesByMonth,
    athletesDataCompletionByDay,
    athletesBySport,
    pendingAthletes,
  } = data;

  const metricCards = [
    {
      title: "Total atletas",
      value: adminMetrics.totalAthletes.toLocaleString(),
      extra: `↑${adminMetrics.athletesGrowthPercent}% este mes`,
      extraPositive: true,
      icon: Users,
      iconBg: "bg-blue-500/20",
      iconColor: "text-blue-400",
    },
    {
      title: "Scouts activos",
      value: adminMetrics.activeScouts,
      extra: `${adminMetrics.scoutsPendingApproval} pendientes de aprobación`,
      icon: Search,
      iconBg: "bg-amber-500/20",
      iconColor: "text-amber-400",
    },
    {
      title: "Ingresos mensuales",
      value:
        adminMetrics.monthlyRevenue > 0
          ? `$${(adminMetrics.monthlyRevenue / 1000).toFixed(1)}k`
          : "—",
      extra: `↑ ${adminMetrics.revenueGrowthPercent}% vs anterior`,
      extraPositive: true,
      icon: DollarSign,
      iconBg: "bg-emerald-500/20",
      iconColor: "text-emerald-400",
    },
    {
      title: "Nuevos registros",
      value: adminMetrics.newRegistrations24h,
      extra: "Últimas 24 horas.",
      icon: UserPlus,
      iconBg: "bg-blue-500/20",
      iconColor: "text-blue-400",
    },
  ];

  const renderStars = (rating) => {
    const numericRating = Number.isFinite(Number(rating)) ? Number(rating) : 0;
    const normalizedRating = Math.max(0, Math.min(100, numericRating));
    const full = Math.floor(normalizedRating / 20);
    const half = (normalizedRating / 20) % 1 >= 0.5 ? 1 : 0;
    const empty = Math.max(0, 5 - full - half);
    return (
      <span className="flex gap-0.5 text-amber-400">
        {"★".repeat(full)}
        {half ? "½" : ""}
        {"☆".repeat(empty)}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Panel de Control</h1>
        <p className="text-gray-400 mt-1">
          Bienvenido de nuevo, Administrador. Aquí tienes el resumen de hoy.
        </p>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="bg-[#1e2228] rounded-xl border border-[#2d3239] p-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">
                    {card.title.toUpperCase()}
                  </p>
                  <p className="text-2xl font-bold text-white mt-1">
                    {card.value}
                  </p>
                  <p
                    className={`text-xs mt-1 ${
                      card.extraPositive ? "text-emerald-400" : "text-gray-500"
                    }`}
                  >
                    {card.extra}
                  </p>
                </div>
                <div
                  className={`p-2.5 rounded-lg ${card.iconBg} ${card.iconColor}`}
                >
                  <Icon size={22} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Exposición de talento + Consultados por cazatalentos */}
        <div className="lg:col-span-2 bg-[#1e2228] rounded-xl border border-[#2d3239] p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">
              Exposición de Talento
            </h3>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-[#252930] border border-[#2d3239] rounded-lg text-gray-300 text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            >
              <option value="7">Últimos 7 días</option>
              <option value="14">Últimos 14 días</option>
              <option value="30">Últimos 30 días</option>
            </select>
          </div>
          <h4 className="text-sm font-medium text-gray-300 mb-2">
            Consultados por cazatalentos
          </h4>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={consultedByScoutsData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <XAxis dataKey="day" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e2228",
                    border: "1px solid #2d3239",
                    borderRadius: "8px",
                  }}
                  formatter={(value) => [value, "Consultados"]}
                />
                <Bar
                  dataKey="consulted"
                  fill="#f59e0b"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={36}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <h4 className="text-sm font-medium text-gray-300 mb-2 mt-4">
            Nuevos registros por día
          </h4>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={newRegistrationsByDay}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#2d3239" />
                <XAxis dataKey="day" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e2228",
                    border: "1px solid #2d3239",
                    borderRadius: "8px",
                  }}
                  formatter={(value) => [value, "Registros"]}
                />
                <Line
                  type="monotone"
                  dataKey="registros"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: "#3b82f6", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribución por deporte */}
        <div className="bg-[#1e2228] rounded-xl border border-[#2d3239] p-5">
          <h3 className="text-lg font-semibold text-white mb-4">
            Atletas por deporte
          </h3>
          <div className="h-64 flex items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={athletesBySport}
                  cx="50%"
                  cy="50%"
                  innerRadius={56}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  nameKey="name"
                >
                  {athletesBySport.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e2228",
                    border: "1px solid #2d3239",
                    borderRadius: "8px",
                  }}
                  formatter={(value) => [value.toLocaleString(), "atletas"]}
                />
                <Legend
                  formatter={(name) => (
                    <span className="text-gray-300 text-sm">{name}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-gray-500 text-center mt-1">
            Total{" "}
            {athletesBySport.reduce((s, d) => s + d.value, 0).toLocaleString()}{" "}
            atletas
          </p>
        </div>
      </div>

      {/* Atletas pendientes de revisión */}
      <div className="bg-[#1e2228] rounded-xl border border-[#2d3239] overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-[#2d3239]">
          <h3 className="text-lg font-semibold text-white">
            Atletas Pendientes de Revisión
          </h3>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#2d3239] text-gray-300 text-sm hover:bg-[#252930]">
              <Filter size={16} />
              Filtrar
            </button>
            <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-500 text-white text-sm font-medium hover:bg-amber-600">
              <Download size={16} />
              Exportar CSV
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-500 uppercase border-b border-[#2d3239]">
                <th className="py-3 px-5 font-medium">Atleta</th>
                <th className="py-3 px-5 font-medium">Deporte</th>
                <th className="py-3 px-5 font-medium">Ubicación</th>
                <th className="py-3 px-5 font-medium">Estado</th>
                <th className="py-3 px-5 font-medium">Valoración</th>
                <th className="py-3 px-5 font-medium w-16">Acción</th>
              </tr>
            </thead>
            <tbody>
              {pendingAthletes.map((athlete) => (
                <tr
                  key={athlete.id}
                  className="border-b border-[#2d3239] hover:bg-[#252930]/50 transition-colors"
                >
                  <td className="py-3 px-5">
                    <div className="flex items-center gap-3">
                      <img
                        src={athlete.avatar}
                        alt=""
                        className="w-9 h-9 rounded-full object-cover"
                      />
                      <span className="font-medium text-white">
                        {athlete.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-5 text-gray-300">{athlete.sport}</td>
                  <td className="py-3 px-5 text-gray-400">
                    {athlete.location}
                  </td>
                  <td className="py-3 px-5">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                        athlete.status === "PENDIENTE"
                          ? "bg-amber-500/20 text-amber-400"
                          : "bg-emerald-500/20 text-emerald-400"
                      }`}
                    >
                      {athlete.status}
                    </span>
                  </td>
                  <td className="py-3 px-5">
                    {renderStars(athlete.currentRating)}
                  </td>
                  <td className="py-3 px-5">
                    <button className="p-1.5 rounded-lg text-gray-400 hover:bg-[#2d3239] hover:text-white">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Segunda fila: Nuevos atletas por mes + % datos completados */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#1e2228] rounded-xl border border-[#2d3239] p-5">
          <h3 className="text-lg font-semibold text-white mb-4">
            Nuevos atletas por mes
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={newAthletesByMonth}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e2228",
                    border: "1px solid #2d3239",
                    borderRadius: "8px",
                  }}
                  formatter={(value) => [value, "Nuevos atletas"]}
                />
                <Bar
                  dataKey="atletas"
                  fill="#22c55e"
                  name="Nuevos atletas"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-[#1e2228] rounded-xl border border-[#2d3239] p-5">
          <h3 className="text-lg font-semibold text-white mb-4">
            % atletas con datos completados por día
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={athletesDataCompletionByDay}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#2d3239" />
                <XAxis dataKey="day" stroke="#6b7280" fontSize={12} />
                <YAxis
                  stroke="#6b7280"
                  fontSize={12}
                  domain={[0, 100]}
                  tickFormatter={(v) => `${v}%`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e2228",
                    border: "1px solid #2d3239",
                    borderRadius: "8px",
                  }}
                  formatter={(value) => [`${value}%`, "Completado"]}
                />
                <Line
                  type="monotone"
                  dataKey="percent"
                  stroke="#22c55e"
                  strokeWidth={2}
                  dot={{ fill: "#22c55e", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
