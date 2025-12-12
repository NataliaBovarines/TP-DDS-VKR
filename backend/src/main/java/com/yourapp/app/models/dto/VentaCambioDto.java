package com.yourapp.app.models.dto;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class VentaCambioDto {
    @NotBlank
    private String motivo;
    private List<DetalleVentaDto> detalleVentaDtos;
}
