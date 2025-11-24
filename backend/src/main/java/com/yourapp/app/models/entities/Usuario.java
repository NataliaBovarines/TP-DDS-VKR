package com.yourapp.app.models.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombreDeUsuario;
    private String contrasenia; // La guardamos plana ¿¿¿???
    @OneToOne
    private Rol rol;
}
