import { useEffect, useState, useCallback } from "react";
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
  Package,
  X
} from "lucide-react";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [activeModal, setActiveModal] = useState<"ADD" | "EDIT" | "DELETE" | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [loading, setLoading] = useState(true); // Inicializado en true como en Productos

  // =========================
  // PAGINACIÓN
  // =========================
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [clienteForm, setClienteForm] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    dni: "",
    creditoLimite: 0,
    categoria: "CONFIABLE",
  });

  // =========================
  // CARGAR CLIENTES
  // =========================
  const [filterCategoria, setFilterCategoria] = useState<string>("");
  const fetchClientes = useCallback(async () => {
    setLoading(true);
    try {
      const filters = {
        nombre: searchTerm,
        pagina: currentPage,
        categoria: filterCategoria || undefined
      };
      const data = await ClienteService.getClientes(filters);
      setClientes(data.content || []);
      setTotalPages(data.totalPages || 1);
    } catch (e) {
      console.error("Error cargando clientes", e);
      setClientes([]);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, currentPage, filterCategoria]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchClientes();
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [fetchClientes]);

  useEffect(() => {
    setCurrentPage(0);
  }, [searchTerm, filterCategoria]);

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
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* Input de búsqueda (Ocupa 2 columnas) */}
        <div className="md:col-span-2 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar por nombre, apellido o DNI..."
            className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Botones de Filtro de Categoría */}
        <div className="flex gap-2 md:col-span-2">
          <button
            onClick={() => setFilterCategoria(filterCategoria === "CONFIABLE" ? "" : "CONFIABLE")}
            className={`flex-1 rounded-2xl text-[11px] font-bold uppercase transition-all border flex items-center justify-center gap-2 ${
              filterCategoria === "CONFIABLE"
                ? 'bg-emerald-100 text-emerald-700 border-emerald-200 shadow-lg shadow-emerald-50'
                : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <UserCheck className="w-4 h-4" /> Confiables
          </button>

          <button
            onClick={() => setFilterCategoria(filterCategoria === "NO_CONFIABLE" ? "" : "NO_CONFIABLE")}
            className={`flex-1 rounded-2xl text-[11px] font-bold uppercase transition-all border flex items-center justify-center gap-2 ${
              filterCategoria === "NO_CONFIABLE"
                ? 'bg-rose-100 text-rose-700 border-rose-200 shadow-lg shadow-rose-50'
                : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <UserX className="w-4 h-4" /> Riesgosos
          </button>

          {/* Botón Limpiar (X) */}
          <button 
            onClick={() => { setSearchTerm(''); setFilterCategoria(''); }}
            className="w-[56px] flex items-center justify-center bg-white text-slate-300 hover:text-rose-500 border border-slate-200 rounded-2xl transition-all"
            title="Limpiar filtros"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Cards - CON LÓGICA DE LOADING IGUAL A PRODUCTOS */}
      {loading ? (
        <div className="bg-white rounded-[40px] border border-slate-200 p-20 text-center flex flex-col items-center justify-center gap-4">
          <div className="w-10 h-10 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Cargando clientes...</p>
        </div>
      ) : clientes.length === 0 ? (
        <div className="bg-white rounded-[40px] border border-slate-200 p-20 text-center">
          <Package className="w-12 h-12 text-slate-200 mx-auto mb-4" />
          <p className="text-slate-400 font-medium">No se encontraron clientes con estos filtros.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clientes.map((cliente) => (
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
      )}

      {/* --- COSITO FINAL DEL PAGINADO (EXACTAMENTE IGUAL A PRODUCTOS) --- */}
      <div className="bg-white px-8 py-4 border border-slate-200 rounded-3xl flex justify-between items-center text-[11px] font-bold text-slate-400 uppercase tracking-wider shadow-sm">
        <span>Página {currentPage + 1} de {totalPages}</span>
        <div className="flex gap-2">
          <button 
            disabled={currentPage === 0} 
            onClick={() => setCurrentPage(prev => prev - 1)} 
            className="p-2 border border-slate-200 bg-white rounded-xl shadow-sm transition-all disabled:opacity-30"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            disabled={currentPage >= totalPages - 1} 
            onClick={() => setCurrentPage(prev => prev + 1)} 
            className="p-2 border border-slate-200 bg-white rounded-xl shadow-sm transition-all disabled:opacity-30"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
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
