package com.yourapp.app.models.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UsuarioContraseniaResetearDto {
    @NotBlank
    private String token;
    @NotBlank
    private String contraseniaNueva;
}
