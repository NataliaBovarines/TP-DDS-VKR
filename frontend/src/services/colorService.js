import { api } from "../api/api.js";
import { ENDPOINTS } from "../api/endpoints.js";

const ColorService = {
  // =======================
  // POST /colores (Crear color)
  // =======================
  crearColor: async (payload) => {
    const { data } = await api.post(ENDPOINTS.COLORES.BASE, payload);
    return data;
  },

  // =======================
  // GET /colores (Obtener todos los colores)
  // =======================
  getColores: async () => {
    const { data } = await api.get(ENDPOINTS.COLORES.BASE);
    return data;
  },

  // =======================
  // PATCH /colores/{id}/eliminacion (Borrado lógico)
  // =======================
  eliminarColor: async (id) => {
    await api.patch(ENDPOINTS.COLORES.ELIMINAR(id));
  }
};

export default ColorService;
