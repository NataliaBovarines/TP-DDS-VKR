package com.yourapp.app.listeners;

import com.yourapp.app.events.StockBajoEvent;
import com.yourapp.app.services.NotificadorService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class StockBajoListener {

    private final NotificadorService notificadorService;

    @Async // Permite que el envío de mail no ralentice la aplicación
    @EventListener
    public void handleStockBajo(StockBajoEvent event) {
        // Aquí es donde finalmente se ejecuta la lógica de notificación
        notificadorService.procesarNotificaciones(event.getMensajeCompleto());
    }
}