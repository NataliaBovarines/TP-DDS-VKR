package com.yourapp.app.services;

import org.springframework.stereotype.Service;
import com.yourapp.app.repositories.EmpleadoRepository;

@Service
public class EmpleadoService {
    private final EmpleadoRepository empleadoRepository;

    public EmpleadoService(EmpleadoRepository empleadoRepository) {
        this.empleadoRepository = empleadoRepository;
    }
}
