package com.yourapp.app.mappers;

import com.yourapp.app.models.dto.ProveedorDto;
import com.yourapp.app.models.entities.Proveedor;

public class ProveedorMapper {
    public static Proveedor toEntity(ProveedorDto proveedorDto) {
        Proveedor proveedor = new Proveedor();
        proveedor.setNombre(proveedorDto.getNombre());
        return proveedor;
    }
}
