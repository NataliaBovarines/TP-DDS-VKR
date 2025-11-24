package com.yourapp.app.services;

import org.springframework.stereotype.Service;
import com.yourapp.app.repositories.DetalleVentaRepository;

@Service
public class DetalleVentaService {
    private final DetalleVentaRepository detalleVentaRepository;

    public DetalleVentaService(DetalleVentaRepository detalleVentaRepository) {
        this.detalleVentaRepository = detalleVentaRepository;
    }
}
