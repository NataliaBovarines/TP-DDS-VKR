package com.yourapp.app.services;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.yourapp.app.exceptions.BadRequestException;
import com.yourapp.app.exceptions.ConflictException;
import com.yourapp.app.exceptions.NotFoundException;
import com.yourapp.app.mappers.DetalleProductoMapper;
import com.yourapp.app.mappers.ProductoMapper;
import com.yourapp.app.models.dto.DetalleProductoCambioDto;
import com.yourapp.app.models.dto.DetalleProductoDto;
import com.yourapp.app.models.dto.ProductoDto;
import com.yourapp.app.models.dto.ProductoFiltroDto;
import com.yourapp.app.models.dto.ProductoPatchDto;
import com.yourapp.app.models.entities.Categoria;
import com.yourapp.app.models.entities.Color;
import com.yourapp.app.models.entities.DetalleProducto;
import com.yourapp.app.models.entities.Producto;
import com.yourapp.app.models.entities.Proveedor;
import com.yourapp.app.models.entities.Talle;
import com.yourapp.app.models.entities.TipoDePrenda;
import com.yourapp.app.repositories.DetalleProductoRepository;
import com.yourapp.app.repositories.ProductoRepository;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductoService {
    private final ProductoRepository productoRepository;
    private final DetalleProductoRepository detalleProductoRepository;
    private final CategoriaService categoriaService;
    private final TipoDePrendaService tipoDePrendaService;
    private final TalleService talleService;
    private final ColorService colorService;
    private final ProveedorService proveedorService;

    public Producto crearProducto(ProductoDto productoDto) {
        Categoria categoria = categoriaService.obtenerCategoria(productoDto.getCategoriaId());
        if(!categoria.getEstaActiva()) throw new ConflictException("No se puede crear un producto con una categoria inactiva");
        TipoDePrenda tipoDePrenda = tipoDePrendaService.obtenerTipoDePrenda(productoDto.getTipoDePrendaId());
        Proveedor proveedor = proveedorService.obtenerProveedor(productoDto.getProveedorId());
        Producto producto = ProductoMapper.toEntity(productoDto, categoria, tipoDePrenda, proveedor);
        return productoRepository.save(producto);
    }

    public DetalleProducto crearDetalleProducto(Long productoId, DetalleProductoDto detalleDto) {
        Producto producto = obtenerProducto(productoId);
        Talle talle = talleService.obtenerTalle(detalleDto.getTalleId());
        Color color = colorService.obtenerColor(detalleDto.getColorId());
        DetalleProducto detalle = DetalleProductoMapper.toEntity(detalleDto, producto, talle, color);
        return detalleProductoRepository.save(detalle);
    }

    public Producto obtenerProducto(Long productoId) {
        Producto producto = productoRepository.findById(productoId).orElseThrow(() -> new NotFoundException("Producto no encontrado"));

        if (producto.getFueEliminado()) throw new NotFoundException("Producto eliminado");
    
        return producto;
    }

    public DetalleProducto obtenerDetalleProducto(Long detalleId) {
        DetalleProducto detalle = detalleProductoRepository.findById(detalleId).orElseThrow(() -> new NotFoundException("Detalle de producto no encontrado"));
        
        if (Boolean.TRUE.equals(detalle.getFueEliminado())) throw new NotFoundException("Producto eliminado");

        return detalle;
    }

    public Producto actualizarProducto(Long id, ProductoPatchDto productoDto) {
        Producto producto = obtenerProducto(id);

        if (productoDto.getNombre() != null) producto.setNombre(productoDto.getNombre());
        if (productoDto.getDescripcion() != null) producto.setDescripcion(productoDto.getDescripcion());
        if (productoDto.getCategoriaId() != null) {
            Categoria categoria = categoriaService.obtenerCategoria(productoDto.getCategoriaId());
            if (!categoria.getEstaActiva()) throw new ConflictException("No se puede asignar una categoria inactiva");
            producto.setCategoria(categoria);
        }
        if (productoDto.getTipoDePrendaId() != null) producto.setTipoDePrenda(tipoDePrendaService.obtenerTipoDePrenda(productoDto.getTipoDePrendaId()));
        if (productoDto.getProveedorId() != null) producto.setProveedor(proveedorService.obtenerProveedor(productoDto.getProveedorId()));
        if (productoDto.getPrecio() != null) producto.setPrecio(productoDto.getPrecio());

        return productoRepository.save(producto);
    }

    public DetalleProducto actualizarDetalleProducto(Long id, Long detalleId, DetalleProductoCambioDto detalleDto) {
        DetalleProducto detalle = obtenerDetalleProducto(detalleId);

        if (!detalle.getProducto().getId().equals(id)) {
            throw new BadRequestException("El detalle no pertenece al producto especificado");
        }

        if (detalleDto.getStockAumento() != null) detalle.setStockActual(detalle.getStockActual() + detalleDto.getStockAumento());

        if (detalleDto.getStockMinimo() != null) detalle.setStockMinimo(detalleDto.getStockMinimo());

        return detalleProductoRepository.save(detalle);
    }

    public void eliminarProducto(Long id) {
        Producto producto = obtenerProducto(id);

        producto.softDelete();
        
        productoRepository.save(producto);
    }

    public void eliminarDetalleProducto(Long id, Long detalleId) {
        Producto producto = obtenerProducto(id);

        DetalleProducto detalle = obtenerDetalleProducto(detalleId);

        if (!detalle.getProducto().getId().equals(producto.getId())) throw new BadRequestException("El detalle no pertenece a este producto");

        detalle.softDelete();

        detalleProductoRepository.save(detalle);
    }

    public Page<Producto> obtenerProductosFiltrados(ProductoFiltroDto filtros) {
        // --------- ORDENAMIENTO ----------
        Sort sort = Sort.unsorted();

        if (filtros.getOrden() != null) {
            List<String> camposPermitidos = List.of("nombre", "precio");

            String campo = filtros.getOrden().toLowerCase();

            if (camposPermitidos.contains(campo)) {
                Sort.Direction direccion = Sort.Direction.ASC;
                if ("desc".equalsIgnoreCase(filtros.getDireccion())) {
                    direccion = Sort.Direction.DESC;
                }
                sort = Sort.by(direccion, campo);
            } else {
                throw new BadRequestException("No se puede ordenar por el campo: " + campo);
            }
        }

        // --------- ESPECIFICACION ----------
        Specification<Producto> spec = (root, query, cb) -> cb.conjunction();

        spec = spec.and((root, query, cb) -> cb.isFalse(root.get("fueEliminado")));

        // Filtrar por nombre
        if (filtros.getNombre() != null && !filtros.getNombre().isBlank()) {
            spec = spec.and((root, query, cb) ->
                cb.like(cb.lower(root.get("nombre")), "%" + filtros.getNombre().toLowerCase() + "%")
            );
        }

        // Filtrar por categoría
        if (filtros.getCategoriaId() != null) {
            spec = spec.and((root, query, cb) ->
                cb.equal(root.get("categoria").get("id"), filtros.getCategoriaId())
            );
        }

        // Filtrar por tipo
        if (filtros.getTipoId() != null) {
            spec = spec.and((root, query, cb) ->
                cb.equal(root.get("tipoDePrenda").get("id"), filtros.getTipoId())
            );
        }

        // Filtrar por proveedor
        if (filtros.getProveedorId() != null) {
            spec = spec.and((root, query, cb) ->
                cb.equal(root.get("proveedor").get("id"), filtros.getProveedorId())
            );
        }

        // Filtrar por stock bajo de los detalles
        if (Boolean.TRUE.equals(filtros.getStockBajo())) {
            spec = spec.and((root, query, cb) -> {
                query.distinct(true);
                Join<Producto, DetalleProducto> join = root.join("detallesProductos", JoinType.LEFT);
                return cb.lessThan(join.get("stockActual"), join.get("stockMinimo"));
            });
        }

        // Filtrar por color de los detalles
        if (filtros.getColorId() != null) {
            spec = spec.and((root, query, cb) -> {
                query.distinct(true);
                Join<Producto, DetalleProducto> join = root.join("detallesProductos", JoinType.LEFT);
                return cb.equal(join.get("color").get("id"), filtros.getColorId());
            });
        }

        // Filtrar por talle de los detalles
        if (filtros.getTalleId() != null) {
            spec = spec.and((root, query, cb) -> {
                query.distinct(true);
                Join<Producto, DetalleProducto> join = root.join("detallesProductos", JoinType.LEFT);
                return cb.equal(join.get("talle").get("id"), filtros.getTalleId());
            });
        }

        // --------- PAGINACION ----------
        int pagina = (filtros.getPagina() != null && filtros.getPagina() >= 0) ? filtros.getPagina() : 0;
        int tamanio = 10;
        Pageable pageable = PageRequest.of(pagina, tamanio, sort);

        // --------- CONSULTA CON ESPECIFICACION, ORDENAMIENTO Y PAGINACION ----------
        return productoRepository.findAll(spec, pageable);
    }
}
