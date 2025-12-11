package com.yourapp.app.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.yourapp.app.models.dto.TipoDePrendaDto;
import com.yourapp.app.models.entities.TipoDePrenda;
import com.yourapp.app.services.TipoDePrendaService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/tipos-de-prenda")
public class TipoDePrendaController {
    private final TipoDePrendaService tipoDePrendaService;

    public TipoDePrendaController(TipoDePrendaService tipoDePrendaService) {
        this.tipoDePrendaService = tipoDePrendaService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TipoDePrenda crearTipoDePrenda(@RequestBody @Valid TipoDePrendaDto tipoDePrendaDto) {
        return tipoDePrendaService.crearTipoDePrenda(tipoDePrendaDto);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK) 
    public List<TipoDePrenda> obtenerTodosLosTipos() {
        return tipoDePrendaService.obtenerTodosLosTipos();
    }
}
