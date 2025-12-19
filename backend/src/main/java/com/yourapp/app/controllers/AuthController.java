package com.yourapp.app.controllers;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.yourapp.app.mappers.UsuarioMapper;
import com.yourapp.app.models.dto.TokenResponseDto;
import com.yourapp.app.models.dto.UsuarioContraseniaDto;
import com.yourapp.app.models.dto.UsuarioContraseniaRecuperarDto;
import com.yourapp.app.models.dto.UsuarioContraseniaResetearDto;
import com.yourapp.app.models.dto.UsuarioLoginDto;
import com.yourapp.app.models.dto.UsuarioMeDto;
import com.yourapp.app.models.entities.Usuario;
import com.yourapp.app.services.AuthService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/login")
    public TokenResponseDto login(@RequestBody @Valid UsuarioLoginDto usuarioDto) {
        return authService.login(usuarioDto);
    }

    @PostMapping("/cambiar-contrasenia")
    @PreAuthorize("isAuthenticated()")
    public TokenResponseDto cambiarContrasenia(@RequestBody @Valid UsuarioContraseniaDto usuarioDto) {
        return authService.cambiarContrasenia(usuarioDto);
    }

    @PostMapping("/recuperar-contrasenia")
    public void recuperarContrasenia(@RequestBody @Valid UsuarioContraseniaRecuperarDto usuarioDto) {
        authService.recuperarContrasenia(usuarioDto);
    }

    @PostMapping("/resetear-contrasenia") 
    public void resetearContrasenia(@RequestBody @Valid UsuarioContraseniaResetearDto usuarioDto) {
        authService.resetearContrasenia(usuarioDto);
    }

    @GetMapping("/me")
    @PreAuthorize("isAuthenticated()")
    public UsuarioMeDto me() {
        Usuario usuarioLogueado = authService.obtenerUsuarioLogueado();
        return UsuarioMapper.fromEntityToUsuarioMeDto(usuarioLogueado);
    } 
}
