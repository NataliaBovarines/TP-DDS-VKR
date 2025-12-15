import { useState } from "react";
import InputField from "./InputField";
import Button from "./Button";
import logo from "../assets/logo.png";

export default function LoginBox({ onLogin, onRegister }) {
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // login inválido,después viene del backend
    const loginValido = false;

    if (!loginValido) {
      setError("Usuario y/o contraseña incorrectos");
      return;
    }

    setError("");
    onLogin?.();
  };

  return (
    <div className="bg-white p-10 rounded-2xl shadow-lg w-[380px] text-center">
      {/* Logo y título */}
      <div className="flex flex-col items-center mb-8">
        <img src={logo} alt="VKR logo" className="w-14 mb-2" />
        <h2 className="text-xl font-semibold text-gray-800">
          Gestor de Ventas
        </h2>
        <p className="text-sm text-gray-500">
          Sistema de administración VKR
        </p>
      </div>

      {/* Formulario */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <InputField
          label="Usuario"
          placeholder="Ingresa tu usuario"
        />

        <InputField
          label="Contraseña"
          type="password"
          placeholder="Ingresa tu contraseña"
        />

        {/* mensaje error */}
        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md py-2">
            {error}
          </p>
        )}

        {/* Botón principal */}
        <Button
          text="Acceder al Sistema"
          type="submit"
        />

        {/* Botón secundario */}
        <button
          type="button"
          onClick={onRegister}
          className="w-full border border-gray-300 text-gray-600 py-2 rounded-xl
                     hover:bg-gray-100 transition text-sm font-medium"
        >
          Registrarse
        </button>
      </form>

      <p className="text-xs text-gray-400 text-center mt-8">
        © 2025 VKR. Todos los derechos reservados.
      </p>
    </div>
  );
}
