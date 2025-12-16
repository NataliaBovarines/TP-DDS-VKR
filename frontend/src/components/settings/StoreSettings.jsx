import { useState, useEffect } from "react";
import { Check } from "lucide-react";

export default function StoreSettings() {
  const [permiteReserva, setPermiteReserva] = useState(true);
  const [porcentajeSena, setPorcentajeSena] = useState(10);
  const [diasValidez, setDiasValidez] = useState(90);
  const [stockMinimo, setStockMinimo] = useState(5);
  const [limiteSaldo, setLimiteSaldo] = useState(10000);
  const [tiempoCancelacion, setTiempoCancelacion] = useState(1);

  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setHasChanges(true);
  }, [
    permiteReserva,
    porcentajeSena,
    diasValidez,
    stockMinimo,
    limiteSaldo,
    tiempoCancelacion,
  ]);

  return (
    <div className="space-y-6 text-[#6B5D58]">
      {/* Permite reserva */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-[#1D1D1D]">
          Permite reservas
        </span>

        <button
          onClick={() => setPermiteReserva(!permiteReserva)}
          className={`w-11 h-6 flex items-center rounded-full px-1 transition
            ${permiteReserva ? "bg-[#2431E7]" : "bg-gray-300"}
          `}
        >
          <span
            className={`w-4 h-4 bg-white rounded-full shadow transform transition
              ${permiteReserva ? "translate-x-5" : "translate-x-0"}
            `}
          />
        </button>
      </div>

      {/* Porcentaje mínimo de seña */}
      <div
        className={`${!permiteReserva && "opacity-50 pointer-events-none"}`}
      >
        <label className="label">Porcentaje mínimo de seña (%)</label>
        <input
          type="number"
          className="input-base input-blue"
          value={porcentajeSena}
          onChange={(e) => setPorcentajeSena(e.target.value)}
        />
      </div>

      {/* Días validez reserva */}
      <div
        className={`${!permiteReserva && "opacity-50 pointer-events-none"}`}
      >
        <label className="label">Días de validez de reserva</label>
        <input
          type="number"
          className="input-base input-blue"
          value={diasValidez}
          onChange={(e) => setDiasValidez(e.target.value)}
        />
      </div>

      {/* Stock mínimo */}
      <div>
        <label className="label">Stock mínimo global</label>
        <input
          type="number"
          className="input-base input-blue"
          value={stockMinimo}
          onChange={(e) => setStockMinimo(e.target.value)}
        />
      </div>

      {/* Límite saldo a favor */}
      <div>
        <label className="label">Límite de saldo a favor</label>
        <input
          type="number"
          className="input-base input-blue"
          value={limiteSaldo}
          onChange={(e) => setLimiteSaldo(e.target.value)}
        />
      </div>

      {/* Tiempo máximo cancelación */}
      <div>
        <label className="label">Tiempo máximo de cancelación (meses)</label>
        <input
          type="number"
          className="input-base input-blue"
          value={tiempoCancelacion}
          onChange={(e) => setTiempoCancelacion(e.target.value)}
        />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t">
        <div className="flex items-center gap-2 text-sm text-[#6B5D58]">
          {hasChanges && (
            <>
              <div className="w-5 h-5 rounded-full bg-[#2431E7] flex items-center justify-center">
                <Check size={14} className="text-white" />
              </div>
              Cambios sin guardar
            </>
          )}
        </div>

        <button
          className="btn btn-primary-blue w-auto px-6"
          disabled={!hasChanges}
        >
          Guardar cambios
        </button>
      </div>
    </div>
  );
}
