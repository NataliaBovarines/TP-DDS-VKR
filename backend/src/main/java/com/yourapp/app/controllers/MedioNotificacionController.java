package com.yourapp.app.controllers;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.yourapp.app.models.entities.MedioNotificacion;
import com.yourapp.app.repositories.MedioNotificacionRepository;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/medios-notificacion")
@RequiredArgsConstructor
public class MedioNotificacionController {

    private final MedioNotificacionRepository medioRepo;

    @GetMapping
    public ResponseEntity<List<MedioNotificacion>> list() {
        return ResponseEntity.ok(medioRepo.findAll());
    }

    // Cambiamos @RequestBody por @RequestParam
    @PostMapping
    public ResponseEntity<MedioNotificacion> create(@RequestParam String nombre) {
        MedioNotificacion medio = new MedioNotificacion();
        medio.setNombre(nombre); // Asumiendo que tu entidad tiene este setter

        MedioNotificacion saved = medioRepo.save(medio);
        return ResponseEntity.ok(saved);
    }
}