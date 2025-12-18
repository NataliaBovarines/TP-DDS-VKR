package com.yourapp.app.services;

import com.yourapp.app.models.entities.ConfiguracionTienda;
import com.yourapp.app.repositories.ConfiguracionTiendaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ConfiguracionService {

  private final ConfiguracionTiendaRepository configuracionTiendaRepository;

  @EventListener(ApplicationReadyEvent.class)
  @Transactional
  public void inicializarConfiguracion() {
    // Cargar o crear configuración por defecto
    ConfiguracionTienda config = configuracionTiendaRepository.findFirstByOrderByIdAsc()
        .orElseGet(() -> {
          ConfiguracionTienda nuevaConfig = new ConfiguracionTienda();
          nuevaConfig.setNombreEmpresa("Mi Tienda");
          nuevaConfig.setPermiteReserva(true);
          nuevaConfig.setPorcentajeMinimoSena(0.10);
          nuevaConfig.setDiasValidezReserva(90);
          nuevaConfig.setStockMinimoGlobal(5);
          nuevaConfig.setTiempoMaximoCancelacionMeses(1);
          return configuracionTiendaRepository.save(nuevaConfig);
        });

    // Establecer como instancia singleton
    ConfiguracionTienda.setInstance(config);

    System.out.println("Configuración de tienda cargada: " + config.getNombreEmpresa());
  }

  @Transactional
  public ConfiguracionTienda actualizarConfiguracion(ConfiguracionTienda nuevaConfig) {
    ConfiguracionTienda configGuardada = configuracionTiendaRepository.save(nuevaConfig);
    ConfiguracionTienda.setInstance(configGuardada);
    return configGuardada;
  }

  public ConfiguracionTienda obtenerConfiguracionActual() {
    return ConfiguracionTienda.getInstance();
  }
}