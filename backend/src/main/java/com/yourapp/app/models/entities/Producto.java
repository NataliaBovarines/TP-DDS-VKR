package com.yourapp.app.models.entities;

import java.util.ArrayList;
import java.util.List;

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
    private Proveedor proveedor;
    @OneToMany(mappedBy = "producto", cascade = CascadeType.ALL)
    private List<DetalleProducto> detallesProductos = new ArrayList<>();
    private Integer precio;
}
