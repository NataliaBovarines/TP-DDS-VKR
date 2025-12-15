package com.yourapp.app.models.dto;

import java.util.List;

import com.yourapp.app.models.entities.Permiso;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UsuarioMeDto {
    private String nombreDeUsuario;
    private String rol;
    private List<Permiso> permisos;
}
