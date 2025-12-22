import { useState, useEffect } from "react";
import { Check } from "lucide-react";

export default function UserSettings() {
  const [rol, setRol] = useState("Administrador");
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setHasChanges(true);
  }, [rol]);

  return (
    <div className="space-y-6 text-[#6B5D58]">
      <div>
        <label className="label">Usuario</label>
        <input
          className="input-base input-normal"
          value="usuario ingresado"
          disabled
        />
      </div>

      <div>
        <label className="label">Rol</label>
        <select className="input-base input-blue"

          value={rol}
          onChange={(e) => setRol(e.target.value)}
        >
          <option>Administrador</option>
          <option>Vendedor</option>
        </select>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t">
        <div className="flex items-center gap-2 text-sm">
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

