package com.yourapp.app.models.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class CategoriaResponse {
    private Long id;
    private String descripcion;
    private Boolean estaActiva;
    private List<SubcategoriaResponse> subcategorias; 
}
