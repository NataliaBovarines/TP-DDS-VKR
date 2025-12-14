package com.yourapp.app.models.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SolicitudPagoExternoDTO {
    private Long ventaId;
    private Long clienteId;
    private Double monto;
    private String descripcion;
    private String telefonoWhatsapp; // Teléfono al que enviar el link de pago
    private String metodoPago; // MERCADOPAGO, PAYPAL, etc. (opcional, por defecto MERCADOPAGO)
}



