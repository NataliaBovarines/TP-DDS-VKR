import { useState, useEffect } from "react";
import ProductoService from "../services/productoService.js";
import ModalEditarNumero from "./modals/ModalEditarNumero";
import {
  IconEdit,
  IconClose,
  IconWarning,
  IconDelete,
} from "./icons";

export default function DetalleProducto({ producto, onClose, onUpdate }) {
  const [varianteEditando, setVarianteEditando] = useState(null);

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  const [loading, setLoading] = useState(false);

  const [productoLocal, setProductoLocal] = useState(producto);

  useEffect(() => {
    setProductoLocal(producto);
  }, [producto]);

  async function handleActualizarDetalle(detalleId, cambios) {
    try {
      setLoading(true);

      const detalleActualizado =
        await ProductoService.actualizarDetalleProducto(
          productoLocal.id,
          detalleId,
          cambios
        );

      setProductoLocal(prev => ({
        ...prev,
        detalles: prev.detalles.map(d =>
          d.id === detalleId ? detalleActualizado : d
        )
      }));

      await onUpdate(); // sigue estando bien
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function handleEliminarProducto() {
    try {
      setLoading(true);
      await ProductoService.eliminarProducto(producto.id);
      onClose();
      onUpdate();
    } catch (e) {
      console.error(e);
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

          <IconClose onClick={onClose} />
        </div>

        {/* INFO GENERAL */}
        <div className="grid grid-cols-2 gap-4 text-sm mb-6">
          <div>
            <span className="text-gray-500">Categoría</span>
            <p className="font-medium">{producto.subcategoria?.categoriaDescripcion}</p>
          </div>

          <div>
            <span className="text-gray-500">Subcategoría</span>
            <p className="font-medium">{producto.subcategoria?.descripcion}</p>
          </div>
          <div>
            <span className="text-gray-500">Proveedor</span>
            <p className="font-medium">{producto.proveedor?.descripcion ?? "-"}</p>
          </div>
          <div>
            <span className="text-gray-500">Precio</span>
            <p className="font-medium">${producto.precio}</p>
          </div>
        </div>

        {/* VARIANTES */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Variantes disponibles
          </h3>

          <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="py-2 px-3 text-left">Color</th>
                  <th className="py-2 px-3 text-left">Talle</th>
                  <th className="py-2 px-3 text-center">Stock total</th>
                  <th className="py-2 px-3 text-center">Stock mínimo</th>
                  <th className="py-2 px-3 text-center">Stock reservado</th>
                  <th className="py-2 px-3 text-center">Acción</th>
                </tr>
              </thead>

              <tbody>
                {productoLocal.detalles.map((v, idx) => (
                  <tr key={idx} className="border-b last:border-0">
                    <td className="py-2 px-3">{v.color?.descripcion ?? "-"}</td>
                    <td className="py-2 px-3">{v.talle?.descripcion ?? "-"}</td>

                    <td
                      className={`py-2 px-3 text-center ${
                        v.stockActual < v.stockMinimo ? "text-danger" : ""
                      }`}
                    >
                      {v.stockActual < v.stockMinimo && (
                        <IconWarning size={14} className="mr-1" />
                      )}
                      {v.stockActual}
                    </td>

                    <td className="py-2 px-3 text-center">{v.stockMinimo}</td>
                    <td className="py-2 px-3 text-center">{v.stockReservado}</td>

                    <td className="py-2 px-3 text-center">
                      <IconEdit
                        title="Editar stock"
                        size={14}
                        onClick={() => !loading && setVarianteEditando({ ...v, idx })}
                      />
                      <IconEdit
                        title="Editar stock mínimo"
                        size={14}
                        className="ml-2"
                        onClick={() => !loading && setVarianteEditando({ ...v, idx, modo: "stockMinimo" })}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ZONA PELIGROSA */}
        <div className="border-t pt-4 mt-4 flex justify-end">
          <div className="text-right space-y-3">
            <p className="text-sm text-gray-600 flex items-center justify-end gap-2">
              <IconWarning size={14} />
              Acciones avanzadas
            </p>

            {!confirmDelete ? (
              <button
                onClick={() => setConfirmDelete(true)}
                className="btn bg-danger text-white w-auto px-5 flex items-center gap-2"
              >
                <IconDelete className="text-white" />
                Eliminar producto
              </button>
            ) : (
              <div className="space-y-3">
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

                <div className="flex gap-3 justify-end">
                  <button
                    disabled={confirmText !== "ELIMINAR" || loading}
                    onClick={handleEliminarProducto}
                    className="btn bg-danger text-white w-auto px-5 disabled:opacity-40"
                  >
                    {loading ? "Eliminando..." : "Confirmar eliminación"}
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

      {/* MODALES */}
      {varianteEditando && varianteEditando.modo !== "stockMinimo" && (
        <ModalEditarNumero
          titulo="Aumentar stock"
          descripcion={`${varianteEditando.color?.descripcion ?? "-"} · ${varianteEditando.talle?.descripcion ?? "-"}`}
          valorInicial={0}
          onClose={() => setVarianteEditando(null)}
          onSave={async (valor) => {
            await handleActualizarDetalle(varianteEditando.id, {
              stockAumento: Number(valor),
            });
            setVarianteEditando(null);
          }}
        />
      )}

      {varianteEditando && varianteEditando.modo === "stockMinimo" && (
        <ModalEditarNumero
          titulo="Editar stock mínimo"
          descripcion="Este valor se aplica a la variante"
          valorInicial={varianteEditando.stockMinimo}
          onClose={() => setVarianteEditando(null)}
          onSave={async (valor) => {
            await handleActualizarDetalle(varianteEditando.id, {
              stockMinimo: Number(valor),
            });
            setVarianteEditando(null);
          }}
        />
      )}
    </div>
  );
}
