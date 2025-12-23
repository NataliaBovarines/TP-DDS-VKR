import axios from "axios";
import { ENDPOINTS } from "./endpoints.js";

export const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// --- INTERCEPTOR DE REQUEST ---
// Se ejecuta ANTES de que la petición salga hacia el servidor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      // Inyecta el Bearer token automáticamente en TODAS las peticiones
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// --- INTERCEPTOR DE RESPONSE ---
// Se ejecuta CUANDO llega la respuesta, ANTES de que llegue a tu componente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const serverResponse = error.response?.data;

    const status = serverResponse?.status || error.response?.status;
    const mensaje = serverResponse?.message || "Ocurrió un error inesperado";
    const path = serverResponse?.path || "Ruta desconocida";
    const errorTipo = serverResponse?.error || "Error";

    // Logica especial para sesion expirada (401)
    if (status === 401) {
      const urlOriginal = error.config.url;
      // Solo redirigimos si el error NO viene del intento de login
      if (!urlOriginal.includes(ENDPOINTS.AUTH.LOGIN)) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }

    // Feedback generico para el usuario
    console.error(`[${status}] Error en ${path} (${errorTipo}): ${mensaje}`);
    alert(mensaje);

    return Promise.reject(error);
  }
);
