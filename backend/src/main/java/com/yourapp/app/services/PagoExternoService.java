package com.yourapp.app.services;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.yourapp.app.models.dto.RespuestaPagoExternoDTO;
import com.yourapp.app.models.dto.SolicitudPagoExternoDTO;
import com.yourapp.app.models.entities.Cliente;
import com.yourapp.app.models.entities.PagoExterno;
import com.yourapp.app.models.entities.Venta;
import com.yourapp.app.models.entities.adapters.AdapterQr;
import com.yourapp.app.models.entities.adapters.AdapterQrMercadoPago;
import com.yourapp.app.repositories.ClienteRepository;
import com.yourapp.app.repositories.PagoExternoRepository;
import com.yourapp.app.repositories.VentaRepository;

@Service
public class PagoExternoService {
    
    private final PagoExternoRepository pagoExternoRepository;
    private final Venta venta;
    private final Cliente cliente;
    private final AdapterQrMercadoPago adapterQrMercadoPago;
    
    public PagoExternoService(
            PagoExternoRepository pagoExternoRepository,
            Venta venta,
            Cliente cliente,
            AdapterQrMercadoPago adapterQrMercadoPago) {
        this.pagoExternoRepository = pagoExternoRepository;
        this.venta = venta;
        this.cliente = cliente;
        this.adapterQrMercadoPago = adapterQrMercadoPago;
    }
    
    /**
     * Crea un pago externo y genera el link de pago
     */
    @Transactional
    public RespuestaPagoExternoDTO crearPagoExterno(SolicitudPagoExternoDTO solicitud) {

        // Seleccionar el adapter de pago (por defecto MercadoPago)
        AdapterQr adapter = adapterQrMercadoPago;
        String metodoPago = solicitud.getMetodoPago() != null ? solicitud.getMetodoPago() : "MERCADOPAGO";
        
        // Preparar datos adicionales
        Map<String, String> datosAdicionales = new HashMap<>();
        datosAdicionales.put("cliente_nombre", cliente.getNombre() + " " + cliente.getApellido());
        datosAdicionales.put("cliente_dni", cliente.getDni());
        datosAdicionales.put("venta_id", venta.getId().toString());
        
        // Crear link de pago en el servicio externo
        String descripcion = solicitud.getDescripcion() != null 
            ? solicitud.getDescripcion() 
            : "Pago de venta #" + venta.getId();
        
        Map<String, String> resultadoPago = adapter.crearPago(
            solicitud.getMonto(),
            descripcion,
            venta.getId().toString(),
            datosAdicionales
        );
        
        // Crear entidad PagoExterno
        PagoExterno pagoExterno = new PagoExterno();
        pagoExterno.setVenta(venta);
        pagoExterno.setCliente(cliente);
        pagoExterno.setIdPagoExterno(resultadoPago.get("idPagoExterno"));
        pagoExterno.setQrCode(resultadoPago.get("qrCode"));
        pagoExterno.setMonto(solicitud.getMonto());
        pagoExterno.setEstado("PENDIENTE");
        pagoExterno.setMetodoPago(metodoPago);
        pagoExterno.setTelefonoWhatsapp(solicitud.getTelefonoWhatsapp());
        
        pagoExterno = pagoExternoRepository.save(pagoExterno);
        
        // Construir respuesta
        RespuestaPagoExternoDTO respuesta = new RespuestaPagoExternoDTO();
        respuesta.setId(pagoExterno.getId());
        respuesta.setVentaId(venta.getId());
        respuesta.setIdPagoExterno(pagoExterno.getIdPagoExterno());
        respuesta.setQrCode(pagoExterno.getQrCode());
        respuesta.setMonto(pagoExterno.getMonto());
        respuesta.setEstado(pagoExterno.getEstado());
        respuesta.setMetodoPago(pagoExterno.getMetodoPago());
        respuesta.setMensaje("Pago externo creado exitosamente");
        respuesta.setEnviadoPorWhatsapp(false);
        
        return respuesta;
    }
    
