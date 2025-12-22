import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  ClipboardList,
  Package,
  Users,
  UserRound,
  User,
  Settings,
} from "lucide-react";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const links = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Ventas", path: "/ventas", icon: ShoppingCart },
    { name: "Reservas", path: "/reservas", icon: ClipboardList },
    { name: "Productos", path: "/productos", icon: Package },
    { name: "Empleados", path: "/empleados", icon: Users },
    { name: "Clientes", path: "/clientes", icon: UserRound },
  ];

  return (
    <header className="flex items-center justify-between px-8 py-3 bg-[#DBDBDB]">
      {/* Logo */}
      <img src="/logo.png" alt="VKR" className="w-7 h-7" />

      {/* Navegación */}
      <nav className="flex items-center gap-2">
        {links.map((link) => {
          const active = location.pathname === link.path;
          const Icon = link.icon;

          return (
            <Link
              key={link.name}
              to={link.path}
              className={`
                flex items-center gap-2
                px-4 py-1.5
                rounded-lg
                text-sm font-medium
                no-underline
                transition-all
                ${active
                  ? "bg-[#EEEEEE] text-[#1D1D1D]"
                  : "text-[#6B5D58] hover:text-[#1D1D1D]"}
              `}
            >
              <Icon size={16} strokeWidth={1.8} />
              {link.name}
            </Link>
          );
        })}
      </nav>

      {/* Acciones derecha */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("/settings")}
          className="text-[#6B5D58] hover:text-[#1D1D1D] transition-colors focus:outline-none focus:ring-0 bg-transparent border-none p-0"
          aria-label="Configuración"
        >
          <Settings size={18} strokeWidth={1.8} />
        </button>

        <button
          className="text-[#6B5D58] hover:text-[#1D1D1D] transition-colors focus:outline-none focus:ring-0 bg-transparent border-none p-0"
          aria-label="Perfil"
        >
          <User size={18} strokeWidth={1.8} />
        </button>
      </div>
    </header>
  );
}
