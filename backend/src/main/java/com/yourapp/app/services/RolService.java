package com.yourapp.app.services;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.yourapp.app.exceptions.ConflictException;
import com.yourapp.app.exceptions.NotFoundException;
import com.yourapp.app.mappers.RolMapper;
import com.yourapp.app.models.dto.RolCambioDto;
import com.yourapp.app.models.dto.RolDto;
import com.yourapp.app.models.entities.Permiso;
import com.yourapp.app.models.entities.Rol;
import com.yourapp.app.repositories.RolRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RolService {
    private final RolRepository rolRepository;

    // ============================ CREAR UN ROL ============================
    @Transactional
    public Rol crearRol(RolDto rolDto) {
        if (rolRepository.existsByNombreAndFueEliminadoFalse(rolDto.getNombre())) throw new ConflictException("El nombre del rol ya está en uso");
        Rol rol = RolMapper.toEntity(rolDto);
        return rolRepository.save(rol);
    }

    // ============================ ACTUALIZAR LOS PERMISOS DE UN ROL ============================
    // El front debe enviar la lista completa de los permisos que quedaron seleccionados finalmente
    @Transactional
    public Rol actualizarPermisos(Long rolId, RolCambioDto rolDto) {
        Rol rol = obtenerRol(rolId);

        rol.getPermisos().clear();
        if (rolDto.getPermisos() != null) rol.getPermisos().addAll(rolDto.getPermisos());
        
        return rolRepository.save(rol);
    }
    
    // ============================ ELIMINAR UN ROL ============================
    public void eliminarRol(Long id) {
        Rol rol = obtenerRol(id);
        rol.softDelete();
        rolRepository.save(rol);
    }

    // ============================ OBTENER UN ROL ============================
    public Rol obtenerRol(Long rolId) {
        Rol rol = rolRepository.findById(rolId).orElseThrow(() -> new NotFoundException("Rol no encontrado"));
        if (rol.getFueEliminado()) throw new NotFoundException("Rol eliminado");
        return rol;
    }

    // ============================ OBTENER TODOS LOS ROLES ============================
    public List<Rol> obtenerTodosLosRoles() {
        return rolRepository.findByFueEliminadoFalse();
    }
}
