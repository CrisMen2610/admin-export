# Admin Panel (export)

Este `.zip` contiene lo **esencial** para reutilizar las pantallas del **panel admin** en otro proyecto React.

## Qué incluye

- `src/components/admin/*`: layout + pantallas del admin.
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

- Este export está configurado para consumir datos desde **Supabase**.
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

## Deploy en GitHub Pages

Este repositorio despliega automáticamente a GitHub Pages con GitHub Actions.

### 1) Configuración única en GitHub

1. Ve a **Settings → Pages** en el repositorio.
2. En **Build and deployment**, selecciona **Source: GitHub Actions**.
3. Ve a **Settings → Secrets and variables → Actions** y crea estos secretos:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_POSTHOG_HOST` (opcional)
   - `VITE_POSTHOG_PROJECT_URL` (opcional)
   - `VITE_POSTHOG_DASHBOARD_EMBED_URL` (opcional)
   - `VITE_POSTHOG_INSIGHTS_EMBED_URL` (opcional)

### 2) Publicar

- Cada push a `main` ejecuta `.github/workflows/deploy-pages.yml`.
- También puedes lanzarlo manualmente desde **Actions → Deploy to GitHub Pages → Run workflow**.

### 3) URL publicada

- El workflow publica el sitio en la URL de Pages del repositorio:
  `https://<owner>.github.io/<repo>/`
- Este proyecto crea fallback SPA (`dist/404.html`) en CI para que rutas como
  `/admin/reportes` funcionen también al abrirse directamente.

## Módulo de analíticas (PostHog) visible en admin

El panel incluye una pantalla en `/admin/analiticas` para consultar PostHog desde el admin.

Importante:
- el admin **no envía** eventos a PostHog
- esta vista solo muestra/abre dashboards e insights ya recolectados por la app principal

Variables opcionales en `.env` para embebidos:

```bash
VITE_POSTHOG_HOST="https://us.posthog.com"
VITE_POSTHOG_PROJECT_URL="https://us.posthog.com/project/00000"
VITE_POSTHOG_DASHBOARD_EMBED_URL=""
VITE_POSTHOG_INSIGHTS_EMBED_URL=""
```
