package com.yourapp.app.services;

import org.springframework.stereotype.Service;

import com.yourapp.app.mappers.UsuarioMapper;
import com.yourapp.app.models.dto.UsuarioDto;
import com.yourapp.app.models.dto.UsuarioResponseDto;
import com.yourapp.app.models.entities.Rol;
import com.yourapp.app.models.entities.Usuario;
import com.yourapp.app.repositories.UsuarioRepository;

@Service
public class UsuarioService {
    private final UsuarioRepository usuarioRepository;
    private final RolService rolService;

    public UsuarioService(UsuarioRepository usuarioRepository, RolService rolService) {
        this.usuarioRepository = usuarioRepository;
        this.rolService = rolService;
    }

    public UsuarioResponseDto crear(UsuarioDto usuarioDto) {
        Rol rol = rolService.obtener(usuarioDto.getRolId());
        Usuario usuario = UsuarioMapper.toEntity(usuarioDto, rol);
        Usuario usuarioGuardado = usuarioRepository.save(usuario);
        return UsuarioMapper.fromEntity(usuarioGuardado);
    }
}
