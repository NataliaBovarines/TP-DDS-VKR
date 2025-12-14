package com.yourapp.app.models.entities.adapters;

import java.util.Map;

/**
 * Interfaz para adaptadores de servicios de generador QR
 * Permite integrar diferentes proveedores de pago (MercadoPago, PayPal, etc.)
 */

public interface AdapterQr {
    public void generarQr();
    public String getNombreProveedor();

    public Map<String, String> crearPago(Double monto, String descripcion, String referenciaId, Map<String, String> datosAdicionales);
    /**
     * Verifica el estado de un pago en el servicio externo
     * @param idPagoExterno ID del pago en el servicio externo
     * @return Estado del pago (APROBADO, RECHAZADO, PENDIENTE, etc.)
     */
    public String verificarEstadoPago(String idPagoExterno);

    /**
     * Cancela un pago pendiente
     * @param idPagoExterno ID del pago en el servicio externo
     * @return true si se canceló exitosamente
     */
    public boolean cancelarPago(String idPagoExterno);

}
