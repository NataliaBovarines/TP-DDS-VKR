
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Ventas from './pages/Ventas';
import Reservas from './pages/Reservas';
import Productos from './pages/Productos';
import Empleados from './pages/Empleados';
import Clientes from './pages/Clientes';
import Configuracion from './pages/Configuracion';
import Usuario from './pages/Usuario';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext.js';
import GlobalErrorModal from './components/GlobalErrorModal';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <GlobalErrorModal />
        <Router>
          <Routes>
            {/* Ruta pública */}
            <Route path="/login" element={<Login />} />

            {/* Rutas privadas envueltas */}
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/ventas" element={<Ventas />} />
                      <Route path="/reservas" element={<Reservas />} />
                      <Route path="/productos" element={<Productos />} />
                      <Route path="/empleados" element={<Empleados />} />
                      <Route path="/clientes" element={<Clientes />} />
                      <Route path="/configuracion" element={<Configuracion />} />
                      <Route path="/usuario" element={<Usuario />} />
                      
                      {/* Redirecciones automáticas dentro del sistema */}
                      <Route path="/" element={<Navigate to="/dashboard" replace />} />
                      <Route path="*" element={<Navigate to="/dashboard" replace />} />
                    </Routes>
                  </Layout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
    </AuthProvider>
  );
};

export default App;

