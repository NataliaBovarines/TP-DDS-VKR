package com.yourapp.app.services;

import com.yourapp.app.exceptions.BadRequestException;
import com.yourapp.app.exceptions.NotFoundException;
import com.yourapp.app.mappers.DetalleVentaMapper;
import com.yourapp.app.mappers.VentaMapper;
import com.yourapp.app.models.dto.DetalleVentaDto;
import com.yourapp.app.models.dto.VentaFiltroDto;
import com.yourapp.app.models.entities.*;
import com.yourapp.app.models.entities.Venta.MetodoPago;
import com.yourapp.app.models.entities.state.*;
import com.yourapp.app.repositories.*;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class VentaService {

    private final VentaRepository ventaRepository;
    private final ProductoService productoService;
    private final ClienteRepository clienteRepository;
    private final EmpleadoRepository empleadoRepository;

    @Transactional
    public Venta crearVenta(Long empleadoId, Long clienteId) {
        Empleado empleado = empleadoRepository.findById(empleadoId)
            .orElseThrow(() -> new RuntimeException("Empleado no encontrado"));

        Cliente cliente = null;
        if (clienteId != null) {
            cliente = clienteRepository.findById(clienteId)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));
        }

        Venta venta = VentaMapper.toEntity(empleado, cliente);

        return ventaRepository.save(venta);
    }

    public Venta obtenerVenta(Long ventaId) {
        Venta venta = ventaRepository.findById(ventaId).orElseThrow(() -> new NotFoundException("Venta no encontrada"));
        if(venta.getFueEliminado()) throw new NotFoundException("Venta eliminada");
        return venta;
    } 

    @Transactional
    public Venta agregarProductoAVenta(Long ventaId, DetalleVentaDto detalleVentaDto) {
        Venta venta = obtenerVenta(ventaId);

        if (!(venta.getEstado() instanceof VentaIniciada)) {
            throw new IllegalStateException("Solo se pueden agregar productos a ventas INICIADAS");
        }

        DetalleProducto detalleProducto = productoService.obtenerDetalleProducto(detalleVentaDto.getDetalleProductoId());

        if (detalleVentaDto.getCantidad() <= 0) {
            throw new IllegalArgumentException("Cantidad debe ser positiva");
        }

        if (detalleProducto.getStockDisponible() < detalleVentaDto.getCantidad()) {
            throw new IllegalStateException("Stock insuficiente");
        }

        DetalleVenta detalleVenta = DetalleVentaMapper.toEntity(detalleVentaDto, detalleProducto, venta);

        venta.getDetalles().add(detalleVenta);
        venta.calcularTotal();

        return ventaRepository.save(venta);
    }

    public void eliminarVenta(Long id) {
        Venta venta = obtenerVenta(id);

        venta.softDelete();
        
        ventaRepository.save(venta);
    }

    @Transactional
    public Venta pagarVentaCompleta(Long ventaId, MetodoPago metodoPago) {
        Venta venta = obtenerVenta(ventaId);

        if (!(venta.getEstado() instanceof VentaIniciada)) {
            throw new IllegalStateException("Solo se pueden pagar ventas INICIADAS");
        }

        if (metodoPago == MetodoPago.CREDITO) {
            throw new IllegalArgumentException("Crédito solo para reservas");
        }

        venta.getEstado().cobrarTotal(venta.getTotal(), metodoPago);

        VentaPagada nuevoEstado = new VentaPagada();
        nuevoEstado.setVenta(venta);
        venta.setEstado(nuevoEstado);
        venta.setMetodoPago(metodoPago);
        venta.setFecha(LocalDateTime.now());

        return ventaRepository.save(venta);
    }

    @Transactional
    public PagoDeCredito reservarConCredito(Long ventaId, Double montoInicial) {
        Venta venta = obtenerVenta(ventaId);

        if (!(venta.getEstado() instanceof VentaIniciada)) {
            throw new IllegalStateException("Solo se pueden reservar ventas INICIADAS");
        }

        venta.getEstado().reservarConCredito(montoInicial);

        VentaReservada nuevoEstado = new VentaReservada();
        nuevoEstado.setVenta(venta);
        venta.setEstado(nuevoEstado);
        venta.setMetodoPago(MetodoPago.CREDITO);

        return venta.getPagosCredito().isEmpty() ? null : venta.getPagosCredito().get(0);
    }

    @Transactional
    public PagoDeCredito agregarPagoParcialCredito(Long ventaId, Double monto) {
        Venta venta = obtenerVenta(ventaId);

        if (!(venta.getEstado() instanceof VentaReservada)) {
            throw new IllegalStateException("Solo se pueden agregar pagos a ventas RESERVADAS");
        }

        venta.getEstado().agregarPagoCredito(monto);

        if (venta.estaCompletamentePagada()) {
            VentaPagada nuevoEstado = new VentaPagada();
            nuevoEstado.setVenta(venta);
            venta.setEstado(nuevoEstado);
        }

        ventaRepository.save(venta);
        return venta.getPagosCredito().get(venta.getPagosCredito().size() - 1);
    }

    @Transactional
    public Venta cancelarVenta(Long ventaId, String motivo) {
        Venta venta = obtenerVenta(ventaId);

        venta.getEstado().cancelar(motivo);

        VentaCancelada nuevoEstado = new VentaCancelada();
        nuevoEstado.setVenta(venta);
        venta.setEstado(nuevoEstado);

        return ventaRepository.save(venta);
    }

    @Transactional
    public Venta procesarCambioProducto(Long ventaOriginalId, List<DetalleVentaDto> nuevosProductosDtos, String motivo) {
        Venta ventaOriginal = cancelarVenta(ventaOriginalId, motivo);

        Double valorOriginal = ventaOriginal.getTotal();

        Venta nuevaVenta = crearVenta(ventaOriginal.getEmpleado().getId(), ventaOriginal.getCliente().getId());

        for (DetalleVentaDto detalleVentaDto : nuevosProductosDtos) {
            DetalleProducto detalleProducto = productoService.obtenerDetalleProducto(detalleVentaDto.getDetalleProductoId());

            DetalleVenta detalleVenta = DetalleVentaMapper.toEntity(detalleVentaDto, detalleProducto, nuevaVenta);

            nuevaVenta.getDetalles().add(detalleVenta);
        }

        nuevaVenta.calcularTotal();

        if (ventaOriginal.getCliente() != null) {
            Double diferencia = valorOriginal - nuevaVenta.getTotal();
            if (diferencia != 0) {
                ventaOriginal.getCliente().ajustarSaldo(-diferencia);
            }
        }

        return nuevaVenta;
    }

    @Transactional
    public void procesarReservasVencidas() {
        List<Venta> ventasReservadas = ventaRepository.findByEstado(VentaReservada.class);
        for (Venta venta : ventasReservadas) {
            if (venta.getEstado() instanceof VentaReservada) {
                ((VentaReservada) venta.getEstado()).procesar();
            }
        }
    }

    public Page<Venta> obtenerVentasFiltradas(VentaFiltroDto filtros) {
        // --------- ORDENAMIENTO ----------
        Sort sort = Sort.unsorted();
        if (filtros.getOrden() != null) {
            List<String> camposPermitidos = List.of("fecha", "total", "montoPagado", "fechaVencimientoReserva");

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
        Specification<Venta> spec = (root, query, cb) -> cb.conjunction();

        spec = spec.and((root, query, cb) -> cb.isFalse(root.get("fueEliminado")));

        // Filtrar por empleado
        if (filtros.getEmpleadoId() != null) {
            spec = spec.and((root, query, cb) ->
                cb.equal(root.get("empleado").get("id"), filtros.getEmpleadoId())
            );
        }

        // Filtrar por cliente
        if (filtros.getClienteId() != null) {
            spec = spec.and((root, query, cb) ->
                cb.equal(root.get("cliente").get("id"), filtros.getClienteId())
            );
        }

        // Filtrar por método de pago
        if (filtros.getMetodoPago() != null) {
            spec = spec.and((root, query, cb) ->
                cb.equal(root.get("metodoPago"), filtros.getMetodoPago())
            );
        }

        // Filtrar por estado (nombre de la clase de VentaState)
        if (filtros.getEstado() != null) {
            spec = spec.and((root, query, cb) ->
                cb.equal(root.get("estadoNombre"), filtros.getEstado())
            );
        }

        // --------- PAGINACION ----------
        int pagina = (filtros.getPagina() != null && filtros.getPagina() >= 0) ? filtros.getPagina() : 0;
        int tamanio = 10;
        Pageable pageable = PageRequest.of(pagina, tamanio, sort);

        return ventaRepository.findAll(spec, pageable);
    }
}