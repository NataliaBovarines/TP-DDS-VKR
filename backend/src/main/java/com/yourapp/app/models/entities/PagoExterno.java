package com.yourapp.app.models.entities;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class PagoExterno {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    private Venta venta;
    
    @ManyToOne
    private Cliente cliente;

    private String idPagoExterno; // ID del pago en el servicio externo (ej: MercadoPago)
    private String qrCode; // Código QR para pagos presenciales
    private Double monto;
    private String estado;
    //TODO Debería saber el estado con la venta directamente, me parece
    private LocalDateTime fechaCreacion;
    private LocalDateTime fechaActualizacion;
    private String metodoPago; // MERCADOPAGO, PAYPAL, etc.
    private String telefonoWhatsapp; // Teléfono al que se envió el QR
    
    @PrePersist
    protected void onCreate() {
        fechaCreacion = LocalDateTime.now();
        fechaActualizacion = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        fechaActualizacion = LocalDateTime.now();
    }
    
    public void aprobar() {
        this.estado = "APROBADO";
        this.fechaActualizacion = LocalDateTime.now();
    }
    
    public void rechazar() {
        this.estado = "RECHAZADO";
        this.fechaActualizacion = LocalDateTime.now();
    }
    
    public void cancelar() {
        this.estado = "CANCELADO";
        this.fechaActualizacion = LocalDateTime.now();
    }
    
    public boolean estaPendiente() {
        return "PENDIENTE".equals(this.estado);
    }
    
    public boolean estaAprobado() {
        return "APROBADO".equals(this.estado);
    }
}

