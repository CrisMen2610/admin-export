# Admin Panel (export)

Este `.zip` contiene lo **esencial** para reutilizar las pantallas del **panel admin** en otro proyecto React.

## Qué incluye

- `src/components/admin/*`: layout + pantallas del admin.
- `src/data/mockData.js`: datos mock usados por el admin (atletas, scouts, métricas).
- `src/data/adminMockData.js`: métricas mock del admin.
- `src/config/sportFieldConfig.js`: configuración de campos por deporte (persistencia en `localStorage`).
- `src/hooks/useSportFieldConfig.js`: hook para consumir la config (escucha `storage` + evento custom).
- `src/utils/Logo_Atletain.png` y `src/utils/profile.png`: assets usados por sidebar/avatares.

## Dependencias requeridas en el proyecto destino

Instala (o asegúrate de tener) estas dependencias:

- `react-router-dom` (rutas + `Outlet`)
- `lucide-react` (iconos)
- `recharts` (gráficas)

## Estilos

Estas pantallas usan **TailwindCSS** (clases como `bg-[#1e2228]`, `text-gray-400`, etc.).  
Si tu proyecto destino no usa Tailwind, tendrás que:

- instalarlo/configurarlo, o
- migrar las clases a CSS tradicional / tu framework de UI.

## Integración rápida (React Router v6)

1) Copia la carpeta `src/` de este export dentro del `src/` de tu proyecto destino (manteniendo rutas).

2) Agrega las rutas del admin (ejemplo):

```jsx
import { Routes, Route } from 'react-router-dom';
import AdminLayout from './components/admin/AdminLayout.jsx';
import AdminDashboard from './components/admin/AdminDashboard.jsx';
import AdminAthletes from './components/admin/AdminAthletes.jsx';
import AdminScouts from './components/admin/AdminScouts.jsx';
import AdminReports from './components/admin/AdminReports.jsx';
import AdminSportFields from './components/admin/AdminSportFields.jsx';
import AdminSettings from './components/admin/AdminSettings.jsx';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="atletas" element={<AdminAthletes />} />
        <Route path="scouts" element={<AdminScouts />} />
        <Route path="reportes" element={<AdminReports />} />
        <Route path="campos-deportes" element={<AdminSportFields />} />
        <Route path="ajustes" element={<AdminSettings />} />
      </Route>
    </Routes>
  );
}
```

## Notas

- Este export **no incluye** integraciones con backend (todo está en modo demo/mock).
- `AdminSportFields` guarda la configuración en `localStorage`. Si quieres persistencia real, se conecta a tu API/DB.

## Ejecutar en local

Este workspace ya quedó configurado como app React con **Vite + TailwindCSS**.

### Requisitos

- Node.js 18+
- npm 9+

### Comandos

```bash
npm install
npm run dev
```

Abre `http://localhost:5173/` y entra al panel en `/admin`.

### Build de producción

```bash
npm run build
```

