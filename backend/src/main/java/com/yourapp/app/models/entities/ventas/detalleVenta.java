package com.yourapp.app.models.entities.ventas;
import com.yourapp.app.models.entities.productos.Producto;

public class DetalleVenta {
    private Venta venta;
    private Producto producto;
    private Double precioUnitarioActual;
    private Integer cantidad;
    private Double precioTotalUnitario;
}
