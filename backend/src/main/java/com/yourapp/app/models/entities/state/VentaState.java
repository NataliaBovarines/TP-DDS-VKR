package com.yourapp.app.models.entities.state;

import com.yourapp.app.models.entities.DetalleVenta;
import com.yourapp.app.models.entities.Producto;
import com.yourapp.app.models.entities.reportes.ReporteVenta;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
public abstract class VentaState {

    private List<DetalleVenta> ventas;
    
    public VentaState (List<DetalleVenta> ventas) {
        this.ventas = ventas;
    }

    public Double calcularMontoRestante(Double monto) {
        Double precioVentas = ventas.stream().map(d  -> d.getPrecioTotalUnitario()).collect(Collectors.summingDouble(Double::doubleValue));
        return precioVentas - monto;
    }
    public int disminuirStock() {
        for (DetalleVenta detalle : ventas) {
            Producto producto = detalle.getProducto();
            int nuevaCantidad = producto.getStockActual() - detalle.getCantidad();
            producto.setStockActual(nuevaCantidad);
        }
        return 0;
    }

    public ReporteVenta registrar() {
        //TODO falta ver cómo impacta el registro de una venta y si puede estar en la clase VentaState, ¿Que reporte de venta específico devuelve?
        return null;
    }
}
