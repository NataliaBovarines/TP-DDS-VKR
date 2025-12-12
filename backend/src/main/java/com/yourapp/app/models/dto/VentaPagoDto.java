package com.yourapp.app.models.dto;

import com.yourapp.app.models.entities.Venta.MetodoPago;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class VentaPagoDto {
    private MetodoPago metodoPago;
    private Double monto;
}
