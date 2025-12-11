package com.yourapp.app.models.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class DetalleProducto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonIgnore
    private Producto producto;

    @ManyToOne
    private Talle talle;

    @ManyToOne
    private Color color;

    private Integer stockActual;

    private Integer stockMinimo;
}
