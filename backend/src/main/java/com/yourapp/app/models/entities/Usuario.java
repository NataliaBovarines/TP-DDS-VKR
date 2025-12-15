package com.yourapp.app.models.entities;

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
}
