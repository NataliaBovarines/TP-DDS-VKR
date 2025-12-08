package com.yourapp.app.models.entities.state;

import com.yourapp.app.models.entities.Cliente;
import com.yourapp.app.models.entities.DetalleVenta;
import com.yourapp.app.models.entities.Producto;
import com.yourapp.app.models.entities.reportes.ReporteVenta;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class VentaPagada extends VentaState {
    private List<DetalleVenta> ventas;

    public VentaPagada (List<DetalleVenta> ventas) {
        super(ventas);
    }
    public int disminuirStock(Producto producto) {
        for (DetalleVenta detalle : ventas) {
            if (producto.equals(detalle.getProducto())) {
                int nuevaCantidad = producto.getStockActual() - detalle.getCantidad();
                producto.setStockActual(nuevaCantidad);
            }
        }
        return producto.getStockActual();
    }

    public Double cobrarTotal(Cliente cliente) {
        Double deudaFinal = cliente.disminuirDeuda(super.calcularMontoRestante(0.0));
        return deudaFinal;
    }

    public ReporteVenta registrar() {
        //TODO falta ver cómo impacta el registro de una venta pagado y si puede estar en la clase VentaState, ¿Que reporte de venta específico devuelve?
        return null;
    }
}
