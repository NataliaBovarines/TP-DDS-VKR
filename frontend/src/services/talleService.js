import { api } from "../api/api.js";
import { ENDPOINTS } from "../api/endpoints.js";

const TalleService = {
  // =======================
  // POST /talles (Crear un nuevo talle)
  // =======================
  crearTalle: async (payload) => {
    const { data } = await api.post(ENDPOINTS.TALLES.BASE, payload);
    return data;
  },

  // =======================
  // GET /talles (Obtener todos los talles)
  // =======================
  getTalles: async () => {
    const { data } = await api.get(ENDPOINTS.TALLES.BASE);
    return data;
  },

  // =======================
  // PATCH /talles/{id}/eliminacion (Borrado lógico)
  // =======================
  eliminarTalle: async (id) => {
    await api.patch(ENDPOINTS.TALLES.ELIMINAR(id));
  },
};

export default TalleService;
