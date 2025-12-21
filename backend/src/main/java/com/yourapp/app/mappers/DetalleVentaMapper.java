package com.yourapp.app.mappers;

import com.yourapp.app.models.dto.venta.DetalleVentaDto;
import com.yourapp.app.models.entities.DetalleProducto;
import com.yourapp.app.models.entities.DetalleVenta;
import com.yourapp.app.models.entities.Venta;

public class DetalleVentaMapper {
    public static DetalleVenta toEntity(DetalleVentaDto detalleVentaDto, DetalleProducto detalleProducto, Venta venta) {
        DetalleVenta detalleVenta = new DetalleVenta();
        detalleVenta.setDetalleProducto(detalleProducto);
        detalleVenta.setCantidad(detalleVentaDto.getCantidad());
        detalleVenta.setPrecioUnitarioActual(detalleProducto.getProducto().getPrecio().doubleValue());
        detalleVenta.calcularPrecioTotal();
        detalleVenta.setVenta(venta);
        return detalleVenta;
    }
}
