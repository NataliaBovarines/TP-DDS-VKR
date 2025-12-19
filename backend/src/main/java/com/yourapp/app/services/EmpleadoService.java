package com.yourapp.app.services;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.yourapp.app.exceptions.BadRequestException;
import com.yourapp.app.exceptions.ConflictException;
import com.yourapp.app.exceptions.NotFoundException;
import com.yourapp.app.mappers.EmpleadoMapper;
import com.yourapp.app.models.dto.EmpleadoCambioDto;
import com.yourapp.app.models.dto.EmpleadoDto;
import com.yourapp.app.models.dto.EmpleadoFiltroDto;
import com.yourapp.app.models.dto.EmpleadoResponseDto;
import com.yourapp.app.models.entities.Empleado;
import com.yourapp.app.models.entities.Usuario;
import com.yourapp.app.repositories.EmpleadoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmpleadoService {
    private final EmpleadoRepository empleadoRepository;
    private final UsuarioService usuarioService;

    // ============================ CREAR EMPLEADO (CREANDOLE ADEMAS SU USUARIO) ============================
    @Transactional
    public EmpleadoResponseDto crearEmpleado(EmpleadoDto empleadoDto) {
        if (empleadoRepository.existsByDniAndFueEliminadoFalse(empleadoDto.getDni())) throw new ConflictException("Ya existe un empleado con el DNI proporcionado");

        Usuario usuario = usuarioService.crearUsuario(empleadoDto);

        Empleado empleado = EmpleadoMapper.toEntity(empleadoDto, usuario);

        usuario.setEmpleado(empleado);

        Empleado empleadoGuardado = empleadoRepository.save(empleado);

        return EmpleadoMapper.fromEntity(empleadoGuardado);
    }

    // ============================ OBTENER UN EMPLEADO RESPONSE ============================
    public EmpleadoResponseDto obtenerEmpleado(Long id) {
        Empleado empleadoGuardado = obtenerEmpleadoCompleto(id);
        return EmpleadoMapper.fromEntity(empleadoGuardado);
    }

    // ============================ OBTENER UN EMPLEADO ============================
    public Empleado obtenerEmpleadoCompleto(Long id) {
        Empleado empleado = empleadoRepository.findById(id).orElseThrow(() -> new NotFoundException("Empleado no encontrado"));
        if (empleado.getFueEliminado()) throw new NotFoundException("Empleado eliminado");
        return empleado;
    }

    // ============================ ACTUALIZAR UN EMPLEADO ============================
    @Transactional
    public EmpleadoResponseDto actualizarEmpleado(Long id, EmpleadoCambioDto empleadoDto) {
        Empleado empleado = obtenerEmpleadoCompleto(id);

        if (empleadoDto.getDireccion() != null && !empleadoDto.getDireccion().isBlank()) empleado.setDireccion(empleadoDto.getDireccion());
        if (empleadoDto.getMail() != null) empleado.setMail(empleadoDto.getMail());
        if (empleadoDto.getTelefono() != null) empleado.setTelefono(empleadoDto.getTelefono());

        Empleado empleadoGuardado = empleadoRepository.save(empleado);  

        return EmpleadoMapper.fromEntity(empleadoGuardado);
    }

    // ============================ ELIMINAR UN EMPLEADO + SU USUARIO ============================
    @Transactional
    public void eliminarEmpleado(Long id) {
        Empleado empleado = obtenerEmpleadoCompleto(id);

        empleado.softDelete();
        
        empleadoRepository.save(empleado);
    }

    // ============================ OBTENER EMPLEADOS CON FILTROS ============================
    public Page<EmpleadoResponseDto> obtenerEmpleadosFiltrados(EmpleadoFiltroDto filtros) {
        // --------- ORDENAMIENTO ----------
        Sort sort = Sort.unsorted();

        if (filtros.getOrden() != null) {
            List<String> camposPermitidos = List.of("nombre", "apellido", "dni");

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
        Specification<Empleado> spec = (root, query, cb) -> cb.conjunction();

        spec = spec.and((root, query, cb) -> cb.isFalse(root.get("fueEliminado")));

        // Filtrar por nombre
        if (filtros.getNombre() != null && !filtros.getNombre().isBlank()) {
            spec = spec.and((root, query, cb) ->
                cb.like(cb.lower(root.get("nombre")), "%" + filtros.getNombre().toLowerCase() + "%")
            );
        }

        // Filtrar por apellido
        if (filtros.getApellido() != null && !filtros.getApellido().isBlank()) {
            spec = spec.and((root, query, cb) ->
                cb.like(cb.lower(root.get("apellido")), "%" + filtros.getApellido().toLowerCase() + "%")
            );
        }

        // Filtrar por DNI exacto
        if (filtros.getDni() != null && !filtros.getDni().isBlank()) {
            spec = spec.and((root, query, cb) ->
                cb.equal(root.get("dni"), filtros.getDni())
            );
        }

        // Filtrar por empleados con / sin usuario
        if (filtros.getTieneUsuario() != null) {
            if (Boolean.TRUE.equals(filtros.getTieneUsuario())) {
                spec = spec.and((root, query, cb) ->
                    cb.isNotNull(root.get("usuario"))
                );
            } else {
                spec = spec.and((root, query, cb) ->
                    cb.isNull(root.get("usuario"))
                );
            }
        }

        // --------- PAGINACION ----------
        int pagina = (filtros.getPagina() != null && filtros.getPagina() >= 0) ? filtros.getPagina() : 0;
        int tamanio = 10;
        Pageable pageable = PageRequest.of(pagina, tamanio, sort);

        // --------- CONSULTA ----------
        Page<Empleado> empleados = empleadoRepository.findAll(spec, pageable);

        return empleados.map(EmpleadoMapper::fromEntity);
    }
}
