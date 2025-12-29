package com.yourapp.app.services;

import com.yourapp.app.models.entities.Empleado;
import com.yourapp.app.models.entities.EmpleadoNotificacionPreferencia;
import com.yourapp.app.models.entities.adapters.MedioDeNotificacion;
import com.yourapp.app.repositories.EmpleadoNotificacionPreferenciaRepository;
import com.yourapp.app.repositories.EmpleadoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import com.yourapp.app.models.dto.NotificationReport;
import com.yourapp.app.models.dto.NotificationResult;
import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class NotificadorService {
    private final EmpleadoNotificacionPreferenciaRepository prefRepo;
    private final List<MedioDeNotificacion> medios; // Inyecta NotificacionEmail, etc.
    private final EmpleadoRepository empleadoRepo;

    private static final Logger log = LoggerFactory.getLogger(NotificadorService.class);

    @Transactional(readOnly = true)
    public void procesarNotificaciones(String mensaje) {
        log.info("🚀 Iniciando procesamiento de notificaciones...");
        // simple wrapper que no devuelve reporte
        procesarNotificacionesConReporte(mensaje);
    }

    @Transactional(readOnly = true)
    public NotificationReport procesarNotificacionesConReporte(String mensaje) {
        NotificationReport report = new NotificationReport();
        List<NotificationResult> resultados = new ArrayList<>();

        // Cargamos todos los empleados activos y procesamos sus preferencias
        List<Empleado> empleados = empleadoRepo.findAll().stream()
                .filter(e -> e.getFueEliminado() == null || !e.getFueEliminado())
                .collect(Collectors.toList());

        log.info("👥 Empleados totales activos a evaluar: {}", empleados.size());
        report.setTotalEmpleados(empleados.size());

        for (Empleado emp : empleados) {
            try {
                Long empleadoId = emp.getId();
                // Obtenemos las preferencias (las devuelve con empleado/medio por @EntityGraph)
                List<EmpleadoNotificacionPreferencia> prefsEmpleado = prefRepo.findByIdIdEmpleado(empleadoId).stream()
                        .filter(EmpleadoNotificacionPreferencia::getEstaHabilitado)
                        .collect(Collectors.toList());

                log.info("🔎 Procesando {} preferencias habilitadas para empleado {} (id={})", prefsEmpleado.size(), emp.getNombre(), empleadoId);

                // Si no existen preferencias explícitas, enviamos por todos los medios disponibles (fallback)
                if (prefsEmpleado.isEmpty()) {
                    log.info("ℹ️ No se encontraron preferencias para empleado id={}. Usando fallback: notificar por todos los medios.", empleadoId);
                    for (MedioDeNotificacion medio : medios) {
                        try {
                            log.info("📲 Fallback: intentando notificar via {} al empleado {} (id={})", medio.getClass().getSimpleName(), emp.getNombre(), empleadoId);
                            medio.notificar(mensaje, emp);
                            log.info("✅ Fallback: notificación vía {} enviada (empleado id={}).", medio.getClass().getSimpleName(), empleadoId);
                        } catch (Exception e) {
                            log.error("❌ Fallback: error enviando via {} al empleado id={}: {}", medio.getNombreCanal(), empleadoId, e.getMessage(), e);
                        }
                    }
                    // Continuamos con el siguiente empleado después del fallback
                    continue;
                }

                for (EmpleadoNotificacionPreferencia pref : prefsEmpleado) {
                    try {
                        String nombreCanal = pref.getMedioNotificacion() != null ? pref.getMedioNotificacion().getNombre() : "<sin-canal>";
                        boolean medioEncontrado = false;
                        for (MedioDeNotificacion medio : medios) {
                            if (medio.getNombreCanal().equalsIgnoreCase(nombreCanal)) {
                                medioEncontrado = true;
                                log.info("📲 Intentando notificar via {} al empleado {} (id={}).", medio.getClass().getSimpleName(), emp.getNombre(), empleadoId);
                                try {
                                    medio.notificar(mensaje, emp);
                                    log.info("✅ Notificación vía {} enviada (empleado id={}).", medio.getClass().getSimpleName(), empleadoId);
                                    resultados.add(new NotificationResult(empleadoId, emp.getNombre(), medio.getNombreCanal(), "SUCCESS", ""));
                                } catch (com.yourapp.app.exceptions.NotificationSkippedException ns) {
                                    // caso donde el adapter decide saltear el envío por datos faltantes (ej. sin teléfono)
                                    log.warn("⚠️ Notificación saltada por adapter {} para empleado id={}: {}", medio.getNombreCanal(), empleadoId, ns.getMessage());
                                    resultados.add(new NotificationResult(empleadoId, emp.getNombre(), medio.getNombreCanal(), "SKIPPED", ns.getMessage()));
                                } catch (Exception e) {
                                    log.error("❌ Error enviando via {} al empleado id={}: {}", medio.getNombreCanal(), empleadoId, e.getMessage(), e);
                                    resultados.add(new NotificationResult(empleadoId, emp.getNombre(), medio.getNombreCanal(), "FAILED", e.getMessage()));
                                }
                            }
                        }
                        if (!medioEncontrado) {
                            log.warn("⚠️ No se encontró ningún Adapter configurado para el canal: {} (empleado id={})", nombreCanal, empleadoId);
                            resultados.add(new NotificationResult(empleadoId, emp.getNombre(), nombreCanal, "SKIPPED", "No adapter found"));
                        }
                    } catch (Exception e) {
                        log.error("❌ Error inesperado procesando preferencia para empleado id={}: {}", emp.getId(), e.getMessage(), e);
                        resultados.add(new NotificationResult(empleadoId, emp.getNombre(), "<unknown>", "FAILED", e.getMessage()));
                    }
                }
            } catch (Exception e) {
                log.error("❌ Error inesperado procesando empleado {}: {}", emp != null ? emp.getId() : null, e.getMessage(), e);
            }
        }

        log.info("🏁 Finalizó el procesamiento de todas las notificaciones.");
        report.setResults(resultados);
        report.setTotalIntentos(resultados.size());
        return report;
    }
}