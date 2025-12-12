package com.yourapp.app.models.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ProveedorDto {
    @NotBlank
    @Size(max = 100)
    private String nombre;    
}
