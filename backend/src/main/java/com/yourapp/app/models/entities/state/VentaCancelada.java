package com.yourapp.app.models.entities.state;

import com.yourapp.app.models.entities.Venta;

public class VentaCancelada extends VentaState {
    public VentaCancelada(Venta venta) {
        super(venta);
    }   

    public void aumentarStock() {

    }

    public Venta generarNuevaVenta() {
        return new Venta();
    }
}
