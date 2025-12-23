import { api } from "../api/api.js";
import { ENDPOINTS } from "../api/endpoints.js";

const RolService = {
  // =======================
  // POST /roles (Crear un nuevo rol)
  // =======================
  crearRol: async (payload) => {
    const { data } = await api.post(ENDPOINTS.ROLES.BASE, payload);
    return data;
  },

  // =======================
  // PATCH /roles/{id} (Actualizar permisos de un rol)
  // =======================
  actualizarPermisos: async (id, payload) => {
    const { data } = await api.patch(ENDPOINTS.ROLES.POR_ID(id), payload);
    return data;
  },

  // =======================
  // PATCH /roles/{id}/eliminacion (Borrado lógico de un rol)
  // =======================
  eliminarRol: async (id) => {
    await api.patch(ENDPOINTS.ROLES.ELIMINAR(id));
  },

  // =======================
  // GET /roles (Obtener todos los roles disponibles)
  // =======================
  getRoles: async () => {
    const { data } = await api.get(ENDPOINTS.ROLES.BASE);
    return data;
  },
};

export default RolService;
