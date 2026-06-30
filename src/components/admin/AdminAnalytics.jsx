import React from "react";
import { ExternalLink } from "lucide-react";

const getPosthogUiHost = () => {
  const configuredHost = import.meta.env.VITE_POSTHOG_HOST || "https://us.posthog.com";
  if (configuredHost.includes("i.posthog.com")) {
    return configuredHost.replace("i.posthog.com", "posthog.com");
  }
  return configuredHost;
};

const posthogHost = getPosthogUiHost();
const posthogProjectUrl = import.meta.env.VITE_POSTHOG_PROJECT_URL || "";
const posthogDashboardEmbedUrl = import.meta.env.VITE_POSTHOG_DASHBOARD_EMBED_URL || "";
const posthogInsightsEmbedUrl = import.meta.env.VITE_POSTHOG_INSIGHTS_EMBED_URL || "";

const EmbedPanel = ({ title, src }) => {
  if (!src) {
    return (
      <div className="rounded-xl border border-dashed border-[#3a3f48] bg-[#1a1d24] p-6">
        <h3 className="text-white font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-gray-400">
          Falta configurar esta vista. Define la URL embebible en variables de entorno.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-[#2d3239] bg-[#1a1d24] p-3">
      <h3 className="px-2 py-1 text-sm font-semibold text-gray-200">{title}</h3>
      <iframe
        src={src}
        title={title}
        className="mt-2 h-[520px] w-full rounded-lg border border-[#2d3239] bg-[#111318]"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
};

const AdminAnalytics = () => {
  const openTarget = posthogProjectUrl || posthogHost;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Analíticas</h1>
          <p className="mt-1 text-gray-400">
            Vista de analytics en PostHog para revisar páginas más visitadas, mapas de calor y sesiones.
          </p>
        </div>
        <a
          href={openTarget}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-600"
        >
          Abrir PostHog
          <ExternalLink size={16} />
        </a>
      </div>

      <div className="rounded-xl border border-[#2d3239] bg-[#1e2228] p-5">
        <h2 className="text-lg font-semibold text-white">Configuración</h2>
        <p className="mt-2 text-sm text-gray-400">
          Este admin no envía eventos a PostHog; solo muestra datos ya recolectados por la app principal.
        </p>
        <ul className="mt-3 space-y-1 text-sm text-gray-400">
          <li>
            <code className="text-gray-300">VITE_POSTHOG_PROJECT_URL</code>: URL del proyecto PostHog
          </li>
          <li>
            <code className="text-gray-300">VITE_POSTHOG_DASHBOARD_EMBED_URL</code>: dashboard embebido
          </li>
          <li>
            <code className="text-gray-300">VITE_POSTHOG_INSIGHTS_EMBED_URL</code>: insight/heatmap embebido
          </li>
        </ul>
      </div>

      <div className="grid grid-cols-1 gap-6 2xl:grid-cols-2">
        <EmbedPanel title="Dashboard principal" src={posthogDashboardEmbedUrl} />
        <EmbedPanel title="Insights / Heatmap" src={posthogInsightsEmbedUrl} />
      </div>
    </div>
  );
};

export default AdminAnalytics;
