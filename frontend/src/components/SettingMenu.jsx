import { useState } from "react";
import { Link } from "react-router-dom";

export default function SettingsMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-1 text-gray-700 hover:text-black"
      >
        <span>⚙️</span>
        <span>Configuración</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-md">
          <Link
            to="/settings"
            className="block px-3 py-2 text-sm hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            Variables del sistema
          </Link>
          <Link
            to="/"
            className="block px-3 py-2 text-sm hover:bg-gray-100 text-red-500"
            onClick={() => setOpen(false)}
          >
            Cerrar sesión
          </Link>
        </div>
      )}
    </div>
  );
}
