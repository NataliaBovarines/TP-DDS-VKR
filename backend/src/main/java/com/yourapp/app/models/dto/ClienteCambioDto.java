package com.yourapp.app.models.dto;

import com.yourapp.app.models.entities.Cliente.CategoriaCliente;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ClienteCambioDto {
    private String nombre;

    private String apellido;

    private String telefono;

    private Double creditoLimite;

    private CategoriaCliente categoria;
}
