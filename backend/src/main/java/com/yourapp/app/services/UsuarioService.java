package com.yourapp.app.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.yourapp.app.exceptions.ConflictException;
import com.yourapp.app.exceptions.NotFoundException;
import com.yourapp.app.mappers.UsuarioMapper;
import com.yourapp.app.models.dto.UsuarioDto;
import com.yourapp.app.models.dto.UsuarioResponseDto;
import com.yourapp.app.models.entities.Usuario;
import com.yourapp.app.models.entities.Rol;
import com.yourapp.app.repositories.UsuarioRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UsuarioService {
    private final UsuarioRepository usuarioRepository;
    private final RolService rolService;

    public UsuarioResponseDto crearUsuario(UsuarioDto usuarioDto) {
        if (usuarioRepository.existsByNombreDeUsuario(usuarioDto.getNombreDeUsuario())) throw new ConflictException("El nombre de usuario ya está en uso");
        Rol rol = rolService.obtenerRol(usuarioDto.getRolId());
        Usuario usuario = UsuarioMapper.toEntity(usuarioDto, rol);
        Usuario usuarioGuardado = usuarioRepository.save(usuario);
        return UsuarioMapper.fromEntity(usuarioGuardado);
    }

    public UsuarioResponseDto obtenerUsuario(Long id) {
        Usuario usuarioGuardado = obtenerUsuarioCompleto(id);
        return UsuarioMapper.fromEntity(usuarioGuardado);
    }

    public List<UsuarioResponseDto> obtenerTodosLosUsuarios() {
        List<Usuario> usuariosGuardados = usuarioRepository.findAll();
        List<UsuarioResponseDto> usuariosDtos = new ArrayList<>();

        for (Usuario u : usuariosGuardados) usuariosDtos.add(UsuarioMapper.fromEntity(u));

        return usuariosDtos;
    }

    public Usuario obtenerUsuarioCompleto(Long id) {
        return usuarioRepository.findById(id).orElseThrow(() -> new NotFoundException("Usuario no encontrado"));
    } 
}
