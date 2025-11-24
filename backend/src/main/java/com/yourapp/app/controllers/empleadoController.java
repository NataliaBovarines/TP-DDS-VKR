package com.yourapp.app.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.yourapp.app.services.EmpleadoService;

@RestController
@RequestMapping("/empleados")
public class EmpleadoController {
    private final EmpleadoService empleadoService;

    public EmpleadoController(EmpleadoService empleadoService) {
        this.empleadoService = empleadoService;
    }
}
