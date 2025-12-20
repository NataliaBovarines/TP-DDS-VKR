package com.yourapp.app.mappers;

import com.yourapp.app.models.dto.UsuarioDto;
import com.yourapp.app.models.dto.UsuarioResponseDto;
import com.yourapp.app.models.entities.usuario.Rol;
import com.yourapp.app.models.entities.usuario.Usuario;

public class UsuarioMapper {
    public static Usuario toEntity(UsuarioDto usuarioDto, Rol rol) {
        Usuario usuario = new Usuario();
        usuario.setNombreDeUsuario(usuarioDto.getNombreDeUsuario());
        usuario.setContrasenia(usuarioDto.getContrasenia());
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
}
