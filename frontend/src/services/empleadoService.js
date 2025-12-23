import { api } from "../api/api.js";
import { ENDPOINTS } from "../api/endpoints.js";

const EmpleadoService = {
  // =======================
  // POST /empleados (Crear nuevo empleado)
  // =======================
  crearEmpleado: async (payload) => {
    const { data } = await api.post(ENDPOINTS.EMPLEADOS.BASE, payload);
    return data;
  },

  // =======================
  // GET /empleados (Obtener lista paginada con filtros)
  // =======================
  getEmpleados: async (filters = {}) => {
    const { data } = await api.get(ENDPOINTS.EMPLEADOS.BASE, {
      params: filters, // Mapea EmpleadoQuery
    });
    return data;
  },

  // =======================
  // GET /empleados/{id} (Obtener detalle de un empleado)
  // =======================
  getEmpleadoById: async (id) => {
    const { data } = await api.get(ENDPOINTS.EMPLEADOS.POR_ID(id));
    return data;
  },

  // =======================
  // PATCH /empleados/{id} (Actualizar datos del empleado)
  // =======================
  actualizarEmpleado: async (id, payload) => {
    const { data } = await api.patch(ENDPOINTS.EMPLEADOS.POR_ID(id), payload);
    return data;
  },

  // =======================
  // PATCH /empleados/{id}/eliminacion (Baja lógica)
  // =======================
  eliminarEmpleado: async (id) => {
    await api.patch(ENDPOINTS.EMPLEADOS.ELIMINAR(id));
  },
};

export default EmpleadoService;
