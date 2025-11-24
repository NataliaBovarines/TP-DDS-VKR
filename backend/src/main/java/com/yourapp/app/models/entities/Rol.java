package com.yourapp.app.models.entities;

import java.util.List;
import java.util.ArrayList;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class Rol {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    @ManyToMany
    private List<Permiso> permisos = new ArrayList<>();

    public boolean tenesPermiso(Permiso permiso) {
        return this.permisos.contains(permiso);
    }
}
