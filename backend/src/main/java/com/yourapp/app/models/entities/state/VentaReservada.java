package com.yourapp.app.models.entities.state;

import com.yourapp.app.models.entities.Venta;

public class VentaReservada extends VentaState {
    public VentaReservada(Venta venta) {
        super(venta);
    }

    public void cobrarTotal() {
        
    }
}
