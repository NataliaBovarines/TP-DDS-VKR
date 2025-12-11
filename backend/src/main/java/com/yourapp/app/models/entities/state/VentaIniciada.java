package com.yourapp.app.models.entities.state;

import com.yourapp.app.models.entities.Venta;
import com.yourapp.app.models.entities.Cliente;
import com.yourapp.app.models.entities.PagoDeCredito;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@DiscriminatorValue("INICIADA")
@NoArgsConstructor
public class VentaIniciada extends VentaState {

    @Override
    public void cobrarTotal(Double monto, Venta.MetodoPago metodoPago) {
        Venta venta = getVenta();

        if (monto < venta.getTotal()) {
            throw new IllegalArgumentException("Monto insuficiente");
        }

        venta.verificarStockDisponible();

        if (metodoPago == Venta.MetodoPago.CREDITO) {
            procesarPagoCredito(monto, venta.getCliente());
        }

        venta.confirmarStockProductos();
        venta.setFecha(LocalDateTime.now());
    }

    @Override
    public void reservarConCredito(Double montoInicial) {
        Venta venta = getVenta();
        Cliente cliente = venta.getCliente();

        if (cliente == null) {
            throw new IllegalStateException("Se requiere cliente para reserva");
        }

        if (!cliente.esConfiable()) {
            throw new IllegalStateException("Cliente no es confiable");
        }

        if (montoInicial < venta.getTotal() * 0.10) {
            throw new IllegalArgumentException("Monto inicial mínimo: 10% del total");
        }

        if (!cliente.puedeReservar(montoInicial)) {
            throw new IllegalStateException("Crédito insuficiente");
        }

        PagoDeCredito pagoInicial = new PagoDeCredito();
        pagoInicial.setVenta(venta);
        pagoInicial.setCliente(cliente);
        pagoInicial.setMonto(montoInicial);
        pagoInicial.setNumeroPago(1);
        pagoInicial.procesarPago();

        venta.agregarPagoCredito(pagoInicial);
        venta.reservarStockProductos();
        venta.setFechaVencimientoReserva(LocalDateTime.now().plusMonths(3));
    }

    @Override
    public void rechazar(String motivo) {
        Venta venta = getVenta();
        if (motivo == null || motivo.trim().isEmpty()) {
            throw new IllegalArgumentException("Motivo de rechazo requerido");
        }
        System.out.println("Venta rechazada. Motivo: " + motivo);
    }

    @Override
    public boolean puedeCambiarA(Class<? extends VentaState> nuevoEstado) {
        return nuevoEstado.equals(VentaPagada.class) ||
            nuevoEstado.equals(VentaReservada.class) ||
            nuevoEstado.equals(VentaRechazada.class);
    }

    @Override
    public Double getSaldoPendiente() {
        return getVenta().getTotal();
    }

    private void procesarPagoCredito(Double monto, Cliente cliente) {
        if (cliente == null) {
            throw new IllegalStateException("Cliente requerido para pago a crédito");
        }

        if (!cliente.puedeReservar(monto)) {
            throw new IllegalStateException("Cliente no puede fiar este monto");
        }

        PagoDeCredito pagoCredito = new PagoDeCredito();
        pagoCredito.setVenta(getVenta());
        pagoCredito.setCliente(cliente);
        pagoCredito.setMonto(monto);
        pagoCredito.setNumeroPago(1);
        pagoCredito.procesarPago();
        getVenta().agregarPagoCredito(pagoCredito);
        cliente.aumentarDeuda(monto);
    }
}