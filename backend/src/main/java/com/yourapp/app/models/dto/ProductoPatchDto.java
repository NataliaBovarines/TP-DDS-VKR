package com.yourapp.app.models.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ProductoPatchDto {
    @Size(max = 100)
    private String nombre;
    @Size(max = 500)
    private String descripcion;
    private Long categoriaId;
    private Long tipoDePrendaId;
    private Long proveedorId;
    @Min(value = 0)
    private Integer precio;
}
