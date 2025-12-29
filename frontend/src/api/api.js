import axios from "axios";
import { ENDPOINTS } from "./endpoints.js";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
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
// --- INTERCEPTOR DE RESPONSE ---
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const serverResponse = error.response?.data;
    const status = serverResponse?.status || error.response?.status;
    const mensaje = serverResponse?.message || "Ocurrió un error inesperado";

    const esCambioClaveObligatorio = mensaje.includes("cambiar su contraseña inicial");

    if (status === 401 && !error.config.url.includes(ENDPOINTS.AUTH.LOGIN) && !esCambioClaveObligatorio) {
      localStorage.removeItem("token");
      window.location.href = "/#/login";
      return Promise.reject(error);
    }

    const apiErrorEvent = new CustomEvent("api-error-alert", { 
      detail: { mensaje, status } 
    });
    window.dispatchEvent(apiErrorEvent);

    return Promise.reject(error);
  }
);
