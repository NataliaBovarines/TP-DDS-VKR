package com.yourapp.app.services;

import com.yourapp.app.exceptions.BadRequestException;
import com.yourapp.app.exceptions.ConflictException;
import com.yourapp.app.exceptions.NotFoundException;
import com.yourapp.app.mappers.DetalleVentaMapper;
import com.yourapp.app.mappers.VentaMapper;
import com.yourapp.app.models.dto.DetalleVentaDto;
import com.yourapp.app.models.dto.VentaCambioDto;
import com.yourapp.app.models.dto.VentaMotivoDto;
import com.yourapp.app.models.dto.VentaDto;
import com.yourapp.app.models.dto.VentaFiltroDto;
import com.yourapp.app.models.dto.VentaPagoDto;
import com.yourapp.app.models.dto.VentaReservaDto;
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
    public Venta crearVenta(VentaDto ventaDto) {
        if (ventaDto.getDetalles() == null || ventaDto.getDetalles().isEmpty()) throw new BadRequestException("No se puede crear una venta sin productos");

        // ---------- VALIDACION PARA EVITAR PRODUCTOS REPETIDOS ----------
        long codigosUnicos = ventaDto.getDetalles().stream().map(DetalleVentaDto::getCodigo).distinct().count();
        if (codigosUnicos < ventaDto.getDetalles().size()) throw new BadRequestException("La lista contiene códigos de producto duplicados. Agrupe las cantidades.");

        // ---------- CREAR LA VENTA BASE ----------
        Usuario usuario = authService.obtenerUsuarioLogueado();
        Empleado empleado = usuario.getEmpleado();
        if (empleado == null) throw new NotFoundException("El usuario no tiene un empleado asociado");
        Cliente cliente = (ventaDto.getClienteId() != null) ? clienteService.obtenerCliente(ventaDto.getClienteId()) : null;

        Venta venta = VentaMapper.toEntity(empleado, cliente);

        // ---------- CARGAR TODOS LOS PRODUCTOS ----------
        for (DetalleVentaDto detalleDto : ventaDto.getDetalles()) {
            DetalleProducto detalleProducto = productoService.obtenerDetalleByCodigo(detalleDto.getCodigo());

            if (detalleProducto.getStockDisponible() < detalleDto.getCantidad()) throw new ConflictException("Stock insuficiente para: " + detalleProducto.getProducto().getNombre() + " [" + detalleDto.getCodigo() + "]");

            DetalleVenta detalleVenta = DetalleVentaMapper.toEntity(detalleDto, detalleProducto, venta);
            venta.getDetalles().add(detalleVenta);
        }

        // ---------- CALCULAR EL TOTAL Y GUARDAR ----------
        venta.calcularTotal();
        
        return ventaRepository.save(venta);
    }

    // ============================ OBTENER UNA VENTA POR ID ============================
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
    public Venta pagarVentaCompleta(Long ventaId, VentaPagoDto ventaDto) {
        Venta venta = obtenerVenta(ventaId);

        if (!(venta.getEstado() instanceof VentaIniciada)) throw new ConflictException("Solo se pueden pagar ventas INICIADAS");
        
        if (ventaDto.getMetodoPago() == MetodoPago.CREDITO) throw new ConflictException("Crédito solo para reservas");

        venta.getEstado().cobrarTotal(venta.getSaldoPendiente(), ventaDto.getMetodoPago());

        VentaPagada nuevoEstado = new VentaPagada();
        nuevoEstado.setVenta(venta);
        venta.setEstado(nuevoEstado);
        venta.setMetodoPago(ventaDto.getMetodoPago());
        venta.setFecha(LocalDateTime.now());

        return ventaRepository.save(venta);
    }

    // ============================ RESERVAR UNA VENTA CON SEÑA ============================
    @Transactional
    public Venta reservarConCredito(Long ventaId, VentaReservaDto ventaDto) {
        Venta venta = obtenerVenta(ventaId);

        if (venta.getCliente().getCategoriaCliente() == CategoriaCliente.NO_CONFIABLE) throw new ConflictException("Los clientes NO CONFIABLES no pueden realizar reservas"); 

        if (!(venta.getEstado() instanceof VentaIniciada)) throw new ConflictException("Solo se pueden reservar ventas INICIADAS");
        
        venta.getEstado().reservarConCredito(ventaDto.getMonto());

        VentaReservada nuevoEstado = new VentaReservada();
        nuevoEstado.setVenta(venta);
        venta.setEstado(nuevoEstado);
        venta.setMetodoPago(MetodoPago.CREDITO);

        return ventaRepository.save(venta);
    }

    // ============================ AGREGAR UN PAGO A UNA VENTA RESERVADA ============================
    @Transactional
    public Venta agregarPagoParcialCredito(Long ventaId, VentaReservaDto ventaDto) {
        Venta venta = obtenerVenta(ventaId);

        if (!(venta.getEstado() instanceof VentaReservada)) throw new ConflictException("Solo se pueden agregar pagos a ventas RESERVADAS");
        
        venta.getEstado().agregarPagoCredito(ventaDto.getMonto());

        if (venta.estaCompletamentePagada()) {
            VentaPagada nuevoEstado = new VentaPagada();
            nuevoEstado.setVenta(venta);
            venta.setEstado(nuevoEstado);
        }

        return ventaRepository.save(venta);
    }

    // ============================ CANCELAR UNA VENTA ============================
    @Transactional
    public Venta cancelarVenta(Long ventaId, VentaMotivoDto ventaDto) {
        Venta venta = obtenerVenta(ventaId);

        venta.getEstado().cancelar(ventaDto.getMotivo());

        VentaCancelada nuevoEstado = new VentaCancelada();
        nuevoEstado.setVenta(venta);
        venta.setEstado(nuevoEstado);

        return ventaRepository.save(venta);
    }

    // ============================ RECHAZAR UNA VENTA ============================
    @Transactional
    public Venta rechazarVenta(Long ventaId, VentaMotivoDto ventaDto) {
        Venta venta = obtenerVenta(ventaId);

        venta.getEstado().rechazar(ventaDto.getMotivo());

        VentaRechazada nuevoEstado = new VentaRechazada();
        nuevoEstado.setVenta(venta);
        venta.setEstado(nuevoEstado);

        return ventaRepository.save(venta);
    }

    // ============================ CAMBIAR PRODUCTOS DE UNA VENTA (PAGADA O RESERVADA) ============================
    @Transactional
    public Venta procesarCambioProducto(Long ventaOriginalId, VentaCambioDto ventaDto) {
        Venta ventaOriginal = obtenerVenta(ventaOriginalId);

        if (ventaOriginal.getCliente() == null) throw new BadRequestException("No se puede realizar un cambio en una venta sin cliente asociado. Identifique al cliente primero.");

        Double totalOriginal = ventaOriginal.getTotal();
        Double montoPagadoOriginal = ventaOriginal.getMontoPagado();

        // ---------- CANCELAR VENTA ORIGINAL ----------
        VentaMotivoDto ventaCancelacionDto = new VentaMotivoDto();
        ventaCancelacionDto.setMotivo(ventaDto.getMotivo());

        cancelarVenta(ventaOriginalId, ventaCancelacionDto);

        // ---------- CREAR NUEVA VENTA ----------
        VentaDto nuevaVentaDto = new VentaDto();
        nuevaVentaDto.setClienteId(ventaOriginal.getCliente().getId());
        nuevaVentaDto.setDetalles(ventaDto.getDetalles());

        Venta nuevaVenta = crearVenta(nuevaVentaDto);

        Double totalNuevo = nuevaVenta.getTotal();

        // ---------- REGLA DE NEGOCIO ----------
        if (totalNuevo < totalOriginal) throw new ConflictException("El cambio de productos debe ser por un monto igual o mayor a la venta original");

        // ---------- TRANSFERIR PAGO ----------
        nuevaVenta.setMontoPagado(montoPagadoOriginal);

        if (totalNuevo.equals(totalOriginal)) {
            // Queda PAGADA
            VentaPagada estado = new VentaPagada();
            estado.setVenta(nuevaVenta);
            nuevaVenta.setEstado(estado);
            nuevaVenta.setFecha(LocalDateTime.now());
            nuevaVenta.setMetodoPago(ventaOriginal.getMetodoPago());
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