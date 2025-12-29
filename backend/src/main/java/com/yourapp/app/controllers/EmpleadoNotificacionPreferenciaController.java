package com.yourapp.app.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.yourapp.app.models.entities.Empleado;
import com.yourapp.app.models.entities.EmpleadoNotificacionPreferencia;
import com.yourapp.app.models.entities.EmpleadoNotificacionPreferenciaId;
import com.yourapp.app.models.entities.MedioNotificacion;
import com.yourapp.app.repositories.EmpleadoNotificacionPreferenciaRepository;
import com.yourapp.app.repositories.EmpleadoRepository;
import com.yourapp.app.repositories.MedioNotificacionRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/empleados/{empleadoId}/preferencias-notificacion")
@RequiredArgsConstructor
public class EmpleadoNotificacionPreferenciaController {
    private final EmpleadoNotificacionPreferenciaRepository prefRepo;
    private final EmpleadoRepository empleadoRepo;
    private final MedioNotificacionRepository medioRepo;

    @GetMapping
    public ResponseEntity<List<EmpleadoNotificacionPreferencia>> list(@PathVariable Long empleadoId) {
        return ResponseEntity.ok(prefRepo.findByIdIdEmpleado(empleadoId));
    }

    // POST: /empleados/1/preferencias-notificacion?medioNombre=EMAIL&habilitado=true
    @PostMapping
    public ResponseEntity<EmpleadoNotificacionPreferencia> create(
            @PathVariable Long empleadoId,
            @RequestParam String medioNombre,
            @RequestParam boolean habilitado) {

        return prefRepo.findByIdIdEmpleadoAndMedioNotificacionNombreIgnoreCase(empleadoId, medioNombre)
                .map(pref -> {
                    pref.setEstaHabilitado(habilitado);
                    return ResponseEntity.ok(prefRepo.save(pref));
                })
                .orElseGet(() -> {
                    Empleado empleado = empleadoRepo.findById(empleadoId).orElseThrow();
                    // Aquí usamos el método que acabamos de agregar
                    MedioNotificacion medio = medioRepo.findByNombreIgnoreCase(medioNombre).orElseThrow();

                    EmpleadoNotificacionPreferencia nuevaPref = new EmpleadoNotificacionPreferencia(empleado, medio, habilitado);
                    return ResponseEntity.ok(prefRepo.save(nuevaPref));
                });
    }

    // PUT: /empleados/1/preferencias-notificacion?medioNombre=EMAIL&habilitado=false
    @PutMapping
    public ResponseEntity<EmpleadoNotificacionPreferencia> update(
            @PathVariable Long empleadoId,
            @RequestParam String medioNombre,
            @RequestParam boolean habilitado) {

        // Buscamos la preferencia directamente combinando empleado y nombre del medio
        EmpleadoNotificacionPreferencia pref = prefRepo
                .findByIdIdEmpleadoAndMedioNotificacionNombreIgnoreCase(empleadoId, medioNombre)
                .orElseThrow(() -> new RuntimeException("El empleado no tiene configurado el medio: " + medioNombre));

        pref.setEstaHabilitado(habilitado);
        return ResponseEntity.ok(prefRepo.save(pref));
    }
}