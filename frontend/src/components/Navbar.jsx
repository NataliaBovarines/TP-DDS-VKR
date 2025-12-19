import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const links = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Ventas", path: "/ventas" },
    { name: "Reservas", path: "/reservas" },
    { name: "Productos", path: "/productos" },
    { name: "Empleados", path: "/empleados" },
    { name: "Clientes", path: "/clientes" },
    { name: "Configuración", path: "/settings" },
  ];

  return (
    <header className="flex justify-between items-center px-6 py-3 border-b bg-white shadow-sm">
      {/* Logo + título */}
      <div className="flex items-center space-x-2">
        <img src="/logo.png" alt="VKR" className="w-6 h-6" />
        <h1 className="font-semibold text-gray-800">Gestor de Ventas VKR</h1>
      </div>

      {/* Navegación */}
      <nav className="flex items-center space-x-4">
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`rounded-md px-3 py-1 text-sm font-semibold transition-all
              ${
                location.pathname === link.path
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 hover:text-black"
              }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}

