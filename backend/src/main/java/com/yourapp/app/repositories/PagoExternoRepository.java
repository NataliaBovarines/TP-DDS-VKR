package com.yourapp.app.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.yourapp.app.models.entities.PagoExterno;

@Repository
public interface PagoExternoRepository extends JpaRepository<PagoExterno, Long> {
    Optional<PagoExterno> findByIdPagoExterno(String idPagoExterno);
    Optional<PagoExterno> findByVentaId(Long ventaId);
}

