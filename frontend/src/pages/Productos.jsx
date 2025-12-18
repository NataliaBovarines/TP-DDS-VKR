import { useState } from "react";
import Navbar from "../components/Navbar";
import FormNewProducto from "../components/FormNewProducto";
import DetalleProducto from "../components/DetalleProducto";

export default function Productos() {
  const [showForm, setShowForm] = useState(false);
  const [productoDetalle, setProductoDetalle] = useState(null);

  // MOCK de productos (después esto viene del backend)
  const productos = [
    {
      id: 1,
      nombre: "Camisa Cuadros",
      descripcion: "Camisa de algodón con diseño casual",
      categoria: "Camisas",
      proveedor: "Proveedor A",
      precio: 45.99,
      stock: 13,
      variantes: [
        { color: "Azul", talle: "S", stock: 3 },
        { color: "Azul", talle: "M", stock: 10 },
        { color: "Azul", talle: "L", stock: 0 },
      ],
    },
    {
      id: 2,
      nombre: "Vestido Floral",
      descripcion: "Vestido de verano con estampado floral",
      categoria: "Vestidos",
      proveedor: "Proveedor B",
      precio: 89.99,
      stock: 3,
      variantes: [
        { color: "Multicolor", talle: "S", stock: 3 },
        { color: "Multicolor", talle: "M", stock: 0 },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      <main className="p-6 space-y-6">

        {/* ===================== GESTIÓN ===================== */}
        <div className="bg-white border rounded-xl shadow p-5">
          <h1 className="text-2xl font-semibold text-gray-800">
            Gestión de productos
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Controla tu inventario, agrega nuevos productos y actualiza el stock.
          </p>
        </div>

        {/* ===================== CARDS ===================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border rounded-xl shadow p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              📦
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Productos</p>
              <p className="text-2xl font-semibold">{productos.length}</p>
            </div>
          </div>

          <div className="bg-white border rounded-xl shadow p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              💰
            </div>
            <div>
              <p className="text-sm text-gray-600">Valor Total del Stock</p>
              <p className="text-2xl font-semibold">$3372.85 ARS</p>
            </div>
          </div>
        </div>

        {/* ===================== FILTROS ===================== */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Buscar productos..."
              className="input-base input-normal w-64 h-[44px]"
            />

            <select className="input-base input-normal w-56 h-[44px]">
              <option>Todas las categorías</option>
              <option>Camisas</option>
              <option>Pantalones</option>
              <option>Vestidos</option>
              <option>Accesorios</option>
            </select>

            <button className="input-base w-auto h-[44px] px-4 flex items-center gap-2 hover:bg-gray-100">
              <span className="text-danger text-sm">⚠</span>
              <span className="text-sm font-medium">
                Stock bajo (&lt; 5)
              </span>
            </button>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="btn btn-primary w-auto px-6"
          >
            + Agregar Producto
          </button>
        </div>

        {/* ===================== TABLA ===================== */}
        <div className="bg-white border rounded-xl shadow p-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b text-gray-700">
              <tr>
                <th className="py-2 text-left">
                  <div className="flex items-center gap-2">
                    Producto
                    <div className="flex gap-1">
                      <button className="px-1 hover:bg-gray-200 rounded">▲</button>
                      <button className="px-1 hover:bg-gray-200 rounded">▼</button>
                    </div>
                  </div>
                </th>
                <th className="py-2 text-left">Categoría</th>
                <th className="py-2 text-left">Proveedor</th>
                <th className="py-2 text-left">
                  <div className="flex items-center gap-2">
                    Precio
                    <div className="flex gap-1">
                      <button className="px-1 hover:bg-gray-200 rounded">▲</button>
                      <button className="px-1 hover:bg-gray-200 rounded">▼</button>
                    </div>
                  </div>
                </th>
                <th className="py-2 text-center">Stock</th>
                <th className="py-2 text-center">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {productos.map((producto) => (
                <tr key={producto.id} className="border-b">
                  <td className="py-3">
                    {producto.nombre}
                    <p className="text-xs text-gray-500">
                      {producto.descripcion}
                    </p>
                  </td>
                  <td>{producto.categoria}</td>
                  <td>{producto.proveedor}</td>
                  <td>${producto.precio}</td>

                  <td
                    className={`text-center font-semibold ${
                      producto.stock < 5 ? "text-danger" : ""
                    }`}
                  >
                    {producto.stock < 5 && (
                      <span className="mr-1 text-danger text-sm">⚠</span>
                    )}
                    {producto.stock}
                  </td>

                  <td className="text-center space-x-3">
                    <button
                      onClick={() => setProductoDetalle(producto)}
                      className="px-2 py-1 text-xs border rounded hover:bg-gray-100"
                    >
                      Detalle
                    </button>
                    <span
                      title="Editar stock"
                      className="cursor-pointer text-gray-600 hover:text-gray-900 text-sm"
                    >
                      ✏️
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {showForm && <FormNewProducto onClose={() => setShowForm(false)} />}

      {productoDetalle && (
        <DetalleProducto
          producto={productoDetalle}
          onClose={() => setProductoDetalle(null)}
        />
      )}
    </div>
  );
}
