package com.yourapp.app.models.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UsuarioContraseniaRecuperarDto {
    @NotBlank
    private String mail;
}
