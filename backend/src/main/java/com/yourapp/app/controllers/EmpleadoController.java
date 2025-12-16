package com.yourapp.app.controllers;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.yourapp.app.models.dto.EmpleadoCambioDto;
import com.yourapp.app.models.dto.EmpleadoDto;
import com.yourapp.app.models.dto.EmpleadoFiltroDto;
import com.yourapp.app.models.dto.EmpleadoResponseDto;
import com.yourapp.app.services.EmpleadoService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/empleados")
@RequiredArgsConstructor
public class EmpleadoController {
    private final EmpleadoService empleadoService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAuthority('EMPLEADO_CREAR')")
    public EmpleadoResponseDto crearEmpleado(@RequestBody @Valid EmpleadoDto empleadoDto) {
        return empleadoService.crearEmpleado(empleadoDto);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAuthority('EMPLEADO_VER')")
    public EmpleadoResponseDto obtenerEmpleado(@PathVariable Long id) {
        return empleadoService.obtenerEmpleado(id);
    }

    @PatchMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAuthority('EMPLEADO_MODIFICAR')")
    public EmpleadoResponseDto actualizarEmpleado(@PathVariable Long id, @RequestBody @Valid EmpleadoCambioDto empleadoDto) {
        return empleadoService.actualizarEmpleado(id, empleadoDto);
    }

    @PatchMapping("/{id}/eliminacion")
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAuthority('EMPLEADO_ELIMINAR')")
    public void eliminarEmpleado(@PathVariable Long id) {
        empleadoService.eliminarEmpleado(id);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAuthority('EMPLEADO_VER')")
    public Page<EmpleadoResponseDto> obtenerTodosLosEmpleados(@Valid @ModelAttribute EmpleadoFiltroDto filtros) {
        return empleadoService.obtenerEmpleadosFiltrados(filtros);
    }
}
