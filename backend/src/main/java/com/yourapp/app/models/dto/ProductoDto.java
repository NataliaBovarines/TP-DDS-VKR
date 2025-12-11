package com.yourapp.app.models.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ProductoDto {
    @NotBlank
    @Size(max = 100)
    private String nombre;
    @Size(max = 500)
    private String descripcion;
    @NotNull
    private Long categoriaId;
    @NotNull
    private Long tipoDePrendaId;
    @NotNull
    private Long talleId;
    @NotNull
    private Long colorId;
    @NotNull
    private Long proveedorId;
    @NotNull
    @Min(value = 0)
    private Integer stockActual;
    @NotNull
    @Min(value = 0)
    private Integer stockMinimo;
    @NotNull
    @Min(value = 0)
    private Integer precio;
}
