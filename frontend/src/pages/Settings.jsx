import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Store, User, CheckCircle } from "lucide-react";

import StoreSettings from "../components/settings/StoreSettings";
import UserSettings from "../components/settings/UserSettings";

export default function Settings() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("store");

  return (
    <div className="min-h-screen bg-[#EEEEEE]">
      {/* Header */}
      <header className="bg-[#DBDBDB] px-8 py-4">
        <div className="relative flex items-center">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/dashboard")}
              className="p-1 rounded-md hover:bg-[#EEEEEE] transition"
            >
              <ArrowLeft size={18} />
            </button>

            <img src="/logo.png" alt="VKR" className="w-6 h-6" />
          </div>

          <h1 className="absolute left-1/2 -translate-x-1/2 text-sm font-semibold text-[#1D1D1D]">
            Configuración
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mt-4">
          <div className="relative flex bg-[#EEEEEE] rounded-full p-1">
            {/* Selector */}
            <span
              className={`
                absolute top-1 bottom-1 w-1/2
                bg-white
                rounded-full
                border border-gray-200
                shadow-sm
                transition-transform duration-300
                ${tab === "store" ? "translate-x-0" : "translate-x-full"}
              `}
            />

            <Tab
              active={tab === "store"}
              icon={Store}
              onClick={() => setTab("store")}
            >
              Tienda
            </Tab>

            <Tab
              active={tab === "user"}
              icon={User}
              onClick={() => setTab("user")}
            >
              Usuario
            </Tab>
          </div>
        </div>
      </header>

      {/* Contenido */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm relative overflow-hidden">
          {/* Tienda */}
          <div
            className={`
              transition-all duration-300
              ${tab === "store"
                ? "opacity-100 translate-x-0 relative"
                : "opacity-0 -translate-x-3 absolute inset-0 pointer-events-none"}
            `}
          >
            <StoreSettings />
          </div>

          {/* Usuario */}
          <div
            className={`
              transition-all duration-300
              ${tab === "user"
                ? "opacity-100 translate-x-0 relative"
                : "opacity-0 translate-x-3 absolute inset-0 pointer-events-none"}
            `}
          >
            <UserSettings />
          </div>
        </div>
      </main>
    </div>
  );
}

/* ---------- Tab ---------- */
function Tab({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        relative z-10
        flex items-center gap-2
        px-5 py-2
        text-sm font-medium
        rounded-full
        transition-colors duration-200
        ${
          active
            ? "text-[#1D1D1D] border-blue-500 border-b-2"
            : "text-[#8A7F7A] hover:text-[#1D1D1D]"
        }
      `}
    >
      <Icon size={16} className={active ? "text-[#2431E7]" : ""} />
      {children}
    </button>
  );
}
