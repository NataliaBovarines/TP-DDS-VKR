package com.yourapp.app.models.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "productos")
@Getter
@Setter
//@NoArgsConstructor
@AllArgsConstructor
public class Producto extends Persistible {

    @Column(nullable = false)
    private String nombre;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "categoria_id")
    private Categoria categoria;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tipo_prenda_id")
    private TipoDePrenda tipoDePrenda;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "talle_id")
    private Talle talle;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "color_id")
    private Color color;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "proveedor_id")
    private Proveedor proveedor;

    @Column(name = "stock_actual")
    private Integer stockActual = 0;

    @Column(name = "stock_reservado")
    private Integer stockReservado = 0;

    @Column(name = "stock_minimo")
    private Integer stockMinimo = 5;

    @Column(nullable = false)
    private Integer precio;

    public Producto() {
        // Establecer stock mínimo por defecto según configuración
        ConfiguracionTienda config = ConfiguracionTienda.getInstance();
        this.stockMinimo = (config != null) ? config.getStockMinimoGlobal() : 5;
    }

    // Métodos de negocio para manejo de stock
    public Integer getStockDisponible() {
        return Math.max(0, stockActual - stockReservado);
    }

    public void reservarStock(Integer cantidad) {
        if (cantidad <= 0) {
            throw new IllegalArgumentException("Cantidad debe ser positiva");
        }

        if (cantidad > getStockDisponible()) {
            throw new IllegalStateException(
                String.format("Stock disponible insuficiente. Disponible: %d, Solicitado: %d",
                    getStockDisponible(), cantidad)
            );
        }

        this.stockReservado += cantidad;
    }

    public void liberarStockReservado(Integer cantidad) {
        if (cantidad <= 0) {
            throw new IllegalArgumentException("Cantidad debe ser positiva");
        }

        if (cantidad > stockReservado) {
            throw new IllegalStateException(
                String.format("No hay suficiente stock reservado. Reservado: %d, A liberar: %d",
                    stockReservado, cantidad)
            );
        }

        this.stockReservado -= cantidad;
    }

    public void confirmarVenta(Integer cantidad) {
        if (cantidad <= 0) {
            throw new IllegalArgumentException("Cantidad debe ser positiva");
        }

        if (cantidad > stockReservado) {
            throw new IllegalStateException("Cantidad no reservada previamente");
        }

        if (cantidad > stockActual) {
            throw new IllegalStateException("Stock actual insuficiente");
        }

        // Liberar de reservado y disminuir actual
        this.stockReservado -= cantidad;
        this.stockActual -= cantidad;
    }

    public void cancelarVenta(Integer cantidad) {
        liberarStockReservado(cantidad);
    }

    public void aumentarStock(Integer cantidad) {
        if (cantidad <= 0) {
            throw new IllegalArgumentException("Cantidad debe ser positiva");
        }

        this.stockActual += cantidad;
    }

    public boolean necesitaReposicion() {
        ConfiguracionTienda config = ConfiguracionTienda.getInstance();
        Integer minimo = (config != null) ? config.getStockMinimoGlobal() : this.stockMinimo;
        return stockActual <= minimo;
    }

    public boolean necesitaReposicionPorUnidad() {
        return stockActual == 0;
    }

    public boolean necesitaReposicionPorCurva() {
        return stockActual < 2;
    }
}