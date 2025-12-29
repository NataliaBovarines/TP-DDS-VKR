package com.yourapp.app.events;

import com.yourapp.app.models.entities.Producto;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
public class StockBajoEvent {
    private final String mensajeCompleto;

    public StockBajoEvent(String mensajeCompleto) {
        this.mensajeCompleto = mensajeCompleto;
    }
}