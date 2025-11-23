package com.yourapp.app.models.entities.ventas;

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
