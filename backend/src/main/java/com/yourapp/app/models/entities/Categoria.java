package com.yourapp.app.models.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class Categoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String descripcion;
    private Boolean estaActiva;

    // // Constructor vacío
    // public Categoria() {}

    // // Constructor con parámetros
    // public Categoria(int id, String descripcion, boolean estaActiva) {
    //     this.id = id;
    //     this.descripcion = descripcion;
    //     this.estaActiva = estaActiva;
    // }

}
