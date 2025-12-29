package com.yourapp.app.models.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NotificationResult {
    private Long empleadoId;
    private String empleadoNombre;
    private String canal;
    private String status; // SUCCESS / SKIPPED / FAILED
    private String message; // detalle o error
}

