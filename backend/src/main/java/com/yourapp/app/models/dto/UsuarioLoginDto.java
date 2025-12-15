package com.yourapp.app.models.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UsuarioLoginDto {
    @NotBlank
    private String nombreDeUsuario;
    @NotBlank
    private String contrasenia;
}
