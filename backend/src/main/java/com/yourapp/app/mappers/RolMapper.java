package com.yourapp.app.mappers;

import com.yourapp.app.models.dto.RolDto;
import com.yourapp.app.models.entities.Rol;

public class RolMapper {
    public static Rol toEntity(RolDto rolDto) {
        Rol rol = new Rol();
        rol.setNombre(rolDto.getNombre());
        rol.setPermisos(rolDto.getPermisos());
        return rol;
    }
}
