package com.yourapp.app.services;

import org.springframework.stereotype.Service;
import com.yourapp.app.repositories.ProveedorRepository;

@Service
public class ProveedorService {
    private final ProveedorRepository proveedorRepository;

    public ProveedorService(ProveedorRepository proveedorRepository) {
        this.proveedorRepository = proveedorRepository;
    }
}
