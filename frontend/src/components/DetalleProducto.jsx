import { useState } from "react";
import ProductoService from "../services/productoService";

export default function DetalleProducto({ producto, onClose, onUpdate }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleActualizarDetalle(detalleId, cambios) {
    try {
      setLoading(true);
      await ProductoService.actualizarDetalleProducto(producto.id, detalleId, cambios);
      await onUpdate(); // recarga productos desde back
    } catch (e) {
      console.error(e);
      // alert("Error actualizando stock");
    } finally {
      setLoading(false);
    }
  }

  async function handleEliminarProducto() {
    try {
      await ProductoService.eliminarProducto(producto.id);
      onClose();
      onUpdate();
    } catch (e) {
      console.error(e);
      // alert("Error eliminando producto");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-xl p-6">

        {/* HEADER */}
        <div className="flex justify-between items-start mb-5">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {producto.nombre}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {producto.descripcion}
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 text-xl"
          >
            ✕
          </button>
        </div>

        {/* INFO GENERAL */}
        <div className="grid grid-cols-2 gap-4 text-sm mb-6">
          <div>
            <span className="text-gray-500">Categoría</span>
            <p className="font-medium">
              {producto.categoria?.descripcion ?? "-"}
            </p>
          </div>

          <div>
            <span className="text-gray-500">Subcategoría</span>
            <p className="font-medium">
              {producto.tipoDePrenda?.descripcion ?? "-"}
            </p>
          </div>

          <div>
            <span className="text-gray-500">Proveedor</span>
            <p className="font-medium">
              {producto.proveedor?.nombre ?? "-"}
            </p>
          </div>

          <div>
            <span className="text-gray-500">Precio</span>
            <p className="font-medium">${producto.precio}</p>
          </div>
        </div>

        {/* VARIANTES */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Variantes
          </h3>

          <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="py-2 px-3 text-left">Color</th>
                  <th className="py-2 px-3 text-left">Talle</th>
                  <th className="py-2 px-3 text-center">Stock</th>
                  <th className="py-2 px-3 text-center">Mínimo</th>
                  <th className="py-2 px-3 text-center">Acción</th>
                </tr>
              </thead>

              <tbody>
                {producto.detalles?.map((d) => {
                  const bajoStock = d.stockActual < d.stockMinimo;

                  return (
                    <tr key={d.id} className="border-b last:border-0">
                      <td className="py-2 px-3">
                        {d.color?.descripcion ?? "-"}
                      </td>

                      <td className="py-2 px-3">
                        {d.talle?.descripcion ?? "-"}
                      </td>

                      <td
                        className={`py-2 px-3 text-center font-semibold ${
                          bajoStock ? "text-warning" : ""
                        }`}
                      >
                        {bajoStock && <span className="mr-1">⚠</span>}
                        {d.stockActual}
                      </td>

                      <td className="py-2 px-3 text-center">
                        {d.stockMinimo}
                      </td>

                      <td className="py-2 px-3 text-center space-x-2">
                        <button
                          disabled={loading}
                          onClick={() =>
                            handleActualizarDetalle(d.id, {
                              stockAumento: 1,
                            })
                          }
                          className="px-2 py-1 border rounded hover:bg-gray-100"
                        >
                          +1
                        </button>

                        <button
                          disabled={loading}
                          onClick={() =>
                            handleActualizarDetalle(d.id, {
                              stockMinimo: d.stockMinimo + 1,
                            })
                          }
                          className="px-2 py-1 border rounded hover:bg-gray-100"
                        >
                          ↑ mín
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* ZONA PELIGROSA */}
        <div className="border-t pt-4 mt-4">
          <p className="text-sm text-gray-600 mb-2">
            ⚠️ Acciones avanzadas
          </p>

          {!confirmDelete ? (
            <button
              onClick={() => setConfirmDelete(true)}
              className="btn bg-danger text-white w-auto px-5"
            >
              Eliminar producto
            </button>
          ) : (
            <div className="mt-3 space-y-3">
              <p className="text-sm text-gray-700">
                Esta acción es irreversible.  
                Escribí <b>ELIMINAR</b> para confirmar.
              </p>

              <input
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                className="input-base input-error w-64"
                placeholder="ELIMINAR"
              />

              <div className="flex gap-3">
                <button
                  disabled={confirmText !== "ELIMINAR"}
                  onClick={handleEliminarProducto}
                  className="btn bg-danger text-white w-auto px-5 disabled:opacity-40"
                >
                  Confirmar eliminación
                </button>

                <button
                  onClick={() => {
                    setConfirmDelete(false);
                    setConfirmText("");
                  }}
                  className="btn btn-outline w-auto px-5"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
