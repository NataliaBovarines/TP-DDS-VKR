package com.yourapp.app.services;

import org.springframework.stereotype.Service;

import com.yourapp.app.exceptions.ConflictException;
import com.yourapp.app.mappers.ProductoMapper;
import com.yourapp.app.models.dto.ProductoDto;
import com.yourapp.app.models.entities.Categoria;
import com.yourapp.app.models.entities.Color;
import com.yourapp.app.models.entities.Producto;
import com.yourapp.app.models.entities.Proveedor;
import com.yourapp.app.models.entities.Talle;
import com.yourapp.app.models.entities.TipoDePrenda;
import com.yourapp.app.repositories.ProductoRepository;

@Service
public class ProductoService {
    private final ProductoRepository productoRepository;
    private final CategoriaService categoriaService;
    private final TipoDePrendaService tipoDePrendaService;
    private final TalleService talleService;
    private final ColorService colorService;
    private final ProveedorService proveedorService;

    public ProductoService(ProductoRepository productoRepository, CategoriaService categoriaService, ColorService colorService, ProveedorService proveedorService, TalleService talleService, TipoDePrendaService tipoDePrendaService) {
        this.productoRepository = productoRepository;
        this.categoriaService = categoriaService;
        this.tipoDePrendaService = tipoDePrendaService;
        this.talleService = talleService;
        this.colorService = colorService;
        this.proveedorService = proveedorService;
    }

    public Producto crearProducto(ProductoDto productoDto) {
        Categoria categoria = categoriaService.obtenerCategoria(productoDto.getCategoriaId());
        if(!categoria.getEstaActiva()) {
            throw new ConflictException("No se puede crear un producto con una categoria inactiva");
        }
        TipoDePrenda tipoDePrenda = tipoDePrendaService.obtenerTipoDePrenda(productoDto.getTipoDePrendaId());
        Talle talle = talleService.obtenerTalle(productoDto.getTalleId());
        Color color = colorService.obtenerColor(productoDto.getColorId());
        Proveedor proveedor = proveedorService.obtenerProveedor(productoDto.getProveedorId());
        Producto producto = ProductoMapper.toEntity(productoDto, categoria, tipoDePrenda, talle, color, proveedor);
        return productoRepository.save(producto);
    }
}
