package com.yourapp.app.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.yourapp.app.models.dto.DetalleVentaDto;
import com.yourapp.app.models.dto.VentaDto;
import com.yourapp.app.models.entities.DetalleVenta;
import com.yourapp.app.models.entities.Venta;
import com.yourapp.app.services.VentaService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/ventas")
@RequiredArgsConstructor
public class VentaController {
    private final VentaService ventaService;

    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public Venta crearVenta(@RequestBody @Valid VentaDto ventaDto) {
        return ventaService.crearVenta(ventaDto.getEmpleadoId(), ventaDto.getClienteId());
    }

    @PostMapping("/{id}/detalle-ventas") 
    @ResponseStatus(HttpStatus.OK)
    public Venta crearDetalleVenta(@PathVariable Long id, @RequestBody @Valid DetalleVentaDto detalleVentaDto) {
        return ventaService.agregarProductoAVenta(id, detalleVentaDto);
    }
}
