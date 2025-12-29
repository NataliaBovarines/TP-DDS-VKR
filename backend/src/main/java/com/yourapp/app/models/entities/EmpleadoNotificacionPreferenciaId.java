package com.yourapp.app.models.entities;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class EmpleadoNotificacionPreferenciaId implements Serializable {
    @Column(name = "id_empleado")
    private Long idEmpleado;

    @Column(name = "id_canal")
    private Long idCanal;
}

