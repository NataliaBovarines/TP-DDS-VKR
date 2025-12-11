package com.yourapp.app.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.yourapp.app.models.dto.TalleDto;
import com.yourapp.app.models.entities.Talle;
import com.yourapp.app.services.TalleService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/talles")
public class TalleController {
    private final TalleService talleService;

    public TalleController(TalleService talleService) {
        this.talleService = talleService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Talle crearTalle(@RequestBody @Valid TalleDto talleDto) {
        return talleService.crearTalle(talleDto);
    }
}
