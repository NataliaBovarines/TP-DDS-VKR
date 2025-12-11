package com.yourapp.app.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.yourapp.app.exceptions.ConflictException;
import com.yourapp.app.exceptions.NotFoundException;
import com.yourapp.app.mappers.ProveedorMapper;
import com.yourapp.app.models.dto.ProveedorDto;
import com.yourapp.app.models.entities.Proveedor;
import com.yourapp.app.repositories.ProveedorRepository;

@Service
public class ProveedorService {
    private final ProveedorRepository proveedorRepository;

    public ProveedorService(ProveedorRepository proveedorRepository) {
        this.proveedorRepository = proveedorRepository;
    }
    
    public Proveedor crearProveedor(ProveedorDto proveedorDto) {
        if (proveedorRepository.existsByNombre(proveedorDto.getNombre())) throw new ConflictException("El nombre del proveedor ya está en uso");
        Proveedor proveedor = ProveedorMapper.toEntity(proveedorDto);
        return proveedorRepository.save(proveedor);
    }

    public Proveedor obtenerProveedor(Long proveedorId) {
        return proveedorRepository.findById(proveedorId).orElseThrow(() -> new NotFoundException("Proveedor no encontrado"));
    }

    public List<Proveedor> obtenerTodosLosProveedores() {
        return proveedorRepository.findAll();
    }
}
