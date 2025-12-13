package com.yourapp.app.models.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class DetalleProductoDto {
    private Long talleId;
    private Long colorId;
    @NotNull
    @Min(value = 0)
    private Integer stockActual;
    @NotNull
    @Min(value = 0)
    private Integer stockMinimo; 
}
