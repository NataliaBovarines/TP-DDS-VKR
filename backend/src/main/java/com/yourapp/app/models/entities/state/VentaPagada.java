package com.yourapp.app.models.entities.state;

import com.yourapp.app.models.entities.Venta;

public class VentaPagada extends VentaState {
    public VentaPagada(Venta venta) {
        super(venta);
    }

    public void disminuirStock() {

    }

    // public ReporteVenta registrar() {
    //     return new ReporteVenta()
    // }
}
