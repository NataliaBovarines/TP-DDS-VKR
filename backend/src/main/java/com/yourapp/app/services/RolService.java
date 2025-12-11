package com.yourapp.app.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.yourapp.app.exceptions.ConflictException;
import com.yourapp.app.exceptions.NotFoundException;
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

    public Rol crearRol(RolDto rolDto) {
        if (rolRepository.existsByNombre(rolDto.getNombre())) throw new ConflictException("El nombre del rol ya está en uso");
        Rol rol = RolMapper.toEntity(rolDto);
        return rolRepository.save(rol);
    }

    public Rol obtenerRol(Long rolId) {
        return rolRepository.findById(rolId).orElseThrow(() -> new NotFoundException("Rol no encontrado"));
    }

    public List<Rol> obtenerTodosLosRoles() {
        return rolRepository.findAll();
    }
}
