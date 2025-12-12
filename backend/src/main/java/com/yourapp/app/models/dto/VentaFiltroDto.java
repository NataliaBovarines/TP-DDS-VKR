package com.yourapp.app.models.dto;

import com.yourapp.app.models.entities.Venta.MetodoPago;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class VentaFiltroDto {
    private Long empleadoId;
    private Long clienteId;
    private MetodoPago metodoPago;
    private String estado; // nombre de la clase
    private String orden;
    private String direccion;
    private Integer pagina;
}
