package com.yourapp.app.models.entities.state;

import com.yourapp.app.models.entities.ConfiguracionTienda;
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

        ConfiguracionTienda config = ConfiguracionTienda.getInstance();

        // Validar si la tienda permite reservas
        if (config != null && !config.permiteReserva()) {
            throw new IllegalStateException("La tienda no permite reservas en este momento");
        }

        if(montoInicial > 0) {
            // Calcular mínimo usando configuración
            Double minimoInicial = venta.getTotal();
            if (config != null) {
                minimoInicial = config.calcularMontoMinimoSena(venta.getTotal());
            }

            if (montoInicial < minimoInicial) {
                throw new IllegalArgumentException(
                    String.format("Monto inicial mínimo: $%.2f (%.0f%% del total $%.2f)",
                        minimoInicial,
                        (config != null ? config.getPorcentajeMinimoSena() * 100 : 10),
                        venta.getTotal())
                );
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
            pagoInicial.setFecha(LocalDateTime.now());
            pagoInicial.setEsPagoInicial(true);
            pagoInicial.procesarPagoInicial();
            venta.agregarPagoCredito(pagoInicial);
        } else {
            cliente.aumentarDeuda(venta.getTotal());
 
        }

        venta.reservarStockProductos();
        venta.setFechaVencimientoReserva(LocalDateTime.now().plusMonths(3));
    }

    @Override
    public void rechazar(String motivo) {
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
}