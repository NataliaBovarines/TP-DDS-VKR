package com.yourapp.app.models.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class EmpleadoResponseDto {
    private Long id;
    private String nombre;
    private String dni;
    private String direccion;
    private String mail;
    private String telefono;
    private UsuarioResponseDto usuario;
}
