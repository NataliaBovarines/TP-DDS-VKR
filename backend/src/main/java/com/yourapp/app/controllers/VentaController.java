package com.yourapp.app.controllers;

import java.util.List;

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

import com.yourapp.app.models.dto.DetalleVentaDto;
import com.yourapp.app.models.dto.ProductoFiltroDto;
import com.yourapp.app.models.dto.VentaCambioDto;
import com.yourapp.app.models.dto.VentaDto;
import com.yourapp.app.models.dto.VentaFiltroDto;
import com.yourapp.app.models.dto.VentaPagoDto;
import com.yourapp.app.models.entities.PagoDeCredito;
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

    @PatchMapping("/{id}/detalles") 
    @ResponseStatus(HttpStatus.OK)
    public Venta agregarProductoAVenta(@PathVariable Long id, @RequestBody @Valid DetalleVentaDto detalleVentaDto) {
        return ventaService.agregarProductoAVenta(id, detalleVentaDto);
    }

    @GetMapping("/{id}") 
    @ResponseStatus(HttpStatus.OK)
    public Venta obtenerVenta(@PathVariable Long id) {
        return ventaService.obtenerVenta(id);
    }

    @PatchMapping("/{id}/pago")
    @ResponseStatus(HttpStatus.OK) 
    public Venta pagarVentaCompleta(@PathVariable Long id, @RequestBody @Valid VentaPagoDto ventaPagoDto) {
        return ventaService.pagarVentaCompleta(id, ventaPagoDto.getMetodoPago());
    }

    @PostMapping("/{id}/reserva")
    @ResponseStatus(HttpStatus.OK) 
    public PagoDeCredito reservarConCredito(@PathVariable Long id, @RequestBody @Valid VentaPagoDto ventaPagoDto) {
        return ventaService.reservarConCredito(id, ventaPagoDto.getMonto());
    }

    @PostMapping("/{id}/reserva-pagos")
    @ResponseStatus(HttpStatus.OK) 
    public PagoDeCredito agregarPagoParcialCredito(@PathVariable Long id, @RequestBody @Valid VentaPagoDto ventaPagoDto) {
        return ventaService.agregarPagoParcialCredito(id, ventaPagoDto.getMonto());
    }

    @PatchMapping("/{id}/cancelacion")
    @ResponseStatus(HttpStatus.OK) 
    public Venta cancelarVenta(@PathVariable Long id, @RequestBody @Valid VentaCambioDto ventaCambioDto) {
        return ventaService.cancelarVenta(id, ventaCambioDto.getMotivo());
    }

    @PatchMapping("/{id}/cambio")
    @ResponseStatus(HttpStatus.OK) 
    public Venta procesarCambioProducto(@PathVariable Long id, @RequestBody @Valid VentaCambioDto ventaCambioDto) {
        return ventaService.procesarCambioProducto(id, ventaCambioDto.getDetalleVentaDtos(), ventaCambioDto.getMotivo());
    }

    @GetMapping("/reservas-vencidas")
    @ResponseStatus(HttpStatus.OK) 
    public void procesarReservasVencidas(@PathVariable Long id) {
        ventaService.procesarReservasVencidas(); // Cancela las ventas reservadas vencidas
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public Page<Venta> obtenerVentasFiltradas(@Valid @ModelAttribute VentaFiltroDto filtros) {
        return ventaService.obtenerVentasFiltradas(filtros);
    }
}
