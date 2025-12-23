import { api } from "../api/api.js";
import { ENDPOINTS } from "../api/endpoints.js";

const ConfiguracionService = {
  // =======================
  // GET /configuracion (Obtener configuración de la tienda)
  // =======================
  getConfiguracion: async () => {
    const { data } = await api.get(ENDPOINTS.CONFIGURACION);
    return data;
  },

  // =======================
  // PATCH /configuracion (Actualizar configuración)
  // =======================
  actualizarConfiguracion: async (payload) => {
    const { data } = await api.patch(ENDPOINTS.CONFIGURACION, payload);
    return data;
  }
};

export default ConfiguracionService;
