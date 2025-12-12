package com.yourapp.app.models.dto;

import com.yourapp.app.models.entities.Venta.MetodoPago;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class VentaPagoDto {
    private MetodoPago metodoPago;
    @NotNull
    private Double monto;
}
