package com.yourapp.app.models.entities.adapters;

import com.yourapp.app.models.entities.Empleado;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import lombok.RequiredArgsConstructor;
import com.yourapp.app.exceptions.NotificationSkippedException;

@Component
@RequiredArgsConstructor
public class NotificacionWhatsapp implements MedioDeNotificacion {
    private final AdapterWhatsapp adapterWhatsapp;
    private static final Logger log = LoggerFactory.getLogger(NotificacionWhatsapp.class);

    @Override
    public void notificar(String mensaje, Empleado empleado) {
        String telefono = (empleado != null) ? empleado.getTelefono() : null;

        if (telefono == null || telefono.isBlank()) {
            // Logueamos el problema de datos pero no lanzamos Exception
            String msg = String.format("Salteando WhatsApp: El empleado %s (ID: %s) no tiene número de teléfono cargado.",
                    (empleado != null ? empleado.getNombre() : "N/A"),
                    (empleado != null ? empleado.getId() : "N/A"));
            log.warn("⚠️ {}", msg);
            throw new NotificationSkippedException(msg);
        }

        adapterWhatsapp.notificar(mensaje, telefono);
    }

    @Override
    public String getNombreCanal() {
        return "WHATSAPP";
    }
}