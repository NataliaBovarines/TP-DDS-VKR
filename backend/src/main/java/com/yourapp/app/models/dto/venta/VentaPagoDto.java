package com.yourapp.app.models.dto.venta;

import com.yourapp.app.models.entities.Venta.MetodoPago;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class VentaPagoDto {
    @NotNull(message = "El método de pago es obligatorio")
    private MetodoPago metodoPago;
}
