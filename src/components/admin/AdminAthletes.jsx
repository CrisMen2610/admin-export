import React, { useState } from "react";
import { Search, Filter, Download, MoreVertical } from "lucide-react";
import { useAthletes } from "../../hooks/useAthletes";

const AdminAthletes = () => {
  const { athletes, loading, error } = useAthletes();
  const [searchTerm, setSearchTerm] = useState("");
  const [sportFilter, setSportFilter] = useState("all");

  const sports = [...new Set(athletes.map((p) => p.sport))].filter(Boolean);
  const filtered = athletes.filter((p) => {
    const matchSearch =
      p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.club?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchSport = sportFilter === "all" || p.sport === sportFilter;
    return matchSearch && matchSport;
  });

  const renderStars = (rating) => {
    const numericRating = Number.isFinite(Number(rating)) ? Number(rating) : 0;
    const normalizedRating = Math.max(0, Math.min(100, numericRating));
    const r = Math.round((normalizedRating / 100) * 5);
    return (
      <span className="flex gap-0.5 text-amber-400">
        {"★".repeat(r)}
        {"☆".repeat(5 - r)}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Atletas</h1>
        <p className="text-gray-400 mt-1">
          Gestiona todos los atletas registrados en la plataforma.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            size={18}
          />
          <input
            type="text"
            placeholder="Buscar por nombre o club..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#1e2228] border border-[#2d3239] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          />
        </div>
        <select
          value={sportFilter}
          onChange={(e) => setSportFilter(e.target.value)}
          className="px-4 py-2.5 bg-[#1e2228] border border-[#2d3239] rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
        >
          <option value="all">Todos los deportes</option>
          {sports.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#2d3239] text-gray-300 hover:bg-[#252930]">
          <Filter size={18} />
          Filtrar
        </button>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500 text-white font-medium hover:bg-amber-600">
          <Download size={18} />
          Exportar
        </button>
      </div>

      <div className="bg-[#1e2228] rounded-xl border border-[#2d3239] overflow-hidden">
        {loading && (
          <p className="py-10 text-center text-gray-400 animate-pulse">
            Cargando atletas…
          </p>
        )}
        {error && (
          <p className="py-10 text-center text-red-400 text-sm">
            Error: {error}
          </p>
        )}
        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-gray-500 uppercase border-b border-[#2d3239]">
                  <th className="py-3 px-5 font-medium">Atleta</th>
                  <th className="py-3 px-5 font-medium">Deporte</th>
                  <th className="py-3 px-5 font-medium">Posición</th>
                  <th className="py-3 px-5 font-medium">Club</th>
                  <th className="py-3 px-5 font-medium">Valoración</th>
                  <th className="py-3 px-5 font-medium">Potencial</th>
                  <th className="py-3 px-5 w-16">Acción</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-10 text-center text-gray-500">
                      Sin resultados.
                    </td>
                  </tr>
                ) : (
                  filtered.map((p) => (
                    <tr
                      key={p.id}
                      className="border-b border-[#2d3239] hover:bg-[#252930]/50 transition-colors"
                    >
                      <td className="py-3 px-5">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.avatar}
                            alt=""
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-medium text-white">{p.name}</p>
                            <p className="text-xs text-gray-500">
                              {p.age != null ? `${p.age} años` : "—"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-5 text-gray-300">{p.sport}</td>
                      <td className="py-3 px-5 text-gray-400">{p.position}</td>
                      <td className="py-3 px-5 text-gray-400">{p.club}</td>
                      <td className="py-3 px-5">
                        {renderStars(p.currentRating)}
                      </td>
                      <td className="py-3 px-5">
                        <span className="text-amber-400 font-medium">
                          {p.potential ?? "—"}
                        </span>
                      </td>
                      <td className="py-3 px-5">
                        <button className="p-1.5 rounded-lg text-gray-400 hover:bg-[#2d3239] hover:text-white">
                          <MoreVertical size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAthletes;
