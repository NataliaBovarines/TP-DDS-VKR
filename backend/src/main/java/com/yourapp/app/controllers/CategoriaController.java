package com.yourapp.app.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.yourapp.app.models.dto.CategoriaDto;
import com.yourapp.app.models.entities.Categoria;
import com.yourapp.app.services.CategoriaService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/categorias")
@RequiredArgsConstructor
public class CategoriaController {
    private final CategoriaService categoriaService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAuthority('CATEGORIA_CREAR')")
    public Categoria crearCategoria(@RequestBody @Valid CategoriaDto categoriaDto) {
        return categoriaService.crearCategoria(categoriaDto);
    }

    @PatchMapping("/{id}/eliminacion")
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAuthority('CATEGORIA_ELIMINAR')")
    public void eliminarCategoria(@PathVariable Long id) {
        categoriaService.eliminarCategoria(id);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK) 
    public List<Categoria> obtenerTodasLasCategorias() {
        return categoriaService.obtenerTodasLasCategorias();
    }
}
