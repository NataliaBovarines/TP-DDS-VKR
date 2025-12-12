package com.yourapp.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.yourapp.app.models.entities.Venta;
import com.yourapp.app.models.entities.state.VentaState;

import java.util.List;

public interface VentaRepository extends JpaRepository<Venta, Long>, JpaSpecificationExecutor<Venta> {

  @Query("SELECT v FROM Venta v WHERE TYPE(v.estado) = :estadoClass")
  List<Venta> findByEstado(@Param("estadoClass") Class<? extends VentaState> estadoClass);
}
