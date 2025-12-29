package com.yourapp.app.models.entities.adapters;

public interface AdapterEmail {
    /**
     * @param mensaje El cuerpo del correo
     * @param contacto La dirección de email del destinatario
     */
    void notificar(String mensaje, String contacto);
}