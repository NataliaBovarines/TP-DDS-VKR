package com.yourapp.app.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.yourapp.app.models.dto.SubcategoriaDto;
import com.yourapp.app.models.dto.SubcategoriaFiltroDto;
import com.yourapp.app.models.entities.Subcategoria;
import com.yourapp.app.services.SubcategoriaService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/subcategorias")
@RequiredArgsConstructor
public class SubcategoriaController {
    private final SubcategoriaService subcategoriaService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAuthority('SUBCATEGORIA_CREAR')")
    public Subcategoria crearSubcategoria(@RequestBody @Valid SubcategoriaDto subcategoriaDto) {
        return subcategoriaService.crearSubcategoria(subcategoriaDto);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK) 
    public List<Subcategoria> obtenerSubcategoriasByCategoria(@Valid @ModelAttribute SubcategoriaFiltroDto filtros) {
        return subcategoriaService.obtenerSubcategoriasByCategoria(filtros);
    }
}
