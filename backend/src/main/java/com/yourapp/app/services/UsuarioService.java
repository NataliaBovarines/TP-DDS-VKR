package com.yourapp.app.services;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.yourapp.app.exceptions.BadRequestException;
import com.yourapp.app.exceptions.ConflictException;
import com.yourapp.app.exceptions.NotFoundException;
import com.yourapp.app.exceptions.UnauthorizedException;
import com.yourapp.app.mappers.UsuarioMapper;
import com.yourapp.app.models.dto.UsuarioRolDto;
import com.yourapp.app.models.dto.EmpleadoDto;
import com.yourapp.app.models.dto.UsuarioContraseniaDto;
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
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public Usuario crearUsuario(EmpleadoDto empleadoDto) {
        Rol rol = rolService.obtenerRol(empleadoDto.getRolId());

        String nombreDeUsuario = generarNombreDeUsuario(empleadoDto.getNombre(), empleadoDto.getApellido());

        Usuario usuario = UsuarioMapper.toEntity(nombreDeUsuario, rol);

        usuario.setContrasenia(passwordEncoder.encode(empleadoDto.getDni()));
        
        return usuarioRepository.save(usuario);
    }

    public String generarNombreDeUsuario(String nombre, String apellido) {
        String nombreLimpio = nombre.trim().toLowerCase();
        String apellidoLimpio = apellido.trim().toLowerCase().replaceAll("\\s+", "");
        
        for (int i = 1; i <= nombreLimpio.length(); i++) {
            String parteNombre = nombreLimpio.substring(0, i);
            String nombreTentativo = parteNombre + apellidoLimpio;

            if (!existeUsuarioByNombre(nombreTentativo)) return nombreTentativo;
        }
        
        int sufijo = 1;
        String base = nombreLimpio + apellidoLimpio;
        String nombreTentativo;
        
        do {
            nombreTentativo = base + sufijo;
            if (!existeUsuarioByNombre(nombreTentativo)) return nombreTentativo;
            sufijo++;
        } while (sufijo < 100);

        throw new ConflictException("No se pudo generar un nombre de usuario");
    }

    public boolean existeUsuarioByNombre(String nombreDeUsuario) {
        return usuarioRepository.existsByNombreDeUsuario(nombreDeUsuario);
    }

    public Usuario obtenerUsuarioCompleto(Long id) {
        return usuarioRepository.findById(id).orElseThrow(() -> new NotFoundException("Usuario no encontrado"));
    }

    public UsuarioResponseDto obtenerUsuario(Long id) {
        Usuario usuarioGuardado = obtenerUsuarioCompleto(id);
        return UsuarioMapper.fromEntity(usuarioGuardado);
    }

    public Usuario obtenerUsuarioByNombre(String nombreDeUsuario) {
        Usuario usuario = usuarioRepository.findByNombreDeUsuario(nombreDeUsuario);
    
        if (usuario == null) throw new NotFoundException("Usuario no encontrado");
    
        return usuario;
    }

    @Transactional
    public UsuarioResponseDto actualizarRolUsuario(Long id, UsuarioRolDto usuarioDto) {
        Usuario usuario = obtenerUsuarioCompleto(id);

        Rol rol = rolService.obtenerRol(usuarioDto.getRolId());

        usuario.setRol(rol);

        Usuario usuarioGuardado = usuarioRepository.save(usuario);

        return UsuarioMapper.fromEntity(usuarioGuardado);
    }

    @Transactional
    public void actualizarContraseniaUsuario(Usuario usuario, UsuarioContraseniaDto usuarioDto) {
        if (!passwordEncoder.matches(usuarioDto.getContraseniaActual(), usuario.getContrasenia())) throw new UnauthorizedException("La contraseña actual es incorrecta");
        
        usuario.setContrasenia(passwordEncoder.encode(usuarioDto.getContraseniaNueva()));
        usuario.setPrimerLogin(false);

        usuarioRepository.save(usuario);
    }

    @Transactional
    public void eliminarUsuario(Usuario usuario) {
        usuario.softDelete();

        usuarioRepository.save(usuario);
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
