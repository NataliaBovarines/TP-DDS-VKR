package com.yourapp.app.models.entities.state;

import com.yourapp.app.models.entities.DetalleVenta;
import com.yourapp.app.models.entities.reportes.ReporteVenta;

import java.util.List;

public class VentaRechazada extends VentaState {
    public VentaRechazada(List<DetalleVenta> ventas) {
        super(ventas);
    }

    public ReporteVenta registrar() {
        //TODO falta ver cómo impacta el registro de una venta pagado y si puede estar en la clase VentaState, ¿Que reporte de venta específico devuelve?
        return null;
    }
}
