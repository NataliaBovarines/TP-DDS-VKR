package com.yourapp.app.models.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
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
    private int stockActual;
    private int stockMinimo;
    private int precio;

    public Producto(String nombre, String descripcion, Categoria categoria, TipoDePrenda tipoDePrenda, Talle talle, Color color, Proveedor proveedor, int stockActual, int stockMinimo, int precio) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.tipoDePrenda = tipoDePrenda;
        this.talle = talle;
        this.color = color;
        this.proveedor = proveedor;
        this.stockActual = stockActual;
        this.stockMinimo = stockMinimo;
        this.precio = precio;
    }

    public String getNombre() {
        return nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public TipoDePrenda getTipoDePrenda() {
        return tipoDePrenda;
    }

    public Talle getTalle() {
        return talle;
    }

    public Color getColor() {
        return color;
    }

    public Proveedor getProveedor() {
        return proveedor;
    }

    public int getStockActual() {
        return stockActual;
    }

    public int getStockMinimo() {
        return stockMinimo;
    }

    public int getPrecio() {
        return precio;
    }

    //Metodos para setear stock
    public void setStockActual(int stockActual) {
        this.stockActual = stockActual;
    }

    public void setStockMinimo(int stockMinimo) {
        this.stockMinimo = stockMinimo;
    }

    public void setPrecio(int precio) {
        this.precio = precio;
    }

}
