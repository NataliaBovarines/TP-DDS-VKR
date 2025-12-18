package com.yourapp.app.models.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ProductoFiltroDto {
    private String nombre;
    private Long categoriaId;
    private Long subcategoriaId;
    private Long talleId;
    private Long colorId;
    private Long proveedorId;
    private Boolean stockBajo;
    private String orden;
    private String direccion;
    private Integer pagina;
}
