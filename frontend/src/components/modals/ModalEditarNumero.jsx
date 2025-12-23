import { useState, useEffect } from "react";

export default function ModalEditarNumero({ titulo, descripcion, valorInicial, onClose, onSave }) {
  const [valor, setValor] = useState("");

  useEffect(() => {
    setValor(valorInicial ?? 0);
  }, [valorInicial]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">

        <h3 className="text-lg font-semibold mb-2">{titulo}</h3>

        {descripcion && (
          <p className="text-sm text-gray-600 mb-4">
            {descripcion}
          </p>
        )}

        <input
          type="number"
          className="w-full px-3 py-2 border rounded-lg"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />

        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            Cancelar
          </button>

          <button
            onClick={() => onSave(Number(valor))}
            className="px-4 py-2 bg-black text-white rounded-lg"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
