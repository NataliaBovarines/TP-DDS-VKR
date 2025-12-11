package com.yourapp.app.services;

import com.yourapp.app.models.entities.*;
import com.yourapp.app.models.entities.Venta.MetodoPago;
import com.yourapp.app.models.entities.state.*;
import com.yourapp.app.repositories.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class VentaService {

    private final VentaRepository ventaRepository;
    private final ProductoRepository productoRepository;
    private final ClienteRepository clienteRepository;
    private final EmpleadoRepository empleadoRepository;
    private final PagoDeCreditoRepository pagoDeCreditoRepository;

    @Transactional
    public Venta crearVenta(Long empleadoId, Long clienteId) {
        Empleado empleado = empleadoRepository.findById(empleadoId)
            .orElseThrow(() -> new RuntimeException("Empleado no encontrado"));

        Cliente cliente = null;
        if (clienteId != null) {
            cliente = clienteRepository.findById(clienteId)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));
        }

        Venta venta = new Venta();
        venta.setEmpleado(empleado);
        venta.setCliente(cliente);
        venta.setFecha(LocalDateTime.now());
        venta.setEstado(new VentaIniciada());
        venta.getEstado().setVenta(venta);

        return ventaRepository.save(venta);
    }

    @Transactional
    public Venta agregarProductoAVenta(Long ventaId, Long productoId, Integer cantidad) {
        Venta venta = ventaRepository.findById(ventaId)
            .orElseThrow(() -> new RuntimeException("Venta no encontrada"));

        if (!(venta.getEstado() instanceof VentaIniciada)) {
            throw new IllegalStateException("Solo se pueden agregar productos a ventas INICIADAS");
        }

        Producto producto = productoRepository.findById(productoId)
            .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        if (cantidad <= 0) {
            throw new IllegalArgumentException("Cantidad debe ser positiva");
        }

        if (producto.getStockDisponible() < cantidad) {
            throw new IllegalStateException("Stock insuficiente");
        }

        DetalleVenta detalle = new DetalleVenta();
        detalle.setProducto(producto);
        detalle.setCantidad(cantidad);
        detalle.setPrecioUnitarioActual(producto.getPrecio().doubleValue());
        detalle.calcularPrecioTotal();
        detalle.setVenta(venta);

        venta.getDetalles().add(detalle);
        venta.calcularTotal();

        return ventaRepository.save(venta);
    }

    @Transactional
    public Venta pagarVentaCompleta(Long ventaId, MetodoPago metodoPago) {
        Venta venta = ventaRepository.findById(ventaId)
            .orElseThrow(() -> new RuntimeException("Venta no encontrada"));

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
        Venta venta = ventaRepository.findById(ventaId)
            .orElseThrow(() -> new RuntimeException("Venta no encontrada"));

        if (!(venta.getEstado() instanceof VentaIniciada)) {
            throw new IllegalStateException("Solo se pueden reservar ventas INICIADAS");
        }

        venta.getEstado().reservarConCredito(montoInicial);

        VentaReservada nuevoEstado = new VentaReservada();
        nuevoEstado.setVenta(venta);
        venta.setEstado(nuevoEstado);
        venta.setMetodoPago(MetodoPago.CREDITO);

        return venta.getPagosCredito().get(0);
    }

    @Transactional
    public PagoDeCredito agregarPagoParcialCredito(Long ventaId, Double monto) {
        Venta venta = ventaRepository.findById(ventaId)
            .orElseThrow(() -> new RuntimeException("Venta no encontrada"));

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
        Venta venta = ventaRepository.findById(ventaId)
            .orElseThrow(() -> new RuntimeException("Venta no encontrada"));

        venta.getEstado().cancelar(motivo);

        VentaCancelada nuevoEstado = new VentaCancelada();
        nuevoEstado.setVenta(venta);
        venta.setEstado(nuevoEstado);

        return ventaRepository.save(venta);
    }

    @Transactional
    public Venta procesarCambioProducto(Long ventaOriginalId, List<DetalleVenta> nuevosProductos, String motivo) {
        Venta ventaOriginal = cancelarVenta(ventaOriginalId, motivo);

        Double valorOriginal = ventaOriginal.getTotal();

        Venta nuevaVenta = crearVenta(ventaOriginal.getEmpleado().getId(), ventaOriginal.getCliente().getId());

        for (DetalleVenta detalle : nuevosProductos) {
            detalle.setVenta(nuevaVenta);
            nuevaVenta.getDetalles().add(detalle);
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
        List<Venta> ventasReservadas = ventaRepository.findByEstadoTipo("RESERVADA");
        for (Venta venta : ventasReservadas) {
            if (venta.getEstado() instanceof VentaReservada) {
                ((VentaReservada) venta.getEstado()).procesar();
            }
        }
    }
}