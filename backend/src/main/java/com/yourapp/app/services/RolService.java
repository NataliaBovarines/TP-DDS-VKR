package com.yourapp.app.services;

import org.springframework.stereotype.Service;

import com.yourapp.app.mappers.RolMapper;
import com.yourapp.app.models.dto.RolDto;
import com.yourapp.app.models.entities.Rol;
import com.yourapp.app.repositories.RolRepository;

@Service
public class RolService {
    private final RolRepository rolRepository;

    public RolService(RolRepository rolRepository) {
        this.rolRepository = rolRepository;
    }

    public Rol crear(RolDto rolDto) {
        Rol rol = RolMapper.toEntity(rolDto);
        return rolRepository.save(rol);
    }

    public Rol obtener(Long rolId) {
        return rolRepository
            .findById(rolId)
            .orElseThrow(() -> new RuntimeException("Rol no encontrado")); // TODO: CAMBIAR A ERRORES DE NUESTRA APP
    }
}
