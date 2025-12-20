package com.yourapp.app.services;

import org.springframework.stereotype.Service;

import com.yourapp.app.exceptions.ConflictException;
import com.yourapp.app.exceptions.NotFoundException;
import com.yourapp.app.mappers.RolMapper;
import com.yourapp.app.models.dto.RolDto;
import com.yourapp.app.models.entities.usuario.Rol;
import com.yourapp.app.repositories.RolRepository;

@Service
public class RolService {
    private final RolRepository rolRepository;

    public RolService(RolRepository rolRepository) {
        this.rolRepository = rolRepository;
    }

    public Rol crear(RolDto rolDto) {
        if (rolRepository.existsByNombre(rolDto.getNombre())) {
            throw new ConflictException("El nombre del rol ya está en uso");
        }

        Rol rol = RolMapper.toEntity(rolDto);
        return rolRepository.save(rol);
    }

    public Rol obtener(Long rolId) {
        return rolRepository
            .findById(rolId)
            .orElseThrow(() -> new NotFoundException("Rol no encontrado"));
    }
}
