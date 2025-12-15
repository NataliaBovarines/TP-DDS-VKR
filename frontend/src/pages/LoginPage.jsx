/*import LoginBox from "../components/LoginBox";
import fondo from "../assets/fondo.jpg";

export default function LoginPage() {
  return (
    <div className="flex h-screen font-sans">
      {/* Lado izquierdo: login *//*}
      <div className="w-1/2 flex justify-center items-center bg-gray-50">
        <LoginBox />
      </div>

      {/* Lado derecho: fondo con texto *//*}
      <div
        className="w-1/2 relative flex flex-col justify-center items-center text-center text-white p-12"
        style={{
          backgroundImage: `url(${fondo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Capa semitransparente encima del fondo *//*}
        <div className="absolute inset-0 bg-orange-900 opacity-60"></div>

        {/* Contenido principal *//*}
        <div className="relative z-10 max-w-md">
          <h2 className="text-3xl font-semibold mb-4 tracking-wide">
            Bienvenido a VKR
          </h2>
          <p className="text-sm mb-8 leading-relaxed">
            Gestiona tu inventario, reservas y equipo desde un solo lugar. 
            Mantén el control total de tu negocio con nuestro sistema integral.
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-sm font-medium">
            <span className="bg-white/20 px-4 py-2 rounded-md backdrop-blur-sm hover:bg-white/30 transition">
              Control de Inventario
            </span>
            <span className="bg-white/20 px-4 py-2 rounded-md backdrop-blur-sm hover:bg-white/30 transition">
              Gestión de Reservas
            </span>
            <span className="bg-white/20 px-4 py-2 rounded-md backdrop-blur-sm hover:bg-white/30 transition">
              Administración de Personal
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
*/
import React, { useState } from "react";
import LoginBox from "../components/LoginBox";
import RegisterBox from "../components/RegisterBox";
import fondo from "../assets/fondo.jpg";

export default function LoginPage({ onLogin }) {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="flex h-screen font-sans relative">
      
      {/* Lado izquierdo: login */}
      <div className="w-1/2 flex justify-center items-center bg-gray-50 relative">
        <div className={showRegister ? "blur-sm pointer-events-none" : ""}>
          <LoginBox
            onLogin={onLogin}
            onRegister={() => setShowRegister(true)}
          />
        </div>
      </div>

      {/* Lado derecho: fondo con texto */}
      <div
        className={`w-1/2 relative flex flex-col justify-center items-center text-center text-white p-12 ${
          showRegister ? "blur-sm" : ""
        }`}
        style={{
          backgroundImage: `url(${fondo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Capa semitransparente encima del fondo */}
        <div className="absolute inset-0 bg-orange-900 opacity-60"></div>

        {/* Contenido principal */}
        <div className="relative z-10 max-w-md">
          <h2 className="text-3xl font-semibold mb-4 tracking-wide">
            Bienvenido a VKR
          </h2>
          <p className="text-sm mb-8 leading-relaxed">
            Gestiona tu inventario, reservas y equipo desde un solo lugar.
            Mantén el control total de tu negocio con nuestro sistema integral.
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-sm font-medium">
            <span className="bg-white/20 px-4 py-2 rounded-md backdrop-blur-sm hover:bg-white/30 transition">
              Control de Inventario
            </span>
            <span className="bg-white/20 px-4 py-2 rounded-md backdrop-blur-sm hover:bg-white/30 transition">
              Gestión de Reservas
            </span>
            <span className="bg-white/20 px-4 py-2 rounded-md backdrop-blur-sm hover:bg-white/30 transition">
              Administración de Personal
            </span>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showRegister && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <RegisterBox
            onRegister={() => console.log("Registrar")}
            onBack={() => setShowRegister(false)}
          />
        </div>
      )}
    </div>
  );
}

