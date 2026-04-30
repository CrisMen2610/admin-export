import React, { useState } from 'react';
import { Save, Bell, Shield, Palette } from 'lucide-react';

const AdminSettings = () => {
  const [notifications, setNotifications] = useState(true);
  const [emailReports, setEmailReports] = useState(true);
  const [theme, setTheme] = useState('dark');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Ajustes</h1>
        <p className="text-gray-400 mt-1">
          Configuración del panel de administración.
        </p>
      </div>

      <div className="space-y-6 max-w-2xl">
        <div className="bg-[#1e2228] rounded-xl border border-[#2d3239] p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-amber-500/20">
              <Bell size={20} className="text-amber-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Notificaciones</h3>
          </div>
          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-gray-300">Notificaciones en tiempo real</span>
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className="w-5 h-5 rounded border-[#2d3239] bg-[#252930] text-amber-500 focus:ring-amber-500/50"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-gray-300">Informes por correo (resumen diario)</span>
              <input
                type="checkbox"
                checked={emailReports}
                onChange={(e) => setEmailReports(e.target.checked)}
                className="w-5 h-5 rounded border-[#2d3239] bg-[#252930] text-amber-500 focus:ring-amber-500/50"
              />
            </label>
          </div>
        </div>

        <div className="bg-[#1e2228] rounded-xl border border-[#2d3239] p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-blue-500/20">
              <Palette size={20} className="text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Apariencia</h3>
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Tema del panel</label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#252930] border border-[#2d3239] rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            >
              <option value="dark">Oscuro</option>
              <option value="light">Claro</option>
              <option value="system">Según sistema</option>
            </select>
          </div>
        </div>

        <div className="bg-[#1e2228] rounded-xl border border-[#2d3239] p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-emerald-500/20">
              <Shield size={20} className="text-emerald-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">Seguridad</h3>
          </div>
          <p className="text-gray-400 text-sm mb-4">
            Configuración de permisos y acceso al panel (próximamente).
          </p>
        </div>

        <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-500 text-white font-medium hover:bg-amber-600 transition-colors">
          <Save size={18} />
          Guardar cambios
        </button>
      </div>
    </div>
  );
};

export default AdminSettings;
