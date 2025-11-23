package com.yourapp.app.models.entities.usuarios;

import java.util.List;

public class Rol {
    private String nombre;
    private List<Permiso> permisos;

    public boolean tenesPermiso(Permiso permiso) {
        return this.permisos.contains(permiso);
    }
}
