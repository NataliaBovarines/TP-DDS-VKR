package com.yourapp.app.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.yourapp.app.services.VentaService;

@RestController
@RequestMapping("/ventas")
public class VentaController {
    private final VentaService ventaService;

    public VentaController(VentaService ventaService) {
        this.ventaService = ventaService;
    }
}
