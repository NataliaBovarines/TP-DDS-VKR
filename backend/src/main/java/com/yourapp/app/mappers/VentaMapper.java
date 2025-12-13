package com.yourapp.app.mappers;

import java.time.LocalDateTime;

import com.yourapp.app.models.entities.Cliente;
import com.yourapp.app.models.entities.Empleado;
import com.yourapp.app.models.entities.Venta;
import com.yourapp.app.models.entities.state.VentaIniciada;

public class VentaMapper {
    public static Venta toEntity(Empleado empleado, Cliente cliente) {
        Venta venta = new Venta();
        venta.setEmpleado(empleado);
        venta.setCliente(cliente);
        venta.setFecha(LocalDateTime.now());
        venta.setEstado(new VentaIniciada());
        venta.getEstado().setVenta(venta);
        return venta;
    }
}
