import React, { useState } from "react";
import { Search, MoreVertical, UserCheck } from "lucide-react";
import { useScouts } from "../../hooks/useScouts";

const AdminScouts = () => {
  const { scouts, loading, error } = useScouts();
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = scouts.filter(
    (s) =>
      s.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.region?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Scouts</h1>
        <p className="text-gray-400 mt-1">
          Gestiona los scouts y sus solicitudes de aprobación.
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
            placeholder="Buscar por nombre o región..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#1e2228] border border-[#2d3239] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          />
        </div>
      </div>

      {loading && (
        <p className="py-10 text-center text-gray-400 animate-pulse">
          Cargando scouts…
        </p>
      )}
      {error && (
        <p className="py-10 text-center text-red-400 text-sm">Error: {error}</p>
      )}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.length === 0 ? (
            <p className="text-gray-500 col-span-3 text-center py-10">
              Sin resultados.
            </p>
          ) : (
            filtered.map((scout) => (
              <div
                key={scout.id}
                className="bg-[#1e2228] rounded-xl border border-[#2d3239] p-5 flex items-center gap-4"
              >
                <img
                  src={scout.avatar}
                  alt=""
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white truncate">
                    {scout.name}
                  </p>
                  <p className="text-sm text-amber-400">{scout.position}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{scout.region}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {scout.activeScouts} atletas asignados
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    className="p-2 rounded-lg text-emerald-400 hover:bg-emerald-500/20"
                    title="Aprobar"
                  >
                    <UserCheck size={18} />
                  </button>
                  <button className="p-2 rounded-lg text-gray-400 hover:bg-[#2d3239] hover:text-white">
                    <MoreVertical size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AdminScouts;
