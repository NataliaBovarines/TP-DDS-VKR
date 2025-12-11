package com.yourapp.app.mappers;

import com.yourapp.app.models.dto.ProductoDto;
import com.yourapp.app.models.entities.Categoria;
import com.yourapp.app.models.entities.Color;
import com.yourapp.app.models.entities.Producto;
import com.yourapp.app.models.entities.Proveedor;
import com.yourapp.app.models.entities.Talle;
import com.yourapp.app.models.entities.TipoDePrenda;

public class ProductoMapper {
    public static Producto toEntity(ProductoDto productoDto, Categoria categoria, TipoDePrenda tipoDePrenda, Talle talle, Color color, Proveedor proveedor) {
        Producto producto = new Producto();
        producto.setNombre(productoDto.getNombre());
        producto.setDescripcion(productoDto.getDescripcion());
        producto.setCategoria(categoria);
        producto.setTipoDePrenda(tipoDePrenda);
        producto.setTalle(talle);
        producto.setColor(color);
        producto.setProveedor(proveedor);
        producto.setStockActual(productoDto.getStockActual());
        producto.setStockMinimo(productoDto.getStockMinimo());
        producto.setPrecio(productoDto.getPrecio());
        return producto;
    }
}
