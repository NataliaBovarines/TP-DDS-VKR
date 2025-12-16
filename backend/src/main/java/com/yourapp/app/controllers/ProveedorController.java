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

import com.yourapp.app.models.dto.ProveedorDto;
import com.yourapp.app.models.entities.Proveedor;
import com.yourapp.app.services.ProveedorService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/proveedores")
@RequiredArgsConstructor
public class ProveedorController {
    private final ProveedorService proveedorService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAuthority('PROVEEDOR_CREAR')")
    public Proveedor crearProveedor(@RequestBody @Valid ProveedorDto proveedorDto) {
        return proveedorService.crearProveedor(proveedorDto);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<Proveedor> obtenerTodosLosProveedores() {
        return proveedorService.obtenerTodosLosProveedores();
    } 
}
