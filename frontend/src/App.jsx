

import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import Ventas from "./pages/Ventas";
import Reservas from "./pages/Reservas";
import Empleados from "./pages/Empleados";
import Productos from "./pages/Productos";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Página de login */}
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" />
            ) : (
              <LoginPage onLogin={() => setIsLoggedIn(true)} />
            )
          }
        />

        {/* Dashboard y páginas internas protegidas */}
        {isLoggedIn ? (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/ventas" element={<Ventas />} />
            <Route path="/reservas" element={<Reservas />} />
            <Route path="/empleados" element={<Empleados />} />
            <Route path="/productos" element={<Productos />} />
          </>
        ) : (
          // Si intenta entrar sin login, lo redirige al login
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>
    </Router>
  );
}
