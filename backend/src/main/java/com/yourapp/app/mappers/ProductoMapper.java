package com.yourapp.app.mappers;

import com.yourapp.app.models.dto.producto.ProductoDto;
import com.yourapp.app.models.entities.Producto;
import com.yourapp.app.models.entities.Proveedor;
import com.yourapp.app.models.entities.Subcategoria;

public class ProductoMapper {
    public static Producto toEntity(ProductoDto productoDto, Subcategoria subcategoria, Proveedor proveedor) {
        Producto producto = new Producto();
        producto.setNombre(productoDto.getNombre());
        producto.setDescripcion(productoDto.getDescripcion());
        producto.setSubcategoria(subcategoria);
        producto.setProveedor(proveedor);
        producto.setPrecio(productoDto.getPrecio());
        return producto;
    }
}
