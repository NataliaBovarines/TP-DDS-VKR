package com.yourapp.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.yourapp.app.models.entities.Venta;

public interface VentaRepository extends JpaRepository<Venta, Long> {
    
}
