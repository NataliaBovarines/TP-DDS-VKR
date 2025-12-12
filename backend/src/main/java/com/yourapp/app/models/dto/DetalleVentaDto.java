package com.yourapp.app.models.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class DetalleVentaDto {
    @NotNull
    private Long detalleProductoId;
    @NotNull
    private Integer cantidad;
}
