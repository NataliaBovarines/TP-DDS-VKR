package com.yourapp.app.models.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class DetalleVenta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private Venta venta;
    @ManyToOne
    private Producto producto;
    private Double precioUnitarioActual;
    private Integer cantidad;
    private Double precioTotalUnitario;
}
