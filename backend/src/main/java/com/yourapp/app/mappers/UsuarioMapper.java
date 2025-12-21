package com.yourapp.app.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import com.yourapp.app.models.dto.usuario.UsuarioResponse;
import com.yourapp.app.models.entities.Usuario;

@Mapper(
    componentModel = "spring", 
    unmappedTargetPolicy = ReportingPolicy.IGNORE,
    uses = { RolMapper.class }
)
public interface UsuarioMapper {
    // --- SALIDA ---
    UsuarioResponse toResponse(Usuario entity);
}