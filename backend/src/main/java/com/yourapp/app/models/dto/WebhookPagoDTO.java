package com.yourapp.app.models.dto;

import lombok.Getter;
import lombok.Setter;
import java.util.Map;

@Getter
@Setter
public class WebhookPagoDTO {
    private String idPagoExterno;
    private String estado;
    private String tipo; // payment, preference, etc.
    private Map<String, Object> datosAdicionales;
}



