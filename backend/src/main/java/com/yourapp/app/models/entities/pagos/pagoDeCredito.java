package com.yourapp.app.models.entities.pagos;

import com.yourapp.app.models.entities.ventas.Venta;
import com.yourapp.app.models.entities.usuarios.Cliente;
import java.time.LocalDateTime;

public class PagoDeCredito {
    private Venta venta;
    private Cliente cliente;
    private Double pagoParcial;
    private LocalDateTime fecha;

    public void disminuirDeuda() {
        cliente.disminuirDeuda(pagoParcial);
    }
}
