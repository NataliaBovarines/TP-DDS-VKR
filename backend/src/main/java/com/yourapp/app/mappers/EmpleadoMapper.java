package com.yourapp.app.mappers;

import com.yourapp.app.models.dto.EmpleadoDto;
import com.yourapp.app.models.dto.EmpleadoResponseDto;
import com.yourapp.app.models.entities.Empleado;
import com.yourapp.app.models.entities.Usuario;

public class EmpleadoMapper {
    public static Empleado toEntity(EmpleadoDto empleadoDto, Usuario usuario) {
        Empleado empleado = new Empleado();
        empleado.setNombre(empleadoDto.getNombre());
        empleado.setApellido(empleadoDto.getApellido());
        empleado.setDni(empleadoDto.getDni());
        empleado.setDireccion(empleadoDto.getDireccion());
        empleado.setMail(empleadoDto.getMail());
        empleado.setTelefono(empleadoDto.getTelefono());
        empleado.setUsuario(usuario);
        return empleado;
    }

    public static EmpleadoResponseDto fromEntity(Empleado empleado) {
        EmpleadoResponseDto empleadoDto = new EmpleadoResponseDto();
        empleadoDto.setId(empleado.getId());
        empleadoDto.setNombre(empleado.getNombre());
        empleadoDto.setApellido(empleado.getApellido());
        empleadoDto.setDni(empleado.getDni());
        empleadoDto.setDireccion(empleado.getDireccion());
        empleadoDto.setMail(empleado.getMail());
        empleadoDto.setTelefono(empleado.getTelefono());
        empleadoDto.setUsuario(UsuarioMapper.fromEntity(empleado.getUsuario()));
        return empleadoDto;
    }
}
