import { api } from "../api/api.js";
import { ENDPOINTS } from "../api/endpoints.js";

const ProductoService = {
  // =======================
  // POST /productos (Crear producto base)
  // =======================
  crearProducto: async (payload) => {
    const { data } = await api.post(ENDPOINTS.PRODUCTOS.BASE, payload);
    return data;
  },

  // =======================
  // GET /productos (con filtros)
  // =======================
  getProductos: async (filters = {}) => {
    const { data } = await api.get(ENDPOINTS.PRODUCTOS.BASE, {
      params: filters,
    });
    return data;
  },

  // =======================
  // GET /productos/{id}
  // =======================
  getProductoById: async (id) => {
    const { data } = await api.get(ENDPOINTS.PRODUCTOS.POR_ID(id));
    return data;
  },

  // =======================
  // PATCH /productos/{id}
  // =======================
  actualizarProducto: async (id, payload) => {
    const { data } = await api.patch(ENDPOINTS.PRODUCTOS.POR_ID(id), payload);
    return data;
  },

  // =======================
  // PATCH /productos/{id}/eliminacion
  // =======================
  eliminarProducto: async (id) => {
    await api.patch(ENDPOINTS.PRODUCTOS.ELIMINAR(id));
  },

  // =======================
  // POST /productos/{id}/detalles (Crear variante)
  // =======================
  crearDetalle: async (productoId, payload) => {
    const { data } = await api.post(
      ENDPOINTS.PRODUCTOS.DETALLES.CREAR(productoId), 
      payload
    );
    return data;
  },

  // =======================
  // PATCH /productos/{id}/detalles/{detalleId}
  // =======================
  actualizarDetalleProducto: async (productoId, detalleId, payload) => {
    const { data } = await api.patch(
      ENDPOINTS.PRODUCTOS.DETALLES.ACTUALIZAR(productoId, detalleId),
      payload
    );
    return data;
  },

  // =======================
  // PATCH /productos/{id}/detalles/{detalleId}/eliminacion
  // =======================
  eliminarDetalleProducto: async (productoId, detalleId) => {
    await api.patch(
      ENDPOINTS.PRODUCTOS.DETALLES.ELIMINAR(productoId, detalleId)
    );
  }
};

export default ProductoService;
