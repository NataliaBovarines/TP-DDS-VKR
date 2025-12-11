package com.yourapp.app.models.entities.state;

import com.yourapp.app.models.entities.Venta;
import com.yourapp.app.models.entities.Cliente;
import com.yourapp.app.models.entities.PagoDeCredito;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import java.time.LocalDateTime;

@Entity
@DiscriminatorValue("RESERVADA")
public class VentaReservada extends VentaState {

    @Override
    public void agregarPagoCredito(Double monto) {
        Venta venta = getVenta();
        Cliente cliente = venta.getCliente();

        if (cliente == null) {
            throw new IllegalStateException("Cliente no asignado a la reserva");
        }

        if (esReservaVencida()) {
            throw new IllegalStateException("La reserva ha vencido");
        }

        if (monto <= 0) {
            throw new IllegalArgumentException("Monto debe ser positivo");
        }

        Double saldoPendiente = getSaldoPendiente();
        if (monto > saldoPendiente) {
            throw new IllegalArgumentException("Pago excede saldo pendiente");
        }

        if (!cliente.puedeReservar(monto)) {
            throw new IllegalStateException("Crédito insuficiente");
        }

        PagoDeCredito pago = new PagoDeCredito();
        pago.setVenta(venta);
        pago.setCliente(cliente);
        pago.setMonto(monto);
        pago.setNumeroPago(venta.getPagosCredito().size() + 1);
        pago.procesarPago();
        venta.agregarPagoCredito(pago);

        if (venta.estaCompletamentePagada()) {
            venta.confirmarStockProductos();
            venta.setFecha(LocalDateTime.now());
        }
    }

    @Override
    public void cancelar(String motivo) {
        Venta venta = getVenta();

        if (motivo == null || motivo.trim().isEmpty()) {
            throw new IllegalArgumentException("Motivo de cancelación requerido");
        }

        for (PagoDeCredito pago : venta.getPagosCredito()) {
            pago.revertirPago();
        }

        venta.liberarStockProductos();
        System.out.println("Reserva cancelada. Motivo: " + motivo);
    }

    @Override
    public boolean puedeCambiarA(Class<? extends VentaState> nuevoEstado) {
        return nuevoEstado.equals(VentaPagada.class) ||
            nuevoEstado.equals(VentaCancelada.class);
    }

    public Double getSaldoPendiente() {
        Venta venta = getVenta();
        return venta.getTotal() - venta.getMontoPagado();
    }

    public void procesar() {
        if (esReservaVencida()) {
            System.out.println("Reserva #" + getVenta().getId() + " ha vencido automáticamente");
            cancelar("Reserva vencida automáticamente");
        }
    }

    private boolean esReservaVencida() {
        Venta venta = getVenta();
        if (venta.getFechaVencimientoReserva() == null) {
            return false;
        }
        return venta.getFechaVencimientoReserva().isBefore(LocalDateTime.now());
    }
}