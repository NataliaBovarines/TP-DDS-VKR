import React, { createContext, useContext, useState, useEffect } from 'react';
import AuthService from '../services/authService.js';

interface AuthContextType {
  user: any;
  permisos: string[];
  loading: boolean;
  tienePermiso: (codigo: string) => boolean;
  recargarSesion: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [permisos, setPermisos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const cargarDatos = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const userData = await AuthService.getMe();
      setUser(userData);

      if (userData?.rol?.permisos) {
        const codigos = userData.rol.permisos.map((p: any) => p.codigo);
        setPermisos(codigos);
      }
    } catch (error) {
      console.error("Error al sincronizar sesión:", error);
      AuthService.logout(); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const tienePermiso = (codigo: string) => {
    return permisos.includes(codigo);
  };

  return (
    <AuthContext.Provider value={{ user, permisos, loading, tienePermiso, recargarSesion: cargarDatos }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
};
