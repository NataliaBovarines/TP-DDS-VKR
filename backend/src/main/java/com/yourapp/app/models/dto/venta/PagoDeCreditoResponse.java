package com.yourapp.app.models.dto.venta;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class PagoDeCreditoResponse {
    private Long id;
    private Double monto;
    private LocalDateTime fecha;
    private Integer numeroPago;
}
