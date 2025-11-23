package com.yourapp.app.models.entities.ventas;
import com.yourapp.app.models.entities.usuarios.Cliente;

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
