import { api } from "../api/api.js";
import { ENDPOINTS } from "../api/endpoints.js";

const VentaService = {
  // =======================
  // POST /ventas (Crear venta)
  // =======================
  crearVenta: async (payload) => {
    const { data } = await api.post(ENDPOINTS.VENTAS.BASE, payload);
    return data;
  },

  // =======================
  // GET /ventas (Lista paginada con filtros)
  // =======================
  getVentas: async (filters = {}) => {
    const { data } = await api.get(ENDPOINTS.VENTAS.BASE, {
      params: filters,
    });
    return data;
  },

  // =======================
  // GET /ventas/{id} (Detalle de una venta)
  // =======================
  getVentaById: async (id) => {
    const { data } = await api.get(ENDPOINTS.VENTAS.POR_ID(id));
    return data;
  },

  // =======================
  // PATCH /ventas/{id}/pago (Pagar venta completa)
  // =======================
  pagarVenta: async (id, payload) => {
    const { data } = await api.patch(ENDPOINTS.VENTAS.PAGAR(id), payload);
    return data;
  },

  // =======================
  // POST /ventas/{id}/reserva (Crear reserva con crédito)
  // =======================
  reservarVenta: async (id, payload) => {
    const { data } = await api.post(ENDPOINTS.VENTAS.RESERVAR(id), payload);
    return data;
  },

  // =======================
  // POST /ventas/{id}/reserva-pagos (Agregar pago parcial)
  // =======================
  agregarPagoReserva: async (id, payload) => {
    const { data } = await api.post(ENDPOINTS.VENTAS.AGREGAR_PAGO_RESERVA(id), payload);
    return data;
  },

  // =======================
  // PATCH /ventas/{id}/cancelacion (Cancelar venta)
  // =======================
  cancelarVenta: async (id, payload) => {
    const { data } = await api.patch(ENDPOINTS.VENTAS.CANCELAR(id), payload);
    return data;
  },

  // =======================
  // PATCH /ventas/{id}/rechazo (Rechazar venta)
  // =======================
  rechazarVenta: async (id, payload) => {
    const { data } = await api.patch(ENDPOINTS.VENTAS.RECHAZAR(id), payload);
    return data;
  },

  // =======================
  // PATCH /ventas/{id}/cambio (Procesar cambio de producto)
  // =======================
  procesarCambio: async (id, payload) => {
    const { data } = await api.patch(ENDPOINTS.VENTAS.CAMBIO_PRODUCTO(id), payload);
    return data;
  },

  // =======================
  // GET /ventas/reservas-vencidas (Procesar limpieza)
  // =======================
  procesarVencidas: async () => {
    await api.get(ENDPOINTS.VENTAS.PROCESAR_VENCIDAS);
  },

  // =======================
  // PATCH /ventas/{id}/eliminacion (Borrado físico/lógico)
  // =======================
  eliminarVenta: async (id) => {
    await api.patch(ENDPOINTS.VENTAS.ELIMINAR(id));
  },
};

export default VentaService;
