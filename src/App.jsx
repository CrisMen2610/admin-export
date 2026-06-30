import React from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminAthletes from "./components/admin/AdminAthletes";
import AdminScouts from "./components/admin/AdminScouts";
import AdminAnalytics from "./components/admin/AdminAnalytics";
import AdminReports from "./components/admin/AdminReports";
import AdminSportFields from "./components/admin/AdminSportFields";
import AdminSettings from "./components/admin/AdminSettings";

function HomePage() {
  return (
    <main className="min-h-screen bg-[#15171c] text-white flex items-center justify-center px-6">
      <div className="w-full max-w-3xl rounded-3xl border border-[#2d3239] bg-[#1e2228] p-8 md:p-12 shadow-2xl shadow-black/20">
        <span className="inline-flex rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-sm font-medium text-amber-300">
          Demo local lista
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight">
          Athletain Admin
        </h1>
        <p className="mt-4 max-w-2xl text-base text-gray-400 md:text-lg">
          Este entorno quedó configurado para ejecutar el panel admin en local
          con React, Vite, React Router y Tailwind.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/admin"
            className="inline-flex items-center justify-center rounded-xl bg-amber-500 px-5 py-3 font-semibold text-white transition hover:bg-amber-600"
          >
            Entrar al panel
          </Link>
          <a
            href="https://vite.dev/guide/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-xl border border-[#3a4049] px-5 py-3 font-semibold text-gray-200 transition hover:bg-[#252930]"
          >
            Ver stack
          </a>
        </div>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="atletas" element={<AdminAthletes />} />
        <Route path="scouts" element={<AdminScouts />} />
        <Route path="analiticas" element={<AdminAnalytics />} />
        <Route path="reportes" element={<AdminReports />} />
        <Route path="campos-deportes" element={<AdminSportFields />} />
        <Route path="ajustes" element={<AdminSettings />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
