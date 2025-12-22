import { api } from "../api/api";
import { ENDPOINTS } from "../api/endpoints";

const AuthService = {
  // =======================
  // POST /auth/login
  // =======================
  login: async (payload) => {
    const { data } = await api.post(ENDPOINTS.AUTH.LOGIN, payload);
    if (data.token) {
      localStorage.setItem("token", data.token);
    }
    return data;
  },

  // =======================
  // GET /auth/me (Obtener datos del usuario logueado)
  // =======================
  getMe: async () => {
    const { data } = await api.get(ENDPOINTS.AUTH.ME);
    return data;
  },

  // =======================
  // POST /auth/cambiar-contrasenia
  // =======================
  cambiarContrasenia: async (payload) => {
    const { data } = await api.post(ENDPOINTS.AUTH.CAMBIAR_CONTRASENIA, payload);
    return data;
  },

  // =======================
  // POST /auth/recuperar-contrasenia
  // =======================
  recuperarContrasenia: async (payload) => {
    await api.post(ENDPOINTS.AUTH.RECUPERAR_CONTRASENIA, payload);
  },

  // =======================
  // POST /auth/resetear-contrasenia
  // =======================
  resetearContrasenia: async (payload) => {
    await api.post(ENDPOINTS.AUTH.RESETEAR_CONTRASENIA, payload);
  },

  // =======================
  // Logout (Solo frontend)
  // =======================
  logout: () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }
};

export default AuthService;
