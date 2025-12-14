package com.yourapp.app.models.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RespuestaPagoExternoDTO {
    private Long id;
    private Long ventaId;
    private String linkPago;
    private String idPagoExterno;
    private String qrCode; // Código QR para pagos presenciales
    private Double monto;
    private String estado;
    private String metodoPago;
    private String mensaje;
    private boolean enviadoPorWhatsapp;
}