    /**
     * Verifica el estado de un pago externo
     */
    @Transactional
    public RespuestaPagoExternoDTO verificarEstadoPago(Long pagoExternoId) {
        PagoExterno pagoExterno = pagoExternoRepository.findById(pagoExternoId)
            .orElseThrow(() -> new RuntimeException("Pago externo no encontrado con ID: " + pagoExternoId));
        
        // Obtener el adapter según el método de pago
        AdapterQr adapter = obtenerAdapter(pagoExterno.getMetodoPago());
        
        // Verificar estado en el servicio externo
        String estadoExterno = adapter.verificarEstadoPago(pagoExterno.getIdPagoExterno());
        
        // Actualizar estado si cambió
        if (!pagoExterno.getEstado().equals(estadoExterno)) {
            actualizarEstadoPago(pagoExterno, estadoExterno);
        }
        
        return construirRespuesta(pagoExterno);
    }
    
    /**
     * Procesa un webhook de pago (llamado por el servicio externo)
     */
    @Transactional
    public void procesarWebhook(String idPagoExterno, String estado, String metodoPago) {
        Optional<PagoExterno> pagoOpt = pagoExternoRepository.findByIdPagoExterno(idPagoExterno);
        
        if (pagoOpt.isEmpty()) {
            throw new RuntimeException("Pago externo no encontrado con ID externo: " + idPagoExterno);
        }
        
        PagoExterno pagoExterno = pagoOpt.get();
        
        // Actualizar estado
        actualizarEstadoPago(pagoExterno, estado);
        
        // Si el pago fue aprobado, actualizar la venta
        if ("APROBADO".equals(estado) || "approved".equalsIgnoreCase(estado)) {
            procesarPagoAprobado(pagoExterno);
        }
    }
    
    /**
     * Obtiene un pago externo por ID
     */
    public RespuestaPagoExternoDTO obtenerPagoExterno(Long id) {
        PagoExterno pagoExterno = pagoExternoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Pago externo no encontrado con ID: " + id));
        
        return construirRespuesta(pagoExterno);
    }
    
    // Métodos privados auxiliares
    
    private AdapterQr obtenerAdapter(String metodoPago) {
        // Por ahora solo soportamos MercadoPago
        // En el futuro se pueden agregar más adapters
        if ("MERCADOPAGO".equalsIgnoreCase(metodoPago)) {
            return adapterQrMercadoPago;
        }
        throw new RuntimeException("Método de pago no soportado: " + metodoPago);
    }

    private void actualizarEstadoPago(PagoExterno pagoExterno, String estadoExterno) {

        switch (estadoExterno) {
            case "APROBADO":
                pagoExterno.aprobar();
                break;
            case "RECHAZADO":
                pagoExterno.rechazar();
                break;
            case "CANCELADO":
                pagoExterno.cancelar();
                break;
            default:
                pagoExterno.setEstado("PENDIENTE");
        }
        
        pagoExternoRepository.save(pagoExterno);
    }

    
    private void procesarPagoAprobado(PagoExterno pagoExterno) {
        Venta venta = pagoExterno.getVenta();
        // Aquí se podría actualizar el estado de la venta a "PAGADA"
        // y realizar otras acciones necesarias
        // Por ejemplo: venta.cambiarEstado(new VentaPagada(venta));
    }
    
    private RespuestaPagoExternoDTO construirRespuesta(PagoExterno pagoExterno) {
        RespuestaPagoExternoDTO respuesta = new RespuestaPagoExternoDTO();
        respuesta.setId(pagoExterno.getId());
        respuesta.setVentaId(pagoExterno.getVenta().getId());
        respuesta.setIdPagoExterno(pagoExterno.getIdPagoExterno());
        respuesta.setQrCode(pagoExterno.getQrCode());
        respuesta.setMonto(pagoExterno.getMonto());
        respuesta.setEstado(pagoExterno.getEstado());
        respuesta.setMetodoPago(pagoExterno.getMetodoPago());
        respuesta.setEnviadoPorWhatsapp(pagoExterno.getTelefonoWhatsapp() != null);
        return respuesta;
    }
}

