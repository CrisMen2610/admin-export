import React, { useState } from 'react';
import { Search, Bell, User } from 'lucide-react';

const AdminHeader = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="h-16 bg-[#1a1d24] border-b border-[#2d3239] flex items-center justify-between px-6 gap-4">
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            size={18}
          />
          <input
            type="text"
            placeholder="Buscar atletas, scouts o eventos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#252930] border border-[#2d3239] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 rounded-lg text-gray-400 hover:bg-[#2d3239] hover:text-white transition-colors">
          <Bell size={20} />
        </button>
        <div className="flex items-center gap-3 pl-2 border-l border-[#2d3239]">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-white">Administrador</p>
            <p className="text-xs text-gray-500">Admin Principal</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-sm">
            AD
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
