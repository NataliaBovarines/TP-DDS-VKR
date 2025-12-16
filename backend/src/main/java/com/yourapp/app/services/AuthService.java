package com.yourapp.app.services;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.yourapp.app.exceptions.ConflictException;
import com.yourapp.app.exceptions.NotFoundException;
import com.yourapp.app.exceptions.UnauthorizedException;
import com.yourapp.app.models.dto.TokenResponseDto;
import com.yourapp.app.models.dto.UsuarioContraseniaDto;
import com.yourapp.app.models.dto.UsuarioContraseniaRecuperarDto;
import com.yourapp.app.models.dto.UsuarioContraseniaResetearDto;
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

    public TokenResponseDto cambiarContrasenia(UsuarioContraseniaDto usuarioDto) {
        Usuario usuario = obtenerUsuarioLogueado();

        Usuario usuarioActualizado = usuarioService.actualizarContraseniaUsuario(usuario, usuarioDto);

        String jwtToken = jwtService.generateToken(usuarioActualizado);

        return new TokenResponseDto(jwtToken);
    }

    public void recuperarContrasenia(UsuarioContraseniaRecuperarDto usuarioDto) {
        try {
            Usuario usuario = usuarioService.obtenerUsuarioByMail(usuarioDto.getMail());
            String token = UUID.randomUUID().toString();
            usuarioService.recuperarContrasenia(usuario, token);
        } catch (NotFoundException e) {}
    }

    public void resetearContrasenia(UsuarioContraseniaResetearDto usuarioDto) {
        Usuario usuario = usuarioService.obtenerUsuarioByToken(usuarioDto.getToken());

        if (usuario.getResetTokenExpiracion() == null || usuario.getResetTokenExpiracion().isBefore(LocalDateTime.now())) throw new ConflictException("Token inválido o expirado");

        usuarioService.resetearContrasenia(usuario, usuarioDto.getContraseniaNueva());
    }

    public Usuario obtenerUsuarioLogueado() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        
        if (auth == null || !auth.isAuthenticated()) throw new UnauthorizedException("Usuario no autenticado");

        return usuarioService.obtenerUsuarioByNombre(auth.getName());
    }
}
