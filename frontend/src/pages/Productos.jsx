import { useState } from "react";
import Navbar from "../components/Navbar";
import FormNewProducto from "../components/FormNewProducto";
import DetalleProducto from "../components/DetalleProducto";
import {
  ChevronUp,
  ChevronDown,
  Eye,
  Package,
  DollarSign,
  AlertTriangle,
} from "lucide-react";

export default function Productos() {
  const [showForm, setShowForm] = useState(false);
  const [productoDetalle, setProductoDetalle] = useState(null);

  // ORDENAMIENTO
  const [sortKey, setSortKey] = useState(null); // "nombre" | "precio"
  const [sortDir, setSortDir] = useState("asc"); // "asc" | "desc"

  // MOCK de productos (COMPLETO)
  const productos = [
    {
      id: 1,
      nombre: "Camisa Cuadros",
      descripcion: "Camisa de algodón con diseño casual",
      categoria: "Camisas",
      subcategoria: "Manga larga",
      proveedor: "Proveedor A",
      precio: 45.99,
      stock: 13,
      stockMinimo: 5,
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
      subcategoria: "Casual",
      proveedor: "Proveedor B",
      precio: 89.99,
      stock: 3,
      stockMinimo: 4,
      variantes: [
        { color: "Multicolor", talle: "S", stock: 3 },
        { color: "Multicolor", talle: "M", stock: 0 },
      ],
    },
  ];

  const ordenar = (key, dir) => {
    setSortKey(key);
    setSortDir(dir);
  };

  const productosOrdenados = [...productos].sort((a, b) => {
    if (!sortKey) return 0;

    if (sortDir === "asc") {
      return a[sortKey] > b[sortKey] ? 1 : -1;
    }
    return a[sortKey] < b[sortKey] ? 1 : -1;
  });

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      <main className="p-6 space-y-6">
        {/* ================= HEADER ================= */}
        <div className="bg-white border rounded-xl shadow p-5">
          <h1 className="text-2xl font-semibold text-gray-800">
            Gestión de productos
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Controla tu inventario, agrega nuevos productos y actualiza el stock.
          </p>
        </div>

        {/* ================= CARDS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border rounded-xl shadow p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <Package size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Productos</p>
              <p className="text-2xl font-semibold">{productos.length}</p>
            </div>
          </div>

          <div className="bg-white border rounded-xl shadow p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <DollarSign size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Valor Total del Stock</p>
              <p className="text-2xl font-semibold">$3372.85 ARS</p>
            </div>
          </div>
        </div>

        {/* ================= BOTÓN AGREGAR ================= */}
        <div className="flex justify-end">
          <button
            onClick={() => setShowForm(true)}
            className="btn btn-primary w-auto px-6"
          >
            + Agregar Producto
          </button>
        </div>

        {/* ================= TABLA ================= */}
        <div className="bg-white border rounded-xl shadow p-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b text-gray-700">
              <tr>
                <th className="py-2 text-left">
                  <div className="flex items-center gap-2">
                    Producto
                    <div className="flex items-center gap-1 text-gray-400">
                      <ChevronUp
                        size={18}
                        className="cursor-pointer hover:text-gray-700"
                        onClick={() => ordenar("nombre", "asc")}
                      />
                      <ChevronDown
                        size={18}
                        className="cursor-pointer hover:text-gray-700"
                        onClick={() => ordenar("nombre", "desc")}
                      />
                    </div>
                  </div>
                </th>

                <th className="py-2 text-left">Categoría</th>
                <th className="py-2 text-left">Subcategoría</th>
                <th className="py-2 text-left">Proveedor</th>

                <th className="py-2 text-left">
                  <div className="flex items-center gap-2">
                    Precio
                    <div className="flex items-center gap-1 text-gray-400">
                      <ChevronUp
                        size={18}
                        className="cursor-pointer hover:text-gray-700"
                        onClick={() => ordenar("precio", "asc")}
                      />
                      <ChevronDown
                        size={18}
                        className="cursor-pointer hover:text-gray-700"
                        onClick={() => ordenar("precio", "desc")}
                      />
                    </div>
                  </div>
                </th>

                <th className="py-2 text-center">Stock</th>
                <th className="py-2 text-center">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {productosOrdenados.map((producto) => (
                <tr key={producto.id} className="border-b">
                  <td className="py-3">
                    {producto.nombre}
                    <p className="text-xs text-gray-500">
                      {producto.descripcion}
                    </p>
                  </td>

                  <td>{producto.categoria}</td>
                  <td>{producto.subcategoria}</td>
                  <td>{producto.proveedor}</td>
                  <td>${producto.precio}</td>

                  <td
                    className={`text-center font-semibold ${
                      producto.stock < producto.stockMinimo
                        ? "text-danger"
                        : ""
                    }`}
                  >
                    {producto.stock < producto.stockMinimo && (
                      <AlertTriangle
                        size={14}
                        color="#f3023e"
                        className="inline mr-1"
                      />
                    )}
                    {producto.stock}
                  </td>

                  <td className="text-center">
                    <button
                      onClick={() => setProductoDetalle(producto)}
                      className="inline-flex items-center gap-2 px-3 py-1.5
                                 rounded-lg text-gray-600 hover:text-gray-900
                                 hover:bg-gray-100 transition text-sm"
                    >
                      <Eye size={16} />
                      Detalle
                    </button>
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
