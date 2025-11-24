package com.yourapp.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.yourapp.app.models.entities.PagoDeCredito;

public interface PagoDeCreditoRepository extends JpaRepository<PagoDeCredito, Long> {
    
}
