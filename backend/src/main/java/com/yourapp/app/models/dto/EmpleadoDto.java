package com.yourapp.app.models.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
    
    private String direccion;
    
    @NotBlank
    private String mail;
    
    private String telefono;
    
    @NotNull
    private Long rolId;
}
