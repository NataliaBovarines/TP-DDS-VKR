package com.yourapp.app.mappers;

import com.yourapp.app.models.dto.ProductoDto;
import com.yourapp.app.models.entities.Categoria;
import com.yourapp.app.models.entities.Producto;
import com.yourapp.app.models.entities.Proveedor;
import com.yourapp.app.models.entities.TipoDePrenda;

public class ProductoMapper {
    public static Producto toEntity(ProductoDto productoDto, Categoria categoria, TipoDePrenda tipoDePrenda, Proveedor proveedor) {
        Producto producto = new Producto();
        producto.setNombre(productoDto.getNombre());
        producto.setDescripcion(productoDto.getDescripcion());
        producto.setCategoria(categoria);
        producto.setTipoDePrenda(tipoDePrenda);
        producto.setProveedor(proveedor);
        producto.setPrecio(productoDto.getPrecio());
        return producto;
    }
}
