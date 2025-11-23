package com.yourapp.app.models.entities.usuarios;

public class Cliente {
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
