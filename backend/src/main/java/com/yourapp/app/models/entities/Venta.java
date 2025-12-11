package com.yourapp.app.models.entities;

import com.yourapp.app.models.entities.state.VentaState;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "ventas")
@Getter
@Setter
public class Venta extends Persistible {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "empleado_id", nullable = false)
    private Empleado empleado;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    private LocalDateTime fecha;

    private Double total = 0.0;

    @Column(name = "monto_pagado")
    private Double montoPagado = 0.0;

    @Enumerated(EnumType.STRING)
    private MetodoPago metodoPago;

    @Column(name = "fecha_vencimiento_reserva")
    private LocalDateTime fechaVencimientoReserva;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "estado_id")
    private VentaState estado;

    @OneToMany(mappedBy = "venta", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DetalleVenta> detalles = new ArrayList<>();

    @OneToMany(mappedBy = "venta", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PagoDeCredito> pagosCredito = new ArrayList<>();

    public enum MetodoPago {
        EFECTIVO, DEBITO, MERCADO_PAGO, CREDITO
    }

    public void agregarDetalle(DetalleVenta detalle) {
        detalle.setVenta(this);
        this.detalles.add(detalle);
        calcularTotal();
    }

    public void calcularTotal() {
        this.total = detalles.stream()
            .mapToDouble(DetalleVenta::getPrecioTotalUnitario)
            .sum();
    }

    public void reservarStockProductos() {
        for (DetalleVenta detalle : detalles) {
            detalle.getProducto().reservarStock(detalle.getCantidad());
        }

        // Establecer fecha de vencimiento usando configuración
        ConfiguracionTienda config = ConfiguracionTienda.getInstance();
        Integer diasValidez = config.getDiasValidezReserva();
        this.fechaVencimientoReserva = LocalDateTime.now().plusDays(diasValidez);
    }

    public void liberarStockProductos() {
        for (DetalleVenta detalle : detalles) {
            detalle.getProducto().liberarStockReservado(detalle.getCantidad());
        }
    }

    public void confirmarStockProductos() {
        for (DetalleVenta detalle : detalles) {
            detalle.getProducto().confirmarVenta(detalle.getCantidad());
        }
    }

    public void verificarStockDisponible() {
        for (DetalleVenta detalle : detalles) {
            Producto producto = detalle.getProducto();
            if (producto.getStockDisponible() < detalle.getCantidad()) {
                throw new IllegalStateException("Stock insuficiente");
            }
        }
    }

    public void agregarPagoCredito(PagoDeCredito pago) {
        pago.setVenta(this);
        this.pagosCredito.add(pago);
        this.montoPagado += pago.getMonto();
    }

    public Double getSaldoPendiente() {
        return total - montoPagado;
    }

    public Double getProgresoPago() {
        if (total == 0) return 0.0;
        return montoPagado / total;
    }

    public boolean estaCompletamentePagada() {
        return getSaldoPendiente() <= 0.01;
    }

    public boolean puedeCambiarA(Class<? extends VentaState> nuevoEstado) {
        return estado.puedeCambiarA(nuevoEstado);
    }
}