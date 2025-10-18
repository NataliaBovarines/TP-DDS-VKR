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
import React from "react";
import LoginBox from "../components/LoginBox";
import fondo from "../assets/fondo.jpg";

export default function LoginPage({ onLogin }) {
  return (
    <div className="flex h-screen font-sans">
      {/* Lado izquierdo: login */}
      <div className="w-1/2 flex justify-center items-center bg-gray-50">
        <LoginBox onLogin={onLogin} /> {/* 👈 acá pasás la función */}
      </div>

      {/* Lado derecho: fondo con texto */}
      <div
        className="w-1/2 relative flex flex-col justify-center items-center text-center text-white p-12"
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
    </div>
  );
}
