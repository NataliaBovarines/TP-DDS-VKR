package com.yourapp.app.models.entities.state;
import com.yourapp.app.models.entities.Cliente;
import com.yourapp.app.models.entities.DetalleVenta;

import java.util.List;

public class VentaIniciada extends VentaState {
    private List<DetalleVenta> ventas;

    public VentaIniciada (List<DetalleVenta> ventas) {
        super(ventas);
    }

    public Double cobrarTotal(Cliente cliente) {
        Double deudaFinal = cliente.disminuirDeuda(super.calcularMontoRestante(0.0));
        return deudaFinal;
    }

    public Double fiar(Cliente cliente, Double montoAFiar) {
        Double creditoFinal = cliente.getCreditoLimite() - montoAFiar;
        return creditoFinal;
    }

    public Double reservarConSenia(Double montoSenia, Cliente cliente) {
        super.disminuirStock();
        Double deudaFinal = cliente.disminuirDeuda(super.calcularMontoRestante(montoSenia));
        return deudaFinal;
    }

}
