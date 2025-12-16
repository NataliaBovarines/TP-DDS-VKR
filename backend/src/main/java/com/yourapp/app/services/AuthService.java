package com.yourapp.app.services;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.yourapp.app.exceptions.UnauthorizedException;
import com.yourapp.app.models.dto.TokenResponseDto;
import com.yourapp.app.models.dto.UsuarioContraseniaDto;
import com.yourapp.app.models.dto.UsuarioLoginDto;
import com.yourapp.app.models.entities.Usuario;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UsuarioService usuarioService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public TokenResponseDto login(UsuarioLoginDto usuarioDto) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(usuarioDto.getNombreDeUsuario(), usuarioDto.getContrasenia()));
        } catch (BadCredentialsException e) {
            throw new UnauthorizedException("Usuario o contraseña incorrectos");
        }

        Usuario usuario = usuarioService.obtenerUsuarioByNombre(usuarioDto.getNombreDeUsuario());

        String jwtToken = jwtService.generateToken(usuario);

        return new TokenResponseDto(jwtToken);
    }

    public void cambiarContrasenia(UsuarioContraseniaDto usuarioDto) {
        Usuario usuario = obtenerUsuarioLogueado();

        usuarioService.actualizarContraseniaUsuario(usuario, usuarioDto);
    }

    public Usuario obtenerUsuarioLogueado() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        
        if (auth == null || !auth.isAuthenticated()) throw new UnauthorizedException("Usuario no autenticado");

        return usuarioService.obtenerUsuarioByNombre(auth.getName());
    }
}
