package com.yourapp.app.models.entities.state;

import com.yourapp.app.models.entities.Venta;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("RECHAZADA")
public class VentaRechazada extends VentaState {

    @Override
    public boolean puedeCambiarA(Class<? extends VentaState> nuevoEstado) {
        return false;
    }
}