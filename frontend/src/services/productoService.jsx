import { apiBack } from "./apiBack";

// =======================
// GET /productos (con filtros)
// =======================
export async function getProductos(filters = {}) {
  const { data } = await apiBack.get("/productos", {
    params: filters,
  });
  return data;
}

// =======================
// GET /productos/{id}
// =======================
export async function getProductoById(id) {
  const { data } = await apiBack.get(`/productos/${id}`);
  return data;
}

// =======================
// PATCH /productos/{id}
// =======================
export async function actualizarProducto(id, payload) {
  const { data } = await apiBack.patch(`/productos/${id}`, payload);
  return data;
}

// =======================
// PATCH /productos/{id}/eliminacion
// =======================
export async function eliminarProducto(id) {
  await apiBack.patch(`/productos/${id}/eliminacion`);
}

// =======================
// PATCH /productos/{id}/detalles/{detalleId}
// =======================
export async function actualizarDetalleProducto(
  productoId,
  detalleId,
  payload
) {
  const { data } = await apiBack.patch(
    `/productos/${productoId}/detalles/${detalleId}`,
    payload
  );
  return data;
}

// =======================
// PATCH /productos/{id}/detalles/{detalleId}/eliminacion
// =======================
export async function eliminarDetalleProducto(productoId, detalleId) {
  await apiBack.patch(
    `/productos/${productoId}/detalles/${detalleId}/eliminacion`
  );
}
