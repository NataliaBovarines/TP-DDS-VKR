package com.yourapp.app.models.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class EmpleadoFiltroDto {
    private String nombre;
    private String apellido;
    private String dni;
    private Boolean tieneUsuario;
    private String orden;
    private String direccion;
    private Integer pagina;
}
