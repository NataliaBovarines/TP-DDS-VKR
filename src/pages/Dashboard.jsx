import { useState } from "react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Navbar */}
      <header className="flex justify-between items-center px-6 py-3 border-b bg-white shadow-sm">
        <div className="flex items-center space-x-3">
          <img src="/logo.png" alt="VKR" className="w-8 h-8" />
          <h1 className="font-semibold text-gray-800 text-lg">Gestor de Ventas</h1>
        </div>
        <nav className="flex space-x-4">
          <button className="bg-gray-900 text-white rounded-md px-4 py-2 text-sm font-semibold hover:bg-gray-800 transition">
            Dashboard
          </button>
          <button className="text-gray-700 hover:text-black text-sm font-semibold">Productos</button>
          <button className="text-gray-700 hover:text-black text-sm font-semibold">Reservas</button>
          <button className="text-gray-700 hover:text-black text-sm font-semibold">Empleados</button>
        </nav>
      </header>

      {/* Contenido principal */}
      <main className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-1">
          Bienvenido al Gestor de Ventas VKR
        </h2>
        <p className="text-sm text-gray-500 mb-6">Resumen general de tu negocio</p>

        {/* Cards superiores - métricas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card title="Total Productos" value="120" subtitle="En inventario" />
          <Card title="Reservas Activas" value="15" subtitle="Pendientes" />
          <Card title="Stock Bajo" value="5" subtitle="Productos <5" warning />
          <Card title="Empleados" value="8" subtitle="Activos" />
        </div>

        {/* Cards inferiores - secciones con color pastel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SectionCard
            icon="⚙️"
            title="Gestión de Productos"
            text="Controla tu inventario, agrega nuevos productos y actualiza el stock"
            color="bg-blue-100"
          />
          <SectionCard
            icon="📦"
            title="Reservas de Clientes"
            text="Administra las reservas y ventas pendientes de completar"
            color="bg-green-100"
          />
          <SectionCard
            icon="👥"
            title="Equipo de Trabajo"
            text="Gestiona los empleados y sus roles en la tienda"
            color="bg-red-100"
          />
        </div>
      </main>
    </div>
  );
}

// Card principal
function Card({ title, value, subtitle, warning }) {
  return (
    <div className="flex flex-col justify-between border rounded-lg p-5 bg-white shadow-sm hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
        {warning && <span className="text-orange-500 text-lg">⚠️</span>}
      </div>
      <p className={`text-2xl font-bold mt-2 ${warning ? "text-orange-500" : "text-gray-800"}`}>
        {value}
      </p>
      <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
    </div>
  );
}

// Card de sección
function SectionCard({ icon, title, text, color }) {
  return (
    <div className={`border rounded-lg p-5 shadow-sm hover:shadow-md transition ${color}`}>
      <h3 className="font-semibold text-gray-700 flex items-center space-x-2">
        <span className="text-2xl">{icon}</span>
        <span>{title}</span>
      </h3>
      <p className="text-sm text-gray-700 mt-1">{text}</p>
    </div>
  );
}
