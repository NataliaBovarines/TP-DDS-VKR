package com.yourapp.app.models.entities.adapters;

import com.yourapp.app.models.entities.Empleado;
import org.springframework.stereotype.Component; // IMPORTANTE
import lombok.RequiredArgsConstructor; // OPCIONAL (pero recomendado)

@Component // <--- Esto es lo que falta para que Spring la reconozca
@RequiredArgsConstructor
public class NotificacionEmail implements MedioDeNotificacion {

    // Al ser final y usar @RequiredArgsConstructor, Spring lo inyecta solo
    private final AdapterEmail adapterEmail;

    @Override
    public void notificar(String mensaje, Empleado empleado) {
        // Asegúrate de que el campo en Empleado sea 'email' o 'mail'
        String email = empleado.getEmail();

        if (email != null && !email.isBlank()) {
            adapterEmail.notificar(mensaje, email);
        } else {
            System.err.println("❌ No se pudo enviar mail: El empleado " + empleado.getNombre() + " no tiene correo configurado.");
        }
    }

    @Override
    public String getNombreCanal() {
        // Este valor debe ser IGUAL al que tienes guardado en la columna 'nombre'
        // de la tabla 'MedioNotificacion' en tu base de datos.
        return "EMAIL";
    }
}