package com.yourapp.app.models.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class VentaDto {
    @NotNull
    private Long empleadoId;
    
    private Long clienteId;
}
