package com.yourapp.app.models.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ConfiguracionUpdateDto {
    @Size(max = 100, message = "El nombre no puede superar los 100 caracteres")
    private String nombreEmpresa;
    
    private Boolean permiteReserva;
    
    @Min(value = 0, message = "El porcentaje de seña no puede ser negativo")
    @Max(value = 1, message = "El porcentaje de seña no puede ser mayor a 1 (100%)")
    private Double porcentajeMinimoSena;
    
    @Min(value = 1, message = "La reserva debe ser válida al menos por 1 día")
    private Integer diasValidezReserva;
    
    @Min(value = 0, message = "El stock mínimo no puede ser negativo")
    private Integer stockMinimoGlobal;
    
    @Min(value = 0, message = "El tiempo máximo de cancelación no puede ser negativo")
    private Integer tiempoMaximoCancelacionMeses;
}
