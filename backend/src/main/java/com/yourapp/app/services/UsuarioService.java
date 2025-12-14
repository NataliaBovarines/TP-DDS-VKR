package com.yourapp.app.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.yourapp.app.exceptions.BadRequestException;
import com.yourapp.app.exceptions.ConflictException;
import com.yourapp.app.exceptions.NotFoundException;
import com.yourapp.app.mappers.UsuarioMapper;
import com.yourapp.app.models.dto.UsuarioCambioDto;
import com.yourapp.app.models.dto.UsuarioDto;
import com.yourapp.app.models.dto.UsuarioFiltroDto;
import com.yourapp.app.models.dto.UsuarioResponseDto;
import com.yourapp.app.models.entities.Usuario;
import com.yourapp.app.models.entities.Rol;
import com.yourapp.app.repositories.UsuarioRepository;

import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UsuarioService {
    private final UsuarioRepository usuarioRepository;
    private final RolService rolService;

    @Transactional
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

    public Usuario obtenerUsuarioCompleto(Long id) {
        return usuarioRepository.findById(id).orElseThrow(() -> new NotFoundException("Usuario no encontrado"));
    }

    @Transactional
    public UsuarioResponseDto actualizarRolUsuario(Long id, UsuarioCambioDto usuarioDto) {
        Usuario usuario = obtenerUsuarioCompleto(id);

        Rol rol = rolService.obtenerRol(usuarioDto.getRolId());

        if (usuarioDto.getRolId() != null) usuario.setRol(rol);

        Usuario usuarioGuardado = usuarioRepository.save(usuario);

        return UsuarioMapper.fromEntity(usuarioGuardado);
    }
    
    public Page<UsuarioResponseDto> obtenerUsuariosFiltrados(UsuarioFiltroDto filtros) {
        // --------- ORDENAMIENTO ----------
        Sort sort = Sort.unsorted();

        if (filtros.getOrden() != null) {
            List<String> camposPermitidos = List.of("nombreDeUsuario");

            String campo = filtros.getOrden().toLowerCase();

            if (camposPermitidos.contains(campo)) {
                Sort.Direction direccion = Sort.Direction.ASC;
                if ("desc".equalsIgnoreCase(filtros.getDireccion())) {
                    direccion = Sort.Direction.DESC;
                }
                sort = Sort.by(direccion, campo);
            } else {
                throw new BadRequestException("No se puede ordenar por el campo: " + campo);
            }
        }

        // --------- ESPECIFICACION ----------
        Specification<Usuario> spec = (root, query, cb) -> cb.conjunction();

        spec = spec.and((root, query, cb) -> cb.isFalse(root.get("fueEliminado")));

        // Filtrar por nombre de usuario
        if (filtros.getNombreDeUsuario() != null && !filtros.getNombreDeUsuario().isBlank()) {
            spec = spec.and((root, query, cb) ->
                cb.like(cb.lower(root.get("nombreDeUsuario")), "%" + filtros.getNombreDeUsuario().toLowerCase() + "%")
            );
        }

        // Filtrar por rol
        if (filtros.getRolId() != null) {
            spec = spec.and((root, query, cb) ->
                cb.equal(root.get("rol").get("id"), filtros.getRolId())
            );
        }

        // --------- PAGINACION ----------
        int pagina = (filtros.getPagina() != null && filtros.getPagina() >= 0) ? filtros.getPagina() : 0;
        int tamanio = 10;
        Pageable pageable = PageRequest.of(pagina, tamanio, sort);

        // --------- CONSULTA ----------
        Page<Usuario> usuarios = usuarioRepository.findAll(spec, pageable);

        return usuarios.map(UsuarioMapper::fromEntity);
    }
}
