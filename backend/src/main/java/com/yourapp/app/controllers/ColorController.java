package com.yourapp.app.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.yourapp.app.models.dto.ColorDto;
import com.yourapp.app.models.entities.Color;
import com.yourapp.app.services.ColorService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/colores")
@RequiredArgsConstructor
public class ColorController {
    private final ColorService colorService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAuthority('COLOR_CREAR')")
    public Color crearColor(@RequestBody @Valid ColorDto colorDto) {
        return colorService.crearColor(colorDto);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK) 
    public List<Color> obtenerTodosLosColores() {
        return colorService.obtenerTodosLosColores();
    }
}
