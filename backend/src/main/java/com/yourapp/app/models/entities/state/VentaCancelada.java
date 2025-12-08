package com.yourapp.app.models.entities.state;

import com.yourapp.app.models.entities.DetalleVenta;
import com.yourapp.app.models.entities.Venta;

import java.util.List;

public class VentaCancelada extends VentaState {

    private List<DetalleVenta> ventas;

    public VentaCancelada (List<DetalleVenta> ventas) {
        super(ventas);
    }

    public void aumentarStock() {

    }

    public Venta generarNuevaVenta() {
        return new Venta();
    }
}
