package com.yourapp.app.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.yourapp.app.services.DetalleVentaService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/detalle-ventas")
@RequiredArgsConstructor
public class DetalleVentaController {
    private final DetalleVentaService detalleVentaService;
}
