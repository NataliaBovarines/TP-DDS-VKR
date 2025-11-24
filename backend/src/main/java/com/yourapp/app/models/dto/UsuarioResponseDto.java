package com.yourapp.app.models.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UsuarioResponseDto {
    private Long id;
    private String nombreDeUsuario;
    private String rolNombre;
}
