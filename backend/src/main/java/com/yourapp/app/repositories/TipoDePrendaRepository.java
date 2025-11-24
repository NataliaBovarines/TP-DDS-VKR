package com.yourapp.app.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.yourapp.app.models.entities.TipoDePrenda;

public interface TipoDePrendaRepository extends JpaRepository<TipoDePrenda, Long> {
    
}
