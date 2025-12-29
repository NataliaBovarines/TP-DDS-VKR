package com.yourapp.app.models.entities;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "empleado_notificacion_preferencia")
@Getter
@Setter
@NoArgsConstructor
public class EmpleadoNotificacionPreferencia {
    @EmbeddedId
    private EmpleadoNotificacionPreferenciaId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("idEmpleado")
    @JoinColumn(name = "id_empleado")
    private Empleado empleado;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("idCanal")
    @JoinColumn(name = "id_canal")
    private MedioNotificacion medioNotificacion;

    private Boolean estaHabilitado = Boolean.TRUE;

    public EmpleadoNotificacionPreferencia(Empleado empleado, MedioNotificacion medioNotificacion, Boolean estaHabilitado) {
        this.empleado = empleado;
        this.medioNotificacion = medioNotificacion;
        this.estaHabilitado = estaHabilitado == null ? Boolean.TRUE : estaHabilitado;
        this.id = new EmpleadoNotificacionPreferenciaId(
            empleado != null ? empleado.getId() : null,
            medioNotificacion != null ? medioNotificacion.getId() : null
        );
    }
}
