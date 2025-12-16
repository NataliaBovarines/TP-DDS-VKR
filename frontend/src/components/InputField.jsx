import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function InputField({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error = false,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="w-full flex flex-col text-left">
      <label className={`label ${error ? "label-error" : ""}`}>
        {label}
      </label>

      <div className="relative w-full">
        <input
          type={isPassword && showPassword ? "text" : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`input-base w-full ${
            error ? "input-error" : "input-normal"
          } ${isPassword ? "pr-10" : ""}`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center
                       bg-transparent border-none p-0
                       text-gray-400 hover:text-gray-600
                       focus:outline-none focus:ring-0"
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
