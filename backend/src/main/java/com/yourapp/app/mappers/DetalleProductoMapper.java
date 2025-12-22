package com.yourapp.app.mappers;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import com.yourapp.app.models.dto.producto.DetalleProductoCreateRequest;
import com.yourapp.app.models.dto.producto.DetalleProductoResponse;
import com.yourapp.app.models.dto.producto.DetalleProductoUpdateRequest;
import com.yourapp.app.models.entities.DetalleProducto;

@Mapper(
    componentModel = "spring", 
    unmappedTargetPolicy = ReportingPolicy.IGNORE,
    uses = { TalleMapper.class, ColorMapper.class }
)
public interface DetalleProductoMapper {
    // --- ENTRADA ---
    DetalleProducto toEntity(DetalleProductoCreateRequest dto);

    // --- SALIDA ---
    DetalleProductoResponse toResponse(DetalleProducto entity);

    List<DetalleProductoResponse> toResponseList(List<DetalleProducto> entities);
}