package com.yourapp.app.models.entities.state;
import com.yourapp.app.models.entities.Cliente;
import com.yourapp.app.models.entities.Venta;

public class VentaIniciada extends VentaState {
    public VentaIniciada(Venta venta) {
        super(venta);
    }
    
    public void cobrarTotal() {

    }

    public void fiar() {

    }

    public void reservarConSenia(Double monto, Cliente cliente) {

    }
}
