package com.yourapp.app.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.yourapp.app.models.entities.EmpleadoNotificacionPreferencia;
import com.yourapp.app.models.entities.EmpleadoNotificacionPreferenciaId;

@Repository
public interface EmpleadoNotificacionPreferenciaRepository extends JpaRepository<EmpleadoNotificacionPreferencia, EmpleadoNotificacionPreferenciaId> {

    // Busca todas las preferencias de un empleado
    @EntityGraph(attributePaths = {"empleado", "medioNotificacion"})
    List<EmpleadoNotificacionPreferencia> findByIdIdEmpleado(Long idEmpleado);

    // Busca una preferencia específica por el ID del empleado y el NOMBRE del medio
    // Spring navega: EmpleadoNotificacionPreferencia -> medioNotificacion -> nombre
    @EntityGraph(attributePaths = {"empleado", "medioNotificacion"})
    Optional<EmpleadoNotificacionPreferencia> findByIdIdEmpleadoAndMedioNotificacionNombreIgnoreCase(Long idEmpleado, String nombreMedio);

    // Útil si quieres ver quiénes tienen activado un canal específico por nombre
    @EntityGraph(attributePaths = {"empleado", "medioNotificacion"})
    List<EmpleadoNotificacionPreferencia> findByMedioNotificacionNombreIgnoreCase(String nombreMedio);

    // Carga preferencias habilitadas junto con medioNotificacion y empleado para evitar LazyInitialization
    @EntityGraph(attributePaths = {"empleado", "medioNotificacion"})
    List<EmpleadoNotificacionPreferencia> findByEstaHabilitadoTrue();
}