import InputField from "./InputField";
import Button from "./Button";
import logo from "../assets/logo.png";

export default function RegisterBox({ onRegister, onBack }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister?.();
  };

  return (
    <div className="bg-white p-10 rounded-2xl shadow-lg w-[380px] text-center">
      {/* Logo y título */}
      <div className="flex flex-col items-center mb-8">
        <img src={logo} alt="VKR logo" className="w-14 mb-2" />
        <h2 className="text-xl font-semibold text-gray-800">
          Registro de Usuario
        </h2>
        <p className="text-sm text-gray-500">
          Creá tu cuenta para acceder al sistema
        </p>
      </div>

      {/* Formulario */}
      <form className="space-y-5" onSubmit={handleSubmit}>
        <InputField
          label="Nombre de usuario"
          placeholder="Ingresá tu usuario"
        />

        <InputField
          label="Contraseña"
          type="password"
          placeholder="Ingresá una contraseña"
        />

        <InputField
          label="Confirmar contraseña"
          type="password"
          placeholder="Repetí la contraseña"
        />

        {/* Botón principal */}
        <Button text="Registrarse" type="submit" />

        {/* Volver */}
        

        <button
          type="button"
          onClick={onBack}
          className="w-full border border-gray-300 text-gray-600 py-2 rounded-xl
                         hover:bg-gray-100 transition text-sm font-medium"
        >
        Volver al login
        </button>

        
      </form>
    </div>
  );
}
