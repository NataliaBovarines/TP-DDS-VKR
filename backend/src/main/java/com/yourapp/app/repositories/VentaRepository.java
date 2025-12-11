package com.yourapp.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.yourapp.app.models.entities.Venta;
import java.util.List;

public interface VentaRepository extends JpaRepository<Venta, Long> {

  List<Venta> findByEstadoTipo(String estado);
}
