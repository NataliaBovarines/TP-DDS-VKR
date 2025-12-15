package com.yourapp.app.services;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import com.yourapp.app.models.entities.Usuario;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UsuarioDetailsService implements UserDetailsService {
    private final UsuarioService usuarioService;

    @Override
    public UserDetails loadUserByUsername(String username) {
        Usuario usuario = usuarioService.obtenerUsuarioByNombre(username);

        return new User(
            usuario.getNombreDeUsuario(),
            usuario.getContrasenia(),
            mapAuthorities(usuario)
        );
    }

    private Collection<? extends GrantedAuthority> mapAuthorities(Usuario usuario) {
        return usuario.getRol().getPermisos().stream()
            .map(p -> new SimpleGrantedAuthority(p.name()))
            .toList();
    }  
}
