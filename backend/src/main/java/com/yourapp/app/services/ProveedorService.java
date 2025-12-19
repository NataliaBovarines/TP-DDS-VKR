package com.yourapp.app.services;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.yourapp.app.exceptions.ConflictException;
import com.yourapp.app.exceptions.NotFoundException;
import com.yourapp.app.mappers.ProveedorMapper;
import com.yourapp.app.models.dto.ProveedorDto;
import com.yourapp.app.models.entities.Proveedor;
import com.yourapp.app.repositories.ProveedorRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProveedorService {
    private final ProveedorRepository proveedorRepository;

    // ============================ CREAR UN PROVEEDOR ============================
    @Transactional
    public Proveedor crearProveedor(ProveedorDto proveedorDto) {
        if (proveedorRepository.existsByNombre(proveedorDto.getNombre())) throw new ConflictException("El nombre del proveedor ya está en uso");
        Proveedor proveedor = ProveedorMapper.toEntity(proveedorDto);
        return proveedorRepository.save(proveedor);
    }

    // ============================ OBTENER UN PROVEEDOR ============================
    public Proveedor obtenerProveedor(Long proveedorId) {
        return proveedorRepository.findById(proveedorId).orElseThrow(() -> new NotFoundException("Proveedor no encontrado"));
    }

    // ============================ OBTENER TODOS LOS PROVEEDORES ============================
    public List<Proveedor> obtenerTodosLosProveedores() {
        return proveedorRepository.findAll();
    }
}
