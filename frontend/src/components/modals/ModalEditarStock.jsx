import { useState } from "react";

export default function ModalEditarStock({ variante, onClose, onSave }) {
  const [nuevoStock, setNuevoStock] = useState(variante.stock);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">

        <h3 className="text-lg font-semibold mb-2">Editar stock</h3>
        <p className="text-sm text-gray-600 mb-4">
          {variante.color} · {variante.talle}
        </p>

        <input
          type="number"
          className="w-full px-3 py-2 border rounded-lg"
          value={nuevoStock}
          onChange={(e) => setNuevoStock(Number(e.target.value))}
        />

        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            Cancelar
          </button>

          <button
            onClick={() => onSave(nuevoStock)}
            className="px-4 py-2 bg-black text-white rounded-lg"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
