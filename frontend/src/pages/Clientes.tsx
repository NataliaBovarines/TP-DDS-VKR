import { useEffect, useState } from "react";
import ClienteService from "../services/clienteService.js";
import { ClienteEstado } from "../types.ts";
import {
  UserPlus,
  Search,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Save,
  UserCheck,
  UserX,
  CreditCard,
} from "lucide-react";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [activeModal, setActiveModal] = useState<"ADD" | "EDIT" | "DELETE" | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [loading, setLoading] = useState(false);

  const [clienteForm, setClienteForm] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    dni: "",
    creditoLimite: 0,
    categoria: "CONFIABLE",
  });

  // =========================
  // Cargar clientes
  // =========================
  const fetchClientes = async () => {
    try {
      setLoading(true);
      const data = await ClienteService.getClientes();
      setClientes(data);
    } catch (e) {
      console.error("Error cargando clientes", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  // =========================
  // Crear / Editar
  // =========================
  const handleGuardarCliente = async () => {
    try {
      if (activeModal === "EDIT" && clienteSeleccionado) {
        await ClienteService.actualizarCliente(clienteSeleccionado.id, clienteForm);
      } else {
        await ClienteService.crearCliente(clienteForm);
      }
      setActiveModal(null);
      fetchClientes();
    } catch (e) {
      console.error("Error guardando cliente", e);
    }
  };

  // =========================
  // Eliminar
  // =========================
  const handleEliminarCliente = async () => {
    try {
      await ClienteService.eliminarCliente(clienteSeleccionado.id);
      setActiveModal(null);
      fetchClientes();
    } catch (e) {
      console.error("Error eliminando cliente", e);
    }
  };

  const clientesFiltrados = clientes.filter(
    (c) =>
      c.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.dni.includes(searchTerm)
  );

  return (
    <div className="space-y-8 animate-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
            Gestión de Clientes
          </h2>
          <p className="text-slate-500 font-medium mt-1">
            Cartera de clientes y perfiles crediticios
          </p>
        </div>
        <button
          onClick={() => {
            setClienteForm({
              nombre: "",
              apellido: "",
              telefono: "",
              dni: "",
              creditoLimite: 0,
              categoria: "CONFIABLE",
            });
            setActiveModal("ADD");
          }}
          className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold text-sm shadow-xl shadow-indigo-100 flex items-center gap-2 hover:bg-indigo-700 transition-all active:scale-95"
        >
          <UserPlus className="w-5 h-5" />
          Nuevo Cliente
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm relative">
        <Search className="absolute left-7 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Buscar por nombre o DNI..."
          className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {clientesFiltrados.map((cliente) => (
          <div
            key={cliente.id}
            className="bg-white rounded-[40px] border border-slate-200 shadow-sm p-8 flex flex-col group hover:border-indigo-300 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-6">
              <div
                className={`w-16 h-16 rounded-[24px] flex items-center justify-center text-white font-bold text-2xl shadow-lg
                ${
                  cliente.categoriaCliente === ClienteEstado.CONFIABLE
                    ? "bg-indigo-600 shadow-indigo-100"
                    : "bg-slate-400 shadow-slate-100"
                }`}
              >
                {cliente.nombre.charAt(0)}
              </div>

              <span
                className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5
                ${
                  cliente.categoriaCliente === ClienteEstado.CONFIABLE
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-rose-50 text-rose-700"
                }`}
              >
                {cliente.categoriaCliente === ClienteEstado.CONFIABLE ? (
                  <UserCheck className="w-3.5 h-3.5" />
                ) : (
                  <UserX className="w-3.5 h-3.5" />
                )}
                {cliente.categoriaCliente}
              </span>
            </div>

            <div className="mb-8">
              <h4 className="text-xl font-bold text-slate-900 tracking-tight mb-2 group-hover:text-indigo-600 transition-colors">
                {cliente.nombre} {cliente.apellido}
              </h4>
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                DNI: {cliente.dni} • TEL: {cliente.telefono}
              </p>
            </div>

            <div className="flex-1 border-t border-slate-50 pt-6 space-y-4">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <CreditCard className="w-3 h-3 text-indigo-500" />
                Perfil de Crédito
              </p>

              <div className="bg-slate-50 p-5 rounded-[24px] space-y-3 border border-slate-100">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                    Capacidad de Crédito
                  </span>
                  <span className="font-bold text-slate-800 text-sm">
                    ${cliente.creditoLimite}
                  </span>
                </div>
                <div className="h-px bg-slate-200/50"></div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                    Deuda Actual
                  </span>
                  <span
                    className={`font-bold text-sm ${
                      cliente.deuda > 0 ? "text-rose-600" : "text-slate-800"
                    }`}
                  >
                    ${cliente.deuda}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-10">
              <button
                onClick={() => {
                  setClienteSeleccionado(cliente);
                  setClienteForm({
                    nombre: cliente.nombre,
                    apellido: cliente.apellido,
                    telefono: cliente.telefono,
                    dni: cliente.dni,
                    creditoLimite: cliente.creditoLimite,
                    categoria: cliente.categoriaCliente,
                  });
                  setActiveModal("EDIT");
                }}
                className="py-4 bg-white border border-slate-200 rounded-[20px] text-[11px] font-bold uppercase tracking-wider text-slate-600 hover:border-indigo-600 hover:text-indigo-600 transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <Edit className="w-4 h-4" /> Editar
              </button>

              <button
                onClick={() => {
                  setClienteSeleccionado(cliente);
                  setActiveModal("DELETE");
                }}
                className="py-4 bg-rose-50 text-rose-600 rounded-[20px] text-[11px] font-bold uppercase tracking-wider hover:bg-rose-100 transition-all flex items-center justify-center gap-2 border border-rose-100"
              >
                <Trash2 className="w-4 h-4" /> Borrar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modales ADD / EDIT */}
      {(activeModal === "ADD" || activeModal === "EDIT") && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl p-10 space-y-8">
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight uppercase">
              {activeModal === "ADD" ? "Nuevo Cliente" : "Editar Cliente"}
            </h3>

            {["nombre", "apellido", "telefono", "dni"].map((field) => (
              <input
                key={field}
                placeholder={field}
                value={clienteForm[field]}
                onChange={(e) =>
                  setClienteForm({ ...clienteForm, [field]: e.target.value })
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 font-semibold text-sm focus:ring-4 focus:ring-indigo-500/10 outline-none"
              />
            ))}

            <input
              type="number"
              placeholder="Límite de crédito"
              value={clienteForm.creditoLimite}
              onChange={(e) =>
                setClienteForm({
                  ...clienteForm,
                  creditoLimite: Number(e.target.value),
                })
              }
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 font-semibold text-sm focus:ring-4 focus:ring-indigo-500/10 outline-none"
            />

            <div className="flex gap-4">
              <button
                onClick={() => setActiveModal(null)}
                className="flex-1 py-4 text-slate-400 font-bold"
              >
                Cancelar
              </button>
              <button
                onClick={handleGuardarCliente}
                className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg"
              >
                <Save className="inline w-4 h-4 mr-2" />
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal DELETE */}
      {activeModal === "DELETE" && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-3xl p-8 space-y-6">
            <p className="font-bold text-slate-800">
              ¿Eliminar cliente {clienteSeleccionado?.nombre}?
            </p>
            <div className="flex gap-4">
              <button onClick={() => setActiveModal(null)}>Cancelar</button>
              <button
                onClick={handleEliminarCliente}
                className="bg-rose-600 text-white px-6 py-2 rounded-xl"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clientes;
