import { useEffect, useState, useCallback } from "react";
import Navbar from "../components/Navbar";
import DetalleProducto from "../components/DetalleProducto";
import FormNewProducto from "../components/FormNewEmpleado";
import ProductoService from "../services/productoService";
import { Package, Search, AlertTriangle, Eye } from "lucide-react";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [productoDetalle, setProductoDetalle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [filtros, setFiltros] = useState({
    nombre: "",
    categoriaId: "",
    tipoId: "",
    stockBajo: false,
    pagina: 0,
  });

  const cargarProductos = useCallback(async () => {
    try {
      setLoading(true);
      const page = await ProductoService.getProductos({
        ...filtros,
        categoriaId: filtros.categoriaId || undefined,
        tipoId: filtros.tipoId || undefined,
      });
      setProductos(page?.content || []);
    } catch {
      setProductos([]);
    } finally {
      setLoading(false);
    }
  }, [filtros]);

  useEffect(() => {
    cargarProductos();
  }, [cargarProductos]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      <main className="p-6 space-y-6">
        {/* HEADER */}
        <div className="bg-white border rounded-xl shadow p-5">
          <h1 className="text-2xl font-semibold text-gray-800">Gestión de productos</h1>
          <p className="text-sm text-gray-600 mt-1">
            Controlá tu inventario real desde el sistema VKR.
          </p>
        </div>

        {/* CARDS DE RESUMEN */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border rounded-xl shadow p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
              <Package size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total en lista</p>
              <p className="text-2xl font-semibold">{productos.length}</p>
            </div>
          </div>
          <div className="bg-white border rounded-xl shadow p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
              <AlertTriangle size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Filtro Stock Bajo</p>
              <p className="text-2xl font-semibold">{filtros.stockBajo ? "Activado" : "Desactivado"}</p>
            </div>
          </div>
        </div>

        {/* BOTÓN AGREGAR PRODUCTO */}
        <div className="flex justify-end">
          <button
            onClick={() => setShowForm(true)}
            className="btn btn-primary w-auto px-6"
          >
            + Agregar Producto
          </button>
        </div>

        {/* FILTROS DINÁMICOS */}
        <div className="bg-white border rounded-xl shadow p-4 flex flex-wrap gap-3 items-center">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              placeholder="Buscar por nombre..."
              className="pl-10 input-base input-normal w-64"
              value={filtros.nombre}
              onChange={(e) => setFiltros({ ...filtros, nombre: e.target.value, pagina: 0 })}
            />
          </div>

          <button
            onClick={() => setFiltros({ ...filtros, stockBajo: !filtros.stockBajo, pagina: 0 })}
            className={`btn w-auto px-4 flex items-center gap-2 transition ${
              filtros.stockBajo ? "bg-red-50 text-danger border-red-200" : "bg-white border-gray-200 text-gray-600"
            }`}
          >
            <AlertTriangle size={16} />
            <span className="text-sm">Solo Stock Bajo</span>
          </button>
        </div>

        {/* TABLA DE RESULTADOS */}
        <div className="bg-white border rounded-xl shadow overflow-hidden">
          {loading ? (
            <div className="p-20 text-center text-gray-500">Cargando productos de VKR...</div>
          ) : productos.length === 0 ? (
            <div className="p-20 text-center text-gray-500">No se encontraron productos con estos filtros.</div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b text-gray-700">
                <tr>
                  <th className="py-3 px-4 text-left">Producto</th>
                  <th className="text-left">Categoría / Subcategoría</th>
                  <th className="text-center">Precio</th>
                  <th className="text-center">Estado Stock</th>
                  <th className="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((p) => {
                  const tieneStockBajo = p.detalles?.some(d => d.stockActual < d.stockMinimo);
                  return (
                    <tr key={p.id} className="border-b hover:bg-gray-50 transition">
                      <td className="py-3 px-4">
                        <span className="font-medium text-gray-900">{p.nombre}</span>
                        <p className="text-xs text-gray-500">{p.descripcion}</p>
                      </td>
                      <td>
                        <span className="text-gray-700">{p.subcategoria?.categoriaDescripcion ?? "-"}</span>
                        <p className="text-xs text-gray-400">{p.subcategoria?.descripcion ?? "-"}</p>
                      </td>
                      <td className="text-center font-medium">${p.precio}</td>
                      <td className="text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          tieneStockBajo ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                        }`}>
                          {tieneStockBajo ? "⚠ REVISAR" : "✓ OK"}
                        </span>
                      </td>
                      <td className="text-center">
                        <button
                          onClick={() => setProductoDetalle(p)}
                          className="btn-outline w-auto py-1 px-3 inline-flex items-center gap-2"
                        >
                          <Eye size={14} /> Detalle
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        {showForm && (<FormNewProducto onClose={() => setShowForm(false)} />)}
      </main>

      {productoDetalle && (
        <DetalleProducto
          producto={productoDetalle}
          onClose={() => setProductoDetalle(null)}
          onUpdate={cargarProductos}
        />
      )}
    </div>
  );
}
