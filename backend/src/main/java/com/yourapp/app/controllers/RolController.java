package com.yourapp.app.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.yourapp.app.services.RolService;

@RestController
@RequestMapping("/roles")
public class RolController {
    private final RolService rolService;

    public RolController(RolService rolService) {
        this.rolService = rolService;
    }
}
