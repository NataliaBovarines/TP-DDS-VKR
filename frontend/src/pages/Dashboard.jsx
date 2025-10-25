import { Link } from "react-router-dom";
import Navbar from "../components/Navbar"; // ajustá la ruta si tu estructura es distinta

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Navbar */}
      <Navbar />

      {/* Contenido principal */}
      <main className="p-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Bienvenido al Gestor de Ventas VKR
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Resumen general de tu negocio
        </p>

        {/* Tarjetas superiores */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card
            title="Total Productos"
            value="120"
            subtitle="En inventario"
            color="bg-blue-100 text-blue-700"
          />
          <Card
            title="Reservas Activas"
            value="15"
            subtitle="Pendientes de completar"
            color="bg-green-100 text-green-700"
          />
          <Card
            title="Stock Bajo"
            value="5"
            subtitle="Productos con stock menor a 5"
            color="bg-red-100 text-red-700"
            warning
          />
          <Card
            title="Empleados"
            value="8"
            subtitle="Personal activo"
            color="bg-yellow-100 text-yellow-700"
          />
        </div>

        {/* Secciones inferiores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <SectionCard
            icon="⚙️"
            title="Gestión de Productos"
            text="Controlá tu inventario, agregá nuevos productos y actualizá el stock."
          />
          <SectionCard
            icon="📦"
            title="Reservas de Clientes"
            text="Administrá las reservas y ventas no completadas."
          />
          <SectionCard
            icon="👥"
            title="Equipo de Trabajo"
            text="Gestioná los empleados y sus roles en la tienda."
          />
        </div>

        {/* Botón principal de venta */}
        <div className="flex justify-center mt-10">
          <Link
            to="/sales"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition"
          >
            🛒 Realizar Venta
          </Link>
        </div>

        {/* Botón secundario de reporte */}
        <div className="flex justify-center">
          <Link
            to="/report"
            className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium px-5 py-2 rounded-lg shadow-sm transition"
          >
            🧾 Generar Reporte
          </Link>
        </div>
      </main>
    </div>
  );
}

// ----- Componentes internos -----
function Card({ title, value, subtitle, color, warning }) {
  return (
    <div
      className={`flex flex-col border rounded-lg p-4 shadow-sm hover:shadow-md transition ${color} bg-opacity-30`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">{title}</h3>
        {warning && <span className="text-orange-500 text-lg">⚠️</span>}
      </div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs text-gray-600 mt-1">{subtitle}</p>
    </div>
  );
}

function SectionCard({ icon, title, text }) {
  return (
    <div className="border rounded-lg p-4 bg-white hover:shadow-md transition">
      <h3 className="font-semibold text-gray-700 flex items-center space-x-2">
        <span>{icon}</span> <span>{title}</span>
      </h3>
      <p className="text-sm text-gray-500 mt-1">{text}</p>
    </div>
  );
}

