import { useState } from "react";
import Navbar from "../components/Navbar";
import FormNewProducto from "../components/FormNewProducto";

export default function Productos() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      <main className="p-6">

        {/* Tarjetas superiores con iconos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

          <div className="border rounded-lg p-4 bg-white shadow-sm flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700">
              📦
            </div>
            <div>
              <h3 className="text-sm text-gray-600">Total Productos</h3>
              <p className="text-2xl font-semibold">5</p>
            </div>
          </div>

          <div className="border rounded-lg p-4 bg-white shadow-sm flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
              ⚠️
            </div>
            <div>
              <h3 className="text-sm text-gray-600">Stock Bajo</h3>
              <p className="text-2xl font-semibold text-orange-500">2</p>
            </div>
          </div>

          <div className="border rounded-lg p-4 bg-white shadow-sm flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              💰
            </div>
            <div>
              <h3 className="text-sm text-gray-600">Valor Total Stock</h3>
              <p className="text-2xl font-semibold">$3372.85 ARS</p>
            </div>
          </div>

        </div>

        {/* Buscador + filtro + botón */}
        <div className="flex items-center justify-between mb-4">
          <input
            type="text"
            placeholder="Buscar productos..."
            className="px-3 py-2 border rounded-lg w-64"
          />

          <select className="px-3 py-2 border rounded-lg">
            <option>Todas las categorías</option>
            <option>Camisas</option>
            <option>Pantalones</option>
            <option>Zapatos</option>
            <option>Accesorios</option>
          </select>

          <button
            onClick={() => setShowForm(true)}
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-900 shadow"
          >
            + Agregar Producto
          </button>
        </div>

        {/* Tabla */}
        <div className="bg-white rounded-xl shadow border p-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b text-gray-600">
              <tr>
                <th className="py-2 text-left">Producto</th>
                <th className="py-2 text-left">Categoría</th>
                <th className="py-2 text-left">Talla</th>
                <th className="py-2 text-left">Color</th>
                <th className="py-2 text-left">Precio</th>
                <th className="py-2 text-left">Stock</th>
                <th className="py-2 text-center">Acciones</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b">
                <td className="py-3">
                  Camisa Cuadros
                  <p className="text-gray-500 text-xs">
                    Camisa de algodón con diseño casual
                  </p>
                </td>
                <td>Camisas</td>
                <td>M</td>
                <td>Azul</td>
                <td>$45</td>
                <td>12</td>
                <td className="text-center">✏️ 🗑️</td>
              </tr>

              <tr className="border-b">
                <td className="py-3">
                  Pantalón de Vestir
                  <p className="text-gray-500 text-xs">
                    Pantalón formal de corte slim
                  </p>
                </td>
                <td>Pantalones</td>
                <td>L</td>
                <td>Negro</td>
                <td>$68</td>
                <td>8</td>
                <td className="text-center">✏️ 🗑️</td>
              </tr>

              <tr>
                <td className="py-3">
                  Vestido Floral
                  <p className="text-gray-500 text-xs">
                    Vestido estampado de verano
                  </p>
                </td>
                <td>Vestidos</td>
                <td>S</td>
                <td>Multicolor</td>
                <td>$89</td>
                <td className="text-orange-500 font-semibold">3</td>
                <td className="text-center">✏️ 🗑️</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>

      {showForm && <FormNewProducto onClose={() => setShowForm(false)} />}
    </div>
  );
}
