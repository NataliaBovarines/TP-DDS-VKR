package com.yourapp.app.models.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
public class DetalleVenta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne
    private Venta venta;
    @ManyToOne
    private Producto producto;
    private double precioUnitarioActual;
    private int cantidad;

    private Double precioTotalUnitario;

    public DetalleVenta(long id, Venta venta, Producto producto, double precioUnitarioActual, int cantidad, double precioTotalUnitario) {
        this.id = id;
        this.venta = venta;
        this.producto = producto;
        this.precioUnitarioActual = precioUnitarioActual;
        this.cantidad = cantidad;
        this.precioTotalUnitario = precioTotalUnitario;
    }



    public Venta getVenta() {
        return venta;
    }

    public void setVenta(Venta venta) {
        this.venta = venta;
    }

    public Producto getProducto() {
        return producto;
    }

    public double getPrecioUnitarioActual() {
        return precioUnitarioActual;
    }

    public int getCantidad() {
        return cantidad;
    }

    public Double getPrecioTotalUnitario() {
        return precioTotalUnitario;
    }


}
