import { useState } from "react";
import Navbar from "../components/Navbar";
import ResumenCard from "../components/ResumenCard";
import FormNewEmpleado from "../components/FormNewEmpleado";

export default function Empleados() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      <main className="p-6">
        {/* Tarjetas resumen */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <ResumenCard title="Total Employees" value="5" color="bg-gray-200" icon="👥" />
          <ResumenCard title="Active" value="4" color="bg-green-200" icon="✅" />
          <ResumenCard title="Inactive" value="1" color="bg-red-200" icon="⛔" />
        </div>

        {/* Buscador + botón añadir */}
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search employees..."
            className="w-64 px-3 py-2 border rounded-lg"
          />

          <button
            onClick={() => setShowForm(true)}
            className="bg-black text-white px-4 py-2 rounded-lg shadow hover:bg-gray-900 transition"
          >
            + Add Employee
          </button>
        </div>

        {/* Tabla */}
        <div className="bg-white border rounded-xl shadow-sm p-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-gray-600 border-b">
              <tr>
                <th className="py-2 text-left">Name</th>
                <th className="py-2 text-left">Email</th>
                <th className="py-2 text-left">Position</th>
                <th className="py-2 text-left">Department</th>
                <th className="py-2 text-left">Hire Date</th>
                <th className="py-2 text-left">Status</th>
                <th className="py-2 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b">
                <td className="py-3">María González</td>
                <td className="py-3 text-gray-500">maria.gonzalez@xkr.com</td>
                <td className="py-3">Sales Manager</td>
                <td className="py-3">Sales</td>
                <td className="py-3">14/10/2023</td>
                <td className="py-3">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded">active</span>
                </td>
                <td className="py-3 text-center space-x-3">
                  ✏️ <span className="cursor-pointer">🗑️</span>
                </td>
              </tr>

              <tr className="border-b">
                <td className="py-3">Carlos Rodríguez</td>
                <td className="py-3 text-gray-500">carlos.rodriguez@xkr.com</td>
                <td className="py-3">Marketing Specialist</td>
                <td className="py-3">Marketing</td>
                <td className="py-3">19/03/2023</td>
                <td className="py-3">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded">active</span>
                </td>
                <td className="py-3 text-center space-x-3">
                  ✏️ <span className="cursor-pointer">🗑️</span>
                </td>
              </tr>

              <tr>
                <td className="py-3">Laura Fernández</td>
                <td className="py-3 text-gray-500">laura.fernandez@xkr.com</td>
                <td className="py-3">IT Support</td>
                <td className="py-3">IT</td>
                <td className="py-3">11/08/2023</td>
                <td className="py-3">
                  <span className="bg-red-100 text-red-700 px-2 py-1 rounded">inactive</span>
                </td>
                <td className="py-3 text-center space-x-3">
                  ✏️ <span className="cursor-pointer">🗑️</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>

      {/* Modal para añadir empleado */}
      {showForm && <FormNewEmpleado onClose={() => setShowForm(false)} />}
    </div>
  );
}
