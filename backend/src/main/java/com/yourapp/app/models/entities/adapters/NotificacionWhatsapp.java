package com.yourapp.app.models.entities.adapters;

import com.yourapp.app.models.entities.adapters.MedioDeNotificacion;

public class NotificacionWhatsapp implements MedioDeNotificacion {
    private String contacto;
    private AdapterWhatsapp adapterWhatsapp;

    public void notificar(String mensaje) {
        
    }
}
