package com.yourapp.app.models.dto;

import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class DetalleProductoCambioDto {
    @Min(value = 0)
    private Integer stockAumento;
    @Min(value = 0)
    private Integer stockMinimo;
}
