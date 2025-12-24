
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  CalendarCheck, 
  Package, 
  Users, 
  UserSquare, 
  Settings, 
  UserCircle,
  LogOut,
  PlusCircle,
  Menu,
  X
} from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Ventas', path: '/ventas', icon: ShoppingCart },
    { name: 'Reservas', path: '/reservas', icon: CalendarCheck },
    { name: 'Productos', path: '/productos', icon: Package },
    { name: 'Clientes', path: '/clientes', icon: UserSquare },
    { name: 'Empleados', path: '/empleados', icon: Users },
  ];

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  if (location.pathname === '/login') return <>{children}</>;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <header className="bg-slate-900 text-white sticky top-0 z-50 shadow-md border-b border-slate-800">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-24 flex items-center justify-between">
          <div className="flex items-center gap-6 lg:gap-8">
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors"
            >
              <Menu className="w-8 h-8" />
            </button>

            <div className="flex items-center gap-4 cursor-pointer group" onClick={() => navigate('/')}>
              <div className="w-11 h-11 bg-indigo-600 rounded-xl flex items-center justify-center font-bold text-2xl transition-transform group-hover:scale-105">V</div>
              <span className="text-2xl font-black tracking-tight hidden sm:block">Vikiara</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-2">
              {menuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-4 py-2.5 rounded-xl text-base font-bold transition-all
                    ${isActive ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-800'}
                  `}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4 sm:gap-8">
            <button 
              onClick={() => navigate('/ventas', { state: { view: 'POS' } })}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 sm:px-7 py-3 rounded-xl text-base font-bold flex items-center gap-3 shadow-lg shadow-emerald-500/10 transition-all active:scale-95"
            >
              <PlusCircle className="w-5 h-5" />
              <span>Nueva Venta</span>
            </button>

            <div className="flex items-center gap-3 sm:gap-5">
              <NavLink to="/configuracion" className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all hidden sm:block">
                <Settings className="w-7 h-7" />
              </NavLink>
              
              <div className="relative">
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-3 sm:gap-5 pl-3 sm:pl-6 border-l border-slate-700 group"
                >
                  <div className="text-right hidden md:block">
                    <p className="text-sm font-black text-white group-hover:text-indigo-400 transition-colors uppercase tracking-tight">Admin</p>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Dueño</p>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 group-hover:border-indigo-500 transition-all">
                    <UserCircle className="w-7 h-7" />
                  </div>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-4 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 py-3 z-50 animate-in fade-in slide-in-from-top-3">
                    <div className="px-6 py-4 border-b border-slate-50 mb-2">
                      <p className="text-base font-black text-slate-900 tracking-tight">Administrador VKR</p>
                    </div>
                    <NavLink to="/usuario" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-4 px-6 py-4 text-base font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-all">
                      <UserCircle className="w-5 h-5" /> Mi Perfil
                    </NavLink>
                    <NavLink to="/configuracion" onClick={() => setIsUserMenuOpen(false)} className="sm:hidden flex items-center gap-4 px-6 py-4 text-base font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-all">
                      <Settings className="w-5 h-5" /> Configuración
                    </NavLink>
                    <div className="h-px bg-slate-100 my-2"></div>
                    <button onClick={() => navigate('/login')} className="w-full flex items-center gap-4 px-6 py-4 text-base font-bold text-rose-600 hover:bg-rose-50 transition-all text-left">
                      <LogOut className="w-5 h-5" /> Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-900/70 backdrop-blur-md animate-in fade-in duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="absolute top-0 left-0 bottom-0 w-[300px] bg-slate-900 shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
            <div className="h-24 px-8 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-bold text-xl text-white">V</div>
                <span className="text-white text-xl font-black tracking-tight">Menú Principal</span>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-slate-400 hover:text-white"
              >
                <X className="w-7 h-7" />
              </button>
            </div>

            <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
              {menuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center gap-5 px-5 py-5 rounded-2xl text-lg font-bold transition-all
                    ${isActive ? 'bg-indigo-600 text-white shadow-xl' : 'text-slate-400 hover:text-white hover:bg-slate-800'}
                  `}
                >
                  <item.icon className="w-6 h-6" />
                  {item.name}
                </NavLink>
              ))}
            </nav>

            <div className="p-6 border-t border-slate-800">
              <button 
                onClick={() => navigate('/login')}
                className="w-full flex items-center gap-5 px-5 py-5 rounded-2xl text-lg font-bold text-rose-500 hover:bg-rose-500/10 transition-all"
              >
                <LogOut className="w-6 h-6" />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 max-w-[1600px] w-full mx-auto p-4 sm:p-6 lg:px-10 lg:py-10">
        {children}
      </main>

      <footer className="bg-white border-t border-slate-200 py-6 px-6 sm:px-10 text-xs sm:text-sm font-bold text-slate-400 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-6">
          <span className="uppercase tracking-widest">VKR System v3.1</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-emerald-600">Servidor Activo</span>
          </div>
        </div>
        <span className="text-center">Vikiara Indumentaria &copy; 2024 • Todos los derechos reservados</span>
      </footer>
    </div>
  );
};

export default Layout;
