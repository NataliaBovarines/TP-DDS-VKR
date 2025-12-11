package com.yourapp.app.models.entities.state;

import com.yourapp.app.models.entities.Venta;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@DiscriminatorValue("PAGADA")
@NoArgsConstructor
public class VentaPagada extends VentaState {

    @Override
    public void cancelar(String motivo) {
        Venta venta = getVenta();

        if (!puedeCancelarse()) {
            throw new IllegalStateException("Solo se pueden cancelar ventas pagadas dentro del mismo mes");
        }

        if (motivo == null || motivo.trim().isEmpty()) {
            throw new IllegalArgumentException("Motivo de cancelación requerido");
        }

        if (venta.getMetodoPago() == Venta.MetodoPago.CREDITO) {
            for (com.yourapp.app.models.entities.PagoDeCredito pago : venta.getPagosCredito()) {
                pago.revertirPago();
            }
        }

        venta.getDetalles().forEach(detalle -> {
            detalle.getProducto().aumentarStock(detalle.getCantidad());
        });

        System.out.println("Venta pagada cancelada. Motivo: " + motivo);
    }

    @Override
    public boolean puedeCambiarA(Class<? extends VentaState> nuevoEstado) {
        return nuevoEstado.equals(VentaCancelada.class) && puedeCancelarse();
    }

    private boolean puedeCancelarse() {
        Venta venta = getVenta();
        if (venta.getFecha() == null) {
            return false;
        }

        LocalDateTime ahora = LocalDateTime.now();
        LocalDateTime fechaVenta = venta.getFecha();

        return fechaVenta.getYear() == ahora.getYear() &&
            fechaVenta.getMonth() == ahora.getMonth();
    }
}