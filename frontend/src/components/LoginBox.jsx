import { useState } from "react";
import InputField from "./InputField";
import Button from "./Button";
import logo from "../assets/logo.png";

export default function LoginBox({ onLogin, onRegister }) {
  const [usuario, setUsuario] = useState("");
  const [error, setError] = useState("");
  const [hasError, setHasError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const loginValido = usuario.trim().toLowerCase() === "andrea";

    if (!loginValido) {
      setError("Usuario y/o contraseña incorrectos");
      setHasError(true);
      return;
    }

    setError("");
    setHasError(false);
    onLogin?.();
  };

  return (
    <div className="bg-white p-10 rounded-2xl shadow-lg w-[380px] text-center">
      <div className="flex flex-col items-center mb-8">
        <img src={logo} alt="VKR logo" className="w-14 mb-2" />
        <h2 className="text-xl font-semibold text-gray-800">
          Gestor de Ventas
        </h2>
        <p className="text-sm text-gray-500">
          Sistema de administración VKR
        </p>
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md py-2 mb-4">
          {error}
        </p>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <InputField
          label="Usuario"
          placeholder="Ingresa tu usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          error={hasError}
        />

        <InputField
          label="Contraseña"
          type="password"
          placeholder="Ingresa tu contraseña"
          error={hasError}
        />

        <Button text="Acceder al Sistema" variant="primary" className="ring-0" />


{/*
        <Button
          text="Registrarse"
          type="button"
          variant="outline"
          onClick={onRegister}
        />
        */}
      </form>

      <p className="text-xs text-gray-400 text-center mt-8">
        © 2025 VKR. Todos los derechos reservados.
      </p>
    </div>
  );
}