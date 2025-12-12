package com.yourapp.app.controllers;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.yourapp.app.models.dto.DetalleProductoCambioDto;
import com.yourapp.app.models.dto.DetalleProductoDto;
import com.yourapp.app.models.dto.ProductoDto;
import com.yourapp.app.models.dto.ProductoFiltroDto;
import com.yourapp.app.models.dto.ProductoPatchDto;
import com.yourapp.app.models.entities.DetalleProducto;
import com.yourapp.app.models.entities.Producto;
import com.yourapp.app.services.ProductoService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/productos")
@RequiredArgsConstructor
public class ProductoController {
    private final ProductoService productoService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Producto crearProducto(@RequestBody @Valid ProductoDto productoDto) {
        return productoService.crearProducto(productoDto);
    }

    @PostMapping("/{id}/detalles")
    @ResponseStatus(HttpStatus.OK)
    public DetalleProducto crearDetalleProducto(@PathVariable Long id, @RequestBody @Valid DetalleProductoDto detalleDto) {
        return productoService.crearDetalleProducto(id, detalleDto);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Producto obtenerProducto(@PathVariable Long id) {
        return productoService.obtenerProducto(id);
    }

    @PatchMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Producto actualizarProducto(@PathVariable Long id, @RequestBody @Valid ProductoPatchDto productoDto) {
        return productoService.actualizarProducto(id, productoDto);
    }

    @PatchMapping("/{id}/detalles/{detalleId}")
    @ResponseStatus(HttpStatus.OK)
    public DetalleProducto actualizarDetalleProducto(@PathVariable Long id, @PathVariable Long detalleId, @RequestBody @Valid DetalleProductoCambioDto detalleDto) {
        return productoService.actualizarDetalleProducto(id, detalleId, detalleDto);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public Page<Producto> obtenerProductosFiltrados(@Valid @ModelAttribute ProductoFiltroDto filtros) {
        return productoService.obtenerProductosFiltrados(filtros);
    } 

    @PatchMapping("/{id}/eliminacion")
    @ResponseStatus(HttpStatus.OK) 
    public void eliminarProducto(@PathVariable Long id) {
        productoService.eliminarProducto(id);
    }

    @PatchMapping("/{id}/detalles/{detalleId}/eliminacion")
    @ResponseStatus(HttpStatus.OK)
    public void eliminarDetalleProducto(@PathVariable Long id, @PathVariable Long detalleId) {
        productoService.eliminarDetalleProducto(id, detalleId);
    }
}   
