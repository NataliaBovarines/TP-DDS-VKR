package com.yourapp.app.services;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.yourapp.app.exceptions.UnauthorizedException;
import com.yourapp.app.mappers.UsuarioMapper;
import com.yourapp.app.models.dto.TokenResponseDto;
import com.yourapp.app.models.dto.UsuarioContraseniaDto;
import com.yourapp.app.models.dto.UsuarioLoginDto;
import com.yourapp.app.models.dto.UsuarioRegisterDto;
import com.yourapp.app.models.entities.Rol;
import com.yourapp.app.models.entities.Usuario;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UsuarioService usuarioService;
    private final RolService rolService;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public TokenResponseDto register(UsuarioRegisterDto usuarioDto) {
        Rol rol = rolService.obtenerRol(usuarioDto.getRolId());

        Usuario usuario = UsuarioMapper.toEntity(usuarioDto, rol);

        usuario.setContrasenia(passwordEncoder.encode(usuarioDto.getContrasenia()));

        usuarioService.guardarUsuario(usuario);

        String token = jwtService.generateToken(usuario);

        return new TokenResponseDto(token);
    }

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

        if (!passwordEncoder.matches(usuarioDto.getContraseniaActual(), usuario.getContrasenia())) throw new UnauthorizedException("La contraseña actual es incorrecta");
        
        usuario.setContrasenia(passwordEncoder.encode(usuarioDto.getContraseniaNueva()));

        usuarioService.guardarUsuario(usuario);
    }

    public Usuario obtenerUsuarioLogueado() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        
        if (auth == null || !auth.isAuthenticated()) throw new UnauthorizedException("Usuario no autenticado");

        String nombreDeUsuario = auth.getName();

        return usuarioService.obtenerUsuarioByNombre(nombreDeUsuario);
    }
}
