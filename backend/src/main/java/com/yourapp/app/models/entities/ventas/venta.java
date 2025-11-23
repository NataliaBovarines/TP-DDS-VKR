package com.yourapp.app.models.entities.ventas;
import com.yourapp.app.models.entities.usuarios.Empleado;
import java.time.LocalDateTime;

public class Venta {
    private Empleado empleado;
    private VentaState estado;
    private LocalDateTime fecha;
    private Double total;

    public void setEstado(VentaState estado) {
        this.estado = estado;
    }
}
