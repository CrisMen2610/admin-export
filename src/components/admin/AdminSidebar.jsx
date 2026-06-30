import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Search,
  Activity,
  BarChart3,
  ListChecks,
  Settings,
  LogOut,
} from 'lucide-react';

const navItems = [
  { to: '/admin', end: true, icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/atletas', end: false, icon: Users, label: 'Atletas' },
  { to: '/admin/scouts', end: false, icon: Search, label: 'Scouts' },
  { to: '/admin/analiticas', end: false, icon: Activity, label: 'Analíticas' },
  { to: '/admin/reportes', end: false, icon: BarChart3, label: 'Reportes' },
  { to: '/admin/campos-deportes', end: false, icon: ListChecks, label: 'Campos por deporte' },
  { to: '/admin/ajustes', end: false, icon: Settings, label: 'Ajustes' },
];

const AdminSidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className="w-64 min-h-screen bg-[#1a1d24] flex flex-col border-r border-[#2d3239]">
      <div className="p-6 border-b border-[#2d3239]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            A
          </div>
          <span className="text-xl font-bold text-white tracking-tight">Athletain</span>
        </div>
        <p className="text-xs text-gray-400 mt-1.5">Panel Admin</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ to, end, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-amber-500/20 text-amber-400'
                  : 'text-gray-400 hover:bg-[#2d3239] hover:text-white'
              }`
            }
          >
            <Icon size={20} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-[#2d3239]">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-400 hover:bg-[#2d3239] hover:text-white text-sm font-medium transition-colors"
        >
          <LogOut size={20} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
