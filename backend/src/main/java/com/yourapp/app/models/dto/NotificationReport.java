package com.yourapp.app.models.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class NotificationReport {
    private int totalEmpleados;
    private int totalIntentos;
    private List<NotificationResult> results;
}

