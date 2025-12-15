package com.yourapp.app.mappers;

import com.yourapp.app.models.dto.UsuarioMeDto;
import com.yourapp.app.models.dto.UsuarioRegisterDto;
import com.yourapp.app.models.dto.UsuarioResponseDto;
import com.yourapp.app.models.entities.Rol;
import com.yourapp.app.models.entities.Usuario;

public class UsuarioMapper {
    public static Usuario toEntity(UsuarioRegisterDto usuarioDto, Rol rol) {
        Usuario usuario = new Usuario();
        usuario.setNombreDeUsuario(usuarioDto.getNombreDeUsuario());
        usuario.setRol(rol);
        return usuario;
    }

    public static UsuarioResponseDto fromEntity(Usuario usuario) {
        UsuarioResponseDto usuarioDto = new UsuarioResponseDto();
        usuarioDto.setId(usuario.getId());
        usuarioDto.setNombreDeUsuario(usuario.getNombreDeUsuario());
        usuarioDto.setRolNombre(usuario.getRol().getNombre());
        return usuarioDto;
    }

    public static UsuarioMeDto fromEntityToUsuarioMeDto(Usuario usuario) {
        UsuarioMeDto usuarioDto = new UsuarioMeDto();
        usuarioDto.setNombreDeUsuario(usuario.getNombreDeUsuario());
        usuarioDto.setRol(usuario.getRol().getNombre());
        usuarioDto.setPermisos(usuario.getRol().getPermisos());
        return usuarioDto;
    }
}
