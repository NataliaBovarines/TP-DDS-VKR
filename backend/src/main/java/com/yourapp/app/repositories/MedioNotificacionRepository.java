package com.yourapp.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.yourapp.app.models.entities.MedioNotificacion;

import java.util.Optional;

@Repository
public interface MedioNotificacionRepository extends JpaRepository<MedioNotificacion, Long> {
    Optional<MedioNotificacion> findByNombreIgnoreCase(String nombre);
}

