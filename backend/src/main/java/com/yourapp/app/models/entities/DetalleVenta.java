package com.yourapp.app.models.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity @Data
@NoArgsConstructor
public class DetalleVenta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne
    private Venta venta;
    @ManyToOne
    private DetalleProducto detalleProducto;
    private double precioUnitarioActual;
    private int cantidad;

    private Double precioTotalUnitario;

    public DetalleVenta(long id, Venta venta, DetalleProducto detalleProducto, double precioUnitarioActual, int cantidad, double precioTotalUnitario) {
        this.id = id;
        this.venta = venta;
        this.detalleProducto = detalleProducto;
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

    public DetalleProducto getDetalleProducto() {
        return detalleProducto;
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

    public void calcularPrecioTotal() {
        this.precioTotalUnitario = precioUnitarioActual * cantidad;
    }

    public void reservarStock() {
        detalleProducto.reservarStock(cantidad);
    }

    public void liberarStockReservado() {
        detalleProducto.liberarStockReservado(cantidad);
    }

    public void confirmarVenta() {
        detalleProducto.confirmarVenta(cantidad);
    }

    public boolean hayStockDisponible() {
        return detalleProducto.getStockDisponible() >= cantidad;
    }

    public void aumentarStock() {
        detalleProducto.aumentarStock(cantidad);
    }
}
