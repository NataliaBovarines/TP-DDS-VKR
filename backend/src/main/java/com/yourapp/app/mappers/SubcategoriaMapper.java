package com.yourapp.app.mappers;

import com.yourapp.app.models.dto.SubcategoriaDto;
import com.yourapp.app.models.entities.Categoria;
import com.yourapp.app.models.entities.Subcategoria;

public class SubcategoriaMapper {
    public static Subcategoria toEntity(SubcategoriaDto subcategoriaDto, Categoria categoria) {
        Subcategoria subcategoria = new Subcategoria();
        subcategoria.setDescripcion(subcategoriaDto.getDescripcion());
        subcategoria.setCategoria(categoria);

        return subcategoria;
    }    
}
