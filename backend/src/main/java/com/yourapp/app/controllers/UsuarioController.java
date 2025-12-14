package com.yourapp.app.controllers;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.yourapp.app.models.dto.UsuarioCambioDto;
import com.yourapp.app.models.dto.UsuarioDto;
import com.yourapp.app.models.dto.UsuarioFiltroDto;
import com.yourapp.app.models.dto.UsuarioResponseDto;
import com.yourapp.app.services.UsuarioService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/usuarios") 
@RequiredArgsConstructor
public class UsuarioController {
    private final UsuarioService usuarioService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UsuarioResponseDto crearUsuario(@RequestBody @Valid UsuarioDto usuarioDto) {
        return usuarioService.crearUsuario(usuarioDto);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public UsuarioResponseDto obtenerUsuario(@PathVariable Long id) {
        return usuarioService.obtenerUsuario(id);
    }

    @PatchMapping("/{id}")
    @ResponseStatus(HttpStatus.OK) 
    public UsuarioResponseDto actualizarRolUsuario(@PathVariable Long id, @RequestBody @Valid UsuarioCambioDto usuarioDto ) {
        return usuarioService.actualizarRolUsuario(id, usuarioDto);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public Page<UsuarioResponseDto> obtenerUsuariosFiltrados(@PathVariable UsuarioFiltroDto filtros) {
        return usuarioService.obtenerUsuariosFiltrados(filtros);
    }
}
