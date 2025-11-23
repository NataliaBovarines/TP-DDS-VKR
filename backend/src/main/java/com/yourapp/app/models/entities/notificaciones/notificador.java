package com.yourapp.app.models.entities.notificaciones;

import com.yourapp.app.models.entities.usuarios.Empleado;

public class Notificador {
    public void notificar(String mensaje, Empleado empleado) {
        empleado.recibirNotificacion(mensaje);
    }
}
