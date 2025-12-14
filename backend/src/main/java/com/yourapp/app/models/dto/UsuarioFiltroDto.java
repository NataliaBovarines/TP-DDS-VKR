package com.yourapp.app.models.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UsuarioFiltroDto {
    private String nombreDeUsuario;
    private Long rolId;
    private String orden;
    private String direccion; 
    private Integer pagina;
}
