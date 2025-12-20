import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import DetalleProducto from "../components/DetalleProducto";
import { getProductos } from "../services/productoService";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [productoDetalle, setProductoDetalle] = useState(null);
  const [loading, setLoading] = useState(false);

  // Filtros reales del backend (ProductoFiltroDto)
  const [filtros, setFiltros] = useState({
    nombre: "",
    categoriaId: "",
    tipoId: "",
    proveedorId: "",
    stockBajo: false,
    orden: "nombre",
    direccion: "asc",
    pagina: 0,
  });

  useEffect(() => {
    cargarProductos();
  }, [filtros]);

  async function cargarProductos() {
    try {
      setLoading(true);

      const page = await getProductos({
        ...filtros,
        categoriaId: filtros.categoriaId || undefined,
        tipoId: filtros.tipoId || undefined,
        proveedorId: filtros.proveedorId || undefined,
      });

      setProductos(page?.content ?? []);
    } catch (error) {
      console.error("Error cargando productos:", error);
      setProductos([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="p-6 space-y-6">

        {/* HEADER */}
        <div className="bg-white border rounded-xl p-5 shadow">
          <h1 className="text-2xl font-semibold text-gray-800">
            Gestión de productos
          </h1>
          <p className="text-sm text-gray-600">
            Controlá inventario y stock mínimo por variante
          </p>
        </div>

        {/* FILTROS */}
        <div className="flex flex-wrap gap-3 items-center">
          <input
            placeholder="Buscar por nombre..."
            className="input-base input-normal w-64"
            value={filtros.nombre}
            onChange={(e) =>
              setFiltros({ ...filtros, nombre: e.target.value, pagina: 0 })
            }
          />

          <select
            className="input-base input-normal w-56"
            value={filtros.categoriaId}
            onChange={(e) =>
              setFiltros({ ...filtros, categoriaId: e.target.value, pagina: 0 })
            }
          >
            <option value="">Todas las categorías</option>
            {/* Se cargan desde back cuando lo conecten */}
          </select>

          <select
            className="input-base input-normal w-56"
            value={filtros.tipoId}
            onChange={(e) =>
              setFiltros({ ...filtros, tipoId: e.target.value, pagina: 0 })
            }
          >
            <option value="">Todas las subcategorías</option>
          </select>

          <button
            onClick={() =>
              setFiltros({
                ...filtros,
                stockBajo: !filtros.stockBajo,
                pagina: 0,
              })
            }
            className="input-base w-auto px-4 flex items-center gap-2 hover:bg-gray-100"
          >
            <span className="text-danger text-sm">⚠</span>
            <span className="text-sm">Stock bajo</span>
          </button>
        </div>

        {/* TABLA */}
        <div className="bg-white border rounded-xl shadow p-4 overflow-x-auto">
          {loading ? (
            <p className="text-center text-gray-500 py-6">
              Cargando productos...
            </p>
          ) : productos.length === 0 ? (
            <p className="text-center text-gray-500 py-6">
              No se encontraron productos
            </p>
          ) : (
            <table className="w-full text-sm">
              <thead className="border-b">
                <tr>
                  <th className="text-left py-2">Producto</th>
                  <th>Categoría</th>
                  <th>Subcategoría</th>
                  <th className="text-center">Precio</th>
                  <th className="text-center">Estado</th>
                  <th className="text-center">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {productos.map((p) => {
                  const stockBajo = p.detalles?.some(
                    (d) => d.stockActual < d.stockMinimo
                  );

                  return (
                    <tr key={p.id} className="border-b">
                      <td className="py-3">
                        {p.nombre}
                        <p className="text-xs text-gray-500">
                          {p.descripcion}
                        </p>
                      </td>

                      <td>{p.categoria?.descripcion ?? "-"}</td>
                      <td>{p.tipoDePrenda?.descripcion ?? "-"}</td>

                      <td className="text-center">${p.precio}</td>

                      <td
                        className={`text-center font-semibold ${
                          stockBajo ? "text-danger" : "text-green-600"
                        }`}
                      >
                        {stockBajo ? "⚠ Bajo stock" : "OK"}
                      </td>

                      <td className="text-center">
                        <button
                          onClick={() => setProductoDetalle(p)}
                          className="px-3 py-1 border rounded hover:bg-gray-100"
                        >
                          Detalle
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
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
