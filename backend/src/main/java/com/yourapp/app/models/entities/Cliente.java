package com.yourapp.app.models.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
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

    public Cliente(String nombre, String apellido, String telefono, String dni, Double creditoLimite, Double deuda) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.telefono = telefono;
        this.dni = dni;
        this.creditoLimite = creditoLimite;
        this.deuda = deuda;
    }
    // private CategoriaCliente categoriaCliente

    public String getNombre() {
        return nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public String getTelefono() {
        return telefono;
    }

    public String getDni() {
        return dni;
    }

    public Double getCreditoLimite() {
        return creditoLimite;
    }

    public Double getDeuda() {
        return deuda;
    }

    public void setCreditoLimite(Double creditoLimite) {
        this.creditoLimite = creditoLimite;
    }

    public void setDeuda(Double deuda) {
        this.deuda = deuda;
    }

    public void aumentarDeuda(Double monto) {
        if(this.deuda + monto > this.creditoLimite) {
            // Lanzar error
        }
        this.deuda += monto;
    }

    public Double disminuirDeuda(Double monto) {
        if (this.deuda < 0) {
            this.deuda = 0.0;
        }
        this.deuda -= monto;
        return monto;
    }
}
