import { useState } from "react";

export default function DetalleProducto({ producto, onClose }) {
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
            <p className="font-medium">{producto.categoria}</p>
          </div>
          <div>
            <span className="text-gray-500">Proveedor</span>
            <p className="font-medium">{producto.proveedor}</p>
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
                  <th className="py-2 px-3 text-center">Stock</th>
                  <th className="py-2 px-3 text-center">Acción</th>
                </tr>
              </thead>

              <tbody>
                {producto.variantes.map((v, idx) => (
                  <tr key={idx} className="border-b last:border-0">
                    <td className="py-2 px-3">{v.color}</td>
                    <td className="py-2 px-3">{v.talle}</td>

                    <td
                      className={`py-2 px-3 text-center font-semibold ${
                        v.stock < 5 ? "text-warning" : ""
                      }`}
                    >
                      {v.stock < 5 && (
                        <span className="mr-1">⚠</span>
                      )}
                      {v.stock}
                    </td>

                    <td className="py-2 px-3 text-center">
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
