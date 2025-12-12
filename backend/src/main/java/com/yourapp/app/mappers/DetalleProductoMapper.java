package com.yourapp.app.mappers;

import com.yourapp.app.models.dto.DetalleProductoDto;
import com.yourapp.app.models.entities.Color;
import com.yourapp.app.models.entities.DetalleProducto;
import com.yourapp.app.models.entities.Producto;
import com.yourapp.app.models.entities.Talle;

public class DetalleProductoMapper {
    public static DetalleProducto toEntity(DetalleProductoDto detalleDto, Producto producto, Talle talle, Color color) {
        DetalleProducto detalle = new DetalleProducto();
        detalle.setProducto(producto);
        detalle.setTalle(talle);
        detalle.setColor(color);
        detalle.setStockActual(detalleDto.getStockActual());
        detalle.setStockMinimo(detalleDto.getStockMinimo());
        return detalle;
    }
}
