package com.yourapp.app.services;

import org.springframework.stereotype.Service;
import com.yourapp.app.repositories.VentaRepository;

@Service
public class VentaService {
    private final VentaRepository ventaRepository;

    public VentaService(VentaRepository ventaRepository) {
        this.ventaRepository = ventaRepository;
    }
}
