import logo from "../assets/logo.png";
import { useState } from "react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Navbar */}
      <header className="flex justify-between items-center px-6 py-3 border-b bg-white shadow-sm">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="VKR" className="w-6 h-6" />
          <h1 className="font-semibold text-gray-800">Gestor de Ventas</h1>
        </div>
        <nav className="flex space-x-4">
          <button className="bg-gray-900 text-white rounded-md px-3 py-1 text-sm font-semibold">
            Dashboard
          </button>
          <button className="text-gray-700 hover:text-black text-sm font-semibold">
            Productos
          </button>
          <button className="text-gray-700 hover:text-black text-sm font-semibold">
            Reservas
          </button>
          <button className="text-gray-700 hover:text-black text-sm font-semibold">
            Empleados
          </button>
        </nav>
      </header>

      {/* Contenido principal */}
      <main className="p-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Bienvenido al Gestor de Ventas VKR
        </h2>
        <p className="text-sm text-gray-500 mb-6">Resumen general de tu negocio</p>

        {/* Tarjetas superiores */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card title="Total Productos" value="0" subtitle="En inventario" />
          <Card title="Reservas Activas" value="0" subtitle="Pendientes de completar" />
          <Card title="Stock Bajo" value="0" subtitle="Productos con stock menor a 5" warning />
          <Card title="Empleados" value="0" subtitle="Personal activo" />
        </div>

        {/* Secciones inferiores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SectionCard
            icon="⚙️"
            title="Gestión de Productos"
            text="Controla tu inventario, agrega nuevos productos y actualiza el stock"
          />
          <SectionCard
            icon="📦"
            title="Reservas de Clientes"
            text="Administra las reservas y ventas no completadas"
          />
          <SectionCard
            icon="👥"
            title="Equipo de Trabajo"
            text="Gestiona los empleados y sus roles en la tienda"
          />
        </div>
      </main>
    </div>
  );
}

function Card({ title, value, subtitle, warning, color, icon }) {
  return (
    <div
      className={`flex flex-col justify-between border rounded-lg p-4 shadow-md transition-transform transform hover:-translate-y-1 hover:shadow-lg ${color}`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
        {icon && <span className="text-2xl">{icon}</span>}
      </div>
      <p
        className={`text-3xl font-bold mt-2 ${
          warning ? "text-orange-600" : "text-gray-800"
        }`}
      >
        {value}
      </p>
      <p className="text-xs text-gray-700 mt-1">{subtitle}</p>
    </div>
  );
}

function SectionCard({ icon, title, text, color }) {
  return (
    <div
      className={`border rounded-lg p-4 shadow-md transition-transform transform hover:-translate-y-1 hover:shadow-lg ${color}`}
    >
      <h3 className="font-semibold text-gray-700 flex items-center space-x-3">
        <span className="text-2xl">{icon}</span>
        <span>{title}</span>
      </h3>
      <p className="text-sm text-gray-700 mt-2">{text}</p>
    </div>
  );
}







/*

function Card({ title, value, subtitle, warning }) {
  return (
    <div className="flex flex-col border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
        {warning && <span className="text-orange-500 text-lg">⚠️</span>}
      </div>
      <p className={`text-2xl font-bold ${warning ? "text-orange-500" : "text-gray-800"}`}>
        {value}
      </p>
      <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
    </div>
  );
}

function SectionCard({ icon, title, text }) {
  return (
    <div className="border rounded-lg p-4 bg-white">
      <h3 className="font-semibold text-gray-700 flex items-center space-x-2">
        <span>{icon}</span> <span>{title}</span>
      </h3>
      <p className="text-sm text-gray-500 mt-1">{text}</p>
    </div>
  );
}
*/