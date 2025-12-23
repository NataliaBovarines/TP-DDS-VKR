import { api } from "../api/api.js";
import { ENDPOINTS } from "../api/endpoints.js";

const ClienteService = {
  // =======================
  // POST /clientes (Crear cliente)
  // =======================
  crearCliente: async (payload) => {
    const { data } = await api.post(ENDPOINTS.CLIENTES.BASE, payload);
    return data;
  },

  // =======================
  // GET /clientes (Obtener todos con filtros/paginación)
  // =======================
  getClientes: async (filters = {}) => {
    const { data } = await api.get(ENDPOINTS.CLIENTES.BASE, {
      params: filters, // Esto envía el objeto ClienteQuery como query params
    });
    return data;
  },

  // =======================
  // GET /clientes/{id} (Obtener un cliente específico)
  // =======================
  getClienteById: async (id) => {
    const { data } = await api.get(ENDPOINTS.CLIENTES.POR_ID(id));
    return data;
  },

  // =======================
  // PATCH /clientes/{id} (Actualizar cliente)
  // =======================
  actualizarCliente: async (id, payload) => {
    const { data } = await api.patch(ENDPOINTS.CLIENTES.POR_ID(id), payload);
    return data;
  },

  // =======================
  // PATCH /clientes/{id}/eliminacion (Borrado lógico)
  // =======================
  eliminarCliente: async (id) => {
    await api.patch(ENDPOINTS.CLIENTES.ELIMINAR(id));
  },
};

export default ClienteService;
