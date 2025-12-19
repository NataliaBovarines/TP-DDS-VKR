package com.yourapp.app.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.yourapp.app.models.dto.RespuestaPagoExternoDTO;
import com.yourapp.app.models.dto.SolicitudPagoExternoDTO;
import com.yourapp.app.models.dto.WebhookPagoDTO;
import com.yourapp.app.services.PagoExternoService;

@RestController
@RequestMapping("/pagos-externos")
@CrossOrigin(origins = "*")
public class PagoExternoController {
    
    private final PagoExternoService pagoExternoService;

    public PagoExternoController(
            PagoExternoService pagoExternoService) {
        this.pagoExternoService = pagoExternoService;
    }
    
    /**
     * POST /pagos-externos
     * Crea un pago externo y retorna el link
     */
    @PostMapping
    public ResponseEntity<?> crearPagoExterno(
            @RequestBody SolicitudPagoExternoDTO solicitud) {
        try {
            RespuestaPagoExternoDTO respuesta = pagoExternoService.crearPagoExterno(solicitud);
            return ResponseEntity.status(HttpStatus.CREATED).body(respuesta);
        } catch (Exception e) {
            e.printStackTrace(); // Para debug
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Error: " + e.getMessage());
        }
    }
    
    /**
     * GET /pagos-externos/{id}
     * Obtiene información de un pago externo
     */
    @GetMapping("/{id}")
    public ResponseEntity<RespuestaPagoExternoDTO> obtenerPagoExterno(@PathVariable Long id) {
        try {
            RespuestaPagoExternoDTO respuesta = pagoExternoService.obtenerPagoExterno(id);
            return ResponseEntity.ok(respuesta);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    
    /**
     * GET /pagos-externos/{id}/verificar
     * Verifica el estado actual de un pago externo
     */
    @GetMapping("/{id}/verificar")
    public ResponseEntity<RespuestaPagoExternoDTO> verificarEstadoPago(@PathVariable Long id) {
        try {
            RespuestaPagoExternoDTO respuesta = pagoExternoService.verificarEstadoPago(id);
            return ResponseEntity.ok(respuesta);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    
    /**
     * POST /pagos-externos/webhook/mercadopago
     * Webhook para recibir notificaciones de MercadoPago
     */
    @PostMapping("/webhook/mercadopago")
    public ResponseEntity<Void> webhookMercadoPago(@RequestBody WebhookPagoDTO webhook) {
        try {
            String estado = webhook.getEstado();
            String idPagoExterno = webhook.getIdPagoExterno();
            
            // Normalizar estado de MercadoPago
            if (estado == null && webhook.getDatosAdicionales() != null) {
                Object status = webhook.getDatosAdicionales().get("status");
                if (status != null) {
                    estado = status.toString();
                }
            }
            
            pagoExternoService.procesarWebhook(idPagoExterno, estado, "MERCADOPAGO");
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            // Los webhooks deben retornar 200 incluso si hay errores
            // para evitar que el servicio externo siga reintentando
            return ResponseEntity.ok().build();
        }
    }
    
    /**
     * POST /pagos-externos/webhook/generic
     * Webhook genérico para otros proveedores de pago
     */
    @PostMapping("/webhook/generic")
    public ResponseEntity<Void> webhookGenerico(
            @RequestBody WebhookPagoDTO webhook,
            @RequestParam(required = false, defaultValue = "MERCADOPAGO") String metodoPago) {
        try {
            pagoExternoService.procesarWebhook(
                webhook.getIdPagoExterno(),
                webhook.getEstado(),
                metodoPago
            );
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.ok().build();
        }
    }
}

