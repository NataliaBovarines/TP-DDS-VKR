package com.yourapp.app.services;

import org.springframework.stereotype.Service;
import com.yourapp.app.repositories.DetalleVentaRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DetalleVentaService {
    private final DetalleVentaRepository detalleVentaRepository;
}
