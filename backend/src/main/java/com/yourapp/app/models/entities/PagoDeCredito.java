package com.yourapp.app.models.entities;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class PagoDeCredito {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private Venta venta;
    @ManyToOne
    private Cliente cliente;
    private Double pagoParcial;
    private LocalDateTime fecha;

    public void disminuirDeuda() {
        cliente.disminuirDeuda(pagoParcial);
    }
}
