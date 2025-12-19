package com.yourapp.app.controllers;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.yourapp.app.models.dto.VentaCambioDto;
import com.yourapp.app.models.dto.VentaMotivoDto;
import com.yourapp.app.models.dto.VentaDto;
import com.yourapp.app.models.dto.VentaFiltroDto;
import com.yourapp.app.models.dto.VentaPagoDto;
import com.yourapp.app.models.dto.VentaReservaDto;
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
    @PreAuthorize("hasAuthority('VENTA_CREAR')")
    public Venta crearVenta(@RequestBody @Valid VentaDto ventaDto) {
        return ventaService.crearVenta(ventaDto);
    }

    @GetMapping("/{id}") 
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAuthority('VENTA_VER')")
    public Venta obtenerVenta(@PathVariable Long id) {
        return ventaService.obtenerVenta(id);
    }

    @PatchMapping("/{id}/pago")
    @ResponseStatus(HttpStatus.OK) 
    @PreAuthorize("hasAuthority('VENTA_PAGAR')")
    public Venta pagarVentaCompleta(@PathVariable Long id, @RequestBody @Valid VentaPagoDto ventaDto) {
        return ventaService.pagarVentaCompleta(id, ventaDto);
    }

    @PostMapping("/{id}/reserva")
    @ResponseStatus(HttpStatus.CREATED) 
    @PreAuthorize("hasAuthority('VENTA_RESERVAR')")
    public Venta reservarConCredito(@PathVariable Long id, @RequestBody @Valid VentaReservaDto ventaDto) {
        return ventaService.reservarConCredito(id, ventaDto);
    }

    @PostMapping("/{id}/reserva-pagos")
    @ResponseStatus(HttpStatus.CREATED) 
    @PreAuthorize("hasAuthority('VENTA_RESERVAR')")
    public Venta agregarPagoParcialCredito(@PathVariable Long id, @RequestBody @Valid VentaReservaDto ventaDto) {
        return ventaService.agregarPagoParcialCredito(id, ventaDto);
    }

    @PatchMapping("/{id}/cancelacion")
    @ResponseStatus(HttpStatus.OK) 
    @PreAuthorize("hasAuthority('VENTA_CANCELAR')")
    public Venta cancelarVenta(@PathVariable Long id, @RequestBody @Valid VentaMotivoDto ventaDto) {
        return ventaService.cancelarVenta(id, ventaDto);
    }

    @PatchMapping("/{id}/rechazo")
    @ResponseStatus(HttpStatus.OK) 
    @PreAuthorize("hasAuthority('VENTA_CANCELAR')")
    public Venta rechazarVenta(@PathVariable Long id, @RequestBody @Valid VentaMotivoDto ventaDto) {
        return ventaService.rechazarVenta(id, ventaDto);
    }

    @PatchMapping("/{id}/cambio")
    @ResponseStatus(HttpStatus.OK) 
    @PreAuthorize("hasAuthority('VENTA_CAMBIAR')")
    public Venta procesarCambioProducto(@PathVariable Long id, @RequestBody @Valid VentaCambioDto ventaCambioDto) {
        return ventaService.procesarCambioProducto(id, ventaCambioDto);
    }

    @GetMapping("/reservas-vencidas")
    @ResponseStatus(HttpStatus.OK) 
    @PreAuthorize("hasAuthority('VENTA_PROCESAR')")
    public void procesarReservasVencidas(@PathVariable Long id) {
        ventaService.procesarReservasVencidas(); // Cancela las ventas reservadas vencidas
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    @PreAuthorize("hasAuthority('VENTA_VER')")
    public Page<Venta> obtenerVentasFiltradas(@Valid @ModelAttribute VentaFiltroDto filtros) {
        return ventaService.obtenerVentasFiltradas(filtros);
    }
}
