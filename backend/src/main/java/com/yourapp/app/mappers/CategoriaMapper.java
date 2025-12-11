package com.yourapp.app.mappers;

import com.yourapp.app.models.dto.CategoriaDto;
import com.yourapp.app.models.entities.Categoria;

public class CategoriaMapper {
    public static Categoria toEntity(CategoriaDto categoriaDto) {
        Categoria categoria = new Categoria();
        categoria.setDescripcion(categoriaDto.getDescripcion());
        categoria.setEstaActiva(true);
        return categoria;
    }
}
