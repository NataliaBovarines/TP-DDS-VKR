package com.yourapp.app.models.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private String apellido;
    private String telefono;
    private String dni;
    private Double creditoLimite;
    private Double deuda;
    // private CategoriaCliente categoriaCliente
    
    public void aumentarDeuda(Double monto) {
        if(this.deuda + monto > this.creditoLimite) { 
            // Lanzar error
        }
        this.deuda += monto;
    }

    public void disminuirDeuda(Double monto) {
        if (this.deuda < 0) {
            this.deuda = 0.0;
        }
        this.deuda -= monto;
    }
}
