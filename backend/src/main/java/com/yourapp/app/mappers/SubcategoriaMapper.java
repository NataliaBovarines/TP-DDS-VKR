package com.yourapp.app.mappers;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import com.yourapp.app.models.dto.SubcategoriaCreateRequest;
import com.yourapp.app.models.dto.SubcategoriaResponse;
import com.yourapp.app.models.entities.Categoria;
import com.yourapp.app.models.entities.Subcategoria;

@Mapper(
    componentModel = "spring", 
    unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface SubcategoriaMapper {
    // --- ENTRADA ---
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "descripcion", source = "dto.descripcion")
    @Mapping(target = "categoria", source = "categoriaEntidad")
    @Mapping(target = "fechaCreacion", ignore = true)
    @Mapping(target = "fechaModificacion", ignore = true)
    @Mapping(target = "fueEliminado", ignore = true)
    Subcategoria toEntity(SubcategoriaCreateRequest dto, Categoria categoriaEntidad);
    
    // --- SALIDA ---
    SubcategoriaResponse toResponse(Subcategoria entity);

    List<SubcategoriaResponse> toResponseList(List<Subcategoria> entities);
}