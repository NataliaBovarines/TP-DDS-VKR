import Navbar from "../components/Navbar";
import ResumenCard from "../components/ResumenCard";
import { useState } from "react";
import FormNewReserva from "../components/FormNewReserva";


export default function Reservas() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      <main className="p-6">
        {/* Tarjetas resumen */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <ResumenCard title="Total Reservas" value="3" color="bg-gray-200" icon="📋" />
          <ResumenCard title="Pendientes" value="1" color="bg-yellow-200" icon="🕒" />
          <ResumenCard title="Confirmadas" value="1" color="bg-blue-200" icon="📘" />
          <ResumenCard title="Completadas" value="1" color="bg-green-200" icon="📦" />
        </div>

        {/* Buscador + filtro + nueva reserva */}
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Buscar reservas..."
            className="w-64 px-3 py-2 border rounded-lg"
          />

          <select className="px-3 py-2 border rounded-lg">
            <option>Todos los estados</option>
            <option>Pendiente</option>
            <option>Confirmada</option>
            <option>Completada</option>
          </select>

          <button
            onClick={() => setOpenModal(true)}
            className="bg-black text-white px-4 py-2 rounded-lg shadow hover:bg-gray-900 transition"
          >
            + Nueva Reserva
          </button>
        </div>

        {/* Tabla */}
        <div className="bg-white border rounded-xl shadow-sm p-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-gray-600 border-b">
              <tr>
                <th className="py-2 text-left">Cliente</th>
                <th className="py-2 text-left">Contacto</th>
                <th className="py-2 text-left">Fecha</th>
                <th className="py-2 text-left">Estado</th>
                <th className="py-2 text-left">Notas</th>
                <th className="py-2">Acciones</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b">
                <td className="py-3">Ana García</td>
                <td className="py-3 text-gray-500">
                  +52 555 123 4567 <br />
                  ana.garcia@email.com
                </td>
                <td className="py-3">14/10/2025</td>
                <td className="py-3">
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    Confirmada
                  </span>
                </td>
                <td className="py-3">Vestido floral + zapatos oxford</td>
                <td className="py-3 flex space-x-3 justify-center">✏️ 🗑️</td>
              </tr>

              <tr className="border-b">
                <td className="py-3">Roberto Martínez</td>
                <td className="py-3 text-gray-500">
                  +52 555 987 6543 <br />
                  roberto@email.com
                </td>
                <td className="py-3">11/10/2025</td>
                <td className="py-3">
                  <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                    Pendiente
                  </span>
                </td>
                <td className="py-3">Camisa cuadros + pantalón negro</td>
                <td className="py-3 flex space-x-3 justify-center">✏️ 🗑️</td>
              </tr>

              <tr>
                <td className="py-3">Carmen López</td>
                <td className="py-3 text-gray-500">
                  +52 555 456 7890 <br />
                  carmen.lopez@email.com
                </td>
                <td className="py-3">09/10/2025</td>
                <td className="py-3">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                    Completada
                  </span>
                </td>
                <td className="py-3">Pagó con tarjeta</td>
                <td className="py-3 flex space-x-3 justify-center">✏️ 🗑️</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* MODAL */}
        <FormNewReserva open={openModal} onClose={() => setOpenModal(false)} />
      </main>
    </div>
  );
}
