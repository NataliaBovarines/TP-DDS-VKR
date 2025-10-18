/*
import InputField from "./InputField";
import Button from "./Button";
import logo from "../assets/logo.png";

export default function LoginBox() {
  return (
    <div className="bg-white p-10 rounded-2xl shadow-lg w-[380px] text-center">
      {/* Logo y título */     /*}
      <div className="flex flex-col items-center mb-8">
        <img src={logo} alt="VKR logo" className="w-14 mb-2" />
        <h2 className="text-xl font-semibold text-gray-800">
          Gestor de Ventas
        </h2>
        <p className="text-sm text-gray-500">
          Sistema de administración VKR
        </p>
      </div>

      {/* Formulario */    /*}
      <form className="space-y-5">
        <InputField label="Usuario" placeholder="Ingresa tu usuario" />
        <InputField
          label="Contraseña"
          type="password"
          placeholder="Ingresa tu contraseña"
        />
        <Button text="Acceder al Sistema" />
      </form>

      <p className="text-xs text-gray-400 text-center mt-8">
        © 2025 VKR. Todos los derechos reservados.
      </p>
    </div>
  );
}*/
import InputField from "./InputField";
import Button from "./Button";
import logo from "../assets/logo.png";

export default function LoginBox({ onLogin }) {
  const handleSubmit = (e) => {
    e.preventDefault(); // evita que se recargue la página
    onLogin?.(); // llama la función que viene desde App.jsx (si existe)
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
      <form className="space-y-5" onSubmit={handleSubmit}>
        <InputField label="Usuario" placeholder="Ingresa tu usuario" />
        <InputField
          label="Contraseña"
          type="password"
          placeholder="Ingresa tu contraseña"
        />
        <Button text="Acceder al Sistema" type="submit" />
      </form>

      <p className="text-xs text-gray-400 text-center mt-8">
        © 2025 VKR. Todos los derechos reservados.
      </p>
    </div>
  );
}

