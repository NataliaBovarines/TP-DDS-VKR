import { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; 

export default function InputField({ label, type = "text", placeholder }) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="flex flex-col text-left relative">
      <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>

      <div className="relative">
        <input
          type={isPassword && showPassword ? "text" : type}
          placeholder={placeholder}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full
                     focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500
                     transition-colors duration-300 pr-10"
        />

        {/* 👁️ Ícono de mostrar/ocultar contraseña */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
