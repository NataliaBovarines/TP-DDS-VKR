package com.yourapp.app.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.yourapp.app.models.dto.RolDto;
import com.yourapp.app.models.entities.Rol;
import com.yourapp.app.services.RolService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/roles")
@RequiredArgsConstructor
public class RolController {
    private final RolService rolService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Rol crearRol(@RequestBody @Valid RolDto rolDto) {
        return rolService.crearRol(rolDto);
    }

    @PatchMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void eliminarRol(@PathVariable Long id) {
        rolService.eliminarRol(id);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK) 
    public List<Rol> obtenerTodosLosRoles() {
        return rolService.obtenerTodosLosRoles();
    }
}
