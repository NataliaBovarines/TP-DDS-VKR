package com.yourapp.app.controllers;

import com.yourapp.app.models.dto.NotificationReport;
import com.yourapp.app.services.NotificadorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/notifications")
@RequiredArgsConstructor
public class AdminNotificationController {
    private final NotificadorService notificadorService;

    @PostMapping("/run")
    public ResponseEntity<NotificationReport> run() {
        NotificationReport report = notificadorService.procesarNotificacionesConReporte("Prueba de notificación: Stock bajo");
        return ResponseEntity.ok(report);
    }
}

