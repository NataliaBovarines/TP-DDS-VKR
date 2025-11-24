package com.yourapp.app.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.yourapp.app.services.DetalleVentaService;

@RestController
@RequestMapping("/detalle-ventas")
public class DetalleVentaController {
    private final DetalleVentaService detalleVentaService;

    public DetalleVentaController(DetalleVentaService detalleVentaService) {
        this.detalleVentaService = detalleVentaService;
    }
}
