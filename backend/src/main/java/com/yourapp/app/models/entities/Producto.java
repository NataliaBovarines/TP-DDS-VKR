package com.yourapp.app.models.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private String descripcion;
    @ManyToOne
    private Categoria categoria;
    @ManyToOne
    private TipoDePrenda tipoDePrenda;
    @ManyToOne
    private Talle talle;
    @ManyToOne
    private Color color;
    @ManyToOne
    private Proveedor proveedor;
    private Integer stockActual;
    private Integer stockMinimo;
    private Integer precio;
    private Boolean estaActivo = true;
}
