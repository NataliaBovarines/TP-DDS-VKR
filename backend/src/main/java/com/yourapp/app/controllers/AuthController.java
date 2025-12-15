package com.yourapp.app.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.yourapp.app.mappers.UsuarioMapper;
import com.yourapp.app.models.dto.TokenResponseDto;
import com.yourapp.app.models.dto.UsuarioContraseniaDto;
import com.yourapp.app.models.dto.UsuarioLoginDto;
import com.yourapp.app.models.dto.UsuarioMeDto;
import com.yourapp.app.models.dto.UsuarioRegisterDto;
import com.yourapp.app.models.entities.Usuario;
import com.yourapp.app.services.AuthService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public TokenResponseDto register(@RequestBody @Valid UsuarioRegisterDto usuarioDto) {
        return authService.register(usuarioDto);
    }

    @PostMapping("/login")
    public TokenResponseDto login(@RequestBody @Valid UsuarioLoginDto usuarioDto) {
        return authService.login(usuarioDto);
    }

    @PatchMapping
    public void cambiarContrasenia(@RequestBody @Valid UsuarioContraseniaDto usuarioDto) {
        authService.cambiarContrasenia(usuarioDto);
    }

    @GetMapping("/me")
    public UsuarioMeDto me() {
        Usuario usuarioLogueado = authService.obtenerUsuarioLogueado();
        return UsuarioMapper.fromEntityToUsuarioMeDto(usuarioLogueado);
    } 
}
