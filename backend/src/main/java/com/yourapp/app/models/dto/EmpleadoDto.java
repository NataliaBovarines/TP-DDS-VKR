package com.yourapp.app.models.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class EmpleadoDto {
    @NotBlank
    private String nombre;
    @NotBlank
    private String apellido;
    @NotBlank
    private String dni;
    @NotBlank
    private String direccion;
    @NotBlank
    private String mail;
    @NotBlank
    private String telefono;
    private Long usuarioId;
}
