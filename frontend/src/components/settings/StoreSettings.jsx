import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import ConfiguracionService from "../../services/configuracionService.js";

export default function StoreSettings() {
  const [loading, setLoading] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);
  const [saving, setSaving] = useState(false);

  const [nombreEmpresa, setNombreEmpresa] = useState("");
  const [permiteReserva, setPermiteReserva] = useState(true);
  const [porcentajeSena, setPorcentajeSena] = useState(0);
  const [diasValidez, setDiasValidez] = useState(0);
  const [stockMinimo, setStockMinimo] = useState(0);
  const [tiempoCancelacion, setTiempoCancelacion] = useState(0);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const data = await ConfiguracionService.getConfiguracion();
        setNombreEmpresa(data.nombreEmpresa || "");
        setPermiteReserva(data.permiteReserva);
        setPorcentajeSena(data.porcentajeMinimoSena * 100);
        setDiasValidez(data.diasValidezReserva);
        setStockMinimo(data.stockMinimoGlobal);
        setTiempoCancelacion(data.tiempoMaximoCancelacionMeses);

        setTimeout(() => setHasChanges(false), 150);
      } catch (error) {
        console.error("Error cargando configuración:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchConfig();
  }, []);

  useEffect(() => {
    if (!loading) {
      setHasChanges(true);
    }
  }, [
    loading,
    nombreEmpresa,
    permiteReserva,
    porcentajeSena,
    diasValidez,
    stockMinimo,
    tiempoCancelacion,
  ]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        nombreEmpresa: nombreEmpresa.trim(),
        permiteReserva,
        porcentajeMinimoSena: parseFloat(porcentajeSena) / 100,
        diasValidezReserva: parseInt(diasValidez),
        stockMinimoGlobal: parseInt(stockMinimo),
        tiempoMaximoCancelacionMeses: parseInt(tiempoCancelacion),
      };

      await ConfiguracionService.actualizarConfiguracion(payload);
      setHasChanges(false);
    } catch (error) {
      console.error("Error al guardar:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-10 text-center text-gray-500">Cargando configuración...</div>;

  return (
    <div className="space-y-6 text-[#6B5D58]">
      <hr className="border-gray-100" />

      {/* Switch Permite reserva */}
      <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl">
        <div>
          <span className="text-sm font-semibold text-[#1D1D1D]">Habilitar sistema de reservas</span>
          <p className="text-xs text-gray-500">Permite a los clientes señar productos</p>
        </div>
        <button
          onClick={() => setPermiteReserva(!permiteReserva)}
          className={`w-11 h-6 flex items-center rounded-full px-1 transition duration-300 ${
            permiteReserva ? "bg-[#2431E7]" : "bg-gray-300"
          }`}
        >
          <span
            className={`w-4 h-4 bg-white rounded-full shadow transform transition duration-300 ${
              permiteReserva ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      <hr className="border-gray-100" />
      
      {/* Nombre de la Empresa */}
      <div>
        <label className="label text-[#1D1D1D]">Nombre de la Empresa</label>
        <input
          type="text"
          maxLength={100}
          className="input-base input-blue"
          value={nombreEmpresa}
          onChange={(e) => setNombreEmpresa(e.target.value)}
          placeholder="Ej: Mi Tienda VKR"
        />
      </div>

      {/* Ajustes de Reserva */}
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 transition-opacity duration-300 ${!permiteReserva ? "opacity-40 pointer-events-none" : "opacity-100"}`}>
        <div>
          <label className="label text-xs">Porcentaje de seña (%)</label>
          <input
            type="number"
            min="0"
            max="100"
            className="input-base input-blue"
            value={porcentajeSena}
            onChange={(e) => setPorcentajeSena(e.target.value)}
          />
        </div>
        <div>
          <label className="label text-xs">Días de validez</label>
          <input
            type="number"
            min="1"
            className="input-base input-blue"
            value={diasValidez}
            onChange={(e) => setDiasValidez(e.target.value)}
          />
        </div>
      </div>

      {/* Stock y Cancelación */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="label">Stock mínimo global</label>
          <input
            type="number"
            min="0"
            className="input-base input-blue"
            value={stockMinimo}
            onChange={(e) => setStockMinimo(e.target.value)}
          />
        </div>
        <div>
          <label className="label">Plazo de cancelación (meses)</label>
          <input
            type="number"
            min="0"
            className="input-base input-blue"
            value={tiempoCancelacion}
            onChange={(e) => setTiempoCancelacion(e.target.value)}
          />
        </div>
      </div>

      {/* Footer Acciones */}
      <div className="flex items-center justify-between pt-6 border-t mt-4">
        <div className="flex items-center gap-2 text-sm">
          {hasChanges ? (
            <span className="flex items-center gap-2 text-amber-600 font-medium animate-pulse">
              <Check size={16} /> Cambios pendientes
            </span>
          ) : (
            <span className="text-gray-400">Configuración al día</span>
          )}
        </div>

        <button
          onClick={handleSave}
          className="btn btn-primary-blue w-auto px-10"
          disabled={!hasChanges || saving}
        >
          {saving ? "Guardando..." : "Guardar cambios"}
        </button>
      </div>
    </div>
  );
}
