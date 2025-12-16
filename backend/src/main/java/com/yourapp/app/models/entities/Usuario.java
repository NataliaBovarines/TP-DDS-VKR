package com.yourapp.app.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class Usuario extends Persistible {
    @Column(unique = true)
    private String nombreDeUsuario;

    private String contrasenia;

    @ManyToOne
    private Rol rol;

    @OneToOne(mappedBy = "usuario")
    @JsonIgnore
    private Empleado empleado;

    @Column(nullable = false)
    private Boolean primerLogin = true;
}
