package com.yourapp.app.models.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UsuarioDto {
    @NotBlank
    private String nombreDeUsuario;

    public String getNombreDeUsuario() {
        return nombreDeUsuario;
    }

    public String getContrasenia() {
        return contrasenia;
    }

    public Long getRolId() {
        return rolId;
    }

    @NotBlank
    private String contrasenia;
    @NotNull
    private Long rolId;
}