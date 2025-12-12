package com.yourapp.app.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.yourapp.app.exceptions.ConflictException;
import com.yourapp.app.exceptions.NotFoundException;
import com.yourapp.app.mappers.EmpleadoMapper;
import com.yourapp.app.models.dto.EmpleadoDto;
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

    public EmpleadoResponseDto crearEmpleado(EmpleadoDto empleadoDto) {
        Usuario usuario = usuarioService.obtenerUsuarioCompleto(empleadoDto.getUsuarioId());
        if (empleadoRepository.existsByUsuario(usuario)) throw new ConflictException("El usuario ya esta asignado a otro empleado");
        Empleado empleado = EmpleadoMapper.toEntity(empleadoDto, usuario);
        Empleado empleadoGuardado = empleadoRepository.save(empleado);
        return EmpleadoMapper.fromEntity(empleadoGuardado);
    }

    public EmpleadoResponseDto obtenerEmpleado(Long id) {
        Empleado empleadoGuardado = empleadoRepository.findById(id).orElseThrow(() -> new NotFoundException("Empleado no encontrado"));
        return EmpleadoMapper.fromEntity(empleadoGuardado);
    }

    public List<EmpleadoResponseDto> obtenerTodosLosEmpleados() {
        List<Empleado> empleadosGuardados = empleadoRepository.findAll();
        List<EmpleadoResponseDto> empleadosDtos = new ArrayList<>();

        for (Empleado e : empleadosGuardados) empleadosDtos.add(EmpleadoMapper.fromEntity(e));

        return empleadosDtos;
    }
}
