package com.yourapp.app.models.dto;

import com.yourapp.app.models.entities.Cliente.CategoriaCliente;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ClienteDto {
    @NotBlank
    private String nombre;
    @NotBlank
    private String apellido;
    @NotBlank
    private String telefono;
    @NotBlank
    private String dni;

    private Double creditoLimite;

    private CategoriaCliente categoria;
}
