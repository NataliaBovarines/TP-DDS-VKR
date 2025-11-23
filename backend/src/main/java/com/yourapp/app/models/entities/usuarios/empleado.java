package com.yourapp.app.models.entities.usuarios;

import com.yourapp.app.models.entities.notificaciones.MedioDeNotificacion;
import java.util.List;

public class Empleado {
    private String nombre;
    private String dni;
    private String direccion;
    private String mail;
    private String telefono;
    private Usuario usuario;
    private List<MedioDeNotificacion> mediosDeNotificacion;

    public void recibirNotificacion(String mensaje) {
        this.mediosDeNotificacion.forEach(m -> m.notificar(mensaje));
    }
}
