package com.yourapp.app.models.entities;

import java.time.LocalDateTime;

import com.yourapp.app.models.entities.state.VentaState;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class Venta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private Empleado empleado;
    @Transient
    private VentaState estado;
    private String estadoNombre;
    private LocalDateTime fecha;
    private Double total;

}
