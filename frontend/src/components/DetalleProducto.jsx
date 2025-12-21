import { useState } from "react";
import ModalEditarStock from "./modals/ModalEditarStock";
import ModalEditarStockMinimo from "./modals/ModalEditarStockMinimo";
import {
  IconEdit,
  IconClose,
  IconWarning,
  IconDelete,
} from "./icons";

export default function DetalleProducto({ producto, onClose }) {
  const [variantes, setVariantes] = useState(producto.variantes);
  const [stockMinimo, setStockMinimo] = useState(producto.stockMinimo ?? 5);

  const [varianteEditando, setVarianteEditando] = useState(null);
  const [editStockMin, setEditStockMin] = useState(false);

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmText, setConfirmText] = useState("");

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
            <p className="font-medium">{producto.categoria}</p>
          </div>

          <div>
            <span className="text-gray-500">Subcategoría</span>
            <p className="font-medium">{producto.subcategoria}</p>
          </div>
          <div>
            <span className="text-gray-500">Proveedor</span>
            <p className="font-medium">{producto.proveedor}</p>
          </div>
          <div>
            <span className="text-gray-500">Precio</span>
            <p className="font-medium">${producto.precio}</p>
          </div>

          {/* STOCK MINIMO */}
          <div>
            <span className="text-gray-500">Stock mínimo</span>
            <div className="flex items-center gap-2 mt-1">
              <p className="font-medium">{stockMinimo}</p>
              <IconEdit
                size={14}
                title="Editar stock mínimo"
                onClick={() => setEditStockMin(true)}
              />
            </div>
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
                  <th className="py-2 px-3 text-center">Stock</th>
                  <th className="py-2 px-3 text-center">Acción</th>
                </tr>
              </thead>

              <tbody>
                {variantes.map((v, idx) => (
                  <tr key={idx} className="border-b last:border-0">
                    <td className="py-2 px-3">{v.color}</td>
                    <td className="py-2 px-3">{v.talle}</td>

                    <td
                      className={`py-2 px-3 text-center font-semibold ${
                        v.stock < stockMinimo ? "text-danger" : ""
                      }`}
                    >
                      {v.stock < stockMinimo && (
                        <IconWarning size={14} className="mr-1" />
                      )}
                      {v.stock}
                    </td>

                    <td className="py-2 px-3 text-center">
                      <IconEdit
                        title="Editar stock"
                        onClick={() => setVarianteEditando({ ...v, idx })}
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
                    disabled={confirmText !== "ELIMINAR"}
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

      {/* MODALES */}
      {varianteEditando && (
        <ModalEditarStock
          variante={varianteEditando}
          onClose={() => setVarianteEditando(null)}
          onSave={(nuevoStock) => {
            const copia = [...variantes];
            copia[varianteEditando.idx].stock = nuevoStock;
            setVariantes(copia);
            setVarianteEditando(null);
          }}
        />
      )}

      {editStockMin && (
        <ModalEditarStockMinimo
          stockMinimo={stockMinimo}
          onClose={() => setEditStockMin(false)}
          onSave={(valor) => {
            setStockMinimo(valor);
            setEditStockMin(false);
          }}
        />
      )}
    </div>
  );
}
