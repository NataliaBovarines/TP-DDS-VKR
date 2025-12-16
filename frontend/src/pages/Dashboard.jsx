import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#EEEEEE] font-sans text-[#1D1D1D]">
      {/* Navbar */}
      <Navbar />

      {/* Contenido principal */}
      <main className="px-8 py-6">
        {/* Título */}
        <h2 className="text-2xl font-semibold mb-1">
          Bienvenido a VKR
        </h2>
        <p className="text-sm text-[#6B5D58] mb-8">
          Resumen general de tu negocio
        </p>

        {/* Tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card
            title="Total Productos"
            value="$3372.85 ARS"
            subtitle="En inventario"
            icon="📦"
          />

          <Card
            title="Reservas Activas"
            value="0"
            subtitle="Pendientes de completar"
            icon="🧾"
          />

          <Card
            title="Stock Bajo"
            value="5"
            subtitle="Productos con stock menor a 5"
            icon="⚠️"
            warning
          />

          <Card
            title="Empleados"
            value="3"
            subtitle="Personal activo"
            icon="👥"
          />
        </div>

        {/* Acciones */}
        <div className="flex flex-col items-center mt-16 gap-4">
          <Link
            to="/sales"
            className="
              btn btn-primary w-56
              inline-flex items-center justify-center
              no-underline
            "
          >
            Realizar venta
          </Link>

          <Link
            to="/metrics"
            className="
              btn btn-outline w-40
              inline-flex items-center justify-center
              no-underline
            "
          >
            Ir a Métricas
          </Link>
        </div>
      </main>
    </div>
  );
}

/* ---------- Card ---------- */
function Card({ title, value, subtitle, icon, warning }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-medium text-[#6B5D58]">
            {title}
          </h3>

          <p
            className={`text-2xl font-semibold mt-2 ${
              warning ? "text-orange-700" : "text-[#1D1D1D]"
            }`}
          >
            {value}
          </p>

          <p className="text-xs text-[#6B5D58] mt-1">
            {subtitle}
          </p>
        </div>

        <div className="text-xl text-[#6B5D58]">
          {icon}
        </div>
      </div>
    </div>
  );
}
