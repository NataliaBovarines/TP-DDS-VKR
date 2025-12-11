package com.yourapp.app.services;

import org.springframework.stereotype.Service;

import com.yourapp.app.exceptions.ConflictException;
import com.yourapp.app.exceptions.NotFoundException;
import com.yourapp.app.mappers.ProductoMapper;
import com.yourapp.app.models.dto.ProductoDto;
import com.yourapp.app.models.dto.ProductoPatchDto;
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
        if(!categoria.getEstaActiva()) throw new ConflictException("No se puede crear un producto con una categoria inactiva");
        TipoDePrenda tipoDePrenda = tipoDePrendaService.obtenerTipoDePrenda(productoDto.getTipoDePrendaId());
        Talle talle = talleService.obtenerTalle(productoDto.getTalleId());
        Color color = colorService.obtenerColor(productoDto.getColorId());
        Proveedor proveedor = proveedorService.obtenerProveedor(productoDto.getProveedorId());
        Producto producto = ProductoMapper.toEntity(productoDto, categoria, tipoDePrenda, talle, color, proveedor);
        return productoRepository.save(producto);
    }

    public Producto actualizarProducto(Long id, ProductoPatchDto productoDto) {
        Producto producto = productoRepository.findById(id).orElseThrow(() -> new NotFoundException("Producto no encontrado"));

        if (productoDto.getNombre() != null) producto.setNombre(productoDto.getNombre());
        if (productoDto.getDescripcion() != null) producto.setDescripcion(productoDto.getDescripcion());
        if (productoDto.getCategoriaId() != null) {
            Categoria categoria = categoriaService.obtenerCategoria(productoDto.getCategoriaId());
            if (!categoria.getEstaActiva()) throw new ConflictException("No se puede asignar una categoría inactiva");
            producto.setCategoria(categoria);
        }
        if (productoDto.getTipoDePrendaId() != null) producto.setTipoDePrenda(tipoDePrendaService.obtenerTipoDePrenda(productoDto.getTipoDePrendaId()));
        if (productoDto.getTalleId() != null) producto.setTalle(talleService.obtenerTalle(productoDto.getTalleId()));
        if (productoDto.getColorId() != null) producto.setColor(colorService.obtenerColor(productoDto.getColorId()));
        if (productoDto.getProveedorId() != null) producto.setProveedor(proveedorService.obtenerProveedor(productoDto.getProveedorId()));
        if (productoDto.getStockActual() != null) producto.setStockActual(productoDto.getStockActual());
        if (productoDto.getStockMinimo() != null) producto.setStockMinimo(productoDto.getStockMinimo());
        if (productoDto.getPrecio() != null) producto.setPrecio(productoDto.getPrecio());
        if (productoDto.getEstaActivo() != null) producto.setEstaActivo(productoDto.getEstaActivo());

        return productoRepository.save(producto);
    }
}
