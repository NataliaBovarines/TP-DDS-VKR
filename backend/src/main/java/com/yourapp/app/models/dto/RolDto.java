package com.yourapp.app.models.dto;

import java.util.List;

import com.yourapp.app.models.entities.usuario.Permiso;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class RolDto {
    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public List<Permiso> getPermisos() {
        return permisos;
    }

    public void setPermisos(List<Permiso> permisos) {
        this.permisos = permisos;
    }

    @NotBlank
    private String nombre;
    @NotEmpty
    private List<Permiso> permisos;
}
