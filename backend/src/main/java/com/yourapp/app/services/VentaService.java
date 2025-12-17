package com.yourapp.app.services;

import com.yourapp.app.exceptions.BadRequestException;
import com.yourapp.app.exceptions.ConflictException;
import com.yourapp.app.exceptions.ForbiddenException;
import com.yourapp.app.exceptions.NotFoundException;
import com.yourapp.app.mappers.DetalleVentaMapper;
import com.yourapp.app.mappers.VentaMapper;
import com.yourapp.app.models.dto.DetalleVentaDto;
import com.yourapp.app.models.dto.VentaFiltroDto;
import com.yourapp.app.models.entities.*;
import com.yourapp.app.models.entities.Cliente.CategoriaCliente;
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
    private final ClienteService clienteService;
    private final AuthService authService;

    // ============================ CREAR UNA VENTA ============================
    @Transactional
    public Venta crearVenta(Long clienteId) {
        Usuario usuario = authService.obtenerUsuarioLogueado();

        Empleado empleado = usuario.getEmpleado();

        if (empleado == null) throw new NotFoundException("El usuario no tiene un empleado asociado");

        Cliente cliente = null;

        if (clienteId != null) {
            cliente = clienteService.obtenerCliente(clienteId);
        }

        Venta venta = VentaMapper.toEntity(empleado, cliente);

        return ventaRepository.save(venta);
    }

    // ============================ AGREGAR UN PRODUCTO A UNA VENTA ============================
    @Transactional
    public Venta agregarProductoAVenta(Long ventaId, DetalleVentaDto detalleVentaDto) {
        Venta venta = obtenerVenta(ventaId);

        if (!(venta.getEstado() instanceof VentaIniciada)) throw new ConflictException("Solo se pueden agregar productos a ventas INICIADAS");

        DetalleProducto detalleProducto = productoService.obtenerDetalleProducto(detalleVentaDto.getDetalleProductoId());

        if (detalleVentaDto.getCantidad() <= 0) throw new BadRequestException("Cantidad debe ser positiva");
        
        if (detalleProducto.getStockDisponible() < detalleVentaDto.getCantidad()) throw new ConflictException("Stock insuficiente");

        DetalleVenta detalleVenta = DetalleVentaMapper.toEntity(detalleVentaDto, detalleProducto, venta);

        venta.getDetalles().add(detalleVenta);
        venta.calcularTotal();

        return ventaRepository.save(venta);
    }

    // ============================ OBTENER UNA VENTA ============================
    public Venta obtenerVenta(Long ventaId) {
        Venta venta = ventaRepository.findById(ventaId).orElseThrow(() -> new NotFoundException("Venta no encontrada"));
        
        if(venta.getFueEliminado()) throw new NotFoundException("Venta eliminada");
        
        return venta;
    }

    // ============================ ELIMINAR UNA VENTA ============================
    @Transactional
    public void eliminarVenta(Long id) {
        Venta venta = obtenerVenta(id);

        if (!(venta.getEstado() instanceof VentaIniciada)) throw new ConflictException("No se puede eliminar una venta que ya ha sido procesada");
    
        venta.softDelete();

        ventaRepository.save(venta);
    }

    // ============================ PAGAR POR COMPLETO UNA VENTA ============================
    @Transactional
    public Venta pagarVentaCompleta(Long ventaId, MetodoPago metodoPago) {
        Venta venta = obtenerVenta(ventaId);

        if (!(venta.getEstado() instanceof VentaIniciada)) throw new ConflictException("Solo se pueden pagar ventas INICIADAS");
        
        if (metodoPago == MetodoPago.CREDITO) throw new ConflictException("Crédito solo para reservas");

        venta.getEstado().cobrarTotal(venta.getSaldoPendiente(), metodoPago);

        VentaPagada nuevoEstado = new VentaPagada();
        nuevoEstado.setVenta(venta);
        venta.setEstado(nuevoEstado);
        venta.setMetodoPago(metodoPago);
        venta.setFecha(LocalDateTime.now());

        return ventaRepository.save(venta);
    }

    // ============================ RESERVAR UNA VENTA CON SEÑA ============================
    @Transactional
    public Venta reservarConCredito(Long ventaId, Double montoInicial) {
        Venta venta = obtenerVenta(ventaId);

        if (venta.getCliente().getCategoriaCliente() == CategoriaCliente.NO_CONFIABLE) throw new ConflictException("Los clientes NO CONFIABLES no pueden realizar reservas"); 

        if (!(venta.getEstado() instanceof VentaIniciada)) throw new ConflictException("Solo se pueden reservar ventas INICIADAS");
        
        venta.getEstado().reservarConCredito(montoInicial);

        VentaReservada nuevoEstado = new VentaReservada();
        nuevoEstado.setVenta(venta);
        venta.setEstado(nuevoEstado);
        venta.setMetodoPago(MetodoPago.CREDITO);

        return ventaRepository.save(venta);
    }

    // ============================ AGREGAR UN PAGO A UNA VENTA RESERVADA ============================
    @Transactional
    public Venta agregarPagoParcialCredito(Long ventaId, Double monto) {
        Venta venta = obtenerVenta(ventaId);

        if (!(venta.getEstado() instanceof VentaReservada)) throw new ConflictException("Solo se pueden agregar pagos a ventas RESERVADAS");
        
        venta.getEstado().agregarPagoCredito(monto);

        if (venta.estaCompletamentePagada()) {
            VentaPagada nuevoEstado = new VentaPagada();
            nuevoEstado.setVenta(venta);
            venta.setEstado(nuevoEstado);
        }

        return ventaRepository.save(venta);
    }

    // ============================ CANCELAR UNA VENTA ============================
    @Transactional
    public Venta cancelarVenta(Long ventaId, String motivo) {
        Venta venta = obtenerVenta(ventaId);

        venta.getEstado().cancelar(motivo);

        VentaCancelada nuevoEstado = new VentaCancelada();
        nuevoEstado.setVenta(venta);
        venta.setEstado(nuevoEstado);

        return ventaRepository.save(venta);
    }

    // ============================ CAMBIAR PRODUCTOS DE UNA VENTA (PAGADA O RESERVADA) ============================
    @Transactional
    public Venta procesarCambioProducto(Long ventaOriginalId, List<DetalleVentaDto> nuevosProductosDtos, String motivo) {
        Venta ventaOriginal = obtenerVenta(ventaOriginalId);
        Cliente cliente = ventaOriginal.getCliente();

        if (ventaOriginal.getCliente() == null) throw new BadRequestException("No se puede realizar un cambio en una venta sin cliente asociado. Identifique al cliente primero.");

        // --------- CANCELAR VENTA ----------
        // Esta acción "muda" el dinero de la venta al saldo del cliente
        cancelarVenta(ventaOriginalId, motivo);

        // --------- CREAR NUEVA VENTA ----------
        Venta nuevaVenta = crearVenta(cliente.getId());

        for (DetalleVentaDto dto : nuevosProductosDtos) {
            DetalleProducto detalleProducto = productoService.obtenerDetalleProducto(dto.getDetalleProductoId());
            DetalleVenta detalleVenta = DetalleVentaMapper.toEntity(dto, detalleProducto, nuevaVenta);
            nuevaVenta.getDetalles().add(detalleVenta);
        }

        nuevaVenta.calcularTotal();

        // --------- RECUPERAR DINERO DEL CLIENTE ----------
        Double saldoParaUsar = cliente.getSaldoAFavor();
        Double totalNuevo = nuevaVenta.getTotal();

        if (saldoParaUsar >= totalNuevo) {
            // El saldo cubre todo
            nuevaVenta.setMontoPagado(totalNuevo);
            cliente.setSaldoAFavor(saldoParaUsar - totalNuevo);
            
            VentaPagada estado = new VentaPagada();
            estado.setVenta(nuevaVenta);
            nuevaVenta.setEstado(estado);
            nuevaVenta.setFecha(LocalDateTime.now());
        } else {
            // El saldo no alcanza: usamos todo lo que hay
            nuevaVenta.setMontoPagado(saldoParaUsar);
            cliente.setSaldoAFavor(0.0);
            
            VentaIniciada estado = new VentaIniciada();
            estado.setVenta(nuevaVenta);
            nuevaVenta.setEstado(estado);
        }

        return ventaRepository.save(nuevaVenta);
    }


    // ============================ CANCELAR VENTAS VENCIDAS ============================
    @Transactional
    public void procesarReservasVencidas() {
        List<Venta> ventasReservadas = ventaRepository.findByEstado(VentaReservada.class);
        for (Venta venta : ventasReservadas) {
            if (venta.getEstado() instanceof VentaReservada) {
                ((VentaReservada) venta.getEstado()).procesar();
            }
        }
    }

    // ============================ OBTENER VENTAS CON FILTROS ============================
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