package com.yourapp.app.models.entities.ventas;

public abstract class VentaState {
    private Venta venta; 
    
    public VentaState(Venta venta) {
        this.venta = venta;
    }
}
