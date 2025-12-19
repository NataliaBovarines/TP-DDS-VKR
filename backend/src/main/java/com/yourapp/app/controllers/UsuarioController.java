package com.yourapp.app.controllers;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.yourapp.app.models.dto.UsuarioRolDto;
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

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAuthority('USUARIO_VER') or #id == authentication.principal.id")
    public UsuarioResponseDto obtenerUsuario(@PathVariable Long id) {
        return usuarioService.obtenerUsuario(id);
    }

    @PatchMapping("/{id}")
    @ResponseStatus(HttpStatus.OK) 
    @PreAuthorize("hasAuthority('USUARIO_MODIFICAR')")
    public UsuarioResponseDto actualizarRolUsuario(@PathVariable Long id, @RequestBody @Valid UsuarioRolDto usuarioDto ) {
        return usuarioService.actualizarRolUsuario(id, usuarioDto);
    }

    // @GetMapping
    // @ResponseStatus(HttpStatus.OK)
    // @PreAuthorize("hasAuthority('USUARIO_VER')")
    // public Page<UsuarioResponseDto> obtenerUsuariosFiltrados(@Valid @ModelAttribute UsuarioFiltroDto filtros) {
    //     return usuarioService.obtenerUsuariosFiltrados(filtros);
    // }
}
