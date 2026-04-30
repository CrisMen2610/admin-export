import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useReports } from "../../hooks/useReports";

const COLORS = ["#3b82f6", "#f59e0b", "#22c55e", "#ef4444", "#8b5cf6"];

const AdminReports = () => {
  const { data, loading, error } = useReports();
  const [period, setPeriod] = useState("7");

  const tooltipStyle = {
    backgroundColor: "#1e2228",
    border: "1px solid #2d3239",
    borderRadius: "8px",
  };

  if (loading)
    return (
      <div className="py-20 text-center text-gray-400 animate-pulse">
        Cargando reportes…
      </div>
    );
  if (error)
    return (
      <div className="py-20 text-center text-red-400 text-sm">
        Error: {error}
      </div>
    );

  const { scoutingMetrics, talentExposureData } = data;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Reportes</h1>
          <p className="text-gray-400 mt-1">
            Análisis y métricas de la plataforma.
          </p>
        </div>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="px-4 py-2.5 bg-[#1e2228] border border-[#2d3239] rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
        >
          <option value="7">Últimos 7 días</option>
          <option value="30">Últimos 30 días</option>
          <option value="90">Últimos 90 días</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#1e2228] rounded-xl border border-[#2d3239] p-5">
          <h3 className="text-lg font-semibold text-white mb-4">
            Jugadores por región
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={scoutingMetrics.regions}
                  dataKey="players"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, players }) => `${name}: ${players}`}
                >
                  {scoutingMetrics.regions.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#1e2228] rounded-xl border border-[#2d3239] p-5">
          <h3 className="text-lg font-semibold text-white mb-4">
            Valoración media por posición
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={scoutingMetrics.positions}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <XAxis
                  dataKey="position"
                  stroke="#6b7280"
                  fontSize={11}
                  tickFormatter={(v) => v.slice(0, 8)}
                />
                <YAxis stroke="#6b7280" fontSize={12} domain={[0, 100]} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar
                  dataKey="avgRating"
                  fill="#f59e0b"
                  name="Valoración media"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-[#1e2228] rounded-xl border border-[#2d3239] p-5">
        <h3 className="text-lg font-semibold text-white mb-4">
          Exposición de talento (vistas por día)
        </h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={talentExposureData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <XAxis dataKey="day" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar
                dataKey="value"
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
                maxBarSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-[#1e2228] rounded-xl border border-[#2d3239] p-5">
        <h3 className="text-lg font-semibold text-white mb-4">
          Resumen de métricas
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-[#252930]">
            <p className="text-gray-500 text-sm">Total scouts</p>
            <p className="text-xl font-bold text-white">
              {scoutingMetrics.totalScouts}
            </p>
          </div>
          <div className="p-4 rounded-lg bg-[#252930]">
            <p className="text-gray-500 text-sm">Scouts activos</p>
            <p className="text-xl font-bold text-white">
              {scoutingMetrics.activeScouts}
            </p>
          </div>
          <div className="p-4 rounded-lg bg-[#252930]">
            <p className="text-gray-500 text-sm">Jugadores evaluados</p>
            <p className="text-xl font-bold text-white">
              {scoutingMetrics.playersScouted}
            </p>
          </div>
          <div className="p-4 rounded-lg bg-[#252930]">
            <p className="text-gray-500 text-sm">Posibles fichajes</p>
            <p className="text-xl font-bold text-white">
              {scoutingMetrics.potentialSignings}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
