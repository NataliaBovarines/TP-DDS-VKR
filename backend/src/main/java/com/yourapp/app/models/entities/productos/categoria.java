package com.yourapp.app.models.entities.productos;

public class Categoria {
    private int id;

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public boolean isEstaActiva() {
        return estaActiva;
    }

    public void setEstaActiva(boolean estaActiva) {
        this.estaActiva = estaActiva;
    }

    private String descripcion;
    private boolean estaActiva;

    // Constructor vacío
    public Categoria() {}

    // Constructor con parámetros
    public Categoria(int id, String descripcion, boolean estaActiva) {
        this.id = id;
        this.descripcion = descripcion;
        this.estaActiva = estaActiva;
    }

}
