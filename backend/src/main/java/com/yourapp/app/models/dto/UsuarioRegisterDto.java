package com.yourapp.app.models.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UsuarioRegisterDto {
    @NotBlank
    private String nombreDeUsuario;
    @NotBlank
    private String contrasenia;
    @NotNull
    private Long rolId;
}