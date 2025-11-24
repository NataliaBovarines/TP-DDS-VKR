package com.yourapp.app.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.yourapp.app.services.ProveedorService;

@RestController
@RequestMapping("/proveedores")
public class ProveedorController {
    private final ProveedorService proveedorService;

    public ProveedorController(ProveedorService proveedorService) {
        this.proveedorService = proveedorService;
    }
}
