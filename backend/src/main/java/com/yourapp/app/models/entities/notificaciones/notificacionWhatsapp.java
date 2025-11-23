package com.yourapp.app.models.entities.notificaciones;

import com.yourapp.app.models.entities.notificaciones.MedioDeNotificacion;

public class NotificacionWhatsapp implements MedioDeNotificacion {
    private String contacto;
    private AdapterWhatsapp adapterWhatsapp;

    public void notificar(String mensaje) {
        
    }
}
