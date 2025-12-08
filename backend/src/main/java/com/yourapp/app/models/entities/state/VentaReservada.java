package com.yourapp.app.models.entities.state;

import com.yourapp.app.models.entities.Cliente;
import com.yourapp.app.models.entities.DetalleVenta;
import com.yourapp.app.models.entities.Venta;

import java.util.List;

public class VentaReservada extends VentaState {
    public VentaReservada(List<DetalleVenta> ventas) {
        super(ventas);
    }

    public Double cobrarTotal(Cliente cliente) {
        Double deudaFinal = cliente.disminuirDeuda(calcularMontoRestante(calcularMontoRestante(0.0)));
        return deudaFinal;
    }
}
