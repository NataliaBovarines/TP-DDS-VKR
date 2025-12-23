import { api } from "../api/api.js";
import { ENDPOINTS } from "../api/endpoints.js";

const CategoriaService = {
  // =======================
  // POST /categorias (Crear categoría)
  // =======================
  crearCategoria: async (payload) => {
    const { data } = await api.post(ENDPOINTS.CATEGORIAS.BASE, payload);
    return data;
  },

  // =======================
  // GET /categorias (Obtener todas)
  // =======================
  getCategorias: async () => {
    const { data } = await api.get(ENDPOINTS.CATEGORIAS.BASE);
    return data;
  },

  // =======================
  // PATCH /categorias/{id}/eliminacion
  // =======================
  eliminarCategoria: async (id) => {
    await api.patch(ENDPOINTS.CATEGORIAS.ELIMINAR(id));
  },
};

export default CategoriaService;
