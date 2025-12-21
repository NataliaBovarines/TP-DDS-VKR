package com.yourapp.app.mappers;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import com.yourapp.app.models.dto.SubcategoriaCreateRequest;
import com.yourapp.app.models.dto.SubcategoriaResponse;
import com.yourapp.app.models.entities.Subcategoria;

@Mapper(
    componentModel = "spring", 
    unmappedTargetPolicy = ReportingPolicy.IGNORE
)
public interface SubcategoriaMapper {
    // --- ENTRADA ---
    Subcategoria toEntity(SubcategoriaCreateRequest dto);
    
    // --- SALIDA ---
    SubcategoriaResponse toResponse(Subcategoria entity);

    List<SubcategoriaResponse> toResponseList(List<Subcategoria> entities);
}