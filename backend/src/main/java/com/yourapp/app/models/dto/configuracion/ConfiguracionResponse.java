package com.yourapp.app.models.dto.configuracion;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ConfiguracionResponse {
    private String nombreEmpresa;
    private Boolean permiteReserva;
    private Double porcentajeMinimoSena;
    private Integer diasValidezReserva;
    private Integer stockMinimoGlobal;
    private Integer tiempoMaximoCancelacionMeses;
}
