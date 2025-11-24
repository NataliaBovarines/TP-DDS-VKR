package com.yourapp.app.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.yourapp.app.services.TipoDePrendaService;

@RestController
@RequestMapping("/tipos-de-prenda")
public class TipoDePrendaController {
    private final TipoDePrendaService tipoDePrendaService;

    public TipoDePrendaController(TipoDePrendaService tipoDePrendaService) {
        this.tipoDePrendaService = tipoDePrendaService;
    }
}
