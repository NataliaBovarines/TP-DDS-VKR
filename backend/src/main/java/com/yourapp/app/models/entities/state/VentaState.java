package com.yourapp.app.models.entities.state;

import com.yourapp.app.models.entities.Venta;

public abstract class VentaState {
    private Venta venta; 
    
    public VentaState(Venta venta) {
        this.venta = venta;
    }
}
